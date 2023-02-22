import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disc: {
    id: number;
    width: number;
    color: string;
  };
}

export function Disc({ disc, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`h-4 ${disc.color} rounded ring-1 ring-zinc-800 cursor-move disabled:cursor-not-allowed`}
      style={{ width: disc.width }}
    />
  );
}
