---
run_id: 2026-09-digital-onboarding-dropoff
record_id: R-A2b-01
artifact_id: A2b
item_id: ""
produced_at: 2026-09-08
bounds_hit: []
trace_id: []
sources: []
external_sources: []
items_supplied: 3
items_read: [A2-item-1, A2-item-2, A2-item-3]
observations:
  - id: A2-item-1-o1
    ref: A2-item-1
    statement: "Participant 1 left after identity verification because the next steps and remaining time were unclear."
    origin: "Participant 1, digital onboarding drop-off research (STC004_Onboarding, mocked)"
    origin_key: participant-1
    proximity: first_hand
    observed_at: ""
    provenance_complete: false
    quote: "I did not know how many steps were still waiting."
  - id: A2-item-1-o2
    ref: A2-item-1
    statement: "Participant 2 stopped after a failed document scan and did not understand whether progress had been saved."
    origin: "Participant 2, digital onboarding drop-off research (STC004_Onboarding, mocked)"
    origin_key: participant-2
    proximity: first_hand
    observed_at: ""
    provenance_complete: false
    quote: "After the scan failed, I was not sure whether I had to start again."
  - id: A2-item-1-o3
    ref: A2-item-1
    statement: "Participant 3 completed identity creation but believed the current account was already open."
    origin: "Participant 3, digital onboarding drop-off research (STC004_Onboarding, mocked)"
    origin_key: participant-3
    proximity: first_hand
    observed_at: ""
    provenance_complete: false
    quote: "I thought creating the identity meant the account was finished."
  - id: A2-item-1-o4
    ref: A2-item-1
    statement: "Participant 4 switched from mobile to desktop after receiving an error and then restarted the journey."
    origin: "Participant 4, digital onboarding drop-off research (STC004_Onboarding, mocked)"
    origin_key: participant-4
    proximity: first_hand
    observed_at: ""
    provenance_complete: false
  - id: A2-item-1-o5
    ref: A2-item-1
    statement: "Participant 5 completed the process but described the number of confirmations as repetitive."
    origin: "Participant 5, digital onboarding drop-off research (STC004_Onboarding, mocked)"
    origin_key: participant-5
    proximity: first_hand
    observed_at: ""
    provenance_complete: false
  - id: A2-item-2-o1
    ref: A2-item-2
    statement: "Identity verification (22.2% drop-off) and Current account setup (22.9% drop-off) are the only two steps flagged with a high support signal; every other step is Low or Medium."
    origin: "aggregated funnel table, STC004_Onboarding (mocked); no producing team or system is named in the file"
    origin_key: unestablished
    proximity: unestablished
    observed_at: ""
    provenance_complete: false
  - id: A2-item-3-o1
    ref: A2-item-3
    statement: "Two contact-centre calls each involved a customer who had started onboarding on the app, dropped out partway, and could not find a way back into the application they had already started; both then began a new application from scratch, and one of the two began a third."
    origin: "Igor Tadic, shadowing the contact centre, June 2026"
    origin_key: igor-tadic
    proximity: first_hand
    observed_at: "2026-06"
    provenance_complete: true
unresolved:
  - ref: A2-item-1
    question: "no date is recorded for any of the five participant observations; the user confirmed on 2026-09-08 that none is known"
  - ref: A2-item-1
    question: "whether these observations came from a moderated usability test or from self-reported recollection is not stated in the file; the user asked that this be recorded as unresolved rather than assumed"
  - ref: A2-item-1-o1
    question: "the quote attached to this observation is not attributed to a participant anywhere in the source. It is matched here by what it describes — not knowing how many steps remained — not by a stated attribution"
  - ref: A2-item-1-o2
    question: "same as above — matched by content (a failed scan, uncertainty about whether to restart), not by a stated attribution"
  - ref: A2-item-1-o3
    question: "same as above — matched by content (identity creation believed to complete the account), not by a stated attribution"
  - ref: A2-item-2
    question: "no date is recorded for the funnel table; the user confirmed none is known. No producing system or team is named, so its origin cannot be established"
  - ref: A2-item-3
    question: "the observed date is precise to the month (June 2026) and no exact day was given; not asked further since a month-level date already gives the observation complete provenance"
---

# Intake — record

Three supplied items were read in full: `A2-item-1` (`MOCK_RESEARCH.md`), `A2-item-2` (`MOCK_DATA.csv`)
and `A2-item-3` (Igor Tadic's own account, given in conversation). Seven observations were reduced from
them — five from the numbered participants, one aggregated observation from the funnel table, and one
from Igor Tadic's own witnessed account.

The research note at the foot of `MOCK_RESEARCH.md` draws a conclusion across the five observations rather
than reporting one of its own, so it was not reduced into an eighth observation (evidence-standards §2).

Three of the file's quotations are attached to the observations they most plausibly describe. The file
does not attribute any of the three to a participant, and the user asked, on being shown this, that the
match not be presented as sourced — it is recorded here as a content match and carried into
`unresolved[]` on each of the three observations it touches.

A2-item-3 is Igor Tadic's own first-hand account: he sat in on two contact-centre calls in June 2026 and
reports what he heard himself, so its origin is established, its proximity is `first_hand`, and it carries
a date — the only observation in this run to reach complete provenance. It corroborates A2-item-1-o4
(the participant who restarted after a device switch), and is recorded against the same hypothesis.

No observation from `MOCK_RESEARCH.md` or `MOCK_DATA.csv` carries a date, and the user confirmed on
2026-09-08 that none is known. Every observation from those two items therefore has `provenance_complete:
false`. The collection method behind the participant observations — moderated test or self-report — is
also not stated, and the user asked that this stay unresolved rather than be assigned either way; it does
not change the `first_hand` reading, which follows from whose experience is reported rather than from how
it was captured (evidence-standards §4.3).

The funnel table names no producing team or system, so its origin could not be established. Its
observation is kept and labelled `unestablished` rather than assigned a plausible source.
