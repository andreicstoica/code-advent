import { readFileSync } from "fs";

const input = readFileSync("input.txt").toString().trim().split("\n");

// PART 1
const mulStrings: RegExpExecArray[] = input.flatMap((row) => [
  ...row.matchAll(/mul\((\d+),(\d+)\)/g),
]);

const nums: number[] = mulStrings.flatMap((match) => [
  Number(match[1]),
  Number(match[2]),
]);

let result: number = 0;
for (let i = 0; i <= nums.length - 2; i += 2) {
  result += nums[i]! * nums[i + 1]!;
}

//console.log(result);

// PART 2
const matches: RegExpExecArray[] = input.flatMap((row) => [
  ...row.matchAll(/(?:mul\((\d+),(\d+)\)|(?:do\(\))|(?:don't\(\)))/g),
]);

let result2: number = 0;
let okMult: boolean = true;
for (const operation of matches) {
  const op = operation[0]; // e.g. 'mul(3,4)', 'do()' or 'don't()'
  if (op === "don't()") {
    okMult = false;
  } else if (op === "do()") {
    okMult = true;
  } else if (okMult && operation[1] !== undefined) {
    console.log(operation[1]!.toString());
    result2 += Number(operation[1]) * Number(operation[2]);
  }
}

console.log(result2);
