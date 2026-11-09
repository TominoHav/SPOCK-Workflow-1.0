---
run_id: 2026-06-instant-payment-disputes
artifact_id: A14
ost_role: artifact
status: accepted
workflow: discovery
modified_by: human
revisions: 0
sources:
  - A13
external_sources: []
traces_to:
  - A13
  - A11
  - A9
  - A4
  - A2
could_not_verify:
  - rule: "written in Czech, free of implementation detail; every fact drawn from the agreed PRD or marked an assumption"
    needs: judge
    reach: artifact
decision:
  gate: G7
  by_agent: false
  accepted_by:
    - name: Igor Tadic
      role: product_owner
  accepted_at: 2026-08-23
  changed_during_refinement: none
  refinements: []
  note: "Accepted as it stands. Two gaps carry forward into the document CS receives rather than being closed by acceptance: no perception metric was identified in this run, and none of the three success measures carries a baseline, horizon, owner or kill criterion. The run completes on the initiative document; the Jira issue is not produced because that binding is parked while the host is unnamed."
assembled_at: 2026-08-23
assembled_from:
  - R-A14-01
---

# [SPOCK-106] - Automaticke odeslani zadosti o odvolani platby a notifikace klienta

Klient, který omylem odeslal okamžitou platbu nesprávnému příjemci, čeká dnes nejméně dvě hodiny, než je žádost o odvolání skutečně odeslána, a z hovoru odchází bez jakéhokoli písemného potvrzení. Tato iniciativa propojuje registraci reklamace s okamžitým odesláním žádosti o odvolání do sítě EBA CLEARING RT1 a doručuje časově označené potvrzení agentovi i klientovi ještě před koncem relace. První verze pokrývá eurové okamžité platby; korunové platby závisejí na potvrzení dostupné zprávy v síti CERTIS.

## Insight

Klienti, kteří omylem nebo v důsledku podvodu odeslali okamžitou platbu nesprávnému příjemci, kontaktují banku ve chvíli, kdy je žádost o odvolání ještě možná. V tomto okamžiku narážejí na dva problémy.

Cesta od prvního telefonátu klienta k odeslání žádosti o odvolání trvá na pracovní den nejméně dvě hodiny. Agent kontaktního centra formulář odvolání vyplní, ale nemůže ho odeslat. Případ přechází do fronty oddělení správy odvolání, které zpracovává případy v pořadí doručení; v některých případech jsou žádosti odeslány čtyři dny po provedení platby. Vzorec potvrzují dvě přímá svědectví z obou stran předávacího řetězce a souhrnná zpráva za dvanáct měsíců.

Žádný agent kontaktního centra ani pobočkový poradce nedokáže klientovi v průběhu hovoru nebo návštěvy odpovědět na dvě otázky, které klient vždy klade: zda byla žádost o odvolání odeslána a zda je vrácení platby ještě technicky možné. Čtyři nezávislé zdroje tento problém potvrzují, tři z nich přímými svědectvími. Klient odchází bez jakéhokoli písemného potvrzení.

## Byznys cil

Iniciativa přispívá k plnění tří strategických cílů banky. AI-2: cesta od registrace reklamace k odeslání žádosti o odvolání probíhá bez přerušení v rámci jedné relace, bez manuálního předání. SHD-4: ruční předávací krok mezi registrací a odesláním žádosti je odstraněn a administrativa agenta v relaci se omezuje na samotnou registraci. LVL-4: klient obdrží časově označené potvrzení ve stejné relaci, čímž se okamžik podání reklamace stane doloženou akcí, kterou klient drží.

Explicitní Key Result, na nějž iniciativa cílí, nebyl v tomto průzkumu definován. Musí být stanoven a odsouhlasen před zahájením realizace. Cílový termín dokončení iniciativy rovněž nebyl v tomto průzkumu stanoven.

## Outcome

Klient, který zaregistroval reklamaci okamžité platby, nepotřebuje banku kontaktovat znovu, aby zjistil, zda žádost o odvolání byla podána. Odchází z hovoru nebo návštěvy s jistotou o stavu svého případu. Počet opakovaných kontaktů ze strany klientů s dotazy na stav reklamace klesá.

