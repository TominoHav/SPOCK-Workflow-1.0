# Strategy Basis

**Version:** 0.4 · **Date:** 30 September 2026 · **First version:** 13 August 2026 · **Status:** For review
<!-- history -->
**v0.4 says a solution is read against the key results** (DOCB), from 30 September 2026, where three lines still
said scored: stage 4 has computed no score since 7 September.
**v0.3 says what SPOCK 1.2 changed**, from 21 September 2026: the product goal is the North Star, one level.
**v0.2 takes the arithmetic out, two model changes after it stopped being true.** §4 carried four bands
worth 30, 20, 10 and 0 out of a potential denominator, which `.github/registry/scoring.yaml` replaced on
1 September 2026 with two standalone scores, **neither a fraction of anything**, and which stage 4 stopped
computing altogether on 7 September when the scoring step and `A8b` were removed. The bands themselves
were never the stale part and are unchanged: what each one takes is the same sentence it has always been.
§5's reader table named `idea-scoring`, a skill that stopped existing in the same change.
**Parent contract:** [PILOT-BUSINESS-LOGIC.md](../../../PILOT-BUSINESS-LOGIC.md) v1.10 · **Backlog:** PT-N6
<!-- /history -->
**Owner:** Česká spořitelna · **Written by:** Igor Tadić · **Read by:** `brief-creation` · `ideation` · `mvp-expansion` · `prd`

> **What this is.** The objectives and key results a solution's strategic alignment is read against, the
> bands that turn a link into a score, and the rule about what a product may use as its own measure.
>
> **What this is not.** Not the bank's strategy — that is a ČS document and this carries the part a run
> needs. Not a ranking of the key results: nothing here says one objective matters more than another, and
> a score against one is not comparable to a score against another. Not a compliance body, and not a cost
> or sizing body; those are the Compliance Guidelines, which this build has, and the Banking
> Constraints, retired and not coming.
>
> **The targets are redacted at source and that is the design, not a gap.** Every key result below states
> a direction and holds `(n)` or `X %` where the bank's own document carries a number. **Alignment is
> therefore scored on the strength of the link and never on the size of the movement**, which §1 explains
> and §4 makes operable.

---

## 1. Why this basis has directions and no numbers

**A target would not improve the score, and it would let a weak solution look strong.** Alignment asks whether
a solution moves a key result, and by what path. Knowing that a key result must reach a particular number
tells you nothing about whether this solution is on a path to it. **The two questions are independent**, and
conflating them is how a solution with no mechanism scores well by pointing at a large number.

So the score measures **distance and evidence**: how many stated steps separate the solution's own measure
from the key result, and whether every step in that chain holds without an assumption nobody has checked.
A solution one step away scores higher than a solution two steps away, and one whose chain contains a guess
scores lower than both, whatever the numbers involved.

**This is also what the framework says.** An outcome sits under a business outcome and leads it, and the
question a team must be able to answer is which business outcome its product outcome feeds and by what
mechanism (Method Canon §9.1, §9.3). The mechanism is the thing. The magnitude is downstream of it.

**Rules**
- **A score is anchored to a named key result from §2 or it is not a score.** An alignment claim naming no
  key result is unscored, never zero.
- **The bands in §4 are the whole scale.** No intermediate value, no rounding between bands, no
  half-marks. Fixed scores exist because the basis carries no numbers and a range would invent precision.
- **Nothing here ranks the objectives.** Six objectives with equal standing. A solution aligned strongly to
  one is aligned strongly, and the choice between two strongly aligned solutions belongs to a person at a gate.

---

## 2. The basis

**Twenty-five key results under six objectives, carried as twenty-six rows.** A solution is read against
these and against nothing else.

`C` customer behaviour — the key result measures something a customer does or experiences ·
`I` internal capability — the key result measures how the bank works

### 2.1 What is deliberately not in the basis

