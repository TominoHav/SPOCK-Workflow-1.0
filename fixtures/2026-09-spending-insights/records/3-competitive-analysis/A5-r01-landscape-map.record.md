---
run_id: 2026-09-spending-insights
record_id: R-A5-01
artifact_id: A5
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A1, A4, A3b]
external_sources:
  - S-mesec-prehled-2026
  - S-airbank-predplatna
  - S-airbank-ulozene-karty
  - S-penize-moneta
  - S-revolut-subscriptions
  - S-monzo-scheduled
  - S-starling-recurring
  - S-tapix-banks
run_id: 2026-09-spending-insights
topic: "Přehled opakovaných plateb a předplatných pro retailové klienty, segment retailového bankovnictví"
scope_field: "Retailové bankovnictví. Hledání začalo u českých bank, protože segment je český, a rozšířilo se na evropské neobanky působící v ČR a na britské, které tuto funkci zavedly nejdřív a jsou referenční implementací."
trends:
  - id: TB1
    class: business
    name: "Přehled předplatných se z odlišujícího prvku stává základní výbavou"
    represents: [airbank.cz, moneta.cz, mbank.cz, csob.cz]
  - id: TB2
    class: business
    name: "Banky, které funkci nemají, ji ohlašují s datem místo aby mlčely"
    represents: [kb.cz, rb.cz]
  - id: TB3
    class: business
    name: "Rozsah funkce se štěpí na tři úrovně: ukázat, odstranit uloženou kartu, zablokovat další platbu"
    represents: [airbank.cz, moneta.cz, revolut.com]
  - id: TT1
    class: technology
    name: "Tokenizace karty je nosič, na kterém přehled stojí, a pokrytí není úplné"
    represents: [airbank.cz, rb.cz]
  - id: TT2
    class: technology
    name: "Obohacování transakčních dat u třetí strany je běžná cesta ke jménu obchodníka"
    represents: [tapix.io]
  - id: TT3
    class: technology
    name: "Detekce opakování se doplňuje ručním označením od klienta"
    represents: [revolut.com, monzo.com]
  - id: TR1
    class: regulatory
    name: "Přístupnost digitálních rozhraní pro spotřebitelské bankovní služby"
    instrument: "Směrnice (EU) 2019/882, zákon č. 424/2023 Sb."
    effective: "2025-06-28"
    represents: [csas.cz, airbank.cz]
  - id: TR2
    class: regulatory
    name: "Profilování a automatizované zpracování osobních údajů"
    instrument: "Nařízení (EU) 2016/679, čl. 22"
    effective: "2018-05-25"
    represents: [revolut.com, tapix.io]
  - id: TR3
    class: regulatory
    name: "Silné ověření klienta u karetních plateb a výjimky pro opakované transakce"
    instrument: "Nařízení v přenesené pravomoci (EU) 2018/389"
    effective: "2021-01-01"
    represents: [csob.cz, moneta.cz]
participants:
  - identity_key: airbank.cz
    name: "Air Bank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB3, TT1, TR1]
    standing: innovator
    deep_dive: true
    reason: "Nejúplnější česká implementace: ukazuje obchodníky, historii plateb a umožňuje uloženou kartu odstranit"
  - identity_key: moneta.cz
    name: "Moneta Money Bank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TB3, TR3]
    standing: innovator
    deep_dive: true
    reason: "Jediná česká banka, která podle srovnání umožní zablokovat další platbu konkrétnímu obchodníkovi"
  - identity_key: csas.cz
    name: "Česká spořitelna"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TR1]
    standing: leader
    deep_dive: true
    reason: "Vlastní výchozí stav. Ukazuje obchodníky a historii, kartu odstranit neumí"
  - identity_key: csob.cz
    name: "ČSOB"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1, TR3]
    standing: leader
    deep_dive: true
    reason: "Ukazuje uložené karty, opakované platby i zařízení, zastavit platbu neumí"
  - identity_key: mbank.cz
    name: "mBank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB1]
    standing: leader
    deep_dive: true
    reason: "Ukazuje přehled předplatných a uložené karty, smazat je neumí"
  - identity_key: kb.cz
    name: "Komerční banka"
    type: direct
    first_seen: 2026-08-28
    represents: [TB2]
    standing: leader
    deep_dive: true
    reason: "Funkci nemá a ohlásila ji na rok 2027. Ohlášené datum je fakt o trhu"
  - identity_key: rb.cz
    name: "Raiffeisenbank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB2, TT1]
    standing: leader
    deep_dive: true
    reason: "Ukazuje tokenizované karty a umí pozastavit používání u obchodníka; předplatná teprve plánuje"
  - identity_key: revolut.com
    name: "Revolut"
    type: adjacent
    first_seen: 2026-08-28
    represents: [TB3, TT3, TR2]
    standing: innovator
    deep_dive: true
    reason: "Nejdále ze všech: vidí, upozorňuje předem a umožní zablokovat obchodníka i jednotlivou platbu"
  - identity_key: monzo.com
    name: "Monzo"
    type: adjacent
    first_seen: 2026-08-28
    represents: [TT3]
    standing: innovator
    deep_dive: true
    reason: "Referenční implementace. Zavedla ruční označení opakované platby a předpověď další částky"
  - identity_key: starlingbank.com
    name: "Starling Bank"
    type: adjacent
    first_seen: 2026-08-28
    represents: [TB1]
    standing: innovator
    deep_dive: true
    reason: "Sloučila inkasa, trvalé příkazy a předplatná do jednoho pohledu, což je přesně ta úplnost, kterou linka nemá"
  - identity_key: tapix.io
    name: "Tapix by Dateio"
    type: substitute
    first_seen: 2026-08-28
    represents: [TT2, TR2]
    standing: innovator
    deep_dive: false
    reason: "Není konkurent, je to cesta, kterou banka jméno obchodníka získává. Profilován není, protože nesoutěží o téhož klienta"
  - identity_key: substitute:contact-centre-call
    name: "Zavolat na linku banky"
    type: substitute
    first_seen: 2026-08-28
    represents: [TB1]
    standing: leader
    deep_dive: false
    reason: "Je to chování, ne organizace. Nikdo o něm nepublikuje primární materiál a nikdy nebude"
  - identity_key: substitute:manual-statement-review
    name: "Projít si vlastní výpisy"
    type: substitute
    first_seen: 2026-08-28
    represents: [TB1]
    standing: leader
    deep_dive: false
    reason: "Totéž. Chování, ne organizace"
  - identity_key: fio.cz
    name: "Fio banka"
    type: direct
    first_seen: 2026-08-28
    represents: [TB2]
    standing: leader
    deep_dive: false
    reason: "Funkci nemá a je ve vývoji bez data. Prostor pro hloubkovou kartu vyčerpal Komerční banka, která ohlásila datum"
  - identity_key: creditas.cz
    name: "Banka Creditas"
    type: direct
    first_seen: 2026-08-28
    represents: [TB2]
    standing: leader
    deep_dive: false
    reason: "Správu tokenů plánuje do konce roku 2026. Menší podíl na retailu než vybraná sedmička"
  - identity_key: unicreditbank.cz
    name: "UniCredit Bank"
    type: direct
    first_seen: 2026-08-28
    represents: [TB2]
    standing: leader
    deep_dive: false
    reason: "Funkci nemá a neohlásila ji. Zastoupena v trendu TB2 spolu s ostatními"
unprofiled: []
unrepresented_trends: []
---

# Záznam R-A5-01 — A5

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 3-competitive-analysis/1-landscape-map.md.
