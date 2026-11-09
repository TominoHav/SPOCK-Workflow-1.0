---
run_id: 2026-09-spending-insights
artifact_id: A4
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: hypothesis-designer
  skill: prioritisation
sources: [A3b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A4-01]
decision:
  gate: G2
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: researcher
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
  note: "Přijato v rámci stojícího pokynu z 28. srpna 2026: každá volba je první nabízená možnost. Zdůvodnění zde není, protože žádné nezaznělo."
---

# Problems | Seřazené příležitosti

Sedm příležitostí je rozděleno na dvě hlavní, tři vedlejší a dvě odložené. **Pořadí určila značka důvěry a nic jiného**, protože počet klientů nenese ani jedna ze sedmi. Kdyby počet existoval, pořadí by vzniklo na něm a mohlo by být jiné. [rec:R-A4-01]

Dvě nevyřešené otázky se nesou dál beze změny: kolik dotazů na neočekávanou platbu přijde, a jak dlouho trvá vyřešení.

## Co řešíme nejdřív

**O1**, že klient nedokáže zjistit, které opakované platby mu odcházejí, a **O4**, že se na neočekávanou platbu ptá proto, aby zjistil, co to bylo. Obě stojí na dvou původech a obě popisují tutéž nepřítomnost ze dvou pozic: klient, který dohledává sám, a klient, který volá.

O1 nese uvedenou příčinu, byť jako domněnku jednoho člověka: karetní platby a příkazy drží banka v oddělených pohledech a nikdo je nespojuje.

## Co následuje

**O2** o zrušené kartě, **O6** o tom, že banka data drží a nemá je jak ukázat, a **O7** o neúplném seznamu na lince. Všechny tři stojí na jednom původu.

O6 je stav banky spíš než potřeba klienta a je tak vedena. O7 je navíc tlumočená: klient opakuje, co mu řekla operátorka, a linka sama se k tomu nevyjádřila.

## Co teď neřešíme

**O3** o druhém účtu jako pojistce a **O5** o tom, že klientovi po vyřešení nic nezůstane. Obě stojí na jednom původu a obě mají zapsáno, co by je potvrdilo.

O3 potřebuje zeptat se klientů se dvěma účty, proč ten druhý drží. O5 potřebuje rozdělenou kategorii na lince, aby šlo spočítat opakované volající. Ani jedno tento běh neudělá.

## Jak jsme určili pořadí

Na značce důvěry, protože jiné kritérium k dispozici nebylo. Dvě příležitosti stojí na dvou původech a jdou první; pět stojí na jednom původu a jsou rozděleny podle toho, jak konkrétní a testovatelné jsou.

**To je slabší základ, než na jaký toto pořadí vypadá.** Značka důvěry měří, kolik nezávislých původů příležitost nese, ne jak moc klientovi vadí ani kolika klientů se týká. Kdyby počet dorazil, pořadí by se mohlo změnit.

## Co se nepodařilo zjistit

Počet klientů nenese ani jedna ze sedmi příležitostí a pořadí proto vzniklo bez něj.

Kolik dotazů na neočekávanou platbu přijde, se z materiálu zjistit nedá; kategorie se používá i na jiné věci. Jak dlouho trvá vyřešení, také ne; pole není vyplněné u jedenácti z patnácti tiketů. Obě otázky se nesou dál.

## Jak to vzniklo

Krok 2.4, `prioritisation`, agent `hypothesis-designer`. Každá ze sedmi příležitostí je umístěna právě jednou a žádná nepřibyla ani nechybí.

Rozdělení navrhl agent; rozhodnutí na bráně G2 přijal člověk. Zdůvodnění k němu není zaznamenáno, protože žádné nezaznělo.
