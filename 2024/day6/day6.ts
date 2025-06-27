import { readFileSync } from "fs";

const input: string[] = readFileSync("input.txt").toString().trim().split("\n");

const map = input.map((row) => row.split(""));

// directions = "^>v<"; // in 90* turn order, starting facing up
// i'm treating these as 0,1,2,3 in the moves array
const moves = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let count = 0;
// helper function to progress along rows
function stepper(dirIdx: number, row: number, col: number) {
  const [dr, dc] = moves[dirIdx]!;
  const nr = row + dr!;
  const nc = col + dc!;
  let swapCell = map[nr]?.[nc]; // undefined if off-board, or # . X

  if (swapCell === "." || swapCell === "X") {
    map[nr]![nc] = "X";
    if (swapCell === ".") {
      count++;
    }
    stepper(dirIdx, nr, nc);
  } else if (swapCell === "#") {
    stepper((dirIdx + 1) % 4, row, col);
  }

  // off board ('undefined'), end process
  else return;
}

let guardStart: number[] = [];

for (let r = 0; r < map.length; r++) {
  for (let c = 0; c < map[0]!.length; c++) {
    if (map[r]![c] === "^") {
      map[r]![c] = "X";
      count++;
      guardStart = [r, c];
    }
  }
}

stepper(0, guardStart[0]!, guardStart[1]!);

console.log(count);
