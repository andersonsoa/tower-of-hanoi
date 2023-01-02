interface Props {
  disc: number;
}

export function Disc(props: Props) {
  return (
    <div
      className="h-4 bg-red-500 rounded ring-1 ring-zinc-800"
      style={{ width: props.disc * 34 }}
    />
  );
}
