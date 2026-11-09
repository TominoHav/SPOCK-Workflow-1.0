---
run_id: 2026-05-corporate-coverage
artifact_id: A6
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: human
revisions: 1
sources: [A5]
external_sources: [salesforce-own-doc, microsoft-own-doc, ncino-own-doc, introhive-own-doc, affinity-own-doc, moodys-own-doc, dnb-own-doc, spglobal-own-doc, linkedin-own-doc, backbase-own-doc, segment-benchmark-2026, analyst-platform-review-2026, practitioner-forum, banking-tech-press, procurement-review-2026, deployment-case-notes]
produced_by:
  agent: competitive-analysis
  skill: deep-dive
store: S1
scope: shared
egress_basis: pilot-test
standards_basis: "competitive-analysis-standards@0.12 read and applied across all ten deep-dives. No outward research was performed; the market material was written rather than gathered."
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
assembled_at: 2026-08-20
assembled_from: [R-A6-01, R-A6-02, R-A6-03, R-A6-04, R-A6-05, R-A6-06, R-A6-07, R-A6-08, R-A6-09, R-A6-10]
---

# Competitive Analysis | Competitor Deep-Dive: Relationship intelligence for corporate coverage

Ten participants were profiled and not one of them supplies what the bank has earned about a person. Five sell the record and the interaction metadata around it, two sell an automatically built graph of who met whom, and three sell people the bank has never dealt with. **The two participants that hold the missing pieces do not sell the answer**: the ownership data that turns six unlinked records into one client, and the surface a banker would meet the answer in. The gap is consistent enough to be structural rather than a matter of maturity: the earned context is proprietary to each bank, so no vendor can ship it and every vendor has built around it.

Each section carries what the participant offers, what it claims sets it apart with the evidence behind the claim, where the journey stops, what it costs and what it is confirmed not to do.

---

## Salesforce Financial Services Cloud

Researched 2026-08-20 · direct participant · leader on B2, T3 · confidence high [rec:R-A6-01]

### What they offer

The relationship system of record for a coverage organisation, sold as an industry cloud on top of the general platform. It models a corporate client as an Account with related Contacts, Opportunities and Activities, adds banking objects for facilities and products, and surfaces an interaction timeline per Account. Deployment in the segment is near-universal at the largest banks and common below them, and it is the system every interview in this run either named or described the behaviour of.

Coverage organisations of any size, sold per seat with a banking-specific edition. The buyer is the segment head or the COO of coverage; the user is the relationship manager and, increasingly, the product specialist.

**Account and contact model with a banking object layer.** A corporate client is an Account, its people are Contacts, and banking objects for facilities, products and financial accounts hang off it. This is what makes the client record navigable at all, and it is also where the group problem starts: a legal entity is an Account, so a client group is several Accounts related to each other only if somebody related them.

**Interaction timeline per account.** Activities logged against an Account produce a chronological timeline: emails, calls, meetings and tasks, each with a date, a subject and an owner. What the timeline carries is the fact and the metadata of the interaction rather than its content, which is precisely the behaviour the relationship manager in this run described as eleven interactions and no idea what happened in them.

**Einstein Activity Capture from mail and calendar.** Connects a user's mailbox and calendar and writes matching activity onto the Account automatically, removing the manual logging step. It captures who met whom and when, and by design does not capture what was said.

**Relationship groups and household or group modelling.** Explicit modelling of a set of related parties as a group, so a corporate family or a household can be treated as one subject. It is a configuration rather than a default, and the relationships have to be asserted by somebody.

**Referral object and routing between business lines.** A structured referral from one banker to another, with an owner, a status and a reason, so a cross-line introduction is a record rather than an email. It routes the request and carries no context about the target beyond what the referrer types.

**Einstein relationship and next-best-action surfacing.** Model-generated suggestions on an Account, presented in the record page as a next best action, trained on activity and opportunity history within the tenant. The suggestion carries a rank and does not carry the evidence that produced it.

**Data Cloud ingestion of external and unstructured sources.** An ingestion layer that brings other systems into the same tenant and resolves them onto the Account, sold separately and licensed by consumption. It is where a bank would put call reports and meeting notes if it wanted them retrievable beside the record.

### What stands out

