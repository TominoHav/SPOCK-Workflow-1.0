---
run_id: 2026-09-spending-insights
artifact_id: A3b
ost_role: opportunity
status: accepted
workflow: problems
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "the opportunity outcome states a change in behaviour and never a thing to build"
    needs: judge
    reach: artifact
produced_by:
  agent: hypothesis-designer
  skill: opportunity-framing
sources: [A3, A1]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A3b-01]
---

# Problems | Zarámované příležitosti

Sedm hypotéz vychází z rámování jako sedm příležitostí, žádná nepřibyla a žádná nechybí. Tři nesou uvedenou příčinu a čtyři ji nenesou, protože ji nikdo neuvedl a odvodit ji by znamenalo ji vymyslet. **Ani jedna z nich nenese počet klientů**, protože ho nikdo nedrží: kategorie na lince se používá i na jiné věci a nikdo ji nerozděluje. [rec:R-A3b-01]

Tržní pohled je u všech sedmi odložen na fázi 3, ne označen jako neznámý. Fáze 3 přesně tento materiál vyrábí a běží po bráně, ke které tento dokument jde.

## Co materiál říká

Dvě příležitosti stojí na dvou původech. **O1**, že klient nedokáže zjistit, co mu odchází, a **O4**, že se na neočekávanou platbu ptá proto, aby zjistil, co to bylo. Zbylých pět stojí na jednom původu a nesou to na sobě.

Tři nesou příčinu, kterou někdo uvedl. U O1 produktový manažer řekl, že karetní platby a příkazy drží banka v oddělených pohledech a nikdo je nespojuje, a označil to za svůj názor. U O4 operátorka popsala, že klient si po dohledání platbu obvykle zruší sám. U O6 produktový manažer uvedl, že klasifikaci obchodníka by banka musela koupit a nemá na ni rozpočet. **Všechny tři jsou nesené jako domněnka a žádná nedědí značku důvěry.**

## Odkud pochází

Sedm příležitostí ze sedmi hypotéz, jedna za jednu. Každá si nese značku důvěry, kterou hypotéza dostala z aritmetiky, a insighty pod ní říkají, kolik původů kvalifikovaná množina obsahuje a co v ní chybí.

Alternativy jsou u všech sedmi prázdné a pole říká proč: je vyrábí stage 4, tato fáze rámuje příležitost, a návrh napsaný zde by dorazil k bráně jako zvážená možnost.

## O1: Klient nevidí, co mu pravidelně odchází

**Jak to je dnes.** Klient pracuje z výpisu nebo z paměti. Historie plateb v aplikaci je seznam, ve kterém je nutné vědět, co se hledá. Kdo mu odpovídá na lince, vidí karetní platby a příkazy odděleně. Co dorazí místo odpovědi, je platba za službu, kterou si zkusil před dvěma lety.

**Cílový stav.** Klient kdykoli řekne, co mu z účtu pravidelně odchází, a dozví se to tím, že se podívá, ne tím, že mu platba projde.

**Pro koho.** Retailoví klienti s běžným účtem a aktivní mobilní aplikací, kteří mají alespoň jednu opakovanou platbu.

**Značka důvěry `strong`.** Příčinu uvedl člověk a je nesena jako domněnka: Karetní platby a příkazy drží banka v oddělených pohledech a nikdo je nespojuje. Uvedl produktový manažer při rámování. Analýza příčin proti systémům neproběhla, takže je to neseno jako domněnka.

**Kolika klientů se to týká.** Nezjištěno pro tuto příležitost. Nikdo neměří, kolika klientů se to týká. Kategorie na lince se používá i na jiné věci a nikdo ji nerozděluje. Počet obvykle drží vlastní analytika produktu a který systém v bance ji drží, není potvrzeno.

## O2: Zrušení karty platby neruší

**Jak to je dnes.** Klient zruší kartu s tím, že tím věc vyřešil. Platba přijde znovu z nové karty a on ji vidí až potom.

**Cílový stav.** Klient ví, co se s jeho opakovanými platbami stane, když kartu zruší, dřív než ji zruší.

**Pro koho.** Retailoví klienti s běžným účtem, kteří mají opakovanou platbu vázanou na kartu.

**Značka důvěry `weak`.** Příčinu nikdo neuvedl a odvodit ji by znamenalo ji vymyslet.

**Kolika klientů se to týká.** Nezjištěno. Jeden klient. Kolik jich takto postupuje, nikdo neměří.

## O3: Druhý účet jako pojistka

