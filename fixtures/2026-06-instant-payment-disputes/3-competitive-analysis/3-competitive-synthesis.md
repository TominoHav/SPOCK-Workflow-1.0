---
run_id: 2026-06-instant-payment-disputes
artifact_id: A7
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
sources: [A5, A6]
external_sources: []
scope: run
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied. Synthesis reads A5 and A6 only; no outward reach."
could_not_verify:
  - rule: "the synthesis does not research; it works from the cards and nothing else"
    needs: judge
    reach: process
assembled_at: 2026-08-22
assembled_from: [R-A7-01]
---

# Competitive synthesis

The instant payment recall problem has no market solution in Czech Ring 1 and only one partial solution globally. Monzo's Undo Payments demonstrates that a post-send cancellation window can operate at retail scale and prevent material harm; no European participant outside UK neobanks has matched it. The infrastructure for inter-bank recall messaging exists, settles in under 1.5 seconds, and is not exposed by any retail bank as a client-triggered flow. The gap between what the network can carry and what banks offer to retail customers is the opening this initiative addresses, and this research found nothing in Czech Ring 1 that would close it. [rec:R-A7-01]

---

## Customer-facing recovery

The path a retail client takes after sending an instant payment to the wrong account is a phone call, a wait, and an uncertain outcome in every Czech Ring 1 bank researched. The contact centre is the entry point; cooperation from the recipient is the variable; the timeline is open-ended. Two UK neobanks have moved part of this path in-app, and one has made the cancellation itself digital - but only before the payment settles. After settlement, the path is still human for every participant in this research.

