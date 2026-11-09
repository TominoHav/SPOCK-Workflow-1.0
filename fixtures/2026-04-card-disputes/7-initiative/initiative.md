---
run_id: 2026-04-card-disputes
artifact_id: A14
produced_by:
  agent: business-analyst
  skill: initiative-authoring
ost_role: artifact
status: produced
sources:
  - A13
workflow: discovery
modified_by: agent
revisions: 0
external_sources: []
could_not_verify:
  - rule: "written in Czech, free of implementation detail; every fact drawn from the agreed PRD or marked an assumption"
    needs: judge
    reach: artifact
assembled_at: 2026-08-20
assembled_from: [R-A14-01]
---

# OPT-A: Notifikace o každé karetní transakci v reálném čase s přímou cestou ke sporu

Klient dnes zjistí neoprávněnou transakci až při kontrole výpisu, tedy často po týdnech, protože ho v okamžiku transakce nic neupozorní. Iniciativa zavádí okamžitou notifikaci o každé karetní platbě pro všechny držitele retailových karet, ve výchozím stavu zapnutou, s možností podat reklamaci jedním klepnutím přímo z notifikace. Úspěch měříme podílem reklamací zahájených z notifikace namísto dohledáním ve výpisu a zkrácením doby mezi transakcí a jejím nahlášením.

Identifikátor Jira zatím nebyl dodán. Je to jediná otevřená položka tohoto dokumentu a bude doplněna, jakmile jej produktový vlastník poskytne.

---

## Insight

**Klíčový problém.** Držitel karty Česká spořitelna nedostane včasné upozornění na transakci, kterou
neprovedl. Kde upozornění přijde vůbec, přijde dny nebo týdny po události. V době, kdy zákazník
podvodnou transakci zjistí — z výpisu, z kontroly zůstatku nebo na upozornění jiné osoby — kontext
transakce vyblédl a přirozený okamžik k jednání pominul. Tato bariéra předchází celému procesu podání
sporu: zákazník, který si podvodné transakce nevšimne nebo ji zjistí příliš pozdě, spor nepodá
(H1, A4, trust: weak).

**Evidenční základ.** H1 v A4 nese tag důvěry `weak`: jeden původ (participant-d3, přímý, úplná
provenance); druhý nezávislý původ nebyl hledán. Zákazníci, kteří podvodnou transakci odhalili,
museli pro podání sporu buď vyplnit papírový formulář nebo zavolat kontaktní centrum — v obou
případech zadávali data, která banka z transakčního záznamu již měla.

**Tržní mezera.** Žádný český konkurent nepostavil kombinaci výchozí notifikace na každou transakci
a jednodotekového vstupu do předvyplněné obrazovky sporu v jednom produktu (A13). Tato kombinace
zůstává na profilovaném trhu neobsazena.

---

## Byznys cil

**Soulad s klíčovými výsledky banky.** Schválený PRD provedl validaci strategického souladu vůči
Strategy Basis@0.1; výsledek je nesen v A13 pod `alignment_validation`. Iniciativa se dotýká čtyř
klíčových výsledků:

- **AI-2** (podíl obchodních a servisních procesů v primárních digitálních kanálech, které jsou plně
  straight-through; Strategie §2.7, AI First) — posouzení: Moderate, potvrzeno G6. Řetězec
  notifikace → digitální obrazovka sporu zůstává zachován; OPT-A rozšiřuje okruh zákazníků, na které
  mechanismus působí, bez narušení jednotlivých kroků řetězce.
- **NOM-4** (klienti přesunutí z původního kanálu do nového digitálního kanálu; Strategie §2.2) —
  výchozí enrollment odstraňuje aktivační bariéru pro zákazníky, kteří by jinak zůstali na telefonu
  nebo u papírového formuláře.
- **NOM-3** (klienti obsluhovaní digitálně; Strategie §2.2) — každý spor podaný přes notifikační
  cestu je zákazník obsluhovaný digitálně; příspěvek je ohraničen podílem zákazníků, kteří přes akci
  sporu v průběhu pozorovacího období skutečně jednají.
