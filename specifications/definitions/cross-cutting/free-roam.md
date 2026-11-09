# Free Roam — who carries it, and who does not

**Version:** 0.2 · **Date:** 1 October 2026 · **Release:** 1.14
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../PILOT-BUSINESS-LOGIC.md) §4.3–§4.5
**Owner:** Igor Tadic

> **What this is.** The roster. Which agents may be invoked outside every workflow, which may not, and why
> each exclusion is what it is. Read off [`.github/registry/agents.yaml`](../../../.github/registry/agents.yaml),
> which is what decides it, and compared against this page by **C178**.
>
> **What this is not.** Not a second account of what free roam is. §4.3 carries the entry token and the rule
> that it is never inferred, §4.4 what composition adds and what travels with the skill, §4.5 storage and the
> three adoption choices with `C23` · `C24` · `C25`. The producer-facing statement of what the mode keeps and
> drops is in [`copilot-instructions.md`](../../../.github/copilot-instructions.md). **A second copy of any of
> that is the defect this repository exists to catch.**

---

## 1. The roster

| Agent | Modes | |
|---|---|---|
| Product Manager | `discovery` · `free-roam` | |
| Opportunity Designer | `discovery` · `free-roam` | **except the `material-intake` binding, which declares `discovery` alone** |
| Competitive Analysis | `discovery` · `free-roam` | |
| Business Analyst | `discovery` · `free-roam` | |
| Methodology Coach | `discovery` | |
| Workflow Support | `discovery` | |

**The three exclusions are the interesting half.**

**`material-intake` declines the token because the quarantine boundary is where a default is not good
enough.** Material neither the user nor an agent authored has no gate behind it and no intake record
downstream of it, and handling it outside a workflow removes both. It is the one binding in the estate whose
modes are declared on the binding rather than on the agent, and `C93` refuses it either way.

**The Methodology Coach and Workflow Support are excluded because the mode would remove nothing from
them.** Neither owns a stage or passes a gate, so each already stands outside every workflow; giving either a
way to stand further outside would be a token with no effect, and a mode that changes nothing is a mode
nobody can reason about.

---

## 2. What this page is checked against

**`C178`, a repository check, compares the table above with the registry, agent by agent.** It guards against a page that lists an agent the mode does not reach, or leaves out one it
does.

---

## 3. How far the mode has been exercised

**No committed run was produced in free roam.** The mode is declared per agent, and on the one binding
above, and guarded by `C23`, `C24` and `C25`; adopting free-roam material into a run is not built (§4.5).
Two uses of it are on record, neither of them a run.

**One dispatch asked the Product Manager for ideas with the entry token** and told it not to start a run. It
came back marked `mode: free-roam`, with no run id and a producer-written `gate: none`, and it carried no
score, rank or recommendation, so the rule the idea set follows inside a run held with no gate behind it. It
also wrote `evidence_basis: pre_synthesis`, which the ideation skill writes when no market synthesis exists
and which §6.9 of the contract declares.

**The Workflow Blueprint records one comparison run under the mode**: a fan-out run beside the single pass
it would replace, over the same brief, problems and synthesis.

**That is the case it is for**, and it is worth stating because it is not obvious: running a changed
composition beside the one it would replace, over the same inputs, shows a defect in the single pass that no
check is looking for. The other two cases are trying an agent before trusting it with a run, and work
that is not a full discovery cycle.

**The case it is not for** is producing material intended for a run, where the run's own stage exists and
its gate is the point.
