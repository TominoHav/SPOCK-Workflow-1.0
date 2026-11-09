---
run_id: 2026-07-standing-orders
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 2
could_not_verify:
  - rule: "3..7 ideas, each a distinct combination of problems, never a rephrasing"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: ideation
sources: [A1, A4, A7]
external_sources: []
assembled_at: 2026-08-24
assembled_from: [R-A8-01]
unproduced: []
---

# Ideas | Idea set

Five ideas address the three primary problems (H1, H2, H4). The synthesis found market responses to all three outside Czech incumbent reach, and identified the B2B infrastructure enabling a unified view as already deployed at the Erste Group parent. No idea repeats another's problem combination: each entry carries at least one problem no other entry in the set shares in the same pairing. H1, H2 and H4 are each covered by at least one idea. H3 and H8 appear as secondary anchors in two entries each; H5 and H6 found no combination that resolves them without collapsing onto a problem set already named. The Compliance Guidelines are absent from this run by decision of 24 August (PD164); where an idea's feasibility depends on a bank constraint those constraints are not assessed here.

[rec:R-A8-01]

---

## Idea slate

**I1**
- `solves:` H1, H2
- `supported_by:` ST2, ST3, P1, P6, TR1

**I2**
- `solves:` H2, H3
- `supported_by:` ST4, P4, TR2, TR6

**I3**
- `solves:` H3, H4
- `supported_by:` ST1, ST6, P3, P7, TR3

**I4**
- `solves:` H2, H4
- `supported_by:` ST4, TR4, TR5, P3

**I5**
- `solves:` H1, H4, H8
- `supported_by:` ST2, ST7, P3, P6, TR1

---

## I1: Unified Commitment Hub

### What it is

A single section inside the George app that shows a retail client all three recurring commitment types -- standing orders, direct debits, and card-on-file subscriptions -- in one view, and lets the client stop any individual card subscription without the bank needing to block the whole card.

The idea is a product layer, not a new account feature. It sits above the bank's existing payment systems and above the card-scheme layer, aggregating what those systems already hold and adding a targeted card payment control that currently does not exist in any Czech incumbent's consumer product.

### What it does

For H1: the client opens one section and sees every recurring commitment leaving their account. They do not navigate to standing orders in one place, direct debits in another, and find no dedicated view at all for card subscriptions. The fragmentation that H1 names -- four witnesses confirmed no single register joins all three types, including the mandates desk operator who said so directly -- is the state this hub replaces.

For H2: the client who wants to stop a specific card subscription gets a control that acts on that subscription without affecting any other card payment. The current state is binary: block the card and stop everything, or stop nothing. The hub gives a third path. What that path is exactly -- merchant-level blocking tied to a card profile, or a virtual card number issued per subscription that can be deleted when the client wants to stop -- depends on the bank's card system capabilities and card-scheme rules that are not assessable in this run. The idea names the gap and the direction; the feasibility of which mechanism fills it requires constraints this run does not hold.

### How it works

The hub needs two capabilities working together.

The first is transaction classification: a layer that reads incoming card transactions and identifies which are recurring card-on-file charges, which are standing orders, and which are direct debit collections. That layer does not need to be built from scratch. ST7 establishes that Tapix, a Czech B2B vendor processing approximately 1.5 billion transactions per month, already provides exactly this classification across all three commitment types through a single API, with no single-type blind spot. TR1 establishes that the Erste Group -- Ceska sporitelna's parent -- is a confirmed Tapix client. The cross-type intelligence is already at the parent group. What this idea requires at the CS level is a decision to deploy the consumer product layer on top of infrastructure the group already pays for.

The second is a card payment control that operates below the whole-card level. ST3 documents four participants (Revolut, Monzo, Lloyds, NatWest) that have built this capability. ST2 and P1 establish that no Czech incumbent has done so and that Czech-market participants structurally exclude card-on-file subscriptions from their recurring payment channels. The specific mechanism this bank would use -- merchant-level blocking as Revolut does, virtual card issuance as Monzo does, or a different form -- depends on which card-scheme permissions and which internal card system capabilities the bank holds. P6 confirms that where this capability exists in the market it operates as payment blocking rather than contract cancellation: the bank stops the charge, and the client's relationship with the merchant remains theirs to resolve. The idea carries that same ceiling, because no participant in A7 has found a way past it and it appears to be structural rather than a build choice.