**Jak to je dnes.** Klient si druhý účet nechává jako pojistku. Peníze má rozdělené a neví přesně jak.

**Cílový stav.** Klient si je jistý, co má na kterém účtu, a druhý účet drží z jiného důvodu nebo vůbec.

**Pro koho.** Retailoví klienti se dvěma běžnými účty u různých bank.

**Značka důvěry `weak`.** Příčinu nikdo neuvedl a odvodit ji by znamenalo ji vymyslet.

**Kolika klientů se to týká.** Nezjištěno. Jeden klient uvedl tento důvod sám.

## O4: Dotaz na platbu končí na lince

**Jak to je dnes.** Klient volá. Operátorka platbu dohledá a řekne mu, kdo to je. Klient si ji pak obvykle zruší sám u obchodníka.

**Cílový stav.** Klient si odpověď na otázku co to bylo najde sám a linku k tomu nepotřebuje.

**Pro koho.** Retailoví klienti, kteří se obracejí na linku s dotazem na platbu.

**Značka důvěry `strong`.** Příčinu uvedl člověk a je nesena jako domněnka: Operátorka uvedla, že po dohledání si klient platbu zruší sám u obchodníka a linka mu jen řekne, kdo to je. Uvedla to jako popis běžného průběhu, ne jako výsledek analýzy.

**Kolika klientů se to týká.** Nezjištěno. Operátorka odhadla několik denně a označila to za dojem. Kategorie se používá i na jiné věci a nikdo ji nerozděluje.

## O5: Vyřešení jednoho případu nezůstane

**Jak to je dnes.** Klient zavolá, dostane odpověď a případ se uzavře. Příště začíná znovu od nuly.

**Cílový stav.** Klient, který jednou zjistil, co mu odchází, se příště zeptat nemusí.

**Pro koho.** Retailoví klienti, kteří se na linku obracejí opakovaně.

**Značka důvěry `weak`.** Příčinu nikdo neuvedl a odvodit ji by znamenalo ji vymyslet.

**Kolika klientů se to týká.** Nezjištěno. U šesti z devíti tiketů je poznámka, že klient podobnou věc už jednou řešil; kolik klientů to je, export neuvádí.

## O6: Data banka drží a nemá je jak ukázat

**Jak to je dnes.** Transakce jsou v systému a opakování se dá poznat. Způsob, jak výsledek klientovi ukázat, neexistuje.

**Cílový stav.** Data, která banka drží, se klientovi dostanou v podobě, které rozumí.

**Pro koho.** Retailoví klienti s běžným účtem a aktivní mobilní aplikací.

**Značka důvěry `weak`.** Příčinu uvedl člověk a je nesena jako domněnka: Klasifikaci obchodníka by banka musela koupit; interně ji neumí a v letošním rozpočtu na ni nemá prostředky. Uvedl produktový manažer.

**Kolika klientů se to týká.** Nezjištěno. Jde o stav banky, ne o počet klientů.

## O7: Seznam na lince není úplný

**Jak to je dnes.** Operátorka klientovi přečte, co vidí, a sama mu řekne, že to není všechno.

**Cílový stav.** Kdokoli, kdo klientovi odpovídá, vidí jeho opakované platby celé.

**Pro koho.** Retailoví klienti volající na linku a operátoři, kteří jim odpovídají.

**Značka důvěry `weak`.** Příčinu nikdo neuvedl a odvodit ji by znamenalo ji vymyslet.

**Kolika klientů se to týká.** Nezjištěno.

## Co se nepodařilo zjistit

Ani jedna ze sedmi příležitostí nenese počet klientů. Nikdo ho nedrží, kategorie na lince se používá i na jiné věci, a odhad, který zazněl, sám mluvčí označil za dojem.

Čtyři příležitosti nenesou příčinu, protože ji nikdo neuvedl. Tři ji nesou a všechny tři jsou označené jako domněnka jednoho člověka.

Kvalitativní signál zadání označilo jako neznámý a mezera se sem dědí z fáze 1, není nová.

Tržní pohled je odložen na fázi 3, ne neznámý. Rozdíl mezi tím je celý důvod, proč se sem nepíše `unknown`.

## Jak to vzniklo

Krok 2.3, `opportunity-framing`, agent `hypothesis-designer`. Rozsah dat této vazby vylučuje A2 i A2b, takže rámování pracuje s hypotézami a se zadáním, ne se surovým materiálem.

Značky důvěry jsou zděděné z hypotéz a nejsou zde přidělovány znovu. Uvedená příčina nedědí značku a nese vlastní základ.
