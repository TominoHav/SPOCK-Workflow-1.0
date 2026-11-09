---
run_id: 2026-04-card-disputes
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-08-17
produced_by:
  agent: competitive-analysis
  skill: synthesis
bounds_hit: []
standards:
  - key: ST1
    statement: "Every direct participant profiled in this run offers at least one digital dispute channel — email form, web portal, or in-app flow — making some form of digital dispute initiation a universal baseline across the card dispute market. Mastercard is adjacent and scheme-level; it does not exhibit cardholder-facing standards."
    tier: universal
    source_count: "9 of 10"
    traces_to:
      - csob.cz
      - kb.cz
      - mbank.cz
      - moneta.cz
      - airbank.cz
      - rb.cz
      - revolut.com
      - n26.com
      - monzo.com
    addresses:
      - H2
  - key: ST2
    statement: "Six of ten profiled participants offer card transaction push notifications enabling cardholders to detect an unauthorized charge in real time: ČSOB (every payment in ČSOB Smart), KB (configurable Oznámení o platbách, requires opt-in), mBank (real-time via Moje výdaje), Revolut (instant on every transaction), N26 (real-time on all plans), and Monzo (every card use). Notifications are default-on at the neobanks; opt-in at the Czech incumbents that have the feature. MONETA, Air Bank, and Raiffeisenbank have no confirmed per-transaction alert in their deep-dive cards."
    tier: common
    source_count: "6 of 10"
    traces_to:
      - csob.cz
      - kb.cz
      - mbank.cz
      - revolut.com
      - n26.com
      - monzo.com
    addresses:
      - H1
  - key: ST3
    statement: "Seven of ten profiled participants offer self-service card blocking through a mobile app or internet banking without requiring a phone call: ČSOB (one-tap block in ČSOB Smart), KB (zamknout kartu in KB+), Air Bank (immediate lock in MyAir), Raiffeisenbank (self-service block in eKonto), Revolut (one-tap freeze from notification or transaction screen), N26 (automatic block on dispute submission), and Monzo (in-app freeze, instantly reversible). mBank and MONETA do not list in-app card blocking as a confirmed feature in their deep-dive cards."
    tier: common
    source_count: "7 of 10"
    traces_to:
      - csob.cz
      - kb.cz
      - airbank.cz
      - rb.cz
      - revolut.com
      - n26.com
      - monzo.com
    addresses:
      - H1
  - key: ST4
    statement: "Five of ten profiled participants support transaction-level dispute initiation — the cardholder selects a specific payment in the transaction list and initiates the dispute from that record without navigating to a separate form or contact section: KB (MojeBanka and Mobilní banka), MONETA (Smart Banka CARDS section and Internet Banking, pre-populating date, amount and merchant from the selected record), Revolut (tap transaction, Report an issue), N26 (Home tab, select transaction, There is something wrong), and Monzo (tap transaction, Something wrong, Dispute this transaction). All three innovators on this map exhibit this standard; two Czech banking leaders do. ČSOB, mBank, Air Bank, and Raiffeisenbank do not. Trend: B2, T2."
    tier: emerging
    source_count: "5 of 10"
    traces_to:
      - kb.cz
      - moneta.cz
      - revolut.com
      - n26.com
      - monzo.com
    addresses:
      - H2
  - key: ST5
    statement: "Eight of ten profiled participants publish a maximum resolution timeline: ČSOB (15 working days standard, 35 maximum), KB (15 working days for payment services, 30 calendar for general disputes), mBank (30 days aim, 140 days maximum under Reklamační řád), MONETA (35 working days, the only Czech bank to publish this as a named card-dispute SLA), Air Bank (35 working days, extracted from PDF summary of reklamační řád), Raiffeisenbank (15 working days standard, 35 maximum with mandatory escalation notification), Revolut (85 percent of disputes within 5 weeks, fraud cases within 10 days), and Monzo (8 to 12 weeks for merchant disputes). N26 publishes no resolution SLA. Mastercard publishes scheme timelines — 45-day merchant second presentment, 120-day cardholder filing window — that set the ceiling every issuer operates within."
    tier: common
    source_count: "8 of 10"
    traces_to:
      - csob.cz
      - kb.cz
      - mbank.cz
      - moneta.cz
      - airbank.cz
      - rb.cz
      - revolut.com
      - monzo.com
    addresses:
      - H3
  - key: ST6
    statement: "Three of ten profiled participants — all three innovators — offer in-app post-submission dispute status tracking where the cardholder can see the current state of a filed case without calling: Revolut (tap disputed transaction for real-time status, proactive stage-by-stage notifications with outcome explanation and expected date), N26 (Check progress on the disputed transaction, plus proactive in-app updates whenever there is progress), and Monzo (status visible in Help tab and on the disputed transaction, proactive outcome notification before any provisional credit reversal). No Czech banking participant — including KB and MONETA which have transaction-level initiation — has a confirmed post-submission status channel. Trend: B3."
    tier: emerging
    source_count: "3 of 10"
    traces_to:
      - revolut.com
      - n26.com
      - monzo.com
    addresses:
      - H3
