---
run_id: 2026-09-spending-insights
artifact_id: A3
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "never reads A2 raw material, only the A2b intake record"
    needs: judge
    reach: process
  - rule: "no hypothesis names a thing to build; a solution-shaped candidate is reduced to the need beneath it or recorded as not a problem"
    needs: judge
    reach: content
produced_by:
  agent: hypothesis-designer
  skill: hypothesis-authoring
sources: [A2b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A3-01]
---

# Problems | Hypotézy problémů

Ze třinácti pozorování vzniklo sedm hypotéz. Dvě nesou značku `strong`, protože stojí na dvou původech a alespoň jedno pozorování je z první ruky; pět nese `weak`, protože stojí na jednom původu. Žádná není `unrated`, protože každá cituje alespoň jedno pozorování. [rec:R-A3-01]

Značka není úsudek autora. Vychází z aritmetiky, kterou popisují standardy důkazů, a brána ji přepočítává znovu.

## Co materiál říká

Dvě hypotézy stojí pevně. **H1**, že klient nedokáže zjistit, které opakované platby mu odcházejí, aniž by je dohledával jinde než v aplikaci, stojí na třech pozorováních ze dvou původů. **H4**, že klient se ptá proto, aby zjistil, co platba byla, a ne aby ji reklamoval, stojí na výpovědi operátorky a na rozdělení patnácti tiketů.

Pět hypotéz stojí na jednom původu. **H2** o zrušené kartě, **H3** o druhém účtu a **H6** o tom, že banka data drží a neumí je ukázat, pocházejí každá od jednoho člověka a nikdo je nepotvrzuje. **H5** o opakovaném řešení téže věci stojí na jedné poznámce v exportu. **H7** o neúplném seznamu na lince je navíc tlumočená: klient opakuje, co mu řekla operátorka, a linka sama se k tomu nevyjádřila.

## Odkud pochází

Pět původů: dva retailoví klienti, jedna operátorka reklamačního týmu, jeden produktový manažer a jeden export tiketů. Každá hypotéza cituje pozorování, ne položku materiálu, takže je vidět, které konkrétní tvrzení ji nese.

Žádná hypotéza nejmenuje věc k postavení. Nejblíž tomu je H6, která říká, že banka data drží a nemá způsob, jak je ukázat; to je popis stavu, ne návrh obrazovky.

## H1: Klient nevidí, co mu z účtu pravidelně odchází

Klient s běžným účtem nedokáže zjistit, které opakované platby mu z účtu odcházejí, aniž by je sám dohledával jinde než v aplikaci. Klientka platbu našla ve výpisu a dohledání jí trvalo přibližně dvacet minut; historii plateb v aplikaci popsala jako seznam, ve kterém je nutné vědět, co se hledá. Druhý klient dostal seznam od linky s tím, že není úplný.

Značka `strong`: tři pozorování ze dvou původů, dvě z první ruky. Vyvrátil by ji klient, který opakované platby v aplikaci najde do minuty a bez pomoci.

## H2: Klient čeká, že zrušení karty zruší i platby přes ni

Klient si myslí, že zrušením karty ruší i opakované platby, které přes ni chodí. Zrušil kartu právě proto a platba přišla znovu z nové karty.

Značka `weak`: jedno pozorování z jednoho původu. Vyvrátila by ji data ukazující, že klienti po zrušení karty opakované platby nečekají.

## H3: Druhý účet slouží jako pojistka proti nepřehlednosti

Klient drží druhý účet u jiné banky, protože neví, co je na kterém. Uvedl to jako důvod sám.

Značka `weak`: jedno pozorování z jednoho původu. Oslabili by ji klienti se dvěma účty, kteří uvádějí jiný důvod.

## H4: Dotaz na neočekávanou platbu není reklamace

Klient se na neočekávanou platbu ptá, aby zjistil, co to bylo, nikoli aby ji reklamoval. Operátorka to popsala jako nejčastější dotaz ve své kategorii a export patnácti tiketů to potvrzuje devíti případy.

Značka `strong`: dvě pozorování ze dvou původů. Vyvrátilo by ji rozdělení tiketů, ve kterém převažují skutečné reklamace.

## H5: Vyřešení jednoho případu klientovi nezůstane

Klient řeší tutéž věc opakovaně, protože po vyřešení jednoho případu mu nezůstane nic, co by mu příště pomohlo. U šesti z devíti tiketů operátor poznamenal, že klient podobnou věc už jednou řešil.

Značka `weak`: jedno agregované pozorování z jednoho původu, žádný rozhovor to nepotvrzuje. Vyvrátila by ji data ukazující, že klient po jednom vyřešení už nevolá.

## H6: Data banka drží a nemá je jak ukázat

Banka nedokáže klientovi ukázat, co mu z účtu pravidelně odchází, přestože data k tomu drží. Produktový manažer to řekl přímo.

Značka `weak`: jedno pozorování z jednoho původu, bez pohledu ze strany systémů. Vyvrátila by ji existující obrazovka, která opakované platby ukazuje.

## H7: Seznam na lince není úplný

Seznam pravidelných plateb, který linka klientovi přečte, není úplný, protože karetní platby a příkazy jsou vidět odděleně. Klient opakuje, co mu řekla operátorka.

Značka `weak` a pozorování je tlumočené: linka sama se k tomu nevyjádřila. Vyvrátil by ji jeden pohled linky, ve kterém jsou obojí platby vidět společně.

## Co se nepodařilo zjistit

Pět ze sedmi hypotéz stojí na jednom původu a značka `weak` to říká. Materiál nenese druhý pohled na zrušení karty, na důvod druhého účtu ani na to, proč klient volá opakovaně.

Ke každé hypotéze je zapsáno, co by ji vyvrátilo. Žádné z toho tento běh neověřuje.

## Jak to vzniklo

Krok 2.2, `hypothesis-authoring`, agent `hypothesis-designer`. Tato vazba nečte surový materiál A2, jen záznam z příjmu; rozsah dat ji od A2 odděluje.

Značky důvěry jsou odvozené aritmetikou ze standardů důkazů: dva a více původů s alespoň jedním pozorováním z první ruky dává `strong`, cokoli jiného s alespoň jedním citovaným pozorováním dává `weak`. Autor je nepřiděluje.
