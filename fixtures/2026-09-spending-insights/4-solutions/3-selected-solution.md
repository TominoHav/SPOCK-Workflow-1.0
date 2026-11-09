---
run_id: 2026-09-spending-insights
artifact_id: A9
ost_role: solution
status: accepted
workflow: discovery
modified_by: human
revisions: 0
could_not_verify: []
sources: [A8, A8b, A8c]
external_sources: []
assembled_at: 2026-08-28
assembled_from: [R-A9-01]
decision:
  gate: G4
  by_agent: false
  accepted_by:
    - name: Igor Tadić
      role: Product Lead
  accepted_at: 2026-08-28
  changed_during_refinement: none
  refinements: []
  selection: I2
---

# Discovery | Vybraná varianta: upozornění před platbou

**Vybrána je I2, upozornění před platbou.** Klient dostane zprávu předtím, než se opakovaná platba strhne, a může ji zrušit, změnit nebo nechat proběhnout. [rec:R-A9-01]

Rozhodnutí učinil Igor Tadić 28. srpna 2026 a stojí na pravidle, které zadal předem: bere se varianta s nejvyšším skóre přínosu.

## Co bylo vybráno

I2. Před každou opakovanou platbou dostane klient zprávu s částkou, příjemcem a datem, a ze zprávy může platbu zrušit nebo změnit. Zpráva chodí u trvalých příkazů, inkas i karetních předplatných.

Varianta byla vybrána na třiceti bodech ze třiceti za strategické napojení. Obtížnostní osa nenese hodnotu.

## Co to řeší

Klient dnes o opakované platbě zjistí až z výpisu, tedy poté, co peníze odešly. Vybraná varianta ten okamžik posouvá před strhnutí, kdy s tím ještě jde něco dělat.

Zasahuje do dvou prioritních příležitostí z fáze 2: klient nevidí, co se pravidelně strhává, a klient nemá kde platbu zastavit dřív, než proběhne.

## Proč právě toto

Na třiceti ze třiceti stojí tři varianty: I2, I3 a I5. Rozhodnutí padlo na první z nich.

**Remízu nerozsekla obtížnost, protože obtížnost nenese hodnotu.** Drží ji `CR-C6`, dokud kteroukoli ze čtyř regulatorních oblastí nekryje karta od ČS. Kdyby hodnota existovala, mohla by vyhrát I5, která podle screeningu variant nese regulatorně nejmíň.

Napojení I2 na strategii je v jednom kroku: banka posílá zprávu, klient na ni odpovídá, a to je pravidelná relevantní interakce, kterou měří SHD-1.

## Co to neřeší

Nedává klientovi jeden pohled na všechny opakované platby, který nabízely I1 a I3. Zpráva se týká jedné platby, ne celku.

Nezastaví platbu u obchodníka, což byla I4. Klient může zrušit platbu, kterou banka provádí; nemůže obchodníkovi zabránit, aby se pokusil znovu.

Neodpovídá na dotaz ke platbě, která už proběhla, což byla I5.

## Co přechází do další fáze

Do fáze 5 přechází vybraná varianta, její screening z A8c a její skóre z A8b. Fáze 5 z ní staví varianty MVP, ne řešení: co z upozornění je nejmenší kus, který jde postavit a ověřit.

Nepřechází ostatní čtyři varianty. **Nejsou zamítnuté jako špatné**, jsou to varianty, které v tomto běhu nebyly vybrány, a I3 a I5 měly stejné skóre jako vybraná. Pokud se rozhodnutí vrátí, vrací se k této trojici, ne na začátek.

## Co se nepodařilo zjistit

Zda byla remíza rozseknuta správně. Pravidlo bylo "první z nejvýše obodovaných" a bylo zadané předem, ale **je to pravidlo o pořadí, ne o hodnotě**. Obtížnostní osa, která by rozhodla na základě něčeho, nese jmenovatel a žádné číslo.

## Jak to vzniklo

Rozhodovací brána G4. Rozhodnutí není agentovo: `by_agent: false`, a rozhodl Igor Tadić pravidlem, které dal na začátku běhu. Zápis jsem provedl já na jeho instrukci.

Podklady byly A8 se všemi pěti variantami, A8b se skóre a A8c se screeningem každé varianty. Žádná varianta nebyla před rozhodnutím odfiltrována ani doporučena.
