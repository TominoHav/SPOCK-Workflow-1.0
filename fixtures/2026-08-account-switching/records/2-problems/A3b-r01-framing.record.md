---
run_id: 2026-08-account-switching
record_id: R-A3b-01
artifact_id: A3b
item_id: ""
produced_at: 2026-08-26
bounds_hit: []
trace_id: []
sources: []
external_sources: []
opportunities:
  - id: O1
    from: H1
    description: "A person moving their banking cannot find out what is still pointing at the old account, so they learn what they missed when a payment fails or a charge arrives."
    as_is: "The customer works from memory and from a year of their own statements, and cannot tell an annual charge from one that was cancelled. The adviser cannot open the leaving account. The switching desk works the list it is handed and no step in the process looks for what the customer forgot. What arrives instead is a letter from a gym, a nursery or an insurer."
    outcome: "A switcher can say on any day of the move what is still pointing at the old account, and learns it by asking rather than by a payment failing."
    segment: "Switchers who ran regular payments from the old account, which is the part of the segment with anything to move."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. Nobody counts whether one person meets this more than once, so the frequency half has no answer either. A count normally comes from the product's own analytics or from the size of the book the segment covers, and which system at Česká spořitelna holds it is unconfirmed."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, a customer who cannot see what is still attached leaves part of their day to day money running through the old account, and that part is the share of wallet the bank does not get."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Four independent origins in the qualifying set, two customers, a branch adviser and the payments desk. All six references are first hand and all six carry complete provenance, so nothing fell out."
        - "The four describe one absence from four positions. A customer billed by surprise, a customer who stalled on the question, an adviser who cannot open the leaving account, and the desk that works only the list it is handed."
        - "What the evidence does not establish is how many people meet this, or how often. No reference in the material carries a count."
    root_cause:
      statement: "The old bank's outgoing payment mandates are not exposed to Česká spořitelna in any feed. The bank receives the balance and the transactions and nothing about the standing instructions behind them, so no system here holds the list the customer is asking for. Supplied by the product manager at framing. No root cause analysis was run against the systems, so it is carried as an assumption."
      basis: assumption
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has either been closed or has nothing running through it. The half that bites here is the second, that nothing is left running."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "A switcher who obtained the list, from either bank or from their own records, would contradict this. The hypothesis records a customer sitting with a year of statements and still unable to tell the annual charges from the cancelled ones."
      - "The root cause is one person's account of what the feed carries. If the mandates are available and unused, this is a different problem wearing the same symptom, and the work it points at is different."
      - "The ordering at the next step is made on the sizing, and the sizing carries no count. It will be made on judgement unless a count arrives first."
  - id: O2
    from: H2
    description: "The switcher's salary is the one instruction in the move that neither bank controls, and nobody tells them when it will actually arrive."
    as_is: "The customer signs, is handed a template letter for the employer, and is wished luck. Nobody says whether the payroll run for that month has already closed. One customer signed at the start of a month and found a new account with nothing in it and an old account holding the whole salary, and moved it across by hand."
    outcome: "A switcher knows before they sign when their first salary will land in the new account, and plans the first month around a date rather than around a hope."
    segment: "Switchers paid a salary by an employer on a payroll cycle. Anybody who pays themselves is outside this one."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. Nobody counts whether one person meets this more than once. A count normally comes from the product's own analytics or from the size of the book the segment covers, and which system at Česká spořitelna holds it is unconfirmed."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, this opportunity is that link at its plainest. The salary decides which account carries the customer's day to day money, and a salary that arrives late or not at all is the share of wallet the bank does not get."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Two independent origins in the qualifying set, a customer and the digital onboarding team, both first hand and both with complete provenance."
        - "One origin is the consequence and the other is the mechanism. The customer moved a salary by hand after signing into a closed payroll run, and the onboarding team states that the instruction lives with an employer neither bank can talk to."
        - "What the evidence does not establish is how often a switcher signs into a closed payroll run, because the bank never learns whether the template letter was sent."
    root_cause:
      statement: "The employer's payroll cut off belongs to the employer and Česká spořitelna has no view of it. Neither bank can see when the run closes, so neither can tell the customer at signing when the first salary will arrive. Supplied by the product manager at framing. No root cause analysis was run, so it is carried as an assumption."
      basis: assumption
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has either been closed or has nothing running through it. The half that bites here is the first, that the salary arrives at all."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "A switcher who was told at signing when the first salary would land would contradict this. The hypothesis records that the bank never learns whether the letter was sent, so it cannot tell today which switchers were told anything."
      - "The root cause names the employer's cut off as the reason nobody can say. If a payroll calendar is obtainable and simply nobody asks, the problem is in the telling rather than in the instruction."
      - "The ordering at the next step is made on the sizing, and the sizing carries no count."
  - id: O3
    from: H3
    description: "Once the switching request is sent, neither the customer nor the adviser who sent it can find out whether it worked."
    as_is: "The adviser presses send and that is the end of her involvement. When a client rings to ask how it is going she has nothing to open, so she writes a date on a sticky note and rings them herself a fortnight later, a call she invented and nothing records. Inside the software the request is a message and a row with no state in it."
    outcome: "A switcher and the adviser who sent the request can both find out where it has got to, without one of them ringing the other to guess."
    segment: "Switchers who filed a request through a branch or through the app, and the advisers who file it for them."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. Nobody counts whether one person meets this more than once. A count normally comes from the product's own analytics or from the size of the book the segment covers, and which system at Česká spořitelna holds it is unconfirmed."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, a request nobody can follow leaves a stalled move to stall unnoticed, and a stalled move leaves the day to day money at the old bank."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Two independent origins in the qualifying set, a branch adviser and the digital onboarding team, both first hand and both with complete provenance."
        - "One describes the absence from the counter and the other from inside the software, which is the same absence reported from two positions rather than one account repeated."
        - "What the evidence does not establish is how many requests stall, since the same absence is the reason nobody can count them."
    root_cause:
      statement: "Not established. Asked why the request carries no state, the product manager said he does not know and would be guessing. A root cause normally comes from an analysis the team runs against the systems, and Česká spořitelna's own template names Five Whys and Fishbone. Who would run one here is unconfirmed."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has nothing running through it. Read here as whether anybody could have said, before the month was out, that the move had or had not worked."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "An adviser or a client opening any record of a request in flight would contradict this. The adviser's fortnight call is her own invention, and if it turns out to be a documented process the problem is a record nobody uses rather than a record nobody has."
      - "Nobody could say why the request carries no state, so this opportunity reaches the gate with the symptom described and the mechanism unknown."
      - "The ordering at the next step is made on the sizing, and the sizing carries no count."
  - id: O4
    from: H4
    description: "The bank calls a switch complete when the form has been worked, while the customer at the other end of the same record is still half moved."
    as_is: "The switching desk states that completion means it did what was on the form, and has never claimed it means the customer has moved. One customer has been half moved for five months, has both accounts open, and has stopped noticing. Nothing between the two reads the record as anything other than a finished move."
    outcome: "The people who read the completion number act on what happened to the customer's money rather than on what happened to the form."
    segment: "Switchers whose request was recorded complete, and the people upstream who read that count."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. Nobody counts whether one person meets this more than once. A count normally comes from the product's own analytics or from the size of the book the segment covers, and which system at Česká spořitelna holds it is unconfirmed."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, a switch counted as complete while the customer is half moved tells the bank it holds day to day money it does not hold, so the key result is reported against a number that does not measure it."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Two independent origins in the qualifying set, a customer and the payments desk, both first hand and both with complete provenance."
        - "The two are the two ends of one sentence. The desk says what its own word means, and the customer is what the word covers."
        - "What the evidence does not establish is how the number is read upstairs. The desk says it would be surprised if anybody reading it knows, which is the desk's view of somebody else."
    root_cause:
      statement: "Not established. Asked why completion is defined against the form, the product manager said he does not know and would be guessing. A root cause normally comes from an analysis the team runs, and Česká spořitelna's own template names Five Whys and Fishbone. Who would run one here is unconfirmed."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has nothing running through it. Read here as the test a completion record would have to pass to mean what its readers think it means."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "A completion record that reads the new account rather than the form would contradict this. If somebody upstream already reads the number with the desk's caveat attached, the problem is how the number is presented rather than what it counts."
      - "Nobody could say why completion is defined this way, so the mechanism behind an otherwise well evidenced problem is unknown."
      - "This one and the measurement problem may be one problem seen twice. They are kept apart here and a person at the gate can merge them."
  - id: O5
    from: H5
    description: "Nothing at the bank counts whether an opened account became anybody's main account, so nobody can say how often the move fails."
    as_is: "The adviser opens an account in a quarter of an hour and never hears what became of it unless something has gone wrong. The onboarding team's numbers stop at the account being open, and nobody downstream could be named. The switching desk put returned mandates at one in seven or eight and said that was an impression, because no report counts them. The review that opened this initiative asked the question and left the room without an answer."
    outcome: "Anybody at the bank who asks how many switchers finished the move gets an answer, and the adviser who opened the account learns what became of it."
    segment: "This one is the bank's own. It reaches the switcher only through the eight problems it leaves unmeasured."
    sizing:
      customers:
        statement: "Not established for this opportunity, and this opportunity is the reason. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting, which is what an unmeasured outcome looks like from the inside. Nobody counts whether one person meets this more than once."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, nothing counts whether an opened account became anybody's main account, so the key result cannot be read for this cohort at all. The goal's own metric is unmeasurable rather than unmoved."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Three independent origins in the qualifying set, a branch adviser, the digital onboarding team and the payments desk. All four references carry complete provenance."
        - "Three of the four are first hand. The fourth, the desk's estimate of returned mandates, is aggregated and is the only figure the whole material contains."
        - "What the evidence does not establish is who would own the measurement. Asked who picks it up after the account is open, the onboarding team assumed somebody had it and could not name who."
    root_cause:
      statement: "Not established. Asked why nothing counts it, the product manager said he does not know and would be guessing. A root cause normally comes from an analysis the team runs, and Česká spořitelna's own template names Five Whys and Fishbone. Who would run one here is unconfirmed."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has nothing running through it. For this opportunity the signal is the measure, since being able to read it is the change."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet. Nobody can compute it today, which is this opportunity stated as a number."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "Any report that counts salary credits into accounts opened by switchers would contradict this. The one in seven or eight is an impression offered in place of a figure, and if a report stands behind it the problem is a report nobody reads."
      - "Nobody could say why the measurement stops at the account opening, so the mechanism is unknown while the absence is well evidenced."
      - "Framing this as an opportunity for the customer is a stretch, and the segment field says so. A person at the gate may read it as the run's own precondition rather than as one of the nine."
  - id: O6
    from: H6
    description: "A switcher who cannot be sure the old account is empty keeps it open and pays to run both, rather than close an account they cannot see inside."
    as_is: "One customer keeps about two thousand crowns at the old bank so that anything still hiding there does not bounce, and says she knows it is not sensible. Another pays two account fees for the same reason and calls it paying two banks to be confused. Both know it is costing them and both carry on."
    outcome: "A switcher closes the old account when the move is done, because they can be sure nothing is left running, rather than keeping it open as insurance."
    segment: "Switchers who have opened the new account and still hold the old one, which on this material is both of the customers in it."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. Nobody counts whether one person meets this more than once. A count normally comes from the product's own analytics or from the size of the book the segment covers, and which system at Česká spořitelna holds it is unconfirmed."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, a customer keeping a float and paying two fees is holding day to day money at the old bank on purpose, which is the share of wallet the goal is about."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Two independent origins in the qualifying set, both customers, both first hand about their own accounts and both with complete provenance."
        - "Two customers, two banks left behind, one behaviour, and both name the cost while doing it anyway."
        - "What the evidence does not establish is how long the second account stays open or what it costs in total, because neither customer was asked and no record was read."
    root_cause:
      statement: "The old bank's outgoing payment mandates are not exposed to Česká spořitelna in any feed. The bank receives the balance and the transactions and nothing about the standing instructions behind them, so nobody can show the customer that the old account is empty. Supplied by the product manager at framing, as one of the problems about not being able to see what is still attached. No root cause analysis was run, so it is carried as an assumption."
      basis: assumption
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the old account has either been closed or has nothing running through it. This opportunity is the closing half of that sentence."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "A switcher who closed the old account while still unsure what was attached to it would contradict this. A second account kept for a mortgage or an employer requirement would move against the mechanism rather than against the cost."
      - "The root cause was supplied for the problems about not being able to see what is still attached, and reading it onto this one is the framing step's reading of a plural answer. A person at the gate may take it off."
      - "This one and the visibility problem may be one problem and its consequence. They are kept apart here because they stop at different points."
  - id: O7
    from: H7
    description: "Whole classes of payment sit outside anything a switching instruction can reach, and nobody tells the customer which ones."
    as_is: "An energy company sends the mandate change back and insists the customer does it in its own portal, so the customer believes it is done and nobody tells them otherwise for six weeks. A payment attached to a card number sits with the merchant, appears in no instruction either bank sends, and keeps taking money from the old account after the switch has been recorded complete."
    outcome: "A switcher is told at the outset which of their payments the switch will not reach, and handles those knowingly rather than finding out weeks later."
    segment: "Switchers who pay a creditor that refuses a mandate change, or who set up a payment with a card number. Neither group can be counted today."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. The switching desk put creditor refusals at one in seven or eight and said in the same breath that this was an impression, because no report counts them, so it is carried as reported and not usable as a quantity."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, a payment that keeps leaving the old account after the switch is spending the new account does not carry."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "One origin in the qualifying set, the payments desk. Both references are first hand and both carry complete provenance, so nothing fell out and the tag turns on the origin count alone."
        - "Two mechanisms are described, a creditor that refuses the mandate change and a payment attached to a card number, and both come from the same desk. Volume is not corroboration."
        - "The evidence is kept and the opportunity is framed on its merits. The tag records that one person told us."
    root_cause:
      statement: "Not established. Asked why these payments sit outside the instruction, the product manager said he does not know and would be guessing. The brief records as a shape of the problem that card on file payments travel with the card rather than the account, and that shape is not confirmed against any scheme rule or system record. A root cause normally comes from an analysis the team runs, and who would run one here is unconfirmed."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the old account has nothing running through it. Read here as whether the payments the switch cannot reach were dealt with rather than discovered."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "A customer who was told at the outset that card payments and a refusing creditor sit outside the switch would contradict the second half of this. The same two mechanisms described by a customer or an adviser would raise the tag without changing the claim."
      - "One desk is the only source. If that desk is describing its own two worst cases rather than a class, the opportunity is narrower than it reads."
      - "The rate of creditor refusal is an impression and nothing downstream should treat it as a figure."
  - id: O8
    from: H8
    description: "Switchers treat finishing the move as their own job, so they never ask the bank for help and the bank never offers."
    as_is: "One customer set the payments up himself and concluded that clearing up what is left is his mess. He has never asked either bank and it had not occurred to him that either could do anything. The bank's end of the same arrangement is a template letter handed over with good wishes for the one instruction it cannot send itself."
    outcome: "A switcher who has stalled part way asks for help, or is offered it, instead of carrying the unfinished half alone."
    segment: "Switchers who set up their own regular payments before the move, which is most people who have anything to move."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. Nobody counts whether one person meets this more than once. A count normally comes from the product's own analytics or from the size of the book the segment covers, and which system at Česká spořitelna holds it is unconfirmed."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, a customer who never finishes because they believe finishing is theirs alone leaves the rest of the regular payments at the old bank."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Two independent origins in the qualifying set, a customer and the digital onboarding team, both first hand and both with complete provenance."
        - "The second origin stands behind the second half of the claim, that the bank never offers, and not behind the first. The customer supplies the assumption and the onboarding team supplies the handover that leaves it uncorrected."
        - "What the evidence does not establish is how widely the assumption is held, since one customer states it and nobody else was asked."
    root_cause:
      statement: "Not established. Asked why switchers treat finishing as their own job, the product manager said he does not know and would be guessing. A root cause normally comes from an analysis the team runs, or from asking the customers who did it, and neither has happened here."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has nothing running through it. Read here as whether the unfinished half got finished by anybody at all."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, which is this opportunity in the customer's own words."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "A switcher who asked either bank to finish the move would contradict this. One who was offered help and turned it down would move it from an assumption nobody corrects to an offer nobody takes."
      - "One customer states the assumption and the second origin covers only the bank's half, so the customer side of this rests on a single account."
      - "The ordering at the next step is made on the sizing, and the sizing carries no count."
  - id: O9
    from: H9
    description: "The bank believes switchers stop part way because they do not trust it to complete the move without breaking a payment, and nobody has asked a switcher whether that is true."
    as_is: "The onboarding team offered this account of its own customers three times in one call and disowned it as evidence three times in the same call. Nothing it can show, it is what the team says, it has never seen a customer say it and does not think anyone has asked. No customer in the material gives this reason, and the one customer who did stop gives a different one."
    outcome: "The bank knows why switchers stop from the switchers who stopped, rather than from what the team believes about them."
    segment: "Switchers who abandoned the move part way. Nobody in this material is one of them, which is the problem stated as a segment."
    sizing:
      customers:
        statement: "Not established for this opportunity. The product manager gave a funnel figure, about 4,100 switch requests last year and a bit under a third never completing, and said it cannot be split by which of these nine problems is biting. The share of that third who stopped for the reason the bank believes is exactly what nobody has established."
        basis: unknown
      market:
        statement: "Deferred to the competitive analysis stage, which produces exactly this material and runs after the decision gate on this stage. Nobody here can answer it, and marking it unknown would say nobody knows."
        basis: deferred_to_stage_3
      company:
        statement: "The brief carries one product goal feeding LVL-2, share of wallet, on the written link that the account a salary lands in is the account the balance sits in and the everyday spending leaves from. Narrowed here, the bank acts on a belief about why switchers stop, and work aimed at a wrong belief moves nothing towards the key result."
        basis: derived
      impact:
        statement: "The product manager judges that this matters a lot to customers, because a half moved account is worse than not starting. He gave the answer once across all nine opportunities rather than for this one, and said in the same breath that nobody has asked a customer to rate any of it, so this is his view and not research. On this opportunity the absence is doubled, since the claim it frames has no customer behind it either."
        basis: judgement
    validation:
      trust: unrated
      insights:
        - "No reference at all, which is what unrated means. The qualifying set is empty and no origin count applies."
        - "The one place the claim appears is the onboarding team stating what the team believes, and a reference that only restates the claim is not evidence for it."
        - "The validation establishes nothing about whether this is true. It establishes that the bank holds the belief and that nobody has tested it."
    root_cause:
      statement: "Not established. Asked why switchers stop, the product manager said he does not know and would be guessing, which is the same answer the material gives. Nobody has asked a switcher who stopped."
      basis: unknown
    alternatives: "None here, deliberately. Stage 4 generates the solution directions and stage 7 links them back, so a direction proposed at framing would anchor the reviewer at the gate and leave ideation working from an answer rather than from the problem."
    metrics:
      behavioural: "From the brief's success signal, a month after opening the switcher's salary arrives in the new account and the old account has nothing running through it. Read here as whether the reason a switcher fell short of that can be named by anybody who asked one."
      business: "Share of current accounts opened by switchers that receive a salary credit and at least two recurring debits within thirty days of opening, feeding LVL-2, share of wallet."
      qualitative: "From the brief's qualitative signal. Switchers stop saying they will finish the rest of it later, and advisers stop hearing at the desk that somebody has been paying maintenance on two accounts since the spring."
      horizon: "Not established. The brief marks the time horizon not yet available, because the initiative has no place in a delivery plan yet. The gap is inherited from stage 1 rather than new here."
    risks:
      - "One customer saying they left the move unfinished because they were afraid a payment would fail would move this the other way, and would be the first observation it has."
      - "The only account here from somebody who actually stopped gives a different reason. He could not answer the question the form asked and assumed finishing was his own job, which is not a fear of breakage."
      - "Framing this at all keeps an unevidenced belief in front of a reviewer. The tag is carried rather than used as a filter, and the trust tag is what a person at the gate weighs it with."
---

# Record R-A3b-01 for the framed opportunities

One opportunity-framing invocation. Not written for a reader; the document assembled from it is
2-problems/4-framed-opportunities.md.
