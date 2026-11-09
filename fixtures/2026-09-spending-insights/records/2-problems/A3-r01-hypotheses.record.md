---
run_id: 2026-09-spending-insights
record_id: R-A3-01
artifact_id: A3
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A2b]
external_sources: []
run_id: 2026-09-spending-insights
hypotheses:
  - id: H1
    kind: problem
    statement: "Klient s běžným účtem nedokáže zjistit, které opakované platby mu z účtu odcházejí, aniž by je sám dohledával jinde než v aplikaci"
    evidence: [O1, O3, O5]
    trust: strong
    rationale: "Tři pozorování ze dvou původů, z toho dvě z první ruky. Klientka našla platbu ve výpisu a popsala historii v aplikaci jako seznam, ve kterém je nutné vědět, co se hledá; druhý klient dostal od linky seznam, o kterém mu bylo řečeno, že není úplný"
    disconfirming: "Klient, který v aplikaci opakované platby najde do minuty a bez pomoci, tuto hypotézu vyvrací"
    themes: [viditelnost, aplikace]
  - id: H2
    kind: problem
    statement: "Klient si myslí, že zrušením karty ruší i opakované platby, které přes ni chodí"
    evidence: [O4]
    trust: weak
    rationale: "Jedno pozorování z jednoho původu, z první ruky. Klient kartu zrušil a platba přišla znovu z nové karty. Materiál nenese druhý původ, který by totéž potvrdil"
    disconfirming: "Data ukazující, že klienti po zrušení karty opakované platby nečekají, tuto hypotézu vyvrací"
    themes: [ocekavani, karty]
  - id: H3
    kind: problem
    statement: "Klient drží druhý účet u jiné banky, protože neví, co je na kterém"
    evidence: [O6]
    trust: weak
    rationale: "Jedno pozorování z jednoho původu, z první ruky. Klient uvedl důvod sám a nikdo další jej nepotvrzuje"
    disconfirming: "Klienti se dvěma účty, kteří jako důvod uvádějí něco jiného, tuto hypotézu oslabují"
    themes: [penezenka, dva-ucty]
  - id: H4
    kind: problem
    statement: "Klient se na neočekávanou platbu ptá, aby zjistil, co to bylo, nikoli aby ji reklamoval"
    evidence: [O7, O11]
    trust: strong
    rationale: "Dvě pozorování ze dvou původů. Operátorka to popsala jako nejčastější dotaz z první ruky a export tiketů to agregovaně potvrzuje devíti případy z patnácti"
    disconfirming: "Rozdělení tiketů, ve kterém převažují skutečné reklamace nad dotazy, tuto hypotézu vyvrací"
    themes: [linka, dotaz]
  - id: H5
    kind: problem
    statement: "Klient řeší tutéž věc opakovaně, protože po vyřešení jednoho případu mu nezůstane nic, co by mu příště pomohlo"
    evidence: [O12]
    trust: weak
    rationale: "Jedno agregované pozorování z jednoho původu. U šesti z devíti tiketů operátor poznamenal, že klient podobnou věc už jednou řešil. Žádný z rozhovorů to nepotvrzuje"
    disconfirming: "Data ukazující, že klient po jednom vyřešení už nevolá, tuto hypotézu vyvrací"
    themes: [opakovani, linka]
  - id: H6
    kind: problem
    statement: "Banka nedokáže klientovi ukázat, co mu z účtu pravidelně odchází, přestože data k tomu drží"
    evidence: [O9]
    trust: weak
    rationale: "Jedno pozorování z jednoho původu, z první ruky, od produktového manažera. Nikdo další jej nepotvrzuje a materiál nenese pohled ze strany systémů"
    disconfirming: "Existující obrazovka, která opakované platby ukazuje, tuto hypotézu vyvrací"
    themes: [data, aplikace]
  - id: H7
    kind: problem
    statement: "Seznam pravidelných plateb, který linka klientovi přečte, není úplný, protože karetní platby a příkazy jsou vidět odděleně"
    evidence: [O5]
    trust: weak
    rationale: "Jedno tlumočené pozorování z jednoho původu. Klient opakuje, co mu řekla operátorka, a materiál nenese vyjádření samotné linky"
    disconfirming: "Jeden pohled linky, ve kterém jsou obojí platby vidět společně, tuto hypotézu vyvrací"
    themes: [linka, uplnost]
rejected: []
---

# Záznam R-A3-01 — A3

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 2-problems/3-problem-hypotheses.md.