| Excluded | Why |
|---|---|
| **The four vision metrics** — affinity, primary clients, financial health, cost-income ratio | They measure the strategy against itself over its whole horizon. **No single initiative moves a cost-income ratio**, so a solution scored against one bands low for a reason that says nothing about the solution |
| **The seven KPIs** — NPS, digital sales, NPL ratio, client losses, employee attrition, employee NPS, operating result | The bank's own method holds that impact on a key result takes precedence over a KPI. They are context a person may weigh at a gate, not a target a score is computed against |
| **Love Brand** | A cross-cutting pillar in the source, carrying no objective and no key results |

**A reader who wants to cite one of these says so in prose and scores nothing against it.**

### 2.2 Nový obslužný model pro firmy · New service model for business clients

> *Business clients strengthen their financial health through the most suitable and effective service
> channel, whether digital, remote or in person.*

| # | Key result | Direction | Type |
|---|---|---|---|
| **NOM-1** | Clients using financial-health advisory solutions | increase | `C` |
| **NOM-2** | Clients served remotely | increase | `C` |
| **NOM-3** | Clients served digitally | increase | `C` |
| **NOM-4** | Clients migrated from the original channel to the new digital channel, measured as adoption of the target channel | increase | `C` |

### 2.3 Super Human Super Digital

> *We proactively guide every client toward improving their financial health.*

| # | Key result | Direction | Type |
|---|---|---|---|
| **SHD-1** | Clients having a regular relevant interaction | increase | `C` |
| **SHD-2** | Clients experiencing advisory every month | increase | `C` |
| **SHD-3** | Activated products or services, and the share of new products | increase | `C` |
| **SHD-4** | AIDA — average time a banker spends daily on administration | **decrease** | `I` |

### 2.4 Level Up

> *Through Level Up, we motivate clients to entrust us with a larger share of their wallets.*

| # | Key result | Direction | Type |
|---|---|---|---|
| **LVL-1** | Clients who raised their level | increase | `C` |
| **LVL-2** | Share of wallet | increase | `C` |
| **LVL-3** | Long-term LTV CM growth from the share-of-wallet rise, with costs held inside the business case | increase | `C` |
| **LVL-4** | Perceived value for money among Level Up clients, measured by NPS methodology | increase | `C` |

### 2.5 Investice · Investments

> *A modern, streamlined digital investment offering designed to close the competitive gap with
> neo-brokers while making investing accessible to younger generations and children.*

| # | Key result | Direction | Type |
|---|---|---|---|
| **INV-1** | Primary clients preparing for the future with us through investing | increase | `C` |
| **INV-2** | Digitally onboarded young clients | increase | `C` |
| **INV-3** | Clients who invest with neo-brokers also investing with us | increase | `C` |

### 2.6 Technologický Leadership · Technology leadership

> *We bring customers cutting-edge solutions in line with the bank's strategic priorities, based on
> reliable and secure IT, using AI, data and cloud technologies.*

| # | Key result | Direction | Type |
|---|---|---|---|
| **TL-1** | Clients affected by outages of key digital channels | **decrease** | `C` |
| **TL-2a** | Lead time to implement a change | **decrease** | `I` |
| **TL-2b** | Work in progress | **decrease** | `I` |
| **TL-3** | Share of the application portfolio that is cloud-ready | increase | `I` |
| **TL-4** | Share of capacity allocated to strategic priorities | increase | `I` |
| **TL-5** | Share of people in product and engineering teams doing software engineering | increase | `I` |

### 2.7 AI First

> *We accelerate the journey to financial prosperity by becoming an AI-ready bank.*

| # | Key result | Direction | Type |
|---|---|---|---|
| **AI-1** | AI use-case points delivered by internal teams across tribes and divisions, as personnel-cost saving or new business | increase | `I` |
| **AI-2** | Share of sales and service processes in primary digital channels that are fully straight-through | increase | `C` |
| **AI-3** | Share of internal teams AI-ready, through structured knowledge made available to knowledge bases with an AI assistant and agentic AI | increase | `I` |
| **AI-4** | Share of employees reaching the AI competency level required for their role | increase | `I` |
| **AI-5** | Share of employees reporting that available AI tools make their work easier and more effective | increase | `I` |

