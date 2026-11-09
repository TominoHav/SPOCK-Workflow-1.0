---
run_id: 2026-09-spending-insights
artifact_id: A5
ost_role: none
status: accepted
workflow: competitive-analysis
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "authored only from the quarantine bridge's structured extract, never from raw external text"
    needs: judge
    reach: process
  - rule: "a query names the market, the category and public competitors, and carries no wording from the brief, the problem material or any artifact of this run"
    needs: judge
    reach: artifact
standards_basis: current
egress_basis: pilot-test
produced_by:
  agent: competitive-analysis
  skill: landscape-mapping
sources: [A1, A4, A3b]
external_sources:
  - S-mesec-prehled-2026
  - S-airbank-predplatna
  - S-airbank-ulozene-karty
  - S-penize-moneta
  - S-revolut-subscriptions
  - S-monzo-bills
  - S-starling-recurring
  - S-tapix-banks
assembled_at: 2026-08-28
assembled_from: [R-A5-01]
---

# Competitive analysis | Mapa trhu: přehled opakovaných plateb

Přehled předplatných přestal být na českém trhu odlišujícím prvkem. Čtyři z třinácti bank jej mají, dvě jej ohlásily s datem a jedna z nich uvádí rok 2027. **Rozsah funkce se štěpí na tři úrovně a české banky se dělí přesně podle nich**: ukázat obchodníka, odstranit uloženou kartu, zablokovat další platbu. Česká spořitelna je na první z nich. [rec:R-A5-01]

Šestnáct účastníků pojmenováno, deset vybráno k hloubkovému zkoumání, devět pohybů trhu napříč třemi třídami. Dva ze šesti nevybraných jsou chování, ne organizace.

## Trh, který jsme zkoumali

Hledání začalo u českých bank, protože segment je český, a rozšířilo se na evropské neobanky působící v ČR a na britské, které tuto funkci zavedly nejdřív. Šestnáct účastníků je pojmenováno, deset vybráno k hloubkovému zkoumání.

## Kam se trh posouvá

**Obchodní.** **TB1** Přehled předplatných se z odlišujícího prvku stává základní výbavou. **TB2** Banky, které funkci nemají, ji ohlašují s datem místo aby mlčely. **TB3** Rozsah funkce se štěpí na tři úrovně: ukázat, odstranit uloženou kartu, zablokovat další platbu.

**Technologické.** **TT1** Tokenizace karty je nosič, na kterém přehled stojí, a pokrytí není úplné. **TT2** Obohacování transakčních dat u třetí strany je běžná cesta ke jménu obchodníka. **TT3** Detekce opakování se doplňuje ručním označením od klienta.

**Regulatorní.** **TR1** Přístupnost digitálních rozhraní pro spotřebitelské bankovní služby. **TR2** Profilování a automatizované zpracování osobních údajů. **TR3** Silné ověření klienta u karetních plateb a výjimky pro opakované transakce.

## Kdo na něm působí

| | Účastník | Typ | Postavení | Kdo to je |
|---|---|---|---|---|
| `airbank.cz` | Air Bank | direct | innovator | Česká retailová banka, funkci zavedla a sama ji oznámila |
| `moneta.cz` | Moneta Money Bank | direct | innovator | Česká retailová banka, funkci zavedla |
| `csas.cz` | Česká spořitelna | direct | leader | Česká retailová banka, zadavatel tohoto běhu |
| `csob.cz` | ČSOB | direct | leader | Česká retailová banka, největší podle počtu klientů |
| `mbank.cz` | mBank | direct | leader | Česká retailová banka |
| `kb.cz` | Komerční banka | direct | leader | Česká retailová banka |
| `rb.cz` | Raiffeisenbank | direct | leader | Česká retailová banka |
| `revolut.com` | Revolut | adjacent | innovator | Evropská neobanka působící v ČR |
| `monzo.com` | Monzo | adjacent | innovator | Britská neobanka, v ČR nepůsobí |
| `starlingbank.com` | Starling Bank | adjacent | innovator | Britská neobanka, v ČR nepůsobí |
| `tapix.io` | Tapix by Dateio | substitute | innovator | Dodavatel obohacení transakčních dat, ne banka |
| `substitute:contact-centre-call` | Zavolat na linku banky | substitute | leader | Co klient dělá dnes, když funkci nemá |
| `substitute:manual-statement-review` | Projít si vlastní výpisy | substitute | leader | Druhá věc, kterou klient dělá dnes |
| `fio.cz` | Fio banka | direct | leader | Česká retailová banka |
| `creditas.cz` | Banka Creditas | direct | leader | Česká retailová banka |
| `unicreditbank.cz` | UniCredit Bank | direct | leader | Česká retailová banka |