## Metriky uspechu

### Behavioralni

Podíl klientů, kteří po podání reklamace okamžité platby znovu kontaktují banku s dotazem na stav případu. Žádoucí směr: pokles. Základní hodnota není změřena; žádný systém v současnosti nezachycuje, zda a kolikrát klient po prvním kontaktu volá znovu kvůli stejnému případu. Horizont, vlastník a kill-kritérium nebyly v tomto průzkumu dohodnuty a musí být stanoveny před spuštěním pilotu.

### Byznysove

Dvě metriky plynoucí z PRD.

Čas od registrace reklamace do odeslání žádosti o odvolání do sítě RT1. Žádoucí směr: pokles. Proxy měřítko je dostupné z logu dispečerské služby (čas od události registrace po potvrzení sítí RT1). Základní hodnota není změřena, protože žádný systém v současnosti neeviduje, kdy klient banku poprvé kontaktuje ohledně odvolání. Horizont, vlastník a kill-kritérium nebyly dohodnuty.

Čas obsluhy agenta při registraci reklamace. Žádoucí směr: pokles při zachování celkového času registrace blízkého dnešním hodnotám, protože kroky předání a následné komunikace jsou odstraněny. Základní hodnota není změřena. Horizont, vlastník a kill-kritérium nebyly dohodnuty.

### Vnimani klientem

Tato metrika nebyla v průzkumu stanovena. Žádné měřítko spokojenosti, důvěry ani NPS nebylo identifikováno. Před spuštěním pilotu musí být tato dimenze definována, aby bylo možné posoudit dopad iniciativy z pohledu zákazníka.

## Rozsah iniciativy

### In Scope

- Automatické odeslání žádosti o odvolání pro eurové okamžité platby prostřednictvím sítě EBA CLEARING RT1 při registraci reklamace v existujících systémech kontaktního centra nebo pobočky.
- Potvrzení pro agenta v aktivní relaci před koncem hovoru nebo návštěvy, obsahující časové razítko potvrzení sítí RT1 a číslo případu.
- Notifikace klienta prostřednictvím odchozího digitálního kanálu (SMS nebo push notifikace, nebo obojí) se stejným časovým razítkem a číslem případu.
- Auditní log každého pokusu o odvolání včetně výsledku (přijato nebo odmítnuto sítí RT1).
- Zpracování chybových stavů: odmítnutí sítí RT1 je zaznamenáno, agent je informován v relaci, klientská notifikace není odeslána.

### Out of Scope

- Korunové okamžité platby. Dostupnost ekvivalentní zprávy ISO 20022 pro odvolání v síti CERTIS není ověřena. CZK platby mohou být zahrnuty až po potvrzení technickým stakeholderem.
- Samoobslužné odvolání v mobilní aplikaci. Klient nemá v této verzi možnost zahájit žádost o odvolání z mobilní aplikace; tato potřeba zůstává otevřena pro budoucí průzkum.
- Registrace reklamací mimo pracovní dobu. Tato verze nemění dostupnost registračních kanálů. Přibližně 38 % případů přichází mimo pracovní dobu kontaktního centra a tito klienti nemají přímý přístup k registraci.
- Prioritizace fronty u podvodných případů. Automatická cesta frontu jako celek odstraňuje; problém přestane existovat, pokud iniciativa uspěje.
- Průběžné sledování stavu případu od odeslání žádosti po výsledek. Tato verze poskytuje potvrzení o odeslání při registraci, nikoli průběžné aktualizace.

## High-Level akceptacni kriteria

- Žádost o odvolání je odeslána do sítě RT1 bez jakéhokoli manuálního kroku mezi registrací reklamace a odesláním.
- Agent vidí potvrzení s časovým razítkem a číslem případu v aktivní relaci před jejím ukončením.
- Klient obdrží notifikaci se stejným časovým razítkem a číslem případu ve stejném relačním okně.
- Každý pokus o odvolání, přijatý i odmítnutý, je zaznamenán v auditním logu před ukončením relace.
- Neexistuje žádný stav tiché chyby: každý pokus o odvolání končí zaznamenaným výsledkem, buď přijetím, nebo odmítnutím.
- Odmítnutí sítí RT1 nezpůsobí odeslání notifikace klientovi.
- Žádná nová autentizační metoda není v této verzi zavedena; dispečerská služba přijímá triggery výhradně z autentizovaných relací agenta.