### 2.8 The identifiers, and the split

**The identifiers are assigned here and appear nowhere in the source.** ČS numbers key results only within
an objective, so `KR 1` occurs six times and a scoring reference needs something unique across the basis.
`NOM-` `SHD-` `LVL-` `INV-` `TL-` `AI-` are this document's, and a run citing one is citing this document.

**TL-2 is one key result in the source and two rows here**, because it measures two different things —
lead time and work in progress — and a solution can move one without touching the other. It is the only
place the row count and the source count differ.

**Sixteen rows are customer behaviour and ten are internal capability.** The internal ones are SHD-4,
TL-2a, TL-2b, TL-3, TL-4, TL-5, AI-1, AI-3, AI-4 and AI-5.

**The type is carried so a category difference is not read as a weakness.** A run producing a customer
proposition and a run producing an internal capability change are both legitimate and they align to
different kinds of target. **The type does not change the bands and does not weight the score.** What it
does is let a reader at a gate see that a customer solution scoring `None` against ten internal key results
has not failed at anything.

---

## 3. The product goal, and the rule that governs it

**A product's own measure can never be a company key result or KPI.** This is ČS's rule (§6) and it is the
single most load-bearing sentence in this body.

The hierarchy has three levels:

| Level | Owned by | Example against INV-2 |
|---|---|---|
| **Company key result** | The bank, set once | Digitally onboarded young clients increases |
| **Product goal (North Star)** | The run | Under-30s who open the app with savings can complete a first investment without help |
| **Product-level metric** | The run | Share of under-30 app users who complete a first investment |

**The product goal is the product's North Star, one level and not two.** A brief asks it once, and the field
that carries it is the product goal (Brief Fields §2.2).

**The link between the middle and the top is written out, never assumed.** That written statement is what
the bands in §4 are applied to. Without it there is nothing to band.

**Rules**
- **A run supplies its own product goal and metric.** They are not inherited and not derived from the key
  result by rephrasing it.
- **A metric that is a key result restated is not a metric.** It scores unscored, not zero — see §4.
- **The link is one statement naming the mechanism**, not a restatement of either end.

**Where the product goal comes from in this pilot, and the departure worth naming.** ČS routes an
initiative through its team's Product Compass, which carries the product goal, before the initiative
parent-links to a key result. **The pilot has no Compass**, so the product goal is supplied by the run's
own brief and the link is stated there. A reader who asks where the Compass went should be told this
plainly: the level exists in the bank's method, the pilot does not have one to inherit from, and the brief
carries the level instead.

---

## 4. The bands

**Four bands, and the band is the score.** There is no point value and no denominator: `scoring.yaml`
carries strategic alignment as a standalone score and says in its own first paragraph that it is not a
fraction of anything. **A run reads `Strong · Strong · Moderate · Strong · Weak` across a solution set**,
which is comparable across runs in a way a number out of a moving denominator never was.

| Band | What it takes |
|---|---|
| **Strong** | The product metric leads to the key result in one step, and the step can be stated in a sentence |
| **Moderate** | The product metric reaches the key result through one named thing in between, and both steps hold |
| **Weak** | A path exists and at least one step in it rests on an assumption nobody has evidence for |
| **None** | No path, or the only path is the key result restated back |

**Unscored is not a band.** It fires when the run names no product metric, or names a key result as its own
metric (§3). It is recorded as unscored rather than as **None**, because
**zero means assessed and found to have no path, and unscored means it could not be assessed** — a
distinction the scoring already runs on everywhere else.

### 4.1 Worked, against INV-2

*Digitally onboarded young clients increases.*

