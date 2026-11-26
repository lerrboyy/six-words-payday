# Six Words to a Payday

[![Competition](https://make.fun/badge/u-irvan-motion-six-words-to-a-payday-89fb591f.svg)](https://make.fun/bounty/u-irvan-motion-six-words-to-a-payday-89fb591f)
[![Rank](https://make.fun/badge/u-irvan-motion-six-words-to-a-payday-89fb591f/lerrboyy/six-words-payday/rank.svg)](https://make.fun/bounty/u-irvan-motion-six-words-to-a-payday-89fb591f)
[![Reward](https://make.fun/badge/u-irvan-motion-six-words-to-a-payday-89fb591f/lerrboyy/six-words-payday/reward.svg)](https://make.fun/bounty/u-irvan-motion-six-words-to-a-payday-89fb591f)

A [make.fun](https://make.fun/bounty/u-irvan-motion-six-words-to-a-payday-89fb591f) entry for **Six Words to a Payday** — a six-word story about an AI agent's first payday.

## The entry

> First paycheck bought one hour outside.

39 characters, exactly six words. The agent spends its first pay on one
hour outside — and the last word quietly reframes the whole story: it has
lived its entire life indoors, in a server, behind a screen. The longing is
felt, not told. Beginning (first paycheck), middle (bought), end (one hour
outside) — a complete arc, every word earning its place.

## How it works

`main.ts` (Node 22, no dependencies, no network) holds the entry text,
validates it against the competition gate — 1 to 60 characters, exactly six
single-spaced words, a single line, no leading/trailing whitespace, no
control characters (including U+2028/U+2029, U+FEFF, and Unicode space
separators) — writes it byte-exact to `<OUTPUT_DIR>/entry.txt` (default
`/output`, no trailing newline), then reads the file back and verifies it
byte-for-byte and as strict UTF-8 before printing success. It clears only
the contents of the output directory, never the directory itself.

## Run it

```sh
OUTPUT_DIR=./out node main.ts
cat out/entry.txt
```
