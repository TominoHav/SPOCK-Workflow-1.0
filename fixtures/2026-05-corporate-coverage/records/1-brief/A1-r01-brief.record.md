---
run_id: 2026-05-corporate-coverage
record_id: R-A1-01
artifact_id: A1
item_id: ""
produced_at: 2026-08-20
produced_by:
  agent: product-owner
  skill: brief-creation
bounds_hit: []
created_at: 2026-08-20
title: "Relationship intelligence for corporate coverage"
product_owner: "Igor Tadic"
topic: "Making what the bank already knows about a corporate client retrievable at the moment somebody needs a specific person"
outcome: "Anyone in corporate coverage can ask who do we know for this, get an answer drawn from everything the bank has ever recorded rather than from what one colleague remembers, see what the bank already knows about that person, and see which of our people is the real route in."
outcome_restatement: "as supplied"
success_signal: "A product specialist stops asking a relationship manager who we know, and starts asking whether to approach."
customer_segment: "Relationship managers and their team leads in corporate and commercial coverage, each carrying 25 to 60 named clients. Then the senior people who need the same relationships and own none of them: product specialists in trade finance, cash management, FX and leasing, who cannot reach a client except through the relationship manager; credit officers deciding on names they have never met; and segment heads accountable for cross-sell and for what happens when a relationship manager leaves."
market_scope: "Corporate and commercial banking coverage. Czech Republic first, with European peer banks in scope for comparison because the problem and the tooling are not country-specific."
background: "A structured knowledge layer over the corporate book already exists and already works: a quarterly portfolio review that took a team a week took an afternoon, and a search for supplier concentration returned eleven names a sector head had not connected. It is not a pain point anyone can name, it has no trigger, and people in front of an open interface with access to everything do not know what to ask."
related_runs: []
goals:
  - product_goal: "A banker assembling what the bank knows about a client or a person does it by asking once, rather than by searching several systems and asking colleagues."
    metric: "Median time from a who-do-we-know question being asked to an actionable answer, and the share of those questions answered without a colleague being interrupted."
    key_result: "SHD-4"
    link: "SHD-4 measures the average time a banker spends daily on administration and moves down. The bankers interviewed put half a day per client into assembling context that the institution already holds, and stop after twenty minutes when the day is busy. Removing the assembly step removes administration time directly, with no intermediate step between the product measure and the key result."
  - product_goal: "A product specialist can reach a client in a covered portfolio with the bank's own context already assembled, rather than spending a relationship manager's attention to find out whether it is worth spending."
    metric: "Share of covered names actively worked by a product specialist in a year, against the share of names in scope for that product."
    key_result: "LVL-2"
    link: "LVL-2 is share of wallet and moves up. A specialist works sixty of three hundred in-scope names a year, and the two hundred and forty untouched ones are not rejected, they are unreached. The mechanism is one step: reduce the preparation cost of an approach, more in-scope names get approached, more products land on existing clients."
known_constraints:
  - "The earned context only exists after ingesting the bank's own history, so nothing works on a book whose sources are not connected."
  - "A relationship manager owns the client relationship and a product specialist cannot approach a client without them. Any answer that still requires the relationship manager's time to produce has reproduced the constraint rather than removed it."
  - "Corporate clients exist as several unlinked entity records across the bank's systems, so any answer has to resolve a group before it can answer a question about it."
unknowns:
  - field: time_horizon
    reason: not_yet_available
    note: "Not decided at brief time."
---

# Record R-A1-01 — A1

One brief-creation invocation. Not written for a reader; the document assembled from it is 1-brief/initiative-brief.md.
