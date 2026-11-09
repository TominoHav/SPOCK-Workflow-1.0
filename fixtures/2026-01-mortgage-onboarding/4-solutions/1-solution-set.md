---
run_id: 2026-01-mortgage-onboarding
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
external_sources: []
sources:
  - A4
  - A7
  - A1
produced_by:
  agent: product-owner
  skill: ideation
# Ideas | Idea Set — derived from the gate model and
# recomputed at the gate, never read as authored (C65, PD148/D7)
could_not_verify:
  - rule: "3..7 ideas, each a distinct combination of problems, never a rephrasing"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A8-01]
---

# Idea set

> **Fictional.** Invented to exercise the stage-4 gate. See [fixtures/README.md](../README.md).
>
> **Reduced run.** The scoring bands live in know-how that is absent this run (Strategy Basis, Compliance
> Guidelines, Banking Constraints — Phase 3). So **every sub-dimension is unscored**, both axes report a
> denominator of 0, and each idea records why. This is the honest state: a number with no band behind it
> is exactly the generator the design refuses. Compliance touchpoints are named but marked indicative.

Four distinct ideas, each a different combination of the run's problems. **Every primary problem is
covered:** H1 by I1 and I4, H2 by I2 and I3. No two ideas carry the same `solves[]` set. Each binds to at
least one problem and one synthesis element. Nothing here is scored, ranked or recommended — the Product
Owner reads the set whole and selects at G4.


**Assembled from one record**, which carries the fields a gate decides: [rec:R-A8-01].
---

## I1 — In-flow identity and income verification for first-time buyers

### What it is

It is an in-application verification step that confirms identity and income while the buyer is still filling in the application, rather than after they submit it.

The buyer uploads or authorises what is needed at the point the form asks for it, and sees the result immediately. The category is onboarding verification; what makes it distinct is that nothing is deferred to a back-office pass the buyer cannot see.

### What it does

It addresses H1 — the applicant who cannot get an affordability figure without committing to a full submission. Today the figure depends on verification that happens after submission, so the commitment comes first and the answer second.

Applicants currently submit and wait. This makes the answer available while they are still deciding.

### How it works

The buyer reaches the income step and is offered bank-statement authorisation or a document upload. The upload is checked as it lands and an unreadable scan is rejected on the spot rather than three days later. Once income is confirmed, an indicative affordability figure appears in the same screen.

Nothing is queued for a human unless a check fails, and a failure names which document and why.

### Who it is for

First-time buyers in the retail mortgage flow, from the brief. They are the segment with no prior application to copy from and no adviser relationship to fall back on, which is what makes the deferred answer expensive for them specifically.

### Why this bank

The estate already saves and resumes a partial application (T1), so verification results have somewhere to live between sessions. The market treats phone-camera document capture as standard (T3), which means the buyer expectation exists and the build is on established ground rather than novel.

## I2 — A supported path for the buyer who stalls mid-onboarding

### What it is

It is a detection-and-rescue step: the application notices when a buyer has stalled and offers, in the app, a route to a mortgage adviser who can see what they have already filled in.

It is not a help centre and not a chatbot. The category is assisted digital, and what distinguishes it is that the adviser arrives with the buyer's state rather than asking for it again.

### What it does

It addresses H1 and H2 — the applicant who cannot get a figure without committing, and the one who shops the market mid-application. Both are versions of a buyer left alone at the point they most need an answer.

Applicants currently abandon or go to a branch and restart. This keeps them in the flow and brings the help to them.

### How it works

Inactivity beyond a threshold on one step, or a repeated validation failure on the same field, raises an offer of help. The buyer can dismiss it and carry on alone. If they accept, the saved application state travels to the adviser, who opens the same view the buyer is looking at.

The buyer never re-enters anything. Declining leaves the flow exactly as it was.

### Who it is for

First-time buyers in the retail mortgage flow, and specifically the ones who stall — which the run's own problem material shows is where the drop-off concentrates rather than at the start.

### Why this bank

Origination is moving from branch appointment to self-service across this market (B1), which is what creates the stall in the first place. Advisers remain the bank's asset and the broker's strongest ground (B2), so a route that reaches one competes where the bank is strong rather than where it is not.

## I3 — Broker-integrated onboarding handoff

### What it is

It is a shared application view that a broker and the bank both work in, so a buyer arriving through a broker does not start again at the bank.

The category is channel integration. What makes it distinct is that the broker keeps the relationship and the bank keeps the application state.

### What it does

It addresses H2 — the applicant shopping the market mid-application. A buyer who came through a broker has already given their details once, and asking again is where the comparison starts.

Applicants currently re-enter. This carries what the broker already holds.

### How it works

The broker submits an application from their own system into a shared view. The buyer confirms and completes what only they can supply. Both sides see the same status, and a request for a missing document reaches whichever of them can act on it.

No document is asked for twice across the two channels.

### Who it is for

First-time buyers who reach the bank through an independent broker, which this market's own structure makes a large share of the segment rather than an edge case.

### Why this bank

Brokers hold the first-time-buyer relationship in this market and compete on guidance rather than rate (B2). A bank that integrates rather than disintermediates gets the volume without competing on the broker's ground.

## I4 — Assisted-digital hybrid onboarding

### What it is

It is a scheduled adviser session that sits inside the digital application rather than replacing it, booked by the buyer at the point they want it.

The category is assisted digital, the same as I2, and the distinction is deliberate: I2 detects a stall and offers help, this one lets the buyer ask before stalling.

### What it does

It addresses H1 — the applicant who will not commit to a full submission without an answer. Some buyers want a person before they start, not after they are stuck.

Applicants currently choose between a branch appointment and going it alone. This is neither.

### How it works

The buyer picks a slot from inside the application. At the appointed time the adviser joins the buyer's session and sees the same screen, the same partial answers and the same open questions. The buyer keeps control of the form throughout.

Afterwards the application continues in the digital channel with the session's changes already in it.

### Who it is for

First-time buyers who self-select as wanting help, from the brief's retail mortgage segment. They are a different population from I2's, who did not ask and stalled.

### Why this bank

In-flow co-browsing and adviser hand-off is in production in this market but not yet common (T2), which is where an innovator sits. Rate comparison is commoditised, so completion rate is the differentiator (B3) and a hybrid path buys it directly.
