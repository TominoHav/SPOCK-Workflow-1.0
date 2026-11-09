---
run_id: 2026-04-card-disputes
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: human
revisions: 0
sources:
  - A1
  - A4
  - A7
external_sources: []
produced_by:
  agent: product-owner
  skill: ideation
evidence_basis: synthesis
could_not_verify:
  - rule: "3..7 ideas, each a distinct combination of problems, never a rephrasing"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A8-01]
---

# Ideas | Idea Set — Card dispute and chargeback resolution in the digital channel

Five ideas were generated against the three problems this run committed to, and they are not five ways of doing the same thing. Two solve one problem each, one solves the notification gap that precedes both, one joins all three into a single journey, and one answers the problem nobody in the market has answered. The market stage is what separates them: three of the five build a capability no Czech bank has, and one builds a capability three Czech banks already have. [rec:R-A8-01]

Five ideas, presented in generated order. The set carries no scores, no ranking, and no ordering claim. Each idea addresses a distinct combination of problems from A4; no two ideas address identical subsets.

- **ID-1 (solves H3 alone):** Standalone status tracking — valuable for customers who have already filed by any means, including the paper form that will remain in use during any transition period.
- **ID-2 (solves H2 alone):** Standalone digital intake — the prerequisite for any status tracking to be useful on cases filed digitally, and the "without printing anything" requirement of the outcome taken on its own terms.
- **ID-3 (solves H1 alone):** Standalone real-time notification with dispute action — the entry point for the dispute journey; determines when and whether the journey begins at all for each cardholder.
- **ID-4 (solves H1, H2, H3):** The integrated chain — all three primary problems addressed as one product, which is the design the synthesis verdict names as the opening in this market.
- **ID-5 (solves H4):** Post-resolution debrief — secondary problem, total market absence globally; the only idea in the set where CS would be first across all ten profiled participants, not merely first in Czech banking.

---

## ID-1 — Case status tracker
### What it is
A read-only case status view for card dispute cases already filed, accessible from the disputed transaction in the cardholder's CS app transaction history, regardless of the channel through which the dispute was originally submitted.

### What it does
A cardholder who submitted a dispute — by paper form, by phone, or by any future digital channel — can see the live state of their case without calling the bank. The status is presented in plain language: filed, under investigation, awaiting merchant response, resolved. Each status change triggers a proactive push notification so the cardholder learns of progress without having to come back and check. This directly answers the brief's success signal: "customers stop ringing to ask where their case is."

ST6 (post-submission in-app status tracking, emerging, 3/10) is the single standard on this map held only by the three innovators — Revolut, N26, and Monzo. No Czech bank has built it. The absence register in A7 records it as confirmed at every Czech bank from independent sources, not inferred from silence: KB names it as its largest single gap against H3 explicitly; MONETA notes that the term stav reklamace does not appear in any source reviewed. P3 establishes that Mastercard scheme timelines are the outer constraint on resolution speed but impose no requirement on interim communication — the decision to communicate status during the case window belongs entirely to the issuer.

### How it works
1. The cardholder opens the CS app and navigates to their transaction history.
2. They tap the disputed transaction. Below the standard transaction detail, a "Case status" section appears, showing the current state in plain language — for example, "Under investigation — we have asked the merchant for information" — along with the date the case entered that state.
3. When the bank moves the case to a new status, the cardholder receives a push notification naming the new state and the next expected step — for example, "Your dispute is awaiting the merchant's response. We will update you when we have it."
4. At resolution, the notification names the outcome (refunded / claim not upheld) and the amount adjusted, if any, with the expected credit date.
5. Paper-form filers receive the same tracking: the case reference given when they filed links to the status view. No additional step is required from the cardholder to enrol a case in the tracker.

### Who it is for
Cardholders who have already filed a dispute and are currently generating status-inquiry calls to the contact centre. MONETA's 35,000 disputes in 2024 (P1) — all filed after intake was simplified, all generating status calls in the absence of any tracking — gives the floor on the call volume a status tracker addresses. The same profile applies at every Czech bank on this map: any cardholder who has filed a dispute, through any channel, has no self-serve way to check where it stands.

