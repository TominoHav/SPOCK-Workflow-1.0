---
part_of: A8
item_id: IDEA-03
statement: "A two-field addition to the back-office recall form that records when the client first contacted the bank and when the recall was despatched, giving the bank the time-to-despatch metric it has never had."
description: "The form the recalls desk works from carries no timestamp for when the client first called and no timestamp for when the recall went out. Adding both creates the measurement baseline the initiative requires."
solves:
  - H2
  - H6
supported_by:
  - A7-standard-mandatory-reimbursement-uk
  - A7-absence-H2
  - A7-trend-incentive-to-reduce-time
compliance_touchpoints:
  - "Indicative (Compliance Guidelines absent): data governance and retention requirements for operational timestamps added to a payment dispute record."
  - "Indicative (Compliance Guidelines absent): scheme or regulatory rules governing what a bank must record to demonstrate recall despatch timing, relevant if PSD3 mandatory reimbursement takes effect."
---

## IDEA-03: Contact-to-despatch instrument

### What it is

A measurement layer added to the back-office recall form, capturing two timestamps that do not currently exist: when the client first contacted the bank, and when the recall message was sent. The category is internal instrumentation. It produces no client-facing change and occupies no channel. Two other ideas on this slate address the client-facing path; this one makes the delay visible so it can be shortened.

### What it does

The bank cannot compute the time-to-despatch metric for any completed case, because neither timestamp exists. H6 names this absence; the desk operator confirmed it from both sides: the form carries no field for when the client called, and the source system has no field for when the recall went out. This idea adds the two fields and makes the metric computable. For H2, the instrument does not shorten the delay. It establishes the baseline against which any shortening can be verified, and against which any regression can be detected.

### How it works

A client contacts the bank about a payment they want recalled. The contact centre agent opens a recall case. The form now contains one additional field: the client's first contact time. The agent records it at the start of the call, or the telephony system supplies it from the call log if the integration exists. The case moves to the recalls desk. When the desk operator sends the recall message, the despatch timestamp is written from the outbound message confirmation, with no manual entry required.

A reporting layer joins the two timestamps at the case level. A nightly extract calculates elapsed time for every case closed in the period. Operations can read median time-to-despatch and its distribution by day, by hour and by case type. The Friday-evening-to-Monday cluster H2 names will appear as a visible band in the distribution rather than as an estimate.

The inputs are two fields. The output is one duration per case, and a rolling distribution across cases.

### Who it is for

The direct users are bank staff: the contact centre agents who fill the recall form, the desk operators who send recalls, and the operations managers who need to know whether process changes are working. The retail clients named in the brief are the people a shorter despatch time eventually benefits. This idea produces no client-facing interaction for them.

### Why this bank

ČS runs the two-step recall process this instrument was built to measure. The contact centre fills a form; a separate desk sends the recall. Neither step was instrumented when the process was built. The telephony system records when the client called. The outbound message system records when the recall went out. At the case level, nothing connects them.

The UK mandatory reimbursement standard shows the consequence of that gap closing. Under PSR PS24/7, UK banks absorb 50 per cent of APP fraud losses, which turns every additional hour between the client's call and the outbound message into a quantified bank cost. Czech banks are not yet under that obligation. PSD3 would change that direction, and the timing is not confirmed. A bank that has the measurement in place before the obligation arrives can answer the question of where it stands on the day it applies. A bank without it cannot.

The instrument operates entirely within the bank's own data. The telephony log and the outbound message confirmation already exist. The build is the join between them, at the case level, with a reporting surface on top.