The standing order and direct debit data is already in the bank's systems. The aggregation layer joins what exists; it does not create new data. The card subscription identification is what Tapix provides. The assembly into one view and the card payment control are what needs to be built at the consumer layer.

### Who it is for

The retail client with commitments spread across all three types who currently has no way to see them in one place. H1 names four confirming witnesses: the client navigating her own account, the contact centre agent going screen by screen, the branch adviser at her desk, and the mandates desk operator who confirmed no single register joins all three. The hub is the product that would let the first of those four do what the other three currently do for her.

The retail client who has tried to stop a card subscription, was offered a card block, and declined because blocking the card would stop every payment tied to it. H2 names five confirming sources for this state. The hub gives that client a mechanism that did not previously exist in any Czech incumbent's product.

The contact centre agent handling the call type that, as the A4 evidence records, "goes worst." The hub does not eliminate the contact; it gives the client a path that does not require one.

### Why this bank

P1 establishes that all four Czech incumbents exclude card-on-file subscriptions from their recurring payment channels. This means the problem H1 names is not a Ceska sporitelna peculiarity: it is the architectural norm across the Czech market. The first incumbent to close it is first in a market where no competitor currently holds this capability at the consumer layer.

TR1 is the structural reason this bank has a shorter path to that position than its Czech peers. The Erste Group is a confirmed Tapix client. The transaction intelligence that would underpin the unified view is not a capability the bank would need to source, evaluate, and procure: it is already present at the group level. A Czech peer starting from the same product problem would also need to start from the same infrastructure gap. This bank does not.

P6 and ST3 together establish the competitive exposure the delay creates. Revolut holds a Czech banking licence and already offers Smart Subscriptions to Czech customers, with merchant-level blocking and due-date notifications available today. The A7 synthesis names this as the sharpest risk: a CS client who discovers this capability at Revolut does not need to switch banks entirely to access it. They need only to open a Revolut account alongside their CS account. The unified hub is the answer that keeps the client's commitment management relationship inside George rather than pushing it to a competitor.

The card-scheme feasibility question -- whether merchant-level blocking or virtual card issuance is available under the scheme rules applicable to this bank -- is the constraint this idea cannot assess without the Banking Constraints body absent from this run. Both mechanisms exist in the market (Revolut and Monzo confirm one each); whether either is available at CS specifically is the question that needs an answer before the idea can be costed.

---

## I2 Honest Subscription Block

### What it is

A mechanism in George that lets a client stop a specific merchant charging their card, tells them exactly what the bank did and what it did not do, and monitors for any subsequent charge from the same merchant so the client is alerted if one arrives rather than discovering it on next month's statement. It is a targeted payment block, not a subscription cancellation: the bank stops authorising charges from that merchant against the client's card, while the client's account with the merchant remains open and must be addressed directly with the merchant if the client wants to end it.

### What it does

It addresses H2 by giving the bank a mechanism it does not currently have. Today the only card-level option the bank can offer is blocking the whole card, which cancels every card payment the client holds, and the five contacts confirming H2 all describe clients declining or being unable to use it. This idea builds the targeted alternative: a per-merchant block that stops that merchant's charges without touching anything else on the card. It addresses H3 by replacing the current George UX, which presents a control that looks like a cancellation and is not one. The client who used George to "cancel" a subscription two months ago and is still being charged 349 crowns monthly is the product of a UI that implied something the bank had no mechanism to deliver. This idea replaces that implication with an explicit statement of what the bank is doing and what it is not, grounded in what ST4 and P4 confirm as the universal market ceiling: the bank can block a payment mandate and it cannot cancel the merchant contract. The client is told both.

### How it works

When a client identifies a card subscription they want to stop in the recurring commitments view in George:

