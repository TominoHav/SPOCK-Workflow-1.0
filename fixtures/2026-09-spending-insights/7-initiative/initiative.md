---
run_id: 2026-09-spending-insights
artifact_id: A14
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
could_not_verify:
  - rule: "written in Czech, free of implementation detail; every fact drawn from the agreed PRD or marked an assumption"
    needs: judge
    reach: artifact
produced_by:
  agent: business-analyst
  skill: initiative-authoring
sources: [A13, A11, A4, A1]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A14-01]
decision:
  gate: G7
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
---

# [SPOCK-201] - Upozornění na opakovanou platbu před jejím strhnutím

**Klient se o opakované platbě dozví až z výpisu, a tato iniciativa ten okamžik posouvá před strhnutí.**
Pilot posílá zprávu tři dny předem u karetního předplatného, na vymezené retailové skupině.

Klíč `SPOCK-201` dodal zadavatel jako fixture (`id_basis: fixture`). Agent jej nevygeneroval a v Jiře
neexistuje. Materiál tohoto běhu je vymyšlený, takže fixture klíč je pro něj správná volba.

## Insight

**Co jsme zjistili:** Klient se o opakované platbě dozví až z výpisu, tedy poté, co peníze odešly. Dvě
prioritní příležitosti běhu to popisují ze dvou stran: klient nevidí, co se mu pravidelně strhává, a nemá
kde platbu zastavit dřív, než proběhne.

**Koho se to týká:** Retailových klientů s běžným účtem a aspoň jedním aktivním karetním předplatným.

**Odkud to víme:** Z prioritních příležitostí běhu a z mapy trhu, obojí vzniklo dřív v tomto běhu. První příležitost je doložená
ve třech nezávislých zdrojích, druhá stojí na jednom a nese to ve své značce důvěry. Tento běh nepracoval
s provozními daty, s NPS ani se záznamy podpory.

**Trh na to odpovídá po částech.** Čtyři ze třinácti českých bank ukazují přehled předplatných, dvě jej
ohlásily. Odstranit uloženou kartu umí méně z nich a zablokovat další platbu skoro žádná.

## Byznys cíl

**Vazba na strategii:** SHD-1, klienti s pravidelnou relevantní interakcí. Zpráva, kterou banka posílá
a na kterou klient odpovídá, je taková interakce, a napojení je v jednom kroku.

Vazba nese značku `indicative_unverified_strategy`: pásma pro její obodování existují, ale konkrétní
napojení tohoto pilotu na klíčový výsledek nikdo mimo tento běh nepotvrdil.

**Kdy je iniciativa hotová:** Až pilot ukáže, kolik klientů po upozornění platbu skutečně zruší nebo
změní, a výsledek je vyhodnocen proti kritériu zastavení.

## Outcome

**Změna chování klienta:** Klient, kterému se chystá strhnout opakovaná platba, **se o ní dozví předem a rozhodne se, jestli ji nechá proběhnout.** Místo aby ji našel ve výpisu, když už je pozdě.

Popisuje změnu chování, nikoli řešení. Jakou formou se to klient dozví, patří do rozsahu níže.

## Metriky úspěchu

### Behaviorální

- Podíl klientů, kteří upozornění otevřou. Kritérium zastavení: pod 20 %.
- Podíl klientů, kteří do strhnutí platbu zruší nebo změní. Kritérium zastavení: pod 2 %.
- Podíl klientů, kteří si upozornění vypnou. Kritérium zastavení: nad 15 %.

**Výchozí stav u druhé a třetí metriky nikdo nedodal.** Kolik klientů dnes opakovanou platbu ruší, běh
nezjistil, a odhad by byl vymyšlené číslo.

### Byznysové

**Tento běh byznysovou metriku nedodal.** Chování, které pilot měří, je zrušení nebo změna platby, a jak
se to promítne do výnosu, nákladu na obsluhu nebo penetrace, nikdo pro tento pilot nespočítal.

Nejbližší dostupná vazba je snížení počtu hovorů na lince k dotazům na opakované platby. Objem těch hovorů
běh nezná.

### Vnímání klientem

**Tento běh metriku vnímání nedodal.** Očekává se, že klient, který o platbě ví předem, bude bance
důvěřovat víc, ale nikdo to v tomto běhu neměřil ani nemá výchozí stav NPS pro tuto skupinu.

## Rozsah iniciativy

### In Scope

