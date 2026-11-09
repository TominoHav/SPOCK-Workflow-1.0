---
run_id: 2026-08-account-switching
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "3..7 solutions, each a distinct combination of opportunities, never a rephrasing"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: ideation
sources: [A1, A4, A7]
external_sources: []
assembled_at: 2026-08-27
assembled_from: [A8-r01]
---

# Account-switching solutions

All five solutions treat an information gap as the problem the switching customer faces, but they locate that gap at different points in the journey. Two engage the customer before the switch begins, one is a disclosure step and one predicts when the salary will arrive. Two operate during the switching window itself, one reading the old account for active mandates and one tracking the formal transfer status. The fifth fires at the salary moment and combines a completion confirmation with an old-account check.

[rec:A8-r01]

## I1 - Old-account visibility through open banking

### What it is

The solution connects to the customer's old bank account via PSD2 AISP consent and reads the active mandates, direct debits and standing orders still pointing there. The customer sees this list inside the CS app throughout the switch and can confirm when it reaches zero.

### What it does

O1 is about a customer who cannot say what is still attached to the old account. With this solution, the list is read from the source rather than reconstructed from memory or a year of statements. The customer does not learn what they missed when a payment fails; they see it before it can fail.

O6 is about a customer who keeps the old account open and pays for two because they cannot prove it is empty. This solution gives them that proof. When the live list shows nothing active, the customer has a basis for closing the account rather than an assumption they cannot test.

### How it works

The customer grants CS a PSD2 AISP authorisation to read their old account. The old bank authenticates the customer and issues a consent token. CS calls the old bank's account information API and retrieves the list of active payment mandates, direct debits and standing orders. This list appears in the switching section of the app and is updated on demand throughout the switch window. As each payment is transferred to the new account, the item leaves the list. When the list is clear, the app confirms the old account holds no active mandates and the customer can close it.

Two dependencies are not confirmed by any source in this run. The first is whether Czech banks' PSD2 implementations expose mandate data through their account information APIs, as opposed to transaction history alone. The second is whether card-on-file merchant credentials appear in any PSD2 feed. ST2 confirms their exclusion from all switching schemes by payment scheme architecture, not by a bank's choice, so the open banking route may surface direct debits and standing orders but face the same structural limit for card-linked subscriptions.

### Who it is for

Adult retail customers moving their main current account to Ceska sporitelna from another Czech bank who ran regular payments from the old account. A customer with no active mandates at the old bank has nothing to list and no benefit from this solution. The value concentrates in customers with many active direct debits, standing orders, or subscription payments pointing at the old account, which is the part of the segment with anything to move.

### Why this bank

TR-T3 is the market finding this solution rests on directly. It states that no participant in this set has deployed a product that reads a switching customer's old-account payment data via open banking APIs, that the technology is available under current open banking rules, and that no participant has a confirmed roadmap response to PSD3 and PSR, which will extend the open banking obligation when they come into force. That is not a gap inferred from the absence of a product; it is a confirmed absence, with a technology already available and a regulatory direction that will require more banks to expose account data.

ST2 confirms why the gap has persisted structurally. Card-on-file payments are excluded from every switching scheme by payment architecture, not by bank choice, and no participant has deployed external tooling to work around it. P6 is the adjacent evidence: the tooling that would automate card-credential migration at a switch, Galileo Payment Switch and Visa Enhanced Subscription Manager, is commercially available and confirmed as undeployed by every participant in this set. P6 is not the same thing as reading what is still attached via open banking. This solution reads the list; P6 concerns migrating the credentials on that list. Both sit in the same confirmed gap, and P6 shows that available tooling remains unused on two sides of the same problem.

P4 shows what customers do instead. The self-managed switch keeps both accounts running simultaneously, and Which?, MoneySavingExpert and GoCompare all confirm that visibility is the primary reason customers choose it, paying two to four hours of manual work and up to 90 days of dual-account management. The open banking approach replaces that cost with a consent flow.

