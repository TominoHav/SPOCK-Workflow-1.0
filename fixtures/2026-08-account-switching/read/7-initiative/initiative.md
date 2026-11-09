> **Reading copy of the initiative document.** The text below the line is identical to the source document. The machine record stays in the source and is not repeated here. This file is generated, so do not edit it; a hand edit fails the build.

---

# [SPOCKFIX-3] - Kontinuální přehled platebních mandátů pro klienty přecházející k ČS

Přecházející klient nemá způsob, jak si ověřit, které příkazy k úhradě a inkasní mandáty jsou stále registrovány u opouštěného bankovního ústavu. Starý účet proto nechává otevřený a platí poplatky u dvou bank zároveň, protože si nemůže být jistý, že tam nic nezůstalo. Tato iniciativa mu po celou dobu přechodového okna průběžně ukazuje, které platební mandáty na starém účtu dosud běží, aby je mohl jeden po druhém převést a starý účet uzavřít s jistotou. Úspěch měříme podílem přecházejících klientů, jejichž nový účet přijme výplatu a alespoň dvě opakující se platby do třiceti dnů od jeho otevření.

Identifikátor v Jiře je zástupný klíč, protože tento průzkum je cvičení a neobsahuje skutečný zákaznický materiál. Před předáním dokumentu do dodávky ho musí nahradit skutečný klíč přidělený v produkčním systému.

## Insight

Přecházející klienti nemají způsob, jak zjistit, které platební mandáty jsou stále registrovány u starého bankovního ústavu. Zjistí to až tehdy, kdy platba selže nebo kdy přijde neočekávaná platba z místa, o jehož existenci nevěděli. Bez přístupu k seznamu aktivních příkazů k úhradě a inkasních mandátů pracují z paměti nebo z výpisů za uplynulý rok, přičemž nemohou rozlišit roční poplatek od zrušené smlouvy.

Tato nejistota přímo způsobuje druhou skupinu problémů: klient, který nemůže potvrdit, že starý účet je prázdný, ho nechává otevřený a platí poplatky u dvou bank současně. Zákaznice popsaly toto chování jako vědomé rozhodnutí - vědí, že je neefektivní, přesto ho dělají, protože nemají jinou možnost. Čtyři nezávislé zdroje - dvě zákaznice, poradce na pobočce a pracovník platebního oddělení - popsaly tutéž absenci ze čtyř různých pozic. Žádná z bank prověřených v rámci analýzy trhu nepřekračuje tuto hranici a nenabízí přecházejícím klientům průběžný přehled jejich platebních mandátů.

Celý mechanismus tohoto řešení závisí na jednom dosud nepotvrzeném předpokladu: zda české implementace PSD2 AISP vystavují aktivní platební mandáty jako strukturálně odlišná data od transakční historie. Transakční výpis ukazuje, odkud platba přišla; neukazuje, co je dosud autorizováno u starého ústavu. Pokud tuto podmínku české implementace nesplní, pilot se nespustí, protože mechanismus přehledu nefunguje. Tuto otázku je nutné uzavřít před zahájením implementace.

## Byznys cíl

Iniciativa přispívá ke dvěma indikátorům ze strategického rámce ČS: podílu příjmů v rámci produktového portfolia klienta a počtu klientů, jejichž denní bankovnictví se plně přesunulo do ČS. Mechanismus je přímý. Klient, který prostřednictvím průběžného přehledu mandátů úspěšně převede všechny opakující se platby a uzavře starý účet, přesune celé denní bankovnictví do ČS. Konkrétní klíčový výsledek z ročního strategického cyklu nebyl v průzkumu přiřazen; strategická vazba vychází z validace provedené v procesu discovery.

Iniciativa je dokončena, když přecházející klient potvrdí, že starý účet je prázdný a může ho uzavřít.

## Outcome

