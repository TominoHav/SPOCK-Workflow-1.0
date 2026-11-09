---
run_id: 2026-09-spending-insights
record_id: R-A4-01
artifact_id: A4
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A3b]
external_sources: []
run_id: 2026-09-spending-insights
primary: [O1, O4]
secondary: [O2, O6, O7]
parked: [O3, O5]
ordering_source: "Pořadí určila značka důvěry a nic jiného, protože počet klientů nenese žádná ze sedmi příležitostí. Dvě příležitosti stojí na dvou původech a jdou první; pět stojí na jednom původu. Kdyby počet existoval, pořadí by na něm vzniklo a mohlo by být jiné."
carried_unresolved:
  - ref: A2-item-3
    question: "Kolik dotazů na neočekávanou platbu přijde. Kategorie se používá i na jiné věci a nikdo ji nerozděluje"
  - ref: A2-item-5
    question: "Jak dlouho trvá vyřešení. Pole není vyplněné u jedenácti z patnácti tiketů"
dispositions:
  - opportunity: O1
    next_step: "Do fáze 3 a dál. Je to hlavní příležitost tohoto běhu"
    note: "Stojí na dvou původech a nese uvedenou příčinu, byť jako domněnku"
  - opportunity: O4
    next_step: "Do fáze 3 a dál"
    note: "Druhá se dvěma původy. Popisuje tutéž nepřítomnost z pohledu linky"
  - opportunity: O2
    next_step: "Nese se dál jako sekundární"
    note: "Jeden původ. Konkrétní a testovatelná, ale nepotvrzená"
  - opportunity: O6
    next_step: "Nese se dál jako sekundární"
    note: "Jeden původ, a je to stav banky spíš než potřeba klienta"
  - opportunity: O7
    next_step: "Nese se dál jako sekundární"
    note: "Jeden tlumočený původ. Linka sama se nevyjádřila"
  - opportunity: O3
    next_step: "Odloženo"
    complete_validation: "Zeptat se klientů se dvěma účty, proč druhý drží"
    note: "Jeden původ a důvod, který uvedl sám klient. Bez druhého pohledu nelze odlišit od jiných důvodů"
  - opportunity: O5
    next_step: "Odloženo"
    complete_validation: "Rozdělit kategorii na lince tak, aby šlo spočítat opakované volající"
    note: "Jedno agregované pozorování. Bez rozdělené kategorie ho nelze potvrdit ani vyvrátit"
---

# Záznam R-A4-01 — A4

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 2-problems/5-prioritised-opportunities.md.
