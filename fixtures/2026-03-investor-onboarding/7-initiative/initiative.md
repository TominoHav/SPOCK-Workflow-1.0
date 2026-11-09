---
run_id: 2026-03-investor-onboarding
artifact_id: A14
ost_role: artifact
status: accepted
workflow: discovery
modified_by: agent
revisions: 1
produced_by:
  agent: business-analyst
  skill: initiative-authoring
sources:
  - A13
external_sources: []
could_not_verify:
  - rule: "written in Czech, free of implementation detail; every fact drawn from the agreed PRD or marked an assumption"
    needs: judge
    reach: artifact
decision:
  gate: G7
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: Product Owner
  accepted_at: 2026-08-14
  changed_during_refinement: none
  refinements: []
  note: "The gate was taken by Igor Tadic, who ran the writer command himself on 14 August; the run record carries it under the same name and date. This record carries no `reason` because he supplied none, and the assistant did not write one on his behalf — every other reason in this run is the deciding person's own account of why, and a summary of what the deliverable contains would read as one without being one. The artifact this gate reviewed is complete on its own: A15 does not exist, its binding is parked on the unnamed Jira host, and C16 checks that independence rather than assuming it."
assembled_at: 2026-08-20
assembled_from: [R-A14-01]
---

# [SPOCK-102] - Kontextuální nápověda na vyžádání při dotazníku vhodnosti a výběru fondu

**Běh:** `2026-03-investor-onboarding` · **Etapa:** 7.1 `initiative-authoring` · **Brána:** Q7 poté G7
**Vychází z:** A13 (schválený PRD, souhlas Igor Tadic, 13. 8. 2026) → A11 → A9 (ID-2) → A4 (H2, primární problém)

Všechna věcná tvrzení v tomto dokumentu pocházejí ze schváleného PRD. Kde PRD odpověď neobsahuje, je to
řečeno a označeno jako předpoklad nebo jako otevřená otázka; nic zde není doplněno odhadem.

---

## Insight

**Co jsme zjistili.** Dotazník vhodnosti je povinnou digitální bránou před každým nákupem investičního
fondu. Používá slovník — typy fondů, rizikové kategorie, investiční horizont, kategorie tolerance rizika
— který předpokládá investiční zkušenost, jakou cílový zákazník nemá. Retailový klient s úsporami na
běžném účtu, který dosud žádný investiční produkt nekoupil, nemá jak zjistit, co „vyvážený fond" znamená
pro způsob správy jeho peněz, proč je banka povinna ptát se na jeho investiční horizont, ani co pro jeho
rizikový profil znamená „konzervativní" oproti „dynamickému". Když to nezjistí, buď odpověď uhádne, tok
opustí, nebo zavolá na pobočku.

**Odkud to víme.**

- Jde o problém H2, jediný primární problém běhu. Nese nejvyšší míru důvěry v celém běhu (`strong`) —
  stojí na dvou nezávislých původech a jedno z pozorování je přímé (A3, A4).
- Všichni tři profilovaní konkurenti vyžadují dotazník vhodnosti jako povinnou digitální bránu k investici
  do fondu (tržní syntéza A7, ST1), a všichni tři tuto obtíž řeší pobočkovým poradcem (A7, ST5).
- Trh se posouvá z pobočky do digitálního kanálu (A7, TR-B2) a mezera ve finanční gramotnosti je
  identifikována jako hlavní konverzní bariéra právě u dotazníku (A7, TR-B3).

**Nevyužitá příležitost.** Vzdělávací funkci dnes vykonává pobočkový poradce osobně a žádná z profilovaných
bank ji nepřesunula do digitálního kanálu (A7, absence A1 a A2). Nejbližší tržní obdobou je 25otázkové
digitální poradenství MONETA (A7, P2), to však míří na výběr fondu (problém H1), nikoli na srozumitelnost
samotného dotazníku. Prostor, do kterého tato iniciativa vstupuje, je na profilovaném trhu neobsazený.

---

## Byznys cil

**Klíčový výsledek (Key Result) nebyl v tomto běhu dodán.** Schválený PRD neuvádí žádný cíl banky ani
klíčový výsledek, ke kterému by se iniciativa vázala, a tento dokument žádný nedoplňuje. Uvést zde
věrohodně znějící bankovní cíl by znamenalo vydat odhad za zadání.

**Co PRD k souladu se strategií skutečně obsahuje**, je posouzení vůči tržní evidenci — nikoli vůči cíli
banky. PRD je vede pod označením `indicative_unverified_strategy`:

