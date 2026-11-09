---
run_id: 2026-09-spending-insights
record_id: R-A1b-01
artifact_id: A1b
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A1]
external_sources: []
run_id: 2026-09-spending-insights
areas:
  - area: A1
    filled: true
    source: cs_card
    triggers_fired:
      - trigger: T2
        puts_in_play: [S2, S1]
      - trigger: T6
        puts_in_play: [S11, S5]
      - trigger: T7
        puts_in_play: [S1]
      - trigger: T12
        puts_in_play: [S13, S1]
      - trigger: T13
        puts_in_play: [S13]
    sub_domains:
      - sub_domain: S1
        state: in_play
        because: "T7 změnil klientskou komunikaci a T12 klientskou digitální cestu; funkce klientovi něco sděluje v aplikaci a push zprávou"
      - sub_domain: S2
        state: in_play
        because: "T2 označil podstatnou změnu produktu; jde o novou funkci nad stávajícím běžným účtem pro vymezený retailový segment"
      - sub_domain: S3
        state: not_triggered
        because: "Popis neuvádí žádné doporučení ani nasměrování klienta a žádné posuzování vhodnosti"
      - sub_domain: S4
        state: not_triggered
        because: "Popis neuvádí změnu ceny, poplatku ani podmínek"
      - sub_domain: S5
        state: in_play
        because: "T6 označil nového partnera; dodavatel klasifikace transakcí je třetí strana, byť dosud nevybraná"
      - sub_domain: S6
        state: not_triggered
        because: "Popis neuvádí investiční funkčnost; typ produktu je uveden a investiční není"
      - sub_domain: S7
        state: not_triggered
        because: "Popis neuvádí pojistnou funkčnost"
      - sub_domain: S8
        state: not_triggered
        because: "Popis uvádí, že funkce žádnou platbu neiniciuje ani nemění; čte transakční historii a nic víc"
      - sub_domain: S9
        state: not_triggered
        because: "Popis neuvádí spotřebitelský úvěr"
      - sub_domain: S10
        state: not_triggered
        because: "Popis uvádí, že se nic o udržitelnosti netvrdí"
      - sub_domain: S11
        state: in_play
        because: "T6 označil nového partnera; distribuce zůstává ve vlastních kanálech, ale třetí strana do řetězce vstupuje"
      - sub_domain: S12
        state: cannot_determine
        because: "Kontroly, hlášení a auditovatelnost popisuje podoba řešení, která zatím neexistuje"
        missing_input: controls_and_monitoring
      - sub_domain: S13
        state: in_play
        because: "T12 a T13 označily klientskou digitální cestu a změnu rozhraní; nové obrazovky klient používá sám"
  - area: A2
    filled: true
    source: authored_here
    triggers_fired:
      - trigger: P2
        puts_in_play: [G1, G2, G11]
      - trigger: P4
        puts_in_play: [G6, G1, G11]
      - trigger: P6
        puts_in_play: [G5, G1, G11]
      - trigger: P12
        puts_in_play: [G2]
    sub_domains:
      - sub_domain: G1
        state: in_play
        because: "P2 označil nový účel pro již držená data; produktový manažer uvedl právní základ jako svůj názor, ne jako stanovisko"
      - sub_domain: G2
        state: in_play
        because: "P2 a P12 označily nový účel a to, že klient svá data v cestě vidí"
      - sub_domain: G3
        state: cannot_determine
        because: "Doby uchování popisuje podoba řešení, která zatím neexistuje"
        missing_input: retention_periods
      - sub_domain: G4
        state: cannot_determine
        because: "Není známo, které systémy data drží"
        missing_input: systems_affected
      - sub_domain: G5
        state: in_play
        because: "P6 označil zvláštní kategorii; z platby lze nezáměrně odvodit údaj o zdraví nebo o víře"
      - sub_domain: G6
        state: in_play
        because: "P4 označil profilování; klasifikace transakcí do kategorií probíhá automaticky"
      - sub_domain: G7
        state: not_triggered
        because: "Popis uvádí, že funkce nic nenabízí ani neprodává a zařízení nesleduje"
      - sub_domain: G8
        state: cannot_determine
        because: "Zpracovatelé a jejich subdodavatelé nejsou známi"
        missing_input: processors_and_subprocessors
      - sub_domain: G9
        state: cannot_determine
        because: "Umístění dat a případný přenos nejsou známy"
        missing_input: hosting_and_data_location
      - sub_domain: G10
        state: cannot_determine
        because: "Bezpečnostní opatření nejsou známa"
        missing_input: security_measures
      - sub_domain: G11
        state: in_play
        because: "P2, P4 a P6 označily nový účel, profilování a zvláštní kategorii; posouzení vlivu neproběhlo a produktový manažer neví, zda je vyžadováno"
      - sub_domain: G12
        state: not_triggered
        because: "Popis uvádí, že data neopouštějí banku a žádný registr se nedotazuje"
  - area: A3
    filled: true
    source: authored_here
    triggers_fired:
      - trigger: N4
        puts_in_play: [L6]
      - trigger: N6
        puts_in_play: [L4]
      - trigger: N9
        puts_in_play: [L8]
    sub_domains:
      - sub_domain: L1
        state: not_triggered
        because: "Popis uvádí, že žádná nová smlouva nevzniká"
      - sub_domain: L2
        state: not_triggered
        because: "Popis uvádí, že se smluvní podmínky nemění"
      - sub_domain: L3
        state: not_triggered
        because: "Popis uvádí, že se předsmluvní dokumenty nemění"
      - sub_domain: L4
        state: in_play
        because: "N6 označil to, že klient může upozornění v cestě vypnout"
      - sub_domain: L5
        state: not_triggered
        because: "Popis uvádí, že se způsob podpisu ani identifikace nemění; přihlášení zůstává stávající"
      - sub_domain: L6
        state: in_play
        because: "N4 označil nový text pro klienta v aplikaci a v upozornění, který je pro něj trvalým sdělením"
      - sub_domain: L7
        state: cannot_determine
        because: "Použitý obsah, značka a software popisují podobu řešení, která zatím neexistuje"
        missing_input: content_brand_and_software
      - sub_domain: L8
        state: in_play
        because: "N9 označil přidání dodavatele; dodavatel klasifikace transakcí zatím nebyl vybrán a smlouva s ním neexistuje"
      - sub_domain: L9
        state: not_triggered
        because: "Popis uvádí, že reklamační cesta zůstává stávající"
      - sub_domain: L10
        state: not_triggered
        because: "Popis neuvádí žádný slib úrovně služby ani záruku"
      - sub_domain: L11
        state: not_triggered
        because: "Popis neuvádí marketingové tvrzení, na které by se klient mohl spolehnout"
      - sub_domain: L12
        state: not_triggered
        because: "Popis uvádí roli banky jako tvůrce a distributora vlastní funkce nad vlastním účtem"
  - area: A4
    filled: true
    source: authored_here
    triggers_fired:
      - trigger: K3
        puts_in_play: [I3]
    sub_domains:
      - sub_domain: I1
        state: cannot_determine
        because: "Dotčené systémy a jejich kritičnost popisují podobu řešení, která zatím neexistuje"
        missing_input: systems_affected
      - sub_domain: I2
        state: not_triggered
        because: "Popis uvádí, že přihlášení zůstává stávající a žádná nová autentizace nevzniká"
      - sub_domain: I3
        state: in_play
        because: "K3 označil novou závislost na třetí straně; dodavatel klasifikace transakcí zatím nebyl vybrán"
      - sub_domain: I4
        state: cannot_determine
        because: "Klasifikace incidentů závisí na dotčených systémech, které nejsou známy"
        missing_input: systems_affected
      - sub_domain: I5
        state: cannot_determine
        because: "Očekávané zotavení a výstup od dodavatele nejsou známy"
        missing_input: recovery_expectations
      - sub_domain: I6
        state: cannot_determine
        because: "Způsob nasazení a prostředí popisují podobu řešení, která zatím neexistuje"
        missing_input: release_and_environment
      - sub_domain: I7
        state: cannot_determine
        because: "Použité komponenty a knihovny nejsou známy"
        missing_input: components_and_libraries
      - sub_domain: I8
        state: cannot_determine
        because: "Data v klidu a při přenosu nejsou popsána"
        missing_input: data_at_rest_and_in_transit
      - sub_domain: I9
        state: cannot_determine
        because: "Kontroly a monitoring popisují podobu řešení, která zatím neexistuje"
        missing_input: controls_and_monitoring
      - sub_domain: I10
        state: cannot_determine
        because: "Umístění dat není známo"
        missing_input: hosting_and_data_location
      - sub_domain: I11
        state: not_triggered
        because: "Popis uvádí, že funkce penězi nepohybuje a příkazy nemění; expozice vůči podvodu se nemění"
      - sub_domain: I12
        state: cannot_determine
        because: "Zda je dotčená služba registrovaná pod kybernetickým režimem, produktový manažer neví"
        missing_input: registered_under_cyber_regime