### Why this bank
H3 is the primary problem with the strongest trust tag (strong, four independent origins) and the one the brief names directly in its success signal. The status tracker is the only idea in this set that reduces status-inquiry calls from day one, including from customers who filed on a paper form that will remain in use during any transition period. The competitive position is complete: ST6 is held by none of the Czech banking participants on this map; acting here places CS first in Czech retail banking on the single capability the innovators have used to differentiate themselves from Czech incumbents for several years. TR-B3 confirms the trend direction is unambiguous and Czech banking has not started the movement.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR touchpoint in this idea's frontmatter record is identified from run material — transaction and case data are personal financial data — and is marked indicative. No band, severity, or regulatory obligation has been assessed.

---

## ID-2 — Transaction-level digital dispute initiation
### What it is
A dispute-filing flow that a cardholder triggers by tapping a suspicious transaction in the CS app, pre-filling date, amount, and merchant from the transaction record, so the cardholder adds only their description and submits — with no separate form, email address, or phone number required.

### What it does
It removes the paper form from the digital channel by moving dispute intake to where the cardholder is already looking — their transaction history. KB and MONETA have reached this standard (ST4, emerging, 5/10) alongside all three innovators. CSOB's current intake requires downloading a PDF, completing it, and emailing it to reklamace@csob.cz — digital delivery of a paper-form step. mBank and Air Bank offer web portals or structured form paths that are not transaction-level.

P1 names the operational consequence of solving H2 without H3: MONETA's 29% year-on-year volume increase following intake simplification shows that removing filing friction reveals latent demand rather than converting existing volume. The cardholder who could not easily file before now files; the bank that has not built status visibility then receives a status-inquiry call for each new case. This idea belongs in the set as a standalone capability and as the intake component of the integrated journey (ID-4). Either way it is a necessary precondition for the outcome's "without printing anything" requirement.

### How it works
1. The cardholder opens the CS app and taps an unrecognised transaction in their transaction history.
2. Below the transaction detail, a "Dispute this transaction" button appears.
3. The cardholder taps it. A dispute screen opens, pre-filled with the date, amount, and merchant name from the transaction record.
4. A reason selector asks what happened — options cover: "I did not authorise this charge," "The amount is wrong," "I did not receive the goods or service," and "Other."
5. The cardholder adds a brief description of what they know — for example, "I was in Prague all day; this charge is from Brno" — and optionally attaches a supporting document such as a merchant receipt for an amount dispute.
6. They submit. A confirmation screen shows a case reference number, the reason category, and the bank's published resolution timeline (ST5). The case reference appears in the disputed transaction's detail view so the cardholder can find it again.

### Who it is for
Retail cardholders of all ages who have been forced to use the paper form or the phone to file a dispute. Digital-first customers — approximately 85% of Air Bank's 1.58 million clients and MONETA's near-100% digital penetration (P1) — represent the highest-demand segment. TR-B2 records the branch-to-digital migration progressively removing the branch as the fallback channel; as that fallback narrows, the absence of a digital filing path becomes the cardholder's primary barrier.

### Why this bank
H2 is primary: the outcome names paper elimination explicitly ("without printing anything") and the product goal restates it ("without a call or a paper form"). The warning in P1 is the design constraint this idea carries alongside it: digital intake without H3's status visibility replicates the MONETA pattern — more filed cases, more status-inquiry calls, no net reduction in the call metric the brief counts. Stage 5 will decide how H2 and H3 are scoped relative to each other; this idea presents the standalone H2 solution so that decision can be made on its own terms.

**Compliance mode.** No Compliance Guidelines body exists for this run. The GDPR touchpoint and the PSD3 readiness note in this idea's frontmatter record are both identified from run material — TR-R1 names the PSD3 transposition timeline explicitly — and are marked indicative. No band, severity, or obligation has been assessed.

---

## ID-3 — Real-time push notification with dispute action link
### What it is
A real-time push notification that fires on every card transaction, default-on for all cardholders without any setup required, and includes a one-tap action link that opens the disputed transaction screen in the CS app pre-filled for any charge the cardholder did not authorise.

### What it does
It moves the point at which a cardholder can act on an unauthorized charge from days or weeks after the fact — when a statement arrives, or when the bank calls — to the moment the transaction posts. Default-on is the design decision that separates a notification that reaches everyone from one that reaches only customers who already knew to enable it. KB requires manual activation of Oznámení o platbách; CSOB makes the feature enableable; the three innovators push to all cardholders by default (ST2, common, 6/10).

