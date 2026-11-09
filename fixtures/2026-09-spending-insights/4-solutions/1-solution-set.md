---
run_id: 2026-09-spending-insights
artifact_id: A8
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "3..7 solutions, each a distinct combination of opportunities, never a rephrasing"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: ideation
sources: [A1, A4, A3b, A7]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A8-01]
---

# Discovery | Návrhy řešení: opakované platby

Pět návrhů, každý jinou kombinací příležitostí, žádný přepsáním jiného. **Trh říká, že samotné zobrazení je parita a hranice soutěže je zásah u obchodníka**, a návrhy se rozprostírají přesně přes tu hranici: dva dorovnávají, dva jdou za ni a jeden odpovídá na otázku, se kterou klient volá. [rec:R-A8-01]

Žádný návrh nenese skóre, pořadí ani doporučení. Hodnocení je samostatný krok a výběr je člověka na bráně.

## I1: Přehled opakovaných plateb v aplikaci

### Co to je

Obrazovka v aplikaci, která z transakční historie klienta vyskládá opakující se položky a ukáže je jako seznam. U každé je jméno obchodníka, částka, jak často chodí a kdy podle poslední platby přijde příští.

### Co to dělá

Nese se na O1 a O6. Trh to má jako paritu: osm z deseti účastníků ukazuje obchodníka a šest vede předplatné jako vlastní kategorii. Tohle dorovná trh a nepředběhne ho.

### Jak to funguje

Klasifikace obchodníka běží u dodavatele obohacení transakčních dat. Detekce opakování běží nad vlastními daty banky. Klient nic nenastavuje.

### Komu to je

Retailoví klienti s běžným účtem a aktivní aplikací, kteří mají alespoň jednu opakovanou platbu.

### Proč zrovna tahle banka

Banka data drží a klasifikaci si musí koupit. Nikdo jiný nemá úplnou transakční historii klienta u tohoto účtu.

Regulatorní dotyky, které přebírá z přijatého screeningu: A1.S1, A1.S13, A2.G1, A2.G6.

---

## I2: Upozornění před další platbou

### Co to je

Push upozornění několik dní před očekávanou platbou, s obchodníkem a částkou. Klient si je zapíná v nastavení.

### Co to dělá

Nese se na O1 a O2. Revolut je jediný z deseti, kdo upozorňuje před splatností, a je to nejmladší z pozorovaných schopností. Řeší i to, co klient v materiálu popsal: nevadila mu částka, vadilo, že o platbě nevěděl.

### Jak to funguje

Odhad data vychází z historie stejné platby. Upozornění jde stávající cestou pro notifikace.

### Komu to je

Titíž, plus ti, kterým vadí nečekaná platba víc než její výše.

### Proč zrovna tahle banka

Upozornění jde stávající cestou a banka jako jediná ví, kdy platba přijde, protože zná historii.

Regulatorní dotyky, které přebírá z přijatého screeningu: A1.S1, A2.G1, A2.G2.

---

## I3: Jeden pohled na inkasa, příkazy i karetní předplatné

### Co to je

Jedna obrazovka místo tří. Klient nevidí, jakou cestou platba chodí, jen že chodí.

### Co to dělá

Nese se na O1 a O7. Britské neobanky to takto mají a žádná česká banka ve vzorku ne. Přesně tuhle neúplnost operátorka klientovi popsala: karetní platby a příkazy vidí odděleně.

### Jak to funguje

Sloučení tří zdrojů dat do jednoho pohledu. Rozdíl mezi kanály zůstává v detailu, ne v navigaci.

### Komu to je

Klienti, kteří platí zároveň kartou, inkasem i příkazem, tedy většina těch s běžným účtem.

### Proč zrovna tahle banka

Tři zdroje dat drží banka a nikdo jiný je nemá pohromadě. Externí aplikace vidí jen to, co jí klient nasdílí.

Regulatorní dotyky, které přebírá z přijatého screeningu: A1.S1, A1.S13, A2.G2.

---

## I4: Zásah u obchodníka: zablokovat další platbu

### Co to je

Tlačítko u položky v seznamu. Blokace zastaví další platby danému obchodníkovi a kartu nechá být.

### Co to dělá

Nese se na O2 a O4. Hranice soutěže se posunula sem: čtyři z deseti to umí a dva další ohlásili. Řeší i to, co klient v materiálu udělal špatně, když zrušil kartu a platba přišla z nové.

### Jak to funguje

Blokace na úrovni karetního tokenu u obchodníka. Klient ji může kdykoli zrušit.

### Komu to je

Klienti, kteří chtějí platbu zastavit a dnes za tím ruší kartu.

### Proč zrovna tahle banka

Blokace na úrovni tokenu je banky, ne obchodníka ani třetí strany. Nikdo jiný ji provést nemůže.

Regulatorní dotyky, které přebírá z přijatého screeningu: A1.S1, A1.S8, A3.L4, A4.I2.

---

## I5: Odpověď na otázku co to bylo, bez volání na linku

### Co to je

Detail platby s obchodníkem, kategorií a předchozími platbami téhož druhu. Cílem je odpovědět na otázku, se kterou klient volá.

### Co to dělá

Nese se na O4 a O5. Nejčastější dotaz na lince není reklamace, ale dotaz co to bylo. Devět z patnácti tiketů je přesně to, a u šesti z devíti klient tutéž věc už jednou řešil.

### Jak to funguje

Obohacení transakčních dat dodá jméno a kategorii. Historie je vlastní.

### Komu to je

Klienti, kteří dnes volají na linku s dotazem, co byla ta platba.

### Proč zrovna tahle banka

Odpověď dnes dává linka téže banky. Tohle přesouvá tutéž odpověď o krok dřív, ke stejným datům.

Regulatorní dotyky, které přebírá z přijatého screeningu: A1.S1, A1.S12, A2.G2.

## Co se nepodařilo zjistit

Kolika klientů se každý z návrhů týká, neví nikdo. Ani jedna ze sedmi příležitostí nenese počet a pořadí ve fázi 2 vzniklo bez něj.

Zda je dodavatel klasifikace transakcí dostupný v rozpočtu, není známo. Produktový manažer uvedl, že v letošním rozpočtu prostředky nejsou, a všech pět návrhů se o klasifikaci opírá různou měrou.

Zda by řešení, které mají britské neobanky, fungovalo na českých platebních tocích, tento běh neověřuje.

## Jak to vzniklo

Krok 4.1, `ideation`, agent `product-owner`. Pět návrhů vzniklo po jednom, každý jako vlastní produkce, a spojil je skript.

Regulatorní dotyky nejsou vymyšlené zde. Každý návrh přebírá množinu z přijatého screeningu iniciativy a přidává k ní jen to, co se týká jeho vlastní podoby.