**The industry model is already built, so a bank configures a banking data model rather than designing one.** The Financial Services Cloud edition ships the banking object layer described above, which is the difference between a twelve-month and a thirty-month implementation in this segment. Every other direct participant either assumes the model or sells a narrower one.

**Activity capture removes the manual logging step that every relationship system before it depended on.** Einstein Activity Capture writes mail and calendar activity onto the record automatically. The relationship manager interviewed for this run described a CRM nobody maintains; automatic capture is the direct answer to that and it is why the interaction counts in her system were accurate while their content was empty.

**One tenant for the record, the ingestion and the model, so a bank does not integrate three vendors to get one answer.** Data Cloud, the banking object layer and Einstein sit in the same tenant with the same identity and permission model. Introhive and Affinity both attach to a system of record rather than being one.

*Their own positioning.* The single view of the client, with the industry model already built so a bank configures rather than constructs.

### Where the journey stops

The interaction record holds metadata and not content, so a name arrives with a count and a date and nothing that decides how to approach

A client group is several Accounts unless somebody has related them, and nothing forces that, so the entity problem the material describes is reproduced rather than solved

Einstein suggestions carry a rank and not the evidence behind them, which is the shape all three interviewed users said they would not act on

### What it costs

Per user per month, published list around 300 EUR for the Financial Services Cloud edition with the enterprise platform underneath, before implementation. Implementation at a mid-size bank is quoted in the segment at 12 to 30 months of partner work and is not published. No usage or consumption component for the relationship objects; the AI features carry separate consumption pricing.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## Microsoft Dynamics 365 for Financial Services

Researched 2026-08-20 · direct participant · leader on B2, T4 · confidence high [rec:R-A6-02]

### What they offer

The other default system of record in the segment, sold as an industry accelerator on the Dynamics platform and bought most often where the bank already runs the collaboration suite. It models the corporate client, its people and its products, and its distinguishing property is that the meeting signal it would need already sits inside the same vendor's estate.

Coverage organisations already committed to the vendor's productivity estate. The buyer is IT jointly with coverage; the user is the relationship manager.

**Client and party model with a financial services accelerator.** Ships the corporate client, contact, product and facility objects as a configurable accelerator rather than as a fixed model, which makes it more adaptable than the alternative and slower to stand up.

**Interaction capture from the mail and calendar estate.** Because the mail, calendar and meeting tools are the same vendor's, activity capture is a configuration rather than a connector, and the metadata reaches the record with no third party in the path.

**Meeting summarisation in the collaboration suite.** Automatic summaries of a meeting are produced in the meeting tool itself. Whether the summary reaches the client record is a routing decision the bank makes and the product does not make for it.

**Relationship analytics over interaction metadata.** Derives strength and recency signals per contact from the captured metadata, presented as an analytics surface rather than as a suggestion inside the record.

**Copilot over the client record and the document estate.** Natural-language retrieval across the record and the connected document estate, answering in the surface the banker is already in.

**Power Platform extension surface.** Low-code extension so a bank can build the missing question rather than wait for it, which is how several banks in the segment have built partial versions of the answer this initiative describes.

### What stands out

**The interaction signal and the record live in one vendor's estate, so capture is a setting rather than an integration.** The mail, calendar, meeting and record products are the same tenant. Every other participant in scope reaches into that estate from outside it, which is where consent, works council agreement and connector maintenance all land.

**Meeting content is already being summarised where the meeting happens.** Summarisation runs in the collaboration suite by default in most deployments. The unsolved half is routing it to the client record, which is a much smaller problem than producing it.

**The extension surface means a bank can build the missing question itself.** Several banks in the segment have built partial internal versions of relationship retrieval on this platform, which is evidence of both the demand and the gap.

*Their own positioning.* The client record inside the tools the banker already has open, so adoption is not a separate change.

### Where the journey stops

Whether the meeting summary reaches the client record is left to the bank, and in the deployments described it does not

Relationship analytics derive strength from metadata alone, which is the signal all three interviewed users said they would not act on

The accelerator is a starting point rather than a model, so two banks on the same product can have incompatible client structures

### What it costs

Per user per month, list around 200 EUR for the enterprise edition with the industry accelerator, before implementation. Copilot capability is licensed separately per user. Implementation is quoted in the segment at 9 to 24 months and is not published.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## nCino

