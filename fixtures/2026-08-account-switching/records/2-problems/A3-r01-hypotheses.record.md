---
run_id: 2026-08-account-switching
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-08-26
bounds_hit: []
trace_id: []
sources: []
external_sources: []
observations_read: 24
hypotheses:
  - id: H1
    statement: "We believe nobody can tell a switcher what is still attached to the old account, so they find out only when a payment fails or a charge arrives."
    evidence: [A2-item-1-o3, A2-item-1-o5, A2-item-2-o2, A2-item-2-o3, A2-item-3-o2, A2-item-5-o1]
    trust: strong
    rationale: "Four independent origins in the qualifying set: customer-1, customer-2, adviser-k-novakova and ops-i-prokopova. All six references have complete provenance and all six are first hand, so nothing fell out of the qualifying set. The four describe the same absence from four positions: a customer who learned by being billed, a customer who stalled on the question, an adviser who cannot open the leaving account, and the desk that works only the list it is handed. Twice the two-origin threshold, with a witness."
    disconfirming: "An observation of a switcher who obtained a list of everything pointing at the old account, from either bank or from their own records, would contradict this. A2-item-2-o2 has a customer sitting with a year of statements and still unable to tell the annual charges from the cancelled ones; an observation that a year of statements does answer the question would move this from a visibility problem to an effort problem."
    themes: [visibility of the old account, discovery by failure, the list nobody holds]
    kind: true
    reduced_from:
      - ref: A2-item-3-o4
        statement: "What we need is a screen in the app that shows the old account's payments next to the new one, with a tick box on each row, so the client goes down the list and says move this, leave that, stop the other."
  - id: H2
    statement: "We believe the salary is the one instruction in the move that neither bank controls, and nobody tells the switcher when it will actually arrive."
    evidence: [A2-item-1-o2, A2-item-4-o4]
    trust: strong
    rationale: "Two independent origins in the qualifying set: customer-1 and onboarding-r-simek, both first hand and both with complete provenance. The customer signed at the start of a month, was not told the payroll run had closed, and moved a salary across by hand. The onboarding team states that the instruction lives with an employer neither bank can talk to, and that the bank hands over a template letter and never learns whether it was sent. Two origins with a witness is the bar, and nothing fell out."
    disconfirming: "An observation of a switcher who was told at signing when the first salary would land would contradict this directly. A2-item-4-o4 says the bank never learns whether the template letter is sent; an observation that it does learn, from the employer or from the credit arriving, would narrow this to the telling rather than to the instruction."
    themes: [salary timing, employer instruction, expectation setting]
    kind: barrier
  - id: H3
    statement: "We believe the switching request carries no state once it is sent, so neither the client nor the adviser can find out whether the move worked."
    evidence: [A2-item-3-o3, A2-item-4-o3]
    trust: strong
    rationale: "Two independent origins in the qualifying set: adviser-k-novakova and onboarding-r-simek, both first hand and complete. The adviser describes pressing send and having nothing to open afterwards, and rings the client a fortnight later off a sticky note she invented herself. The onboarding team describes the same request from inside the software as a message and a row in a table with no state in it. One origin describes the absence from the counter and the other from the code."
    disconfirming: "An observation of an adviser or a client opening any record of a switching request while it is in flight would contradict this. A2-item-3-o3 has the adviser calling the fortnight call her own invention; an observation that it is a documented process would move this from an absent record to an unused one."
    themes: [request state, progress visibility, adviser workaround]
    kind: barrier
  - id: H4
    statement: "We believe a switch is recorded complete when the form has been worked, so the bank counts as finished a move the customer is still half way through."
    evidence: [A2-item-2-o1, A2-item-5-o5]
    trust: strong
    rationale: "Two independent origins in the qualifying set: customer-2 and ops-i-prokopova, both first hand and complete. The desk states that completion means it did what was on the form and has never claimed it means the customer has moved. The customer is the other end of the same sentence: half moved for five months, both accounts open, and nothing anywhere recording that. Two origins with a witness, and nothing fell out."
    disconfirming: "An observation of a completion record that reads the new account rather than the form would contradict this. A2-item-5-o5 has the desk saying it has never claimed otherwise; an observation of somebody upstream reading the number with that caveat attached would narrow this to how the number is presented rather than to what it counts."
    themes: [definition of complete, measurement, half moved]
    kind: barrier
  - id: H5
    statement: "We believe nothing at the bank counts whether an opened account became anybody's main account, so nobody can say how often the move fails."
    evidence: [A2-item-3-o1, A2-item-3-o5, A2-item-4-o1, A2-item-5-o3]
    trust: strong
    rationale: "Three independent origins in the qualifying set: adviser-k-novakova, onboarding-r-simek and ops-i-prokopova. All four references have complete provenance. Three are first hand and the fourth, the desk's estimate of returned mandates, is aggregated and is the only figure this material contains. The adviser never learns what became of an account she opened, the onboarding team's numbers stop at the account being open and nobody downstream could be named, and the desk has no report counting the cases it sends back. Above the threshold with a witness."
    disconfirming: "An observation of any report that counts salary credits into accounts opened by switchers would contradict this. A2-item-5-o3 is an impression of one in seven or eight offered in place of a figure; an observation that a report behind it exists would narrow this to a report nobody reads rather than a measurement nobody takes."
    themes: [measurement, outcome ownership, silent failure]
    kind: barrier
  - id: H6
    statement: "We believe a switcher who cannot see what is left keeps the old account open and pays to run both, rather than close an account they cannot see inside."
    evidence: [A2-item-1-o4, A2-item-2-o4]
    trust: strong
    rationale: "Two independent origins in the qualifying set: customer-1 and customer-2, both first hand on their own accounts and both complete. One keeps about two thousand crowns at the old bank so that nothing bounces and pays maintenance on an account she calls not sensible to hold. The other pays two account fees and parks a balance for the same reason. Two customers, two banks left behind, one behaviour."
    disconfirming: "An observation of a switcher who closed the old account while still unsure what was attached to it would contradict this. A2-item-1-o4 has the customer saying she knows it is not sensible and is doing it anyway; an observation that a second account is kept for an unrelated reason, a mortgage or an employer requirement, would move against the mechanism rather than against the cost."
    themes: [two accounts, cost of uncertainty, fear of a bounce]
    kind: true
  - id: H7
    statement: "We believe whole classes of payment sit outside anything a switching instruction can reach, and nobody tells the customer which ones."
    evidence: [A2-item-5-o2, A2-item-5-o4]
    trust: weak
    rationale: "One origin in the qualifying set: ops-i-prokopova. Both references are first hand and both have complete provenance, so nothing fell out of the qualifying set and the tag turns on the origin count alone. Two mechanisms are described, a creditor that refuses the bank's mandate change and a payment attached to a card number, and both come from the same desk. Volume is not corroboration, and one origin is one origin however many mechanisms it names."
    disconfirming: "An observation from a customer who was told at the outset that card payments and a refusing creditor sit outside the switch would contradict the second half of this. Only the switching desk describes either mechanism here; the same two described by a customer or an adviser would raise the tag without changing the claim."
    themes: [card on file, creditor refusal, coverage of the instruction]
    kind: barrier
  - id: H8
    statement: "We believe switchers treat finishing the move as their own job, so they never ask the bank for help and the bank never offers."
    evidence: [A2-item-2-o5, A2-item-4-o4]
    trust: strong
    rationale: "Two independent origins in the qualifying set: customer-2 and onboarding-r-simek, both first hand and both complete. The customer states that he set the payments up, that it is therefore his mess, that nobody at either bank has offered, and that it had not occurred to him they could. The onboarding team supplies the bank's end of the same arrangement, handing the customer the one instruction the bank cannot send and wishing them luck. The second origin is attached to the second half of the statement, that the bank never offers, and not to the first."
    disconfirming: "An observation of a switcher who asked either bank to finish the move would contradict this. A2-item-2-o5 is one customer's assumption and A2-item-4-o4 is the bank handing the letter over; an observation of a switcher who was offered help and turned it down would move this from an assumption nobody corrects to an offer nobody takes."
    themes: [ownership of the move, unasked for help, handover]
    kind: true
  - id: H9
    statement: "We believe switchers stop part way because they do not trust the bank to complete the move without breaking a payment."
    evidence: []
    trust: unrated
    rationale: "No reference at all, which is what unrated means. The one place this claim appears in the record is A2-item-4-o2, and it is listed under what was considered and not counted: that observation reports what the onboarding team believes and not what any customer did, so it restates the hypothesis rather than supporting it. The speaker said three times that he had never seen a customer say it and that he does not think anyone has asked. The qualifying set is empty and no origin count applies."
    disconfirming: "A2-item-2-o5 is the only account in this material from somebody who actually stopped, and he gives a different reason: he could not answer the question the form asked and assumed finishing was his own job, which is not a fear of breakage. More intake of that shape moves against this. One customer saying they left the move unfinished because they were afraid a payment would fail would move it the other way, and would be the first observation this hypothesis has."
    themes: [trust in the bank, abandonment, unevidenced belief]
    kind: true
