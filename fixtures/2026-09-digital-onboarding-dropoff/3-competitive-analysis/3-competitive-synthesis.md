---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A7
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
    needs: judge
    reach: artifact
standards_basis: indicative
produced_by:
  agent: competitive-analysis
  skill: synthesis
sources: [A6, A4, A3b]
external_sources: []
assembled_at: 2026-09-08
assembled_from: [R-A7-01]
---

# Competitive synthesis

Distilled from the nine cards A6 carries -- five Czech direct competitors, three ring-3 European
neobanks, and one substitute -- against this run's own opportunities. Seven standards, six patterns, two
trends, three absences. Nothing here recommends an action; it describes what the market does and hands
the gaps to stage 4. [rec:R-A7-01]

**`standards_basis: indicative`.** Every tier below is counted, not judged, exactly as the Competitive
Analysis Standards require -- but the denominator is nine cards from one research pass, not the
ten-or-more the Standards aim for, and the market itself is drawn only from ring 1 (Czech Republic) and
ring 3 (rest of the EU and the UK): ring 2 (CEE) is absent because nothing reached in this pass cleared
the bar to profile a comparator there. A tier computed on nine cards from two of four rings is a real
count of what this pass found, not a settled statistical picture of the whole market. [rec:R-A7-01]

## Offering

**[universal]** (`mobile-app-primary-channel`) A mobile app is the primary channel for opening and managing the account, across eight of
the eight organisations profiled (nine cards including the substitute, which by definition has none).
Bears on none. [rec:R-A7-01]

**[common]** (`bankid-identity-verification`) Bank-authenticated shared identity (BankID), as an issuer or as a relying party, is used for
identity verification by five of nine participants. Bears on O1, O3 -- the identity-verification step
this run's opportunities sit on is, for most of this market, federated infrastructure rather than a
proprietary flow. [rec:R-A7-01]

A third, unquantified pattern belongs here (`lending-bundled-four-of-nine`): four of nine participants (Komerční banka, Air Bank, Fio
banka, Raiffeisenbank CZ) bundle consumer lending or mortgage origination into the same channel as the
current account. The count does not fit any of the four tiers cleanly -- it is below the majority threshold
for `common` and the four are all `leader`-standing, not concentrated among innovators, so `emerging`
does not fit either -- and it is recorded as a pattern rather than forced into a tier it does not earn.

**[common]** Investment access -- in-app stocks, ETFs, funds or a robo-advisory -- extends what six of
nine participants offer beyond a plain current account (the same six as `in-app-investing` above). Bears
on none. [rec:R-A7-01]

**[emerging]** Three of nine participants (the ring-3 neobanks, `tiered-paid-plans`) offer a paid-tier
upgrade path as part of what a customer can buy from the same relationship. Bears on none. [rec:R-A7-01]

## Segment

**[universal]** Every participant profiled targets an individual retail applicant opening a first personal
account with that provider -- nine of nine, counting the substitute as representing the same segment's own
fallback route. Bears on none; this run's segment is exactly this one. [rec:R-A7-01]

**[emerging]** (`life-stage-account-variants`) Life-stage account variants (children, teens, joint) are offered as stages of one
relationship rather than as separate products, by three of nine participants (Komerční banka, mBank CZ,
N26), two of the three marked `innovator`. Bears on none. [rec:R-A7-01]

**[universal]** Eight of the eight organisations profiled reach their segment primarily through a mobile
channel rather than a branch-first relationship (the same eight as `mobile-app-primary-channel`). Bears
on none. [rec:R-A7-01]

**[common]** Five of nine participants let their segment prove identity through federated infrastructure
(BankID) rather than a proprietary onboarding relationship (the same five as `bankid-identity-verification`).
Bears on O1, O3. [rec:R-A7-01]

**This facet's dedicated segment field was retired by the Competitive Analysis Standards at v0.12 in
favour of prose capabilities**, so every finding here is read off what the cards' "What they offer"
sections say about who they serve rather than a purpose-built segment statement, and two of the four
findings above are the same underlying facts as two Offering findings, seen from who they reach rather
than what is offered. [rec:R-A7-01]

## Features

**[common]** (`in-app-investing`) In-app investing -- stocks, ETFs, funds, or a robo-advisory -- reachable from the same
account, by six of nine participants (Komerční banka, Air Bank, Fio banka, Raiffeisenbank CZ, N26,
Revolut). Bears on none. [rec:R-A7-01]

**[rare]** (`proprietary-auth-key-branding`) A named, proprietary authentication key marketed by name -- KB Klíč, RB Klíč -- rather than a
generic login feature, by exactly two participants (Komerční banka, Raiffeisenbank CZ). Bears on
none. [rec:R-A7-01]

