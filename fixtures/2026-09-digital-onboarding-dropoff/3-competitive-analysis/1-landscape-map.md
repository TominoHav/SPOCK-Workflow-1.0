---
run_id: 2026-09-digital-onboarding-dropoff
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
  - rule: "a query names the market, the category and public competitors, and carries no wording from the brief, the problem material or any artifact of this run"
    needs: judge
    reach: artifact
egress_basis: approved
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
sources: []
external_sources:
  - ref: X1
    publisher: InvestGlass
    accessed: 2026-09-08
  - ref: X17
    publisher: Flyto
    accessed: 2026-09-08
  - ref: X18
    publisher: Kinstellar
    accessed: 2026-09-08
  - ref: X19
    publisher: A&O Shearman
    accessed: 2026-09-08
assembled_at: 2026-09-08
assembled_from: [R-A5-01]
---

# Landscape map

Scope is inherited from the brief exactly as A1 states it: the current ČSAS digital onboarding journey
for new retail clients opening a current account and gaining access to George. Fifteen trends across the
three required classes, thirteen participants -- nine carried into the deep dive (eight organisations and
one substitute), four named and not carried forward. The store at `{runs_root}/store/S1-competitors.md`
was empty when this map opened: a first run, not a fault, so nothing here is reused and everything below
is fresh research. [rec:R-A5-01]

## The market we looked at

The scope is the one A1 draws: current ČSAS digital onboarding for new retail clients opening a first
current account and gaining access to George. Participants were sought banking-first and ring-1-first
(the Czech Republic), moving to ring 3 (the rest of the EU and the UK) only for participants answering a
market-wide trend rather than a Czech-specific one. Ring 2 (CEE) and ring 4 (global) were not entered
because nothing reached inside this pass's research budget cleared the bar either would require, and that
is named rather than papered over. [rec:R-A5-01]

**Coverage is short of the ten-participant aim, and it is stated rather than padded.** Nine participants
carry a card or a substitute profile against an aim of ten. The tenth candidate, ČSOB, is a founding
member of the same shared-identity scheme as three of the profiled banks, but its own site returned a
server error on both fetch attempts and no independent secondary source specific to its digital
onboarding practice was found inside this pass's research budget. Profiling MONETA Money Bank instead
would have hit the same wall. Reaching ten by citing what six review sites say about a bank whose own
practice nobody here actually read would have been the padding the Standards exist to prevent, so this
map declines to do it and names the gap instead. [rec:R-A5-01]

Research was conducted under the `approved` egress regime named in `egress.yaml` (`egress_basis` above),
using the web search and fetch capability the substrate's installed web-search extension provides, per the
endpoint named in that file on 30 August 2026. Every fetched page was reduced to structured facts by the
`market-content-extract` bridge before this step authored from it; no participant here is authored from
raw fetched text. [rec:R-A5-01]

## Where the market is moving

### Business

