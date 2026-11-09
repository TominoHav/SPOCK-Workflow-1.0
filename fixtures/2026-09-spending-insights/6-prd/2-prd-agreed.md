---
run_id: 2026-09-spending-insights
artifact_id: A13
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
could_not_verify: []
produced_by:
  agent: business-analyst
  skill: prd
sources: [A12, A11, A4]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A13-01]
decision:
  gate: G6
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
---

# Discovery | PRD, odsouhlaseno: upozornění na karetní předplatné


**Pilot posílá klientovi zprávu tři dny před strhnutím karetního předplatného, a zrušit ji může stávající cestou.** Deset požadavků, tři měřítka úspěchu a čtrnáct regulatorních oblastí převzatých z rozpracovaného MVP. [rec:R-A13-01]

Nejde o definici celého řešení. Je to definice jedné varianty MVP a netýká se trvalých příkazů ani inkas.

## Přehled

Tento dokument definuje pilot **OPT-A z A11**: zpráva, která klientovi přijde tři dny před strhnutím karetního předplatného. Je to definice jedné varianty MVP, ne celého řešení, a nepokrývá trvalé příkazy ani inkasa.

Čtenář mimo tento běh potřebuje vědět tři věci. Klient dnes o opakované platbě zjistí až z výpisu. Pilot ten okamžik posouvá před strhnutí. Nic na tom, jak platba probíhá, se nemění.

## Problém

Dvě prioritní příležitosti z A4, obě s vlastní značkou důvěry.

**Klient nevidí, co se mu pravidelně strhává** (`O1`, značka `corroborated`). Vychází z intake záznamu a je doložená ve třech nezávislých zdrojích.

**Klient nemá kde platbu zastavit dřív, než proběhne** (`O2`, značka `single_source`). Stojí na jednom zdroji a značka to říká; pilot ji zároveň ověřuje.

## Uživatelé

Retailoví klienti s běžným účtem a aspoň jedním aktivním karetním předplatným, kteří používají mobilní aplikaci.

Jejich situace, ne persona: platí měsíčně za služby, které si zřídili kdykoli v minulosti, o části z nich už neuvažují a o strhnutí se dozvídají zpětně. Popis je z briefu a z prioritních příležitostí, nevznikl zde.

## Měřítka úspěchu

| Měřítko | Výchozí stav | Horizont | Vlastník | Kritérium zastavení |
|---|---|---|---|---|
| Podíl klientů, kteří zprávu otevřou | 0 %, zpráva neexistuje | krátkodobý, 1 až 3 měsíce | Igor Tadić | pod 20 % otevření znamená, že zpráva nedoputuje nebo nezajímá |
| Podíl klientů, kteří do strhnutí platbu zruší nebo změní | není znám | krátkodobý, 1 až 3 měsíce | Igor Tadić | pod 2 % znamená, že informace nevede k akci a hlubší varianta OPT-C by na tom nic nezměnila |
| Podíl klientů, kteří si upozornění vypnou | není znám | krátkodobý, 1 až 3 měsíce | Igor Tadić | nad 15 % znamená, že zpráva obtěžuje víc, než pomáhá |

**Druhé měřítko rozhoduje.** První říká, že zpráva doputovala; teprve druhé říká, že k něčemu je.

Výchozí stav u druhého a třetího měřítka nikdo nedodal, a je to uvedeno spíš než vymyšleno.

## Požadavky

### R1: Rozpoznání opakované platby

Systém označí kartu klienta platbou, která se opakuje aspoň třikrát u téhož obchodníka v pravidelném intervalu. Klasifikaci provádí dodavatel a banka mu předává transakční historii pilotní skupiny.

Označení je automatické vyhodnocení a nepřipojuje se k němu žádné rozhodnutí s právním účinkem. Ověřitelné: pro vzorek sta karet lze porovnat označení proti ručnímu vyhodnocení.

### R2: Zpráva tři dny před strhnutím

Systém pošle zprávu 72 hodin před očekávaným datem strhnutí, v aplikaci i jako push zprávu. Kde je očekávané datum blíž než 72 hodin, zpráva se neposílá.

Ověřitelné: u každé odeslané zprávy lze porovnat čas odeslání s datem strhnutí.

### R3: Obsah zprávy

Zpráva nese částku v korunách, jméno obchodníka tak, jak je na výpisu, a datum strhnutí. Je česky a je srozumitelná bez otevírání detailu.

Text schvaluje útvar klientské komunikace před spuštěním. Ověřitelné: znění je jedno a lze ho porovnat se schváleným.

### R4: Cesta ze zprávy do detailu platby

Ze zprávy vede právě jedna akce: otevřít detail platby. Detail je stávající obrazovka a pilot ji nemění.

Ověřitelné: zpráva nenese žádné jiné tlačítko.

### R5: Vypnutí upozornění

