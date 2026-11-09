# Canonical documents

**These three govern everything in this repository.** Where anything here disagrees with one of them,
the canonical document wins and the disagreement is a defect to fix — never the other way round.

| Document | Governs | Version |
|---|---|---|
| **[Agent Blueprint Specification](./Agent-Blueprint-Specification-v2.1.md)** | How agents, skills, workflows and quality are built and governed | **v2.1** |
| **[SPOCK Workflow Blueprint](./Workflow-Blueprint-v1.42.md)** | How work is composed, staged and permitted to advance | **v1.42** |
| **[SPOCK Pilot Definition](./SPOCK-Pilot-Definition-v2.0.md)** | What the pilot is, and what is in and out of its scope | **v2.0** |

---

## These are pinned copies

Each is a **copy at a stated version**, not the living original, because this repository must be
self-contained and cannot depend on paths outside itself. **The version is in the filename or the table
above so that drift is visible**, and `C174` fails the build when the version in a filename and the version
inside the file disagree.

**Never edit a pinned document in this folder.** Where a canonical document is superseded, the old copy is
retained and marked, never overwritten in place.

**Superseded, retained:** [the Pilot Definition snapshot of 2026-07-31](./SPOCK-Pilot-Definition.md), which v2.0
replaces. It is kept unchanged and governs nothing.

## The hierarchy

```
   Agent Blueprint  ────────────────►  how it must be built
          │
   Pilot Definition ────────────────►  what is in scope
          │
          ▼
   specifications/PILOT-BUSINESS-LOGIC.md      the pilot's own contract, aligned to both
          │
          ▼
   specifications/definitions/                 area · pattern catalogue · know-how
          │
          ▼
   .github/                            the built agents, skills and gates
```

**Alignment runs downward only.** The business logic aligns to the blueprint, never the reverse. When
the blueprint changes, everything below it is checked against the change — and that check is recorded.

## Known divergences

Declared rather than hidden. Each is a place this pilot does not match a canonical document, with the
reason.

| Divergence | From | Why |
|---|---|---|
| **`max_cost_eur` is declared but unenforceable** | Blueprint §4.3, §5.4 — a spend cap is a constraint, and no constraint scales | GitHub Copilot exposes no per-run cost. Declared per agent, recorded as a known gap, transferred to Engineering as a requirement |
| **Entitlement-filtered retrieval is not implemented** | Blueprint §4.1 | Know-how is repository files with no per-requester filter. Acceptable for a PoC; **required before the problem corpus carries sensitive research** |
| **The independent checker shares a model family with the producer** | Blueprint §5.3 — *"must differ from the model that generated the output"* | Whether a second family is available to ČS is unknown. Open question, to be asked alongside outward research access |
| **The pilot implements three of Torres's four OST levels** | Pilot Definition — the method is the Opportunity Solution Tree | Outcome → Opportunity → Solution → **Artifact**, not Experiment. The pilot covers discovery through definition, not assumption-testing. The Methodology Coach teaches the full framework and names this gap |
| **Stage-2 quarantine read-side is not preventively enforced** | Blueprint §6.2 (R6.2-1) | The privileged consumer runs on a substrate granting file-read while the raw material is on disk. Declared `not_enforced_here`, caught after the fact by C35, and transferred to Engineering as a per-agent read-scope requirement (AB-30, CF-07) |
| **No obligation register; stage-2 personal data carries no attached obligation** | Blueprint §9.2 (R9.2-1), §5.3 (R5.3-1) | Compliance is a generative input scoped to stages 4-6; stage 2 ingests customer tickets and transcripts with no obligation attached and no independent proof. Deferred to Phase 3 with the Compliance Guidelines, ČS-owned (AB-57, AB-58, CF-22) |

**A divergence that is written down is a decision. One that is not is a defect.**