patterns:
  - key: P1
    statement: "KB and MONETA, the two Czech banking leaders at the transaction-level digital standard, operate dual intake tiers: transaction-level in-app initiation alongside retained form, phone, and branch channels. Neither has eliminated legacy channels; both have added the digital layer on top. The addition of digital intake at MONETA increased total dispute volume 29 percent year-on-year (35,000 in 2024 from approximately 27,000 in 2023) — removing intake friction reveals latent demand rather than converting existing volume."
    traces_to:
      - kb.cz
      - moneta.cz
    addresses:
      - H2
      - H3
  - key: P2
    statement: "Revolut, N26, and Monzo have each completed the full unauthorized-transaction response chain as a single in-app sequence with no non-digital step required at any stage: push notification on the transaction, card freeze from the notification or transaction screen, dispute initiation from the same transaction record, and post-submission status tracking throughout. No Czech banking participant has implemented any link between these four steps — where notifications exist they do not connect to dispute initiation, and where digital filing exists there is no status channel."
    traces_to:
      - revolut.com
      - n26.com
      - monzo.com
    addresses:
      - H1
      - H2
      - H3
  - key: P3
    statement: "Mastercard scheme rules set the outer ceiling for dispute timelines — 120-day cardholder filing window, 45-day merchant second presentment — and define the mandatory reason code framework every issuer operates within. These are contractual constraints, not choices. Revolut's fraud fast-track resolves cases in 10 days, demonstrating that internal processing speed is an issuer decision that can sit far below the scheme ceiling. Scheme timelines explain why disputes can take 35 working days; they do not require it."
    traces_to:
      - mastercard.com
      - revolut.com
    addresses:
      - H3
  - key: P4
    statement: "Among the six Czech banking participants profiled, those without transaction-level in-app dispute initiation (ČSOB, mBank, Air Bank, Raiffeisenbank) also have no confirmed in-app status tracking. The two capabilities move together on this map: every participant that has one has the other, and every Czech incumbent that lacks one lacks both. KB and MONETA are the only exceptions — digital intake but no confirmed status tracking — placing them between the Czech baseline and the innovator standard."
    traces_to:
      - csob.cz
      - mbank.cz
      - airbank.cz
      - rb.cz
    addresses:
      - H2
      - H3
  - key: P5
    statement: "Mastercard's optional pre-dispute products — Ethoca Alerts (30 to 40 percent chargeback reduction for enrolled merchants, 80 percent of eligible Fiserv-issuer disputes resolved in under 24 hours), Consumer Clarity (transaction enrichment deflecting first-party fraud before a dispute is filed), and Decision Intelligence Pro (20 percent fraud detection improvement at authorization) — are available to every Mastercard-issuing bank on this map including Česká spořitelna. Whether any Czech ring-1 bank has adopted any of these products is not established from public sources; no Czech bank card in this run discloses enrollment."
    traces_to:
      - mastercard.com
    addresses:
      - H1
      - H3