Klient může upozornění vypnout jedním přepínačem v nastavení aplikace. Vypnutí je okamžité a platí pro všechna karetní předplatná.

Ověřitelné: po vypnutí nesmí odejít žádná další zpráva.

### R6: Vymezení pilotní skupiny

Zpráva chodí pouze klientům, kteří jsou v pilotní skupině: retail, běžný účet, aspoň jedno aktivní karetní předplatné, aktivní mobilní aplikace.

Ověřitelné: skupinu lze dotázat v datech a počet klientů v ní zjistit.

### R7: Zrušené předplatné mezi zprávou a strhnutím

Pokud klient předplatné zruší po odeslání zprávy a před datem strhnutí, systém neposílá nic dalšího a neopravuje odeslanou zprávu.

Ověřitelné: pro tyto případy nesmí existovat druhá zpráva.

### R8: Historie odeslaných zpráv

Každá odeslaná zpráva se ukládá do historie zpráv v aplikaci a klient se k ní může vrátit.

Ověřitelné: počet zpráv v historii odpovídá počtu odeslaných.

### R9: Kontrola přístupnosti

Zpráva i historie zpráv projdou kontrolou přístupnosti podle EAA před spuštěním pilotu.

Ověřitelné: kontrola má výstup a ten buď existuje, nebo ne.

### R10: Informování o novém účelu zpracování

Před spuštěním pilotu je nový účel zpracování popsán v aplikaci a v zásadách zpracování osobních údajů.

Ověřitelné: text existuje a je dostupný z aplikace.

## Nefunkční požadavky

**Doručení.** Zpráva odchází v okně mezi 9:00 a 20:00. Zpráva, jejíž okno vyprší, se neposílá vůbec.

**Ochrana údajů.** Dodavatel dostává transakční historii pouze pilotní skupiny a pouze za posledních dvanáct měsíců. Rozsah předávaných dat je vymezený a nemění se během pilotu.

**Přístupnost.** Zpráva i historie splňují EAA. Hloubka, na kterou tento pilot dosáhne, je kontrola před spuštěním, ne průběžné měření.

**Dostupnost.** Výpadek klasifikace znamená, že zpráva neodejde. Neznamená to, že odejde s chybnými údaji.

## Mimo rozsah

**Trvalé příkazy a inkasa.** Zvažovány jako OPT-B a vyřazeny rozhodnutím G5a: pilot na jednom druhu platby odpoví na otázku dřív a levněji.

**Zrušení platby přímo ze zprávy.** Zvažováno jako OPT-C a vyřazeno stejným rozhodnutím. Je to samostatná otázka a pilot, který přidá obojí, neřekne, co fungovalo.

**Blokace u obchodníka.** Byla variantou I4 ve fázi 4, získala nejnižší skóre a nepokračuje.

Není zde seznam všeho, co produkt není. Jsou zde tři věci, o kterých se rozhodovalo.

## Závislosti

**Dodavatel klasifikace transakcí.** Není vybrán. Bez něj nelze rozpoznat opakovanou platbu a celý pilot na tom stojí.

**Rozhodnutí pověřence, zda je potřeba posouzení vlivu.** Drží pověřenec pro ochranu osobních údajů, termín před spuštěním pilotu.

**Rozhodnutí ICT rizik, zda je klasifikace kritická funkce podle DORA.** Drží útvar ICT rizik, termín před výběrem dodavatele.

**Smlouva s dodavatelem.** Drží právní útvar, termín před výběrem dodavatele.

**Stanovisko Compliance ke střetům a k distribučnímu řetězci.** Drží Compliance, termín před výběrem dodavatele.

**Počet klientů v pilotní skupině.** Vymezení existuje, číslo za ním ne, a data ho umí dodat.

## Co se nepodařilo zjistit

Výchozí stav u dvou ze tří měřítek úspěchu. Nikdo nedodal, kolik klientů dnes opakovanou platbu ruší ani kolik by si upozornění vypnulo, a odhad by byl vymyšlené číslo.

Zda dodavatel dokáže označit karetní předplatné spolehlivě. Žádný dodavatel není vybrán a přesnost klasifikace je předpoklad, na kterém stojí R1 a přes něj všechno ostatní.

Zda je 72 hodin správný předstih. Číslo je volba tohoto dokumentu, ne zjištění, a pilot ho neověřuje.

## Jak to vzniklo

Krok 6.1, `prd`, agent `business-analyst`. Čte návrh z A12, rozpracované MVP z A11 a prioritní příležitosti z A4.

Osm sekcí šablony PRD, všechny přítomné. Deset požadavků, každý s vlastní sekcí a s tím, z čeho vychází. Proti návrhu se nezměnil žádný požadavek ani žádné měřítko.

Blok souhlasu vyplnil Igor Tadić 28. srpna 2026. To je jediná část dokumentu, kterou agent nepsal.