- **SHD-1** (klienti s pravidelnou relevantní interakcí; Strategie §2.3) — nevyřešeno; pilot tuto
  otázku zodpovídá empiricky. Notifikace na každou transakci u zákazníků s vysokou transakční
  frekvencí může SHD-1 posouvat žádoucím směrem nebo naopak způsobovat opt-outy. SHD-1 nelze na
  základě tohoto dokumentu uzavřít jako splněný ani jako nesplněný.

Compliance Guidelines a Banking Constraints banky neexistují; žádný z požadavků tohoto pilotu nebyl
validován vůči provoznímu rámci banky a tato skutečnost je nesena jako závislost a otevřená otázka níže.

**Kdy je iniciativa dokončena.** Po ukončení 90denního pozorovacího období, jakmile jsou zodpovězeny
obě pilotní otázky — (a) zda reálné upozornění na každou transakci zvýšilo míru dispozic zákazníků
vůči předpilotnímu výchozímu stavu a (b) zda frekvence notifikací při transakční aktivitě zákazníka
vede k angažování s akcí sporu, nebo k opt-outům a odmítání notifikací. Numerická prahová hodnota
pro obě podmínky je nastavena vlastníkem měření (Igor Tadic, dočasný PO) při stanovení výchozích
hodnot z historických dat card operations — před odesláním první notifikace.

---

## Outcome

Zákazník, u jehož karty proběhne transakce, kterou neprovedl, si toho je vědom v okamžiku, kdy k ní
dochází — ne z výpisu s týdenním zpožděním. V tomto okamžiku podá spor sám, v digitálním kanálu,
bez asistence pobočky nebo kontaktního centra.

- Místo aby podvodnou transakci zjistil až ze zpožděného výpisu, zjistí ji v den, kdy nastane.
- Místo aby čekal na vnější podnět nebo upozornění jiné osoby, jedná aktivně a bezprostředně.
- Místo aby pro podání sporu kontaktoval banku telefonicky nebo na pobočce, vyřídí jej sám digitálně.

Zákazník, jehož transakce jsou v pořádku, si je průběžně vědom toho, co se na jeho kartě děje —
nejen retrospektivně z výpisu.

Iniciativa je úspěšná tehdy, když se tato bezprostřední vědomá odpověď na transakci stane dostupnou
a skutečně používanou zákazníky, kteří transakci neprovedli. Není úspěšná tím, že je technologie
nasazena. Způsob, jakým se změna doručuje, patří do sekce Rozsah iniciativy.

---

## Metriky uspechu

Všechna měřítka níže pocházejí ze schváleného PRD (A13). Kde běh metriku nedodal, je to řečeno spolu
s tím, co konkrétně chybí — mlčení a "nemáme co hlásit" se čtou stejně a jen jedno z toho je tvrzení,
které někdo učinil.

### Behavioralni

Schválený PRD dodal dvě opatření, obě behaviorální. Pozorovací horizont i kritéria zastavení jsou
součástí PRD; schválil je PO Igor Tadic na refine loop 6.2 dne 18. 8. 2026.

**Opatření A — Změna míry dispozic**

Podíl zákazníků v pilotní populaci, kteří podají spor o neautorizovanou transakci, ve srovnání
s předpilotní výchozí hodnotou stanovenou z historických dat card operations v totožném časovém okně
bezprostředně před spuštěním pilotu.

- *Pozorovací horizont:* 90 dní.
- *Vlastník:* Igor Tadic (PO, dočasný). Potvrzení skutečného vlastníka před zahájením měření.
- *Kritérium zastavení:* Pokud míra dispozic v pilotní populaci po 90 dnech nepřekročí přirozené
  kolísání předpilotní výchozí hodnoty — kde "přirozené kolísání" je definováno při stanovení výchozí
  hodnoty z historických dat — pilot se uzavírá. Numerická hranice je nastavena vlastníkem při
  stanovení výchozích hodnot, před odesláním první notifikace.

**Opatření B — Angažovanost dle transakční frekvence**

Míra opt-outu, míra interakce s notifikací a míra podání sporu notifikační cestou — vše stratifikované
podle pásma transakční frekvence zákazníka — v průběhu 90denního pozorovacího období.