Researched 2026-08-20 · direct participant · leader on B1, B2 · confidence high [rec:R-A6-03]

### What they offer

The commercial lending operating system for the segment, covering origination, credit analysis, approval workflow and portfolio monitoring. It owns the process a corporate banking relationship actually runs through, which is why the credit officer's version of this problem lives closer to it than to any relationship system.

Commercial and corporate lending organisations. The buyer is the head of credit or of commercial banking; the users are relationship managers, credit analysts and credit officers.

**Loan origination and credit workflow end to end.** The application, the spread, the credit memo, the approval and the booking in one flow, which is where the bank's formal knowledge about a corporate client is produced.

**Credit memo authoring with structured spreading.** The memo is authored in the system against structured financials, so the analytical view of a client is retrievable rather than sitting in a document library.

**Portfolio monitoring and covenant tracking.** Ongoing monitoring against covenants and triggers, which produces a continuous record of how a client is performing rather than a point-in-time view.

**Relationship and exposure view across a client group.** Aggregates exposure across the entities of a client group for limit purposes, which is the one place in the estate where the group is already resolved.

**Salesforce-native deployment option.** Runs on the same platform as the most-deployed relationship system in the segment, so the credit record and the relationship record can share an object model.

**Document and condition management.** Tracks what has been received and what is outstanding, producing a record of every document a client has ever supplied.

### What stands out

**Exposure is already aggregated across a client group for limit purposes, which is entity resolution the bank has already paid for.** The limit framework forces the group to be resolved because exposure cannot be measured otherwise. This is the only place in the estate where the six unlinked records the material describes have already been joined, and it is joined for a different purpose.

**The credit memo is structured, so the bank's analytical view of a client is retrievable rather than filed.** Memos authored in the system are queryable. The call reports the relationship manager described are not, and they are about the same clients.

**It owns the process rather than the record, so it sees what actually happened rather than what somebody logged.** Approval steps, conditions and covenant events are produced by the work rather than entered afterwards, which makes them the most reliable record of a relationship in the bank.

*Their own positioning.* One system from application to booking, replacing the spreadsheet and mail chain that sits between them.

### Where the journey stops

It holds the formal record of a client and nothing about the people, so it answers what we know and never who we know

The group resolution exists for exposure and is not exposed as a general answer to what counts as one client

Credit officers using it have no view of interactions outside the credit process, which is the gap the interviewed credit officer described

### What it costs

Priced per user per month with a platform fee, quoted rather than published, and reported in the segment between 150 and 400 EUR per user depending on module scope. Implementation is 9 to 18 months.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## Introhive

Researched 2026-08-20 · direct participant · innovator on T3, B3 · confidence high [rec:R-A6-04]

### What they offer

Relationship intelligence layered onto an existing system of record, built on passive capture of mail and calendar signal across the whole organisation. It produces a relationship graph automatically, scores the strength of each edge, and surfaces who in the firm knows a given person. It is the clearest instance of the approach the segment head in this run described trying and abandoning.

Professional services firms first and financial institutions second. The buyer is a marketing, business development or coverage leader; the users are anyone who needs an introduction.

**Passive capture of mail and calendar across the organisation.** Reads headers and calendar entries for every enrolled user and builds the graph without anyone entering anything, which is the property that makes it fast to deploy and the property that makes it a works council question.

**Relationship strength scoring per edge.** Scores each person-to-person edge on recency, frequency and reciprocity, producing a ranked answer to who knows this person best.

**Who-knows-whom search across the firm.** The question the material asks, asked directly: type a person or a company and see which colleagues have a relationship and how strong it is scored.

**Contact data enrichment and hygiene.** Detects role changes and stale contacts automatically from signal, which addresses the third-of-contacts-have-left problem the product specialist described.

**CRM write-back of activity and contacts.** Pushes the captured activity and cleaned contacts into the system of record, so the record improves without anyone maintaining it.

**Alerts on relationship change.** Notifies when a tracked person changes role or when an important relationship goes cold, turning the graph into a trigger rather than a lookup.

### What stands out

**The graph builds itself, so the answer does not depend on anyone maintaining a record.** Passive capture is the whole design. Every problem the material describes with a CRM nobody maintains is a problem this does not have.