1. They initiate a stop from the subscription's detail screen. The action is labelled "block payments" rather than "cancel subscription" because the label is the first place H3's fix is delivered: the current label implies contract termination the bank cannot execute.

2. The bank places a targeted authorisation block on that merchant against the client's card. The implementation path depends on whether the bank can issue a merchant-level authorisation rule without blocking the full card. TR6 establishes the scheme context: Mastercard's 2022 rule update created mandatory merchant-side cancellation pathways and left the bank-side mechanism entirely unaddressed, which means no scheme rule mandates this capability and the record does not confirm whether one prevents it. Whether the bank holds the scheme permission to place a merchant-specific block is not established in the available material and is the central feasibility question the Banking Constraints body would resolve.

3. George presents a two-part status after the block is placed: what the bank did ("Payments from [Merchant] are now blocked on your card") and what remains the client's to do ("Your [Merchant] account is still active; to cancel your subscription you need to contact them directly"). The second line is not a failure disclosure; it is the honest framing P4 confirms is the ceiling every market participant that has built this has settled on. No participant in this cohort cancels a card-on-file authority from the bank side, and the George UX that currently implies otherwise is what H3 names as the problem.

4. George monitors for subsequent authorisation attempts from the same merchant. If one arrives and is declined, the client is notified in-app, the notification surfaces the dispute path, and the charge attempt is recorded in the subscription's history screen. TR2 establishes the precedent: Lloyds notifies clients when a subscription payment is due or a price changes; NatWest surfaces 12-month payment history per subscription. Applied to H3, the monitoring function means the client who placed the block does not need to verify whether it held; the bank reports back.

5. The client can lift the block from the same screen at any time, with the same two-part status reversed.

### Who it is for

