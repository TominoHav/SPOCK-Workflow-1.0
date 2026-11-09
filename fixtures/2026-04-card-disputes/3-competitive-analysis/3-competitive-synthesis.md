---
run_id: 2026-04-card-disputes
artifact_id: A7
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
produced_by:
  agent: competitive-analysis
  skill: synthesis
scope: run
sources:
  - A6
  - A5
  - A4
external_sources: []
standards_basis: "competitive-analysis-standards@0.9 read and applied. Tier grading per §4.1 — counted, not judged; source_count states confirmed exhibitors of 10 profiled participants. Emerging applied where a minority is concentrated among the three innovators (revolut.com, n26.com, monzo.com). All standards carry at least two confirming participants. Evidence table covers all ten profiled participants. standards_basis is not indicative: the body exists at v0.9 and was read in full."
could_not_verify:
  - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A7-01]
---

# Competitive Analysis | Competitive Synthesis — Card dispute and chargeback handling for retail cardholders

No Czech bank on this map lets a cardholder find out what is happening to a dispute once it has been filed, and all three neobanks do it as a matter of course. Two of the six Czech banks let a cardholder open a dispute by tapping the transaction and four still require a form, an email or a phone call. Six of the ten send a notification for every card payment, not one of the Czech banks connects that notification to any action, and all three neobanks connect it to both a freeze and a dispute. The Czech market is competing on how a dispute is filed while the standard has moved to what happens after it is filed. [rec:R-A7-01]

Ten participants were profiled and the findings below are graded by how much of the market exhibits them, counted rather than judged. Each names the problems this run committed to, or says plainly that it bears on none.

---

## Offering

The Czech card dispute market has settled on a shared baseline and stopped there. Every participant reachable by a Czech cardholder can take a dispute through some digital route and publishes how long it will take, which means neither of those is a differentiator any longer. What separates the participants is not whether the process is digital but how far into the case the digital experience extends, and on that measure the Czech banks stop at submission.

**[universal] A digital route into a dispute is the floor, not a feature.** Nine of the ten profiled participants offer at least one digital dispute channel, from an emailed PDF at ČSOB through structured web forms to full in-app flows at the neobanks. Mastercard is adjacent and scheme-level, so it exhibits no cardholder-facing standard. Any Česká spořitelna initiative that delivers a digital channel and stops has met a baseline every competitor already meets. This is the standard **H2** names, and clearing it is necessary and not sufficient.

**[common] A published maximum resolution time is the market norm, and the published numbers vary by a factor of nine.** Eight of ten publish one: 15 working days standard at ČSOB, KB and Raiffeisenbank, 35 working days at MONETA and Air Bank, 30 days at mBank with a 140-day outer limit under its complaints rules, five weeks for 85 percent of cases at Revolut with fraud inside 10 days, and 8 to 12 weeks for merchant disputes at Monzo. N26 publishes none. For **H3** the number matters less than the silence around it, because a cardholder who knows a case may take 35 working days and cannot see where it is inside that window is exactly the caller the run is trying to stop.

**[common] The Czech leaders added a digital layer and removed nothing.** KB and MONETA both operate transaction-level in-app initiation alongside retained form, phone and branch channels, and neither has retired a legacy route. That is the shape any Česká spořitelna initiative will take too, and it carries a specific consequence for **H2** and **H3** together: MONETA's dispute volume rose 29 percent year on year, to 35,000 in 2024 from roughly 27,000 in 2023, after intake was simplified. Removing filing friction revealed demand that was previously suppressed rather than moving existing cases into a new channel.

**[rare] One participant's offering is the rulebook the others operate inside.** Mastercard sets a 120-day cardholder filing window and a 45-day merchant second presentment, and defines the reason code framework every issuer on this map uses. These are contractual constraints rather than product choices. They bear on **H3** in a way that is easy to get backwards: the scheme explains why a dispute *can* take 35 working days and does not require that it does, and Revolut's 10-day fraud track is the proof, sitting far inside the same ceiling.

---

## Segment

Every participant here serves the same people and none of them designs the dispute experience around who is filing. The distinction that actually predicts behaviour is not age or product but how digital the customer base already is, because that is what determines how many disputes arrive and through which door. The Czech banks with the highest digital penetration are the ones carrying the heaviest consequence of solving intake without solving status.

**[universal] Every direct participant serves retail debit and credit cardholders with no dispute-specific segmentation.** All nine direct participants define their cardholder base the same way and none publishes a different dispute path for a different kind of customer. This finding bears on none of the committed problems, and that is a real result: the problems this run committed to are about the journey rather than about who takes it, and nothing in the market suggests otherwise.