- *Pozorovací horizont:* 90 dní.
- *Vlastník:* Igor Tadic (PO, dočasný). Potvrzení skutečného vlastníka před zahájením měření.
- *Kritérium zastavení:* Pokud míra opt-outu v celé populaci nebo v libovolném identifikovaném
  frekvenčním pásmu překročí hranici signalizující, že notifikace je na dané úrovni aktivity vnímána
  jako šum a nikoli jako služba, OPT-A v otázce (b) selhalo. Numerická hranice je nastavena vlastníkem
  při stanovení výchozích hodnot, před odesláním první notifikace.

**Výchozí hodnoty:** Předpilotní míra dispozic a transakční frekvence zákazníků musí být stanoveny
card operations z historických dat před spuštěním pilotu. Bez nich nelze ani jedno opatření výše číst
jako zlepšení, zhoršení ani neutrální výsledek.

### Byznysove

**Tuto metriku běh nedodal.** Schválený PRD neobsahuje žádné měřítko toho, co z popsané změny chování
banka finančně získá — ani výnos, ani snížení nákladů, ani retenci, ani penetraci produktů u cílového
segmentu. Strategická analýza v A13 uvádí KR NOM-3 a NOM-4 — ty jsou strategickými cílovými výsledky,
nikoli obchodními metrikami pilotu s číselnou cílovou hodnotou a výchozím stavem.

Co konkrétně chybí:

- Převod behaviorálních výsledků (zvýšená míra dispozic, snížená míra opt-outu) na hodnotu pro banku
  — např. ušetřená obsluha kontaktního centra, snížení počtu příchozích hovorů o stav případu nebo
  počet dispozic vyřízených čistě digitálně s přiřazenou hodnotou.
- Výchozí hodnota takového ukazatele.
- Vlastník, který za obchodní výsledek pilotu odpovídá.

Tato mezera se nedoplňuje odhadem; metrika bez protějšku ve schváleném PRD by byla údajem, který
se poprvé objevuje až v etapě 7 a nikde výše.

### Vnimani klientem

**Tuto metriku běh nedodal.** Schválený PRD neobsahuje žádné měřítko spokojenosti, důvěry ani NPS.
Pilotní otázka (b) — zda je frekvence notifikací při vysoké transakční aktivitě vnímána jako užitečná
služba nebo jako obtěžování — zkoumá vnímání nepřímo prostřednictvím míry opt-outu (behaviorální
ukazatel), nikoli přímou zpětnou vazbou zákazníka.

Co konkrétně chybí:

- Přímé měřítko toho, jak zákazník notifikace po 90 dnech vnímá — spokojenost, důvěra, preference.
- Měřítko toho, zda zákazníci, kteří opt-out neprovedli, notifikace skutečně oceňují nebo je ignorují
  jako pozadí.
- Jakýkoli mechanismus sběru zpětné vazby v průběhu pilotu; PRD žádný nepředepisuje.

Bez metriky vnímání může pilot prokázat, že zákazníci dispozici podají, a nezachytit, že jim frekvence
notifikací vadila nebo přestala být relevantní.

---

## Rozsah iniciativy

### In Scope

- Odeslání push notifikace na každou karetní transakci zákazníka, který je enrolled, bez prahové
  hodnoty, bez hodnocení rizika a bez aktivačního kroku ze strany zákazníka (R1).
- Obsah notifikace tvoří přesně tři pole: čas, částka a obchodní jméno z transakčního záznamu; žádná
  jiná osobní ani transakční data se v payloadu neobjevují v žádné fázi dispatch pipeline (R2).
- Akce sporu v notifikaci, která otevře aplikaci ČS přímo na předvyplněnou obrazovku sporu — s datem,
  částkou, obchodním jménem a předvybranou kategorií neautorizovaného poplatku — bez navigačního kroku
  a bez nutnosti zákazníkem data znovu zadat (R3).
- Potvrzovací akce v notifikaci, která zavře notifikaci tiše, bez otevření jakékoli obrazovky (R4).
- Zachovaná standardní cesta ke sporu z detailu transakce v aplikaci ČS; obě cesty vedou na tutéž
  obrazovku sporu a standardní cesta zůstává plně funkční po celou dobu pilotu i po něm (R5).
- Výchozí enrollment všech retailových klientů ČS s debetní nebo kreditní kartou při spuštění, bez
  aktivačního kroku ze strany zákazníka; zákazník, jehož zařízení nebo OS notifikace neumožňují, je
  stále veden jako enrolled a odlišen od zákazníka, který opt-out provedl vědomě (R6).
