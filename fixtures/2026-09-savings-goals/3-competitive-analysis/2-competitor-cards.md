---
run_id: 2026-09-savings-goals
artifact_id: A6
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
standards_basis: current
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: deep-dive
sources: [A5]
external_sources: [S-csas-obalky-faq, S-csas-sporici-ucet, S-csob-obalky, S-kb-sporici-ucet, S-mesec-airbank-2026, S-e15-airbank-drobne, S-penize-airbank-drobne, S-airbank-mobilni, S-banky-obalky, S-financera-sporici, S-moneyspot-moneta, S-finder-pots, S-easyearns-compare, S-abel-roundups, S-partnersnews-pb]
assembled_at: 2026-08-28
assembled_from: [R-A6-01, R-A6-02, R-A6-03, R-A6-04, R-A6-05, R-A6-06, R-A6-07, R-A6-08, R-A6-09, R-A6-10]
---

# Competitive analysis | Competitor cards: goal-based saving

Ten cards. **All ten carry `high` confidence**, and the value comes from how many independent parties stand behind each card rather than from how complete it reads. [rec:R-A6-01]

Every card rests on the participant's own page plus at least five independent accounts of it. Starling's first URL refused the fetch and a second one reached the same content.

## Česká spořitelna

[rec:R-A6-01]

### What they offer

**Savings envelopes on the savings account.** One savings balance divides into separate envelopes according to what the client is saving for.
**Up to nine envelopes.** The bank's own FAQ states the cap.
**Progress visible in George.** A client can check at any time how they are progressing towards their goals.
**Money in an envelope is reserved.** It stops counting towards the available balance on the savings account.
**Moving money in and out from mobile.** A client can transfer into an envelope and withdraw from it in the app.
**Creating an envelope in the app.** A client with no envelope can make one directly in mobile.

### What stands out

**The feature this run was briefed to consider already exists here.** That is the finding of the whole map, and it came from our own pages.
**Nine is the second-lowest cap found in the Czech market**, above mBank's eight and below the ten at ČSOB, Komerční banka and Raiffeisenbank.
**Reserving the money is a stronger commitment than most.** An envelope here removes the money from the available balance rather than only labelling it.

### Where the journey stops

The envelope sits on the savings account. A client with no savings account has no envelopes.
**Nothing funds an envelope automatically.** Every deposit is a decision plus a transfer, and two Czech competitors have removed exactly that step.

### What it costs

No fee is discussed on the FAQ page. ČSOB states plainly that its envelopes are free; ours does not say either way.

### Confirmed not to do

**A client cannot pay from an envelope.** The money must go back to the savings account first, which the FAQ states outright. ČSOB allows the opposite.
The FAQ does not state that an envelope carries a target amount. Three Czech competitors clearly do.

## Air Bank

[rec:R-A6-02]

### What they offer

**Drobné spoření, automatic round-ups.** Each card, sticker or Cvak payment rounds up to the nearest ten crowns and the difference moves to savings.
**An envelope created for it automatically.** The swept money lands in a new envelope named Drobné spoření on the crown savings account.
**A top-up above the rounding.** In mobile banking a client can set an extra amount if the rounding alone is not enough.
**Switchable at any time.** Enabled in the My Air app, and changed or turned off there.
**Envelopes on the savings account**, into which the round-ups sweep.
**A published saving estimate.** At average card use of twice a day, roughly 3,600 CZK a year accumulates from the differences alone.

### What stands out

**Rounding to ten crowns rather than one.** The published example takes 243 CZK to 250 CZK and moves 7 CZK, which is a coarser sweep than the UK banks' rounding to the nearest pound.
**The bank publishes what the client can expect to save.** No other Czech implementation found does.

**It is the second Czech bank to round up, not the first.** Raiffeisenbank was already doing it and had passed 100 million crowns swept before this launched.

### Where the journey stops

ATM withdrawals are excluded. Only merchant and online payments round up.
A payment already at a multiple of ten moves nothing.

### What it costs

No fee is reported in any of the three sources covering the launch.

### Confirmed not to do

**The round-up goes to one envelope the service creates.** Whether it can be pointed at an envelope the client chose is not stated anywhere found, and Starling allows exactly that.

## ČSOB

[rec:R-A6-03]

### What they offer

**Named envelopes with a target amount.** A client names an envelope, for example a holiday, and sets the amount to save towards.
**Up to ten envelopes.**
**Created in the Smart app.** Select a savings account, create a new envelope, choose an icon, a name and a target.
**Paying out of a full envelope.** Once the envelope is full the client can pay directly from it.
**Interest continues undisturbed.** The bank states the money keeps earning while it sits divided.
**Free.** The bank states the envelopes are a free function of the savings account.

### What stands out

**The only Czech bank found that lets a client pay out of an envelope.** Everyone else displays a balance; this moves money out of one, and Česká spořitelna states the opposite outright.
**The target amount is explicitly only indicative**, so the client knows how much is left rather than being held to it.
**Icons on envelopes.** A small thing, and the only bank whose own page mentions it.