## Zavislosti

| Závislost | Vlastník | Riziko při absenci |
|---|---|---|
| Síť EBA CLEARING RT1 a potvrzení správného formátu zprávy odvolání (pacs.028 nebo camt.056) dle schématu SEPA Instant Credit Transfer Recall | EBA CLEARING / technický stakeholder (neurčen) | Eurové odvolání nelze odeslat; zprávy mohou být odmítnuty ve špatném formátu |
| Odchozí digitální notifikační kanál pro klienta (SMS, push notifikace nebo obojí), včetně brány a definice chybového řešení | Neurčen | Klientskou notifikaci nelze implementovat |
| Compliance Guidelines: potvrzení zákonných požadavků na auditní log, obsah notifikace, formát zprávy a autorizaci agenta | Neurčen | Čtyři požadavky nelze finalizovat; PRD nelze uzavřít |
| Existující systémy kontaktního centra a poboček: formát události registrace a integrační bod pro spuštění triggeru | Neurčen | Automatický trigger nelze implementovat |
| Technický stakeholder pro potvrzení dostupnosti ekvivalentní zprávy ISO 20022 v síti CERTIS (pro CZK platby) | Neurčen | Rozšíření na CZK platby není možné |

## Rizika a mitigace

| Riziko | Pravděpodobnost | Dopad | Mitigace |
|---|---|---|---|
| Nesprávný formát zprávy způsobí odmítnutí žádosti o odvolání sítí RT1 | Střední | Vysoký | Formát zprávy (pacs.028 nebo camt.056) potvrdí technický stakeholder s přístupem k dokumentaci schématu EBA CLEARING před zahájením vývoje |
| Čtyři compliance předpoklady (auditní log, obsah notifikace, formát zprávy, autorizace agenta) zůstanou nepotvrzeny | Vysoká | Vysoký | PRD nelze uzavřít bez Compliance Guidelines; termín potvrzení musí být stanoven jako podmínka zahájení realizace |
| Odchozí notifikační kanál není k dispozici nebo jej nelze včas zprovoznit | Střední | Střední | Záložní cestou je ústní sdělení agenta; záložní postup musí být definován v rámci specifikace kanálu |
| Síť RT1 není dostupná v době registrace reklamace | Nízká | Střední | Dispečerská služba zaznamená chybu, informuje agenta v relaci a eviduje případ jako neodeslán |

## Otevrene otazky

- Který formát zprávy odvolání (pacs.028 nebo camt.056) se uplatní v rámci schématu EBA CLEARING RT1 pro SEPA Instant Credit Transfer Recall?
- Který digitální kanál (SMS, push notifikace nebo obojí) bude použit pro doručení klientské notifikace a kdo bude vlastníkem brány a chybového řešení?
- Kdy budou k dispozici Compliance Guidelines, aby bylo možné potvrdit zákonné požadavky na auditní log, obsah notifikace, autorizaci agenta a formát zprávy?
- Obsahuje síť CERTIS ekvivalentní zprávu ISO 20022 pro odvolání, která by umožnila zahrnout korunové okamžité platby do budoucí verze?
- Jaké jsou odsouhlasené horizonty, vlastníci a kill-kritéria pro tři metriky úspěchu?
- Jaký je cílový termín dokončení iniciativy?

## Odkazy

**Původ identifikátoru.** Klíč SPOCK-106 dodal zadavatel jako fixture. Nebyl přečten z Jira, za odkazem
níže žádná issue neexistuje a instance Jira pro Českou spořitelnu zatím nebyla určena, takže adresa je
zástupná. Iniciativa v Jira nebyla v tomto běhu založena. Pro běh s vytvořeným materiálem je to legitimní
základ; u deliverable se skutečným materiálem by klíč musel být skutečný.

- [Odsouhlasený PRD: Automatické odeslání žádosti o vrácení platby a notifikace klienta](../6-prd/2-prd-agreed.md)
- [SPOCK-106](https://csas.atlassian.net/browse/SPOCK-106)
