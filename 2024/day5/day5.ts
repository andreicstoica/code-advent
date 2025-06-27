import { readFileSync } from "fs";

const input: string[] = readFileSync("input.txt").toString().trim().split("\n");

const split = input.indexOf("");
const rules = input.slice(0, split);
const updates = input.slice(split + 1);

let score = 0;
for (const update of updates) {
  let goodUpdate = true;
  const nums = update.split(",").map(Number);
  const middle = nums[Math.floor(nums.length / 2)]!;
  const numSet = new Set(nums);
  for (const rule of rules) {
    const parts = rule.split("|");
    if (parts.length === 2) {
      const [a, b] = parts.map(Number);

      if (numSet.has(a!) && numSet.has(b!)) {
        // update includes both rules
        const idxA = nums.indexOf(a!);
        const idxB = nums.indexOf(b!);
        if (idxA > idxB) {
          goodUpdate = false;
          break;
        }
      }
    }
  }

  if (goodUpdate) {
    score += middle;
  }
}

// PART 2

let score2 = 0;
for (const update of updates) {
  let anySwaps = false;
  const nums = update.split(",").map(Number);
  const numSet = new Set(nums);

  // repeat until a full pass with no swaps
  let swappedInPass;
  do {
    swappedInPass = false;
    for (const rule of rules) {
      const parts = rule.split("|");

      // making sure i'm only getting the rules wiht 2 parts
      if (parts.length === 2) {
        const [a, b] = parts.map(Number);

        // if both nums of rule apply
        if (numSet.has(a!) && numSet.has(b!)) {
          const idxA = nums.indexOf(a!);
          const idxB = nums.indexOf(b!);

          // if incorrect order (a after b)
          if (idxA > idxB) {
            nums.splice(idxB, 0, nums[idxA]!);
            //delete nums[idxA + 1]; <-- delete leaves an empty hole at delete idx
            nums.splice(idxA + 1, 1);
            anySwaps = true;
            swappedInPass = true;
          }
        }
      }
    }
  } while (swappedInPass);

  // need to fix otherwise
  if (anySwaps) {
    const middle = nums[Math.floor(nums.length / 2)]!; // only get middle at the end
    score2 += middle;
  }
}

console.log(score2);
