> **Reading copy of the initiative document.** The text below the line is identical to the source document. The machine record stays in the source and is not repeated here. This file is generated, so do not edit it; a hand edit fails the build.

---

# [SPOCK-101] - Podpora klienta, který uvázne v průběhu online sjednání hypotéky

> **Fiktivní.** Vytvořeno pro ověření brány stage 7. Viz [fixtures/README.md](../../README.md). Jira identifikátor
> `SPOCK-101` je fiktivní, dodaný pro tento běh jako uživatelský vstup (nikdy jej negeneruje agent).

## Insight

**Co jsme zjistili:** Prvožadatelé o hypotéku často uvíznou v průběhu online sjednání a bez pomoci
odcházejí. Trh na tuto mezeru nemá odpověď (zjištění z konkurenční syntézy, A7).

**Koho se to týká:** Prvožadatelů o hypotéku v digitálním kanálu banky.

**Zdroje zjištění:** Problémová sada běhu (A4) a konkurenční syntéza (A7). Tento běh nepracoval s daty z
provozu, NPS ani se záznamy podpory — zjištění stojí na dodaném materiálu, nikoli na měření.

## Byznys cíl

**Vazba na strategii nebyla pro tento běh dodána.** Brief má `goals` označené jako neznámé
(`not_yet_available`), takže tato iniciativa nemá pojmenovaný Key Result, ke kterému by se vázala.
**Doplní produktový vlastník před předáním do backlogu**; bez toho iniciativa nesplňuje Definition of
Ready.

**Kdy je iniciativa hotová:** Až pilot prokáže, že nabídnutá pomoc snižuje podíl opuštěných žádostí u
prvožadatelů, a výsledek je vyhodnocen proti výchozímu stavu.

## Outcome

**Změna chování klienta:** Prvožadatel, který uvázne v online sjednání hypotéky, **dokončí žádost s pomocí
poradce místo toho, aby odešel** — a pokračuje z rozpracovaného stavu, nikoli od začátku.

Popisuje změnu chování, nikoli řešení. Jakým způsobem je pomoc nabídnuta, patří do rozsahu níže.

## Metriky úspěchu

### Behaviorální

- Podíl prvožadatelů, kteří po uvíznutí dokončí žádost, místo aby ji opustili.
- Podíl uvíznutí, u nichž klient přijme nabídnutou pomoc.

**Výchozí hodnota není dodána** (otevřené rozhodnutí 1), takže cílová hodnota není v tomto běhu
stanovena — směr ano, číslo ne.

### Byznysové

- Počet dokončených sjednání hypotéky navíc oproti současnému stavu.

**Nevyčísleno.** Převod chování na byznysový dopad vyžaduje výchozí míru opuštění a hodnotu sjednání;
ani jedno tento běh nedostal.

### Vnímání klientem

**Tento běh nedodal.** Nebyl proveden žádný sběr zpětné vazby ani měření spokojenosti, takže tvrzení o
vnímání by bylo domyšlené. Doplnit v pilotu.

## Rozsah iniciativy

### In Scope

- Detekce uvíznutí v digitálním toku sjednání (nečinnost nad prahem, opakovaná chyba validace).
- Nabídka spojení s hypotečním poradcem přímo v aplikaci (chat, případně naplánovaný hovor).
- Předání rozpracovaného stavu žádosti poradci při převzetí.

### Out of Scope

- Změna jádra procesu sjednání hypotéky.
- Odchozí telefonní kampaně a pobočkový kanál.
- Napojení na Jira mimo tuto iniciativu (propagace A15 je oddělená a je odložena).

## High-Level akceptační kritéria

- Systém rozpozná uvíznutí a nabídne pomoc v aplikaci, aniž by klienta blokoval v samostatném pokračování.
- Předání poradci nese uložený stav žádosti, takže klient pokračuje, nezačíná znovu.
- Přístup poradce k rozpracované žádosti je omezen na přiděleného poradce a klient s předáním souhlasí.

## Závislosti

| Závislost | Popis | Stav |
|---|---|---|
| Detekční signál v toku sjednání | Zdroj události o uvíznutí (nečinnost, chyba validace) | K ověření s týmem toku sjednání |
| Fronta hypotečních poradců | Kapacita poradců pro příchozí žádosti z aplikace | K ověření s provozem |

## Rizika a mitigace

| Riziko | Dopad | Mitigace |
|---|---|---|
| Vysoká četnost uvíznutí zahltí frontu poradců | Prodleva v pomoci, tlak na kapacitu | Prahování nabídky a měření četnosti v pilotu |
| Souhlas a rozsah přístupu k datům žádosti | Compliance | Návrh souhlasu do funkčnosti (potvrdit s Compliance Guidelines, až budou k dispozici) |

## Otevřené otázky

- Základní míra současného procesu (doba cyklu a přepracování) není dodána, takže měřitelný cíl nelze
  tento běh nastavit. Vlastníka a datum je třeba pojmenovat, než pilot nahradí stávající proces.
- Autoritativní Jira host (`csas.atlassian.net` vs `jira.csin.cz`) je otevřené rozhodnutí (D11); propagace
  A15 je odložena (PD141).

## Odkazy

- [A13 — schválené PRD](../../6-prd/2-prd-agreed.md)
- [A11 — rozšířené MVP](../../5-mvp/2-expanded-mvp.md)