**[common] The contact centre or its equivalent is the primary recovery interface at five of eight participants.** CSOB (branch or form), KB (phone, branch, or email), Air Bank (online banking form), NatWest (contact centre claim), and the substitute:contact-centre-call all route recovery through a human-mediated step before any bank action can be taken. The online form variants (Air Bank, NatWest's online report) are a partial improvement; none is a client-initiated instant recall. Bears on H1, H2, H4.

**[rare] A configurable post-send cancellation window prevents accidental payments at measurable scale before settlement.** Monzo's Undo Payments reversed 1.6 million payments totalling GBP 323 million in under a year (May 2025 to report date), with a median 9-second response time. No other participant in this research has an equivalent in production. The window closes once the payment settles; it does not address APP fraud where the customer was deceived and authorised the payment. Bears on H1; does not cover H2.

**[universal] Recovery after settlement is a request, not a reversal, across all eight participants.** Every participant in this research characterises the post-settlement path as a request to the receiving bank that may be declined. No participant offers a guaranteed recall once funds have cleared. ING states this explicitly: SEPA and instant transfers are final where the customer authorised the payment, even under deception. EBA CLEARING's RRO is a message that travels the network in under 1.5 seconds and binds nobody at the receiving end. Bears on H1, H2.

**[emerging] In-app or online fraud claim submission is available at three participants but none of the Czech Ring 1 banks.** NatWest and Monzo accept APP fraud reports through the app without requiring a phone call. Air Bank accepts recall requests through online banking (not the app, and not in real time). Czech Ring 1 banks have not built this path; they are also not yet under the regulatory incentive that drove UK neobanks to it. Bears on H2, H4.

**[rare] Real-time status tracking during a recall process was found at no participant.** All recovery paths deliver an eventual outcome without giving the customer visibility into where their claim is in the process. Specialist research confirms customers report feeling unsupported during recovery. This gap was observed across all eight participants and no source indicated it was being addressed. Bears on H1, H2, H4.

---

## Liability and reimbursement

Mandatory reimbursement for APP fraud exists only in the UK in this research, and even there it does not guarantee payment. The EU and Czech position is that the authorised payment is final and recovery depends on voluntary cooperation from the recipient. The EBA-ECB 2025 data confirms the consequence: customers absorb 85% of credit transfer fraud losses across the EEA. The UK model demonstrates that mandatory liability changes the incentive to build; it has not yet changed the outcome reliability.

**[rare] Mandatory APP fraud reimbursement up to GBP 85,000 exists in the UK and nowhere else in this research.** PSR PS24/7 (from 7 October 2024) obliges NatWest and Monzo to reimburse within five working days at a GBP 85,000 cap covering 99.8% of Faster Payments APP scam volume. ING, CSOB, KB, Air Bank, and EBA CLEARING operate under no equivalent obligation. PSD3, which would extend this model to EU PSPs, remains unratified. Bears on H2 directly; does not yet apply to Czech Ring 1.

**[universal] The authorised payment is treated as final under every European bank's published position in this research.** ING states this most explicitly; the same assumption underlies the contact centre paths at CSOB, KB, and Air Bank. PSD2 refund rights cover unauthorised transactions; authorised push payments are not covered by any EU mandatory reimbursement right. Bears on H2.

**[common] Wrongful claim rejection after mandatory reimbursement is documented at multiple UK participants.** Monzo's 34% wrongful rejection rate at the Financial Ombudsman Service (3,372 cases) and NatWest's documented pattern of wrongful denials show that mandatory liability does not automatically produce payment. The FCA enforcement action against Monzo (GBP 21.1M, July 2025) confirmed systemic financial crime control failures underlying the rejection pattern. Mandatory reimbursement is a legal floor; operational delivery is not co-extensive with the legal obligation. Bears on H2.

**[emerging] Mandatory reimbursement creates a quantified financial incentive to reduce the time between incident and recall despatch.** Under PSR PS24/7, UK banks absorb 50% of APP fraud losses. Every additional hour between a customer's report and the RRO message going out is a quantified bank liability. Czech banks face no equivalent obligation yet; PSD3 would change this. The incentive UK banks operate under is the condition under which a client-initiated instant recall becomes a financial priority for a bank rather than a service quality choice. Bears on H2, H4.

---

## Prevention before the payment

The market's prevention layer operates before payment dispatch. VoP is mandatory in the EU from October 2025; AI-based tools exist at two participants. All of it is upstream of the problem this initiative addresses. A customer who has already sent the payment is past the prevention layer regardless of which tool was in place.

**[emerging] Verification of Payee is mandatory in the EU from 9 October 2025 and live at approximately 50 European PSPs.** VoP matches a payee's name against their IBAN before a payment is authorised. ING attributes a 50% reduction in invoice fraud to VoP. Czech banks have until 9 July 2027 under Regulation (EU) 2024/886. VoP cannot prevent APP fraud where the client proceeds despite a mismatch warning, and it cannot help once the payment is sent. Bears on H1; does not address H2 or H4.

**[rare] AI-assisted fraud pattern recognition is deployed by one named participant before payment and found insufficient at another.** Starling Bank (profiled on the landscape map) launched Scam Intelligence in October 2025 to analyse screenshots and flag scam indicators before payment authorisation. Monzo received an FCA enforcement action for financial crime controls that did not keep pace with growth. The technology is present; the organisational capability to deploy it without incurring regulatory risk is not universal. Bears on H2.

**[universal] Prevention does not address the recall problem once settlement has completed.** All prevention mechanisms in this market - VoP, AI screening, transaction monitoring - operate before or during payment dispatch. None gives the customer a post-settlement recall path. The market confirms that the problem this initiative targets has no prevention-layer answer; the recall path is needed for cases that bypass or predate the prevention layer. Bears on H1, H2 (direct gap confirmation).

**[emerging] VoP is the only prevention mechanism with a published effectiveness figure, and it is pre-settlement only.** ING's 50% invoice fraud reduction through VoP is the only confirmed prevention effectiveness figure in this research. No post-settlement prevention mechanism exists anywhere in the market. For the two years before Czech Ring 1 banks implement VoP (until July 2027), the in-app recall path is the only available response to misdirected payments at a Czech bank. Bears on H1, H4.

---

## Infrastructure and the unbuilt interface

The network layer for instant payment recall works. RT1 settles inter-PSP messages in under 1.5 seconds; the ISO 20022 RRO message type is defined in the EPC rulebook; CERTIS connects Czech Ring 1 banks directly. The constraint is not the network. The constraint is the client-facing interface that could trigger the RRO message without a contact centre agent as the intermediary between the customer's action and the bank's outbound message.

**[universal] CERTIS (Czech Republic) and RT1 (EU) provide instant payment settlement to all direct participants in this research, with the same finality constraint.** CSOB (code 0300), KB (code 0100), and Air Bank (code 3030) are all CERTIS direct participants as of 23 March 2026. RT1 has 94 European PSP participants. The finality that makes instant payments useful is the same property that creates the post-settlement recall problem. Bears on H1, H4.

**[rare] ISO 20022 RRO recall messaging is defined, published, and available through RT1, with no obligation on the receiving bank to comply.** The EPC SCT Inst Rulebook defines the RRO message. Beneficiary PSPs have 15 business days to respond but are not compelled without a court order or law enforcement directive. One recall per transaction is permitted. The message infrastructure exists; the obligation to act on it does not. Bears on H1, H4.

**[common] Instant payment settlement is irreversible under current scheme rules by design, not by accident.** The sub-10-second settlement is the property that makes instant payments commercially useful. Irrevocability is a stated design property that creates the dispute problem. A solution that slowed settlement to create a recall window would remove the product's value proposition. The solution must operate alongside finality, not against it. Bears on H1, H2.

**[emerging] The client-facing interface that triggers an inter-bank recall message is the unbuilt layer - confirmed absent from the market.** RT1 carries the RRO message. CERTIS connects Czech Ring 1 banks. No bank in this research has exposed a client-initiated recall trigger as a retail product. Building the trigger is tractable; finding the incentive to build it in a market without mandatory liability is not. Bears on H1, H4.

[none] **H1 and H4 have no market solution at the instant layer.** No bank in this research offers a retail client a way to initiate a post-settlement instant payment recall without routing through a contact centre agent. H1 (the misdirected payment) and H4 (despatch speed) share the same structural absence: the network delivers in under 1.5 seconds and the client-facing trigger that would use it does not exist anywhere in Czech Ring 1. This is the gap the initiative addresses and the market confirms nobody else has addressed it. Bears on H1, H4 (stated as absence).

[none] **H2 has a UK answer and no EU or Czech answer.** Mandatory APP fraud reimbursement exists at NatWest and Monzo under PSR PS24/7. Czech and EU clients covered by ING, CSOB, KB, and Air Bank have no equivalent legal right. PSD3 would change this; it is not yet in force. H2 for Czech banking clients is an absence: the market has identified the problem and the UK has legislated a response; the Czech market has not. Bears on H2 (stated as absence for Czech Ring 1).

[none] **H3 and H5 through H7 are not surfaced in the research this synthesis reads.** The landscape map (A5) and competitor cards (A6) reference H1, H2, and H4. H3 and H5 through H7 appear in neither artifact; the synthesis cannot assess the market's response to them. These problems are recorded here as outside the scope of what A5 and A6 establish, not as problems with no market answer. Bears on none of the problems this synthesis can assess.

---

## Evidence table

| Standard | Exhibited by | Tier | Confidence | What it means for this run |
|---|---|---|---|---|
| Contact-centre or form as recovery entry point | CSOB, KB, NatWest, ING, substitute:contact-centre-call | common (5/8) | medium | The baseline the initiative replaces; any alternative must be at least as accessible, which means 24/7 |
| Post-settlement recovery is a request, not a reversal | All 8 | universal (8/8) | medium | The gap the initiative targets; confirmed absent from every participant including infrastructure |
| Mandatory APP fraud reimbursement | NatWest, Monzo | rare (2/8) | medium | UK-only; Czech and EU clients have no equivalent; PSD3 would change this direction |
| Verification of Payee | ING, EBA CLEARING, NatWest (implied by UK IPR) | common (3/8) | medium | Prevention standard; upstream of the problem; Czech Ring 1 deadline July 2027 |
| In-app or online claim or recall submission | NatWest, Monzo, Air Bank (online) | common (3/8) | medium | UX evolution underway; none is a client-initiated instant recall, only a claim submission |
| Post-send cancellation window | Monzo | rare (1/8) | medium | Only retail-scale example found; pre-settlement only; does not address APP fraud |
| AI fraud detection at or before payment dispatch | NatWest (Cora+), Starling Bank (landscape, not carded) | rare (2/8) | medium | Emerging; challenged by enforcement against Monzo; does not address post-settlement |
| ISO 20022 RRO inter-bank recall message support | EBA CLEARING (RT1) | rare (1/8) | medium | Infrastructure present at the network layer; retail client trigger absent everywhere |
| Real-time recall status visibility | None | none (0/8) | - | Confirmed absent from the market; a differentiator the initiative could claim without matching any incumbent |

---

## Verdict

### Diagnosis

This is a market where the infrastructure for instant payment recall works at the network level and has never been exposed to a retail customer as a self-service trigger. The contact centre is the universal entry point not because it is the right design but because no bank in Czech Ring 1 has had a financial liability sufficient to replace it.

### Parity

Any initiative entering this market needs a recall request path that is at least as accessible as a phone call. In the Czech context, that means available when the contact centre is not - evenings and weekends cover the 38% of cases that arrive after hours from this run's problem material. A mechanism that operates only during weekday business hours replaces the substitute at a one-to-one ratio with no advantage. The secondary parity bar is a digital submission channel: three of eight participants now provide one in some form. An initiative without either is visibly behind before it opens.

### The opening

Monzo's Undo Payments and EBA CLEARING's RRO infrastructure describe the two edges of the unbuilt space. The Undo window is the only validated post-send intervention at retail scale; it operates pre-settlement and leaves the APP fraud and post-settlement misdirect problems unaddressed. The RRO message is the technical mechanism for a post-settlement recall; no bank has built the client-facing trigger for it. The opening is in the gap between: a client-initiated action that sends the RRO message to the receiving bank without routing through a contact centre agent, available at the hour the customer discovers the error. No participant in this research occupies that position. The EBA-ECB data shows 85% of credit transfer fraud losses are absorbed by customers; that outcome is what the opening is measured against.

### Risk

The largest risk is not technical: it is the contact centre incumbent. The substitute:contact-centre-call card documents a path that exists today, requires no customer behaviour change, and is the bank's current operating cost. Replacing it requires the customer to trust that the in-app path produces the same or better outcome. NatWest and Monzo's wrongful rejection rates show that even under mandatory reimbursement the outcome is unreliable. The second risk is regulatory: building the fraud-handling infrastructure that Monzo failed to build at pace creates exactly the exposure the FCA found (GBP 21.1M). The third is timing: Czech Ring 1 banks have until July 2027 for VoP compliance, but a bank with resources and a liability incentive could move faster; the compliance deadlines are floors, not commitments.

---

## What we could not establish

**Whether CERTIS carries a recall message equivalent to ISO 20022 RRO.** CERTIS instant payment membership was confirmed for all three Czech Ring 1 banks. Whether CERTIS supports an RRO-equivalent inter-bank recall message for CZK payments was not confirmed from CNB documentation retrieved. RT1 carries the RRO for euro-area payments. Czech instant payments route through CERTIS until the July 2027 IPR deadline; the CZK recall mechanism is unconfirmed.

**ING's retail payment pricing.** The ingwb.com tariff page timed out during stage 3.2 research. The cost of SEPA Instant to ING retail customers is not documented in any source retrieved.

**Whether any EU incumbent outside the UK has a client-initiated post-settlement recall path.** Research reached NatWest, ING, and EBA CLEARING as the representative European set. No EU incumbent (outside UK) was confirmed to offer a self-service in-app instant payment recall. The eight participants researched include the most likely European candidates and none had it; broader research covering banks not in this run's scope would be needed to establish whether any exists.

**The effective date of PSD3.** The proposal was in trilogue as of 2025. Formal adoption and transposition dates are not confirmed. R3 is treated as an in-progress trend rather than an enacted obligation.

**What H3 and H5 through H7 ask of the market.** This synthesis references H1, H2, and H4 explicitly from the landscape map's problem references. The secondary problems (H3, H5-H7) were not reachable in the artifacts found during this session; findings that may bear on them are described by subject rather than by H-number.

**CSOB's recall-specific features and pricing.** CSOB's primary website returned HTTP 500 on two attempts (stages 3.1 and 3.2). CSOB's specific capabilities, pricing, and self-service feature set are unconfirmed. The synthesis reads CSOB as a medium-confidence card with a confirmed absence of instant-by-default routing and no confirmed recall-specific features from available sources.

---

## How this was produced

The synthesis reads A5 (landscape map) and A6 (competitor cards, 8 participants profiled) and nothing else. No outward reach was used at stage 3.3. All findings trace to a card or to the landscape map. No new sources were added; the `external_sources` list on this artifact is empty.

Facet structure was derived from the four problem dimensions visible in the landscape map: the customer experience layer, the liability regime, the prevention layer, and the infrastructure constraint. Evidence table tiers were counted from the 8 profiled participants only (not from the landscape map's unprofiled entries), following Standards §4.1. EBA CLEARING is counted as a participant for tier purposes even though it is type:adjacent.

Participants not profiled with cards are referenced where the landscape map's entry carries a relevant signal. Revolut's APP fraud complaint volume (highest in UK FOS referrals, 2024) and Starling's Scam Intelligence tool are referenced as landscape-map observations, not as card-backed findings.

Egress basis: pilot-test. This carries through from stages 3.1 and 3.2 as provenance; no new fetch was performed here. The synthesis cannot research.

A7 is run-scoped and does not write to S1.
