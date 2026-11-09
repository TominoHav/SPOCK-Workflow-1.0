---
artifact_id: A6
record_id: A6-r03
version: r01
run_id: "2026-08-account-switching"
participant: revolut.com
produced_at: "2026-08-26T11:00:00Z"
produced_by: deep-dive@0.1
trace_id: "CA-a-2026-08-26-A6-revolut"
egress_basis: pilot-test
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
card:
  identity_key: revolut.com
  researched_at: "2026-08-26"
  confidence: high
  primary_unreachable: "revolut.com product and help pages returned HTTP 403; no primary content was retrieved. Data sourced from six secondary publishers."
  sources:
    - publisher_key: en.wikipedia.org
      publisher: "Wikipedia"
      ref: "Revolut article"
      accessed: "2026-08-26"
    - publisher_key: moneyweek.com
      publisher: "MoneyWeek"
      ref: "Revolut bank review 2026 and CASS coverage article"
      accessed: "2026-08-26"
    - publisher_key: pocketwise.co.uk
      publisher: "Pocketwise"
      ref: "Revolut UK bank account review 2026"
      accessed: "2026-08-26"
    - publisher_key: fintechcompass.net
      publisher: "Fintech Compass"
      ref: "Revolut UK banking licence and CASS participation analysis"
      accessed: "2026-08-26"
    - publisher_key: techcrunch.com
      publisher: "TechCrunch"
      ref: "Revolut UK banking licence PRA/FCA approval, March 2026"
      accessed: "2026-08-26"
    - publisher_key: currentaccountswitch.co.uk
      publisher: "Current Account Switch Service"
      ref: "CASS participating institutions list 2026"
      accessed: "2026-08-26"
---

## What they offer

**Full UK bank authorization from PRA and FCA since March 2026.** Revolut operated as an e-money institution for a decade before receiving a full UK banking licence. FSCS deposit protection up to GBP 85,000 (plus the temporary high balance protection to GBP 120,000 for 6 months after qualifying life events) now applies to UK Revolut accounts.

**CASS participation as a licensed bank: direct debits, standing orders, and balance transfer within 7 working days.** Revolut joined CASS on receiving its banking licence. Incoming payment redirection for 3 years is part of the standard CASS service.

**Early Salary: salary credited 24 hours ahead of standard clearing.** The feature activates once Revolut detects a recurring salary deposit. The mechanism is the same as Monzo's Get Paid Early.

**Multi-currency accounts: 36 currencies held simultaneously.** Customers convert at the interbank rate and hold foreign currency balances without conversion. This is the feature that differentiates Revolut from Monzo and Starling for internationally mobile customers.

**Four paid subscription tiers: Plus, Premium, Metal, Ultra.** Ultra (GBP 45/month) includes up to 4% AER on savings vaults, comprehensive travel insurance, and high-limit ATM withdrawals. Standard account carries no monthly fee.

**13+ million UK customers migrating from e-money accounts to the new banking account structure.** The banking licence triggers a customer migration that Revolut is managing in tranches. This figure establishes Revolut's UK scale.

**Standard account: no monthly fee, no fee for foreign currency card spending up to a monthly limit.** The free tier is the primary entry point.

## What stands out

**The banking licence is a structural shift, not an incremental product improvement.** For nine years Revolut offered a product that lacked FSCS protection and CASS access. Both are now available. A Czech customer considering Revolut as a banking destination should note that the Czech Revolut operation remains an e-money product; the banking licence applies to UK accounts only.

**Early Salary targets the same salary-capture moment as Monzo's Get Paid Early.** Two of the three UK neobanks profiled offer the same feature. The convergence confirms that the first salary deposit in the new account is the competitive event both are optimizing for.

**Revolut is the only participant that serves international payment flows as a core product, not an add-on.** Starling and Monzo offer fee-free foreign spending; Revolut offers 36 currency accounts with interbank conversion. For customers who hold or receive money in multiple currencies, Revolut addresses a need the others do not.

## Where the journey stops

Card-on-file subscription payments are outside CASS scope. No Revolut feature shows residual old-account payment activity after a switch. Employer salary notification is the customer's responsibility. Revolut's Czech product is an e-money account that does not carry Czech FSCS-equivalent protection and cannot act as a PAD-compliant switching destination for Czech retail bank customers.

## What it costs

Standard: no monthly fee. Plus: GBP 3.99/month. Premium: GBP 7.99/month. Metal: GBP 14.99/month. Ultra: GBP 45/month.

## Confirmed not to do

Does not transfer card-linked subscription payments. Does not offer PAD-compliant switching for Czech customers (Czech entity is e-money, not a licensed bank in the Czech Republic). Does not show residual old-account activity after switch completes.