rejected: []
not_evidence:
  - ref: A2-item-4-o2
not_restated:
  - ref: A2-item-1-o1
    statement: "The move was set off by an unrelated payroll form rather than by anything the bank did, and opening the account took eleven minutes on a phone one Tuesday evening."
    reason: "It reports the part of the move that worked and names no problem. It is carried as context for what the initiative is and is not about, rather than restated as a hypothesis."
carried_unresolved:
  - ref: A2-item-5
    question: "The rate at which a creditor refuses the bank's mandate change is given as one in seven or eight and the speaker states it is an impression, because no report counts it. Carried as reported and not usable as a quantity."
  - ref: A2-item-4
    question: "Nobody in the material owns the measurement of a switch after the account is open. Asked who picks it up downstream, the onboarding team assumed somebody had it and could not name who, and the material holds no second party to ask."
  - ref: A2-item-4
    question: "The claim that customers stop because they do not trust the bank rests on nothing anybody observed, and the speaker said so himself three times. Carried into H9 as an unrated hypothesis rather than as evidence for one."
  - ref: A2-item-1
    question: "Every account of the leaving bank's side comes from customers reading their own statements or from an adviser who cannot open it. Nobody from the other side of the move was asked, so what the old bank can see is unestablished. Applies equally to A2-item-2 and A2-item-3."
---

# Record R-A3-01 for the problem hypotheses

One hypothesis-authoring invocation. Not written for a reader; the document assembled from it is 2-problems/3-problem-hypotheses.md.