TR-T3, ST2, P4 and P6 name the same vacancy from four directions: TR-T3 as a technology choice no participant has made, ST2 as the structural reason the guided service cannot close it, P4 as the manual substitute customers accept today, and P6 as the adjacent tooling that is available and equally unused. TR-T3 says only that no confirmed roadmap response exists; it does not say the approach is straightforward.

## I2 - Live switch status and a salary-confirmed completion

### What it is

A customer who files a switching request can see where it stands at any point during the PAD window, and the bank records the switch as complete only when salary arrives and recurring debits are confirmed transferred, not when the form is processed.

### What it does

O3 is the request going quiet the moment it is sent. This solution gives the customer and the adviser a status display they can open on any day of the switching window to see what has transferred, what is still in progress, and what has not yet moved. The adviser no longer writes a date on a sticky note and invents a follow-up call. The state is in the software, and both sides of the relationship can read it.

O4 is a completion number that counts the form rather than the money. This solution changes what the bank counts as complete. Salary arrival is the first condition. Recurring debits confirmed transferred is the second. When both are met, the switch is recorded complete. A switch processed by the switching desk but without salary landing stays open in the status display and in the bank's count, so the completion figure reflects what has happened to the customer's banking relationship rather than what happened to the form.

### How it works

During the switching window, the app displays the transfer status of each direct debit and standing order as the PAD scheme updates it. The underlying data is the scheme data the bank already receives. What changes is that it surfaces to the customer and the adviser rather than remaining internal. Starling, Monzo and Revolut surface transfer status through their standard app notification and activity feeds during the switching window; NatWest's Cora confirms direct debit transfers on request. This solution applies the same principle without requiring access the bank does not already have.

The completion event is held at the product level. A rule marks the switch complete when two conditions are both true: a salary credit has arrived in the new account and recurring debits have transferred. Salary recognition needs a classification rule to distinguish a salary from other incoming credits, the same kind of rule that salary-moment features in the UK market use when the first salary landing triggers a product action. Until both conditions are met, the status shows the switch in progress. If salary does not arrive within a defined period after direct debits have transferred, the customer receives a notification rather than being marked done.

Whether this redefines a regulatory reporting obligation or an internal product event is the compliance question the touchpoint on this solution names. PAD Article 15 sets obligations around completion reporting, and whether the bank can change its product-level completion event without affecting what it reports under the regulation is a question for a compliance review. The touchpoint is marked indicative, with the Compliance Guidelines body absent from this run.

### Who it is for

Adults who have filed a switching request with Česká spořitelna and are in the transition period. Both the customer and the adviser who filed the request on their behalf use the status display, which covers the same people O3 identifies: switchers who filed through a branch or the app. The salary-based completion condition applies to customers paid through an employer payroll cycle, the salary-carrying part of the segment the brief describes. A customer who pays themselves is still served by the status display; the completion trigger for that case requires a different condition.

### Why this bank

Four Czech PAD-compliant banks, CSOB, Komercni banka, Air Bank and Moneta, have no documented above-floor feature for customer communication, timeline visibility or post-switch confirmation in English-language public material (P3). Those three are exactly what this solution adds: a status display the customer can use during the switching window, visibility of the transfer timeline as it runs, and a confirmed completion event tied to salary arrival. P3 is scoped to English-language public material and does not establish that no such feature exists in Czech; it establishes that none is documented there.

Nine guided switching services automate the direct debit and standing order transfer and then hand the customer silence (ST1). The automation removes most of the manual payment work. It does not address whether the customer can see the process while it runs.

Four UK participants have changed this: Starling, Monzo and Revolut surface in-app transfer status during the switching window, and NatWest publishes a schedule committing to specific outcomes on specific days (P7). NatWest's timeline is the nearest thing in the set to a request that carries state while it is in flight. No Czech bank has built either version in accessible public material.

Moneta and Air Bank, the two Czech banks TR-3 traces to, have invested in platform modernisation and real-time capability without extending that investment to the switching journey in English-language public material as of August 2026 (TR-3). The synthesis characterises the gap between stated digital ambition and the switching customer's experience as the largest single opening the Czech market is not yet taking. That is the synthesis's judgement about the market, noted here because it describes the opening the solution sits in, not as a claim about the solution's value.