- být první na trhu s digitální vzdělávací podporou přímo u dotazníku vhodnosti (A7, absence A1 a A2);
- podpořit přesun distribuce z pobočky do digitálního kanálu (A7, TR-B2);
- snížit konverzní bariéru danou mezerou ve finanční gramotnosti u dotazníku (A7, TR-B3);
- držet riziko tření pro zákazníky, kteří vysvětlení nepotřebují, na uzdě tím, že se text zobrazí až na
  jejich vyžádání (A11, ST.d).

**Předpoklad, výslovně označený jako předpoklad.** Toto posouzení bylo provedeno vůči tržní evidenci (A7)
a strategické analýze rozšířeného MVP (A11) v době, kdy běh Strategickou základnou nedisponoval. Validace
strategického souladu vůči Strategické základně **dosud neproběhla**. Dokud neproběhne, je strategický
soulad této iniciativy předpokladem, nikoli ověřeným tvrzením. Vedeno jako závislost D1 a jako otevřená
otázka.

**Kdy je iniciativa hotová.** Iniciativa je pilot a je dokončena zodpovězením pilotní otázky převzaté
z A11: zda zákazníci z cílového segmentu vysvětlení v okamžiku nejistoty najdou a použijí, a zda jim
přístup k vysvětlení na vyžádání u každé otázky a každého štítku stačí k dokončení dotazníku a k výběru
fondu bez pomoci pobočky. **Prahová hodnota, při níž je odpověď kladná, ani pozorovací období nejsou
v PRD stanoveny** — patří do plánu měření (D10). Bez nich nelze okamžik dokončení iniciativy určit datem
ani číslem.

---

## Outcome

**Zákazník z cílového segmentu si nejasnost vyřeší v okamžiku, kdy vznikne, a v digitálním kanálu
pokračuje dál.** Změna se týká právě toho okamžiku, ve kterém dnes uvázne:

- Místo aby odpověď uhádl, odpoví na otázku dotazníku s porozuměním tomu, na co se ho banka ptá a proč.
- Místo aby tok opustil, dotazník vhodnosti dokončí.
- Místo aby zavolal na pobočku, dojde k výběru fondu sám.
- Zákazník, který slovníku dotazníku rozumí, své chování nemění — jeho průchod zůstává takový jako dnes.

Iniciativa je úspěšná tehdy, když se tento okamžik chová jinak. Není úspěšná tím, že je něco nasazeno.
Způsob, jakým se změna doručuje, patří do sekce Rozsah iniciativy a záměrně není součástí tohoto výroku.

---

## Metriky uspechu

Všechna měřítka níže pocházejí ze schváleného PRD. Kde běh metriku nedodal, je to řečeno spolu s tím,
co konkrétně chybí — mlčení a „nemáme co hlásit" se čtou stejně a jen jedno z toho je tvrzení, které
někdo učinil.

### Behavioralni

Co zákazník začne dělat jinak a jak se to počítá. PRD dodává čtyři měřítka a všechna jsou behaviorální:

| Metrika | Co ukazuje |
|---|---|
| Míra vyžádání vysvětlení | Podíl zákazníků z cílového segmentu, kteří si během jednoho sezení s dotazníkem vyžádají alespoň jedno vysvětlení |
| Míra dokončení dotazníku | Podíl zákazníků z cílového segmentu, kteří v pilotním období dokončí celý dotazník vhodnosti |
| Míra přechodu na pobočku | Míra, s jakou zákazníci z cílového segmentu opustí digitální tok a dokončí jej na pobočce v pilotním období |
| Doba strávená nad vysvětlením | Čas strávený nad jedním vysvětlením na jedno vyžádání, jako ukazatel zapojení do obsahu |

**Výchozí hodnoty nejsou stanoveny.** Současná míra dokončení dotazníku u prvoinvestorů, míra přechodu
na pobočku ani obvyklá doba dokončení nejsou ve zdrojových podkladech běhu. Musí být zjištěny před
spuštěním pilotu; bez nich nelze žádnou z metrik výše číst jako zlepšení, zhoršení ani neutrální výsledek
(D9, D10).

**Prahová hodnota ani pozorovací období nejsou stanoveny.** PRD je nechává na plánu měření, jehož
vlastníkem je produktový tým (D10). Vlastník jednotlivých metrik určen není.

### Byznysove