The connection from notification to dispute action is what no Czech bank has. CSOB, KB, and mBank all confirm per-transaction push notifications; none connects that notification to a dispute or freeze action within the same session. TR-B4 records that every participant combining push notification with dispute action is an innovator outside Czech ring-1 banking. P2 establishes that the full four-capability chain has been completed by all three innovators; this idea addresses the entry point of that chain — the notification and the link — as a standalone capability.

### How it works
1. A card transaction posts. Within seconds a push notification appears on the cardholder's phone: "[Time] — 450 CZK — Restaurace U Dvou Kocek. Was this you?" The notification is visible on the lock screen without unlocking.
2. The notification shows two inline actions: "Yes, that was me" (dismisses quietly) and "No, dispute this" (proceeds).
3. The cardholder who did not make the purchase taps "No, dispute this." The CS app opens directly to the disputed transaction with the dispute screen pre-loaded: date, amount, and merchant pre-filled; "I did not authorise this charge" pre-selected.
4. The cardholder reviews the pre-filled detail, adds any additional context they want the bank to have, and submits. The path from notification to submitted dispute takes under a minute with no navigation required.
5. A cardholder who dismisses the notification or does not respond can still find the transaction in the app's transaction list and dispute it from there using the standard flow (ID-2).

### Who it is for
All retail cardholders, with the highest immediate value to customers who currently discover unauthorized transactions late — via a monthly statement, or via a call from the bank — when the Mastercard 120-day filing window (P3) has not closed but memory of the transaction context has faded. MONETA, Air Bank, and Raiffeisenbank have no confirmed per-transaction push notification (ST2); cardholders of those banks are the most exposed to late discovery. For CS cardholders who already have some notification enabled, the change is the action link; for those who do not, the change is both the notification and the link.

### Why this bank
The brief's outcome begins with customers "spotting" a transaction they did not make. Without a real-time notification, spotting depends on statement frequency, which can be monthly. The first moment of the dispute journey begins at this notification; the quality of that moment determines when and whether the journey starts at all. Making it default-on, rather than opt-in, is the design choice that converts a feature into a service: an opt-in notification reaches only the customers who already knew they needed it. TR-B4 makes the competitive position clear — no Czech bank has done this, and acting here positions CS ahead of every Czech competitor on the notification-to-action dimension.

**Compliance mode.** No Compliance Guidelines body exists for this run. The ePrivacy Directive touchpoint is the most material design constraint for this idea: the default-on choice requires a consent mechanism that satisfies the directive's requirements. Both touchpoints in this idea's frontmatter record are identified from run material and marked indicative. No band, severity, or obligation has been assessed.

---

## ID-4 — Integrated unauthorized-transaction response chain
### What it is
A single in-app journey, triggered by a real-time push notification, that takes a cardholder from first awareness of an unauthorized charge through an optional card freeze, digital dispute filing, and post-submission status tracking in one uninterrupted session — with no non-digital step required at any point.

### What it does
P2 documents that Revolut, N26, and Monzo have each completed this four-step sequence as a single integrated chain. P4 documents that no Czech bank has confirmed any link between these four capabilities: where notifications exist at Czech incumbents they do not connect to dispute initiation, and where digital filing exists there is no status channel. This idea assembles H1, H2, and H3 as one product rather than three separate features — the design that makes each case close without a status-inquiry call, because the cardholder has a self-serve path at every stage of the journey.

The synthesis verdict names this space directly: "an initiative that builds ST6 and AB1's answer at a Czech bank is doing something no Czech bank has done; an initiative that builds ST4 and the notification link is closing to the innovator standard from both ends simultaneously." This idea does both simultaneously, rather than incrementally. TR-R1 adds urgency: PSD3's 14-calendar-day maximum resolution ceiling (national transposition expected 2027–2028) requires the processing and communication infrastructure this chain builds. Preparing for TR-R1 compliance and closing the ST6 gap draw from the same engineering investment.

