---
run_id: 2026-09-spending-insights
artifact_id: A6
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "fetches through the quarantine bridge and derives from the extract, never raw text; a failed branch is unprofiled with a reason"
    needs: judge
    reach: process
standards_basis: current
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: deep-dive
sources: [A5]
external_sources: [S-mesec-prehled-2026]
assembled_at: 2026-08-28
assembled_from: [R-A6-01, R-A6-02, R-A6-03, R-A6-04, R-A6-05, R-A6-06, R-A6-07, R-A6-08, R-A6-09, R-A6-10]
---

# Competitive analysis | Karty účastníků: přehled opakovaných plateb

Deset karet, každá se šesti nebo více nezávislými vydavateli a alespoň jedním primárním zdrojem. **Rozsah funkce se štěpí na tři úrovně a české banky se dělí přesně podle nich**: ukázat obchodníka, odstranit uloženou kartu, zablokovat další platbu. Air Bank je jediná česká banka na druhé úrovni, Moneta jediná na třetí. Česká spořitelna je na první.

Chronologie je v materiálu doložená: mBank byla první na jaře 2022, Raiffeisenbank následovala na jaře 2023. Komerční banka funkci ohlásila na rok 2027.

## Air Bank

[rec:R-A6-01]

### Co nabízejí

**Seznam obchodníků s uloženou kartou.** Klient vidí, u koho má kartu uloženou, na jednom místě v aplikaci.

**Historie plateb u obchodníka.** U každého obchodníka lze rozkliknout, co a kdy se platilo.

**Filtr podle karty.** Přehled lze zúžit na jednu konkrétní kartu.

**Odstranění uložené karty.** Uloženou kartu u obchodníka lze z aplikace smazat.

**Přehled předplatných.** Předplatná jsou vedena jako vlastní kategorie, ne jen jako platby.

**Upozornění na omezení.** Banka sama v přehledu uvádí, že smazání karty nenahrazuje ukončení služby.

### Čím se liší

**Jediná česká banka, která uloženou kartu smaže.** Srovnání třinácti bank ji uvádí jako jedinou s touto možností.

**Historie plateb u obchodníka.** Ostatní banky v srovnání ukazují obchodníka, ne co se u něj platilo.

**Pokrytí sama vyčísluje.** Uvádí zhruba sedmdesát procent tokenizovaných uložení, což žádná jiná banka neuvádí.

### Kde cesta končí

Zobrazuje jen tokenizované uložení, zhruba sedmdesát procent případů. U pravidelných předplatných banka sama upozorňuje, že smazání karty nenahrazuje ukončení služby u poskytovatele.

### Co to stojí

Součást účtu, samostatně se neúčtuje.

### Potvrzeno, že nedělají

Nezruší předplatné u obchodníka. Neukazuje netokenizovaná uložení.

*Jak se sami staví.* "Víte, kam vám odcházejí peníze?"

## Česká spořitelna

[rec:R-A6-03]

### Co nabízejí

**Seznam obchodníků s uloženou kartou.** George ukazuje, u kterých obchodníků má klient kartu uloženou.

**Souhlasy s opakovanou platbou.** Vedle uložení je vidět i udělený souhlas s opakovanou platbou.

**Předplatná.** Předplatná se v přehledu objevují jako vlastní položka.

**Historie transakcí u obchodníka.** U daného obchodníka lze zobrazit seznam provedených transakcí.

**Správa inkas na jednom místě.** Aktivní inkasa lze povolit i zrušit přímo v aplikaci.

**Trvalé příkazy.** Trvalý příkaz lze v Georgi nastavit s částkou, frekvencí a splatností.

### Čím se liší

**Tři situace v jednom seznamu.** Uložená karta, souhlas s opakovanou platbou a předplatné jsou na jednom místě.

**Správa inkas přímo v aplikaci.** Aktivní inkasa lze povolit i zrušit.

**Přiznaná nepřesnost.** Banka sama uvádí, že někteří obchodníci nedokážou poskytnout stoprocentně přesný přehled.

### Kde cesta končí

