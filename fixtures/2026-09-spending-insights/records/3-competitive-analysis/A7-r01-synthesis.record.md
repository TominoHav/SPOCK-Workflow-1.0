---
run_id: 2026-09-spending-insights
record_id: R-A7-01
artifact_id: A7
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A6, A4, A3b]
external_sources: []
run_id: 2026-09-spending-insights
standards:
  - key: ST1
    statement: "Banka ukazuje, u kterých obchodníků má klient uloženou kartu nebo předplatné"
    source_count: "8 of 10"
    tier: common
    traces_to: [airbank.cz, moneta.cz, csas.cz, csob.cz, mbank.cz, rb.cz, revolut.com, starlingbank.com]
    addresses: [O1, O6]
  - key: ST2
    statement: "Přehled je v mobilní aplikaci, ne jen v internetovém bankovnictví"
    source_count: "10 of 10"
    tier: universal
    traces_to: [airbank.cz, moneta.cz, csas.cz, csob.cz, mbank.cz, kb.cz, rb.cz, revolut.com, monzo.com, starlingbank.com]
    addresses: [O1]
  - key: ST3
    statement: "Klient může u obchodníka zasáhnout: smazat kartu, pozastavit ji nebo platbu zablokovat"
    source_count: "4 of 10"
    tier: emerging
    traces_to: [airbank.cz, moneta.cz, rb.cz, revolut.com]
    addresses: [O2, O4]
  - key: ST4
    statement: "Předplatné je vedeno jako vlastní kategorie, ne jen jako platba v historii"
    source_count: "6 of 10"
    tier: common
    traces_to: [airbank.cz, moneta.cz, csas.cz, mbank.cz, revolut.com, starlingbank.com]
    addresses: [O1, O7]
patterns:
  - key: P1
    statement: "Rozsah funkce se štěpí na tři úrovně a účastníci se dělí přesně podle nich: ukázat, odstranit, zablokovat"
    traces_to: [airbank.cz, moneta.cz, csas.cz, revolut.com]
    addresses: [O1, O4]
  - key: P2
    statement: "Kdo funkci nemá, ohlašuje ji s datem místo aby mlčel"
    traces_to: [kb.cz, rb.cz]
    addresses: [O6]
  - key: P3
    statement: "Detekci opakování doplňuje ruční označení od klienta tam, kde algoritmus nestačí"
    traces_to: [revolut.com, monzo.com]
    addresses: [O7]
  - key: P4
    statement: "Inkasa, trvalé příkazy a karetní předplatné jsou u britských neobank jeden pohled a u českých bank tři"
    traces_to: [starlingbank.com, monzo.com, csas.cz, csob.cz]
    addresses: [O7]
trends:
  - key: TR1
    statement: "Tokenizace je nosič, na kterém přehled stojí, a její pokrytí není úplné"
    traces_to: [airbank.cz, rb.cz]
    addresses: [O1]
  - key: TR2
    statement: "Přehled se z odlišujícího prvku stal na českém trhu základní výbavou během čtyř let"
    traces_to: [mbank.cz, rb.cz, airbank.cz, moneta.cz]
    addresses: [O6]
  - key: TR3
    statement: "Zásah u obchodníka je nová hranice soutěže, ne samotné zobrazení"
    traces_to: [moneta.cz, revolut.com, rb.cz]
    addresses: [O4]
absences:
  - problem: O3
    statement: "Žádný z deseti účastníků neřeší, proč si klient drží druhý účet u jiné banky. Trh na tuto příležitost neodpovídá."
  - problem: O5
    statement: "Žádný z deseti účastníků neuvádí, že by klientovi po jednom dohledání něco zůstalo. Trh na tuto příležitost neodpovídá."
---

# Záznam R-A7-01 — A7

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 3-competitive-analysis/3-competitive-synthesis.md.
