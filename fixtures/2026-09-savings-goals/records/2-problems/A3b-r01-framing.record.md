---
run_id: 2026-09-savings-goals
record_id: R-A3b-01
artifact_id: A3b
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A3]
external_sources: []
opportunities:
  - id: O1
    from: H1
    description: "A retail client who wants to save has no moment at which the decision is made, so the money stays in the current account by default"
    as_is: "Saving requires the client to decide, then act, then repeat. Nothing in the account prompts either. One client opened a savings account during a mortgage quote, deposited once and never returned; she named the obstacle as never deciding rather than not wanting to. Another saves successfully only at a bank where the deciding was taken out of her hands."
    outcome: "A client who wants to save puts money aside without having to decide each time, and keeps doing so."
    segment: "Retail clients aged 25 to 45 with a current account and an active mobile app, who hold no funded savings product."
    sizing:
      customers:
        statement: "Not established for this opportunity. Nobody measures how many clients this affects. The savings team reports a pattern and says in the same note that nobody pulled the number."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after this stage's decision gate. Nobody here can answer it, and marking it unknown would say that nobody can."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal leading to LVL-2, share of wallet, on the link that a client saving inside their current account holds more of their money here. Narrowed to this: a client who never starts saving here saves somewhere else or not at all."
        basis: derived
      impact:
        statement: "The savings team treats the empty accounts as an activation problem. Two of the three clients described something else: not a missing prompt but a missing moment. That is a report against two client accounts, not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Three references from two origins in the qualifying set, all first-hand, all fully provenanced."
        - "Two of them describe the same absence from opposite directions: a client who never decides, and a client whose saving works because she does not decide."
        - "What the evidence does not carry is how many people this affects or how often. No reference in the material carries a count."
    root_cause:
      statement: "Saving is built as a separate product with its own account, so every deposit is a decision plus a transfer. Stated by the product manager at framing. No root cause analysis against the systems was run, so it is carried as an assumption."
      basis: assumption
    alternatives: "None here, deliberately. Stage 4 is the step that produces them and stage 7 binds them back; a solution written at framing anchors the reader at the gate and leaves ideation working from an answer instead of a problem."
  - id: O2
    from: H3
    description: "A retail client treats opening a second account as a cost, so the product meant to help them save is itself a reason not to"
    as_is: "The bank's answer to saving is a savings account. One client described that as another account, another statement and money moving back and forth. Another keeps salary, mortgage and daily banking here and saves at a different bank, where the saving needs no second account of its own."
    outcome: "A client saves without taking on a second account, and the saving sits where their money already is."
    segment: "Retail clients with a current account here who hold no savings product, or hold one they do not fund."
    sizing:
      customers:
        statement: "Not established. The number of clients who hold a current account here and save elsewhere is not measured, and the brief marks the signal unknown."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after this stage's decision gate. Nobody here can answer it, and marking it unknown would say that nobody can."
        basis: deferred_to_stage_3
      company:
        statement: "Same product goal and same key result. Narrowed to this: a client who will not open the second account never becomes a saving client here at all."
        basis: derived
      impact:
        statement: "It would be easy to read this as clients disliking paperwork. What the two of them described was ongoing cost, not setup cost: the statement, the moving back and forth. That distinction is one reading of two interviews."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Two references from two origins, both first-hand and both fully provenanced."
        - "The two describe the cost differently: one as administration, one as behaviour, and neither as a fee."
        - "Nothing in the evidence says how much of the market behaves this way. Two people are two people."
    root_cause:
      statement: "The bank has no way to hold money aside inside a current account, so a second account is the only mechanism available. Stated by the product manager at framing and carried as an assumption."
      basis: assumption
    alternatives: "None here, deliberately. Stage 4 is the step that produces them and stage 7 binds them back; a solution written at framing anchors the reader at the gate and leaves ideation working from an answer instead of a problem."
  - id: O3
    from: H2
    description: "A retail client cannot tell committed money from spare money inside one current-account balance, so all of it behaves like spare money"
    as_is: "The client sees one number. Part of it is already committed to rent, to bills, to things he has decided; none of that is visible in the number. He described what would change it as labelling rather than locking."
    outcome: "A client looking at their balance can tell what is already spoken for without moving it anywhere."
    segment: "Retail clients who hold most of their money in one current account."
    sizing:
      customers:
        statement: "Not established, and this opportunity has one origin behind it, so the count question is not the first gap."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after this stage's decision gate. Nobody here can answer it, and marking it unknown would say that nobody can."
        basis: deferred_to_stage_3
      company:
        statement: "Same product goal. Narrowed to this: money that does not feel committed gets spent, and what is spent does not stay with the bank."
        basis: derived
      impact:
        statement: "The obvious reading is that this is the same as O1. It is not: O1 is about starting to save, this is about seeing what is already committed. One client raised it and nobody else did."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Two references from one origin, both first-hand and fully provenanced."
        - "The client explicitly rejected locking, which separates this from a savings product and from a spending limit."
        - "One origin is what makes this weak. The observations themselves are specific."
    root_cause:
      statement: "Not established. Nobody has said why the balance carries no structure, and inventing a cause here would be worse than leaving it open."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 is the step that produces them and stage 7 binds them back; a solution written at framing anchors the reader at the gate and leaves ideation working from an answer instead of a problem."
  - id: O4
    from: H4
    description: "A savings account opened at the bank's prompting rather than at the client's own moment receives one deposit and nothing after"
    as_is: "The bank opens savings accounts alongside other products. One client's was opened during a mortgage quote and holds 800 CZK. The savings team reports the pattern is visible in product reporting and that nobody has queried it."
    outcome: "A client opens a savings arrangement at a moment they chose, and funds it more than once."
    segment: "Retail clients who opened a savings account in the last two years and hold under 1,000 CZK in it."
    sizing:
      customers:
        statement: "Not established, and it is the one opportunity where a number exists to be pulled. The savings team's own note says nobody pulled it."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after this stage's decision gate. Nobody here can answer it, and marking it unknown would say that nobody can."
        basis: deferred_to_stage_3
      company:
        statement: "Same product goal. Narrowed to this: an account opened and left empty costs the bank the opening and returns nothing."
        basis: derived
      impact:
        statement: "Whether the prompting is the cause is the judgement here. The client's account was opened at a prompt and stayed empty, but so might one she opened herself."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Three references, but only one origin qualifies: the note is relayed and not fully provenanced."
        - "The relayed half is the only place a claim about scale appears, and it carries no figure."
        - "This is the opportunity most likely to move when somebody queries the reporting."
    root_cause:
      statement: "Not established. Whether the prompting causes the emptiness or merely accompanies it is exactly what the unpulled number would help decide."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 is the step that produces them and stage 7 binds them back; a solution written at framing anchors the reader at the gate and leaves ideation working from an answer instead of a problem."
  - id: O5
    from: H5
    description: "A client saving automatically does not track the balance, and discovering more than expected is part of what makes it work"
    as_is: "The client checks her automated saving every few months and describes finding more than expected as the pleasant part. She does not know the balance and does not want to."
    outcome: "A client saving automatically can find the balance when they want it without being shown it constantly."
    segment: "Retail clients who use or would use an automatic set-aside."
    sizing:
      customers:
        statement: "Not established. One origin, and no count anywhere in the material."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after this stage's decision gate. Nobody here can answer it, and marking it unknown would say that nobody can."
        basis: deferred_to_stage_3
      company:
        statement: "Same product goal, and the weakest link of the five: it says something about how the saving should feel rather than whether it happens."
        basis: derived
      impact:
        statement: "Read one way this contradicts the whole idea of a progress screen. Read another it says progress should be available rather than pushed. One interview cannot settle which."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "One reference from one origin, first-hand and fully provenanced."
        - "It is the only observation in the material about what happens after saving starts rather than before."
        - "It cuts against a progress display, which is why it is worth carrying rather than dropping."
    root_cause:
      statement: "Not established."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 is the step that produces them and stage 7 binds them back; a solution written at framing anchors the reader at the gate and leaves ideation working from an answer instead of a problem."
---

# Record R-A3b-01 — A3b

One production. The document assembled from it is 2-problems/4-framed-opportunities.md.