Kartu z aplikace odstranit nelze. Banka sama uvádí, že někteří obchodníci nedokážou z technických důvodů poskytnout stoprocentně přesný přehled transakcí.

### Co to stojí

George je zdarma.

### Potvrzeno, že nedělají

Neodstraní uloženou kartu. Nezablokuje další platbu konkrétnímu obchodníkovi.

*Jak se sami staví.* "George je zdarma, bezpečný a ukáže vám i to, jak si zlepšit finanční zdraví."

## ČSOB

[rec:R-A6-04]

### Co nabízejí

**Obchody a služby s uloženou kartou.** Záložka v sekci Karty ukazuje obchodníky za posledních třináct měsíců.

**Rozlišení jednorázové a opakované platby.** Klient si ověří, zda šlo o nákup nebo o opakovaně účtovanou platbu.

**Zařízení a peněženky.** Samostatná sekce ukazuje, ve kterých telefonech, hodinkách a peněženkách je karta uložena.

**Okno třinácti měsíců.** Zahrnuti jsou i obchodníci, u kterých už byla karta smazána, pokud platba spadá do okna.

**Přehled pod konkrétní kartou.** Seznam je vázaný na kartu, ne na účet.

### Čím se liší

**Nejširší záběr pohledu.** Obchodníci, opakované platby i zařízení a peněženky.

**Třináctiměsíční okno.** Zahrnuje i smazaná uložení, pokud platba spadá do okna.

**Vysoké využití.** Banka uvádí velmi vysoké využití funkce s pozitivním ohlasem.

### Kde cesta končí

Platbu z aplikace zastavit nelze. Okno je třináct měsíců a starší uložení v něm nejsou.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Nezastaví platbu. Neodstraní uloženou kartu u obchodníka.

*Jak se sami staví.* "S ČSOB Smart máte celou banku ve svém mobilu."

## Komerční banka

[rec:R-A6-06]

### Co nabízejí

**Dnes žádná z těchto schopností.** Klient v aplikaci uložené karty ani předplatná nevidí.

**Ohlášená viditelnost registrace karty.** Banka uvedla, že umožní vidět, kde je karta registrovaná.

**Ohlášená správa platby.** Součástí ohlášení je i správa platby.

**Ohlášené pozastavení platby.** Ohlášení zahrnuje možnost platbu pozastavit.

**Ohlášený termín.** Banka uvedla rok 2027.

### Čím se liší

**Jediná bez funkce s konkrétním rokem.** Ohlásila rok 2027, ostatní bez funkce datum neuvádějí.

**Ohlášený rozsah je širší než dnešek Spořitelny.** Zahrnuje správu i pozastavení platby.

**Dnes klient nevidí nic.** Do ohlášeného termínu je výchozí stav prázdný.

### Kde cesta končí

Dnes klient nevidí nic. Ohlášené datum je rok 2027 a co přijde dřív, banka neuvádí.

### Co to stojí

Neuvedeno.

### Potvrzeno, že nedělají

Dnes nic z toho, co srovnání sleduje.

*Jak se sami staví.* "Plánujeme zavést v příštím roce."

## mBank

[rec:R-A6-05]

### Co nabízejí

**Přehled předplatných.** Předplatná jsou v aplikaci i v internetovém bankovnictví.

**Místa s uloženou kartou.** Klient vidí, kde má kartu uloženou.

**Dostupnost ve dvou kanálech.** Přehled je v mobilní aplikaci i v internetovém bankovnictví.

**První na trhu.** Funkci nabídla na jaře 2022, rok před Raiffeisenbank.

**Kategorie předplatného.** Předplatné je vedeno odděleně od běžné platby.

### Čím se liší

**První na českém trhu.** Na jaře 2022, rok před Raiffeisenbank.

**Přehled ve dvou kanálech.** Aplikace i internetové bankovnictví.

**Předplatné jako vlastní kategorie.** Nejde jen o seznam plateb.

### Kde cesta končí

Uloženou kartu smazat nelze.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neodstraní uloženou kartu. Nezablokuje platbu.

*Jak se sami staví.* "Přehled předplatných a uložených karet na jednom místě."

## Moneta Money Bank

