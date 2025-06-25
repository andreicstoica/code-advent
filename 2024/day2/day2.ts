import { readFileSync } from "fs";

const input = readFileSync("input.txt").toString().trim().split("\n");

const reports: number[][] = input.map((row) =>
  row.trim().split(/\s+/).map(Number),
);

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
