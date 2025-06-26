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