[rec:R-A6-02]

### Co nabízejí

**Seznam předplatných navázaných na kartu.** Předplatná jsou v sekci Karty ve Smart Bance i v Internet Bance.

**Blokace dalších plateb obchodníkovi.** Klient zablokuje další platby konkrétnímu obchodníkovi přímo v bankovnictví.

**Dostupnost ve dvou kanálech.** Přehled je v mobilní aplikaci i v internetovém bankovnictví.

**Sekce Karty jako jedno místo.** Přehled není samostatná obrazovka, ale součást správy karet.

**Zachování uložené karty při blokaci.** Blokace zastaví platby a uložení karty tím neruší.

### Čím se liší

**Jediná česká banka s blokací obchodníka.** Srovnání ji uvádí jako jedinou, která zablokuje další platby konkrétnímu obchodníkovi.

**Blokace bez smazání karty.** Karta zůstává uložená a platby přesto neprojdou.

**Přehled ve dvou kanálech.** Smart Banka i Internet Banka.

### Kde cesta končí

Blokace se týká karty, ne smluvního vztahu s obchodníkem. Rozsah mimo karetní platby srovnání neuvádí.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neruší smlouvu s obchodníkem. Nepokrývá inkasa a příkazy ve stejném pohledu.

*Jak se sami staví.* "Přehled a tlačítko pro blokaci."

## Monzo

[rec:R-A6-09]

### Co nabízejí

**Scheduled Payments.** Inkasa, trvalé příkazy a předplatná jsou v jedné sekci záložky Payments.

**Částka, frekvence a předpověď data.** U každé platby je vidět částka, jak často chodí a kdy přijde příště.

**Ruční označení opakované platby.** Klient přepne na detailu transakce přepínač Repeating payment.

**Promítnutí do Summary.** Opakované platby se objeví v Summary jako závazné výdaje.

**Virtuální karty pro zkušební období.** Klient si založí virtuální kartu se samodestrukcí pro bezplatné zkušební období.

### Čím se liší

**Ruční označení opakované platby.** Klient opraví, co aplikace nepoznala, jedním přepínačem.

**Předpověď data a částky.** Aplikace odhaduje příští platbu z té poslední.

**Provázání se závaznými výdaji.** Opakované platby se promítají do rozpočtu, ne jen do seznamu.

### Kde cesta končí

V České republice nepůsobí. Placení z Pot vyžaduje Monzo Plus.

### Co to stojí

Základní přehled je součástí účtu; placení předplatného z Pot vyžaduje placený tarif.

### Potvrzeno, že nedělají

Nezablokuje platbu u obchodníka způsobem, jaký má Revolut.

*Jak se sami staví.* "Manage your bills with Monzo."

## Raiffeisenbank

[rec:R-A6-07]

### Co nabízejí

**Uložené karty v peněženkách.** Přehled ukazuje karty uložené v digitálních peněženkách, hodinkách a prstenech.

**Uložené karty u obchodníků.** Zobrazují se obchodníci, u nichž je uložení tokenizované.

**Click to Pay.** Přehled zahrnuje i uložení v Click to Pay.

**Pozastavení používání u obchodníka.** Používání karty u konkrétního obchodníka lze pozastavit a karta zůstává uložená.

**Tokenizované podčíslo karty.** Pro každého obchodníka vzniká jedinečné podčíslo, které nelze použít jinde.

**Ohlášená předplatná.** Zobrazení předplatných a obchodníků s opakovanou platbou banka teprve plánuje.

### Čím se liší

**Pozastavení u obchodníka bez smazání karty.** Funkčně blízko blokaci, kterou má Moneta.

**Pokrytí peněženek i nositelné elektroniky.** Hodinky a prsteny jsou v přehledu jmenovitě.

**Druhá na trhu.** Na jaře 2023, rok po mBank.

### Kde cesta končí

Předplatná a seznam obchodníků s opakovanou platbou teprve plánuje. Netokenizovaná uložení nevidí.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neukazuje předplatná jako samostatnou kategorii. Nepokrývá netokenizovaná uložení.

