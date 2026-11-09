---
run_id: 2026-09-spending-insights
artifact_id: A1b
ost_role: none
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify: []
produced_by:
  agent: product-owner
  skill: compliance-screening
sources: [A1]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A1b-01]
---

# Discovery | Regulatorní screening iniciativy: opakované platby

Ze čtyřiceti devíti sledovaných oblastí jich je čtrnáct ve hře, devatenáct nespustil žádný spouštěč a šestnáct nelze z rámování rozhodnout. Eskalační příznak je nastaven a devět spouštěčů se rozeznělo. **Nejtěžší část je ochrana osobních údajů**: z platby lze nezáměrně odvodit údaj o zdraví nebo o víře, klasifikace transakcí probíhá automaticky, a posouzení vlivu neproběhlo. [rec:R-A1b-01]

Šestnáct nerozhodnutých oblastí není nedbalost. Každá z nich závisí na vstupu, který popisuje podobu řešení, a v této fázi žádné řešení neexistuje. Každý takový záznam nese jméno chybějícího vstupu, takže je vidět, co je potřeba zjistit, ne jen že něco chybí.

## Co je ve hře

V oblasti dodržování předpisů je ve hře pět oblastí: ochrana klienta a komunikace, řízení produktu a cílový trh, střety a pobídky, distribuce a třetí strany, a přístupnost. Poslední z nich je ta, kterou žádný z dosavadních běhů sám od sebe nepojmenoval, přestože každý z nich byl klientskou digitální cestou.

V ochraně osobních údajů je ve hře pět oblastí: právní základ a účel, transparentnost, zvláštní kategorie, automatizované rozhodování a profilování, a odpovědnost včetně posouzení vlivu.

V právní oblasti jsou ve hře tři: odstoupení a ukončení, jazyk a trvalý nosič, a smlouvy s dodavateli. V IKT a bezpečnosti je ve hře jedna: závislost na třetí straně.

## Co nespustil žádný spouštěč

Devatenáct oblastí nespustil žádný spouštěč, a to je tvrzení o popisu, ne o předpisu. Investiční, pojistné a úvěrové oblasti nespustil typ produktu, protože ten je uveden a žádnou z těchto tří funkčností nemá. Cena a poplatky se nemění. O udržitelnosti se nic netvrdí. Marketing a sledování zařízení popis vylučuje.

Platební funkčnost je hraniční a je zapsána jako nespuštěná: funkce čte transakční historii a žádnou platbu neiniciuje ani nemění. Toto je posouzení, které přijímá člověk na bráně.

## Co nelze rozhodnout a co k tomu chybí

Šestnáct oblastí nelze rozhodnout. Devět z nich čeká na to, jaké systémy budou dotčeny, kde data poběží, kdo je bude zpracovávat a jak dlouho se budou uchovávat. Tři čekají na bezpečnostní opatření a na podobu dat v klidu a při přenosu. Dvě čekají na kontroly a monitoring. Jedna čeká na použitý obsah a software a jedna na to, zda je dotčená služba registrovaná pod kybernetickým režimem.

Každý z těchto vstupů je v zadání označen jako zjistitelný až ve chvíli, kdy existují varianty řešení. Screening na variantách se proto bude lišit od tohoto a to je jeho účel.

## Eskalace

Příznak je nastaven a rozeznělo se devět spouštěčů. Tři z nich se spouštějí právě nevyřešeností: nemožnost popsat kontroly, nemožnost uvést očekávané zotavení a nemožnost klasifikovat pravděpodobný incident. Tyto spouštěče existují pro tuto podmínku a nevyřešenost je neumlčuje.

**Žádná karta neuvádí roli, na kterou se spouštěč směruje.** Přepis od ČS uvádí čtrnáct spouštěčů a žádnou roli, a tři karty psané tímto týmem tento nedostatek zdědily. Každý rozeznělý spouštěč proto nese `unstated` a je to fakt o kartách, ne o tomto běhu.

## Co se nepodařilo zjistit

Hodnota regulatorní složitosti se v tomto screeningu neprodukuje a ani produkovat nemá. Drží ji požadavek `CR-C6`, dokud všechny čtyři oblasti nemají kartu od ČS. Karty existují čtyři a tři z nich psal tento tým.

Tři ze čtyř karet nejsou dokumentem ČS. Vše, co z nich vychází, nese toto označení, a screening je nese také.

Šestnáct oblastí zůstalo nerozhodnutých a každá nese jméno vstupu, který by ji rozhodl.

## Jak to vzniklo

Krok 1.2, `compliance-screening`, agent `product-owner`. Spouštěče a oblasti pocházejí ze čtyř karet regulatorních oblastí; nic zde neuvádí povinnost, práh ani datum, které by na kartě nebylo.

Screening nevydává soud o dodržování předpisů. Každé tvrzení je tvrzením o popisu iniciativy.