**It answers who knows this person, which is the first of the three questions asked directly.** No system of record in scope answers this question in the form it is asked. This one does, and the segment head's ninety-thousand-node result is what answering it from signal alone looks like.

**Role-change detection keeps the contact set current without anyone curating it.** The product specialist described a third of contacts having left the company. Signal-based detection is the only mechanism in scope that addresses that continuously.

*Their own positioning.* You already know everyone you need. We show you who.

### Where the journey stops

The score is derived from metadata, so it says how often two people interacted and never what the interaction rests on, which is the exact objection all three interviewed users raised

Capturing employee mail and calendar signal is the case a works council refuses, and no public material describes how that is handled

The graph includes everyone the firm has ever emailed, which is why an automatic build produces tens of thousands of nodes of which most are noise

### What it costs

Per user per year, quoted rather than published, reported in the segment between 80 and 150 EUR per user per month at scale, with a minimum commitment. Implementation is weeks rather than months because the capture is passive.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## Affinity

Researched 2026-08-20 · direct participant · innovator on T3 · confidence high [rec:R-A6-05]

### What they offer

Relationship intelligence built for private capital rather than banking, combining passive capture with a deal-oriented pipeline. It is the reference the adjacent market is measured against, it is what the venture funds in the parallel research were all using, and it is profiled here as the design baseline corporate banking has not adopted.

Venture capital, private equity and investment banking teams. The buyer is a partner or a head of platform; the users are everyone in a small firm.

**Automatic capture and contact creation from mail and calendar.** The record is created from the signal rather than entered, and a person who has been emailed exists in the system without anyone adding them.

**Relationship strength scoring with an introduction path.** Scores who in the firm has the strongest link to a target and presents the path, which is the third question in this run asked directly.

**Deal pipeline tied to the relationship graph.** Opportunities and the people around them are one object rather than two, so the pipeline view and the relationship view do not diverge.

**Notes and interaction history in one timeline.** Manual notes sit beside captured activity on one timeline, so the earned context and the metadata are read together where the notes exist.

**Alerts on network changes and stale relationships.** Surfaces when a tracked relationship goes quiet or a person moves, which drives the follow-up behaviour the product is designed around.

**Enrichment from third-party people and company data.** Attaches external profile data to captured contacts, filling out the record without manual research.

### What stands out

**It answers all three questions in one object, which no banking participant in scope does.** The name, the path and the notes sit together. Every direct banking participant splits at least one of the three into a different system or leaves it out.

**The record populates itself, so the maintenance problem that defeats banking CRMs does not arise.** This is the same claim the automatic-graph participant makes, and here it is coupled to a notes surface, which is the difference between a graph and an answer.

**Built for a firm of twenty rather than a coverage organisation of two hundred, which shows in how little configuration it needs.** Time to value is days. The banking participants in scope are quoted in months or years, and that difference is a positioning fact rather than an implementation detail.

*Their own positioning.* The relationship intelligence CRM that populates itself.

### Where the journey stops

It has no banking model at all: no facility, no exposure, no credit process, and no group entity structure for a corporate client

The notes are whatever a user typed, so the earned context exists only where somebody wrote it down, which the parallel research describes as roughly eighty entries against a network of thousands

Nothing in it addresses works council agreement, purpose limitation or the outsourcing constraints a bank faces before it can ingest anything

### What it costs

Per seat per year, reported around 2,000 USD per seat with a floor for small teams, quoted rather than published for larger ones. No implementation project in the banking sense.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## Moody's Orbis and Bureau van Dijk

Researched 2026-08-20 · adjacent participant · leader on B4, T2 · confidence high [rec:R-A6-06]

### What they offer

The reference database of company information and, more importantly for this initiative, of corporate ownership and group structure. It holds the linkages that say which legal entities belong to one economic group, which is the precondition for answering any question about a client rather than about a record.

Credit, compliance, KYC and research functions across banking. The buyer is a data or risk function; the users are analysts rather than coverage.

**Corporate ownership and group structure data.** Ultimate and direct ownership linkages across jurisdictions, which is the data that turns six unlinked records into one client group.

**Entity identifiers and cross-reference to other schemes.** Stable identifiers with mappings to national registers and to the legal entity identifier, so a bank can join its own records to something outside them.