*Jak se sami staví.* "Tokenizace vytvoří pro každého obchodníka jedinečné podčíslo karty, které nelze zneužít pro jinou platbu."

## Revolut

[rec:R-A6-08]

### Co nabízejí

**Sekce Subscriptions.** Opakované platby a inkasa provedená kartou jsou v záložce Payments.

**Útrata u obchodníka.** Klient vidí, kolik utrácí za každou naplánovanou platbu a u každého obchodníka.

**Blokace a odblokování.** Platbu i obchodníka lze kdykoli v platebním cyklu zablokovat a zase povolit.

**Upozornění před splatností.** Klient dostane upozornění, než platba odejde.

**Upozornění na nedostatek prostředků.** Aplikace upozorní, když na naplánovanou platbu nebudou peníze.

**Doplnění detekce uživateli.** Co aplikace nerozpozná, může klient označit sám.

### Čím se liší

**Jediný s upozorněním před splatností.** Ostatní účastníci upozornění před platbou neuvádějí.

**Blokace na úrovni platby i obchodníka.** Dvě úrovně místo jedné.

**Detekce doplňovaná uživateli.** Crowdsourcing pokrývá to, co algoritmus nerozpozná.

### Kde cesta končí

Blokace se týká platby, ne smlouvy s obchodníkem. Pokrytí detekce se opírá o crowdsourcing, což znamená, že bez zásahu uživatelů není úplné.

### Co to stojí

Součást účtu, samostatně se neúčtuje.

### Potvrzeno, že nedělají

Nezruší smlouvu s obchodníkem za klienta.

*Jak se sami staví.* "Smart subscriptions you control."

## Starling Bank

[rec:R-A6-10]

### Co nabízejí

**Opakované platby na jednom místě.** Inkasa, trvalé příkazy a předplatná v jediném pohledu na obrazovce plateb.

**Bills Manager.** Závazky se platí z vyhrazeného Space, kam se peníze odloží ve výplatní den.

**Výběr, co se platí ze Space.** Klient si vybere, která inkasa a příkazy se ze Space hradí.

**Automatický převod ve výplatní den.** Peníze na závazky se odkládají samy.

**Jednotný pohled napříč typy.** Tři druhy opakované platby nejsou tři obrazovky.

### Čím se liší

**Tři druhy opakované platby v jednom pohledu.** Inkasa, příkazy a předplatná se nedělí na obrazovky.

**Peníze na závazky se odkládají samy.** Bills Manager převede částku ve výplatní den.

**Klient si vybere, co se ze Space platí.** Ne všechny závazky musí jít stejnou cestou.

### Kde cesta končí

V České republice nepůsobí. Blokaci konkrétního obchodníka materiál neuvádí.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neblokuje obchodníka. Nedetekuje předplatné mimo inkasa a příkazy způsobem, jaký popisuje Revolut.

*Jak se sami staví.* "Direct debits, standing orders and subscriptions all in a single view, because banking should be simple."

## Air Bank

[rec:R-A6-01]

### Co nabízejí

Přehled uložených karet a předplatných přímo v mobilní aplikaci, s historií plateb u každého obchodníka a možností uloženou kartu odstranit.

### Čím se liší

Jediná česká banka, která u obchodníka umožní uloženou kartu smazat. Filtruje podle konkrétní karty a ukazuje historii plateb.

### Kde cesta končí

Zobrazuje jen tokenizované uložení, zhruba sedmdesát procent případů. U pravidelných předplatných banka sama upozorňuje, že smazání karty nenahrazuje ukončení služby u poskytovatele.

### Co to stojí

Součást účtu, samostatně se neúčtuje.

### Potvrzeno, že nedělají

Nezruší předplatné u obchodníka. Neukazuje netokenizovaná uložení.

*Jak se sami staví.* "Víte, kam vám odcházejí peníze?"

## Česká spořitelna

[rec:R-A6-03]

### Co nabízejí

V Georgi seznam obchodníků, u kterých má klient uloženou kartu, souhlas s opakovanou platbou nebo předplatné, s historií transakcí u daného obchodníka.

### Čím se liší