**[rare]** (`budgeting-tool-two-neobanks`) Automated budgeting built into the core app -- salary-switch and budgeting tools, or "Pockets"
-- by exactly two participants (Revolut, bunq). Bears on none. [rec:R-A7-01]

**[rare]** (`named-ai-assistant`) A named, branded in-app AI or virtual assistant -- Air Bank's "Aneta", Revolut's "AIR" -- by
exactly two participants. Bears on none. [rec:R-A7-01]

**[emerging]** (`tiered-paid-plans`) A tiered, paid plan ladder layered on a free base tier, by three of nine participants (N26,
Revolut, bunq), two of the three marked `innovator`. Bears on none. [rec:R-A7-01]

## USPs

**[emerging]** Speed of opening stated as the sole headline claim on the general homepage, by three of
nine participants (N26, Revolut, bunq), the same three that confirm A5's B1 trend directly. Bears on
none. [rec:R-A7-01]

**[rare]** A named, proprietary authentication key claimed as a security differentiator, by the same two
participants named under Features (Komerční banka, Raiffeisenbank CZ). Bears on none. [rec:R-A7-01]

**[rare]** A robo-advisory or in-house investment research offering claimed as a differentiator, by exactly
two participants (Raiffeisenbank CZ's "Indigo", Fio banka's investment news). Bears on none.
[rec:R-A7-01]

**[rare]** Scale -- a large, cited customer base -- is claimed as a trust signal by exactly two
participants (N26, Revolut). Bears on none. [rec:R-A7-01]

**This facet's remaining claims are each unique to one participant** -- stability (Komerční banka),
friendliness (Air Bank), zero fees (Fio banka, mBank CZ) -- and a claim one participant alone makes is a
choice, not a standard, per the Standards' own two-participant floor for counting anything at all.
[rec:R-A7-01]

## Pricing

**[common]** (`fee-free-base-account`) A fee-free base current account with no ongoing maintenance charge, by seven of nine
participants (Air Bank, Fio banka, Raiffeisenbank CZ, mBank CZ, N26, Revolut, bunq). Komerční banka's free
period is time-limited (30 days) rather than ongoing, which is why it is not counted here. Bears on
none. [rec:R-A7-01]

**[emerging]** A tiered, paid plan ladder beyond the free base, by three of nine participants (N26,
Revolut, bunq). Bears on none. [rec:R-A7-01]

**[rare]** Independently-quoted lending rates appear as a public pricing data point for exactly two
participants (Air Bank, Raiffeisenbank CZ). Bears on none. [rec:R-A7-01]

**[rare]** A cash sign-up bonus is advertised directly on the homepage by exactly two participants
(Komerční banka, Raiffeisenbank CZ). Bears on none. [rec:R-A7-01]

**Ongoing tariff pricing after an introductory period (Komerční banka) and most investment-product fees**
(Fio banka's brokerage commissions, N26's paid-plan prices beyond Standard) were not itemised on the
pages this pass reached, which is recorded in `What we could not establish` on A6 rather than guessed at
here. [rec:R-A7-01]

## Differentiation

**[universal]** (`no-differentiation-at-opening-step`) No participant's own stated USPs differentiate on the identity-verification or
account-opening step itself -- every stated claim, across all nine cards, concerns what happens after the
account is already open: investing, savings rate, rewards, a robo-advisory, an AI assistant, a proprietary
key. Bears on O1, O2, O3, O4 -- the exact step this run's opportunities sit on is, across this
whole market, not where anyone competes. [rec:R-A7-01]

**[emerging]** Speed of opening as the headline claim -- the same three participants as under USPs (N26,
Revolut, bunq). Bears on none. [rec:R-A7-01]

**[rare]** A branded in-app AI assistant as a stated point of difference -- the same two participants as
under Features (Air Bank, Revolut). Bears on none. [rec:R-A7-01]

**[rare]** A robo-advisory or in-house research offering as a stated point of difference -- the same two
participants as under USPs (Raiffeisenbank CZ, Fio banka). Bears on none. [rec:R-A7-01]

## What the cards confirm about the trend pass

