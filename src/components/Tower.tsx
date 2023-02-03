import { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  isOver: boolean;
  hasError: boolean;
}

export function Tower({ isOver, hasError, children, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={`grid grid-cols-2 place-items-center items-end p-5 rounded-lg transition-all disabled:cursor-not-allowed relative border-2 ${
        isOver
          ? "bg-blue-500/10 border-dashed border-gray-500"
          : "border-transparent"
      } ${hasError && "bg-red-300/10 border-red-800/75 border-dashed"}`}
    >
      <div className="col-[1/-1] row-[1/-1] after:bg-blue-600 after:inset-x-2 after:h-2 after:absolute after:mx-auto after:rounded">
        <div className="h-44 w-2 rounded-t bg-blue-600" />
      </div>

      <div className="col-[1/-1] row-[1/-1] flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
