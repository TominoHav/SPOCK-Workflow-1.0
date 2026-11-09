---
run_id: 2026-09-spending-insights
record_id: R-A10-01
artifact_id: A10
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
constraint_basis: none_stated
sources: [A9, A7]
external_sources: []
options:
  - id: OPT-A
    statement: "Upozornění na jeden druh platby, karetní předplatné, u vymezené skupiny klientů"
    approach: "Zpráva chodí tři dny před strhnutím karetního předplatného. Klient ji dostane v aplikaci i push zprávou a ze zprávy vede jedna akce: otevřít detail platby. Zrušit nebo změnit se dá až v detailu, běžnou cestou, kterou aplikace už má"
    differs_by: "Nejužší záběr. Jeden druh platby, nejmenší zásah do stávajících obrazovek a žádná nová akce ve zprávě"
    constraints_met: []
  - id: OPT-B
    statement: "Upozornění na všechny tři druhy opakovaných plateb, bez akce ve zprávě"
    approach: "Zpráva chodí tři dny před trvalým příkazem, inkasem i karetním předplatným. Klasifikaci, které platby jsou opakované, dělá dodavatel. Zpráva nese částku, příjemce a datum a vede na detail"
    differs_by: "Široký záběr, mělká funkce. Ověřuje, jestli klienti chtějí vědět o všech třech druzích, nebo jen o některých"
    constraints_met: []
  - id: OPT-C
    statement: "Upozornění na jeden druh platby, s možností zrušit platbu přímo ze zprávy"
    approach: "Stejný rozsah jako OPT-A, ale zpráva nese akci: zrušit tuto platbu. Zrušení proběhne bez otevírání detailu a klient dostane potvrzení"
    differs_by: "Úzký záběr, hluboká funkce. Ověřuje, jestli je hodnota v tom se to dozvědět, nebo v tom moci s tím hned něco udělat"
    constraints_met: []
---

# Záznam R-A10-01 — A10

Jedna produkce. Dokument z něj sestavený je 5-mvp/1-mvp-options.md.