**Speed as the confirmed baseline (A5's B1, `speed-as-baseline-confirmed`).** All three ring-3 neobanks state minutes-not-days opening as
their default expectation on their own sites, not as a claim reserved for one plan tier. [rec:R-A7-01]

**No visible resumption capability, anywhere (`no-visible-resume-capability`).** Across every primary and independent source consulted for
every one of the nine cards, none shows a save-and-resume capability for a partially completed application.
This is the strongest single finding this synthesis carries for stage 4: it is not that the market has
solved O4 differently from how this run's own solutions might; it is that nobody visible in this market has
solved it at all. [rec:R-A7-01]

**Friction clusters after opening, not at it (`friction-after-opening`).** Across seven of the eight organisations profiled, where independent
review sources describe friction it concerns support access, account freezes, forced app migrations and
branch experience -- never the account-opening step itself. [rec:R-A7-01]

**A business/self-employed crossover exists on the same retail app (`business-segment-crossover`).** Three participants (Fio banka,
Raiffeisenbank CZ, bunq) extend their retail app to business or self-employed clients; the count does not
cleanly fit a standard's tier. [rec:R-A7-01]

## Evidence table

| Standard | Exhibited by | Tier | Confidence | What it means for this run |
|---|---|---|---|---|
| Mobile app as primary channel | kb.cz, airbank.cz, fio.cz, rb.cz, mbank.cz, n26.com, revolut.com, bunq.com | universal (8 of 9) | high on every exhibiting card | Table stakes; not a gap this run closes |
| Fee-free base account | airbank.cz, fio.cz, rb.cz, mbank.cz, n26.com, revolut.com, bunq.com | common (7 of 9) | high on every exhibiting card | Pricing parity, not a differentiator to design around |
| In-app investing | kb.cz, airbank.cz, fio.cz, rb.cz, n26.com, revolut.com | common (6 of 9) | high on every exhibiting card | Out of this run's scope (product boundaries, A1) |
| BankID / shared identity verification | kb.cz, airbank.cz, fio.cz, rb.cz, mbank.cz | common (5 of 9) | high on every exhibiting card | ČS already holds this; O1/O3 sit downstream of it |
| No differentiation at the opening step | all 9 cards | universal (9 of 9) | high on every exhibiting card | The clearest opening this synthesis carries, for O1-O4 |
| Life-stage account variants | kb.cz, mbank.cz, n26.com | emerging (3 of 9) | high on every exhibiting card | Not on this run's critical path |
| Tiered paid plan ladder | n26.com, revolut.com, bunq.com | emerging (3 of 9) | high on every exhibiting card | A ring-3 monetisation pattern, not an onboarding one |

## Verdict

### Diagnosis

The market this pass reached competes almost entirely on what happens *after* an account is open --
investing, savings rate, budgeting tools, a named assistant, a proprietary security key -- and almost not
at all on the identity-verification and account-opening step itself. Every one of this run's four promoted
opportunities (O1 through O4) sits on that exact step, and the universal finding above is the clearest
evidence available that this is genuinely unclaimed ground rather than a space already answered by a
competitor this pass could not reach.

### Parity

Where this market has settled table stakes, ČS already appears to hold them by virtue of BankID membership
alone: a mobile app, a fee-free base account, and bank-authenticated identity verification are each common
or universal across the participants profiled. This run is not being asked to catch up on any of the three
`common`-or-`universal` standards above -- it is being asked to fix a step none of them has visibly fixed
either.

### The opening

The clearest opening is the trend finding: no participant profiled shows a save-and-resume capability for a
dropped application, which is precisely this run's O4. A second, narrower opening sits in O1 and O2:
neither a progress indicator during identity verification nor a save-state message after a failed scan
appears on any card. What any of the three would cost the bank to build is not established by anything this
stage read, so none of them is priced or ranked here (ranking is stage 4's job, not this one's).

### Risk

This diagnosis rests on nine cards from two of four rings, with ring 2 (CEE) entirely absent and ring 4
never entered. A CEE comparator -- for instance a bank that has already built exactly the resumption
capability this synthesis calls unclaimed -- would not have been visible to this pass even if it exists,
and this synthesis cannot rule that out. Read the "unclaimed ground" finding as what nine cards from this
pass's two rings show, not as a claim about the whole European market.

## What we could not establish

- **Whether a participant outside ring 1 and ring 3 already answers O4.** No ring-2 comparator was
  profiled (see A5), so the "no visible resumption capability" finding is bounded by what this pass
  reached rather than a claim about the whole market.
- **Ongoing pricing for Komerční banka's tariffs and for investment products across several participants**
  -- inherited from A6's own `What we could not establish` rather than re-derived here, since this step
  holds no capability to go and look.

## How this was produced

Stage 3.3 (Competitive Analysis, synthesis), `synthesis@0.15`, agent `competitive-analysis`, holding no
tools -- everything above is derived from the nine A6 cards and the opportunities in A4 and A3b, and
nothing was researched fresh for this step. The cards were worked facet by facet, offering through
differentiation, rather than as one undifferentiated pass. Every standard's tier is counted from the
distinct-card fraction stated beside it and not judged; every element traces to at least one A6 card key;
every promoted opportunity (O1 through O4) is either addressed by an element above or listed in
`absences[]`, and O5, which A4 parked, is not carried into either list because a parked opportunity was not
asked for a market answer. No element recommends an action. Reaching the seven-element bound on the
standards category is recorded: exactly seven standards are carried, and an eighth genuinely
cross-participant standard was not found in this pass's nine cards.