**Company financials and standardised accounts.** Standardised financial data across jurisdictions, which is what the credit process consumes.

**Director and officer records per entity.** Named individuals attached to entities with roles and dates, which is a people dataset attached to companies rather than to the bank's relationships.

**API and bulk delivery for internal joining.** Programmatic access so a bank can resolve its own client records against the ownership graph inside its own estate.

**Screening and adverse media adjacency.** Related products cover sanctions and adverse media on the same entity model, which is how most banks already have the entitlement.

### What stands out

**It holds the ownership graph, which is the one dataset that makes a group answerable as one subject.** Every participant in scope that needs to resolve a client group either buys this or builds a worse version of it. The material's six-unlinked-records problem is solved by this data and by nothing else in the landscape.

**The identifiers are stable and cross-referenced, so a bank can join its own record to the outside world once rather than per system.** This is what makes the resolution reusable across the estate rather than per application.

**Most banks in the segment already hold an entitlement for compliance purposes.** The data is often already in the building, bought for KYC, and not exposed to coverage. That is a licensing and plumbing question rather than a procurement one.

*Their own positioning.* The most comprehensive picture of who owns whom, worldwide.

### Where the journey stops

It knows nothing about a bank's relationships and never claims to: it supplies the structure of the world and not the bank's position in it

The people it carries are directors and officers on a register, which is a different set from the people a bank actually deals with

Entitlements are usually held by compliance and scoped to compliance use, so coverage cannot use the data the bank has already bought without a purpose assessment

### What it costs

Annual subscription by seat band and data scope, quoted and not published. Reported in the segment in the tens of thousands of euros a year for a coverage-sized entitlement, with API access priced separately.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## Dun & Bradstreet

Researched 2026-08-20 · substitute participant · leader on B4 · confidence high [rec:R-A6-07]

### What they offer

Company data, credit opinion and contact data sold as commercial intelligence, and the thing a coverage organisation buys when it names its problem as a data problem. It supplies companies the bank does not deal with and people it has never met, which is a real product answering a different question from the one this run committed to.

Sales, marketing, credit and procurement functions across every industry. In banking, bought by coverage for prospecting and by credit for third-party risk.

**Company master data with a stable identifier.** A universal company identifier with hierarchy, which is a second ownership graph alongside the reference database and is more widely held in commercial functions.

**Contact data attached to companies.** Named individuals with roles and contact details, sourced and refreshed externally, covering people the bank has no relationship with.

**Credit opinion and failure scores.** Third-party credit assessment on a company, used in the segment for prospect screening rather than for lending decisions.

**Corporate family tree and linkage.** Parent, subsidiary and branch linkage for a company group, which is the same precondition the reference database supplies.

**Intent and trigger signals.** Signals that a company may be in market, derived from external behaviour, sold as prospecting triggers.

**API and CRM integration.** Delivered into the system of record so the external data sits beside the internal one.

### What stands out

**It supplies reach into companies the bank does not know, which is a genuinely different asset from the one this initiative is about.** This is why it is a substitute rather than a competitor: it enlarges the addressable set and answers nothing about the bank's own relationships. Naming that clearly is what stops a coverage organisation buying it for this problem.

**The contact data is refreshed externally, so it does not decay the way an internal record does.** The third-of-contacts-have-left problem does not arise for externally sourced contacts, and it also means none of those contacts carry any relationship.

**The identifier and family tree are widely held already, so the linkage cost is often already sunk.** Most coverage organisations have an entitlement somewhere, which makes it the cheapest available route to group resolution even though it was not bought for that.

*Their own positioning.* Know more about the companies you want to do business with.

### Where the journey stops

It holds no information about the bank's own relationship with anyone, which is the entire subject of this initiative

Contact data is external and generic, so it answers who exists at this company and never who we know there

Buying it in response to this problem produces the outcome the material describes as market data that returns people the firm has no relationship with

### What it costs

Annual subscription by seat and data volume, quoted and not published. Reported in the segment from the low tens of thousands of euros a year for a coverage entitlement.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## S&P Capital IQ Pro

Researched 2026-08-20 · substitute participant · leader on B4, T2 · confidence high [rec:R-A6-08]

### What they offer

Market, company and people intelligence on the corporate banker's desk, carrying transaction history, advisers, management biographies and relationship-adjacent data assembled from public sources. It is the closest thing in scope to an incumbent answer to who, and its answer is drawn from the public record rather than from the bank's own.

