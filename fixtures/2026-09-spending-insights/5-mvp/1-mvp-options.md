---
run_id: 2026-09-spending-insights
artifact_id: A10
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "2..3 options, each a whole way to pilot the solution, never a subset or a phase of another"
    needs: judge
    reach: artifact
  - rule: "every constraint referenced resolves into the Banking Constraints"
    needs: check
produced_by:
  agent: product-owner
  skill: mvp-option-design
sources: [A9, A7]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A10-01]
decision:
  gate: G5a
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
  selection: OPT-A
---

# Discovery | Varianty MVP: upozornění před platbou

Tři varianty, jak vybrané řešení pilotovat. **Nejsou to fáze jedné cesty**, jsou to tři různé pilotní záběry a spustí se právě jeden. [rec:R-A10-01]

Žádná z nich nenese značku doporučení. Rozhodnutí je G5a a patří člověku.

## OPT-A: Jeden druh platby, zpráva bez akce

Zpráva chodí tři dny před strhnutím karetního předplatného. Klient ji dostane v aplikaci i push zprávou a vede z ní jedna akce: otevřít detail platby. Zrušit nebo změnit se dá až v detailu, běžnou cestou, kterou aplikace už má.

**Liší se nejužším záběrem.** Jeden druh platby, nejmenší zásah do stávajících obrazovek a žádná nová akce ve zprávě.

## OPT-B: Všechny tři druhy plateb, zpráva bez akce

Zpráva chodí tři dny před trvalým příkazem, inkasem i karetním předplatným. Klasifikaci, které platby jsou opakované, dělá dodavatel. Zpráva nese částku, příjemce a datum a vede na detail.

**Liší se šířkou při stejné mělkosti.** Ověřuje, jestli klienti chtějí vědět o všech třech druzích, nebo jen o některých.

## OPT-C: Jeden druh platby, zrušení přímo ze zprávy

Stejný rozsah jako OPT-A, ale zpráva nese akci: zrušit tuto platbu. Zrušení proběhne bez otevírání detailu a klient dostane potvrzení.

**Liší se hloubkou při stejné šířce.** Ověřuje, jestli je hodnota v tom se to dozvědět, nebo v tom moci s tím hned něco udělat.

## Jak mezi nimi vybrat

Tři varianty se rozcházejí ve dvou různých směrech a každá odpoví na jinou otázku.

**OPT-A proti OPT-B je otázka šířky.** Spustit OPT-A znamená zjistit, jestli upozornění na karetní předplatné klientům stojí za to, a nic o zbylých dvou druzích. Spustit OPT-B znamená to zjistit o všech třech najednou, s dodavatelem klasifikace v řetězci od prvního dne.

**OPT-A proti OPT-C je otázka hloubky.** Spustit OPT-A znamená zjistit, jestli klient chce vědět. Spustit OPT-C znamená zjistit, jestli chce jednat, a tedy jestli je zpráva bez akce polovičatá.

OPT-B a OPT-C se navzájem nevylučují jako budoucí kroky, ale jako pilot se vylučují: první přidává dodavatele, druhý přidává akci, a pilot, který přidá obojí, neřekne, které z toho fungovalo.

## Co se nepodařilo zjistit

**Žádná varianta neuvádí, které bankovní omezení splňuje.** Tělo `banking-constraints` neexistuje, odložil ho stakeholder 21. srpna 2026, a produkce nese značku `constraint_basis: none_stated`. Kde by stálo, že varianta drží limit na počet push zpráv nebo pravidlo pro noční doručování, nestojí nic.

Nevíme, kolik klientů má všechny tři druhy opakovaných plateb současně. Rozdíl mezi OPT-A a OPT-B stojí na tom čísle a nikdo ho nedodal.

## Jak to vzniklo

Krok 5.1, `mvp-option-design`, agent `product-owner`. Čte vybrané řešení z A9 a konkurenční syntézu z A7.

Žádná varianta není podmnožinou jiné a žádná není fází jiné. Tři varianty, jedna se spustí.

Vybrána je OPT-A. Rozhodl Igor Tadić 28. srpna 2026 pravidlem, které zadal na začátku běhu: bere se první varianta. Varianty nenesou skóre, na kterém by šlo rozhodnout jinak, a OPT-A je nejužší ze tří.

