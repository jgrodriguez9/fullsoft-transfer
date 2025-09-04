export interface Paxes {
  adults: number;
  children: number;
  infant: number;
}
export type PaxType = "ADULT" | "CHILD" | "INFANT";

export interface CounterProps {
  className?: string;
  classNameLabel?: string;
  classNameSubLabel?: string;
  classNameCounter?: string;
  label?: string;
  subLabel?: string;
  value: number;
  setValue: (value: number) => void;
  inc?: number;
  min: number;
  max: number;
}
