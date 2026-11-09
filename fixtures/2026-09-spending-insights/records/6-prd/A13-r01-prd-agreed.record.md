---
run_id: 2026-09-spending-insights
record_id: R-A13-01
artifact_id: A13
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A12, A11, A4]
external_sources: []
sections:
  - id: overview
    status: present
  - id: problem
    status: present
  - id: users
    status: present
  - id: success_measures
    status: present
  - id: requirements
    status: present
  - id: non_functional
    status: present
  - id: out_of_scope
    status: present
  - id: dependencies
    status: present
requirements:
  - id: R1
    traces_to: [A11]
  - id: R2
    traces_to: [A11]
  - id: R3
    traces_to: [A11, A4]
  - id: R4
    traces_to: [A11]
  - id: R5
    traces_to: [A11]
  - id: R6
    traces_to: [A11]
  - id: R7
    traces_to: [A11]
  - id: R8
    traces_to: [A11]
  - id: R9
    traces_to: [A11]
  - id: R10
    traces_to: [A11]
alignment_validation: "Ověřeno proti SHD-1 (klienti s pravidelnou relevantní interakcí, strategy-basis v0.1 §2.2, směr: růst, typ C). Řetěz, na kterém varianta I2 získala ve fázi 4 pásmo Strong, zúžení na OPT-A přežil: banka posílá zprávu před strhnutím karetního předplatného, klient na ni odpovídá otevřením nebo zrušením, a to je pravidelná relevantní interakce v jednom kroku. Zúžení z tří druhů plateb na jeden četnost interakce snižuje, ale povahu napojení nemění. AI-2 (plně automatické servisní procesy) zůstává mimo: OPT-A vede klienta ze zprávy do detailu platby a zrušení probíhá stávající cestou, takže pilot žádný proces neautomatizuje. Základ: strategy-basis v0.1, značka indicative_unverified_strategy z A11 platí dál."
compliance_touchpoints:
  - area: A1
    sub_domain: S1
    trigger: T7
    resolution: requirement
    names: "R3 — Text zprávy a text potvrzení, obojí schválené útvarem klientské komunikace"
    touchpoint: "Ochrana klienta a komunikace"
    basis: "Zpráva je klientská komunikace o platbě a musí být srozumitelná bez otevírání detailu"
  - area: A1
    sub_domain: S2
    trigger: T2
    resolution: requirement
    names: "R6 — Vymezení pilotní skupiny: klienti s aktivním karetním předplatným na běžném účtu, retail"
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
    names: "R9 — Zpráva i potvrzení procházejí kontrolou přístupnosti podle EAA před spuštěním pilotu"
    touchpoint: "Přístupnost"
    basis: "Zpráva je nové klientské rozhraní a EAA se na ni vztahuje"
  - area: A2
    sub_domain: G1
    trigger: P2
    resolution: requirement
    names: "R1 — Zápis do záznamu o činnostech zpracování: účel je upozornění na opakovanou platbu, právní základ oprávněný zájem"
    touchpoint: "Právní základ a účel"
    basis: "Pilot čte transakční historii pro nový účel"
  - area: A2
    sub_domain: G2
    trigger: P12
    resolution: requirement
    names: "R10 — Informace o novém účelu v aplikaci a v zásadách zpracování, doplněná před spuštěním"
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
    names: "R1 — Klasifikace platby je automatické vyhodnocení a pilot k němu nepřipojuje rozhodnutí s právním účinkem: zpráva nic nemění, jen informuje"
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
    names: "R3 — Zpráva chodí česky a potvrzení o zrušení se ukládá do historie zpráv v aplikaci"
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
agreement_block:
  name: "Igor Tadić"
  date: "2026-08-28"
---

# Záznam R-A13-01 — A13

Jedna produkce. Dokument z něj sestavený je 6-prd/2-prd-agreed.md. Blok souhlasu vyplnil člověk.
