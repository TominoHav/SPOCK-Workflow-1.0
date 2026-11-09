---
artifact_id: A6
record_id: A6-r01
version: r01
run_id: "2026-08-account-switching"
participant: starlingbank.com
produced_at: "2026-08-26T10:30:00Z"
produced_by: deep-dive@0.1
trace_id: "CA-a-2026-08-26-A6-starling"
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: starlingbank.com
  researched_at: "2026-08-26"
  confidence: high
  sources:
    - publisher_key: starlingbank.com
      publisher: "Starling Bank"
      ref: "Account switching help page and features pages"
      accessed: "2026-08-26"
    - publisher_key: en.wikipedia.org
      publisher: "Wikipedia"
      ref: "Starling Bank article"
      accessed: "2026-08-26"
    - publisher_key: bankadvisor.co.uk
      publisher: "Bank Advisor"
      ref: "Starling Bank review 2025"
      accessed: "2026-08-26"
    - publisher_key: moneyweek.com
      publisher: "MoneyWeek"
      ref: "Starling Bank review and account comparison"
      accessed: "2026-08-26"
    - publisher_key: moneysupermarket.com
      publisher: "MoneySuperMarket"
      ref: "Starling Bank comparison listing"
      accessed: "2026-08-26"
    - publisher_key: moneytothemasses.com
      publisher: "Money to the Masses"
      ref: "Starling Bank current account review 2026"
      accessed: "2026-08-26"
---

## What they offer

**Full CASS switch entirely in-app: no branch visit, no phone call.** The customer taps "Switch to Starling" in the account menu, enters the old bank's sort code and account number, and Starling coordinates the rest. The old account closes on the switch date.

**Bills Manager rings a virtual account around direct debit funds.** Bills Manager separates the money set aside for direct debits from the available spending balance, reducing the risk of a missed payment in the weeks after a switch when an expected payment does not arrive as anticipated.

**Virtual cards reduce the card-on-file exposure.** Customers can issue a virtual card specifically for a subscription service rather than using the main card. When anything changes, only the virtual card credentials need updating rather than the primary card details held across multiple merchants.

**Spaces: up to 30 pots for designated balances.** Each Space is a named, ringfenced balance visible separately from the main account. Customers can run a bills Space, a savings Space, and a discretionary spending Space simultaneously.

**Real-time spending notifications on every card transaction.** Each purchase triggers an immediate notification with merchant name and amount.

**In-app cheque deposit via photograph.** No branch visit required for cheque handling.

**Fee-free card spending abroad.** No currency conversion markup on foreign card transactions.

**Agentic AI financial assistant launched March 2026.** The assistant answers balance, spending pattern, and billing questions conversationally in-app.

## What stands out

**Starling performs a full switch only: the old account closes.** Partial switches, where a customer moves direct debits but keeps the old account open, are not offered. This is a deliberate position. Starling competes for the primary banking relationship and the product assumes the customer is ready to commit.

**Virtual cards provide a structural answer to card-on-file fragmentation.** No other participant in this set offers this in conjunction with a switching service. A customer who routes subscriptions through a virtual card before switching has fewer card-on-file entries to update afterward. The feature was not designed for this purpose but it addresses the gap.

**4.6 million accounts growing 10% year-on-year without a cash switch incentive.** Monzo and Lloyds ran cash offers; Starling did not. Revenue of GBP 887.4 million in FY2026 confirms the model is not dependent on incentive-driven acquisition.

## Where the journey stops

Card-on-file subscription payments are outside CASS scope. Starling's switch page confirms this: customers must update card details manually for recurring subscriptions, the same as they would if a card expired. After the switch completes on Day 7, Starling does not show the customer what is still pointing at the closed old account. Employer salary notification is the customer's responsibility.

## What it costs

Standard personal account: no monthly fee. No fee for foreign currency card spending. Overdraft available; interest rate disclosed in-app and published on the Starling website.

## Confirmed not to do

Does not transfer card-linked subscription payments. Does not notify the customer's employer of the salary change. Does not offer a partial switch. Does not provide a post-switch view of what is still running on the old account.