**Tuto metriku běh nedodal.** Schválený PRD neobsahuje žádné měřítko toho, co z popsané změny chování
má banka — ani výnos, ani náklad, ani retenci, ani penetraci investičních produktů v cílovém segmentu,
ani rychlost. Všechna čtyři měřítka v PRD jsou behaviorální.

Co konkrétně chybí:

- převod dokončeného digitálního dotazníku a nižšího přechodu na pobočku na hodnotu pro banku — například
  ušetřená obsluha na pobočce nebo počet prvních investic dokončených v cílovém segmentu digitálně;
- výchozí hodnota kteréhokoli takového ukazatele, protože ani ty behaviorální výchozí hodnoty nemá;
- vlastník, který za obchodní výsledek pilotu odpovídá.

Tato mezera se nedoplňuje odhadem. Metrika bez protějšku ve schváleném PRD by byla údajem, který se
poprvé objevuje až v etapě 7 a nikde výše.

### Vnimani klientem

**Tuto metriku běh nedodal.** Schválený PRD neobsahuje žádné měřítko spokojenosti, důvěry ani NPS. Doba
strávená nad vysvětlením je ukazatelem zapojení, nikoli toho, jak se zákazník cítí, a jako metrika vnímání
ji použít nelze.

Co konkrétně chybí:

- měřítko toho, zda zákazník po průchodu dotazníkem cítí, že rozuměl tomu, na co odpovídal;
- měřítko toho, zda zákazníci, kteří si vysvětlení nevyžádali, vnímají jeho přítomnost jako rušivou —
  což je přesně to riziko, kvůli kterému byla vyloučena varianta OPT-2;
- jakýkoli sběr zpětné vazby v pilotu; PRD žádný nepředepisuje.

Bez metriky vnímání může pilot prokázat, že mechanismus funguje, a nezachytit, že zákazníky obtěžuje.

---

## Rozsah iniciativy

### In Scope

- Indikátor vysvětlení u každé otázky dotazníku vhodnosti, viditelný na obrazovce dané otázky bez
  jakékoli akce zákazníka nad rámec navigace na tuto otázku (R1).
- Indikátor vysvětlení u každého štítku fondového produktu na obrazovce výběru fondu, viditelný u každého
  štítku bez jakékoli akce nad rámec navigace na tuto obrazovku (R2).
- Zobrazení textu vysvětlení výhradně po vyžádání zákazníkem, a to pro danou konkrétní položku
  a v daném sezení; zákazník, který si nevyžádá nic, nevidí žádný text vysvětlení (R3).
- Obsah vysvětlení u otázek dotazníku: co otázka zjišťuje, proč se na to banka musí ptát podle MiFID II
  a co jednotlivé možnosti odpovědi znamenají pro investiční profil — genericky, bez odkazu na předchozí
  odpovědi zákazníka i na jeho dosud sestavený profil (R4).
- Obsah vysvětlení u štítků fondů: co daná kategorie znamená z hlediska rizika a výnosu, jak se odvozený
  rizikový profil zákazníka na tuto kategorii typicky mapuje, a odkaz na příslušný Klíčový informační
  dokument (R5).
- Zachování stavu při zavření vysvětlení: všechny předchozí odpovědi, stav stránky i postup navigace
  přesně takové, jaké byly před vyžádáním (R6).
- Nezměněný dotazník vhodnosti: otázky, jejich znění, možnosti odpovědí i pořadí jsou totožné s verzí bez
  indikátorů, a logika hodnocení ani algoritmus odvození rizikového profilu se nemění (R7).
- Zdokumentovaný compliance review každého textu vysvětlení otázky před nasazením do produkce, potvrzující,
  že text nelze rozumně číst jako navádění zákazníkovy odpovědi (R8, dotykový bod CT.a).
- Zdokumentovaný KID-alignment review každého textu vysvětlení štítku fondu před nasazením do produkce,
  potvrzující soulad s příslušným Klíčovým informačním dokumentem (R9, dotykový bod CT.b).
- Zdokumentovaný obsahový review každého textu vysvětlení otázky před nasazením do produkce, potvrzující,
  že jde o investiční informaci, nikoli o personalizované investiční poradenství (R10, dotykový bod CT.c).

### Out of Scope

- **OPT-2 — proaktivní vysvětlení viditelné ve výchozím stavu.** Posuzováno v etapě 5.1 a vyloučeno
  v G5a: text zobrazený všem přidává tření zákazníkům, kteří o vysvětlení nestáli (A10).
