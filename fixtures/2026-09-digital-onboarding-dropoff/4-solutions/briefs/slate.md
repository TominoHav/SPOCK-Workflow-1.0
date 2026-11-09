---
stage: 4
phase: slate
---

- id: SOL1
  solves: [O1, O3]
  supported_by: [bankid-identity-verification, no-differentiation-at-opening-step]

- id: SOL2
  solves: [O3, O4]
  supported_by: [no-differentiation-at-opening-step, no-visible-resume-capability]

- id: SOL3
  solves: [O1, O4]
  supported_by: [no-visible-resume-capability, no-differentiation-at-opening-step]

- id: SOL4
  solves: [O2, O3]
  supported_by: [no-differentiation-at-opening-step]

- id: SOL5
  solves: [O2, O4]
  supported_by: [no-visible-resume-capability, no-differentiation-at-opening-step]

- id: SOL6
  solves: [O1, O2]
  supported_by: [no-visible-resume-capability]