### How it works
1. A card transaction posts. A push notification fires within seconds: "[Time] — 450 CZK — Restaurace U Dvou Kocek. Was this you?" Visible on the lock screen, default-on for all cardholders with no setup required.
2. The cardholder taps "No, dispute this." The CS app opens to the disputed transaction screen.
3. At the top of the screen: "Do you want to freeze your card while we investigate?" One tap freezes the card immediately and reversibly. The cardholder can unfreeze from the same screen at any time. Freezing is optional; the cardholder proceeds either way.
4. Below the freeze control, the dispute form: date, amount, and merchant pre-filled; "I did not authorise this charge" pre-selected. The cardholder adds a description and submits.
5. The confirmation screen shows the case reference and resolution timeline. Below it: "Track this case" — one tap registers the cardholder for status notifications on this case and opens the live status view.
6. The disputed transaction now shows a status badge in the transaction list. At each status change, a push notification arrives naming the new state and the next expected step. At resolution, the notification names the financial outcome and any refund applied.

### Who it is for
Retail cardholders across all ages, with the highest immediate impact on customers who are currently generating status-inquiry calls — those who have filed by any means and have no self-serve status channel. The MONETA data (P1 — 35,000 disputes in 2024, 29% year-on-year growth after intake simplification) gives the floor on the case volume the integrated chain will be managing on day one; every one of those cases was filed without a tracking mechanism.

### Why this bank
The brief's success signal — "customers stop ringing to ask where their case is" — has a structural root: that call is generated at the intersection of three problems. H1 means the cardholder learns about a charge late; H2 means they must call or print to report it; H3 means they call again after filing to ask where it stands. Addressing any two of the three in isolation replaces one call with another. The integrated chain is the only idea in this set that removes all three call-generating conditions simultaneously. P4 confirms the market pattern: every Czech bank that lacks digital initiation also lacks status tracking; adding both as a connected sequence is the design that produces the outcome the brief counts. ID-4's widest solves set also carries its widest compliance surface.

**Compliance mode.** No Compliance Guidelines body exists for this run. This idea carries the largest compliance surface in the set — the ePrivacy Directive consent surface from the notification, GDPR processing activities across all three chain stages, and the PSD3 infrastructure readiness from TR-R1. All three touchpoints in this idea's frontmatter record are identified from run material and marked indicative. No band, severity, or obligation has been assessed.

---

## ID-5 — Post-resolution security debrief
### What it is
A structured post-resolution notification that tells the cardholder, after a dispute is decided, what was established about the unauthorized transaction and what protective action was taken — in addition to the financial outcome.

### What it does
H4 is a total market absence. No profiled participant on this map — Czech or neobank, including the three innovators that have resolved every other primary problem in this run — discloses what it communicates to the cardholder about the security investigation following a confirmed unauthorized transaction. The current market standard across all ten participants is binary outcome communication: refunded or not, within the published SLA timeline (ST5). Nothing is communicated about whether card data was confirmed compromised, whether the merchant was notified, what fraud-prevention action was taken, or whether the cardholder's card is safe for continued use.

This idea extends the resolution notification from a financial verdict to a structured debrief in two parts: financial outcome and a plain-language "What we found" section, using a constrained vocabulary that describes what the bank established about the security event without exposing investigation detail that banking secrecy or anti-fraud rules may prohibit. P3 establishes that Mastercard scheme rules define the outer constraints on dispute timelines and the mandatory reason-code framework — the issuer's internal investigation and what it communicates beyond the scheme-mandated outcome are the issuer's decision.

### How it works
1. A dispute is resolved. A push notification arrives: "Your card dispute is resolved — open for the full outcome."
2. The cardholder taps through to a resolution screen in the CS app. Section 1 — "Financial outcome" — shows the decision in plain language: "We have refunded 450 CZK to your account, expected by [date]," or "We were not able to uphold your claim" with a brief explanation.
3. Section 2 — "What we found" — uses one of a small set of plain-language statements agreed with the bank's legal and security teams before launch:
   — "Unauthorized use confirmed. Your card has been reissued — a new card is on its way."
   — "No further risk to your card was identified. Your card remains active."
   — "This transaction has been referred to our fraud team for further review. Your card remains active while we continue."
   — "This appears to have been a merchant error. We have informed the merchant."
4. Section 3 — "Next steps" — appears only where relevant. If the card has been reissued, instructions for activating the new card appear here. If no action is needed from the cardholder, this section is omitted.
5. The resolution record remains accessible on the disputed transaction for 30 days after resolution, then moves to the cardholder's document history.

