---
run_id: 2026-09-spending-insights
record_id: R-A11-01
artifact_id: A11
item_id: OPT-A
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
strategy_basis: none_stated
sources: [A10, A9, A8c, A1b]
external_sources: []
option_id: OPT-A
description: "Klient s aktivním karetním předplatným dostane tři dny před strhnutím zprávu v aplikaci a push zprávou. Zpráva nese částku, jméno příjemce a datum strhnutí a vede na detail platby, kde ji lze zrušit nebo změnit stávající cestou. Pilot běží na vymezené retailové skupině, netýká se trvalých příkazů ani inkas a nemění nic na tom, jak platba probíhá."
strategic_touchpoints:
  - touchpoint: "Pravidelná relevantní interakce s klientem"
    basis: indicative_unverified_strategy
  - touchpoint: "Obsluha v digitálním kanálu místo na lince"
    basis: indicative_unverified_strategy
compliance_touchpoints:
  - area: A1
    sub_domain: S1
    trigger: T7
    resolution: requirement
    names: "Text zprávy a text potvrzení, obojí schválené útvarem klientské komunikace"
    touchpoint: "Ochrana klienta a komunikace"
    basis: "Zpráva je klientská komunikace o platbě a musí být srozumitelná bez otevírání detailu"
  - area: A1
    sub_domain: S2
    trigger: T2
    resolution: requirement
    names: "Vymezení pilotní skupiny: klienti s aktivním karetním předplatným na běžném účtu, retail"
    touchpoint: "Řízení produktu a cílový trh"
    basis: "Pilot je změna stávajícího produktu pro vymezenou skupinu, ne nový produkt"
  - area: A1
    sub_domain: S5
    trigger: T6
    resolution: open_item
    owner: "Compliance"
    decided_at: "před výběrem dodavatele"
    touchpoint: "Střety a pobídky"
    basis: "Dodavatel klasifikace je třetí strana a odměňování za doporučení nesmí vzniknout"
  - area: A1
    sub_domain: S11
    trigger: T6
    resolution: open_item
    owner: "Compliance"
    decided_at: "před výběrem dodavatele"
    touchpoint: "Distribuce a třetí strany"
    basis: "Distribuce zůstává ve vlastních kanálech, ale dodavatel do řetězce vstupuje"
  - area: A1
    sub_domain: S13
    trigger: T12
    resolution: requirement
    names: "Zpráva i potvrzení procházejí kontrolou přístupnosti podle EAA před spuštěním pilotu"
    touchpoint: "Přístupnost"
    basis: "Zpráva je nové klientské rozhraní a EAA se na ni vztahuje"
  - area: A2
    sub_domain: G1
    trigger: P2
    resolution: requirement
    names: "Zápis do záznamu o činnostech zpracování: účel je upozornění na opakovanou platbu, právní základ oprávněný zájem"
    touchpoint: "Právní základ a účel"
    basis: "Pilot čte transakční historii pro nový účel"
  - area: A2
    sub_domain: G2
    trigger: P12
    resolution: requirement
    names: "Informace o novém účelu v aplikaci a v zásadách zpracování, doplněná před spuštěním"
    touchpoint: "Transparentnost a informování klienta"
    basis: "Klient musí vědět, že se jeho platby vyhodnocují kvůli upozornění"
  - area: A2
    sub_domain: G5
    trigger: P6
    resolution: narrowed_out
    reason: "Pilot je zúžen na karetní předplatné a nevyhodnocuje typ obchodníka, takže se kategorie citlivých údajů do zpracování nedostane"
    touchpoint: "Zvláštní kategorie údajů"
    basis: "Pilot je zúžen na karetní předplatné a nevyhodnocuje typ obchodníka, takže se kategorie citlivých údajů do zpracování nedostane"
  - area: A2
    sub_domain: G6
    trigger: P4
    resolution: requirement
    names: "Klasifikace platby je automatické vyhodnocení a pilot k němu nepřipojuje rozhodnutí s právním účinkem: zpráva nic nemění, jen informuje"
    touchpoint: "Automatizované rozhodování a profilování"
    basis: "Dodavatel klasifikuje platby automaticky"
  - area: A2
    sub_domain: G11
    trigger: P2
    resolution: open_item
    owner: "Pověřenec pro ochranu osobních údajů"
    decided_at: "před spuštěním pilotu"
    touchpoint: "Doložitelnost, DPIA a záznamy"
    basis: "Zda pilot vyžaduje posouzení vlivu, rozhoduje pověřenec"
  - area: A3
    sub_domain: L4
    trigger: N6
    resolution: narrowed_out
    reason: "Pilot nemění smluvní podmínky ani ceník a zpráva je služba navíc, kterou klient může vypnout"
    touchpoint: "Odstoupení, ukončení a změna podmínek"
    basis: "Pilot nemění smluvní podmínky ani ceník a zpráva je služba navíc, kterou klient může vypnout"
  - area: A3
    sub_domain: L6
    trigger: N4
    resolution: requirement
    names: "Zpráva chodí česky a potvrzení o zrušení se ukládá do historie zpráv v aplikaci"
    touchpoint: "Jazyk, forma a trvalý nosič"
    basis: "Zpráva je klientská komunikace a musí být v jazyce smlouvy"
  - area: A3
    sub_domain: L8
    trigger: N9
    resolution: open_item
    owner: "Právní útvar"
    decided_at: "před výběrem dodavatele"
    touchpoint: "Smlouvy s dodavateli a outsourcing"
    basis: "Smlouva s dodavatelem klasifikace musí pokrýt zpracování osobních údajů a výstup ze vztahu"
  - area: A4
    sub_domain: I3
    trigger: K3
    resolution: open_item
    owner: "ICT rizika"
    decided_at: "před výběrem dodavatele"
    touchpoint: "Závislost na dodavateli ICT a koncentrace"
    basis: "Zda je klasifikace kritická funkce podle DORA, rozhoduje útvar ICT rizik"
unexamined_areas: []
analyst_input: "Fáze 6 potřebuje: text zprávy a potvrzení ve finálním znění, vymezení pilotní skupiny v podobě, kterou lze dotázat v datech, pravidlo pro dobu doručení zprávy, chování při zrušení předplatného mezi zprávou a strhnutím, a rozhodnutí pěti otevřených položek níže. Bez posledního nelze pilot spustit, ne napsat požadavky."
---

# Záznam R-A11-01 — A11

Jedna produkce. Dokument z něj sestavený je 5-mvp/2-expanded-mvp.md.
