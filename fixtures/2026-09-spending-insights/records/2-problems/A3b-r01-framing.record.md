---
run_id: 2026-09-spending-insights
record_id: R-A3b-01
artifact_id: A3b
item_id: ""
produced_at: 2026-08-28
bounds_hit: []
trace_id: []
sources: [A3, A1]
external_sources: []
run_id: 2026-09-spending-insights
opportunities:
  - id: O1
    from: H1
    description: "Klient s běžným účtem nedokáže zjistit, které opakované platby mu odcházejí, aniž by je dohledával jinde než v aplikaci."
    as_is: "Klient pracuje z výpisu nebo z paměti. Historie plateb v aplikaci je seznam, ve kterém je nutné vědět, co se hledá. Kdo mu odpovídá na lince, vidí karetní platby a příkazy odděleně. Co dorazí místo odpovědi, je platba za službu, kterou si zkusil před dvěma lety."
    outcome: "Klient kdykoli řekne, co mu z účtu pravidelně odchází, a dozví se to tím, že se podívá, ne tím, že mu platba projde."
    segment: "Retailoví klienti s běžným účtem a aktivní mobilní aplikací, kteří mají alespoň jednu opakovanou platbu."
    sizing:
      customers:
        statement: "Nezjištěno pro tuto příležitost. Nikdo neměří, kolika klientů se to týká. Kategorie na lince se používá i na jiné věci a nikdo ji nerozděluje. Počet obvykle drží vlastní analytika produktu a který systém v bance ji drží, není potvrzeno."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Zadání nese jeden produktový cíl vedoucí k LVL-2, podíl na peněžence, na vazbě, že klient, který vidí, co mu odchází, drží na účtu víc peněz. Zúženo sem: klient, který nevidí, nechává část běžných peněz jinde."
        basis: derived
      impact:
        statement: "Produktový manažer to nepovažoval za drahé pro klienta, protože částky bývají malé. Klientka v rozhovoru řekla opak: nevadila jí částka, vadilo jí, že o platbě nevěděla. To je názor jednoho člověka proti výpovědi jednoho klienta, ne výzkum."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Tři reference ze dvou původů v kvalifikované množině, dvě z první ruky, všechny s úplným původem."
        - "Dvě z nich popisují tutéž nepřítomnost ze dvou pozic: klientka, která platbu našla ve výpisu, a klient, kterému linka řekla, že seznam není úplný."
        - "Co důkazy neuvádějí, je kolik lidí to potká a jak často. Žádná reference v materiálu nenese počet."
    root_cause:
      statement: "Karetní platby a příkazy drží banka v oddělených pohledech a nikdo je nespojuje. Uvedl produktový manažer při rámování. Analýza příčin proti systémům neproběhla, takže je to neseno jako domněnka."
      basis: assumption
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Klient, který opakované platby v aplikaci najde do minuty a bez pomoci, by tuto příležitost vyvrátil."
      - "Příčina je výpovědí jednoho člověka. Pokud jsou pohledy spojené a jen nepoužité, je to jiný problém se stejným příznakem."
      - "Pořadí v dalším kroku vzniká na velikosti a velikost žádný počet nenese. Vznikne tedy na úsudku, pokud počet nedorazí dřív."
  - id: O2
    from: H2
    description: "Klient čeká, že zrušením karty zruší i opakované platby, které přes ni chodí."
    as_is: "Klient zruší kartu s tím, že tím věc vyřešil. Platba přijde znovu z nové karty a on ji vidí až potom."
    outcome: "Klient ví, co se s jeho opakovanými platbami stane, když kartu zruší, dřív než ji zruší."
    segment: "Retailoví klienti s běžným účtem, kteří mají opakovanou platbu vázanou na kartu."
    sizing:
      customers:
        statement: "Nezjištěno. Jeden klient. Kolik jich takto postupuje, nikdo neměří."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Neurčeno. Vazba na klíčový výsledek zde není přímá a odvozovat ji by znamenalo ji vymyslet."
        basis: derived
      impact:
        statement: "Klient popsal následek věcně a nehodnotil ho. Nikdo jiný se k závažnosti nevyjádřil."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Jedna reference z jednoho původu, z první ruky, s úplným původem."
        - "Druhý původ, který by totéž potvrdil, materiál nenese."
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Data ukazující, že klienti po zrušení karty opakované platby nečekají, by tuto příležitost vyvrátila."
      - "Stojí na jednom původu a značka `weak` to říká."
  - id: O3
    from: H3
    description: "Klient drží druhý účet u jiné banky, protože neví, co je na kterém."
    as_is: "Klient si druhý účet nechává jako pojistku. Peníze má rozdělené a neví přesně jak."
    outcome: "Klient si je jistý, co má na kterém účtu, a druhý účet drží z jiného důvodu nebo vůbec."
    segment: "Retailoví klienti se dvěma běžnými účty u různých bank."
    sizing:
      customers:
        statement: "Nezjištěno. Jeden klient uvedl tento důvod sám."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Zadání vede k LVL-2, podíl na peněžence. Klient, který drží druhý účet z nejistoty, je přesně ten podíl, který banka nemá."
        basis: derived
      impact:
        statement: "Nezjištěno. Nikdo se k závažnosti nevyjádřil."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Jedna reference z jednoho původu, z první ruky, s úplným původem."
        - "Nikdo další tento důvod nepotvrzuje."
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Klienti se dvěma účty, kteří uvádějí jiný důvod, by tuto příležitost oslabili."
      - "Stojí na jednom původu a značka `weak` to říká."
  - id: O4
    from: H4
    description: "Klient se na neočekávanou platbu ptá proto, aby zjistil, co to bylo, a odpověď hledá na lince."
    as_is: "Klient volá. Operátorka platbu dohledá a řekne mu, kdo to je. Klient si ji pak obvykle zruší sám u obchodníka."
    outcome: "Klient si odpověď na otázku co to bylo najde sám a linku k tomu nepotřebuje."
    segment: "Retailoví klienti, kteří se obracejí na linku s dotazem na platbu."
    sizing:
      customers:
        statement: "Nezjištěno. Operátorka odhadla několik denně a označila to za dojem. Kategorie se používá i na jiné věci a nikdo ji nerozděluje."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Neurčeno přímo. Vazba na LVL-2 je zde nepřímá a odvozovat ji by znamenalo ji vymyslet."
        basis: derived
      impact:
        statement: "Operátorka uvedla, že klient nechce peníze zpátky, chce vědět, co to je. To je popis motivu, ne hodnocení závažnosti."
        basis: judgement
    validation:
      trust: strong
      insights:
        - "Dvě reference ze dvou původů, jedna z první ruky a jedna agregovaná, obě s úplným původem."
        - "Výpověď operátorky a rozdělení patnácti tiketů se shodují v tom, že jde o dotaz, ne o reklamaci."
    root_cause:
      statement: "Operátorka uvedla, že po dohledání si klient platbu zruší sám u obchodníka a linka mu jen řekne, kdo to je. Uvedla to jako popis běžného průběhu, ne jako výsledek analýzy."
      basis: assumption
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Rozdělení tiketů, ve kterém převažují skutečné reklamace nad dotazy, by tuto příležitost vyvrátilo."
      - "Odhad počtu je dojem jednoho člověka a stojí zde jako dojem."
  - id: O5
    from: H5
    description: "Klientovi po vyřešení jednoho případu nezůstane nic, co by mu příště pomohlo."
    as_is: "Klient zavolá, dostane odpověď a případ se uzavře. Příště začíná znovu od nuly."
    outcome: "Klient, který jednou zjistil, co mu odchází, se příště zeptat nemusí."
    segment: "Retailoví klienti, kteří se na linku obracejí opakovaně."
    sizing:
      customers:
        statement: "Nezjištěno. U šesti z devíti tiketů je poznámka, že klient podobnou věc už jednou řešil; kolik klientů to je, export neuvádí."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Neurčeno."
        basis: derived
      impact:
        statement: "Nezjištěno. Nikdo se k závažnosti nevyjádřil."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Jedna agregovaná reference z jednoho původu, s úplným původem."
        - "Žádný z rozhovorů to nepotvrzuje."
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Data ukazující, že klient po jednom vyřešení už nevolá, by tuto příležitost vyvrátila."
      - "Poznámka operátora je jediný nositel a je agregovaná."
  - id: O6
    from: H6
    description: "Banka nedokáže klientovi ukázat, co mu z účtu pravidelně odchází, přestože data k tomu drží."
    as_is: "Transakce jsou v systému a opakování se dá poznat. Způsob, jak výsledek klientovi ukázat, neexistuje."
    outcome: "Data, která banka drží, se klientovi dostanou v podobě, které rozumí."
    segment: "Retailoví klienti s běžným účtem a aktivní mobilní aplikací."
    sizing:
      customers:
        statement: "Nezjištěno. Jde o stav banky, ne o počet klientů."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Neurčeno."
        basis: derived
      impact:
        statement: "Nezjištěno. Produktový manažer to popsal jako chybějící schopnost, ne jako újmu klienta."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Jedna reference z jednoho původu, z první ruky, s úplným původem."
        - "Pohled ze strany systémů materiál nenese."
    root_cause:
      statement: "Klasifikaci obchodníka by banka musela koupit; interně ji neumí a v letošním rozpočtu na ni nemá prostředky. Uvedl produktový manažer."
      basis: assumption
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Existující obrazovka, která opakované platby ukazuje, by tuto příležitost vyvrátila."
      - "Omezení rozpočtu je stav této iniciativy, ne trhu, a může se do fáze 5 změnit."
  - id: O7
    from: H7
    description: "Seznam pravidelných plateb, který linka klientovi přečte, není úplný."
    as_is: "Operátorka klientovi přečte, co vidí, a sama mu řekne, že to není všechno."
    outcome: "Kdokoli, kdo klientovi odpovídá, vidí jeho opakované platby celé."
    segment: "Retailoví klienti volající na linku a operátoři, kteří jim odpovídají."
    sizing:
      customers:
        statement: "Nezjištěno."
        basis: unknown
      market:
        statement: "Odloženo na fázi konkurenční analýzy, která přesně tento materiál vyrábí a běží až po rozhodovací bráně této fáze. Nikdo zde na to odpovědět nemůže, a označit to jako neznámé by řeklo, že to neví nikdo."
        basis: deferred_to_stage_3
      company:
        statement: "Neurčeno."
        basis: derived
      impact:
        statement: "Nezjištěno."
        basis: judgement
    validation:
      trust: weak
      insights:
        - "Jedna tlumočená reference z jednoho původu, s úplným původem."
        - "Linka sama se k tomu nevyjádřila; klient opakuje, co mu bylo řečeno."
    alternatives: "Zde žádné, záměrně. Stage 4 je krok, který je vyrábí, a fáze 7 je váže zpět; návrh napsaný při rámování by ukotvil čtenáře na bráně a nechal ideaci pracovat z odpovědi místo z problému."
    metrics:
      behavioural: "Ze zadání: klient po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů."
      business: "Podíl klientů, kteří tak učiní, vedoucí k LVL-2, podíl na peněžence."
      qualitative: "Nezjištěno. Zadání označilo tento údaj jako neznámý a mezera se sem dědí z fáze 1, není nová."
      horizon: "Tři měsíce od spuštění, ze zadání."
    risks:
      - "Jeden pohled linky, ve kterém jsou karetní platby i příkazy vidět společně, by tuto příležitost vyvrátil."
      - "Pozorování je tlumočené a vzdálenost k události je o krok větší."
---

# Záznam R-A3b-01 — A3b

Jedna produkce. Není psáno pro čtenáře; dokument z něj sestavený je 2-problems/4-framed-opportunities.md.
