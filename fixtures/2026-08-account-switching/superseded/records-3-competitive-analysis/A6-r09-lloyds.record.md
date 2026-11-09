---
artifact_id: A6
record_id: A6-r09
version: r01
run_id: "2026-08-account-switching"
participant: lloydsbank.com
produced_at: "2026-08-26T12:30:00Z"
produced_by: deep-dive@0.1
trace_id: "CA-a-2026-08-26-A6-lloyds"
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: lloydsbank.com
  researched_at: "2026-08-26"
  confidence: high
  primary_unreachable: "lloydsbank.com switching page returned an error page with no usable content. Data sourced from six secondary publishers. The card-on-file exclusion is inferred from CASS-wide rules confirmed on NatWest and Starling primary pages, not from a Lloyds-specific document."
  sources:
    - publisher_key: which.co.uk
      publisher: "Which?"
      ref: "Lloyds Bank current account review and CASS data"
      accessed: "2026-08-26"
    - publisher_key: gocompare.com
      publisher: "Go Compare"
      ref: "Lloyds switching incentive comparison 2026"
      accessed: "2026-08-26"
    - publisher_key: moneytothemasses.com
      publisher: "Money to the Masses"
      ref: "Lloyds Bank account review 2026"
      accessed: "2026-08-26"
    - publisher_key: moneysupermarket.com
      publisher: "MoneySuperMarket"
      ref: "Lloyds Bank account comparison listing"
      accessed: "2026-08-26"
    - publisher_key: swiftmoney.com
      publisher: "Swift Money"
      ref: "UK bank switch cash offers 2026 including Lloyds"
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      publisher: "Current Account Switch Service"
      ref: "CASS participating institutions and 7-day guarantee"
      accessed: "2026-08-26"
---

## What they offer

**CASS full switch with 7-day guarantee.** Standard CASS participation: direct debits, standing orders, and account balance transfer within 7 working days. Incoming payment redirection for 3 years.

**Club Lloyds: monthly lifestyle benefit in exchange for a monthly fee and qualifying spend.** Account holders who pay GBP 3/month and meet a minimum monthly spend requirement choose one lifestyle benefit: Disney+ subscription, cinema tickets, or a magazine subscription. The fee is waivable if the qualifying spend is met in a simpler version of the offer.

**Cash switch incentive: GBP 200-500 for qualifying CASS switches.** Lloyds has run the largest published cash incentive of any participant in this set. The amount varies by promotional period; figures of GBP 200 and GBP 500 appear in 2025-2026 comparison guides.

**Mobile banking app: biometric login, card freeze, push notifications, spending views.** Standard digital feature set.

**Overdraft with pre-approved limit visible in-app.** Customers see their limit and usage without calling.

**Silver account: travel insurance and RAC breakdown cover bundled at GBP 13/month.** Available as an upgrade from the standard account.

## What stands out

**Lloyds' cash switch incentive is the highest published by any incumbent in this set.** GBP 200-500 signals that Lloyds views CASS switching losses as a sufficiently large problem to spend significant money offsetting. No Czech bank in this set runs a cash incentive programme.

**Club Lloyds' lifestyle benefit converts the monthly fee into a discretionary choice, not a deduction.** The customer selects what they want from the account in exchange for the fee. This is a different value architecture than tiered pricing with bundled insurance; the customer's engagement is the product.

**No first-hand account of Lloyds' switching journey scope or timeline.** The primary page was unavailable. What is confirmed here comes from comparison sites. The card-on-file exclusion that applies to all CASS participants is inferred from NatWest and Starling's explicit documentation, not from a Lloyds-specific page. This limits what can be stated with confidence.

## Where the journey stops

Card-on-file subscription payments are outside CASS scope for all participants including Lloyds. No tool on Lloyds' published digital interface shows residual old-account payment activity after the switch completes. Employer salary notification is the customer's responsibility. Whether Lloyds publishes a day-by-day timeline comparable to NatWest's was not confirmed.

## What it costs

Classic account: no monthly fee. Club Lloyds: GBP 3/month, waivable. Silver: GBP 13/month. No switch fee.

## Confirmed not to do

Does not transfer card-linked subscription payments (inferred from CASS scope; not confirmed from a Lloyds-specific source). Does not notify the customer's employer automatically. Primary documentation of switching scope was not accessible; claims rely on secondary sources and CASS-wide rules.