trends:
  - key: TR-B2
    statement: "Transaction-level in-app dispute initiation is spreading within Czech banking: the Peníze.cz two-bank assessment (July 7, 2025) named only ČS/George and KB; two weeks later MONETA confirmed the same capability (Finparada, July 23, 2025). The count moved from two to at least three Czech banks inside a single quarter. ČSOB — the largest Czech retail bank by assets and customer count — still requires a paper form. The gap between Czech leaders and Czech laggards is narrowing; the gap between Czech banking as a whole and the neobank standard (P2) is not."
    traces_to:
      - A5
    addresses:
      - H2
  - key: TR-B3
    statement: "No Czech banking participant has implemented post-submission case status tracking of any kind. The gap between the Czech market and the neobank standard is complete: every Czech bank card records it as a confirmed absence, and the neobank model (Revolut, N26, Monzo) has been live long enough to demonstrate both technical feasibility and cardholder behavior — status-inquiry calls drop when self-serve tracking exists. The trend direction is unambiguous; Czech banking has not started the movement."
    traces_to:
      - A5
    addresses:
      - H3
  - key: TR-R1
    statement: "PSD3 and the Payment Services Regulation (provisional political agreement November 27, 2025; national transposition expected 2027 to 2028) will impose a 14-calendar-day maximum resolution period for payment disputes. ČSOB (up to 35 working days), MONETA (35 working days, the only published Czech card-dispute SLA), mBank (up to 140 days under Reklamační řád), and Raiffeisenbank (up to 35 working days) currently commit to timelines that would breach this ceiling. PSD3 compresses the resolution window regardless of competitive positioning."
    traces_to:
      - A5
    addresses:
      - H3
  - key: TR-T3
    statement: "Revolut is the only in-scope participant with confirmed LLM automated chargeback adjudication in production at consumer scale — adjudicating sub-threshold disputes without human review and breaking the linear relationship between dispute volume and headcount. No Czech banking participant has disclosed equivalent automation. Mastercard Decision Intelligence Pro operates at authorization across the full network; automated cardholder-facing adjudication is a separate layer the issuer builds, and no Czech issuer in this run has built it."
    traces_to:
      - A5
      - revolut.com
    addresses:
      - H3
  - key: TR-B4
    statement: "All three B4 representatives on this map — participants with an integrated push-notification-to-dispute flow — are innovators outside Czech ring-1 banking. No Czech bank has confirmed a push notification that connects to dispute initiation or card freeze within the same app session. The technology gap is between Czech retail banking as a category and the neobank standard, not between ČS and its nearest Czech competitors."
    traces_to:
      - A5
    addresses:
      - H1
absences:
  - problem: H3
    statement: "No Czech banking participant — including KB and MONETA which have transaction-level initiation — offers any confirmed mechanism for a cardholder to check the status of a filed dispute after submission. The term stav reklamace (dispute status) does not appear in any Czech bank digital banking documentation reviewed in this run. Outcome communication is committed at resolution (after 15 to 35 working days) and at no point in between. What was looked for: in-app case status display on the disputed transaction, automated status email or SMS during investigation, case reference numbers linked to a status channel, or any proactive intermediate communication between filing and final decision. Every Czech bank card records this as a confirmed absence from independent sources."
  - problem: H1
    statement: "No Czech ring-1 banking participant has a confirmed link between a card transaction push notification and dispute initiation or card freeze within the same app flow. ČSOB, KB, and mBank confirm per-transaction push notifications, but none records a path from that notification to freezing the card or filing a dispute within the same session. MONETA, Air Bank, and Raiffeisenbank have no confirmed per-transaction alert at all. What was looked for: a push notification that includes a freeze or dispute action, or that opens the disputed transaction with a dispute option in a single tap. The notification-to-freeze-to-dispute chain that is standard at Revolut, N26, and Monzo has no confirmed Czech banking implementation."
  - problem: H4
    statement: "No profiled participant — Czech or neobank — publishes what it communicates to the cardholder about the security investigation following a confirmed unauthorized transaction: whether the card data is confirmed compromised, whether the merchant or the card scheme was notified, or what fraud prevention follow-up was taken. Every card in this run records security outcome communication as a gap. What was looked for: security outcome language in T&Cs, post-resolution fraud summary communications, or any description of investigation outcome beyond approved or denied. The absence is consistent across all ten profiled participants."
---

# Record R-A7-01 — A7

One synthesis invocation. Not written for a reader; the document assembled from it is 3-competitive-analysis/3-competitive-synthesis.md.