Přecházející klient, který vidí po celou dobu přechodového okna, které platební mandáty jsou stále registrovány u starého ústavu, na tuto informaci reaguje: postupně mandáty převede a starý účet uzavře. Dnes nese náklady nejistoty - dvojité poplatky, opakované kontroly ročního výpisu - protože informace strukturálně chybí. Chování, které se změní, je záměrná nečinnost způsobená absencí dat, nahrazená vědomým dokončením přechodu podpořeným viditelným pokrokem.

## Metriky úspěchu

### Behaviorální

Měřená metrika: podíl nově otevřených běžných účtů u přecházejících klientů, na které dorazí výplata a minimálně dvě opakující se debetní platby do třiceti dnů od otevření.

Výchozí hodnota: aktuálně neměřitelná. Banka segment přecházejících klientů dnes nesleduje a metriku nelze vypočítat z dostupných systémů. Výchozí hodnota je deklarovanou mezerou, nikoli vynechaným měřením. Bez výchozí hodnoty nelze v rámci střednědobého horizontu (tři až dvanáct měsíců po spuštění) spolehlivě posoudit, zda pilot zlepšuje úspěšnost přechodu.

Vlastník metriky: nebyl stanoven v průzkumu. Vlastnictví měření musí být přiděleno před spuštěním pilotu. Metrika bez vlastníka patří všem a nikomu zároveň.

### Byznysové

Nárůst podílu klientů, jejichž denní bankovnictví se plně přesunulo do ČS, a s tím spojené posílení podílu příjmů v rámci produktového portfolia. Přímý byznysový ukazatel specificky pro tento pilot nebyl v průzkumu stanoven; zdrojem je strategická validace provedená v procesu discovery.

### Vnímání klientem

Data o spokojenosti nebo NPS specificky pro segment přecházejících klientů nebyla v průzkumu shromážděna. Tento druh metriky nebyl dodán.

## Rozsah iniciativy

### In Scope

- Přístup přes PSD2 AISP k aktivním příkazům k úhradě a inkasním mandátům registrovaným u starého bankovního ústavu klienta
- Trvalé zobrazení těchto mandátů v sekci přechodu v aplikaci ČS po celou dobu přechodového okna
- Stav potvrzeného prázdného seznamu a výzva k uzavření starého účtu po přesunu všech mandátů
- Sdělení klientovi, že platby vázané na platební kartu u obchodníků nejsou součástí přehledu

### Out of Scope

- Platby vázané na platební kartu u obchodníků: strukturálně vyloučeny, protože PSD2 AISP přístup nedosáhne na přihlašovací údaje držené obchodníky; jde o trvalé vyloučení, nikoli odloženou funkci; klient musí být o tomto vyloučení informován
- Správa mandátů klientem: klient může mandáty prohlížet, nemůže je upravovat, rušit ani iniciovat; viditelnost je plným rozsahem funkce
- Viditelnost průběhu procesu přechodu: jde o samostatnou příležitost, kterou tato iniciativa neřeší
- Změna bankovní definice dokončení přechodu: rovněž samostatná příležitost

## High-Level akceptační kritéria

- Klient vidí obrazovku souhlasu, která výslovně jmenuje příkazy k úhradě a inkasní mandáty jako rozsah dat; klient může souhlas udělit nebo odmítnout; odmítnutí neblokuje zahájení přechodu
- Po udělení souhlasu aplikace zobrazí přehled mandátů a obnovuje ho při každém otevření sekce přechodu
- Každá položka v přehledu zobrazuje název, typ platby a částku
- Při nedostupnosti rozhraní starého ústavu aplikace zobrazí naposledy načtený stav s časovou značkou a upozorněním o možné zastaralosti dat
- Prázdný přehled vyvolá stav potvrzeného prázdna a výzvu k uzavření starého účtu
- Klient je informován o vyloučení plateb vázaných na platební kartu na definovaném místě v procesu přechodu
- Vypršení platnosti tokenu souhlasu v průběhu přechodového okna je ošetřeno re-autorizačním průchodem, který nevyžaduje opakované zahájení celého procesu přechodu od začátku

