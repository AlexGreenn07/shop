'use client';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useSearchParams, useRouter } from 'next/navigation';
import React, {
  SubmitEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { CONFIG } from '../../../config/config';
import { PriceCategoryProps, PriceRange } from '@/types/priceTypes';
import ErrorComponent from '@/components/ErrorComponent';
import MiniLoader from '@/components/MiniLoader';

const PriceFilter = ({ basePath, category }: PriceCategoryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<{
    error: Error;
    userMessage: string;
  } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlPriceFrom = searchParams.get('priceFrom') || '';
  const urlPriceTo = searchParams.get('priceTo') || '';
  const urlInStock = searchParams.get('inStock') === 'true';
  const [inputValues, setInputValues] = useState({
    from: urlPriceFrom,
    to: urlPriceTo,
  });
  const [priceRange, setPriceRange] = useState<PriceRange>(
    CONFIG.FALLBACK_PRICE_RANGE
  );
  const [inStock, setInStock] = useState(urlInStock);

  const fetchPriceData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentCategory =
        category || searchParams.get('category');
      if (!currentCategory) return;
      const params = new URLSearchParams();
      params.set('category', currentCategory);
      params.set('getPriceRangeOnly', 'true');

      const response = await fetch(
        `/api/category?${params.toString()}`
      );
      if (!response.ok)
        throw new Error(`Ошибка сервера: ${response.status}`);

      const data = await response.json();
      const receivedRange =
        data.priceRange || CONFIG.FALLBACK_PRICE_RANGE;
      setPriceRange({
        min: Math.floor(parseInt(receivedRange.min)),
        max: Math.ceil(parseInt(receivedRange.max)),
      });
      setInputValues({
        from:
          urlPriceFrom ||
          Math.floor(parseInt(receivedRange.min)).toString(),
        to:
          urlPriceTo ||
          Math.ceil(parseInt(receivedRange.max)).toString(),
      });
    } catch (error) {
      setError({
        error:
          error instanceof Error
            ? error
            : new Error('Неизвестная ошибка'),
        userMessage: 'Не удалось загрузить категории',
      });
      setPriceRange(CONFIG.FALLBACK_PRICE_RANGE);
      setInputValues({
        from: CONFIG.FALLBACK_PRICE_RANGE.min.toString(),
        to: CONFIG.FALLBACK_PRICE_RANGE.max.toString(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [category, searchParams, urlPriceFrom, urlPriceTo]);

  useEffect(() => {
    fetchPriceData();
  }, [fetchPriceData]);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    applyPriceFilter();
  };

  const applyPriceFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    let fromValue = Math.max(
      priceRange.min,
      parseInt(inputValues.from) || priceRange.min
    );
    let toValue = Math.min(
      priceRange.max,
      parseInt(inputValues.to) || priceRange.max
    );

    if (fromValue > toValue)
      [fromValue, toValue] = [toValue, fromValue];

    params.set('priceFrom', fromValue.toString());
    params.set('priceTo', toValue.toString());
    params.set('inStock', inStock.toString());

    router.push(`${basePath}?${params.toString()}`);
  }, [
    inputValues,
    priceRange,
    basePath,
    searchParams,
    router,
    inStock,
  ]);

  const sliderValues = [
    parseInt(inputValues.from) || priceRange.min,
    parseInt(inputValues.to) || priceRange.max,
  ];

  const handleInStockChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInStock(e.target.checked);
    },
    []
  );

  const hanleSliderChange = useCallback(
    (values: number | number[]) => {
      if (Array.isArray(values)) {
        setInputValues({
          from: values[0].toString(),
          to: values[1].toString(),
        });
      }
    },
    []
  );

  const resetPriceFilter = useCallback(() => {
    setInputValues({
      from: priceRange.min.toString(),
      to: priceRange.max.toString(),
    });
    const params = new URLSearchParams(searchParams.toString());
    params.delete('priceFrom');
    params.delete('priceTo');
    params.delete('page');
    router.push(`${basePath}?${params.toString()}`);
  }, [
    basePath,
    priceRange.max,
    priceRange.min,
    router,
    searchParams,
  ]);
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInputValues((prev) => ({ ...prev, [name]: value }));
      return <></>;
    },
    []
  );
  if (isLoading) {
    return <MiniLoader />;
  }
  if (error) {
    return (
      <ErrorComponent
        error={error.error}
        userMessage={error.userMessage}
      />
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 flex flex-col gap-y-10 text-[#414141] xl:mt-0"
    >
      <div className="flex flex-row items-center justify-between">
        <p className="text-base text-black">Цена</p>
        <button
          type="button"
          onClick={resetPriceFilter}
          className="h-8 cursor-pointer rounded bg-[#f3f2f1] p-2 text-xs"
        >
          Очистить
        </button>
      </div>
      <div className="flex flex-row items-center justify-between gap-2">
        <input
          type="number"
          name="from"
          value={inputValues.from}
          onChange={handleInputChange}
          placeholder={`${priceRange.min}`}
          min={priceRange.min}
          max={priceRange.max}
          className="h-10 w-31 rounded border border-[#bfbfbf] bg-white px-4 py-2"
        />
        <Image
          src="/icons-products/icon-line.svg"
          alt="до"
          width={24}
          height={24}
        />
        <input
          type="number"
          name="to"
          value={inputValues.to}
          onChange={handleInputChange}
          placeholder={`${priceRange.max}`}
          min={priceRange.min}
          max={priceRange.max}
          className="h-10 w-31 rounded border border-[#bfbfbf] bg-white px-4 py-2"
        />
      </div>
      <div className="mx-auto w-[320px] px-2 xl:w-68">
        <Slider
          range
          min={priceRange.min}
          max={priceRange.max}
          value={sliderValues}
          onChange={hanleSliderChange}
          styles={{
            track: {
              backgroundColor: '#70c05b',
              height: 4,
            },
            handle: {
              width: 20,
              height: 20,
              backgroundColor: '#70c05b',
              border: '1px solid #ffffff',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              marginTop: -8,
              cursor: 'pointer',
              opacity: 1,
            },
            rail: {
              backgroundColor: '#f0f0f0',
              height: 4,
            },
          }}
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="relative inline-flex cursor-pointer items-center">
          <input
            type="checkbox"
            id="inStock"
            checked={inStock}
            onChange={handleInStockChange}
            className="peer sr-only"
          />
          <div className="peer peer-checked:bg-primary h-6 w-11.5 rounded-full bg-gray-200 transition-colors duration-200">
            <div
              className={`absolute top-0.5 left-0 h-5 w-5 rounded-full border-[0.5px] border-[rgba(0,0,0,0.04)] bg-white shadow-[0px_1px_1px_rgba(0,0,0,0.08),0px_2px_6px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
                inStock
                  ? 'translate-x-6 transform'
                  : 'translate-x-0 transform'
              } `}
            ></div>
          </div>
          <span className="ml-2 text-sm text-[#414141]">
            В наличии
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="h-10 cursor-pointer items-center justify-center rounded bg-[#ff6633] text-white duration-300 hover:shadow-(--shadow-article) active:shadow-(--shadow-button-active)"
      >
        Применить
      </button>
    </form>
  );
};

export default PriceFilter;