Pokrývá tři situace v jednom seznamu: uloženou kartu, souhlas s opakovanou platbou a předplatné. Inkasa lze spravovat na jednom místě.

### Kde cesta končí

Kartu z aplikace odstranit nelze. Banka sama uvádí, že někteří obchodníci nedokážou z technických důvodů poskytnout stoprocentně přesný přehled transakcí.

### Co to stojí

George je zdarma.

### Potvrzeno, že nedělají

Neodstraní uloženou kartu. Nezablokuje další platbu konkrétnímu obchodníkovi.

*Jak se sami staví.* "George je zdarma, bezpečný a ukáže vám i to, jak si zlepšit finanční zdraví."

## ČSOB

[rec:R-A6-04]

### Co nabízejí

V ČSOB Smart sekce Karty se záložkou Obchody a služby s uloženou kartou, seznam obchodníků za posledních třináct měsíců, plus sekce Zařízení a peněženky.

### Čím se liší

Nejširší záběr pohledu ze srovnávaných českých bank: obchodníci, opakované platby i to, ve kterých telefonech, hodinkách a peněženkách je karta uložena.

### Kde cesta končí

Platbu z aplikace zastavit nelze. Okno je třináct měsíců a starší uložení v něm nejsou.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Nezastaví platbu. Neodstraní uloženou kartu u obchodníka.

*Jak se sami staví.* "S ČSOB Smart máte celou banku ve svém mobilu."

## Komerční banka

[rec:R-A6-06]

### Co nabízejí

Funkci dnes nenabízí. Ohlásila ji na rok 2027 s tím, že umožní vidět, kde je karta registrovaná, a platbu spravovat nebo pozastavit.

### Čím se liší

Jediná z bank bez funkce, která uvedla konkrétní rok. Ohlášený rozsah je širší než to, co dnes umí Česká spořitelna.

### Kde cesta končí

Dnes klient nevidí nic. Ohlášené datum je rok 2027 a co přijde dřív, banka neuvádí.

### Co to stojí

Neuvedeno.

### Potvrzeno, že nedělají

Dnes nic z toho, co srovnání sleduje.

*Jak se sami staví.* "Plánujeme zavést v příštím roce."

## mBank

[rec:R-A6-05]

### Co nabízejí

Přehled předplatných a míst, kde má klient uloženou kartu, v aplikaci i v internetovém bankovnictví.

### Čím se liší

Byla první na českém trhu, na jaře 2022, tedy rok před Raiffeisenbank a dřív než ostatní.

### Kde cesta končí

Uloženou kartu smazat nelze.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neodstraní uloženou kartu. Nezablokuje platbu.

*Jak se sami staví.* "Přehled předplatných a uložených karet na jednom místě."

## Moneta Money Bank

[rec:R-A6-02]

### Co nabízejí

Seznam předplatných navázaných na platební kartu ve Smart Bance a Internet Bance, v sekci Karty.

### Čím se liší

Jediná z českých bank v srovnání, která umožní zablokovat další platby konkrétnímu obchodníkovi přímo v bankovnictví.

### Kde cesta končí

Blokace se týká karty, ne smluvního vztahu s obchodníkem. Rozsah mimo karetní platby srovnání neuvádí.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neruší smlouvu s obchodníkem. Nepokrývá inkasa a příkazy ve stejném pohledu.

*Jak se sami staví.* "Přehled a tlačítko pro blokaci."

## Monzo

[rec:R-A6-09]

### Co nabízejí

V záložce Payments sekce Scheduled Payments: inkasa, trvalé příkazy a další opakované platby, s částkou, frekvencí a předpovědí data další platby.

### Čím se liší

Klient může platbu ručně označit jako opakovanou přepínačem na detailu transakce. Opakované platby se promítají do Summary jako závazné výdaje.

### Kde cesta končí

V České republice nepůsobí. Placení z Pot vyžaduje Monzo Plus.

### Co to stojí

Základní přehled je součástí účtu; placení předplatného z Pot vyžaduje placený tarif.

### Potvrzeno, že nedělají

Nezablokuje platbu u obchodníka způsobem, jaký má Revolut.

*Jak se sami staví.* "Manage your bills with Monzo."

