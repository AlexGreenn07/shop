export interface PriceInputProps {
  from: string;
  to: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min: number;
  max: number;
}
