---
run_id: 2026-09-savings-goals
artifact_id: A8c
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "no complexity value and no score is written here"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: option-screening
sources: [A8, A1b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A8c-01]
---

# Discovery | Option screens: goal-based saving

Five screens, one per solution, each starting from the accepted initiative screen. **Three of the five differ from the framing and from each other**, which is more discrimination than the previous run produced. [rec:R-A8c-01]

No complexity value is here and none should be. `CR-C6` holds it until all four areas have a card from the bank, and three of the four were written by this team.

## What separates the options

**I5, showing what is already committed, is the only one that removes anything.** It moves no money and creates no arrangement, so the legal trigger about ending something in the journey does not fire. Two areas fall with it: what the client agreed to, and how they get out of it. There is nothing to get out of.

**I4, spending from a goal, is the only one that adds a domain.** Paying from a goal makes it a payment source, so payment services come into play, and it fires one escalation trigger the framing did not.

**I3, the target date, adds an escalation without adding a domain.** An on-track calculation against a date can read as a promise about an outcome the bank does not control. Nothing new is in play; one more trigger sounded.

**I1 and I2 carry the framing set unchanged.** Both move the client's own money between the client's own places, which is what the initiative screen was already about.

## What this means for the comparison

Were the complexity value computable today, it would separate three of the five options: I5 lightest, I4 heaviest, I3 between them on the escalation flag alone.

**That is what the per-option screen exists to find.** If every option inherited the same set, the difficulty side of the comparison would distinguish nothing. Here it distinguishes two domains and two escalation triggers.

## What we could not establish

Sixteen sub-domains remain undecided on all five options, because they rest on inputs that describe the shape of a solution. At stage 4 the shape does not exist: an option is a direction, not a design.

No card names the role an escalation routes to. Every trigger that sounded carries `unstated`, and that is a fact about the cards.

## How this was produced

Step 4.2, `option-screening`, agent `product-owner`. Each screen starts from the accepted initiative screen. **Adding needs no justification and removing needs a written reason**, because an option is more specific than the framing and will legitimately find things the framing could not.

No complexity value and no score are here. The score is step 4.3 and the value is held by `CR-C6`.