escalation:
  flag: true
  fired:
    - area: A1
      trigger: C-E14
      because: "Kontroly nelze pro toto zadání popsat, protože je popisuje podoba řešení, která zatím neexistuje. Spouštěč se nespouští nevyřešeností, ale právě jí"
      routes_to: unstated
    - area: A1
      trigger: C-E11
      because: "Přístupnost je ve hře a její dopad na rozhraní nelze z rámování posoudit"
      routes_to: unstated
    - area: A2
      trigger: G-E1
      because: "Z platby lze nezáměrně odvodit údaj o zdraví nebo o víře; produktový manažer to uvedl sám"
      routes_to: unstated
    - area: A2
      trigger: G-E6
      because: "Posouzení vlivu na ochranu osobních údajů neproběhlo a produktový manažer neví, zda je vyžadováno"
      routes_to: unstated
    - area: A2
      trigger: G-E12
      because: "Právní základ pro účel uvedl produktový manažer jako svůj názor, ne jako stanovisko právního útvaru"
      routes_to: unstated
    - area: A3
      trigger: L-E8
      because: "Dodavatel klasifikace transakcí je nová závislost produktu a zatím nebyl vybrán"
      routes_to: unstated
    - area: A4
      trigger: I-E1
      because: "Kritičnost dotčené závislosti nelze z rámování posoudit, což je právě podmínka, pro kterou spouštěč existuje"
      routes_to: unstated
    - area: A4
      trigger: I-E12
      because: "Očekávané zotavení nelze uvést"
      routes_to: unstated
    - area: A4
      trigger: I-E13
      because: "Klasifikaci pravděpodobného incidentu nelze uvést"
      routes_to: unstated
uncovered:
  - area: X1
    disposition: "Směrováno, nikoli screenováno. Regulace AI není jednou ze čtyř oblastí"
  - area: X2
    disposition: "Směrováno. Outsourcing mimo IKT není screenován"
  - area: X3
    disposition: "Nepokryto. Pravidla platebních schémat a tržní infrastruktura nejsou regulace a nejsou v žádné ze čtyř oblastí"
---

# Záznam R-A1b-01 — A1b

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 1-brief/initiative-screen.md.
