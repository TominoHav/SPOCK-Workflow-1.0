# SPOCK Workflow

**SPOCK takes a product initiative from a first brief to a delivery-ready initiative, with a person deciding at
every stage except the market research.** It runs inside VS Code with GitHub Copilot: four agents do the writing and
the research, the workflow checks every document before a person is asked to accept it, and every stage except the
market research moves on only with a named decision.

**To set it up and start, read [`SETUP.md`](./SETUP.md).**

## The seven stages

| Stage | What it produces | Agent | Who decides |
|---|---|---|---|
| 1 | The initiative brief | Product Manager | you accept the brief |
| 2 | The problems and opportunities, from your material | Opportunity Designer | you confirm and prioritise |
| 3 | The market: competitors and trends | Competitive Analysis | no decision; the research is checked |
| 4 | Solution options, and the one selected | Product Manager | you select one |
| 5 | MVP options, and the chosen one expanded | Product Manager | you select an option, then accept it |
| 6 | The product requirements | Business Analyst | you agree the requirements |
| 7 | The initiative, ready for delivery | Business Analyst | you approve it |

**Two more agents help along the way:** Workflow Support looks at where a run stands and tells you what to do next,
and the Methodology Coach answers questions about the method.

## What stays on your computer

Everything a run produces is written to `runs/` in this folder. Runs are excluded from git and never uploaded.

## Testing

The testing protocol is in [`specifications/onboarding/TESTER-GUIDE.md`](./specifications/onboarding/TESTER-GUIDE.md).