## Raiffeisenbank

[rec:R-A6-07]

### Co nabízejí

Přehled uložených digitálních kopií karty: v peněženkách, v Click to Pay a u obchodníků, pokud je uložení tokenizované. Používání u konkrétního obchodníka lze pozastavit.

### Čím se liší

Pozastavení u obchodníka je funkčně blízko blokaci, kterou má Moneta, a karta přitom zůstává uložená.

### Kde cesta končí

Předplatná a seznam obchodníků s opakovanou platbou teprve plánuje. Netokenizovaná uložení nevidí.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neukazuje předplatná jako samostatnou kategorii. Nepokrývá netokenizovaná uložení.

*Jak se sami staví.* "Tokenizace vytvoří pro každého obchodníka jedinečné podčíslo karty, které nelze zneužít pro jinou platbu."

## Revolut

[rec:R-A6-08]

### Co nabízejí

Funkce Subscriptions v záložce Payments: kolik klient utrácí za každou naplánovanou platbu a u každého obchodníka, s možností platbu kdykoli zablokovat a odblokovat.

### Čím se liší

Jediný účastník, který upozorňuje před splatností a zároveň upozorní, když na platbu nebudou peníze. Detekci doplňuje označení od uživatelů, takže co aplikace nepozná, doplní klient.

### Kde cesta končí

Blokace se týká platby, ne smlouvy s obchodníkem. Pokrytí detekce se opírá o crowdsourcing, což znamená, že bez zásahu uživatelů není úplné.

### Co to stojí

Součást účtu, samostatně se neúčtuje.

### Potvrzeno, že nedělají

Nezruší smlouvu s obchodníkem za klienta.

*Jak se sami staví.* "Smart subscriptions you control."

## Starling Bank

[rec:R-A6-10]

### Co nabízejí

Opakované platby na jednom místě: inkasa, trvalé příkazy a předplatná v jediném pohledu na obrazovce plateb.

### Čím se liší

Sloučení tří druhů opakovaných plateb do jednoho pohledu je přesně ta úplnost, kterou linka v materiálu tohoto běhu nemá. Bills Manager k tomu přidává vyhrazený Space, ze kterého se závazky platí.

### Kde cesta končí

V České republice nepůsobí. Blokaci konkrétního obchodníka materiál neuvádí.

### Co to stojí

Součást účtu.

### Potvrzeno, že nedělají

Neblokuje obchodníka. Nedetekuje předplatné mimo inkasa a příkazy způsobem, jaký popisuje Revolut.

*Jak se sami staví.* "Direct debits, standing orders and subscriptions all in a single view, because banking should be simple."

## Co se nepodařilo zjistit

Kolik klientů funkci u kterékoli z bank používá, neuvádí žádný zdroj. Srovnání uvádí, co banky umějí, ne kolik lidí to otevře.

Pokrytí tokenizace uvádí jen Air Bank a jen přibližně, zhruba sedmdesát procent. Ostatní banky číslo neuvádějí, takže se nedá srovnat a nedá se z něj usuzovat na trh.

U Komerční banky a Raiffeisenbank je rozsah ohlášený, ne pozorovaný. Zda dorazí v ohlášeném termínu, se z veřejného materiálu zjistit nedá.

U Monzo a Starling nelze ověřit, zda by jejich řešení fungovalo na českých platebních tocích. Ani jedna v ČR nepůsobí a inkasa i trvalé příkazy mají v britském prostředí jinou podobu.

## Jak to vzniklo

Krok 3.2, `deep-dive`, agent `competitive-analysis`. Deset karet, jeden záznam na účastníka, každý se šesti nebo více nezávislými vydavateli a alespoň jedním primárním zdrojem.

**Přenos do tohoto dokumentu udělal skript, ne model.** Autorské jsou tři části: úvod, tato dvojice závěrečných sekcí a nic mezi nimi. Vše ostatní je doslovná kopie souborů z `parts/`.

Výzkum proběhl pod testovacím cílem, protože žádný schválený vyhledávací cíl ČS není pojmenován. `egress_basis: pilot-test` to nese na dokumentu.