- **OPT-3 — orientační obrazovka před dotazníkem.** Posuzováno v etapě 5.1 a vyloučeno v G5a: jedna
  obrazovka před začátkem nepomůže v okamžiku, kdy nejistota přijde u konkrétní otázky (A10).
- **H1 — výběr fondu** (sekundární problém, A4). OPT-1 jej neadresuje. Iniciativa mířící na H1 zahajuje
  nový běh ze stejné sady problémů.
- **H3 — nejistota ohledně vypořádání** (odložený problém, A4). Ponecháno v odložené sadě pro budoucí běh.
- **Jakákoli změna otázek, znění, možností odpovědí, pořadí nebo hodnocení dotazníku vhodnosti.**
  Dotazník je regulovaným nástrojem, o který se opírá posouzení vhodnosti. Nápady, které jej mění (ID-1
  a ID-5 z A8), nebyly v etapě 4 vybrány; ID-5 bylo odloženo, nikoli zamítnuto.
- **Jakákoli změna seznamu fondů, jejich cen, třídění nebo logiky odvození rizikového profilu.**
- **Automaticky nebo generativně vytvářený obsah vysvětlení.** Mechanismus počítá s texty napsanými,
  zkontrolovanými a schválenými. Zda by obsah šel generovat či personalizovat, tento běh nezkoumal.

---

## High-Level akceptacni kriteria

- Zákazník, který přejde na libovolnou otázku dotazníku vhodnosti, vidí indikátor vysvětlení, aniž by
  provedl cokoli nad rámec navigace na tuto otázku (R1).
- Zákazník, který přejde na obrazovku výběru fondu, vidí indikátor u každého štítku fondu (R2).
- Zákazník, který si nevyžádal žádné vysvětlení, nevidí žádný text vysvětlení a jeho průchod je
  nerozeznatelný od průchodu bez přítomnosti indikátorů (R3).
- Vysvětlení u otázky pokrývá všechny tři obsahové prvky R4 a je pro dva zákazníky s odlišnými předchozími
  odpověďmi totožné (R4).
- Vysvětlení u štítku fondu pokrývá všechny tři obsahové prvky R5, odkazuje na správný Klíčový informační
  dokument daného fondu a tento dokument nenahrazuje (R5).
- Po zavření vysvětlení jsou všechny předchozí odpovědi, stav obrazovky i postup navigace ve stavu před
  vyžádáním; opakované vyžádání a zavření v jednom sezení nezmění ani jednu odpověď zákazníka (R6).
- Dotazník ve verzi s indikátory má totožné znění otázek, možnosti odpovědí i jejich pořadí jako verze bez
  nich a pro tytéž odpovědi odvodí tentýž rizikový profil (R7).
- Žádný text vysvětlení otázky není nasazen do produkce bez zdokumentovaného compliance review se jménem
  posuzovatele a datem; text, který review neprojde, je přepracován a posouzen znovu (R8).
- Žádný text vysvětlení štítku fondu není nasazen do produkce bez zdokumentovaného KID-alignment review
  se jménem posuzovatele a datem (R9).
- Žádný text vysvětlení otázky není nasazen do produkce bez zdokumentovaného obsahového review hranice
  informace a poradenství; text odkazující na konkrétní situaci zákazníka neprojde už z tohoto důvodu (R10).

---

## Zavislosti

