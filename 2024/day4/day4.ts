import { readFileSync } from "fs";

const input: string[] = readFileSync("input.txt").toString().trim().split("\n");

// PART 1
const charBoard: string[][] = [];

for (const row of input) {
  const tempArr: string[] = [];
  for (const char of row) {
    char.trim();
    tempArr.push(char);
  }
  charBoard.push(tempArr);
}

let matches: number = 0;
const word = "XMAS";
// horizontal across
// horizontal backwards
// vertical down
// vertical up
// diagonal
// backwards diagonal
// inverse diagonal
// backwards inverse diagonal
const directions: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

for (let y = 0; y < charBoard.length; y++) {
  for (let x = 0; x < charBoard[0]!.length; x++) {
    for (const [dx, dy] of directions) {
      let match = true; // why true to start?
      for (let k = 0; k < word.length; k++) {
        const nx = x + k * dx;
        const ny = y + k * dy;

        // checking bounds
        if (
          ny < 0 ||
          ny >= charBoard.length ||
          nx < 0 ||
          nx >= charBoard[0]!.length ||
          charBoard[ny]![nx] !== word[k] // if the letter differs from what we need in the word at that index
        ) {
          match = false;
          break;
        }
      }
      if (match) {
        matches++;
      }
    }
  }
}

console.log(matches);
