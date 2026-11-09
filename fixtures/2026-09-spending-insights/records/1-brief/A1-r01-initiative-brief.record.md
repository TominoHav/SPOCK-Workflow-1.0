---
run_id: 2026-09-spending-insights
record_id: R-A1-01
artifact_id: A1
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: []
external_sources: []
run_id: 2026-09-spending-insights
language: cs
title: "Prehled opakovanych plateb"
product_manager: "Igor Tadic"
topic: "Opakovane platby a predplatna v mobilni aplikaci"
outcome: "Klient s beznym uctem vi, ktere opakovane platby mu z uctu odchazeji, jeste nez odejde dalsi"
customer_segment: "Retailovi klienti s beznym uctem a aktivni mobilni aplikaci"
market_scope: "Prehled opakovanych plateb a predplatnych pro retailove klienty. Segment retailoveho bankovnictvi"
known_constraints: "Dodavatel klasifikace transakci neni vybran. Rozpocet na nej neni schvalen"
background: "Reklamacni tym hlasi opakovane dotazy na platby, ktere klient necekal. Cislo za tim nikdo nedrzi"
time_horizon: "Merit lze po tech mesicich od spusteni"
goals:
  - product_goal: "Klient najde v aplikaci sve opakovane platby a rozumi jim"
    metric: "Podil klientu, kteri po zobrazeni prehledu zrusi nebo zmeni alespon jednu opakovanou platbu do tricet dnu"
    key_result: LVL-2
    link: "Klient, ktery vidi, co mu z uctu odchazi, drzi na uctu vic penez a mene jich vede jinde. Podil na penezence roste tim, ze ucet prestava byt jen prutokovy"
unknowns:
  - field: success_signal
    reason: not_known
  - field: qualitative_signal
    reason: not_known
screening_inputs:
  - input: product_description
    value: "Přehled opakovaných plateb a předplatných v aplikaci, sestavený z transakčních dat klienta, s upozorněním před další platbou"
  - input: product_type
    value: "Není investiční, pojistný ani úvěrový produkt. Je to funkce nad platebním účtem"
  - input: bank_role
    value: "Banka je tvůrcem i distributorem; funkce běží v její vlastní aplikaci"
  - input: target_users
    value: "Retailoví klienti s běžným účtem a aktivní mobilní aplikací"
  - input: target_market
    value: "Retailové bankovnictví v České republice. Není určeno firemním klientům"
  - input: distribution_model
    value: "Vlastní kanály banky, bez zprostředkovatele"
  - input: channels
    value: "Mobilní aplikace, druhotně internetové bankovnictví"
  - input: client_journey
    value: "Klient otevře aplikaci, uvidí seznam opakovaných plateb, může si nastavit upozornění a projít historii jedné platby"
  - input: digital_interfaces
    value: "Obrazovka se seznamem, detail platby, nastavení upozornění. Přihlášení stávajícím způsobem, žádná nová autentizace"
  - input: client_communication
    value: "Text v aplikaci a push upozornění. Žádná nová smluvní dokumentace"
  - input: pricing_and_fees
    value: "Bez poplatku. Cena ani odměňování se nemění"
  - input: advice_involvement
    value: "Nic klientovi nedoporučuje ani ho k ničemu nesměruje"
  - input: suitability_implications
    value: "Žádné. Není to produkt, u kterého by se posuzovala vhodnost pro klienta"
  - input: sustainability_claims
    value: "Žádné"
  - input: personal_data_processed
    value: "Ano. Funkce čte transakční historii klienta"
  - input: data_subject_categories
    value: "Klienti banky s běžným účtem"
  - input: personal_data_categories
    value: "Transakční data, identita klienta, údaje o zařízení pro doručení upozornění"
  - input: special_category_data
    value: "Nezáměrně ano. Z platby lze odvodit údaj o zdraví nebo o víře, například platba za léky nebo církevní příspěvek"
  - input: processing_purposes
    value: "Zobrazit klientovi jeho opakované platby a upozornit ho před další platbou"
  - input: lawful_basis
    value: "Produktový manažer uvedl plnění smlouvy pro zobrazení a souhlas pro upozornění, a označil to za svůj názor, nikoli za stanovisko právního útvaru"
  - input: data_source
    value: "Vlastní transakční systémy banky. Nic zvenčí"
  - input: data_recipients
    value: "Nikdo mimo banku. Doručení upozornění jde přes stávajícího poskytovatele push notifikací"
  - input: profiling_or_automated_decisions
    value: "Klasifikace transakcí do kategorií probíhá automaticky. Nerozhoduje o klientovi a nemá pro něj právní účinek"
  - input: marketing_and_tracking
    value: "Žádné. Funkce nic nenabízí ani neprodává"
  - input: dpia_status
    value: "Neproběhlo. Produktový manažer neví, zda je vyžadováno"
  - input: rights_route
    value: "Stávající cesta banky pro uplatnění práv, žádná nová"
  - input: agreement_capture
    value: "Žádná nová smlouva. Souhlas s upozorněními se zapíná v nastavení aplikace"
  - input: contract_terms_affected
    value: "Žádné, podle produktového manažera"
  - input: precontractual_documents
    value: "Žádné"
  - input: withdrawal_and_termination
    value: "Klient upozornění vypne v nastavení. Samotný přehled vypnout nelze"
  - input: countries_offered
    value: "Pouze Česká republika"
  - input: third_parties
    value: "Poskytovatel push notifikací. Dodavatel klasifikace transakcí zatím nebyl vybrán"
  - input: complaints_and_disputes
    value: "Stávající reklamační cesta banky"
  - input: fraud_exposure
    value: "Nízká. Funkce nepohybuje penězi ani nemění příkazy"
  - input: registered_under_cyber_regime
    value: "Produktový manažer to neví; mobilní aplikace podle něj registrovaná je"
  - input: systems_affected
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: critical_or_important_function
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: hosting_and_data_location
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: processors_and_subprocessors
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: retention_periods
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: security_measures
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: data_at_rest_and_in_transit
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: components_and_libraries
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: release_and_environment
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: recovery_expectations
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: controls_and_monitoring
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
  - input: content_brand_and_software
    reason: not_yet_available
    note: "Screening Inputs §4 D1 — deklarováno jako zjistitelné až ve chvíli, kdy existují varianty řešení. Nedotazováno při rámování."
outcome_restatement: confirmed
restatement_proposed: true
entered_at: 2026-08-28
via: other-agent-tool
---

# Zaznam R-A1-01 — A1

Jedna produkce. Neni psano pro ctenare; dokument z nej sestaveny je 1-brief/initiative-brief.md.