### Who it is for
Cardholders whose disputes were resolved as confirmed unauthorized transactions, where a security event occurred and the bank took protective action. The population most directly served is the customer who receives a refund today and has no information about whether their card data remains exposed or whether the bank did anything beyond reversing the charge. The A7 absence register (H4) establishes this gap as consistent across all ten profiled participants — including cardholders of the three innovators. No cardholder on this map currently receives this communication.

### Why this bank
H4 is secondary in this run's problem set, placed there because it operates downstream of the dispute journey rather than at its entry. This idea merits inclusion because it is the only one in the set addressing a problem that is a total market absence globally, not merely within Czech banking. Building it positions CS ahead of Revolut, N26, and Monzo — not only ahead of Czech competitors. The compliance surface — what can be disclosed about a security investigation — is a design constraint to resolve before specification, not a reason to exclude the idea. The constrained vocabulary proposed in step 3 of How it works is the shape of that compliance problem in plain terms; the guidelines would determine what sits within it.

**Compliance mode.** No Compliance Guidelines body exists for this run. The banking secrecy and anti-fraud disclosure touchpoint is the most design-critical for this idea: the disclosure vocabulary of Section 2 must be validated by the bank's legal and security teams before the feature is specified. Both touchpoints in this idea's frontmatter record are identified from run material and marked indicative. No band, severity, or obligation has been assessed.

---

## What we could not establish
**How difficult any of these are.** No Banking Constraints body and no Compliance Guidelines body exist for this run, so nothing here is weighed for feasibility, cost or regulatory load. The whole difficulty axis of the scoring that follows scored zero out of zero, and five ideas were carried to the gate on value alone.

**Whether the market absences hold outside the profiled set.** Every claim below that a capability is absent from Czech banking rests on the ten participants profiled at stage 3. A Czech bank outside that set could have built any of it.

No Compliance Guidelines body exists for this run. This body is named as a declared input to the ideation skill and has not been assembled. Each idea's compliance touchpoints are identified from the run's own material — the brief, the problem set, the synthesis regulatory trends (TR-R1 for PSD3), and general regulatory context visible in A7 (ePrivacy Directive, GDPR, Mastercard scheme rules, banking secrecy). Every named touchpoint is marked indicative in the touchpoint's own text, naming the absent body. No band, severity, or regulatory obligation has been assessed against any touchpoint. What the Compliance Guidelines would add when they land is the shaping and assessment of each touchpoint; what is written here is only the identification.

---

## How this was produced
**Run 2026-04-card-disputes, stage 4.1 ideation, quality gate Q4 then decision gate G4.** The set was generated from the brief, the prioritised problems and the competitive synthesis.

**Assembled from one record**, which carries each idea's id, the problems it solves and the evidence it rests on as fields a check reads:

- **R-A8-01** — records/4-solutions/A8-r01-ideas.record.md

| Primary problem | Addressed by |
|---|---|
| H3 — No acknowledgement or status visibility (strong) | ID-1, ID-4 |
| H2 — No digital dispute channel (weak) | ID-2, ID-4 |
| H1 — No timely notification (weak) | ID-3, ID-4 |

H4 (secondary) is addressed by ID-5. H5 is parked in A4 and is not a target for this idea set. Every primary problem in A4 is addressed by at least one idea.

ST6 (post-submission status tracking, emerging, 3/10 — all three innovators only) and the full AB1 absence register are the strongest signals to this stage. No Czech bank has built the capability H3 directly names; the gap is confirmed from independent sources at every Czech bank card in this run; all three innovators have had it for several years. The synthesis verdict names it explicitly as the opening, and the H3 component of ID-1 and ID-4 both occupy that space.

TR-B4 and the AB2 absence (no notification-to-action link at any Czech bank, confirmed from independent sources) mark the notification-to-dispute path as the capability that distinguishes Czech banking from the innovator standard. ID-3 and the H1 component of ID-4 address that gap.

P1's warning — that solving H2 without H3 increases filed volume without reducing call load — is the design constraint that governs how H2 and H3 are scoped relative to each other. The set carries that constraint as a visible relationship between ID-2 (H2 alone) and ID-1 (H3 alone) rather than resolving it at this stage. Stage 5 is where that relationship becomes a scoping decision.

Does not score, rank, order, or recommend. Does not select an idea — a person does, at G4, after scoring in A8b. Does not run Q4 or report a gate result for its own output. Does not write A8b, A9, or any other artifact. Does not touch A1, A4, A7, or RUN-STATE.md.