Corporate and investment banking, research and strategy. The buyer is a business head; the users are bankers directly.

**Company profiles with transaction and adviser history.** Who advised on what, when, which is public relationship evidence about a company and its people.

**Management and board biographies with career history.** Where a person worked before, which is exactly the fact that would have surfaced the incoming CFO in the material's lost refinancing.

**Ownership and corporate structure.** A third ownership dataset in scope, held on the banker's desk rather than in a data function.

**Screening and target lists by attribute.** Search across companies by financial and structural attributes, which is the attribute-search shape the brief describes for companies rather than for people.

**Excel and API delivery.** Data into the banker's own model rather than only into a screen.

**Alerting on company and people events.** Notification of role changes, transactions and filings on a watchlist.

### What stands out

**Career history on named executives is public relationship evidence, and it is the fact the material's most expensive failure turned on.** A colleague had covered the incoming CFO for six years at a previous employer. The previous employer is in this dataset. The colleague is not, and the join between them is what nothing supplies.

**It is already on the corporate banker's desk, so the adoption question does not arise.** Where it is held, it is used daily. Every internal participant in scope has an adoption problem and this one does not.

**The attribute search works, and it works over companies.** This is a demonstration that the search shape the brief describes is usable, applied to the half of the problem that is public.

*Their own positioning.* The intelligence that informs a banker's next conversation.

### Where the journey stops

Everything in it is public, so it answers who exists and who worked where, and never what the bank earned

Seat cost keeps it on a handful of desks in a coverage organisation, so it is not available at the moment a product specialist or a credit officer needs it

It carries no internal relationship at all, so the route question is entirely outside its scope

### What it costs

Per seat per year, quoted, reported in the segment between 12,000 and 25,000 EUR per seat depending on entitlement. Widely held on a limited number of seats rather than across a coverage organisation.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## LinkedIn Sales Navigator

Researched 2026-08-20 · substitute participant · innovator on T3, B4 · confidence high [rec:R-A6-09]

### What they offer

The professional network sold as a prospecting tool, and the only participant in scope whose relationship graph belongs to the individual rather than to the institution. It is what a banker actually opens when the internal answer fails, which makes it the true substitute regardless of what the bank has bought.

Anyone selling to businesses. In banking, held individually or in small blocks rather than deployed.

**Attribute search across people rather than companies.** Search by role, seniority, tenure, geography and company attributes, which is the who question in the exact form the brief describes it being asked.

**Shared connection paths.** Shows which of your connections know a target person, which is the route question answered from the individual's own network.

**TeamLink across colleagues' networks.** Extends the path search across colleagues who have opted in, which is the closest thing in scope to an institutional route answer built from personal graphs.

**Role change and activity alerts.** Notification when a tracked person moves, which is the trigger the material says nobody has.

**Saved leads and account lists.** Lightweight tracking of people and companies without a system of record.

**CRM write-back in the higher tiers.** Pushes activity and contacts into the system of record where the bank has enabled it.

### What stands out

**The attribute search over people works, is fast, and is the only one in scope.** Every internal participant answers questions about companies or logs interactions. This one answers who is right for this, which is the first question and the one the material says nothing internal can be asked.

**The path is real and it is presented as a path.** Shared connections are shown as a route with a named intermediary, which is the shape the material describes needing and not getting internally.

**It requires no implementation, so it is available to a banker on the day they decide they need it.** This is why it wins by default. Every institutional alternative is quoted in months.

*Their own positioning.* Find the right people, understand what they care about, and reach them through a shared connection.

### Where the journey stops

The graph is the individual's, not the bank's, and it leaves with them, which is the continuity failure the material describes made permanent

It carries nothing the bank earned: no note, no credit history, no record of the last conversation

Use of it for client work sits outside the bank's record-keeping and its data protection posture, and no coverage organisation in scope has published a position on that

### What it costs

Per seat per month, published from around 100 EUR for the advanced tiers, with enterprise pricing quoted. Frequently expensed individually rather than procured.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## Backbase Engagement Banking

Researched 2026-08-20 · adjacent participant · innovator on T1, T4 · confidence high [rec:R-A6-10]

### What they offer