- Enrollmentní oznámení doručeno každému zákazníkovi individuálně před odesláním jeho první transakční
  notifikace; oznámení obsahuje: co zákazník bude dostávat, co notifikace ponese a jak se odhlásit (R7).
- Možnost opt-out přístupná z každé jednotlivé transakční notifikace i z nastavení aplikace ČS;
  opt-out má okamžitý účinek bez dalšího potvrzovacího kroku; notifikace v dispatchové frontě
  v okamžiku opt-outu není doručena (R8).
- Re-enrollment dostupný z nastavení aplikace ČS kdykoli bez kontaktu s kontaktním centrem a bez
  kroků mimo aplikaci; notifikace se obnoví od první transakce po registraci re-enrollmentu (R9).
- Log souhlasu: každý opt-out a každý re-enrollment zaznamenán s časovým razítkem, ID zákazníka
  a zdrojovým kanálem; tvoří auditovatelný záznam stavu enrollmentu v průběhu celého pilotu (R10).
- Log pilotních událostí: pro každého zákazníka a každou notifikaci — odeslání, doručení (nebo
  nepotvrzeno), interakce (akce sporu nebo potvrzovací akce), podání sporu notifikační cestou,
  opt-out, re-enrollment — každý záznam s ID zákazníka, časovým razítkem a pásmem transakční frekvence
  zákazníka (R11).
- Compliance review enrollmentního oznámení a mechanismu opt-out, dokončený a podepsaný právní nebo
  compliance funkcí banky před nasazením do produkce (R12).
- Dokumentace právního základu pro zpracování osobních transakčních dat při odesílání notifikací
  a při předvyplňování obrazovky sporu, dokončená a přezkoumána pro každou zpracovatelskou aktivitu
  zvlášť před nasazením (R13).
- DPIA pokrývající celý rozsah zpracování — všechny enrolled zákazníky, všechny karetní transakce,
  obsah notifikace, log souhlasu a pilotní log — dokončená a schválená funkcí pro ochranu dat banky;
  vyžadované mitigace implementovány před nasazením (R14).

### Out of Scope

- **H3 — Sledování stavu a potvrzení po podání sporu.** H3 je v A4 na prvním místě primárních
  problémů a přímým motorem klíčového signálu úspěchu tohoto běhu (zákazníci přestanou volat, aby
  zjistili, kde je jejich případ). OPT-A jej neadresuje: notifikační cesta sporu končí podáním;
  nic v OPT-A zákazníkovi neříká, kde jeho případ stojí. Adresovat H3 by vyžadovalo komponent
  pro sledování stavu — jiný rozsah, nikoli rozšíření OPT-A. Žádné rozšíření rozsahu nebylo
  v této etapě zaznamenáno.
- **H2 — Eliminace papírového formuláře jako primárního kanálu sporu.** H2 je v A4 na druhém místě
  primárních problémů. OPT-A otevírá obrazovku sporu aplikace ČS přes notifikační cestu; tato
  obrazovka je designovou závislostí (D1, R3), nikoli deliverable OPT-A. To, zda závislá obrazovka
  papírový formulář pro zákazníka eliminuje, je mimo rozsah OPT-A.
- **H4 — Informace o uzavření po vyřešení sporu.** H4 je sekundárním problémem v A4. OPT-A pokrývá
  cestu od notifikace k podání sporu; neextenduje se do stavu po vyřešení.
- **OPT-B — Notifikace filtrovaná rizikem.** Alternativní pilotní varianta odesílající notifikaci
  pouze na transakce splňující rizikový nebo novinkový práh. PO vybral OPT-A na G5a. OPT-B zůstává
  v A10 uzavřeno a beze změn.
- **Nápady posouzené v etapě 4 a nevybrané.** Pět nápadů bylo hodnoceno v etapě 4 (ID-1 až ID-5).
  ID-3 byl vybrán a stal se základem OPT-A. Zbývající čtyři nebyly vzaty dál; jejich hodnocení
  je v A8 a A9.

---

## High-Level akceptacni kriteria

- Na každou karetní transakci zákazníka, který je enrolled, je odeslána push notifikace bez výjimky;
  neúspěšné doručení je zaznamenáno jako selhání doručení a nezmění stav enrollmentu ani souhlasový
  záznam zákazníka (R1).