## Závislosti

| Závislost | Dopad | Stav |
|---|---|---|
| Dostupnost dat platebních mandátů přes PSD2 AISP u českých bankovních ústavů | Kritický: pokud české implementace AISP nevystavují aktivní příkazy k úhradě a inkasní mandáty jako data strukturálně odlišná od transakční historie, pilot se nespustí, protože mechanismus přehledu nefunguje. Tato závislost ruší pilot celý, nikoli jen jednu funkci. | Nepotvrzeno; ověření je nutné před zahájením implementace; vlastník nebyl v průzkumu stanoven |
| Platnost tokenu souhlasu AISP vůči délce přechodového okna podle PAD | Ovlivňuje specifikaci re-autorizačního průchodu; bez ověření nelze tento požadavek finalizovat | Otevřená otázka; vlastník: právní nebo compliance tým ČS |
| Pravidla ČS pro zpracování dat třetích stran | Pozice (zobrazení dat pouze majiteli účtu, bez uchování po skončení relace) musí být přezkoumána compliance před zahájením implementace; Compliance Guidelines nebyla v průzkumu k dispozici | Nevyřešeno; vlastník: compliance tým ČS |
| Mechanismus uzavření starého účtu | Určuje konkrétní akci přiřazenou výzvě k uzavření; závisí na tom, zda ČS má interní průchod uzavřením účtu u jiné banky, nebo zda musí být klient přesměrován ke starému poskytovateli | Musí být specifikováno ve fázi návrhu; vlastník: produktový tým ČS |

## Rizika a mitigace

| Riziko | Pravděpodobnost | Dopad | Mitigace |
|---|---|---|---|
| České AISP implementace nevystavují data o mandátech jako strukturovaná data odlišná od transakční historie | Neznámá | Kritický: pilot se nespustí | Ověřit před zahájením implementace; při negativním výsledku pilot nepouštět a přehodnotit přístup |
| Platnost tokenu AISP je kratší než délka přechodového okna | Neznámá | Střední: klient musí znovu autorizovat, nebo ztratí průběžné sledování | Specifikovat re-autorizační průchod před zahájením implementace |
| Metrika úspěchu nemá výchozí hodnotu a nemá přiřazeného vlastníka | Jistá - výchozí hodnota neexistuje a vlastník nebyl stanoven | Střední: bez výchozí hodnoty a vlastníka nelze ve střednědobém horizontu spolehlivě vyhodnotit výsledek pilotu | Přiřadit vlastníka metriky a definovat způsob měření výchozí hodnoty před spuštěním pilotu |
| Výsledek pilotu nepřekročí srovnávací skupinu bez přehledu mandátů | Neznámá | Střední: pilot se zastaví dle výsledkového kill kritéria | Monitorovat v rámci stanoveného horizontu; připravit alternativní přístup pro případ zastavení |

## Otevřené otázky

- Vystavují české PSD2 AISP implementace aktivní příkazy k úhradě a inkasní mandáty jako data strukturálně odlišná od transakční historie? Odpověď na tuto otázku rozhoduje o spuštění pilotu a musí být k dispozici před zahájením implementace.
- Pokrývá maximální platnost tokenu souhlasu AISP typické přechodové okno podle PAD? Odpověď určuje specifikaci re-autorizačního průchodu.
- Kdo je vlastníkem metriky úspěchu v ČS? Bez jmenovaného vlastníka je metrika odpovědností všech a nikoho zároveň.
- Jak změřit výchozí hodnotu metriky, když banka segment přecházejících klientů dnes nesleduje? Bez výchozí hodnoty nelze ve střednědobém horizontu posoudit výsledek pilotu.
- Má ČS interní průchod uzavřením účtu u jiné banky, nebo musí být klient přesměrován ke starému poskytovateli?

## Odkazy

- [Produktové požadavky: Kontinuální přehled mandátů pro přechod k hlavní bance](../../6-prd/2-prd-agreed.md)
