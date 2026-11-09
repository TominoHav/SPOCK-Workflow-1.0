---
run_id: 2026-09-spending-insights
artifact_id: A1
ost_role: outcome
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "no field is inferred; an unsupplied field is marked unknown with a reason"
    needs: judge
    reach: process
produced_by:
  agent: product-owner
  skill: brief-creation
sources: []
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A1-01]
decision:
  gate: G1
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: product_manager
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
  note: "Přijato v rámci stojícího pokynu z 28. srpna 2026: každá volba je první nabízená možnost. Zdůvodnění zde není, protože žádné nezaznělo."
---

# Discovery | Iniciativní zadání: opakované platby

Klient s běžným účtem neví, které opakované platby a předplatná mu z účtu odcházejí, a zjistí to až ve chvíli, kdy platba proběhne nebo kdy mu ji reklamační tým dohledá. Tato iniciativa hledá způsob, jak mu ten přehled dát dřív, než odejde další platba. Úspěch měříme podílem klientů, kteří po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů. [rec:R-A1-01]

Dva ze sedmi volitelných údajů zůstaly neznámé a jsou tak označené, ne dopočítané. Třicet pět ze čtyřiceti sedmi vstupů pro regulatorní screening má hodnotu; dvanáct z nich je označeno jako zjistitelné až ve chvíli, kdy existují varianty řešení, a nese to důvod na sobě.

## Cílový stav

Klient s běžným účtem ví, které opakované platby mu z účtu odcházejí, ještě než odejde další.

Formulace je změna stavu, ne věc k postavení. Víc než jedna věc ji může způsobit: seznam v aplikaci, upozornění před platbou, měsíční souhrn, nebo to, že banka platbu sama označí. Produktový manažer první formulaci uvedl jako obrazovku v aplikaci; navržená změna byla přijata beze změny.

## Pro koho to je

Retailoví klienti s běžným účtem a aktivní mobilní aplikací.

Firemní klienti v zadání nejsou. Klienti bez aktivní aplikace se přehledu nedostanou a zadání s nimi nepočítá.

## Proč právě teď

Reklamační tým hlásí opakované dotazy na platby, které klient nečekal. Číslo za tím nikdo nedrží, a produktový manažer to řekl výslovně: kolik takových dotazů přijde, nikdo neměří.

## Jak poznáme úspěch

Produktový cíl je, aby klient své opakované platby v aplikaci našel a rozuměl jim. Měřítkem je podíl klientů, kteří po zobrazení přehledu zruší nebo změní alespoň jednu opakovanou platbu do třiceti dnů.

Klíčový výsledek, ke kterému to vede, je LVL-2, podíl na peněžence. Vazbu uvedl produktový manažer vlastními slovy: klient, který vidí, co mu z účtu odchází, drží na účtu víc peněz a méně jich vede jinde. Účet přestává být jen průtokový.

Měřit to lze po třech měsících od spuštění. Jak by tým poznal, že se změna stala mimo tuto metriku, a co by klient řekl jinak, zůstalo neznámé.

## Co je v rozsahu a co ne

V rozsahu je přehled opakovaných plateb a předplatných pro retailové klienty a upozornění před další platbou. Trh se prohledává na toto téma v segmentu retailového bankovnictví; zemi zadání nestanovuje, protože pořadí hledání si určují standardy konkurenční analýzy samy.

Mimo rozsah je pohyb penězi. Funkce nic neruší ani nemění, jen ukazuje. Dodavatel klasifikace transakcí není vybrán a rozpočet na něj není schválen, což je omezení této iniciativy, ne stav trhu.

## Co klient řekl o datech

Funkce čte transakční historii klienta, takže osobní údaje v ní jsou. Produktový manažer uvedl plnění smlouvy pro zobrazení a souhlas pro upozornění, a označil to za svůj názor, ne za stanovisko právního útvaru. Také řekl, že z platby lze nezáměrně odvodit údaj o zdraví nebo o víře, například platba za léky nebo církevní příspěvek, a že o posouzení vlivu na ochranu osobních údajů neví, zda je vyžadováno.

Klasifikace transakcí do kategorií probíhá automaticky. O klientovi nic nerozhoduje a nemá pro něj právní účinek.

## Co se nepodařilo zjistit

Dva volitelné údaje zadání zůstaly neznámé: jak by tým poznal, že se změna stala, a co by klient řekl jinak. Ani jeden nebyl dopočítán.

Dvanáct vstupů pro regulatorní screening nešlo položit při rámování, protože popisují podobu řešení, které ještě neexistuje: dotčené systémy, jejich kritičnost, umístění dat, zpracovatelé, doby uchování, bezpečnostní opatření, data v klidu a při přenosu, použité komponenty, způsob nasazení, očekávané zotavení, kontroly a monitoring, a použitý obsah a software. Každý z nich nese důvod a odkaz na tělo, které ho takto označuje.

Kolik klientů se dotazuje na nečekané platby, neví nikdo. Reklamační tým to hlásí jako opakovaný jev a číslo za tím nedrží.

## Jak to vzniklo

Krok 1.1, `brief-creation`, agent `product-owner`. Zadání vzniklo v rozhovoru; žádné pole nebylo odvozeno z kontextu ani z tématu. Jazyk běhu je `cs` a byl zvolen jako deklarovaná výchozí hodnota podle §6.2 rodičovské smlouvy.

Rozhodnutí na branách v tomto běhu přijal Igor Tadić v rámci stojícího pokynu ze dne 28. srpna 2026: každá volba je první nabízená možnost. Zdůvodnění k nim není zaznamenáno, protože žádné nezaznělo.