**[common] Incumbents reach existing account holders, neobanks reach the mobile-first.** The six Czech banks position dispute handling as a service inside an existing banking relationship, reached through branches and helplines as well as apps, while Revolut, N26 and Monzo position it as a feature of an account designed around the app. For **H2** this is the difference between adding a digital channel to a relationship and having no other channel to add it to, and it explains why the neobank flows are complete and the Czech ones are partial.

**[emerging] Digital penetration is where dispute volume concentrates, and two Czech banks are already there.** MONETA reports near-total digital penetration and Air Bank reports roughly 85 percent app adoption across 1.58 million clients, with about 930,000 weekly logins. Those two carry the structural pressure first. For **H2** and **H3** the sequence matters: MONETA built digital intake, volume rose 29 percent, and no status channel was built to absorb the questions that volume generates.

**[rare] Nobody serves the cardholder who has already filed.** Not one participant on this map, including the three that offer status tracking, describes a distinct experience for a cardholder waiting on an open case rather than opening a new one. For **H3** that is the whole opportunity stated as an absence in the segment dimension: the market treats filing as the product and waiting as a gap between products.

---

## Features

This is the facet where the market divides, and it divides cleanly. Four capabilities make up the response to an unauthorized transaction, and the neobanks have all four connected while no Czech bank has more than two of them, unconnected. The Czech banks are not missing features so much as missing the joins between the features they already have.

**[common] Six of ten notify on every card payment, and the notification is opt-in at the Czech banks and default at the neobanks.** ČSOB alerts on every payment in ČSOB Smart, KB requires the cardholder to switch on Oznámení o platbách, mBank alerts in real time through Moje výdaje, and Revolut, N26 and Monzo alert on every card use by default. MONETA, Air Bank and Raiffeisenbank have no confirmed per-transaction alert. For **H1** the default matters as much as the capability: a notification a cardholder has to discover and enable is not a detection mechanism for the cardholder who has not discovered it.

**[common] Seven of ten let a cardholder block a card without a phone call.** One-tap blocking is confirmed at ČSOB, KB, Air Bank, Raiffeisenbank, Revolut, N26 and Monzo, and N26 blocks the card automatically when a dispute is submitted. mBank and MONETA do not list it. For **H1** this is the one part of the chain where Czech banking is at the innovator standard, and it is the part that comes after the cardholder has already noticed the charge by some other means.

**[emerging] Five of ten let a cardholder start a dispute from the transaction itself.** KB does it in MojeBanka and Mobilní banka, MONETA in Smart Banka and internet banking with date, amount and merchant pre-filled from the record, and all three neobanks do it by tapping the transaction. ČSOB, mBank, Air Bank and Raiffeisenbank do not. For **H2** this is the standard to clear rather than the one to invent: two Czech banking leaders are already here, and an initiative that lands short of it sits with the four Czech laggards rather than the two leaders.

**[emerging] Three of ten show a cardholder what is happening to a filed case, and all three are neobanks.** Revolut shows real-time status on the disputed transaction with stage-by-stage notifications, an outcome explanation and an expected date; N26 offers Check progress on the transaction with proactive updates; Monzo shows status in the Help tab and on the transaction and warns before reversing a provisional credit. No Czech participant has any of this, including the two with transaction-level filing. **H3** is the one problem in this set that no Czech bank has answered at all.

**[rare] One participant adjudicates disputes without a human and is the only one that has said so.** Revolut runs automated adjudication on sub-threshold disputes in production at consumer scale, which breaks the link between dispute volume and headcount. No Czech participant has disclosed anything equivalent. For **H3** it is the mechanism that makes a fast published resolution time survivable when volume rises 29 percent, and it is the part of the neobank model that is hardest to copy quickly.

---

## What they claim

Every participant here claims speed, and none of them claims visibility. That gap between what the market sells and what the cardholder is left without is the clearest positioning opening on this map, and it is open even at the three participants that have already built the thing nobody is claiming.

**[common] Speed of containment is the dominant claim across the map.** ČSOB leads on push notification plus one-tap block within seconds, the neobanks lead on freeze-from-notification, and the messaging converges on how fast the bleeding stops. For **H1** the claim is well matched to the capability, and it is also where Czech banking is closest to parity, which means it is a poor place to try to differentiate.

**[common] Incumbents claim reach and neobanks claim completeness.** ČSOB's stated advantage is 201 branches and up to 3,300 Czech Post points, the widest physical dispute network in Czech retail banking, while Revolut, N26 and Monzo claim a journey that never leaves the app. For **H2** these are the two honest positions available, and an initiative has to pick one: a digital channel offered as one option among five reads as reach, not completeness.

**[emerging] A published card-dispute service level is used as a claim by exactly one Czech bank.** MONETA is the only Czech participant that publishes 35 working days as a named card-dispute commitment rather than burying a number in general complaints rules. For **H3** that is worth noting precisely because the number is not good: publishing a weak commitment is still a stronger position than publishing nothing, and it sets the bar an initiative has to beat visibly rather than quietly.

