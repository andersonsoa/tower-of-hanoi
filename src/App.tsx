import React, { useState } from "react";
import { Tower } from "./components/Tower";
import { Disc } from "./components/Disc";

const SIZE = 5;

const generateTowers = (discsPerTower: number) => {
  const BASE_WIDTH = 32;

  const colorMap: Record<number, string> = {
    1: "bg-red-100",
    2: "bg-red-200",
    3: "bg-red-300",
    4: "bg-red-400",
    5: "bg-red-500",
    6: "bg-red-600",
  };

  const generateDiscs = (howMany: number) =>
    Array.from({ length: howMany }).map((_, idx) => {
      const id = idx + 1;
      const color = colorMap[id];

      return {
        id,
        width: id * BASE_WIDTH,
        color,
      };
    });
  return [[...generateDiscs(discsPerTower)], [], []];
};

function App() {
  const [moves, setMoves] = useState(0);
  const [towers, setTowers] = useState(() => generateTowers(SIZE));
  const [isOver, setIsOver] = useState<number | undefined>();
  const [error, setError] = useState<number | undefined>();

  function handleReset() {
    setMoves(0);
    setTowers(() => generateTowers(SIZE));
  }

  function handleOnDragStart(e: React.DragEvent<HTMLButtonElement>) {
    const disc = e.currentTarget.dataset.disc!;
    const tower = e.currentTarget.dataset.tower!;

    e.dataTransfer.setData("disc", disc);
    e.dataTransfer.setData("tower", tower);
  }

  function handleOnDrop(e: React.DragEvent<HTMLDivElement>) {
    const disc = e.dataTransfer.getData("disc");
    const fromTower = e.dataTransfer.getData("tower");
    const toTower = e.currentTarget.dataset.tower!;

    swapDiscs(+disc, +fromTower, +toTower);
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();

    const isOverTower = e.currentTarget.dataset.tower!;
    setIsOver(+isOverTower);
  }

  function swapDiscs(discId: number, fromTower: number, toTower: number) {
    if (isWow) return;

    const origin = towers[fromTower];
    const target = towers[toTower];

    const disc = origin.find((d) => (d.id = discId));

    const targetTopDisc = target[0];

    if (!!targetTopDisc && targetTopDisc.width < disc!.width) {
      setError(toTower);

      setTimeout(() => {
        setError(undefined);
      }, 500);
    } else {
      const discToSwap = origin.shift();

      if (discToSwap) target.unshift(disc!);

      setTowers((currentTowers) => {
        currentTowers[toTower] = target;
        currentTowers[fromTower] = origin;

        return [...currentTowers];
      });
    }
    setIsOver(undefined);
    setMoves((m) => m + 1);
  }

  const isWow = towers.slice(1).some((t) => t.length === SIZE);

  return (
    <div className="h-screen w-screen bg-zinc-900 text-gray-200 flex flex-col items-center gap-10">
      <div className="text-center px-4 py-10">
        <h1 className="text-2xl">Torre de Hanói</h1>
        <p>O objetivo deste jogo é mover todos os discos para outra torre</p>
        <p className="text-sm text-zinc-400">
          Você não pode colocar um{" "}
          <span className="text-red-500">disco maior</span> em cima de um{" "}
          <span className="text-red-500">disco menor</span>
        </p>
      </div>

      <div className="grid place-items-center gap-2">
        <p className="uppercase font-semibold">Movimentos:</p>
        <span className="bg-blue-800/20 w-full text-center py-2 rounded ring-1 ring-blue-700 text-lg font-extrabold">
          {moves}
        </span>
        <button
          onClick={handleReset}
          className="text-xs uppercase font-semibold bg-zinc-800 ring-1 ring-blue-700 hover:bg-blue-600 disabled:ring-zinc-500 disabled:bg-zinc-800 rounded w-full py-1 transition-all"
          disabled={moves === 0}
        >
          Reiniciar
        </button>
      </div>

      <div
        className={`grid grid-cols-3 w-full max-w-2xl p-4 gap-4 rounded relative ${
          isWow && "bg-green-400/5 ring-1 ring-green-600/75 pointer-events-none"
        }`}
      >
        {towers.map((tower, towerIdx) => (
          <Tower
            key={towerIdx}
            data-tower={towerIdx}
            isOver={isOver === towerIdx}
            hasError={error === towerIdx}
            onDragOver={handleDragOver}
            onDrop={handleOnDrop}
          >
            {tower.map((disc, discIdx) => (
              <Disc
                key={disc.id}
                disc={disc}
                data-disc={disc.id}
                data-tower={towerIdx}
                disabled={discIdx !== 0}
                draggable={discIdx === 0}
                onDragStart={handleOnDragStart}
              />
            ))}
          </Tower>
        ))}
      </div>

      {isWow ? (
        <div className="flex flex-col justify-center gap-2">
          <p>Parabéns, Você venceu!</p>

          <button
            className="bg-green-400/5 ring-1 ring-green-600/75 py-2 rounded"
            onClick={handleReset}
          >
            Jogar novamente?
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