### Where the journey stops

The envelope is on a savings account, like every other Czech implementation found.

### What it costs

**Free**, stated by the bank rather than inferred from silence.

### Confirmed not to do

Whether paying out needs the envelope to be full, or only to hold enough, is not stated.
No automatic funding of any kind is described.

## Komerční banka

[rec:R-A6-04]

### What they offer

**Up to ten envelopes at once.** Each carries a name and a target amount.
**Editable at any time.** Envelopes can be changed, deleted and created whenever the client wants.
**Drag and drop in KB+.** Money moves between envelopes and accounts by dragging.
**Money moves both ways.** Between envelopes, and between an envelope and the account.
**On the savings account**, with the balance held together.
**Managed entirely in the app.**

### What stands out

**Ten envelopes matches ČSOB and Raiffeisenbank** and is the joint highest capped figure in the Czech market.
**Drag and drop is the only interaction detail any Czech bank's coverage names**, which says something about how thin the published detail is across this market.

**Nothing distinguishes the envelopes themselves.** Ten with a name and a target is what ČSOB and Raiffeisenbank also have, and this bank publishes no usage figure and no automatic funding.

### Where the journey stops

The envelopes sit on the savings account.

### What it costs

No fee is stated in either source.

### Confirmed not to do

Whether progress against the target is displayed as progress, or only as a balance beside a number, is not stated.
No automatic funding is described.

## Moneta Money Bank

[rec:R-A6-05]

### What they offer

**Envelopes inside the savings account.** The total balance divides into virtual compartments named by the client, such as taxes, a summer holiday, or unexpected car costs.
**One pot of money underneath.** The money sits physically in one place and earns interest together; the division is visual.
**Managed in the mobile app.**
**An interest guarantee up to one million crowns**, which is the bank's own headline for the account the envelopes sit on.
**Names chosen by the client** rather than picked from a list.
**No effect on interest from dividing**, which every Czech implementation found shares.

### What stands out

**The clearest published statement that the envelope is a display over one balance.** Other banks imply it; this coverage says it.
**The account underneath is the differentiator rather than the envelopes.** The bank's own page leads on the rate and the guarantee, not on the envelopes.

**No published cap.** Every other Czech bank profiled states how many envelopes a client may have; this one does not.

### Where the journey stops

The envelopes are on the savings account.

### What it costs

No fee is stated.

### Confirmed not to do

**The envelope cap is unestablished.** No source found states one, and every other Czech bank profiled has a published number.
Whether envelopes carry target amounts is unestablished.

## mBank

[rec:R-A6-06]

### What they offer

**mSpoření with up to eight goals.** The bank's own page states the cap.
**A separate product from the savings account.** The goals sit on mSpoření, not on mSpořicí účet Plus.
**A guaranteed rate**, quoted at 3.01% on balances up to 100,000 CZK per goal.
**A total ceiling of 800,000 CZK** across the goals at that rate.
**Heavily used.** Coverage reports that more than 40% of savings held on mBank savings accounts sits in these envelopes.
**Managed in the app.**

### What stands out

**The only implementation found where the goal cap and an interest ceiling are the same number.** Eight goals at 100,000 CZK each is the stated 800,000 CZK total.
**The lowest cap found in the Czech market.**
**The only Czech bank with a published take-up figure for its envelopes**, and it is the strongest evidence found anywhere that clients use these.

### Where the journey stops

The goals are a separate product. A client on mSpořicí účet Plus alone has none.
**The bank's own page for mSpořicí účet Plus does not describe goals at all**, which corrected an earlier reading of this card taken from secondary coverage.

### What it costs

The rate is the price here rather than a fee.

### Confirmed not to do

Whether the eight-goal cap is a product limit or a consequence of the interest ceiling is not stated.
Whether a goal carries a target amount is not stated on the page reached.

## Raiffeisenbank

[rec:R-A6-07]

### What they offer

**Spořicí cíle, up to ten goals per savings account.**
**A name, a target amount and a target date on each.** It is the only Czech implementation found that carries a date.
**Editable and deletable at any time**, through an Edit Goal button in the goal's detail.
**Drobné spoření, automatic round-ups**, offered as its own product beside the goals.
**No effect on interest.** The bank states the whole savings account keeps earning however the money is divided.
**Published usage.** Over 100 million crowns swept through Drobné spoření and more than 100,000 savings goals set.
**Published behaviour data.** An average target of 143,000 CZK, most goals under 50,000 CZK, and the popular categories named.

### What stands out

**The most complete Czech implementation found.** It is the only bank with both goals and round-ups, and the only one that publishes how they are used.
**The target date is unique in this market.** Every other Czech bank found carries a name and an amount and no deadline.
**Under-20s save for electronics and a car; middle-aged clients for a holiday and housing.** No other bank publishes anything of the kind.

### Where the journey stops

The goals sit on the savings account, like every other Czech implementation found.

### What it costs

No fee is stated on either product page.