## I3: Payroll date at signing, salary arrival as completion

### What it is

This solution tells a switching customer when their first salary will land in the new account before they sign, and then confirms the switch complete when that salary arrives. It takes the two things O2 and O4 describe as absent, a date at signing and a completion event that counts the customer's money rather than the bank's paperwork, and puts both into one mechanism.

### What it does

A switcher who signs today and hands their employer a letter currently has no idea when the first salary will appear in the new account. They may sign into a closed payroll run without knowing it, spend a month with an empty account, and move the salary across by hand. O2 describes that problem. Under this solution, the customer sees a predicted salary arrival date at the point of signing. The move starts with a date on it.

O4 describes a completion count that counts the form processed rather than the money moved. A customer in that count may still have their salary going to the old bank. Under this solution, the completion event is the first salary credit in the new account. A switch that shows complete here means the salary has arrived. The bank's count and the customer's reality agree.

### How it works

The mechanism runs in two stages.

Before signing, the bank reads the customer's salary transaction history in the old account. It identifies the payroll cycle: how often salary arrives, on what day of the month, the amount range, and the payer. From that pattern it calculates the earliest date the first salary can land in the new account, given the day the customer signs and the notification time the employer needs. That date appears at the signing step alongside the employer letter template.

After signing, the bank monitors the new account for a salary-sized credit from the identified payer. When it arrives, the bank marks the switch complete and notifies the customer. If no credit appears within a defined window past the predicted date, the bank prompts the customer to confirm whether the employer instruction was sent.

The pre-signing prediction depends on three questions that O2 carries as a complete_validation requirement and that are not answered. Whether a Czech employer's payroll run has a cut-off after which a change of account will not take effect that month; whether that cut-off varies by employer or payroll provider; and how the customer or the adviser can find out which cut-off applies on the day they sign. Until all three are answered, the date this mechanism calculates may be wrong by one full payroll cycle, and no date shown to a signing customer should be stated as more than an estimate. The solution would need answers to all three before the prediction step can be trusted.

Reading the old account salary history requires either manual statements from the customer or an open banking AISP connection to the old account. Which path the bank takes determines how much of the pre-signing calculation can run without customer effort.

### Who it is for

Switchers in the brief's segment who are paid by an employer on a predictable payroll cycle. The mechanism requires a detectable salary pattern: a regular credit from a consistent payer on a consistent schedule. Customers who pay themselves, those with irregular or variable income, and those whose transaction history shows no identifiable payroll pattern are outside this solution. Within the segment, this is the part of it that has an employer and a month where the salary may not arrive when expected.

### Why this bank

TR-B3 in the synthesis records a convergence. Two UK neobanks, Monzo and Revolut, reached the same product conclusion independently: salary arrival is the operational definition of a completed switch. Monzo built Salary Sorter and Get Paid Early before 2026; Revolut added Early Salary after its March 2026 banking licence. Two independent innovators arriving at the same answer carries more weight than one company's bet. No Czech bank and no UK incumbent have matched it.

That convergence is the evidence behind the completion half of this solution: treating salary arrival as the event that ends the switch. TR-B3 says the conclusion this solution builds on has been reached twice before, and that the Czech market is a blank space on that map.

ST5 documents the features themselves. Salary-moment capabilities are the only confirmed market answer to O2's timing question and the only product event that makes O4's completion question real for the customer rather than for the bank's reporting alone. P1 contextualises why those features exist: UK innovators treat the switching event as a design surface. Czech banks have not.

ST3 adds one structural note. Named savings sub-accounts within the main account are already common at seven of ten participants, and the synthesis names them as the structural prerequisite for salary-moment features. That infrastructure is present in the Czech market. The gap TR-B3 names is a product decision, not a capability one.

A Czech bank that counts the switch done only when the salary arrives would act on a conclusion two independent innovators reached and no domestic competitor has. The quarterly retail review asked how many of last year's new accounts had become anybody's main account and left without an answer. This solution's completion event is the answer.