| Band | Solution | Product metric | The chain |
|---|---|---|---|
| **Strong** | A guided first-investment flow for under-30s | Under-30 app users completing a first investment | Those completions are digital onboardings of young clients. One step |
| **Moderate** | Simpler identity verification | Verification completion rate | More people finish verification, and finished verifications among young users become onboardings. The thing in between is named |
| **Weak** | A financial education hub | Content engagement | Engaged readers open investment accounts. Nobody has checked that step |
| **None** | A back-office reconciliation fix | Reconciliation error rate | Nothing connects it to this key result |
| **Unscored** | Any of the above, written as "this increases digitally onboarded young clients" | — | The key result copied down. No product metric was named |

### 4.2 How to apply them

1. **Read the run's product goal, its metric, and its written link** from the brief.
2. **Find the key result the link names.** If it names none, or names something not in §2, the
   score is unscored with that reason.
3. **Count the stated steps** from the metric to the key result, and check each one holds.
4. **Band it, and record the band with a written rationale.** Both are mandatory; a band with no rationale
   is not comparable across runs.
5. **Score against one key result.** A solution touching several is banded against the one its link names,
   and the others are named in the rationale rather than scored separately or summed.

**Rules**
- **Never band more than once.** A solution is banded against one key result, not once per key result it touches.
- **Never band on the strength of the solution.** A brilliant solution with a two-step chain is Moderate. The band
  measures the link and nothing else, and the solution's own quality is judged elsewhere in the stage.
- **A chain longer than two steps is Weak at best**, because a third step is where the guess usually is. If
  all three steps genuinely hold, say so in the rationale and band Weak anyway; the band set is the scale.

---

## 5. What each reader takes from this

Four skills declare this body and they use different halves of it. **`ideation` uses it in
prose the producer writes**, not as a sub-score. The material is the same: the metric, the key result, and the steps
between them, which is exactly what §4's bands are cut on.

| Reader | Stage | What it takes | What it must not do |
|---|---|---|---|
| **`brief-creation`** | 1.1 | §2 for the key-result list, and nothing else. `C77`'s membership clause reads it to refuse a brief whose own metric is a key result restated (§3) | Copy a key result into the brief as the run's goal, or treat the list as a menu the person picks from |
| **`ideation`** | 4.1 | §2 for the key results, §4 for the bands. Writes **§7 Strategic alignment** on every idea: at least one pillar this body declares, how the idea serves it, and the chain from the idea's own product metric to a key result, or the reason no key result covers it and which ones were considered | Write a score. Take the pillars from the brief instead of from §2 — the brief carries the run's own goal, and a statement naming a goal the brief invented names nothing |
| **`mvp-expansion`** | 5.2 | §2 for the key results. Names `strategic_touchpoints[]` where the expanded option serves or strains a named key result | Re-score. The assessment happened at 4.1 and this is not a second one |
| **`prd`** | 6.1 | §2 for the objective and key-result names. The `alignment_validation` statement names what it was checked against and cites this body as the `basis` | Pass validation against an empty objective list |

**On `mvp-expansion`'s reduction marker.** Its skill file marks `strategic_touchpoints[]` with
`basis: indicative_unverified_strategy` while this body is absent. **With this body present that marker is
wrong and must be replaced** by a citation to a named key result. A touchpoint naming `TL-1` is a claim; a
touchpoint marked indicative is a sentence.

**On the PRD's second pass.** §8.4 of the parent makes alignment an assessment at stage 4 and a validation
at stage 6, and the validation is confirmatory rather than a re-score. **The validation asks whether the
narrowed MVP still has the chain the solution was banded on.** If the narrowing broke a step, that is the
finding, and it is the last point in the run where it can be corrected.

---

## 6. Sources