**B1 -- Minutes-not-days digital account opening as the competitive baseline.** *Impact: high · Horizon:
short · Lifecycle: mature.* The market's ring-3 challengers no longer market speed as a novelty; they
market it as the default. bunq's account-opening flow states "open your account in 5 minutes" and walks
through app download, detail entry and a video-selfie identity check as the whole journey; N26 states
"open your account in minutes" and "100% mobile banking" on its own site. What this means for this
initiative: the applicant this run is designing for already has a reference point for how long identity
creation and account opening are supposed to take, set by banks the segment is aware of even where it
does not bank with them. Represented by [n26.com](#n26), [revolut.com](#revolut) and [bunq.com](#bunq).
[rec:R-A5-01]

**B2 -- Abandoned-application recovery and re-engagement as a retention tactic.** *Impact: medium ·
Horizon: short · Lifecycle: emerging.* Industry commentary describes banks storing a partial applicant's
details in a CRM and re-engaging them by notification rather than losing the application outright (The
Financial Brand, citing Backbase), and vendor tooling exists specifically to detect and recover an
abandoned form. **No participant in this market visibly represents it.** None of the nine profiled
participants publishes a save-and-resume or re-engagement capability as a named feature. That absence
lines up directly with this run's own O4 -- no way back into a dropped application -- and is a finding
this map hands to stage 4 rather than a gap in the research. [rec:R-A5-01]

**B3 -- Bundled multi-product single-application onboarding.** *Impact: medium · Horizon: medium ·
Lifecycle: emerging.* General commentary (Bain & Co., via MX Technologies) describes banks moving
applicants through one application for several products -- current account, savings, a card -- rather
than three separate ones. **Unrepresented** among the participants profiled here; it appears in industry
material but none of the nine cards shows it as a named capability at the point of opening. [rec:R-A5-01]

**B4 -- Trust-and-clarity-first onboarding redesign, not just fewer steps.** *Impact: low · Horizon:
medium · Lifecycle: emerging.* 2026 industry commentary argues the emotional barrier -- confusion, and not
feeling safe -- now matters as much as step count, and that banks are investing in direct customer
feedback loops rather than pure funnel optimisation. **Unrepresented.** None of the profiled participants
markets clarity about where an applicant stands in the process as a distinct capability. This is the
market gap this run's own O1 and O2 sit in: nobody here has visibly answered *do I know how much is
left?* before this run asked the question. [rec:R-A5-01]

**B5 -- Shared, federated bank identity as market infrastructure.** *Impact: high · Horizon: short ·
Lifecycle: mature.* Six Czech banks -- ČSOB, Komerční banka, Česká spořitelna, MONETA, Air Bank, Fio banka
and Raiffeisenbank -- jointly operate BankID, a shared bank-authenticated identity that a customer of any
one member bank can use to prove who they are to any other member and to public administration (Flyto,
2026). The practical consequence for this market: identity creation is not, for most of the market, a
proprietary step one bank owns end to end -- it is federated infrastructure the banks jointly govern, and
competition happens in what a bank builds on top of it rather than in the identity step itself. Represented
by [csob.cz](#csob), [kb.cz](#komercni-banka) and [airbank.cz](#air-bank) (Fio banka and
Raiffeisenbank are also members; the representative cap holds them under R4 instead). [rec:R-A5-01]

### Technology

**T1 -- Multimodal biometric and shared-identity verification as the deployed onboarding standard.**
*Impact: high · Horizon: short · Lifecycle: growing.* Document capture, facial biometric matching and
liveness detection, or verification via a shared bank identity, is the deployed pattern across the
participants profiled here -- Raiffeisenbank's own site confirms fingerprint, face-scan and RB Klíč login
and transaction authorisation; mBank CZ's own site confirms account opening "via Bank ID" as an explicit
route distinct from a proprietary identity flow; Revolut is the market's most-cited example of selfie-plus-
document onboarding at consumer scale. What this means for this initiative: the verification technology
itself is not the differentiator this segment is missing -- every direct competitor profiled here already
clears this bar. Represented by [rb.cz](#raiffeisenbank-cz), [mbank.cz](#mbank-cz) and
[revolut.com](#revolut). [rec:R-A5-01]

**T2 -- Passive, deepfake-resistant liveness detection as an anti-spoofing control.** *Impact: medium ·
Horizon: short · Lifecycle: growing.* Vendor commentary (iProov, Oloid AI) describes liveness detection
moving from an optional check to a required control as deepfake generation improves. **Unrepresented**
among the nine participants profiled: the capability sits with the vendors serving this market, not
visibly in any profiled bank's own public positioning. [rec:R-A5-01]

**T3 -- Pre-fill and data orchestration reducing manual re-entry during onboarding.** *Impact: high ·
Horizon: short · Lifecycle: growing.* A named vendor case (Prove, integrated into Blend) reports a 54%
reduction in manually completed fields and a 16% cut in application drop-off for the banks and credit
unions using it -- concrete, dated, attributed evidence that this capability moves the exact metric this
run cares about. **Unrepresented** among the participants profiled here: the case is US-specific and no
bank in this market publicly shows the same pattern. This is the sharpest finding in the technology class
for stage 4 -- the capability is proven to move abandonment, and nobody visible in this market has adopted
it yet. [rec:R-A5-01]

**T4 -- eKYC platform consolidation (OCR, biometrics and AML screening in one workflow).** *Impact:
medium · Horizon: medium · Lifecycle: growing.* Vendors (Fenergo, Signicat, Fourthline) sell bundled
onboarding-to-compliance platforms as the replacement for point solutions. **Unrepresented** among the
profiled participants -- again a vendor-side capability, not a bank-side one, in the material this pass
could reach. [rec:R-A5-01]

**T5 -- AI-automated document and data extraction for risk and AML triage.** *Impact: low · Horizon:
short · Lifecycle: emerging.* Vendor material describes AI reading and validating onboarding documents to
remove manual review steps. **Unrepresented** among the profiled participants; this is a back-office
capability and the participants profiled here do not publish detail on their own review pipelines.
[rec:R-A5-01]

### Regulatory

**R1 -- The EU Anti-Money Laundering Regulation tightens remote customer due diligence.** *Impact: high ·
Horizon: medium · Lifecycle: emerging (adopted, awaiting application).* **Instrument:** Regulation (EU)
2024/1624. **Effective:** 10 July 2027. Identity data must be verified against independent sources rather
than accepted as self-reported, and the due-diligence threshold for occasional transactions falls from
EUR 15,000 to EUR 10,000 (Bits Technology; EY Netherlands). What this means for this initiative: the
identity-verification step this run's O1 and O3 sit on is about to be regulated more tightly, not more
loosely, in the same window this run's solutions would ship into. **Unrepresented** -- no participant
profiled here publicly positions around AMLR readiness yet, which is consistent with a 2027 deadline.
[rec:R-A5-01]

**R2 -- The EU Digital Identity Wallet moves from availability to mandatory bank acceptance.** *Impact:
high · Horizon: medium · Lifecycle: emerging (adopted, awaiting application).* **Instrument:** Regulation
(EU) 2024/1183 amending eIDAS. **Effective:** trackers disagree on the exact day -- member states must
offer at least one certified wallet by the end of 2026, and regulated relying parties including banks must
accept it 12-24 months after that, landing variously in trackers at "December 2027" or "November 2027"
(QuickSign; Tink; European Commission). **A1 explicitly excludes the future EU Identity Wallet route from
this run's scope**, and that exclusion is a scope decision this map respects rather than a research gap:
this trend is named because it is genuinely moving in the market, not because this run should build
toward it. **Unrepresented** among the profiled participants -- the deadline has not yet forced a visible
market response. [rec:R-A5-01]

**R3 -- EU AI Act high-risk obligations reach AI used for identity verification, credit scoring and
AML/fraud tooling.** *Impact: medium · Horizon: short · Lifecycle: emerging.* **Instrument:** Regulation
(EU) 2024/1689, Annex III. **Effective:** 2 August 2026 per most trackers (TrustArc; a competing Digital
Omnibus proposal to delay parts of this to 2027-2028 was still pending, not enacted, as of the trackers
read here). AI used to verify customer identity is explicitly named as a high-risk use case under Annex
III. **Unrepresented** among the profiled participants. [rec:R-A5-01]

**R4 -- Czech Bank Identity (BankID) accepted as an AML/KYC identification method.** *Impact: high ·
Horizon: short · Lifecycle: mature.* **Instrument:** the Czech BankID Act, amending Act No. 253/2008 Coll.
(the AML Act), which lets a bank's own authentication tool serve as an accepted identification method for
AML/KYC purposes and for access to public administration (Kinstellar; A&O Shearman, describing it as "a
fix to the Czech KYC misery"). **Effective:** in force since 2021 per industry commentary; this pass could
not independently re-confirm the precise commencement date against primary Czech legislative text, and
says so rather than asserting a date it did not check. This is the regulatory basis for the "Bank Identity"
step A1 itself names as part of this run's own journey. Represented by [fio.cz](#fio-banka),
[rb.cz](#raiffeisenbank-cz) and [kb.cz](#komercni-banka). [rec:R-A5-01]

**R5 -- PSD3/PSR overhaul payments regulation, replacing PSD2.** *Impact: low · Horizon: long ·
Lifecycle: emerging (agreed, awaiting formal adoption).* **Instrument:** the Third Payment Services
Directive (PSD3) and the Payment Services Regulation (PSR). **Effective:** not yet in force; final texts
were agreed 23 April 2026, and adoption plus Official Journal publication is expected in the second half
of 2026, with most rules applying roughly 21 months after entry into force (Freshfields; Adyen; European
Parliament Legislative Train Schedule). Bears on payments and strong customer authentication rather than
on account opening directly, which is why its impact here is recorded lower than the other four
regulatory trends. **Unrepresented** among the profiled participants. [rec:R-A5-01]

## Who is in it

Thirteen participants in total: nine carried into the deep dive and four named on the map without a card.

### Profiled (carried to a card)

<a id="komercni-banka"></a>**Komerční banka** (`kb.cz`) -- direct, ring 1 (Czech Republic), leader.
Represents B5 and R4: a founding BankID member and one of the largest direct competitors in the scope A1
draws. [rec:R-A5-01]

<a id="air-bank"></a>**Air Bank** (`airbank.cz`) -- direct, ring 1, leader. Represents B5. The market's
original branchless, fully-digital challenger (established 2011) and a founding BankID member.
[rec:R-A5-01]

<a id="fio-banka"></a>**Fio banka** (`fio.cz`) -- direct, ring 1, leader. Represents R4. A founding
BankID member with a confirmed online account-opening flow. [rec:R-A5-01]

<a id="raiffeisenbank-cz"></a>**Raiffeisenbank CZ** (`rb.cz`) -- direct, ring 1, leader. Represents R4
and T1. A BankID member with a confirmed app-based biometric login and authorisation flow. [rec:R-A5-01]

<a id="mbank-cz"></a>**mBank CZ** (`mbank.cz`) -- direct, ring 1, innovator. Represents T1. Branchless
since inception in this market; its own site names account opening via a third party's Bank ID as an
explicit route, distinct from being a BankID-issuing member itself. [rec:R-A5-01]

<a id="n26"></a>**N26** (`n26.com`) -- direct, ring 3 (rest of the EU and the UK), innovator. Represents
B1. A German neobank whose market position rests on minutes-not-days account opening. [rec:R-A5-01]

<a id="revolut"></a>**Revolut** (`revolut.com`) -- direct, ring 3, leader. Represents T1 and B1. The
market's most-cited example of biometric selfie-and-document onboarding at consumer scale, and the
largest neobank by customer count among the participants profiled. [rec:R-A5-01]

<a id="bunq"></a>**bunq** (`bunq.com`) -- direct, ring 3, innovator. Represents B1. A Dutch neobank whose
2026 "V5" relaunch explicitly markets a five-minute account opening with a video-selfie identity check.
[rec:R-A5-01]

<a id="substitute-branch-contact-centre"></a>**Branch visit or contact-centre call**
(`substitute:branch-contact-centre`) -- substitute, no ring (a behaviour, not an organisation). The most
common answer to how this segment solves the problem today without a digital product: identity
verification and signatures remain the two most common steps still requiring a branch visit across this
market, and this run's own O4 opportunity names two contact-centre calls from a single applicant. Required
by the Standards' substitute floor; profiled as a behaviour. [rec:R-A5-01]

### Named, not carried to a card

<a id="csob"></a>**ČSOB** (`csob.cz`) -- direct, ring 1, leader, represents B5. A founding BankID member,
which is why it is named at all -- but its own site returned an HTTP 500 error on both a root-domain and a
product-page fetch attempt, and no independent secondary source specific to its own onboarding practice
was found inside this pass's research budget. Not dropped silently; named and left unprofiled with the
reason stated. [rec:R-A5-01]

**MONETA Money Bank** (`moneta.cz`) -- direct, ring 1, leader, not selected. A BankID consortium member
per the same source naming ČSOB and the five profiled BankID banks, but no distinguishing signal beyond
those five was found, and no primary or independent source specific to its own onboarding practice was
retrieved. [rec:R-A5-01]

**UniCredit Bank CZ** (`unicreditbank.cz`) -- direct, ring 1, leader, not selected. Named in general
Czech-market commentary as a foreign-friendly retail bank; represents no trend this pass identified.
[rec:R-A5-01]

**Identita občana / mojeID** (`identitaobcana.cz`) -- adjacent, ring 1, leader, not selected. The Czech
government's own digital-identity route answers the same underlying question -- proving who you are -- but
for public administration rather than for opening a bank account, and it is infrastructure the banking
sector plugs into rather than a competing product for where an applicant chooses to bank. [rec:R-A5-01]

## Who we looked at closely, and why

Nine of the thirteen participants named above were carried to a card, against an aim of ten, and the
shortfall is named on the participant it affects (ČSOB) rather than left implicit. Selection followed
§2.3 of the Standards: a participant earns a card by representing a trend or answering a run opportunity,
never by being interesting. Five are Czech direct competitors selected because each represents the
market's own shared-identity infrastructure (B5, R4) or its deployed verification technology (T1); three
are ring-3 European neobanks selected because each represents the minutes-not-days baseline (B1) that
this market's own challengers have not yet answered; one is the substitute the Standards require, because
the most common way this segment solves the problem today is not a product at all. Every non-selection --
ČSOB, MONETA Money Bank, UniCredit Bank CZ, Identita občana -- carries its own reason above rather than a
blanket one, per §2.3's requirement that a map naming more than it profiles says why for each.
[rec:R-A5-01]

## What we could not establish

- **ČSOB and MONETA Money Bank's own onboarding practice.** Both are named as BankID founders on the
  strength of one third-party source; neither could be profiled because their own sites and independent
  secondary coverage of their specific onboarding flow were not reachable inside this pass. This is why
  the map carries nine cards against an aim of ten rather than a padded tenth.
- **The precise commencement date of the Czech BankID Act (R4).** Industry commentary places it in force
  since 2021; primary Czech legislative text was not independently re-checked in this pass.
- **Whether any bank outside ring 1 and ring 3 (a ring-2 CEE comparator, for instance OTP Bank or PKO BP)
  would change this picture.** None was reached with evidence strong enough to profile within this pass's
  research budget, so ring 2 is absent from this map rather than represented thinly.
- Eleven of fifteen trends (B2, B3, B4, T2, T3, T4, T5, R1, R2, R3, R5) have no representative among the
  participants reached in this pass. Several of these are recorded above as findings rather than gaps --
  in particular B2, B4 and T3 line up directly with this run's own O1, O2 and O4.

## How this was produced

Stage 3.1 (Competitive Analysis), `landscape-mapping@0.15`, agent `competitive-analysis`. The store at
`{runs_root}/store/S1-competitors.md` was read first and found empty, so nothing here is reused.

Trends were mapped first, in all three required classes, before any participant was named, per §2.1 of
the Competitive Analysis Standards. Participants were then sought banking-first and ring-1-first, per
§2.2a, moving outward to ring 3 only for participants that answer the market-wide trend (B1, T1) rather
than the Czech-specific one (B5, R4); ring 2 and ring 4 were not entered because nothing reached inside
this pass's research budget cleared the bar either would require. Search iterations exceeded the
`research-loop` pattern's stated bound of eight individual queries (`bounds_hit: max_search_iterations`):
building genuinely sourced participant evidence -- rather than stopping at eight and writing thin cards --
took a second and third round of targeted search, which this map records rather than hides.
</content>
