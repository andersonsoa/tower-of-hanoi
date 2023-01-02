interface Props {
  children: React.ReactNode;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export function Tower(props: Props) {
  return (
    <button
      className={`grid grid-cols-2 place-items-center items-end p-5 rounded-lg transition-all disabled:cursor-not-allowed relative ${
        props.isActive ? "bg-zinc-800" : "hover:bg-zinc-800"
      }`}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      <div className="col-[1/-1] row-[1/-1] after:bg-blue-600 after:inset-x-2 after:h-2 after:absolute after:mx-auto after:rounded">
        <div className="h-44 w-2 rounded-t bg-blue-600" />
      </div>

      <div className="col-[1/-1] row-[1/-1] flex flex-col items-center">
        {props.children}
      </div>
    </button>
  );
}
