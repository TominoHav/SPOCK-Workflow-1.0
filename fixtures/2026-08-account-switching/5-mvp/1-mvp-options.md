---
run_id: 2026-08-account-switching
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the solution, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
produced_by:
  agent: product-owner
  skill: mvp-option-design
sources: [A9, A7]
external_sources: []
assembled_at: 2026-08-27
assembled_from: [A10-r01]
decision:
  gate: G5a
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_manager
  accepted_at: 2026-08-27
  changed_during_refinement: none
  refinements: []
  selection: OPT-A
---

# Three ways to pilot the old-account mandate visibility

Three options are on the table for piloting I1, and all three read the customer's old account via PSD2 AISP consent to surface the list of standing orders and direct debits still registered there. What separates them is when the read happens and what triggers it. One runs throughout the full switching window; a second fires once at the formal completion date; a third makes the check customer-initiated, running only when the customer asks.

[rec:A10-r01]

## OPT-A: Continuous mandate tracker

This option maintains a live list of open mandates at the old bank from the moment the customer grants AISP consent until the switch window closes.

The customer's cost is one AISP authorisation at the point of switching: an authentication step with the old bank that issues the consent token. After that, reading the list requires no further action beyond opening the switching section of the app. The app retrieves the current standing orders and direct debits from the old account and shows them in a persistent switching view. As each mandate transfers to the new account, it leaves the list. When the list shows no active payment instructions, the app confirms the old account is clear of open mandates and the customer has a basis to close it.

The read covers standing orders and direct debits returned by the old bank's PSD2 account information API. It does not cover card-on-file merchant credentials. Card credentials are stored by merchants against the card number; the bank is not party to those relationships, and no PSD2 AISP feed reaches them. That exclusion is structural and confirmed as universal across every guided switching service in the competitive set.

## OPT-B: Completion-day report

This option trades the continuous view for a single definitive report: one AISP read fires on the formal switch completion date and the customer receives one message combining the completion event with the state of the old account.

AISP consent is collected at switch initiation. No reading takes place during the switching window. On the date the bank formally records the switch complete, one call is made to the old account's PSD2 account information API. The result determines the message the customer receives. If no active payment instructions remain, the notification says the account is clear and offers a prompt to close it. If instructions remain, the notification names them by type and amount.

The customer's cost is the same as OPT-A: one AISP authorisation at initiation. They receive one piece of information at one defined moment rather than a persistent view throughout the window.

The read covers standing orders and direct debits, and excludes card-on-file credentials for the same structural reason as OPT-A.

## OPT-C: Customer-initiated mandate check

This option makes mandate visibility something the customer asks for rather than something the bank provides automatically.

AISP consent is collected at switch initiation and the bank holds the token without using it until the customer requests a check. The switching section of the app carries a check control. When the customer taps it, one AISP call retrieves the current standing orders and direct debits from the old account and displays the result immediately. The customer can run this check at any point during the window and any number of times. No check runs on any schedule and no check runs automatically.

The customer's cost at initiation is the same AISP authorisation. Each subsequent check requires a deliberate action: finding and tapping the control. That friction is what the option tests. A customer who finds and uses the check has actively looked for this information; a customer who does not has not, and the option can record both.

The read scope and exclusions are the same as OPT-A and OPT-B: standing orders and direct debits via the PSD2 AISP feed, no card-on-file credentials.

## How to choose between them

Running OPT-A would show whether having the mandate list continuously visible changes how customers behave during the switch. The questions it can answer: do customers who can watch the list deplete close the old account faster or at a higher rate than those who cannot? Does persistent visibility reduce the time spent holding both accounts open simultaneously? P4 in the competitive synthesis establishes that the self-managed switch, the only current approach that answers the confirmed-empty question, costs two to four hours of manual work and up to 90 days of dual-account management. OPT-A tests whether the open banking read replaces that cost in practice, not just in theory.

Running OPT-B would show whether the value of the mandate check lies in the completion moment rather than in the journey. The completion date is when the bank considers the switch done; the customer may already have stopped paying attention. If closure rates after a completion-day report match those after OPT-A's continuous view, the persistent in-window tracking adds no measurable value. If they do not match, the difference says something about when customers are most ready to act on mandate information.

Running OPT-C would show whether customers seek mandate visibility without being prompted and, if so, at which point in the switch they reach for it. If customers rarely use the check control, the finding is that proactive access is not enough on its own, which affects whether OPT-A's persistent view is a feature customers use or a background service they ignore. If customers use the control most in the first week and rarely afterward, the finding is that early disclosure matters more than end-of-window confirmation. Each usage event is a data point on when in the switching journey the question about the old account becomes urgent.

The three options generate different evidence bases for what part of the I1 mechanism does the work.

## What we could not establish

Difficulty was not scored for I1 or for any solution in this run. The Banking Constraints body and the Compliance Guidelines body are both absent. No estimate of cost, technical complexity, regulatory exposure or operational change exists for any of the three options. None of the three is described as easier or harder than the others anywhere in the sources this run holds. The choice between them cannot rest on difficulty grounds.

All three options depend on Czech banks' PSD2 account information API implementations exposing active payment mandate data, as distinct from transaction history alone. Whether Czech AISP implementations do this is unconfirmed by any source in this run. A9 carries this explicitly as an open dependency that the next stage inherits from the selection of I1. A feed that returns transaction history can show where a payment came from; it cannot show what is still authorised at the old bank. If Czech AISP feeds do not expose mandate data in this form, the central mechanism all three options rely on does not operate.

## How this was produced

This is artifact A10 in run `2026-08-account-switching`, stage 5.1, produced under skill `mvp-option-design` by agent `product-owner`. It is assembled from one record, A10-r01, held at `fixtures/2026-08-account-switching/records/5-mvp/A10-r01-options.record.md`.

Sources were A9 (the selected solution) and A7 (the competitive synthesis). A8 (the solution set) and A4 (the prioritised opportunities) were also read for the full description of I1 and the opportunities it addresses.

The Banking Constraints body is absent from this run. The skill's reduction applies: `constraint_basis: none_stated` and `constraints_met` is empty for all three options. The difference between options is stated in `differs_by` on the record.

Gate Q5 is run independently of this document. Gate G5a, where one option is selected, has not occurred. No option is preferred in this document or in the record.