- Každá notifikace zobrazuje čas, částku a obchodní jméno a žádný jiný transakční ani osobní údaj;
  kde obchodní jméno chybí v transakčním záznamu, zobrazí se definovaný náhradní řetězec (R2).
- Zákazník, který vybere akci sporu, je přesměrován na obrazovku sporu předvyplněnou daty dané
  transakce a předvybranou kategorií; zákazník může spor podat bez úpravy předvyplněných polí
  a bez navigačního kroku (R3).
- Zákazník, který vybere potvrzovací akci, notifikaci zavře a žádná obrazovka se neotevře (R4).
- Zákazník, který notifikaci nevyužije, může zahájit spor z detailu transakce v aplikaci ČS; obě
  cesty vedou na tutéž obrazovku sporu, která je plně funkční po celou dobu pilotu i po něm (R5).
- Při spuštění jsou enrolled všichni retailoví klienti ČS s kartou bez jakéhokoli aktivačního kroku;
  zákazník, jehož zařízení nebo OS notifikace neumožňují, je veden jako enrolled a odlišen od zákazníka
  s vědomým opt-outem (R6).
- Enrollmentní oznámení je doručeno každému zákazníkovi individuálně před odesláním jeho první
  transakční notifikace; žádná notifikace nesmí u daného zákazníka předcházet jeho enrollmentnímu
  oznámení (R7).
- Opt-out je přístupný z každé notifikace i z nastavení aplikace; po jeho provedení není odeslána
  žádná další notifikace; notifikace v dispatchové frontě v okamžiku opt-outu není doručena (R8).
- Zákazník, který provedl opt-out, může kdykoli provést re-enrollment z nastavení aplikace bez kontaktu
  s kontaktním centrem; notifikace se obnoví od první transakce po registraci re-enrollmentu (R9).
- Každý opt-out a každý re-enrollment je zaznamenán se třemi povinnými atributy: ID zákazníka, časové
  razítko, zdrojový kanál; chyba zápisu záznamu nebrání provedení opt-outu ani re-enrollmentu
  a je označena pro ruční dořešení (R10).
- Pilotní log pro každého zákazníka a každou notifikaci obsahuje záznamy pro: notifikaci odeslanou,
  notifikaci doručenou (nebo nepotvrzenou), interakci (akce sporu nebo potvrzovací akce), podaný spor
  notifikační cestou, opt-out a re-enrollment — každý se třemi povinnými atributy: ID zákazníka,
  časové razítko, pásmo transakční frekvence zákazníka (R11).
- Compliance review enrollmentního oznámení a mechanismu opt-out je dokončen a podepsán právní nebo
  compliance funkcí banky; nasazení do produkce je blokováno bez tohoto podpisu (R12).
- Dokumentace právního základu zpracování je dokončena a přezkoumána pro odesílání notifikací i pro
  předvyplňování obrazovky sporu; nasazení je blokováno bez tohoto podpisu (R13).
- DPIA je dokončena a schválena funkcí pro ochranu dat banky; všechny identifikované mitigace jsou
  implementovány; nasazení je blokováno bez tohoto schválení; kde DPIA identifikuje vysoké reziduální
  riziko, je konzultován dozorový úřad v souladu s čl. 36 GDPR před nasazením (R14).

---

## Zavislosti