Clients who have a card subscription they want to stop and for whom blocking their whole card is not an option. H2's five qualifying contacts confirm this is almost everyone who calls about this: the client who was offered and declined the card block, the contact centre agent who described it as the call type that goes worst, the branch adviser who confirmed the same answer at the desk, the mandates desk operator who confirmed requests of this type are sent back. More specifically it is for clients in two situations: clients who have already tried to stop a subscription in George and are still being charged (H3's 1,940 complaints in twelve months), and clients who called the bank and were told the only option is blocking the card (H2's 9,270 calls where no bank action was possible). The monitoring function in step 4 also serves clients proactively: a client who placed a block and is uncertain whether it held gets confirmation from the bank rather than a charge appearing on next month's statement.

### Why this bank

The precedent comes from traditional incumbents, not only neobanks. Lloyds built this in July 2020 in partnership with Minna Technologies; NatWest followed with a dedicated subscriptions tab. TR2 establishes that a retail banking-scale implementation of subscription payment blocking is not experimental: it is what UK incumbents did as a competitive and regulatory response, and it has been in production for five years. The framing every participant has settled on is payment blocking and merchant signposting, not cancellation (P4). That is exactly what H3 requires at the UX level: a product that states what it does rather than implying termination it cannot execute, because the current George UX that implies termination is the thing producing 1,940 annual complaints. TR6 establishes that building this is a product decision: Mastercard's 2022 scheme rules left the bank-side capability gap entirely unaddressed, which means no regulation mandates the build and no scheme rule has been confirmed to prevent it. No Czech incumbent in this cohort has built it. Revolut holds a Czech banking licence and already offers merchant-level blocking to Czech customers through Smart Subscriptions, so the bank is not ahead of the market; but its own clients are currently being sent back from the mandates desk and told to block their whole card, and that is the gap this idea addresses.

---

## I3 Type-honest commitment management

### What it is

A redesign of the recurring commitment management flows in George that introduces a capability declaration layer: before the client takes any action on a recurring commitment, the app names the commitment type and states what the bank can and cannot do for it. After the action completes, the confirmation screen names what was achieved and what remains outside the bank's reach. The George app's current cancel flow returns a success screen for card subscription blocks the bank cannot execute as cancellations; this idea replaces that screen with one that states what actually happened, and adds a proactive notification that alerts the client if a charge from a blocked merchant reappears before the statement reveals it.

### What it does

It eliminates the H3 scenario at its source: a client who cancels a card subscription in George and continues to be charged does so because the app implied success for an action that leaves the merchant contract intact. By making the outcome explicit before and after, the misleading implication is removed without requiring the bank to acquire a cancellation capability it does not have. It addresses H4 by surfacing the capability difference by commitment type before any action starts: a client comparing a standing order and a card subscription in George sees that the bank can stop one outright and can only block the other, and that blocking a card subscription does not end the underlying merchant agreement. The proactive notification catches H3 cases that survive the redesign: if a charge from a blocked subscription reappears, the client is alerted rather than discovering the failure on a monthly statement.

### How it works

When a client selects a recurring commitment in George, the interface identifies the commitment type (standing order, direct debit mandate, or card-on-file subscription) and presents the available actions with plain-language outcome statements. For a standing order: "Cancel this payment. The bank will stop all future transfers on your instruction." For a card subscription: "Block this merchant. The bank will block future card charges from this merchant. This does not cancel your subscription with the merchant; to end the subscription, contact the merchant directly." The client sees the actual capability boundary before confirming. After confirmation, the outcome screen names what was done and what was not: "Future card charges from this merchant are now blocked. Your subscription with the merchant has not been cancelled."

The proactive notification layer monitors for charges from a blocked merchant and sends an in-app alert if one appears. Whether transaction-level enrichment connecting incoming card charges to previously blocked merchants is available on the bank's current stack is a feasibility question the Banking Constraints body would assess; that body is absent from this run and that question is open. The notification design is independent of that question: the alert can be triggered on a charge-appears-from-blocked-merchant rule even without full enrichment, provided transaction matching is feasible at the implementation layer.

### Who it is for

Retail clients who manage recurring commitments in the George app and who cannot, under the current flow, tell what the bank's action achieves before they take it. The immediate target is a client with a card-on-file subscription alongside standing orders or direct debits: that client encounters H4's capability asymmetry directly when they navigate to change something and find that the same interface produces different outcomes depending on type. The H3 beneficiary is a client who has already used George to cancel a subscription, received a success screen, and continues to be charged: this idea would have stated upfront that the bank's action is a block rather than a cancellation, and would have notified them if a charge reappeared. Both groups are retail clients of Ceska sporitelna with an active current account; neither is a business client or private banking client.

### Why this bank

The Czech digital migration (TR3) concentrates recurring payment management in the George app: KB eliminated paper standing order submission at branches in January 2024 and Air Bank and MONETA are positioned digital-first, making the George app the primary channel now rather than in a planned future. The bank already operates the digital standing order management floor (ST1); the gap here is legibility rather than capability, and the idea adds the communication layer that makes existing capability honest. Documentation quality already varies substantially across Czech incumbents (P7), confirming that the information clients receive about what their actions achieve is an active differentiator rather than a settled baseline. The vocabulary divide (P3) explains H3's root cause: Czech-market participants, including this bank, describe commitments in the bank's operational vocabulary, which does not match how clients think about subscriptions, so a client who set up a card-on-file recurring payment does not know it differs from a standing order until the cancellation fails and the charges continue. Proactive subscription notification is absent from all Czech-market participants (ST6); adding it here would be a first-mover capability in the Czech retail market, addressing H3 at the detection layer in addition to the instruction layer. The bank cannot be first to offer the underlying card subscription stopping capability (that is what I4 addresses, and the market ceiling confirmed across this cohort is that no bank-side action cancels the merchant contract); it can be first among Czech-market participants to state honestly what it can do, and to catch the failure when the gap between bank action and client expectation produces a continuing charge.

---

## I4 Subscription Card Vault

### What it is

A feature that assigns each card-on-file subscription a dedicated virtual card credential, distinct from the client's physical card. The client can revoke any subscription's credential from the app, stopping future charges from that merchant without touching other card payments and without calling the bank or contacting the merchant. Alongside the credential controls, all three recurring commitment types appear in a single view with type-specific actions and a plain-language statement of what the bank can do for each: a standing order can be cancelled outright, a direct debit mandate can be revoked at the bank, a card subscription's credential can be deleted. The app states this before the client acts.

The idea is grounded in ST4 (the market ceiling: every participant with in-app card controls blocks the charge but cannot cancel the merchant contract) and TR4 (virtual card proliferation as a credential-level subscription isolation mechanism, already active in the Czech market at Revolut). It addresses H2 by operating within the bank's unilateral reach rather than against the scheme-level ceiling, and H4 by making the capability difference visible and intentional before the client discovers it mid-action.

### What it does

For H2: the client who wants to stop a card subscription no longer faces the binary choice between blocking their whole card and calling the merchant. Each subscription is charged to its own virtual card number. Deleting that card number removes the payment authority without affecting any other card-linked payment. The merchant retains the subscription in their system, but the payment cannot proceed because the credential it was billing no longer exists. The bank's action is the revocation of a credential it issued, which sits within the bank's control regardless of scheme-level subscription cancellation rules.

For H4: the client who has tried to cancel a standing order, a direct debit, and a card subscription in the same session currently encounters three different experiences with no explanation of why. This feature makes the difference visible and intentional. The unified view labels each commitment type in the client's vocabulary: "subscriptions" alongside "standing orders" and "direct debits" (P3: the participants who built the capability adopted commercial vocabulary; the vocabulary shift is not cosmetic). Each type carries its own control set and a one-line statement of what that control achieves. "Cancel this standing order" produces an immediate stop. "Cancel this mandate" initiates the direct debit revocation flow and states the timeline. "Delete this card" stops future charges; the app also states that the subscription contract with the merchant remains in place and that the client should contact the merchant to end the account relationship. The difference stops being a surprise and becomes a fact the app states before the client acts.

### How it works

At enrollment or on first detection, the bank issues a virtual card number for each identified card-on-file merchant relationship. An enrichment layer detects recurring card charges and maps each merchant to a distinct credential. The Erste Group parent is a confirmed Tapix client (TR1, P6 from the slate): the enrichment infrastructure that identifies and classifies recurring card charges across all commitment types is already deployed at the group level. Whether that group-level deployment is the route to the per-merchant credential mapping this idea requires is a question of bank architecture and commercial arrangement that Banking Constraints and Compliance Guidelines would address; they are absent from this run.

The client sees a commitment view with three sections, each labelled in commercial vocabulary. Actions within the card subscription section invoke the card management system, not a scheme-level cancellation flow. Deleting a virtual card is a card credential operation the bank can perform without scheme involvement. The merchant's system continues to attempt the charge at the next billing date; the attempt fails because the credential no longer exists.

TR5 is the regulatory tailwind. PSD3's alignment of merchant-initiated transaction protections with SEPA direct debit consumer rights (expected 2027-2028) will create a regulatory floor for what the bank must be able to do at the client's instruction for card subscriptions. Building the credential isolation mechanism ahead of that floor positions the bank to meet the requirement rather than retrofit to it. The exact protections PSD3 will require are not confirmed from the available material; the direction is.

The feasibility of per-subscription virtual card issuance under the bank's existing card scheme agreements is not assessable from this run.

### Who it is for

Retail clients with active card subscriptions they cannot stop without blocking their card or calling the bank. The 9,270 calls in twelve months where the bank could take no action (A4, H2 evidence) name the primary population: clients who have already tried the bank channel and been told no action is possible. The second population is the client who discovers H4 mid-action, who navigated her own account and found the contrast between stopping a standing order in thirty seconds and being told a card subscription cannot be stopped at all. A third group is the client P3 identifies: clients who think about their finances in commercial vocabulary ("my subscriptions") and find the bank's operational vocabulary ("card-on-file mandates", "trvalý prikaz") a barrier to understanding what they can actually control.

### Why this bank

Three elements align specifically at Ceska sporitelna. First, the enrichment infrastructure. Tapix is a confirmed Erste Group client (P6). The infrastructure that processes recurring payment intelligence across all three commitment types without a single-type blind spot is deployed at the group level without a publicly confirmed Czech consumer product. The bank is not starting from zero on the detection layer.

Second, the regulatory positioning. TR5 establishes that PSD3 will align card-on-file subscription protections with SEPA direct debit rights before the end of this decade. The bank that builds credential-level control before the regulatory floor arrives is ahead of compliance rather than behind it. The credential isolation mechanism this idea uses is compatible with the direction PSD3 is moving, because it gives the bank a unilateral action (credential revocation) that the regulatory alignment is moving toward requiring.

Third, the vocabulary shift. P3 establishes that every participant offering dedicated subscription management uses the client's commercial vocabulary, and the vocabulary divide maps precisely to the capability divide. Ceska sporitelna can adopt commercial vocabulary now, before any infrastructure is built, and close the H4 transparency gap immediately. The credential isolation closes the H2 capability gap on top of that. Together they produce a product where the client knows what the bank can do before they act and has a mechanism the bank can actually complete from its side.

---

## I5 Unified commitment register

### What it is

The unified commitment register is a continuously maintained, cross-type record of every standing order, direct debit mandate, and card-on-file subscription leaving a client's account. It is not a redesign of three existing management sections. It is a new data layer, built on B2B enrichment infrastructure that already classifies all three commitment types from transaction data, which then powers two distinct delivery surfaces: a unified view for the client and a cross-commitment context panel for staff. The investment is in the register; the two surfaces are what justify it across both the client-facing problems (H1, H4) and the staff-side problem (H8). H8 is not an add-on here. It is a structural consequence of building the cross-type data model: once the register covers all three types, serving it to staff costs a second surface rather than a second underlying build.

### What it does

For the client, the register replaces three separate navigation paths (standing orders in one section, direct debits in another, card subscriptions absent from the app entirely) with one list of everything leaving the account on a recurring basis. Each entry carries the commitment's name, type, amount, and next scheduled date. At the list level -- before the client opens any action -- each entry carries a capability indicator stating what the bank can actually do for that type: modify or cancel entirely for standing orders; cancel the mandate at the bank level without merchant contact for direct debits; block the payment instruction only for card-on-file subscriptions. The capability is shown before the client tries anything, which is what H4 requires. The inconsistency by type does not disappear, but the client is told about it before they encounter it as a failure.

For staff, the same register delivers a compact cross-commitment panel in the commitment case screen. When a contact centre agent or mandates desk operator opens a case about any commitment, the panel shows the client's full commitment picture alongside it. A case about a direct debit can be handled while the agent sees the card subscriptions and standing orders the client also holds. Problems the bank could address proactively, while the client is already in contact, are visible in the same screen where the case work happens (H8).

### How it works

The enrichment layer identifies each recurring transaction as one of three types: standing order (bank-initiated credit transfer), direct debit mandate (SEPA-authorised collection), or card-on-file subscription (recurring card charge matched by merchant or pattern). Tapix processes approximately 1.5 billion transactions per month through a single API carrying no single-type blind spot (ST7, TR1). Erste Group, the parent of Ceska Sporitelna, is a confirmed Tapix client (P6). Whether that parent-level relationship extends to a Czech retail banking deployment under the same commercial arrangement is a bank constraint this run cannot assess. It should be resolved before this idea proceeds to design, because the answer changes the build path substantially.

Each enriched entry in the register carries its type and a pre-computed capability tag derived from the type. The tag is rule-based: standing orders can be modified or cancelled through the bank channel; direct debit mandates can be cancelled at the bank level without merchant contact; card-on-file subscriptions can have the bank's payment instruction blocked, but the underlying contract with the merchant remains outside the bank's reach. That last ceiling is not a design choice at this idea or at any other participant in the market (ST2, P3). Every participant that has built in-app card subscription controls confirms the same boundary. The capability indicator shown at the list level reflects this ceiling accurately rather than overstating what the bank can do.

The client-facing surface reads from the register and renders it as a single list, filterable by type or by next-due date. The staff-facing surface reads from the same register through the case management interface: a compact panel that appears alongside any open commitment case without requiring a separate navigation step.

H8 has no market answer in the synthesis (listed in absences). The basis for addressing it here is architectural, not market-derived: a data model that covers all three commitment types for the client view already contains what staff currently lack. Whether the case management tooling that staff use can accept a read from the register, and what data governance applies to surfacing a client's full commitment picture in a staff-facing screen, are bank constraints this run cannot assess.

### Who it is for

The primary beneficiary is the retail client who holds more than one type of recurring commitment and currently has no way to see them together. The brief's segment is retail clients with an active current account. A client with a standing order, a direct debit for a gym membership, and a card-on-file subscription for a streaming service has three separate management paths today, with the card subscription absent from the app entirely. The unified view is the thing that would let a client act with full information about everything leaving their account (H1). The type-aware capability guidance addresses the secondary population: the client who has tried to change a commitment and discovered mid-action that the bank's capability for that type differs from what they expected (H4).

H8's beneficiary is the contact centre agent or mandates desk operator. They are not the product's primary user, but they are the population H8 names as carrying a cross-commitment visibility gap while client contacts continue. The brief's product goal is to eliminate the need for the contact-centre touch; until that elimination is complete, every contact that happens carries the limitation H8 describes.

### Why this bank

Three findings in the synthesis point toward Ceska Sporitelna specifically rather than toward any Czech incumbent in the cohort.

The first is the parent-level Tapix relationship (P6, TR1). The enrichment infrastructure that would power the cross-type register is commercially deployed at Erste Group. No other Czech incumbent in this cohort is known to hold that structural proximity to this vendor. Whether it reduces the time to build, the cost, or both, is a question for bank-level discovery. That the relationship exists is confirmed.

The second is the absence of a unified view at any Czech incumbent (ST2). The market's universal architecture separates by type, and inheriting parity means inheriting the gap H1 names. The first Czech bank to surface all three commitment types in one place creates a product distinction no Czech competitor can match without a comparable infrastructure investment. Revolut holds a Czech banking licence and already operates Smart Subscriptions in the Czech market. The opening is current.

The third is what the staff surface adds to the business case. H8 sits last in the secondary tier because the brief's goal is to reduce contact-centre dependency, not to improve the contact centre. But a register that already covers all three types for the client view delivers a staff context panel from the same data model. That panel reduces the probability of repeated contact about related commitments the agent could not see in the original interaction -- an outcome that serves the initiative's goal even while the digital capability catches up.

---

## What we could not establish

**Compliance feasibility of each idea.** The Banking Constraints and Compliance Guidelines are absent from this run. Where an idea's viability depends on whether a card-scheme rule, a regulatory obligation, or a bank-internal constraint allows the approach, that question is open. I1 and I2 carry the sharpest exposure: whether the bank can surface card subscription charges in a dedicated view, and what consent or data-sharing arrangements that requires, is not assessable here. I4's H2 component (virtual card isolation or merchant-level blocking) also depends on scheme permissions not available to this run.

**Whether H5 or H6 can be addressed without duplicating a problem set already in the slate.** Both secondary problems met no market answer in A7 and neither appears in the five ideas above. No combination of H5 or H6 with the primary problems produces a problem set that is not either a subset of one already named or identical to one. That is a structural result of the five ideas as named, not an omission: if the decision gate expands the set, H5 and H6 are available to anchor new entries.

**I1 -- Unified Commitment Hub.** The card-scheme feasibility question -- whether merchant-level blocking or virtual card issuance is available under the scheme rules applicable to this bank -- is the constraint this idea cannot assess without the Banking Constraints body absent from this run. Both mechanisms exist in the market (Revolut and Monzo confirm one each); whether either is available at CS specifically is the question that needs an answer before the idea can be costed.

**I2 -- Honest Subscription Block.** Card scheme permission: whether targeted merchant-level payment blocking is permissible under Visa and Mastercard scheme rules without blocking the whole card is not established in the available material; the brief records this as an open question and the Banking Constraints body that would address it is absent for this run. [indicative - Banking Constraints absent] Client communication standard: presenting a payment block as distinct from subscription cancellation and explaining the client's continuing contractual obligation with the merchant requires language meeting PSD2 and consumer protection disclosure standards; the Compliance Guidelines body that would govern this wording is absent for this run. [indicative - Compliance Guidelines absent]

**I3 -- Type-honest commitment management.** Payment action disclosure: informing clients that blocking a card-on-file payment does not cancel the underlying merchant contract may engage PSD2/PSD3 disclosure obligations covering the limits of payment services. Indicative -- the Compliance Guidelines are absent from this run and the specific obligation requires review when that body is available. Proactive notification consent: sending clients in-app alerts when a charge reappears from a blocked merchant engages GDPR and Czech financial communications rules on the legal basis for processing transaction data for notification purposes. Indicative -- the Compliance Guidelines are absent from this run. Whether transaction-level enrichment connecting incoming card charges to previously blocked merchants is available on the bank's current stack is a feasibility question the Banking Constraints body would assess; that body is absent from this run and that question is open.

**I4 -- Subscription Card Vault.** Indicative (Compliance Guidelines absent): per-subscription virtual card issuance under card scheme rules -- TR4 establishes virtual card credential isolation as a market practice at Revolut and Monzo, but whether the bank's card scheme agreements permit issuing one virtual card per merchant subscription is not assessable from this run. Indicative (Compliance Guidelines absent): PSD3 regulatory alignment -- TR5 identifies that protections for merchant-initiated transactions are being aligned with SEPA direct debit consumer rights, expected in force 2027-2028. A credential isolation product built now should be checked for compatibility with the incoming protections before the regulatory floor arrives. The feasibility of per-subscription virtual card issuance under the bank's existing card scheme agreements is not assessable from this run.

**I5 -- Unified commitment register.** Whether the parent-level Tapix relationship extends to a Czech retail banking deployment under the same commercial arrangement is a bank constraint this run cannot assess. It should be resolved before this idea proceeds to design, because the answer changes the build path substantially. Whether the case management tooling that staff use can accept a read from the register, and what data governance applies to surfacing a client's full commitment picture in a staff-facing screen, are bank constraints this run cannot assess.

---

## How this was produced

**Run 2026-07-standing-orders, stage 4.1 ideation, phase 1 -- the slate.** This invocation names the set; it authors no idea. The brief (A1) was read for outcome, segment and scope. The prioritised problems (A4) were read for the primary set (H1, H2, H4), secondary set (H3, H6, H5, H8) and parked set (H7, H9, H10). The competitive synthesis (A7) was read for the synthesis elements (ST1-ST7, P1-P7, TR1-TR7) each idea is bound to. The Compliance Guidelines are absent by decision of 24 August (PD164) and no compliance shaping was performed; the touchpoints field is left to Phase 2 authors.

Five ideas were named against the three-to-seven bound, targeting five. The subset check was run across all ten pairs: every pair shares at most one problem, and in each shared case the non-shared elements prevent either entry from being a strict subset of the other. H1, H2 and H4 are each covered at least once.

**Phase 2 -- five instances, one idea each.** Each instance read the brief (A1), the prioritised problems (A4), the competitive synthesis (A7), and its own slate entry (id, solves[], supported_by[]), then authored that idea into its own part file under fixtures/2026-07-standing-orders/4-solutions/parts/. All five instances returned: I1 (Unified Commitment Hub), I2 (Honest Subscription Block), I3 (Type-honest commitment management), I4 (Subscription Card Vault), I5 (Unified commitment register). No instance could assess the Banking Constraints body or the Compliance Guidelines body; both were absent from this run. Compliance touchpoints were named indicative where identified.

**Phase 3 -- the join.** All five part files were read and their bodies transferred into this artifact word for word. The heading for each idea carries the id and the name its author gave it, as written in the part file. The record (R-A8-01) was extended with the statement and compliance_touchpoints from each part. unproduced: [] because all five came back. The per-idea could-not-establish items are carried in the section above.

Assembled from one record: **R-A8-01** (records/4-solutions/A8-r01-ideas.record.md).