| # | Co je potřeba | Vlastník | Bez toho |
|---|---|---|---|
| D1 | Validace vůči Strategické základně | Strategický tým banky — v tomto běhu neurčen | Strategický soulad iniciativy zůstává předpokladem posouzeným vůči tržní evidenci. Validace vůči Strategické základně dosud neproběhla a musí proběhnout dříve, než se iniciativa začne realizovat |
| D2 | Compliance pokyny | Compliance tým banky | Tři review procesy (R8, R9, R10) musí mít vlastníka v compliance funkci; bez pokynů nelze review workflow navrhnout. Dotykové body byly identifikovány přímo z regulace a vyžadují potvrzení compliance funkcí před implementací |
| D3 | Bankovní omezení | Produktový nebo technický útvar banky — neurčen | Návrh interakce (D4) a rozsah platforem (D11) nelze ověřit vůči provozním omezením banky; proveditelnost zvoleného vzoru indikátoru na jednotlivých platformách není potvrzena |
| D4 | Návrh interakce indikátoru | UX/design a dodací tým | Spouštěcí událost, formát zobrazení a způsob zavření nejsou určeny (otevřená položka 1 z A11). Tato rozhodnutí tvarují požadavky na přístupnost i rozvržení na mobilu; bez nich nelze začít implementovat |
| D5 | Tvorba a správa obsahu vysvětlení | Dosud neustaveno | Kdo texty píše a udržuje, jaký je limit délky na otázku a na štítek, jaká je cílová čtenářská úroveň a zda se vyžadují jazykové varianty, není určeno (otevřená položka 2 z A11). Bez toho nelze naplnit R4 a R5 |
| D6 | Review proces podle MiFID II čl. 25 | Compliance tým banky | R8 vyžaduje zdokumentovaný review každého textu otázky před nasazením. Workflow — kdo posuzuje, co posuzuje, jak se výsledek zaznamená, kdo smí schválit nasazení — musí být navrženo a obsazeno |
| D7 | KID-alignment review proces podle PRIIPs | Compliance tým banky | R9 vyžaduje zdokumentovaný review každého textu štítku fondu. Workflow musí být navrženo a obsazeno a aktuální kopie každého příslušného KID je vstupem každého posouzení |
| D8 | Obsahový review proces podle MiFID II čl. 24 | Compliance tým banky | R10 vyžaduje zdokumentovaný review hranice informace a poradenství u každého textu otázky. Workflow musí být navrženo a obsazeno |
| D9 | Měřicí infrastruktura pilotu | Produktový tým a technický útvar | Logování událostí (indikátor zobrazen, vyžádán, vysvětlení zobrazeno, doba zobrazení, dokončení dotazníku), analytická kapacita a politika uchování dat pilotu. Bez toho nelze pilotní otázku zodpovědět |
| D10 | Plán měření pilotu | Produktový tým | Otevřená položka 5 z A11. Konkrétní logované události, prahová hodnota úspěchu a pozorovací období musí být rozhodnuty před spuštěním. Plán musí pokrýt i zpracování dat pilotu |
| D11 | Rozhodnutí o rozsahu platforem | Produktový tým a technický útvar | Zda je interakce na iOS, Androidu a webu shodná, nebo přizpůsobená, není určeno (otevřená položka 6 z A11). Ovlivňuje rozsah implementace i testování na každé platformě |
| D12 | Rozhodnutí o úrovni přístupnosti | Produktový tým nebo standard přístupnosti banky | Úroveň souladu s WCAG pro indikátor a rozbalení není určena (otevřená položka 7 z A11). PRD popisuje minimální chování; úroveň musí být stanovena před implementací |

**Compliance pokyny a Bankovní omezení v bance neexistují** a PRD to takto uvádí. D2 a D3 je proto nesou
jako chybějící podklady, nikoli jako podklady, které stačí vyžádat.

---

## Rizika a mitigace

Sloupec Závažnost je posouzením tohoto dokumentu, nikoli hodnotou převzatou z PRD — je označen jako
předpoklad. Popis rizika i mitigace pocházejí ze schváleného PRD.

