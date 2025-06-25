// 1. Pair the smallest numbers of each list and find the difference between them (sort both)
// 2. add up all the distances (differences)

import { readFileSync } from "fs";

const input = readFileSync("input.txt").toString().trim().split("\n");

// PART 1
const left: number[] = [];
const right: number[] = [];

for (const row of input) {
  const [l, r] = row.trim().split(/\s+/);
  (left.push(Number(l)), right.push(Number(r)));
}

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

const difference: number[] = [];

for (let i = 0; i < left.length; i++) {
  difference.push(Math.abs(left[i]! - right[i]!));
}

console.log(difference.reduce((acc, cur) => acc + cur));

// PART 2
// this time, you'll need to figure out exactly how often each number
// from the left list appears in the right list.
// Calculate a total similarity score by adding up each number in the
// left list after multiplying it by the number of times that number
// appears in the right list.

let similarity = 0;
for (const i of left) {
  let numCopies = 0;
  for (const ii of right) {
    if (i === ii) numCopies++;
  }

  similarity += i * numCopies;
}

console.log(similarity);
