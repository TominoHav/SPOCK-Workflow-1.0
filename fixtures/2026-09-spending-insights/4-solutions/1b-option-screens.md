---
run_id: 2026-09-spending-insights
artifact_id: A8c
ost_role: solution
status: accepted
workflow: discovery
modified_by: agent
revisions: 0
could_not_verify:
  - rule: "no complexity value and no score is written here"
    needs: judge
    reach: artifact
produced_by:
  agent: product-owner
  skill: option-screening
sources: [A8, A1b]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A8c-01]
---

# Discovery | Regulatorní screening variant: opakované platby

Pět screeningů, jeden na variantu, každý vycházející z přijatého screeningu iniciativy. **Varianty se od sebe regulatorně liší méně, než se liší produktově**, a to je samo o sobě zjištění: tři z pěti nesou množinu iniciativy beze změny. [rec:R-A8c-01]

Žádná hodnota složitosti zde není a být nemá. Drží ji `CR-C6`, dokud všechny čtyři oblasti nemají kartu od ČS, a tři ze čtyř psal tento tým.

## Čím se varianty liší

**I5, odpověď bez volání na linku, jako jediná ubírá.** Odpověď na dotaz ke konkrétní platbě se skládá z dat, která banka drží, takže spouštěč nového partnera se nerozezní. Padá s ním dodavatelský vztah i distribuční řetězec, dvě oblasti. Důvod je zapsaný a čtenář s ním může nesouhlasit.

**I4, zásah u obchodníka, jako jediná přidává.** Blokace mění, zda platba proběhne, takže se rozezní spouštěč platební funkčnosti a s ním oblast platebních služeb, kterou zobrazovací varianty nemají. Přidává i jeden eskalační spouštěč, protože se dotýká smluvního vztahu klienta s obchodníkem. Přidávat smí varianta bez zdůvodnění; ubírat jen s napsaným důvodem.

**I1, I2 a I3 nesou množinu iniciativy beze změny.** Všechny tři jsou zobrazení nad toutéž klasifikací a žádná nemění, co se s penězi děje. U I2 se nabízelo ubrat přístupnost, protože upozornění nepřidává obrazovku, ale push zpráva je klientské rozhraní jako každé jiné a spouštěče, které přístupnost rozeznívají, se rozeznívají dál.

## Co to znamená pro srovnání

Kdyby složitost šla dnes spočítat, rozlišovala by dvě varianty z pěti a tři by z ní vyšly stejně. **Rozdíl mezi nejlehčí a nejtěžší variantou jsou tři oblasti**: I5 nese o dvě méně, I4 o jednu víc než tři zobrazovací varianty uprostřed.

To je ta situace, kterou screening variant existuje odhalit. Kdyby všechny varianty zdědily stejnou množinu, obtížnostní strana srovnání by nerozlišovala nic. Zde rozlišuje o tři oblasti a o jeden eskalační spouštěč. Je to málo, a je to poctivé množství.

## Co se nepodařilo zjistit

Šestnáct oblastí zůstává nerozhodnutých u všech pěti variant, protože závisí na vstupech, které popisují podobu řešení. Ta ve fázi 4 stále neexistuje: varianta je směr, ne návrh.

Žádná karta neuvádí roli, na kterou se eskalace směruje. Všech devět až deset rozezněných spouštěčů nese `unstated` a je to fakt o kartách.

## Jak to vzniklo

Krok 4.2, `option-screening`, agent `product-owner`. Každý screening vychází z přijatého screeningu iniciativy a přidávat smí bez zdůvodnění; ubírat jen s napsaným důvodem.

Hodnota složitosti ani skóre zde nejsou. Skóre je krok 4.3 a hodnotu drží `CR-C6`.
