---
run_id: 2026-09-spending-insights
artifact_id: A7
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "recommends no action; A7 carries the run id and is never written to S1 (run-scoped contract + empty capability list, not C24)"
    needs: judge
    reach: artifact
standards_basis: current
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: synthesis
sources: [A6, A4, A3b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A7-01]
---

# Competitive analysis | Co trh ukazuje: přehled opakovaných plateb

Zobrazit opakované platby je na tomto trhu vyřešená věc a přestalo to být tím, čím se banka odliší. **Deset z deseti účastníků má přehled v mobilní aplikaci a osm ukazuje obchodníka s uloženou kartou; zasáhnout u obchodníka umí čtyři.** Hranice soutěže se posunula z toho, co klient vidí, na to, co s tím může udělat, a Česká spořitelna je na starší straně té hranice. [rec:R-A7-01]

Dvě ze sedmi příležitostí trh neřeší vůbec. Druhý účet jako pojistka a to, že klientovi po jednom dohledání nic nezůstane, nemají odpověď u žádného z deseti.

## Přehled zjištění

**[universal] ST2 Přehled je v mobilní aplikaci, ne jen v internetovém bankovnictví, u 10 z 10 účastníků.** Nese se na O1. Žádný účastník tuto schopnost nemá jen ve webovém kanálu, takže mobilní aplikace není odlišením ani u jednoho z nich.

**[common] ST1 Banka ukazuje, u kterých obchodníků má klient uloženou kartu nebo předplatné, u 8 z 10.** Nese se na O1 a O6. Chybí jen u Komerční banky, která funkci nemá, a u Monzo, které pracuje s inkasy a příkazy spíš než s uložením karty.

**[common] ST4 Předplatné je vedeno jako vlastní kategorie, ne jen jako platba v historii, u 6 z 10.** Nese se na O1 a O7. To je přesně ten rozdíl, který klientka v materiálu popsala: historie plateb je seznam, ve kterém je nutné vědět, co se hledá.

**[emerging] ST3 Klient může u obchodníka zasáhnout, u 4 z 10.** Nese se na O2 a O4. Air Bank smaže kartu, Moneta zablokuje platbu, Raiffeisenbank pozastaví používání, Revolut zablokuje platbu i obchodníka. Ostatních šest ukazuje a nic víc.

**[common] P1 Rozsah funkce se štěpí na tři úrovně a účastníci se dělí přesně podle nich.** Nese se na O1 a O4. Ukázat obchodníka, odstranit uloženou kartu, zablokovat další platbu. České banky leží na první a druhé, Revolut na třetí.

**[emerging] P2 Kdo funkci nemá, ohlašuje ji s datem místo aby mlčel.** Nese se na O6. Komerční banka uvedla rok 2027, Raiffeisenbank ohlásila rozšíření o předplatná.

**[emerging] P3 Detekci opakování doplňuje ruční označení od klienta.** Nese se na O7. Revolut i Monzo počítají s tím, že algoritmus nepozná všechno, a nechají klienta doplnit zbytek.

**[common] P4 Inkasa, trvalé příkazy a karetní předplatné jsou u britských neobank jeden pohled a u českých bank tři.** Nese se na O7. To je přesně ta neúplnost, kterou operátorka klientovi popsala: karetní platby a příkazy vidí odděleně.

**[emerging] TR1 Tokenizace je nosič, na kterém přehled stojí, a pokrytí není úplné.** Nese se na O1. Air Bank uvádí zhruba sedmdesát procent; ostatní číslo neuvádějí.

**[common] TR2 Přehled se z odlišujícího prvku stal základní výbavou během čtyř let.** Nese se na O6. mBank na jaře 2022, Raiffeisenbank na jaře 2023, Air Bank a Moneta letos.

**[emerging] TR3 Zásah u obchodníka je nová hranice soutěže, ne samotné zobrazení.** Nese se na O4. Čtyři z deseti tam už jsou a dva další to ohlásili.

## Kde trh neodpovídá

**O3, druhý účet jako pojistka.** Žádný z deseti účastníků se tím nezabývá. Přehled u jedné banky nic neříká o tom, co je na účtu u druhé.

**O5, klientovi po jednom dohledání nic nezůstane.** Žádný z deseti neuvádí, že by si klient odnesl něco použitelného příště. Přehled je stav, ne paměť.

## Závěr

### Diagnóza

Klient nevidí, co mu z účtu pravidelně odchází, a trh to už čtyři roky řeší. Čtyři z třinácti českých bank funkci mají, dvě ji ohlásily. Česká spořitelna ji má také, a to na nejnižší ze tří úrovní, které trh rozlišuje.

### Parita

Zobrazení obchodníka s uloženou kartou je parita, ne odlišení. Osm z deseti to má a mobilní aplikaci má deset z deseti. Cokoli, co skončí na této úrovni, dorovná trh a nepředběhne ho.

### Příležitost

Zásah u obchodníka má čtyři z deseti a je to nejmladší z pozorovaných schopností. Druhá otevřená věc je úplnost: sloučit inkasa, příkazy a karetní předplatné do jednoho pohledu umí britské neobanky a žádná česká banka v tomto vzorku.

### Riziko

Pokrytí stojí na tokenizaci a jediné zveřejněné číslo je zhruba sedmdesát procent. Přehled, který ukáže sedm z deseti plateb a netvrdí to, je horší než žádný, protože klient ho přečte jako úplný.

## Co se nepodařilo zjistit

Kolik klientů kterékoli z těchto funkcí používá, neuvádí žádný zdroj. Srovnání uvádí, co banky umějí.

Pokrytí tokenizace uvádí jen jeden účastník a jen přibližně. Ostatní čísla nezveřejňují, takže trend TR1 stojí na jednom čísle.

Zda ohlášené funkce dorazí v ohlášeném termínu, se z veřejného materiálu zjistit nedá.

Zda by řešení Monzo a Starling fungovalo na českých platebních tocích, ověřit nelze; ani jedna z nich v ČR nepůsobí.

## Jak to vzniklo

Krok 3.3, `synthesis`, agent `competitive-analysis`. Jedenáct prvků, každý vázaný na kartu nebo na jmenovaný zdroj a každý pojmenovávající příležitost, které se týká.

Úrovně jsou odvozené z podílu účastníků, ne přidělené. Osm z deseti je `common`, deset z deseti je `universal`, čtyři z deseti je `emerging`.

Syntéza nic nedoporučuje. Popisuje, co trh dělá, a rozhodnutí patří člověku na bráně.