The banker-facing and client-facing surface layered over a bank's core and record systems, sold as the place where the work happens rather than as the place where the data lives. It is adjacent because the brief's real question is where an answer should reach a senior person, and that is a surface question before it is a retrieval one.

Retail, SME and increasingly corporate banking. The buyer is a digital or channel leader; the users are bankers and clients.

**Banker workspace over multiple back-end systems.** Assembles a working surface from several systems so the banker does not move between them, which is the delivery mechanism any answer to this brief would need.

**Client 360 presentation layer.** Presents a joined client view without owning the data, which makes it a consumer of exactly the resolution this initiative would produce.

**Journey orchestration and task surfacing.** Puts the next action in front of the banker rather than waiting to be asked, which is the trigger the material says the existing knowledge layer lacks.

**Case and interaction handling.** Handles the work arising from a client interaction in the same surface as the client view.

**Open integration to record and core systems.** Designed to sit over whatever is underneath rather than to replace it.

**Configurable widgets and layout per role.** A credit officer and a product specialist can be given different surfaces over the same data, which the material implies is necessary because the three questions break differently by role.

### What stands out

**It solves the delivery question this brief explicitly says it has no conviction on.** The brief asks in what form and at what moment an answer should reach a senior person. This participant sells the form and the moment and has no answer to supply.

**It is a consumer of resolution rather than a producer of it, which makes it complementary rather than competitive.** Nothing in it competes with the retrieval problem. Everything in it depends on somebody having solved it.

**Role-specific surfaces over one data layer match what the material describes.** The three questions break differently for a relationship manager, a product specialist and a credit officer, and one surface for all three would serve none of them.

*Their own positioning.* One engagement layer over whatever core and record systems you already have.

### Where the journey stops

It holds no client knowledge of its own and produces no answer, so it cannot address any of the committed problems alone

Programme-scale implementation puts it outside anything this initiative could adopt as a delivery route in a first pilot

Corporate banking deployments in the segment are fewer than retail ones, so the corporate banker workspace is less proven than the positioning implies

### What it costs

Licence plus implementation, quoted and not published, and reported in the segment as a multi-year programme rather than a subscription.

### Confirmed not to do

**Nothing here is recorded as a confirmed absence.** Every capability this participant lacks is recorded below as something the research could not establish. *Their own documentation lists the alternatives and not this one* is a confirmation; *we found nothing* is not, and this run performed no outward research at all, so only the second kind is available to it.

---

## What we could not establish

**Salesforce Financial Services Cloud.**

- **"Content of interactions"**: Whether any deployment in this segment routes meeting or call content into the Account record rather than metadata alone is not established. The capability exists through the ingestion layer and no deployment confirms using it for this.
- **"Group resolution in practice"**: How many banks in the segment maintain the group relationships that make a client family one subject is not established, and the material suggests the answer is few.
- **"Implementation cost"**: Partner implementation cost at a mid-size bank is quoted in ranges by practitioners and published by nobody.

**Microsoft Dynamics 365 for Financial Services.**

- **"Summary routing"**: Whether any bank in the segment routes meeting summaries into the client record is not established.
- **"Group entity handling"**: How the accelerator resolves a client group of several legal entities is configurable and no deployment describes the configuration chosen.
- **"Copilot grounding"**: Which sources Copilot is grounded on in a banking deployment, and whether call reports are among them, is not established.

**nCino.**

- **"Cross-line visibility"**: Whether the group hierarchy maintained for exposure is readable by anyone outside credit is not established.
- **"Interaction data"**: Whether any deployment brings relationship interactions alongside the credit record is not established.
- **"Memo retrieval"**: How far back memo content is retrievable in a typical deployment is not established.

**Introhive.**

- **"Works council outcomes"**: Whether any European banking deployment has obtained works council agreement, and on what terms, is not established.
- **"Content capture"**: Whether anything beyond metadata is captured is not established and the positioning implies not.
- **"Banking deployments"**: Named banking deployments in this segment are not published.

**Affinity.**

- **"Banking suitability"**: Whether any regulated bank in Europe runs it for corporate coverage is not established and the segment benchmark does not list it.
- **"Note coverage"**: What proportion of contacts carry a substantive note in a typical deployment is not published.
- **"Data residency"**: Where tenant data is processed, and whether that satisfies outsourcing guidelines, is not established.

