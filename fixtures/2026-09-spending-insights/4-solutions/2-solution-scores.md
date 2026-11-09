---
run_id: 2026-09-spending-insights
artifact_id: A8b
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: product-owner
  skill: idea-scoring
sources: [A8, A8c, A2b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A8b-01]
---

# Discovery | Skóre variant: opakované platby

**Tři varianty z pěti mají silné napojení na strategii, jedna slabé.** Skóruje se jedna dílčí dimenze ze sedmi na straně přínosu a žádná na straně obtížnosti. [rec:R-A8b-01]

Osy se nesčítají. Přínos a obtížnost odpovídají na dvě různé otázky a jedno číslo z nich by neodpovědělo na žádnou.

## Srovnání

| Varianta | Přínos | Pásmo | Klíčový výsledek | Obtížnost |
|---|---|---|---|---|
| **I2** Upozornění před platbou | **30 / 30** | Silné | SHD-1 | neobodováno / 40 |
| **I3** Jeden pohled na tři druhy plateb | **30 / 30** | Silné | NOM-4 | neobodováno / 40 |
| **I5** Odpověď bez volání na linku | **30 / 30** | Silné | AI-2 | neobodováno / 40 |
| **I1** Přehled v aplikaci | **20 / 30** | Střední | SHD-1 | neobodováno / 40 |
| **I4** Blokace u obchodníka | **10 / 30** | Slabé | AI-2 | neobodováno / 40 |

**Skóruje se síla řetězu, ne velikost pohybu.** Varianta s cílem "zvýšíme počet digitálně obsloužených klientů o deset procent" neskóruje výš než varianta bez cíle. Pásmo se ptá, kolik pojmenovaných kroků leží mezi produktovou metrikou a klíčovým výsledkem a zda některý z nich stojí na domněnce.

**Tři varianty stojí na třiceti a je to výsledek, ne remíza k rozseknutí.** Vede k nim jiná cesta a k jinému klíčovému výsledku; pásmo měří kvalitu napojení, a tři varianty ho mají stejně dobré.

Obtížnostní stranu drží `CR-C6`. Dokud kteroukoli ze čtyř regulatorních oblastí nekryje karta od ČS, žádná hodnota nevzniká, a karty pro GDPR, právo a ICT psal tento tým. Pořadí bez čísla je v screeningu variant o dokument dříve: I5 nese nejmíň, I4 nejvíc, tři zobrazovací varianty leží mezi nimi.

## I1: Přehled opakovaných plateb v aplikaci

**20 / 30, střední.** Produktová metrika je počet klientů, kteří si přehled měsíčně otevřou. Řetěz k SHD-1, pravidelná relevantní interakce, vede přes jeden pojmenovaný mezikrok: otevřený přehled se za takovou interakci počítá. Ten krok drží, a je to krok navíc.

Obtížnost neobodována, jmenovatel 40.

## I2: Upozornění před platbou

**30 / 30, silné.** Produktová metrika je počet klientů, kteří na upozornění zareagují. Banka zprávu posílá a klient na ni odpovídá, což je SHD-1 v jednom kroku a dá se to říct jednou větou.

Obtížnost neobodována, jmenovatel 40.

## I3: Jeden pohled na tři druhy plateb

**30 / 30, silné.** Produktová metrika je počet klientů, kteří opakovanou platbu změní nebo zruší v aplikaci. Změna trvalého příkazu nebo inkasa provedená v aplikaci je přijetí cílového kanálu pro úkol, který se dnes dělá jinde, což je NOM-4 v jednom kroku.

Obtížnost neobodována, jmenovatel 40.

## I4: Blokace u obchodníka

**10 / 30, slabé.** Produktová metrika je počet klientů, kteří blokaci použijí. Cesta k AI-2 existuje, ale opírá se o krok, pro který nikdo nemá doklad: aby byl proces plně automatický, musí blokaci uznat i karetní schéma a obchodník. Nikdo to zatím neověřil.

Obtížnost neobodována, jmenovatel 40. Ze screeningu variant je to zároveň varianta, která nese regulatorně nejvíc.

## I5: Odpověď bez volání na linku

**30 / 30, silné.** Produktová metrika je počet dotazů k opakovaným platbám vyřešených v aplikaci bez kontaktu s linkou. Dotaz vyřešený celý v aplikaci je plně automatický servisní proces v primárním digitálním kanálu, což je AI-2 v jednom kroku.

Obtížnost neobodována, jmenovatel 40. Ze screeningu variant je to zároveň varianta, která nese regulatorně nejmíň.

## Co se nepodařilo zjistit

**Pět dílčích dimenzí ze sedmi je odloženo** a v tomto dokumentu se neobjevují ani jako prázdná řádka: soulad příležitosti a řešení, tržní odlišení, inovační příležitost, technická náročnost a provozní změna. Odložil je Igor Tadić 21. srpna 2026, protože pro ně neexistuje pásmo, a jmenovatel je proto 30 a 40, ne 100 a 100.

Odložené není totéž co neobodované. Odložené je fakt o stavbě, uvedený jednou; neobodované je fakt o tomto běhu, uvedený u varianty, které se týká.

Číslo spočítané přes jednu krytou regulatorní oblast a tři nekryté by byla odpověď na čtvrtinu otázky vydávaná za odpověď na celou. Nevyrobit nic je vratné, vyrobit sebejistou čtvrtinu není.

## Jak to vzniklo

Krok 4.3, `idea-scoring`, agent `product-owner`. Pásma přínosu drží `strategy-basis`, pásma obtížnosti `compliance-guidelines`. Jmenovatele nikdo nenapsal ručně, jsou součtem vah v modelu.
