---
artifact_id: A6
record_id: A6-r02
version: r01
run_id: "2026-08-account-switching"
participant: monzo.com
produced_at: "2026-08-26T10:45:00Z"
produced_by: deep-dive@0.1
trace_id: "CA-a-2026-08-26-A6-monzo"
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: monzo.com
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: monzo.com
      publisher: "Monzo"
      ref: "CASS switching page, Get Paid Early page, Salary Sorter help page"
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      publisher: "Wikipedia"
      ref: "Monzo article"
      accessed: "2026-08-26"
    - publisher_key: finder.com
      publisher: "Finder"
      ref: "Monzo bank account review 2026"
      accessed: "2026-08-26"
    - publisher_key: moneytothemasses.com
      publisher: "Money to the Masses"
      ref: "Monzo current account review"
      accessed: "2026-08-26"
    - publisher_key: moneysupermarket.com
      publisher: "MoneySuperMarket"
      ref: "Monzo account comparison listing"
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      publisher: "Current Account Switch Service"
      ref: "CASS net switching data Q3 2025"
      accessed: "2026-08-26"
---

## What they offer

**Full CASS switch in-app or via the Monzo website.** Direct debits, standing orders, and the account balance transfer to Monzo. The old bank notifies direct debit originators. Incoming payments to the old account redirect automatically for 3 years after the switch.

**Salary Sorter: automatic salary distribution across Pots the moment salary arrives.** The customer assigns percentages or fixed amounts to each named Pot before the next salary payment. When salary lands, Monzo splits it immediately without the customer needing to act. Up to 10 allocation rules per incoming salary payment.

**Get Paid Early: salary credited 24 hours before the standard clearing date.** Monzo releases the salary payment when it appears in the clearing window rather than waiting for the standard settlement time. The feature activates once a recurring salary deposit is detected.

**Up to 20 Pots for designated funds.** Each Pot is a named, ringfenced balance. Bill Pots allow direct debits to draw from the Pot rather than the main account balance, preventing spending money from covering bill commitments.

**Flex: buy-now-pay-later split over 3 or 6 months, initiated in-app after a purchase.** The customer selects a recent qualifying card transaction and converts it to an instalment plan.

**Three paid tiers with bundled benefits: Extra, Perks, and Max.** Extra (GBP 3/month) adds travel insurance. Perks (GBP 7/month) adds cashback and higher Pot interest. Max (GBP 17/month) adds comprehensive travel cover and dedicated customer service.

**93% recommendation rate from surveyed customers (2026).** Monzo publishes this figure on its website. The survey methodology is not published alongside the headline.

## What stands out

**Salary Sorter turns the switch completion moment into a budget restructure.** No other participant in this set prompts the customer to redesign their money organization at the point the first salary lands in the new account. The feature transforms a compliance event (direct debit redirection) into a financial planning interaction.

**9,934 net CASS gains in Q3 2025: Monzo publishes what incumbents do not.** CASS publishes per-institution net gain/loss data. Monzo's Q3 2025 figure was among the top positive performers. This number confirms that CASS switching is a growth lever Monzo is actively managing, not an incidental service obligation.

**Get Paid Early combined with Salary Sorter makes the first post-switch salary the competitive hook.** A customer who receives their salary a day early, already split across purpose-named pots, has a materially different Day 1 experience than an incumbent's customer. The product sequence (switch to activate both features) is designed around that moment.

## Where the journey stops

Card-on-file subscription payments are not transferred by CASS and Monzo does not offer a separate mechanism for them. The Monzo switch page does not name the exclusion explicitly; the gap exists because CASS does not cover it, not because of a Monzo-specific decision. After the switch completes, no Monzo feature shows the customer what is still pointing at the old closed account. Employer salary notification remains the customer's responsibility, though Get Paid Early masks the single-cycle gap by releasing salary regardless of whether the new account details have been registered with the employer yet.

## What it costs

Basic personal account: no monthly fee. Extra: GBP 3/month. Perks: GBP 7/month. Max: GBP 17/month. No fee for switching.

## Confirmed not to do

Does not transfer card-linked subscription payments. Does not show residual old-account payment activity after the switch completes. Does not notify the customer's employer of the account change automatically.