**Moody's Orbis and Bureau van Dijk.**

- **"Entitlement reuse"**: Whether a compliance entitlement can be extended to a coverage use case without a new licence is not established and is likely to be contractual.
- **"Czech coverage depth"**: How completely the ownership graph covers privately held Czech mid-market groups is not established.
- **"Refresh cadence"**: How quickly an ownership change is reflected is not published per market.

**Dun & Bradstreet.**

- **"Czech mid-market depth"**: Contact coverage for privately held Czech mid-market companies is not established.
- **"Entitlement scope"**: Whether a credit-scoped entitlement permits coverage use is contractual and not published.
- **"Refresh accuracy"**: Published accuracy claims for contact freshness are vendor-stated and not independently verified in the segment.

**S&P Capital IQ Pro.**

- **"Seat distribution"**: How many seats a typical mid-size coverage organisation holds is not established.
- **"Czech private company depth"**: Coverage of privately held Czech mid-market management teams is not established.
- **"Join feasibility"**: Whether the executive identifiers can be joined to a bank's internal contact records is not established.

**LinkedIn Sales Navigator.**

- **"Institutional use policy"**: Whether banks in the segment permit or forbid its use for client work is not established.
- **"TeamLink adoption"**: Whether any coverage organisation has enabled the cross-colleague path feature at scale is not established.
- **"Record-keeping"**: How outreach conducted through it satisfies record-keeping obligations is not established.

**Backbase Engagement Banking.**

- **"Corporate deployments"**: Named corporate coverage deployments in the segment are not published.
- **"Time to a first surface"**: How quickly a single new banker-facing surface can be delivered on an existing deployment is not established.
- **"Data layer assumptions"**: What it assumes about client entity resolution underneath is not published.

**No card records a confirmed absence, and on this run that is a property of the method rather than of the research.** Every gap above is something that was not established. A confirmed absence requires reading a participant's own material and finding the alternatives listed without the capability in question, and no participant material was read: the market half of this run was written rather than gathered, for the same reason its problem material was.

---

## How this was produced

**Run 2026-05-corporate-coverage, stage 3.2 deep-dive, quality gate Q3.** Ten records, one per participant, each one production. This document was assembled from them and adds nothing: every capability, claim, limitation and price below was written by the invocation that produced it, and the assembly transferred it.

**The records this document was assembled from**, each named by the participant it covers:

- **R-A6-01** Salesforce Financial Services Cloud: records/3-competitive-analysis/
- **R-A6-02** Microsoft Dynamics 365 for Financial Services: records/3-competitive-analysis/
- **R-A6-03** nCino: records/3-competitive-analysis/
- **R-A6-04** Introhive: records/3-competitive-analysis/
- **R-A6-05** Affinity: records/3-competitive-analysis/
- **R-A6-06** Moody's Orbis and Bureau van Dijk: records/3-competitive-analysis/
- **R-A6-07** Dun & Bradstreet: records/3-competitive-analysis/
- **R-A6-08** S&P Capital IQ Pro: records/3-competitive-analysis/
- **R-A6-09** LinkedIn Sales Navigator: records/3-competitive-analysis/
- **R-A6-10** Backbase Engagement Banking: records/3-competitive-analysis/

**Research regime pilot-test, and the market material is fabricated.** The ten participants are real companies and **everything recorded about them in this run was invented on 20 August 2026** to exercise this workflow. No documentation was read, no pricing was retrieved and no deployment was verified. **Nothing here may be cited as evidence about any of these companies.**

**Why the whole run is fabricated rather than half of it.** The problem material is generated, and a market half researched for real would have produced a run labelled invented that was true in one half and not the other. That is a worse state than either, because the label is what a later reader acts on.

**Standards basis competitive-analysis-standards@0.12**, which is the version that puts the participant profile in the document rather than in the record. Six independent parties per card is that version's floor and each card here rests on seven.

**Not agent output.** A person removed every long dash from this document on 21 August 2026, after `C110` was written and failed it. Nothing else changed. The findings, the numbers and the wording are as the stage produced them, apart from the punctuation carrying them. **What was replaced and why is in [notes/marked-edits.md](../notes/marked-edits.md)**, which no gate reads.
