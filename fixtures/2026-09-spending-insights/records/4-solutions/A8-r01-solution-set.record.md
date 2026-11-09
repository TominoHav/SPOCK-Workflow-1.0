---
run_id: 2026-09-spending-insights
record_id: R-A8-01
artifact_id: A8
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A1, A4, A3b, A7]
external_sources: []
run_id: 2026-09-spending-insights
ideas:
  - id: I1
    statement: "Klient vidí v aplikaci seznam svých opakovaných plateb a předplatných, sestavený z transakčních dat, s obchodníkem, částkou a odhadem dalšího data."
    description: "Obrazovka v aplikaci, která z transakční historie klienta vyskládá opakující se položky a ukáže je jako seznam. U každé je jméno obchodníka, částka, jak často chodí a kdy podle poslední platby přijde příští. Klasifikace obchodníka běží u dodavatele obohacení transakčních dat. Detekce opakování běží nad vlastními daty banky. Klient nic nenastavuje."
    solves: [O1, O6]
    supported_by: [ST1, ST4, P1]
    compliance_touchpoints: [A1.S1, A1.S13, A2.G1, A2.G6]
  - id: I2
    statement: "Klient dostane upozornění, než opakovaná platba odejde, a může na ně reagovat dřív, než se peníze pohnou."
    description: "Push upozornění několik dní před očekávanou platbou, s obchodníkem a částkou. Klient si je zapíná v nastavení. Odhad data vychází z historie stejné platby. Upozornění jde stávající cestou pro notifikace."
    solves: [O1, O2]
    supported_by: [ST3, P3]
    compliance_touchpoints: [A1.S1, A2.G1, A2.G2]
  - id: I3
    statement: "Všechny druhy opakované platby jsou v jednom seznamu, ať jdou přes kartu, inkaso nebo trvalý příkaz."
    description: "Jedna obrazovka místo tří. Klient nevidí, jakou cestou platba chodí, jen že chodí. Sloučení tří zdrojů dat do jednoho pohledu. Rozdíl mezi kanály zůstává v detailu, ne v navigaci."
    solves: [O1, O7]
    supported_by: [P4, ST4]
    compliance_touchpoints: [A1.S1, A1.S13, A2.G2]
  - id: I4
    statement: "Klient může u konkrétního obchodníka zablokovat další platbu přímo v aplikaci, aniž by rušil kartu."
    description: "Tlačítko u položky v seznamu. Blokace zastaví další platby danému obchodníkovi a kartu nechá být. Blokace na úrovni karetního tokenu u obchodníka. Klient ji může kdykoli zrušit."
    solves: [O2, O4]
    supported_by: [ST3, TR3, P1]
    compliance_touchpoints: [A1.S1, A1.S8, A3.L4, A4.I2]
  - id: I5
    statement: "U každé platby, kterou klient nepozná, je v aplikaci jméno obchodníka a historie, takže nemusí volat."
    description: "Detail platby s obchodníkem, kategorií a předchozími platbami téhož druhu. Cílem je odpovědět na otázku, se kterou klient volá. Obohacení transakčních dat dodá jméno a kategorii. Historie je vlastní."
    solves: [O4, O5]
    supported_by: [ST1, P1]
    compliance_touchpoints: [A1.S1, A1.S12, A2.G2]
unproduced: []
---

# Záznam R-A8-01 — A8

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 4-solutions/1-solution-set.md.