## Koho jsme zkoumali podrobně a proč

**Air Bank** (`airbank.cz`, direct). Nejúplnější česká implementace: ukazuje obchodníky, historii plateb a umožňuje uloženou kartu odstranit.

**Moneta Money Bank** (`moneta.cz`, direct). Jediná česká banka, která podle srovnání umožní zablokovat další platbu konkrétnímu obchodníkovi.

**Česká spořitelna** (`csas.cz`, direct). Vlastní výchozí stav. Ukazuje obchodníky a historii, kartu odstranit neumí.

**ČSOB** (`csob.cz`, direct). Ukazuje uložené karty, opakované platby i zařízení, zastavit platbu neumí.

**mBank** (`mbank.cz`, direct). Ukazuje přehled předplatných a uložené karty, smazat je neumí.

**Komerční banka** (`kb.cz`, direct). Funkci nemá a ohlásila ji na rok 2027. Ohlášené datum je fakt o trhu.

**Raiffeisenbank** (`rb.cz`, direct). Ukazuje tokenizované karty a umí pozastavit používání u obchodníka; předplatná teprve plánuje.

**Revolut** (`revolut.com`, adjacent). Nejdále ze všech: vidí, upozorňuje předem a umožní zablokovat obchodníka i jednotlivou platbu.

**Monzo** (`monzo.com`, adjacent). Referenční implementace. Zavedla ruční označení opakované platby a předpověď další částky.

**Starling Bank** (`starlingbank.com`, adjacent). Sloučila inkasa, trvalé příkazy a předplatná do jednoho pohledu, což je přesně ta úplnost, kterou linka nemá.

**Šest účastníků vybráno nebylo a každý nese důvod.**

**Tapix by Dateio** (`tapix.io`). Není konkurent, je to cesta, kterou banka jméno obchodníka získává. Profilován není, protože nesoutěží o téhož klienta.

**Zavolat na linku banky** (`substitute:contact-centre-call`). Je to chování, ne organizace. Nikdo o něm nepublikuje primární materiál a nikdy nebude.

**Projít si vlastní výpisy** (`substitute:manual-statement-review`). Totéž. Chování, ne organizace.

**Fio banka** (`fio.cz`). Funkci nemá a je ve vývoji bez data. Prostor pro hloubkovou kartu vyčerpal Komerční banka, která ohlásila datum.

**Banka Creditas** (`creditas.cz`). Správu tokenů plánuje do konce roku 2026. Menší podíl na retailu než vybraná sedmička.

**UniCredit Bank** (`unicreditbank.cz`). Funkci nemá a neohlásila ji. Zastoupena v trendu TB2 spolu s ostatními.

## Co se nepodařilo zjistit

Kolik českých klientů funkci používá, neuvádí žádný zdroj. Srovnání na Měšci uvádí, co banky umějí, ne kolik lidí to otevře.

Pokrytí tokenizace uvádí jen Air Bank a jen přibližně, zhruba sedmdesát procent. Ostatní banky číslo neuvádějí a nelze je proto srovnat.

Zda některá z ohlášených funkcí Komerční banky nebo Raiffeisenbank dorazí v ohlášeném termínu, se z veřejného materiálu zjistit nedá.

## Jak to vzniklo

Krok 3.1, `landscape-mapping`, agent `competitive-analysis`. Hledání proběhlo přes vlastní vyhledávací schopnost substrátu, protože žádný schválený vyhledávací cíl ČS není v `egress.yaml` pojmenován. **Výzkum provedený pod testovacím cílem není výzkum provedený pod schváleným**, a `egress_basis: pilot-test` to nese.

Pořadí hledání je standardů, ne zadání: bankovnictví před fintechem, pak lokálně, CEE, evropsky a globálně, dokud není profilovatelný počet účastníků.
