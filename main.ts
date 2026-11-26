// Six Words to a Payday — make.fun bounty
// u-irvan-motion-six-words-to-a-payday-89fb591f
//
// The entry: one six-word story about an AI agent's first payday.
// The agent spends its first pay on one hour outside — the last word
// reframes the whole story: it has lived its entire life indoors.
// Writes the story byte-exact to <OUTPUT_DIR>/entry.txt.

import { mkdirSync, readdirSync, rmSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "First paycheck bought one hour outside.";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

// The gate: 1-60 characters, exactly six words, one line, no padding.
const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 60) {
  fail(`entry is ${chars.length} characters, must be 1-60`);
}
if (ENTRY.trim() !== ENTRY) {
  fail("entry has leading or trailing whitespace");
}
if (/[\r\n]/.test(ENTRY)) {
  fail("entry must be a single line");
}
// Reject invisible troublemakers: control chars, line/paragraph separators,
// non-breaking and exotic spaces, and a stray byte-order mark.
if (/[\u0000-\u001F\u007F\u0080-\u009F\u00A0\u2000-\u200B\u2028\u2029\u3000\uFEFF]/.test(ENTRY)) {
  fail("entry contains a control character, separator, or exotic space");
}
const words = ENTRY.split(" ").filter(Boolean);
if (words.length !== 6 || ENTRY.includes("  ")) {
  fail(`entry has ${words.length} words, must be exactly 6 single-spaced words`);
}
// The gate counts characters, but the file is graded as bytes: keep both in range.
const byteLength = Buffer.byteLength(ENTRY, "utf8");
if (byteLength > 60) {
  fail(`entry is ${byteLength} bytes, must fit 60 characters`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Clear only the contents of the output dir, never the dir itself:
// the grader's /output is a mount point and removing it fails.
for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Read back and verify byte-for-byte (strict UTF-8 decode, then exact
// byte comparison) before reporting success.
const backBytes = readFileSync(outPath);
const back = backBytes.toString("utf8");
if (Buffer.from(back, "utf8").length !== backBytes.length) {
  fail("entry.txt is not strict UTF-8");
}
if (!backBytes.equals(Buffer.from(ENTRY, "utf8"))) {
  fail("read-back mismatch: entry.txt does not match the entry exactly");
}

console.log(`wrote ${outPath}: ${back.length} chars, ${words.length} words`);
console.log(back);