| # | Co je potřeba | Vlastník | Bez toho |
|---|---|---|---|
| D1 | Obrazovka sporu — designová závislost (R3) | Neurčen; UX/design a dodací tým | OPT-A nemá kam akci sporu přesměrovat. Zda půjde o novou obrazovku, adaptaci stávajícího detailu transakce nebo vstup do toku ID-2 přes nový notifikační vstupní bod, musí být specifikováno a rozhodnuto lidskou volbou před zahájením implementace |
| D2 | Real-time feed karetních transakcí — technická závislost | Platební nebo technický útvar banky — neurčen | Latence "do sekund od zaúčtování" závisí na real-time feedu z karetní infrastruktury do dispatch servisu v okamžiku zaúčtování u karetního schématu; backend integrace nejsou v tomto běhu specifikovány |
| D3 | Specifikace obsahu a doručení enrollmentního oznámení (R7) | Neurčen; produktový a dodací tým | R7 vyžaduje doručení oznámení před první notifikací zákazníka. Text oznámení, mechanismus doručení a sekvencování musí být specifikovány před implementací; obsah musí projít compliance review (D4) |
| D4 | Compliance review enrollmentního oznámení a mechanismu opt-out (R12) | Právní nebo compliance funkce banky | R12 blokuje nasazení. Musí proběhnout po dokončení D3 a nelze jej dokončit v rámci tohoto běhu. Compliance Guidelines banky neexistují; touchpoint CT.a byl identifikován přímou četbou ePrivacy směrnice a Zákona o elektronických komunikacích |
| D5 | Dokumentace právního základu zpracování (R13) | Právní funkce banky | R13 blokuje nasazení. Právní základ pro odesílání notifikací a předvyplňování obrazovky sporu osobními transakčními daty musí být stanoven a zdokumentován pro každou zpracovatelskou aktivitu zvlášť. Compliance Guidelines banky neexistují; touchpoint CT.b byl identifikován přímou četbou GDPR |
| D6 | DPIA (R14) | Funkce pro ochranu dat banky | R14 blokuje nasazení. Musí navazovat na dokončené D4 a D5. Kde DPIA identifikuje vysoké reziduální riziko, je podmínkou nasazení konzultace s dozorovým úřadem |
| D7 | Předpilotní výchozí hodnota míry dispozic | Card operations | Opatření A měří změnu vůči předpilotnímu výchozímu stavu. Ten musí být stanoven z historických záznamů card operations před spuštěním pilotu; přístup k těmto datům tento běh nezajišťuje |
| D8 | SLA platformy pro notification dispatch service | Platební nebo platformový útvar banky — neurčen | Cíle dostupnosti (uptime, RTO, RPO) pro dispatch servis nejsou v A11 stanoveny a standardně pocházejí z existujících SLA platformy banky; musí být dohodnuty před zahájením implementace |

**Compliance Guidelines a Banking Constraints banky neexistují** (A13). D4 a D5 jsou proto neseny jako
chybějící podklady, nikoli jako podklady, které stačí vyžádat. Žádný z 14 požadavků PRD nebyl
validován vůči provoznímu rámci banky.

---

## Rizika a mitigace

Závažnosti níže jsou posouzením tohoto dokumentu, nikoli hodnotou převzatou z PRD — jsou označeny jako
předpoklady. Popis rizika i mitigace vychází ze schváleného PRD (A13).

| Riziko | Závažnost | Mitigace |
|---|---|---|
| Výchozí enrollment bez explicitního opt-in vytváří povinnost souhlasu dle české transpozice ePrivacy směrnice (CT.a). Compliance Guidelines banky neexistují; povinnost nese žádné posouzené pásmo závažnosti ani potvrzený závazek | Vysoká (předpoklad) | R7 (enrollmentní oznámení před první notifikací každého zákazníka), R8 (opt-out dostupný a s okamžitým účinkem), R9 (re-enrollment z nastavení), R10 (log souhlasu), R12 (compliance review blokuje nasazení) |
| Obsah notifikace a předvyplnění obrazovky sporu jsou zpracováním osobních finančních dat všech klientů s kartou ČS; GDPR (CT.b) vyžaduje dokumentaci právního základu a DPIA pro celý rozsah zpracování | Vysoká (předpoklad) | R2 (obsah notifikace ohraničen na tři pole), R13 (dokumentace právního základu blokuje nasazení), R14 (DPIA blokuje nasazení) |
| Zákazníci s vysokou transakční frekvencí mohou notifikace vnímat jako obtěžování a provádět opt-out ve vyšší míře; SHD-1 by se mohl pohybovat proti iniciativě místo pro ni | Střední (předpoklad) | Pilotní otázka (b) tuto hypotézu testuje empiricky prostřednictvím Opatření B stratifikovaného dle transakčního frekvenčního pásma; zastavovací podmínka nastavena před spuštěním pilotu (D7) |
| Výchozí hodnoty míry dispozic nejsou před spuštěním pilotu stanoveny; bez nich nelze zastavovací podmínku Opatření A číselně definovat ani výsledky pilotu vyhodnotit jako zlepšení nebo zhoršení | Střední (předpoklad) | Výchozí hodnoty stanovuje card operations z historických záznamů před odesláním první notifikace (D7); numerická hranice nastavena vlastníkem před spuštěním pilotu |
| Obrazovka sporu je designová závislost, nikoli deliverable OPT-A; není-li k dispozici před nasazením, nelze OPT-A spustit | Střední (předpoklad) | Specifikace obrazovky sporu (R3, otevřená položka) musí být uzavřena a obrazovka musí být k dispozici před zahájením implementace (D1) |
| Compliance Guidelines a Banking Constraints neexistují; žádný z 14 požadavků PRD nebyl validován vůči provoznímu rámci banky; rozsah práce může být podhodnocen nebo v konfliktu s provozními omezeními | Střední (předpoklad) | Vyžádat stanovisko compliance a právní funkce banky (D4, D5) a validovat rozsah vůči provozním omezením banky (D8) před zahájením implementace |
| Pilot nezachytí obchodní ani vnímanou stránku výsledku; mechanismus může fungovat, být pro banku bezcenný nebo zákazníky obtěžovat, a pilot to neukáže | Střední (předpoklad) | Doplnit obchodní metriku a metriku vnímání do plánu měření před zahájením pilotu; viz sekce Metriky uspechu výše |