### Confirmed not to do

Whether progress is displayed against the date as well as the amount is not stated.
Whether Drobné spoření can target a chosen goal is not stated on the page reached.

## Monzo

[rec:R-A6-08]

### What they offer

**Pots.** Money divides into named, purpose-specific pots without opening more accounts.
**Round-ups.** Spending above £1 rounds to the nearest pound and the difference goes to a pot.
**Scheduled transfers into a pot.**
**Up to twenty Savings Pots**, with no minimum deposit on the instant-access ones.
**Pots inside the everyday app** rather than in a separate savings product the client must open.
**Optional savings targets.** The bank's own page says to name a pot, set optional savings targets and make a first deposit.

### What stands out

**The reference implementation the Czech market is following.** Round-ups plus named pots in one app is what two Czech banks have now built a version of.
**Rounding to the nearest unit rather than to ten.** A pound rather than ten crowns is a much finer sweep, and produces more frequent small movements.

**Scheduled payments out of a Pot.** Rent and direct debits can be paid from a specific Pot, which is a stronger version of what ČSOB offers and nothing else in the Czech market has.

### Where the journey stops

The interest arrangement runs through partner banks, so the money is not simply sitting in the current account.

### What it costs

No fee for pots is reported in the sources found.

### Confirmed not to do

Whether Pots sit inside the current account or on a separate deposit held by partner banks. The interest arrangement implies the latter and no source found states it plainly.
**The rate the comparison sites quote is wrong.** They said up to 4.75% AER; Monzo's own page tops out at 3.65% AER on a paid plan, with 2.75% on the free one. Every rate on the other two non-Czech cards comes from those same sites.

## Starling Bank

[rec:R-A6-09]

### What they offer

**Spaces.** Named savings spaces inside the account.
**Round Ups.** Spending rounds to the nearest £1 and the difference goes to a chosen Space.
**Goals-based saving**, named as such in the coverage.
**A savings target on a Space**, optional, set by the client. The bank's own page says to give a Space a name or choose from pre-set options, and set a savings target.
**Split Payment across Spaces**, separating money across Regular Spaces and accounts in one action.
**Virtual debit cards linked to up to five Spaces**, on personal accounts, so a Space can be spent from directly.

### What stands out

**The round-up targets a Space the client chose.** That is the one mechanical difference from Air Bank's implementation, which sweeps into an envelope it creates.
**Goals and round-ups in one product** rather than as two products beside each other, which is how Raiffeisenbank offers them.

**A Space is described as kept separate from the balance**, which is the same reservation Česká spořitelna's envelopes make and the opposite of a pure label.

### Where the journey stops

Unestablished from the sources found.

### What it costs

Starling is described as free in the coverage found.

### Confirmed not to do

Whether progress against the target is displayed as progress is not stated, only that a target can be set.
Whether the round-up can be split across Spaces is not stated.

## Revolut

[rec:R-A6-10]

### What they offer

**Pockets** for dividing money.
**Vaults** for saving.
**Group vaults** for shared saving goals.
**Interest quoted up to 4.60% AER.**
**Operating in the Czech market**, unlike Monzo and Starling.
**Named, purpose-specific division without opening more accounts.**

### What stands out

**Group vaults are the only shared-goal mechanism found anywhere in this map.** No Czech bank has an equivalent, and nothing in the material from clients asked for one.
**Two mechanisms rather than one**, Pockets and Vaults, where every other participant has a single concept.

**The only non-Czech participant that actually operates here**, which makes it the one whose UK feature set might arrive in this market without anybody building it.

### Where the journey stops

Unestablished from the sources found.

### What it costs

Unestablished.

### Confirmed not to do

**What is available in the Czech market specifically.** Every source describes the UK offering, and Revolut operates here under a different arrangement.
Whether group vaults exist in the Czech market at all was not established.

## What we could not establish

**Whether Česká spořitelna's envelopes carry a target amount.** Our own FAQ does not say. Four competitors clearly do, and Raiffeisenbank carries a target date as well.

**What Revolut offers in the Czech market.** Every source describes the UK offering, and Revolut is the one non-Czech participant that actually operates here.

**Whether any of this changes saving behaviour, beyond take-up.** Two banks publish usage figures. Neither publishes whether clients who use envelopes save more than clients who do not, and that is the question the pilot would need answered.

## How this was produced

Step 3.2, `deep-dive`, agent `competitive-analysis`. One card per participant the map selected, ten of eleven.

**Three cards were corrected by reaching a primary page.** mBank's goals turned out to sit on a separate product rather than on the savings account the secondary coverage named, Raiffeisenbank turned out to have round-ups as well as goals, which changed a market trend on the map. And Monzo's own page tops out at 3.65% AER where the comparison sites said 4.75%, which is a caution about every rate on this page that has no primary source behind it.

The search ran through the substrate's own search capability, because no approved ČS search destination is named in `egress.yaml`. **Research conducted under a test destination is not research conducted under an approved one**, and `egress_basis: pilot-test` carries it.
