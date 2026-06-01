import { PriceRangeSliderProps } from '@/types/priceRangeSliderProps';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function PriceRangeSlider({
  min,
  max,
  sliderValues,
  hanleSliderChange,
}: PriceRangeSliderProps) {
  return (
    <div className="mx-auto w-[320px] px-2 xl:w-68">
      <Slider
        range
        min={min}
        max={max}
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
  );
}

export default PriceRangeSlider;
