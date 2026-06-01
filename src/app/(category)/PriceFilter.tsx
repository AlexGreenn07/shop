'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import React, {
  SubmitEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { CONFIG } from '../../../config/config';
import { PriceCategoryProps, PriceRange } from '@/types/priceTypes';
import ErrorComponent from '@/components/ErrorComponent';
import MiniLoader from '@/components/MiniLoader';
import PriceFilterHeader from './PriceFilterHeader';
import PriceInputs from './PriceInputs';
import PriceRangeSlider from './PriceRangeSlider';
import InStockToggle from './InStockToggle';

const PriceFilter = ({
  basePath,
  category,
  setIsFilterOpenAction,
}: PriceCategoryProps) => {
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
      const roundedRange = {
        min: Math.floor(parseInt(receivedRange.min)),
        max: Math.ceil(parseInt(receivedRange.max)),
      };
      setPriceRange(roundedRange);
      setInputValues({
        from: urlPriceFrom || roundedRange.min.toString(),
        to: urlPriceTo || roundedRange.max.toString(),
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
    if (setIsFilterOpenAction) {
      setIsFilterOpenAction(false);
    }
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
      className="flex flex-col gap-y-10 text-[#414141]"
    >
      <PriceFilterHeader onResetAction={resetPriceFilter} />
      <PriceInputs
        from={inputValues.from}
        to={inputValues.to}
        handleInputChange={handleInputChange}
        min={priceRange.min}
        max={priceRange.max}
      />
      <PriceRangeSlider
        min={priceRange.min}
        max={priceRange.max}
        sliderValues={sliderValues}
        hanleSliderChange={hanleSliderChange}
      />
      <InStockToggle inStock={inStock} onChangeAction={setInStock} />

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
