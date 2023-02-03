import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  disc: number;
  draggable?: boolean;
}

export function Disc({ disc, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="h-4 bg-red-500 rounded ring-1 ring-zinc-800 cursor-move disabled:cursor-not-allowed"
      style={{ width: disc * 32 }}
    />
  );
}