**[rare] Nobody claims status visibility, including the three participants that have it.** Revolut, N26 and Monzo all ship post-submission tracking and none of them leads with it in positioning. For **H3** this is the finding with the most direct consequence for Česká spořitelna: the capability is unclaimed ground in the messaging as well as unbuilt ground in Czech banking, so a bank that builds it can also be the first to say so.

---

## What it costs

Nothing about the money separates these participants. Filing a dispute is free everywhere, the charges that exist sit around the edges of the process, and no participant prices any part of the experience the cardholder actually cares about. Pricing is not where this market competes and an initiative should not expect to compete there either.

**[universal] Filing a legitimate dispute costs the cardholder nothing anywhere on this map.** Every profiled participant processes an unauthorized-transaction chargeback at no charge, across all channels including branch and post. This bears on none of the committed problems, and stating that plainly is the point: no part of the problem set this run committed to is a pricing problem, and an initiative that reaches for a pricing lever is answering a question nobody asked.

**[common] What is charged is the card, not the dispute.** Card replacement carries a fee at the Czech banks while dispute handling does not, which keeps the cost of an unauthorized transaction on the physical remedy rather than on the process. This bears on none of the committed problems and is recorded so the next run does not have to establish it again.

**[emerging] A fee for unjustified disputes exists in Czech banking and is not publicly priced.** ČSOB's schedule effective 1 July 2026 charges for an unjustified card transaction complaint per 15 minutes of staff time, and the rate per increment was not retrievable from any public source. For **H2** this is a friction worth knowing about before intake is simplified: a bank that lowers the barrier to filing while retaining an unpriced penalty for filing wrongly has made the decision to file harder to reason about, not easier.

**[rare] No participant prices resolution speed.** Not one offers a paid fast track, and Revolut's 10-day fraud handling is included rather than sold. For **H3** that closes off the obvious commercial answer to a slow process and leaves the operational one: the speed has to come from how the case is worked, not from what the cardholder is willing to pay.

---

## Where the difference actually is

The differentiators on this map are not capabilities but connections. Every Czech bank owns pieces of the unauthorized-transaction response and none of them has joined the pieces, while the three neobanks have joined all four into one sequence that never leaves the app. Regulation is about to move the floor under all of it, which changes the value of acting now.

**[emerging] The integrated chain is the differentiator, and only three participants have it.** Revolut, N26 and Monzo each run notification, freeze, dispute and status as a single in-app sequence with no non-digital step at any point. No Czech participant has implemented any link between these steps. This is the finding that bears on **H1**, **H2** and **H3** at once, and it is the reason those three problems are better read as one journey than as three projects.

**[common] Where a notification exists in Czech banking, it leads nowhere.** ČSOB, KB and mBank all confirm per-transaction push notifications, and none of them records a path from that alert to freezing the card or filing a dispute in the same session. For **H1** the gap is not the alert, which three Czech banks already have. It is that noticing and acting are separate journeys, and the cardholder has to start the second one from the beginning.

**[universal] Status after filing is absent across the whole of Czech banking, and it is confirmed rather than unfound.** The term stav reklamace appears in no Czech bank documentation reviewed in this run, outcome communication is committed at resolution and at no point before it, and every Czech card records the absence from independent sources rather than from silence. For **H3** this is the strongest claim in the synthesis: the gap is total inside Czech banking and closed outside it.

**[emerging] Regulation compresses the resolution window regardless of what anyone builds.** PSD3 and the Payment Services Regulation reached provisional agreement on 27 November 2025 with transposition expected in 2027 or 2028, imposing a 14-calendar-day maximum. ČSOB at up to 35 working days, MONETA at 35, Raiffeisenbank at up to 35 and mBank at up to 140 all currently commit to timelines that would breach it. For **H3** this converts a competitive choice into a deadline, and an initiative that improves resolution speed is doing compliance work that also happens to be differentiating.

**[rare] Nobody tells the cardholder what happened to their security.** No participant on this map, Czech or neobank, publishes what it communicates about the investigation after a confirmed unauthorized transaction: whether the card is compromised, whether the merchant or scheme was notified, or what was done about it. Every card in this run records it as a gap. **H4** is unanswered by the entire market, which makes it the only problem in this set where there is no standard to meet and no competitor to follow.

---

## Evidence table