- Zpráva 72 hodin před strhnutím karetního předplatného, v aplikaci i jako push
- Obsah zprávy: částka, jméno obchodníka, datum strhnutí, česky
- Cesta ze zprávy do detailu platby, kde lze platbu zrušit stávající cestou
- Vypnutí upozornění jedním přepínačem v nastavení
- Historie odeslaných zpráv v aplikaci
- Rozpoznání opakované platby dodavatelem klasifikace
- Vymezená pilotní skupina: retail, běžný účet, aktivní karetní předplatné, aktivní aplikace

### Out of Scope

- Trvalé příkazy a inkasa. Zvažovány a vyřazeny při volbě pilotního rozsahu
- Zrušení platby přímo ze zprávy. Zvažováno a vyřazeno stejným rozhodnutím
- Blokace platby u obchodníka. Nejnižší skóre ve fázi 4
- Jakákoli změna toho, jak platba probíhá. Pilot informuje, nemění

## High-Level akceptační kritéria

- Zpráva odchází 72 hodin před datem strhnutí a jen v okně 9:00 až 20:00
- Zpráva nese částku, jméno obchodníka a datum, a je srozumitelná bez otevírání detailu
- Ze zprávy vede právě jedna akce a nemění žádnou stávající obrazovku
- Po vypnutí upozornění neodejde klientovi žádná další zpráva
- Zpráva i historie projdou kontrolou přístupnosti podle EAA před spuštěním
- Nový účel zpracování je popsán v aplikaci a v zásadách před spuštěním
- Pro klienta, který předplatné zruší mezi zprávou a strhnutím, neexistuje druhá zpráva

## Závislosti

| Závislost | Kdo drží | Kdy |
|---|---|---|
| Výběr dodavatele klasifikace transakcí | Produktový vlastník | před zahájením vývoje |
| Rozhodnutí, zda je potřeba posouzení vlivu | Pověřenec pro ochranu osobních údajů | před spuštěním pilotu |
| Rozhodnutí, zda je klasifikace kritická funkce podle DORA | ICT rizika | před výběrem dodavatele |
| Smlouva s dodavatelem klasifikace | Právní útvar | před výběrem dodavatele |
| Stanovisko ke střetům a k distribučnímu řetězci | Compliance | před výběrem dodavatele |
| Počet klientů v pilotní skupině | Data | před spuštěním pilotu |
| Schválení textu zprávy a potvrzení | Klientská komunikace | před spuštěním pilotu |

## Rizika a mitigace

| Riziko | Dopad | Mitigace |
|---|---|---|
| Dodavatel označí opakované platby nepřesně | Klient dostane zprávu o platbě, která se neopakuje, a přestane zprávám věřit | Před spuštěním porovnat označení proti ručnímu vyhodnocení na vzorku sta karet |
| Zpráva obtěžuje víc, než pomáhá | Klienti si upozornění vypnou a pilot ztratí měřenou skupinu | Kritérium zastavení na podílu vypnutí je 15 % a měří se od prvního týdne |
| 72 hodin je špatný předstih | Klient dostane zprávu, na kterou už nestihne reagovat, nebo tak brzy, že na ni zapomene | Předstih je volba tohoto dokumentu, ne zjištění; pilot ho neověřuje a druhý průchod ho může změnit |
| Regulatorní náročnost je vyšší, než se zdá | Pilot se zdrží nebo se rozsah zúží po zahájení vývoje | Tři ze čtyř regulatorních karet psal tento tým a hodnotu složitosti drží pravidlo, které ji zakazuje vydat, dokud všechny čtyři karty nejsou od banky; pět otevřených položek má vlastníka a termín |
| Klient chce vědět o všech třech druzích plateb, ne jen o jednom | Pilot odpoví na užší otázku, než která klienta zajímá | Je to vědomé zúžení pilotního rozsahu a je to nejlevnější způsob, jak se to dozvědět |

## Otevřené otázky

- Kolik klientů je v pilotní skupině. Vymezení existuje, číslo za ním ne.
- Kolik klientů dnes opakovanou platbu ruší, a kolik hovorů na linku se jich týká. Obojí je výchozí stav dvou metrik.
- Jaká byznysová metrika a jaká metrika vnímání se na tento pilot navážou. Tento běh nedodal ani jednu.

## Odkazy

- [PRD, odsouhlaseno](../6-prd/2-prd-agreed.md)
- [Rozpracované MVP](../5-mvp/2-expanded-mvp.md)
- [Varianty MVP](../5-mvp/1-mvp-options.md)
- [Vybraná varianta](../4-solutions/3-selected-solution.md)
- [Skóre variant](../4-solutions/2-solution-scores.md)
- [Regulatorní screening variant](../4-solutions/1b-option-screens.md)
- [Prioritní příležitosti](../2-problems/5-prioritised-opportunities.md)
- [Konkurenční syntéza](../3-competitive-analysis/3-competitive-synthesis.md)
