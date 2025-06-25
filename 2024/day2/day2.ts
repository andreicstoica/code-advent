import { readFileSync } from "fs";

const input = readFileSync("input.txt").toString().trim().split("\n");

const reports: number[][] = input.map((row) =>
  row.trim().split(/\s+/).map(Number),
);

// PART 1
let safe: number = 0;

for (const report of reports) {
  const isInc = report.every((v, i) => i === 0 || v > report[i - 1]!);
  const isDec = report.every((v, i) => i === 0 || v < report[i - 1]!);
  const gapOk = report.every(
    (v, i) =>
      i === 0 ||
      (Math.abs(v - report[i - 1]!) >= 1 && Math.abs(v - report[i - 1]!) <= 3),
  );

  if (gapOk && (isInc || isDec)) {
    safe++;
  }
}

console.log(safe);

// PART 2
const isSafe = (report: any) => {
  const isInc = report.every((v, i) => i === 0 || v > report[i - 1]!);
  const isDec = report.every((v, i) => i === 0 || v < report[i - 1]!);
  const gapOk = report.every(
    (v, i) =>
      i === 0 ||
      (Math.abs(v - report[i - 1]!) >= 1 && Math.abs(v - report[i - 1]!) <= 3),
  );

  if (gapOk && (isInc || isDec)) {
    return true;
  } else {
    return false;
  }
};

let looseSafe = 0;

for (const report of reports) {
  if (isSafe(report)) {
    looseSafe++;
  } else {
    for (let i = 0; i < report.length; i++) {
      const shortened = [...report.slice(0, i), ...report.slice(i + 1)];
      if (isSafe(shortened)) {
        looseSafe++;
        break;
      }
    }
  }
}

console.log("part 2:", looseSafe);