| Riziko | Závažnost | Mitigace |
|---|---|---|
| Text vysvětlení u otázky je čten jako navádění zákazníkovy odpovědi a ohrozí právní platnost dotazníku jako regulovaného nástroje posouzení vhodnosti (MiFID II čl. 25) | Vysoká | Zdokumentovaný compliance review každého textu před nasazením (R8); texty jsou generické a neodkazují na předchozí odpovědi ani na profil zákazníka (R4); nezměněné otázky, možnosti a hodnocení (R7) |
| Text u štítku fondu je v rozporu s příslušným Klíčovým informačním dokumentem, opomíjí povinné sdělení nebo jej fakticky nahrazuje (PRIIPs) | Vysoká | Zdokumentovaný KID-alignment review každého textu před nasazením (R9); text zákazníka na KID výslovně odkazuje a KID zůstává dostupný svou standardní cestou (R5) |
| Vysvětlení překročí hranici mezi investiční informací a personalizovaným investičním poradenstvím (MiFID II čl. 24) | Vysoká | Zdokumentovaný obsahový review každého textu před nasazením (R10); texty jsou pro všechny zákazníky totožné a neodkazují na jeho situaci, příjem, cíle ani předchozí odpovědi |
| Tři compliance požadavky (R8, R9, R10) vznikly přímou četbou MiFID II a PRIIPs, protože Compliance pokyny banky neexistují. Regulační výklad tak nikdo v bance nepotvrdil | Vysoká | Žádný text nesmí do produkce bez potvrzení compliance funkcí banky. Vedeno jako D2, D6, D7, D8 |
| Strategický soulad byl posouzen vůči tržní evidenci a validace vůči Strategické základně dosud neproběhla. Iniciativa může být v souladu s trhem a mimo směr banky | Střední | Provést validaci vůči Strategické základně dříve, než se začne realizovat. Vedeno jako D1 a jako otevřená otázka |
| Chybějí výchozí hodnoty. Bez dnešní míry dokončení dotazníku a míry přechodu na pobočku u cílového segmentu nelze výsledek pilotu vyhodnotit jako zlepšení ani jako zhoršení | Střední | Zjistit výchozí hodnoty před spuštěním pilotu. Vedeno jako D9 a D10 |
| Pilot nezachytí obchodní ani vnímanou stránku výsledku, protože běh nedodal metriku obchodní ani metriku vnímání. Mechanismus může fungovat, být pro banku bezcenný, nebo zákazníky obtěžovat, a pilot to neukáže | Střední | Doplnit obě metriky do plánu měření dříve, než pilot začne měřit. Vedeno jako D10 |
| Bankovní omezení neexistují, takže proveditelnost zvoleného vzoru indikátoru na jednotlivých platformách není ověřena a rozsah práce lze podhodnotit | Střední | Rozhodnout návrh interakce a rozsah platforem s dodacím týmem před odhadem rozsahu. Vedeno jako D3, D4, D11 |
| Není určeno, kdo texty vysvětlení píše a udržuje, ani jaká je jejich délka a čtenářská úroveň. Požadavky R4 a R5 nelze naplnit a tři review procesy nemají co posuzovat | Střední | Ustavit tvorbu a správu obsahu před zahájením implementace. Vedeno jako D5 |

---

## Otevrene otazky

- **Strategický soulad.** Posouzení souladu v této iniciativě proběhlo vůči tržní evidenci (A7) a strategické
  analýze v A11 dříve, než měl běh Strategickou základnu k dispozici. Validace vůči ní dosud neproběhla.
  Soulad je proto veden jako předpoklad, nikoli jako ověřený závěr. Kdo validaci provede a kdy (D1).
- **Klíčový výsledek.** Ke kterému klíčovému výsledku banky se iniciativa váže. Běh žádný nedodal a tento
  dokument žádný nedoplňuje.
- **Obchodní metrika a metrika vnímání.** Obě chybějí. Kdo je stanoví, s jakou výchozí hodnotou a kdo za
  ně odpovídá (D10).
- **Potvrzení compliance funkcí.** Tři požadavky R8, R9 a R10 vycházejí z přímé četby MiFID II a PRIIPs.
  Compliance funkce banky je dosud nepotvrdila a bez toho nelze žádný text nasadit (D2, D6, D7, D8).
- **Návrh interakce indikátoru.** Spouštěcí událost, formát zobrazení a způsob zavření (D4).
- **Obsah vysvětlení.** Autorství a správa textů, limit délky na otázku a na štítek, cílová čtenářská
  úroveň a jazykové varianty (D5).
- **Rozsah platforem.** Shodná, nebo přizpůsobená interakce na iOS, Androidu a webu (D11).
- **Přístupnost.** Úroveň souladu s WCAG pro indikátor a pro rozbalené vysvětlení (D12).
- **Plán měření pilotu.** Logované události, prahová hodnota úspěchu, pozorovací období a zpracování
  vzniklých dat (D9, D10).
- **Výchozí hodnoty.** Dnešní míra dokončení dotazníku prvoinvestory, míra přechodu na pobočku a obvyklá
  doba dokončení (D9, D10).
- **Původ identifikátoru.** Klíč SPOCK-102 dodal zadavatel jako fixture (`id_basis: fixture`) — nebyl
  přečten z instance Jira. Pro běh s vytvořeným materiálem je to legitimní základ; na deliverable
  s reálným materiálem by musel být klíč skutečný.

---

## Odkazy

- [A13 – Schválený PRD](../6-prd/2-prd-agreed.md)
- [A11 – Rozšířený MVP (OPT-1)](../5-mvp/2-expanded-mvp.md)
- [A9 – Vybraný nápad (ID-2)](../4-solutions/3-selected-solution.md)
- [A4 – Prioritizovaná sada problémů](../2-problems/5-prioritised-opportunities.md)
- [A1 – Zadání](../1-brief/initiative-brief.md)