---

## Otevrene otazky

- **Identifikátor Jira.** Klíč Jira nebyl dosud dodán Produktovým vlastníkem. Pole `id`, `jiraLink`
  a `id_basis` budou doplněna v druhém průchodu po dodání klíče. Toto je jediná otevřená položka
  v záhlaví dokumentu.
- **Obrazovka sporu (R3, D1).** Zda se jedná o novou obrazovku, adaptaci stávajícího detailu
  transakce nebo vstup do existujícího toku ID-2 přes nový notifikační vstupní bod — musí být
  rozhodnuto před zahájením implementace.
- **Právní základ zpracování (R13, D5).** Zda odeslání notifikací a předvyplnění obrazovky sporu mají
  základ ve smluvním plnění, oprávněném zájmu nebo jiném základu dle kartové smlouvy — musí určit
  právní funkce banky před nasazením.
- **Latence doručení notifikace.** A11 specifikuje "do sekund od zaúčtování"; konkrétní ceiling
  v sekundách není stanoven. Musí být dohodnut s dodacím týmem vůči transakčnímu zpracovatelskému
  kanálu před zahájením implementace.
- **Vlastník měření.** Igor Tadic (PO) je označen jako dočasný vlastník obou opatření. Skutečný
  vlastník musí být potvrzen před zahájením pozorovacího období.
- **Výchozí hodnoty a prahové hodnoty zastavovacích podmínek.** Numerické hranice pro Opatření A i B
  jsou nastaveny vlastníkem při stanovení výchozích hodnot z historických dat card operations — před
  odesláním první notifikace. Aktuálně nejsou stanoveny.
- **Compliance Guidelines a Banking Constraints.** Oba dokumenty v bance neexistují (A13). Žádný ze
  14 požadavků tohoto pilotu nebyl validován vůči provoznímu rámci banky. Validaci musí zajistit
  compliance a právní funkce banky před zahájením implementace.
- **Bankovní SLA pro notification dispatch service.** Cíle dostupnosti nejsou v A11 stanoveny;
  standardně pocházejí z existujících SLA platformy banky a musí být dohodnuty před implementací (D8).
- **Host Jira (D11).** Otevřené rozhodnutí: `csas.atlassian.net` nebo `jira.csin.cz`. Ovlivňuje
  propagaci iniciativy (A15); vazba `initiative-propagation` je aktuálně blokována na D11 a závisí
  na rozhodnutí vývojáře, nikoli na odvození.

---

## Odkazy

- [A13 – Schválený PRD](../6-prd/2-prd-agreed.md)
- [A11 – Rozšířený MVP (OPT-A)](../5-mvp/2-expanded-mvp.md)
- [A9 – Vybraný nápad (ID-3)](../4-solutions/3-selected-solution.md)
- [A4 – Prioritizovaná sada problémů](../2-problems/5-prioritised-opportunities.md)
- [A2 – Zdrojový materiál](../2-problems/1-problem-material.md)
