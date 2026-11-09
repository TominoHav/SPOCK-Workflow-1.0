---
artifact_id: A6
record_id: A6-r04
version: r01
run_id: "2026-08-account-switching"
participant: natwest.com
produced_at: "2026-08-26T11:15:00Z"
produced_by: deep-dive@0.1
trace_id: "CA-a-2026-08-26-A6-natwest"
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: natwest.com
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: natwest.com
      publisher: "NatWest"
      ref: "Switch to NatWest page including explicit transfer/non-transfer list"
      accessed: "2026-08-26"
    - publisher_key: which.co.uk
      publisher: "Which?"
      ref: "NatWest current account review and CASS data"
      accessed: "2026-08-26"
    - publisher_key: anna.money
      publisher: "Anna Money"
      ref: "UK bank switching comparison 2026"
      accessed: "2026-08-26"
    - publisher_key: bankinggeek.com
      publisher: "Banking Geek"
      ref: "NatWest switching service review"
      accessed: "2026-08-26"
    - publisher_key: swiftmoney.com
      publisher: "Swift Money"
      ref: "Best bank account switch offers UK 2026"
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      publisher: "Current Account Switch Service"
      ref: "CASS net switching data Q3 2025 and participating institutions"
      accessed: "2026-08-26"
---

## What they offer

**Full CASS switch with a published Day 1 through Day 6-7 timeline.** NatWest publishes the switch schedule by day: the customer applies on Day 1, the switch completes and the old account closes on Day 6 or 7. This is the most explicit daily progression published by any participant in this set.

**Incoming payment redirection from the old account for an indefinite period.** Any payment arriving at the closed old account is forwarded to NatWest. The redirection started for switches from September 2013 onward and has no published end date.

**Explicit published list of what does not transfer: card payments and subscriptions.** NatWest names the exclusion directly on its switch page and gives Amazon as an example: "For some card payments you will need to provide your new card details to the business (e.g. Amazon) in the same way as you would now if your card expired." This is the clearest statement of the card-on-file gap published by any bank in this set.

**Current account range: standard Flex, Reward, and Premiere.** Reward account pays cashback on bills paid by direct debit. Premiere adds travel and mobile phone insurance.

**Switch incentive published seasonally.** NatWest has offered cash incentives for qualifying CASS switches. Amount varies by promotional period.

**In-app card controls: freeze, PIN view, travel notification.** Standard digital feature set across the account range.

## What stands out

**NatWest is the only participant to name the card-on-file exclusion explicitly, with a named merchant as the example.** Every CASS participant faces the same exclusion; NatWest is the only one that puts it in plain language on the switch page. This transparency is the finding. Czech banks publish nothing equivalent.

**The Day 1 through Day 6-7 timeline answers O3 (request tracking) for UK customers.** The customer knows which day the switch will complete before it starts. No Czech bank in this set publishes a comparable schedule. This is the benchmark the initiative should be measured against.

**Net CASS outflows in early 2025 despite a published incentive programme.** NatWest lost more CASS switchers than it gained in at least one published quarter. The incentive did not reverse the trend. Product experience, not cash, is what the challengers are winning on.

## Where the journey stops

Card-on-file payments require manual updating by the customer. NatWest documents this but provides no tool to identify which merchants hold the customer's old card details. After Day 7, there is no NatWest feature that shows what is still pointing at the closed account. Employer salary notification is the customer's responsibility.

## What it costs

Flex (standard): GBP 2/month, waivable with minimum monthly funding. Reward: GBP 2/month with cashback that can offset or exceed the fee. Premiere: GBP 31/month. No switch fee.

## Confirmed not to do

Does not transfer card-linked subscription payments. Does not identify which merchants hold the customer's old card details. Does not notify the customer's employer of the account change. Does not show residual old-account activity after the switch completes.
