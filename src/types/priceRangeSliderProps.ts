export interface PriceRangeSliderProps {
  min: number;
  max: number;
  sliderValues: number[];
  hanleSliderChange: (value: number | number[]) => void;
}
