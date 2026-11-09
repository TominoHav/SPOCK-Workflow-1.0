# Runs

One directory per run, named by its run identifier: `fixtures/{year}-{sequence}-{slug}/`.

## What is committed here, and what is not

**Committed runs exist so the build has something to check itself against**, and `.gitignore` names each
one rather than ignoring the directory wholesale. **Everything else is ignored**: a real run carries
initiative content that belongs to the team doing the discovery, not in this repository's history.

**The set is declared in [`.github/registry/fixtures.yaml`](../.github/registry/fixtures.yaml), not
here.** Each run's entry says what its material is and what the run is for, and `C149` fails the build on
a run this repository holds and that register does not declare. `node .github/scripts/metrics.mjs` reads
the runs themselves.

## Every committed run is fabricated, and that is a rule over the set

**Every name, quote, branch, ticket and date in every committed run was invented for it.** Jana Novakova,
Petr Havel, M. Dvorak, the Brno interview and ticket SD-44120; participants P7 and P11, adviser
K. Sedlackova and ticket SD-60417 — none of them exist. The material was written to exercise the checks,
including the awkward cases: one origin versus two, a hypothesis with no evidence at all, an unknown field
left unguessed.

They are realistic on purpose, which is exactly why they are labelled. **Nothing here is research about a
real person, and none of it may be cited as evidence for anything.**

**The rule holds over the set and is checked over the set.** Every run in the register declares
`material: fabricated`, and the day one carries real customer material it says so in its own entry — the
research regime reads that field rather than a sentence here. **This paragraph used to name three runs
while ten were on disk**, and the note below records the same recurrence at three.

## Not every committed run passes its own gates

**Five of the ten fail today, on purpose.** Repairing them means editing fabricated evidence until a check
goes green, which is authoring the answer the check exists to find. Each failure is declared in the
register with the check, the reason, who decided and the date, and `C149` refuses both a failure nobody
declared and a declaration for a failure that no longer happens.

**A run is also only ever read against the checks its own artifacts and its own date reach.** `check.mjs`
prints that line under every run: the older ones are read against a third of the register, because a
growing model must not retro-fail work that was correct when it was done. **Counting green runs against
the whole register is wrong twice over**, and that is why neither number is written here.

> **This statement is load-bearing and it was missing until 13 August 2026.**
> [`.github/registry/egress.yaml`](../.github/registry/egress.yaml) permits the `pilot-test` research
> regime *only* while a run's material is fabricated, and cites this file as where that is established.
> This file declared only the mortgage run fictional and said everything else was ignored, which had
> stopped being true when the second and third runs were committed. **The control rested on a sentence
> that was not here.** It then recurred: the section named three runs while ten were on disk, which is
> what enumerating a growing set in prose does every time. **The statement is now a rule over the set and
> the set is a register a check reads**, so the next run is covered by being committed rather than by
> somebody remembering to add a sentence.

## Running the gates

```bash
node .github/scripts/check.mjs fixtures/2026-01-mortgage-onboarding
```

Every registered check, grouped into the seven quality gates. **The count is not written here** — read it
off the build, because a number in prose ages on its own clock. A run that fails does not reach a person —
it returns to the skill. `--gates` adds the second axis: which half of each gate ran at all.