| Standard | Prevalence | Count | Bears on |
|---|---|---|---|
| At least one digital dispute channel | universal | 9 of 10 | H2 |
| Per-transaction push notification | common | 6 of 10 | H1 |
| Self-service card blocking | common | 7 of 10 | H1 |
| Transaction-level dispute initiation | emerging | 5 of 10 | H2 |
| Published maximum resolution timeline | common | 8 of 10 | H3 |
| Post-submission status tracking | emerging | 3 of 10 | H3 |
| Notification connected to a dispute action | rare | 3 of 10, none Czech | H1 |
| Security outcome communication | rare | 0 of 10 | H4 |

---

## Verdict

### Diagnosis

The Czech card dispute market has split into a group with digital intake and a group without, while every Czech participant operates with no post-submission status channel at all. The three neobank innovators have resolved all three of the run's primary problems in a single integrated flow that no Czech bank has attempted.

### Parity

A Czech banking initiative must provide at least one digital dispute channel (ST1, universal), per-transaction push notification (ST2, common), self-service card blocking (ST3, common) and a published maximum resolution service level (ST5, common). Omitting any of these puts an initiative below the market floor. Transaction-level initiation (ST4, emerging) is present at two Czech leaders and all three innovators; not having it places an initiative with the four Czech laggards rather than the two leaders.

### The opening

ST6 and the H3 absence agree: no Czech bank has built post-submission status tracking, the capability is confirmed at three participants, and it has been the primary difference between Czech banking and the neobanks for years. The H1 absence and ST4 together mark the integrated end-to-end flow as ground the Czech market has not entered at all. An initiative that builds status tracking is doing something no Czech bank has done; one that also builds the notification link closes to the innovator standard from both ends at once.

### Risk

Solving H2 without H3 replicates a pattern already visible in the market. MONETA's 29 percent volume increase followed its intake simplification, so removing filing friction without building status visibility replaces paper friction with call-centre load, which is the metric this run is counted on. Scheme timelines are the outer constraint and not an excuse: the ceiling is 45 days on merchant response and Revolut closes fraud cases in 10. PSD3's 14-calendar-day maximum will force resolution speed regardless of competitive positioning, and current Czech service levels do not meet it.

---

## What we could not establish

**Whether any Czech bank has adopted Mastercard's pre-dispute products.** Ethoca Alerts, Consumer Clarity and Decision Intelligence Pro are available to every Mastercard-issuing bank on this map including Česká spořitelna, and no Czech bank card in this run discloses enrolment. Given the scale of ČSOB and KB as issuers, adoption is plausible and unconfirmed, and it changes the baseline for **H1** if it is happening.

**Whether Czech push notifications fire at authorization or at settlement.** ČSOB, KB and mBank confirm per-transaction alerts and none of them says when. Authorization-time notification would let a cardholder freeze a card before a transaction settles; settlement-time notification would not, and the difference decides how much of **H1** a notification actually answers.

**The rate ČSOB charges for an unjustified dispute.** The schedule effective 1 July 2026 confirms a per-15-minute charge and no public source gives the figure.

**What any participant communicates about a security investigation.** This is recorded as a market-wide absence above rather than as an unknown, because every card looked for it and every card recorded that nothing was published. The distinction matters: **H4** is unanswered by the market, not unresearched by this run.

**Whether the neobank status experience reduces status-inquiry calls.** The claim that self-serve tracking lowers call volume is the mechanism behind the whole H3 argument and no participant publishes call data. The 29 percent volume figure at MONETA is filings, not calls.

---

## How this was produced

**Run `2026-04-card-disputes`, stage 3.3 `synthesis`, quality gate Q3.** The Competitive Analysis agent's synthesis skill produced one record on 17 August 2026 from the landscape map and the ten competitor deep-dives. This document was assembled from that record on 20 August 2026.

**Assembled from one record**, which is where the graded standards, the cross-participant patterns, the trends and the absence register live as fields a check reads:

- **R-A7-01** — `records/3-competitive-analysis/A7-r01-synthesis.record.md`

**The synthesis performs no research.** Its binding holds an empty capability list and every element above traces to a competitor card, to the landscape map, or to the record named above. It writes nothing to the shared competitor store and it recommends no action: stage 4 generates ideas from this material and this document describes the market.

**Research regime `pilot-test`, and the run material is fabricated.** The participants and figures were researched through a test destination rather than an approved one, and `fixtures/README.md` records that this run's problem material was written rather than gathered.

**The facet shape is Competitive Analysis Standards §4.0**: a summary that takes a position, four or more findings each carrying its tier and each naming the problems it bears on or stating that it bears on none, then the evidence table. Tiers are counted from the participant set rather than judged. Three findings state that they bear on none of the committed problems, which is a result rather than an omission.

**Rules no check decided at this gate** are carried in this document's own record block under `could_not_verify`.

**The research ran under Standards v0.9 and this document is written to v0.12.** What that exposes, and the one card that does not meet the source floor v0.10 introduced, is recorded in the deep-dive's own closing section.