## I4 - The pre-switch payment audit

### What it is

The audit sits at the point of switch confirmation. Before the customer commits, the app shows which of their payment types transfer automatically and which they must handle themselves. They review the two categories, acknowledge what the scheme does not reach, and carry a checklist of their own responsibilities into the switch window.

### What it does

O1 asks for a customer who can say what is still attached to the old account. Before the audit exists, a switcher discovers card-on-file payments by a charge arriving at the old account after it was supposed to be closed. Once the audit exists, the customer enters the switch knowing which payment category falls outside PAD and that they own it. The disclosure is a step they took, not a clause they may not remember.

O3 asks for a request that carries state while it is in flight. The audit produces a checklist the customer takes into the switch window: the card-on-file payments they acknowledged and committed to handling themselves. They can work through the list during the switch rather than relying on a failed payment to show something was missed.

### How it works

Before the customer confirms the switch, the app presents two categories. The first covers payments that transfer automatically, standing orders and direct debits handled by PAD, with the applicable timeline. The second covers card-on-file payments that PAD does not reach, labelled as the customer's own task and illustrated with named examples, such as a streaming subscription or a gym charge billed to a card rather than through a mandate.

The customer checks off which card-on-file payments they are aware of and confirms they understand the exclusion. That acknowledgement is saved. The checklist stays accessible in the app during the switch window.

The mechanism does not retrieve the customer's merchant list. Card credentials are stored by merchants and the bank is not party to those relationships, so no bank in this set can produce that list. What the audit does is make the category a step the customer takes, with named examples and a saved record of the acknowledgement, rather than text in documentation they may or may not have read.

### Who it is for

Switchers moving a main current account to Česká spořitelna. Within the segment, the audit is built for customers with any card-linked recurring payment at the old bank: a streaming subscription, an insurer billed to a card, or any service holding a card number rather than a mandate. A switcher whose regular payments are entirely standing orders and direct debits meets no gap this audit addresses.

### Why this bank

ST6 shows that two of ten participants, NatWest and Starling, name the card-on-file exclusion in publicly accessible switching documentation. NatWest uses the phrase "regular debit card payments" and names Amazon as an example merchant. Starling confirms that customers must update card details stored by merchants as they would if their card expired. ST2 confirms the exclusion is universal: card credentials are held by merchants, the bank is not party to those relationships, and no switching scheme in this set or any other reaches them. ST4 shows that three innovators have built virtual card tools that reduce card-on-file exposure before a switch. All three require the customer to set them up before the switch is contemplated, none contacts merchants on the customer's behalf, and no Czech bank has deployed any equivalent.

P3 records that the four Czech banks in this set operate at or close to the statutory switching floor with no documented above-floor feature for customer communication, timeline visibility or post-switch confirmation in English-language public material. ST6 and P3 say the same thing from two positions: the disclosure practice exists at two UK participants and is absent from every Czech bank in English-language public material.

The pre-switch payment audit takes that disclosure and makes it a step rather than a paragraph: shown at the point of confirmation, with named examples and a checklist the customer uses during the switch window. No Czech bank in this set has reached even the documentation stage in English-language accessible material. The step from no disclosure to interactive audit is the full space this solution occupies in this market.

## I5 - A confirmation at the salary moment

### What it is

An automated check that fires once, when the customer's first salary lands in the new account. At that instant it queries the old account via open banking and delivers one message: the salary arrived, and the old account is either clear or has these specific items still running.

### What it does

O2 is about not knowing when the salary will arrive. This solution resolves that at the moment it arrives. The customer receives the salary amount, the date and the payer's name in the same notification that tells them the switch worked. The uncertainty ends when the money lands.

O6 is about not being able to confirm the old account is empty. The query runs at the salary moment because that is when the question is most likely to have a clean answer: the PAD window has worked through the standing orders and direct debits, and the salary has moved. The customer either gets a clear confirmation and a prompt to close the old account, or they get a list of what is still there and can act on each item.

