---
run_id: 2026-09-spending-insights
artifact_id: A11
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "every compliance touchpoint is addressed in functionality, not merely listed"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: mvp-expansion
sources: [A10, A9, A8c, A1b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A11-01]
decision:
  gate: G5b
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
---

# Discovery | Rozpracované MVP: upozornění na karetní předplatné

**Vybrána je OPT-A.** Klient s aktivním karetním předplatným dostane tři dny před strhnutím zprávu, a zrušit ji může stávající cestou v detailu platby. [rec:R-A11-01]

Čtrnáct regulatorních oblastí, které screening postavil do hry, je níže navázaných na něco konkrétního v tomto dokumentu: sedm jako požadavek, pět jako otevřená položka s vlastníkem, dvě jako zúžené pryč.

## Co to je

Zpráva před strhnutím karetního předplatného. Chodí tři dny předem, v aplikaci i jako push, a nese částku, jméno příjemce a datum.

Pilot běží na vymezené retailové skupině: klienti s aktivním karetním předplatným na běžném účtu. Netýká se trvalých příkazů ani inkas.

## Jak to funguje

Klasifikaci, které platby jsou opakované, dělá dodavatel. Banka mu předává transakční historii pilotní skupiny a dostává zpět označení, které platby jsou karetní předplatné a kdy se strhne další.

Ze zprávy vede jedna akce: otevřít detail platby. **Zrušit nebo změnit se dá až tam, běžnou cestou, kterou aplikace už má.** Pilot nepřidává žádnou novou obrazovku, na které by se s penězi něco dělo.

Zpráva nemění nic na tom, jak platba probíhá. Pokud klient nic neudělá, platba se strhne tak jako dosud.

## Co pilot ověřuje

Jestli klient, který se o platbě dozví předem, s ní něco udělá. To je celá otázka.

Měří se dvě věci: kolik klientů zprávu otevře a kolik z nich do strhnutí platbu zruší nebo změní. Druhé číslo je to, které rozhodne, jestli má smysl pokračovat.

**Neověřuje se, jestli klienti chtějí upozornění na všechny tři druhy plateb.** Na to odpovídá OPT-B, která nebyla vybrána.

## Co to znamená pro strategii

Zpráva, kterou banka posílá a na kterou klient odpovídá, je pravidelná relevantní interakce. Zrušení platby v aplikaci místo volání na linku je obsluha v digitálním kanálu.

**Obě napojení nesou značku `indicative_unverified_strategy`.** Tělo `strategy-basis` existuje a nese pásma, ale konkrétní vazbu pilotu na klíčový výsledek nikdo mimo tento běh nepotvrdil.

## Co je potřeba ošetřit

**Sedm požadavků.** Text zprávy a potvrzení schválené klientskou komunikací. Vymezení pilotní skupiny. Kontrola přístupnosti podle EAA před spuštěním. Zápis účelu a právního základu do záznamu o činnostech zpracování. Informace o novém účelu v aplikaci a v zásadách zpracování. Doložení, že ke klasifikaci není připojeno rozhodnutí s právním účinkem. Zpráva česky a potvrzení ukládané do historie.

**Pět otevřených položek, každá s vlastníkem a bodem rozhodnutí.** Střety a pobídky u dodavatele a jeho vstup do distribučního řetězce, obojí drží Compliance před výběrem dodavatele. Zda je potřeba posouzení vlivu, drží pověřenec před spuštěním. Smlouva s dodavatelem, drží právní útvar před výběrem. Zda je klasifikace kritická funkce podle DORA, drží ICT rizika před výběrem.

**Dvě oblasti zúžení pilotu vyřadilo.** Zvláštní kategorie údajů, protože pilot nevyhodnocuje typ obchodníka. Změna smluvních podmínek, protože pilot nemění ceník a zprávu lze vypnout.

## Co potřebuje fáze požadavků

Text zprávy a potvrzení ve finálním znění. Vymezení pilotní skupiny v podobě, kterou lze dotázat v datech. Pravidlo pro dobu doručení zprávy. Chování při zrušení předplatného mezi zprávou a strhnutím.

A rozhodnutí těch pěti otevřených položek. **Bez nich nelze pilot spustit, psát požadavky ano.** Požadavky na těch pěti položkách nestojí, spuštění pilotu ano.

## Co se nepodařilo zjistit

Kolik klientů v pilotní skupině vlastně je. Vymezení existuje, číslo za ním ne.

Zda dodavatel klasifikace dokáže označit karetní předplatné spolehlivě. Žádný dodavatel není vybrán a přesnost klasifikace je předpoklad, na kterém celý pilot stojí.

## Jak to vzniklo

Krok 5.2, `mvp-expansion`, agent `product-owner`. Rozpracovává jednu variantu z A10, ne všechny tři.

Čtrnáct regulatorních oblastí je zděděných ze screeningu varianty I2 v A8c a žádná nebyla odvozena znovu. Každá nese oblast, sub-doménu a spouštěč z karty, ne volný text.