| Source | What it supplies | How to cite it |
|---|---|---|
| **ČS strategy document** — `methodology/strategy-anonymized.md`, read 13 August 2026 | The vision, the seven pillars, the six objectives with their statements, the twenty-five key results with their directions, the four vision metrics and the seven KPIs | By objective and key result |
| **ČS, *Defining Product Goals from Company OKRs & KPIs*** — `methodology/product_goals_from_okrs_kpis.md`, read 13 August 2026 | §3 entirely: the three-level hierarchy, the rule that a product metric is never the company measure, and the requirement that the link is written and never assumed | By rule |
| **ČS, *Metodika Iniciativy*** — via the Method Canon §6.1 | That an initiative parent-links to a key result or KPI, and that impact on a key result takes precedence | Through the canon |
| **Method Canon** §9.1, §9.3 | The three kinds of measure, and that an OKR is a format for expressing an outcome rather than a different thing | By section |

**Both ČS files are held outside this repository**, so
**the citations above do not resolve here.** **The `methodology/` folder is not in this repository**; the one file that stayed, the ČS regulatory transcript, is filed with the dossiers at `specifications/regulatory-research/`.

**Nothing in §2 is inferred.** Where the source is ambiguous the row keeps the ambiguity rather than
resolving it: LVL-3 names two conditions in one key result and is carried as one row.

---

<!-- history -->
## 7. Coverage bar

Its readers are `brief-creation`, `ideation`, `mvp-expansion` and `prd`. This body is available when all
four can answer, without reaching outside it:

| Question | Where |
|---|---|
| Which key results a solution may be read against | §2 |
| Which measures are deliberately excluded, and why | §2.1 |
| What an identifier means and where it came from | §2.8 |
| Whether a key result is about a customer or about the bank | §2, the type column |
| What a product goal is, and what it may not be | §3 |
| Where the product goal comes from in this pilot | §3 |
| What the bands are, and what each takes | §4 |
| How to apply them to a run | §4.2 |
| What to do when no key result is named, or the metric is a key result | §4, unscored |
| What this body does *not* decide | §1 rules, §5 |
| Which source any claim rests on | §6 |

**Assessment: met.** Every question resolves to a named section.

**One thing it does not close, and it is no longer arithmetic.** §4's bands are not applied on a run
today: the stage-4 scoring step was removed on 7 September 2026 along with `A8b`, and `scoring.mjs` is a
registered library nothing calls during a run. **`scoring.yaml` still names strategic alignment as a score
and still points at §4 for its bands**, so the model and its bands are intact and the step that applied
them is gone. What reaches a reader instead is `ideation`'s §7, written as prose over the same chain.

**Which means the one thing §4 cannot do is be compared across solutions by anything mechanical.** A band
a producer writes into prose is a band a person reads, and no check recomputes it. That is a smaller
claim than this section used to make and it is the true one.

---

<!-- /history -->
## 8. Open

| # | Question | Effect |
|---|---|---|
| **N6-a** | **Open.** Both source files are held outside this repository, so §6's citations no longer resolve in a checkout of this one. A reader holding only what ships cannot check §2 against its source | The rows in §2 stand; what is gone is the ability to verify them here |
| **N6-b** | **No key result names an owner.** The source carries no accountable person for any of the twenty-five, so a PRD's alignment statement can name the key result and not who signs it off | The validation names what it checked and not who agreed it |
| **N6-c** | **No key result carries a baseline.** Nothing here supports a claim about how far a key result already is from a target, which is a second reason magnitude is out of scope rather than merely unavailable | A solution cannot be argued as more valuable because its key result is further behind |
| **N6-d** | **Whether the type flag should ever affect the band.** It does not today, deliberately. **Recommendation: leave it.** A weighting would encode a preference between customer and internal work that nobody has stated | A reader must read the type themselves to see that a low score is a category difference |
| **N6-e** | **The strategy horizon is unnamed in the anonymised source.** The vision says "by the target strategy horizon" with no year, so this body cannot say over what period a key result is expected to move | A time-horizon question about the basis is returned unanswered |