### How it works

The trigger is the first inbound credit to the new account carrying payroll characteristics: a credit amount consistent with the customer's expected salary, a payer reference matching employer payment formats, and a transaction type classified as a recurring employer transfer. When that transaction clears, the system makes one AISP-authorised open banking call to the old account.

The call retrieves the standing orders and direct debit mandates still registered at the old bank. The system assembles a single notification combining four elements: the salary amount, the date, the payer name, and the result of the old-account query. Where the query returns no active payment instructions, the notification says the account is clear and offers a one-tap prompt to close it. Where instructions remain, the notification lists them by name and amount.

Card-on-file merchant credentials are outside what the query can reach. ST2 establishes this as a structural exclusion under the scheme architecture, confirmed by every participant in the market read. The notification states what was checked and what was not. The customer receives an honest accounting of the old account as far as the bank can see it, not a claim that the account is completely empty.

AISP authorisation for the old-account query is collected when the customer initiates the switch. Without it, the check does not run and the notification covers the salary arrival only.

### Who it is for

Adult retail switchers paid a salary by an employer on a payroll cycle who still hold the old account after the switch is recorded complete. That is where O2 and O6 land together: the salary timing is unknown and the old account stays open because no one can confirm it is clear.

Switchers who pay themselves are outside O2 and receive no salary trigger from this. Switchers who closed the old account before salary arrived are outside O6 and have nothing for the query to check.

### Why this bank

ST5 and TR-B3 together describe the market's only confirmed answer to salary timing as a switching problem. Two UK innovators, Monzo and Revolut, reached the same conclusion independently: salary arrival is when the switch is done for the customer. Monzo built Salary Sorter and Get Paid Early before 2026. Revolut added Early Salary after its March 2026 banking licence. No Czech bank and no UK incumbent has built anything in this space.

The Czech market has not moved above the PAD floor in any externally visible way. That is the space this solution enters.

P4 establishes what a customer does today when they want to confirm the old account is clear before closing it: they take the self-managed route, running both accounts simultaneously for up to 90 days and tracking every payment type by hand. The self-managed switch is the only current approach that answers the confirmed-empty question. The salary-moment check answers the same question at a single instant, on the day the customer is most ready to hear it, without the dual-account overhead.

ST2 confirms that the card-on-file gap is structural and will not be resolved by a PAD-compliant switching service or by anything deployed in this market today. The solution does not claim to close it. The notification that names what was checked and what was not is the distinction from a bank that stays silent on the point.

## What we could not establish

I3 names three questions about employer payroll cut-offs that the set cannot answer. O2 carries all three as complete_validation requirements: whether a Czech employer's payroll run has a cut-off after which a change of account will not take effect that month; whether that cut-off varies by employer or payroll provider; and how the customer or the adviser can find out which cut-off applies on the day they sign. Until these are answered, the prediction step I3 describes can be wrong by one full payroll cycle. No source in this run addresses any of the three.

I1 and I5 both depend on whether Czech banks' PSD2 implementations expose active payment mandates through their account information APIs, rather than transaction history alone. Both solutions name this as unconfirmed. The distinction matters: a feed that returns transaction history can show where salary went; it cannot show what is still authorised at the old bank. No source in this run settles it.

## How this was produced

This document is the output of stage 4, skill `ideation`, run `2026-08-account-switching`, artifact A8.

Stage 4 runs as a fan-out. Phase 1 (record A8-r01) named five solution candidates, I1 through I5, with their opportunity bindings and evidence references. Phase 2 ran five instances, one per solution. Phase 3 (this join) transferred the five authored parts into this document without re-authoring them.

All five instances returned. No instance is recorded in `unproduced`.

Sources were A1 (the brief), A4 (the prioritised opportunities) and A7 (the competitive synthesis). The Compliance Guidelines body and the Banking Constraints body are both absent from this run. Each solution's compliance touchpoints are marked indicative, as the reduction requires; the method is stated in the touchpoint text of each solution.

Gate Q4 is run independently of this assembly.
