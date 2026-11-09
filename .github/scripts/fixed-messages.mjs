#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function shownDate(value) {
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return String(value);
    const p = n => String(n).padStart(2, '0');
    return `${value.getDate()}. ${value.getMonth() + 1}. ${value.getFullYear()} ${p(value.getHours())}:${p(value.getMinutes())}`;
  }
  const s = String(value);
  const m = /^(\d{4})-(\d{2})-(\d{2})(?:[T ][0-9:.]+(?:Z|[+-]\d{2}:?\d{2})?)?$/.exec(s.trim());
  return m ? `${Number(m[3])}. ${Number(m[2])}. ${m[1]}` : s;
}

export function storedDate(value) {
  const s = String(value ?? '').trim();
  const m = /^(\d{1,2})\s*\.\s*(\d{1,2})\s*\.\s*(\d{4})$/.exec(s);
  if (!m) return s;
  const [d, mo, y] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const t = new Date(Date.UTC(y, mo - 1, d));
  if (t.getUTCFullYear() !== y || t.getUTCMonth() !== mo - 1 || t.getUTCDate() !== d) return s;
  return `${m[3]}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export const BLOCKS = [
  { id: "Z53-M1", printed: true, moment: "opening", title: "Začátek fáze · Starting a stage",
    when: { cs: "první zpráva agenta v každé fázi, kromě fáze analýzy konkurence, která má vlastní úvod (oddíl 8).",
      en: "the agent's first message at every stage, except the market stage, which has its own opening (section 8)." },
    rows: [
      { en: "I am the {agent}.", cs: "Jsem agent {agent}.", starts: "para" },
      { en: "I carry {stage}.", cs: "Mám na starosti {stage}." },
      { en: "What this stage is for: {purpose}.", cs: "K čemu tato fáze slouží: {purpose}.", starts: "para" },
      { en: "How this will go, so you know what is coming:", cs: "Jak to bude probíhat, ať víte, co vás čeká:", starts: "para" },
      { en: "- I {work}.", cs: "- Nejprve {work}.", starts: "para" },
      { en: "That takes {turns}.", cs: "Zabere to {turns}." },
      { en: "- I then run the automated checks on it myself.", cs: "- Potom na výsledek sám spustím automatické kontroly.", starts: "line" },
      { en: "You do not need to do anything for them.", cs: "Vy kvůli nim nemusíte nic dělat." },
      { en: "- Once it passes them I give you {thing} to read, and ask whether you approve it.", cs: "- Jakmile jimi projde, předložím vám {thing} k přečtení a zeptám se vás, zda to schvalujete.", starts: "line" },
      { en: "- If you approve, you record that yourself with a short form.", cs: "- Pokud to schválíte, zaznamenáte to osobně v krátkém formuláři.", starts: "line" },
      { en: "I tell you which one and what it asks.", cs: "Řeknu vám, o který formulář jde a na co se ptá." },
      { en: "I never run it.", cs: "Já ho nikdy nespouštím.", star: true },
      { en: "- Nothing is recorded and the run does not move on until you have done that part yourself.", cs: "- Dokud tuto část neuděláte vy, nic se nezaznamená a běh se neposune dál.", starts: "line" },
      { en: "This workflow is meant to run on Claude Sonnet 5, with effort High and the 1M token context, chosen in the model picker on the chat box.", cs: "Toto workflow má běžet na modelu Claude Sonnet 5 s nastavením effort High a s kontextem 1M tokenů; to vše se nastavuje ve výběru modelu v poli chatu.", starts: "para" },
      { en: "I cannot see which model is chosen, so check it there.", cs: "Nevidím, jaký model je vybraný, proto to prosím zkontrolujte tam." },
      { en: "I will produce {thing}.", cs: "Vytvořím {thing}.", starts: "para" },
      { when: "needs", en: "Before I start I need these from you:", cs: "Než začnu, potřebuji od vás toto:", starts: "para" },
      { when: "needs", each: "need", en: "- {need}", cs: "- {need}", starts: "line" },
      { when: "!needs", en: "I need nothing from you to start.", cs: "Pro začátek od vás nic nepotřebuji.", starts: "para" },
      { when: "needs", en: "Tell me when to begin.", cs: "Dejte mi vědět, kdy mám začít.", starts: "para" },
      { when: "!needs", en: "Tell me when to begin.", cs: "Dejte mi vědět, kdy mám začít." },
      { part: "otherApprover", en: "Before I start, record who is doing the work with `SPOCK: record who owns this stage`: open the command palette, choose `Tasks: Run Task`, then pick it.", cs: "Než začnu, zaznamenejte prosím úlohou `SPOCK: record who owns this stage`, kdo práci dělá: otevřete paletu příkazů, zvolte `Tasks: Run Task` a potom tuto úlohu vyberte.", starts: "para" },
      { part: "otherApprover", en: "It asks for two things: the name of the person doing the work, and the role they are doing it in.", cs: "Úloha se zeptá na dvě věci: jméno člověka, který práci dělá, a roli, ve které ji dělá." },
      { part: "otherApprover", en: "I never run it.", cs: "Já ho nikdy nespouštím.", star: true },
    ] },
  { id: "Z53-M2", printed: true, moment: "review", title: "Žádost o posouzení dokumentu · Asking for a review, when a document is finished",
    when: { cs: "když je dokument fáze hotový a prošel automatickými kontrolami. Ve fázi analýzy konkurence se neposílá.",
      en: "when a stage's document is finished and has passed its automated checks. Not sent at the market stage." },
    rows: [
      { en: "{Thing} is finished and it has passed the automated checks on this stage.", cs: "Dokončil jsem {Thing} a dokument prošel automatickými kontrolami této fáze.", starts: "para" },
      { en: "It is at {path}.", cs: "Najdete ho v {path}." },
      { when: "finding", en: "\"{finding}\"", cs: "„{finding}“", starts: "para" },
      { when: "opening", en: "As it opens:", cs: "Na začátku dokumentu stojí:", starts: "para" },
      { when: "opening", each: "judge", en: "- {judge}", cs: "- {judge}", starts: "line" },
      { en: "It rests on {rests}.", cs: "Vychází z {rests}.", starts: "para" },
      { when: "gaps", en: "What I could not establish:", cs: "Co se mi nepodařilo zjistit:", starts: "para" },
      { when: "gaps", each: "gap", en: "- {gap}", cs: "- {gap}", starts: "line" },
      { when: "gaps", en: "These are written into the document as gaps.", cs: "V dokumentu jsou zapsané jako mezery.", starts: "line" },
      { when: "gaps", en: "They are not questions for you to answer now.", cs: "Nejsou to otázky, na které musíte teď odpovídat." },
      { when: "choice", en: "You will choose one of these, and only that one is taken forward.", cs: "Z nich si vyberete jednu položku a dál půjde jen ta.", starts: "para" },
      { when: "choice", en: "Before you choose, you can discuss, change, drop or add one.", cs: "Než si vyberete, můžete kteroukoli položku se mnou probrat, změnit nebo vyřadit, nebo přidat vlastní." },
      { en: "What happens next, and this part needs you:", cs: "Co bude dál, a tato část je na vás:", starts: "para" },
      { en: "1. Read {thing} at {path}.", cs: "1. Přečtěte si {thing} v {path}.", starts: "para" },
      { when: "!prd", en: "2. Tell me here, in your own words, whether you approve it.", cs: "2. Napište mi sem vlastními slovy, zda to schvalujete.", starts: "line" },
      { when: "!prd", en: "If something is wrong, say what and I will redo it.", cs: "Pokud je něco špatně, napište co, a já to přepracuji." },
      { when: "!prd", en: "Sending it back is an ordinary part of the run.", cs: "Vrácení k přepracování je běžnou součástí běhu.", star: true },
      { when: "prd", en: "2. Tell me here, in your own words, whether you agree with it.", cs: "2. Napište mi sem vlastními slovy, zda s ním souhlasíte.", starts: "line" },
      { when: "prd", en: "If something is wrong, say what and I will redo it.", cs: "Pokud je něco špatně, napište co, a já to přepracuji." },
      { when: "prd", en: "Sending it back is an ordinary part of the run.", cs: "Vrácení k přepracování je běžnou součástí běhu.", star: true },
      { en: "Read it and tell me what you think.", cs: "Přečtěte si to a napište mi, co si o tom myslíte.", starts: "para" },
      { part: "changes", en: "You asked for these changes during this stage:", cs: "Během této fáze jste požádali o tyto změny:", starts: "para" },
    ] },
  { id: "Z53-M3", printed: true, moment: "review", title: "Žádost o podpis · Asking for the signature, only after they have said they approve",
    when: { cs: "až poté, co člověk v chatu řekl, že dokument schvaluje (nebo s ním souhlasí, nebo si vybral).",
      en: "only after the person has said in the chat that they approve (or agree, or have chosen)." },
    rows: [
      { en: "Recording your {act3} of {stageName}.", cs: "Zaznamenání vašeho {act3}: {stageName}.", starts: "para" },
      { en: "Here is exactly what to do and what you will see.", cs: "Tady je přesný postup a to, co při něm uvidíte.", starts: "para" },
      { en: "You run the task called `{task}`, from the command palette, choosing `Tasks: Run Task` and then picking it.", cs: "Spustíte úlohu `{task}`, kterou najdete v paletě příkazů pod `Tasks: Run Task`.", starts: "para" },
      { en: "It writes your decision into the run's record.", cs: "Úloha zapíše vaše rozhodnutí do záznamu běhu." },
      { en: "I do not run it, and this turn ends here.", cs: "Já ji nespouštím a tímto svou odpověď končím.", star: true },
      { when: "choice", en: "Once it has recorded your choice, you approve the stage with a second task, `SPOCK: approve what is in front of me`, and I give you its steps then.", cs: "Jakmile úloha zaznamená váš výběr, schválíte fázi druhou úlohou, `SPOCK: approve what is in front of me`, a její postup vám dám až potom.", starts: "para" },
      { en: "When you run it, a small input box appears at the top of this window.", cs: "Když ji spustíte, v horní části tohoto okna se objeví malé vstupní pole.", starts: "para" },
      { en: "It asks for one thing at a time.", cs: "Ptá se vždy na jednu věc." },
      { en: "You type your answer and press Enter, and the next one appears.", cs: "Napíšete odpověď, stisknete Enter a objeví se další otázka." },
      { en: "Pressing Escape at any point cancels the whole thing and records nothing, so there is no way to get halfway in and be stuck.", cs: "Klávesou Escape můžete kdykoli všechno zrušit a nic se nezaznamená, takže nikde neuvíznete v půlce." },
      { en: "It will ask you for {n} things, in this order:", cs: "Postupně se vás zeptá na tyto věci (celkem {n}), v tomto pořadí:", starts: "para" },
      { each: "box", en: "{k}. {box}", cs: "{k}. {box}", starts: "line" },
      { when: "questions", en: "The third box is for your answers to {nq} {qword} about this document.", cs: "Třetí pole je pro vaše odpovědi na {nq} {qword} k tomuto dokumentu.", starts: "para" },
      { when: "questions", en: "Answering is optional, and skipping holds nothing up:", cs: "Odpověď je nepovinná, a když ji vynecháte, nic se tím nezdrží:" },
      { when: "set", en: "The questions ask about these, as the document names them:", cs: "Otázky se týkají těchto položek, tak jak je dokument pojmenovává:", starts: "line" },
      { when: "set", each: "item", en: "- {id}: {heading}", cs: "- {id}: {heading}", starts: "line" },
      { when: "questions", each: "question", en: "{k}. {question}", cs: "{k}. {question}", starts: "line" },
      { when: "questions", en: "You answer {them} in the approval's third box: y for yes, n for no, ? if you cannot tell, as in \"{example}\", or \"{bare}\".", cs: "Odpověď na {them} zapíšete do třetího pole schválení: y pro ano, n pro ne, ? pokud to nedokážete posoudit, například „{example}“, nebo „{bare}“.", starts: "line" },
      { when: "questions", en: "Leave the box empty to skip.", cs: "Pokud chcete otázky vynechat, nechte pole prázdné." },
      { en: "The ones that ask who you are, the role you are deciding in, and anything in your own words, I cannot fill in for you, and nothing I have read can fill them either.", cs: "Pole, která se ptají, kdo jste a v jaké roli rozhodujete, a pole pro vaše vlastní slova za vás vyplnit nemohu a nevyplní je ani nic z toho, co jsem přečetl.", starts: "para" },
      { en: "That is deliberate.", cs: "Je to záměr." },
      { en: "It is what makes the record say a person decided, rather than that a document said so.", cs: "Právě díky tomu záznam říká, že rozhodl člověk, a ne že to stálo v nějakém dokumentu." },
      { en: "Where I have given you a value above, it is one this run already holds and I have read it off the record: check it and type it.", cs: "Kde jsem vám výše uvedl hodnotu, je to hodnota, kterou tento běh už obsahuje a kterou jsem přečetl ze záznamu: zkontrolujte ji a napište ji." },
      { en: "When you have run it, write anything here, and I will read what it said first and tell you where the run stands.", cs: "Až ji spustíte, napište mi sem cokoli a já si nejdřív přečtu, co úloha vypsala, a řeknu vám, jak na tom běh je.", starts: "para" },
    ] },
  { id: "Z53-M4a", printed: true, moment: "waiting", title: "Konec fáze, když se ještě čeká · Finishing a stage, while it is still waiting",
    when: { cs: "když agent svou práci dokončil, ale fáze ještě čeká na kontroly nebo na rozhodnutí člověka.",
      en: "when the agent has finished its work but the stage still waits on the checks or on the person's decision." },
    rows: [
      { en: "I wrote {thing}, at {path}.", cs: "Napsal jsem {thing}, soubor je v {path}.", starts: "para" },
      { when: "decision", en: "It is waiting on your decision on this stage, and the run stops here until it has that.", cs: "Teď čeká na vaše rozhodnutí v této fázi a běh tu stojí, dokud se toho nedočká.", starts: "para" },
      { when: "!decision", en: "It is waiting on the automated checks on this stage, and the run stops here until it has that.", cs: "Teď čeká na automatické kontroly této fáze a běh tu stojí, dokud se toho nedočká.", starts: "para" },
      { when: "onlyChosen", en: "Only the option you choose goes forward: I expand that one, and the PRD at the next stage is written from it.", cs: "Dál jde jen varianta, kterou zvolíte: tu jednu rozpracuji a z ní se v další fázi napíše PRD.", starts: "para" },
      { when: "onlyChosen", en: "The other options stop here.", cs: "Ostatní varianty tady končí." },
      { when: "decision", en: "You run the task called `{task}`, from the command palette, choosing `Tasks: Run Task` and then picking it.", cs: "Spustíte úlohu `{task}`, kterou najdete v paletě příkazů pod `Tasks: Run Task`.", starts: "para" },
      { when: "decision", en: "It asks for {n} {things}, in this order:", cs: "Úloha se zeptá na {n} {things}, v tomto pořadí:", starts: "line" },
      { when: "decision", each: "box", en: "{k}. {box}", cs: "{k}. {box}", starts: "line" },
      { when: "decision", en: "Pressing Escape cancels and records nothing.", cs: "Klávesou Escape úlohu zrušíte a nic se nezaznamená.", starts: "line" },
      { when: "decision", en: "I do not run it.", cs: "Já ji nespouštím.", star: true },
      { when: "questions", en: "The third box is for your answers to {nq} {qword} about this document.", cs: "Třetí pole je pro vaše odpovědi na {nq} {qword} k tomuto dokumentu.", starts: "para" },
      { when: "questions", en: "Answering is optional, and skipping holds nothing up:", cs: "Odpověď je nepovinná, a když ji vynecháte, nic se tím nezdrží:" },
      { when: "set", en: "The questions ask about these, as the document names them:", cs: "Otázky se týkají těchto položek, tak jak je dokument pojmenovává:", starts: "line" },
      { when: "set", each: "item", en: "- {id}: {heading}", cs: "- {id}: {heading}", starts: "line" },
      { when: "questions", each: "question", en: "{k}. {question}", cs: "{k}. {question}", starts: "line" },
      { when: "questions", en: "You answer {them} in the approval's third box: y for yes, n for no, ? if you cannot tell, as in \"{example}\", or \"{bare}\".", cs: "Odpověď na {them} zapíšete do třetího pole schválení: y pro ano, n pro ne, ? pokud to nedokážete posoudit, například „{example}“, nebo „{bare}“.", starts: "line" },
      { when: "questions", en: "Leave the box empty to skip.", cs: "Pokud chcete otázky vynechat, nechte pole prázdné." },
      { en: "Where the run stands at any moment is on its own front page, {run}/README.md.", cs: "Jak na tom běh v kterékoli chvíli je, najdete na jeho úvodní stránce, {run}/README.md.", starts: "para" },
      { en: "That page is generated from the workflow itself, so it cannot disagree with what is actually true.", cs: "Tuto stránku generuje samo workflow, takže nemůže odporovat skutečnému stavu." },
      { en: "I am stopping here.", cs: "Tady se zastavuji.", starts: "para" },
      { en: "I will not start the next stage.", cs: "Další fázi nezačnu." },
      { when: "decision", en: "When you have run it, write anything here, and I will read what it said first.", cs: "Až ji spustíte, napište mi sem cokoli a já si nejdřív přečtu, co úloha vypsala.", starts: "para" },
    ] },
  { id: "Z53-M4b", printed: true, moment: "prdLast", title: "Poslední schválení ve fázi PRD · The PRD stage: the last approval",
    when: { cs: "ve fázi 6, když workflow napsalo odsouhlasené PRD a to prošlo kontrolami. Zbývá už jen schválení fáze.",
      en: "at stage 6, once the workflow has written the agreed PRD and it has passed its checks. Only the approval of the stage is left." },
    rows: [
      { en: "The agreed PRD is written, at {path}, and it has passed the automated checks.", cs: "Odsouhlasené PRD je napsané, najdete ho v {path}, a prošlo automatickými kontrolami.", starts: "para" },
      { en: "One step is left, and it is yours: approve this stage with `SPOCK: approve what is in front of me`, from the command palette, choosing `Tasks: Run Task` and then picking it.", cs: "Zbývá jeden krok a ten je na vás: schvalte tuto fázi úlohou `SPOCK: approve what is in front of me`, kterou najdete v paletě příkazů pod `Tasks: Run Task`.", starts: "para" },
      { en: "It asks for four things, in this order:", cs: "Úloha se zeptá na čtyři věci, v tomto pořadí:" },
      { en: "1. Your name, which the record will carry.", cs: "1. Vaše jméno, které bude uvedeno v záznamu.", starts: "line" },
      { en: "2. The role you are approving in.", cs: "2. Role, ve které schvalujete.", starts: "line" },
      { en: "3. Answers to this stage's questions: it asks none, so leave that box empty.", cs: "3. Odpovědi na otázky této fáze: žádné nemá, takže toto pole nechte prázdné.", starts: "line" },
      { en: "4. What you asked to be changed before approving, in your own words.", cs: "4. Co jste před schválením chtěli změnit, vlastními slovy.", starts: "line" },
      { en: "It is optional: leave it empty if nothing.", cs: "Je to nepovinné: pokud nic, nechte pole prázdné." },
      { en: "Pressing Escape cancels and records nothing.", cs: "Klávesou Escape úlohu zrušíte a nic se nezaznamená." },
      { en: "I do not run it.", cs: "Já ji nespouštím.", star: true },
      { en: "When you have run it, write anything here, and I will read what it said first.", cs: "Až ji spustíte, napište mi sem cokoli a já si nejdřív přečtu, co úloha vypsala.", starts: "para" },
    ] },
  { id: "Z53-M4c", printed: true, moment: "accepted", title: "Konec fáze po přijetí · Finishing a stage, once it is accepted",
    when: { cs: "jednou, a jen jednou, když je fáze zaznamenaná jako přijatá. Zpráva říká, co bude dál, a jak začít další fázi.",
      en: "once, and only once, when the stage is recorded as accepted. It says what comes next and how to start the next stage." },
    rows: [
      { when: "!market", en: "{Stage} is accepted, and the record carries your name against it.", cs: "{Stage} je přijatá a v záznamu je u ní uvedeno vaše jméno.", starts: "para" },
      { when: "market", en: "The market stage has passed its checks.", cs: "Fáze analýzy konkurence prošla kontrolami.", starts: "para" },
      { when: "market", en: "It needed no approval from you.", cs: "Vaše schválení nepotřebovala." },
      { en: "What comes next: {next}.", cs: "Co bude dál: {next}.", starts: "para" },
      { en: "What that stage is for: {nextPurpose}.", cs: "K čemu ta fáze slouží: {nextPurpose}.", starts: "para" },
      { en: "{nextAsk}", cs: "{nextAsk}", starts: "line" },
      { when: "nextNeeds", en: "It starts from what only you can supply:", cs: "Vychází z toho, co můžete dodat jen vy:", starts: "line" },
      { when: "nextNeeds", each: "need", en: "- {need}", cs: "- {need}", starts: "line" },
      { en: "The {nextAgent} carries that stage.", cs: "Tuto fázi vede agent {nextAgent}.", starts: "para" },
      { en: "It holds different know-how and, for the market stage, different permissions.", cs: "Pracuje s jiným know-how a ve fázi analýzy konkurence i s jinými oprávněními." },
      { when: "sameAgent", en: "The next stage is mine too, and it still starts in a new chat, so its review starts clean.", cs: "Další fázi vedu také já, a přesto začíná v novém chatu, aby její posouzení začalo od nuly.", starts: "para" },
      { en: "How to start it:", cs: "Jak ji zahájit:", starts: "para" },
      { en: "1. Open a new chat.", cs: "1. Otevřete nový chat.", starts: "para" },
      { en: "2. In the agent picker on the chat box, choose {nextAgent}.", cs: "2. Ve výběru agenta v poli chatu zvolte {nextAgent}.", starts: "line" },
      { en: "3. Say: continue the run {runName}.", cs: "3. Napište: pokračuj v běhu {runName}.", starts: "line" },
      { en: "A new chat begins with the know-how of the stage you are entering rather than the one you are leaving, and it carries none of this conversation, which is what makes the next stage's review independent of this one rather than a continuation of it.", cs: "Nový chat začíná s know-how fáze, do které vstupujete, a ne té, kterou opouštíte, a nenese si nic z této konverzace; díky tomu je posouzení další fáze na této nezávislé a není jejím pokračováním.", starts: "para" },
      { en: "I am stopping here.", cs: "Tady se zastavuji.", starts: "para" },
    ] },
  { id: "Z53-M5", title: "Když se práce musí zastavit · When you have to stop",
    when: { cs: "kdykoli se agent nemůže dostat dál: kontrola, kterou nelze splnit, nejasný pokyn, nebo příliš slabé podklady.",
      en: "whenever the agent cannot get further: a check that cannot be met, an instruction that does not answer its own question, or material too thin to clear the bar." },
    file: ".github/copilot-instructions.md",
    after: "### When you have to stop",
    rows: [
      { en: "I have stopped, and here is why.", cs: "Zastavil jsem se a tady je důvod.", starts: "para" },
      { en: "What I was doing: {the work, in plain terms}.", cs: "Co jsem dělal: {the work, in plain terms}.", starts: "para" },
      { en: "What stopped it: {what came back, in the words of the work, never a check number}.", cs: "Co mě zastavilo: {what came back, in the words of the work, never a check number}." },
      { en: "What this means for the run: {nothing has been written / the document is written but not checked / the stage has not started}.", cs: "Co to znamená pro běh: {nothing has been written / the document is written but not checked / the stage has not started}.", starts: "para" },
      { en: "Nothing has been recorded and nothing you approved earlier has changed.", cs: "Nic se nezaznamenalo a nic z toho, co už máte schválené, se nezměnilo." },
      { en: "What would let me continue, and it is the only thing I need:", cs: "Co mi umožní pokračovat, a je to jediné, co potřebuji:", starts: "para" },
      { en: "- {one item to a line}", cs: "- {one item to a line}", starts: "line" },
      { en: "{Where it is thin material rather than a fault:}", cs: "{Where it is thin material rather than a fault:}", starts: "para" },
      { en: "I can carry on without this and the result will be weaker in a specific way: {what exactly}.", cs: "Mohu pokračovat i bez toho, ale výsledek bude slabší v jednom konkrétním ohledu: {what exactly}.", starts: "line" },
      { en: "Your own answer counts as material here, so two or three sentences from you may be enough to change it.", cs: "Vaše vlastní odpověď se tady počítá jako podklad, takže to mohou změnit už dvě nebo tři věty od vás." },
      { en: "Tell me which you want: give me {the thing}, or tell me to carry on as it stands.", cs: "Napište mi, čemu dáváte přednost: buď mi dodejte {the thing}, nebo mi řekněte, ať pokračuji s tím, co je.", starts: "para" },
    ] },
  { id: "Z53-M6", printed: true, moment: "finished", title: "Konec běhu · When the run is finished",
    when: { cs: "jednou, na konci běhu, když je přijatá i poslední fáze. Je to poslední zpráva, kterou člověk v běhu dostane.",
      en: "once, at the end of the run, when the last stage too is accepted. It is the last message the person gets in the run." },
    rows: [
      { en: "The run {runName} is finished.", cs: "Běh {runName} je hotový.", starts: "para" },
      { en: "All seven stages are accepted.", cs: "Všech sedm fází je přijatých." },
      { en: "The initiative is at {initiative}.", cs: "Iniciativu najdete v {initiative}.", starts: "para" },
      { when: "readingCopy", en: "A reading copy of the initiative, to share outside the workflow, is at {readingCopy}.", cs: "Kopii iniciativy ke čtení, kterou můžete sdílet i mimo workflow, najdete v {readingCopy}.", starts: "line" },
      { when: "jiraWaits", en: "The Jira step waits, because {reason}.", cs: "Krok v Jiře čeká, protože {reason}.", starts: "line" },
      { when: "parked", each: "parked", en: "- {parked}", cs: "- {parked}", starts: "line" },
      { when: "exceptions", each: "exception", en: "- {exception}", cs: "- {exception}", starts: "line" },
      { when: "lastDecision", en: "- The last decision, {gate}, was recorded by: {name}, {role}, on {date}.", cs: "- Poslední rozhodnutí, {gate}, zaznamenáno: {name}, {role}, dne {date}.", starts: "line" },
      { when: "nothingOutstanding", en: "Nothing on the front page is outstanding.", cs: "Na úvodní stránce nezůstává nic otevřeného.", starts: "para" },
      { en: "I am stopping here.", cs: "Tady se zastavuji.", starts: "para" },
    ] },
  { id: 'S2-RANK', title: 'Pořadí příležitostí ve fázi 2 · The ranking question at stage 2',
    when: { cs: 've fázi 2, když agent zformuloval příležitosti a vypsal je, každou na jeden řádek. Posílá ji Hypothesis Designer.',
      en: 'at stage 2, once the agent has framed the opportunities and listed them, one line each. The Hypothesis Designer agent sends it.' },
    file: '.github/skills/opportunity-framing/SKILL.md',
    after: 'opportunities, one line each, then ask as written below, and in a Czech run as the Czech block under it gives it:',
    rows: [
      { en: 'To put these opportunities in order I need two answers from you.', cs: 'Abych tyto příležitosti seřadil, potřebuji od vás dvě odpovědi.', starts: 'para' },
      { en: 'An order is enough; you do not need figures.', cs: 'Stačí pořadí, čísla k tomu nepotřebujete.' },
      { en: '1. Which of them reaches the most customers, and which the fewest?', cs: '1. Která z nich se týká nejvíce klientů a která nejméně?', starts: 'para', star: true },
      { en: 'Put them in order, most first.', cs: 'Seřaďte je od té, která se týká nejvíce klientů.' },
      { en: 'Two you think are about the same can share a place.', cs: 'Dvě, které považujete za zhruba stejné, mohou sdílet jedno místo.' },
      { en: '2. Which of them hurts customers most when it happens?', cs: '2. Která z nich klienty nejvíce trápí, když nastane?', starts: 'line', star: true },
      { en: 'Put them in order, worst first.', cs: 'Seřaďte je od té nejhorší.' },
      { en: 'If you cannot tell them apart, say so, and the order will rest on the evidence behind each one.', cs: 'Pokud je od sebe nedokážete rozlišit, řekněte to a pořadí se bude opírat o důkazy u každé z nich.', starts: 'para', star: true },
      { en: 'Where a figure exists, it usually sits with product analytics or the complaints team.', cs: 'Pokud nějaké číslo existuje, obvykle ho má produktová analytika nebo tým, který řeší stížnosti.' },
    ] },
  { id: 'S2-UNRANKED', title: 'Věta o pořadí, které nikdo nedokázal seřadit · The sentence on an order nobody could rank',
    when: { cs: 've fázi 2, v dokumentu prioritizovaných příležitostí, když člověk příležitosti nedokázal seřadit ani podle počtu klientů, ani podle toho, jak moc je trápí. Agent ji píše doslova a kontrola fáze 2 to ověřuje.',
      en: 'at stage 2, in the prioritised opportunities, where the person could rank the opportunities neither by how many customers they reach nor by how much they hurt. The agent writes it word for word, and the stage 2 check holds the document to it.' },
    file: '.github/skills/prioritisation/SKILL.md',
    after: 'either, write the sentence below in the document, word for word, and in a Czech run the Czech one under it.**',
    rows: [
      { en: 'The person could not rank these opportunities by how many customers they reach or by how much they hurt, so this order rests on the weight of evidence alone.',
        cs: 'Příležitosti nešlo seřadit podle toho, kolika klientů se týkají, ani podle toho, jak moc klienty trápí, takže toto pořadí stojí jen na váze důkazů.', starts: 'para', star: true },
    ] },
  { id: "Z53-S3", printed: true, moment: "opening", title: "Úvod fáze analýzy konkurence · The market stage opening",
    when: { cs: "první zpráva ve fázi 3, místo zprávy z oddílu 1, vytištěná podle toho, co je ve složce supplied/ běhu. Agent ji pošle dřív, než cokoli vyhledá. Když tam žádný soubor není, popíše oba způsoby práce a počká na pokyn; když tam soubor je, uvede každý soubor a úlohu, kterou člověk spustí, aby se seznam převzal.",
      en: "the first message at stage 3, in place of section 1, printed for what the run's supplied/ folder holds. The agent sends it before it searches anything. With no file there it sets out the two ways of working and waits to be told to begin; with one, it names each file and the task the person runs to take the list in." },
    rows: [
      { en: "I am the Competitive Analysis agent.", cs: "Jsem agent Competitive Analysis.", starts: "para" },
      { en: "I carry the market stage: what other banks and apps already do about the problems you prioritised.", cs: "Mám na starosti fázi analýzy konkurence: co už jiné banky a aplikace dělají s problémy, které mají podle vás přednost." },
      { when: "!listSupplied", en: "This stage can work in one of two ways, and one folder decides which:", cs: "Tato fáze může probíhat dvěma způsoby a o tom, kterým z nich, rozhoduje jedna složka:", starts: "para" },
      { when: "!listSupplied", en: "1. You have a list of the competitors you want looked at.", cs: "1. Máte seznam konkurentů, které chcete prověřit.", starts: "para" },
      { when: "!listSupplied", en: "Put it in the run's folder {supplied}, as one file.", cs: "Vložte ho jako jeden soubor do složky běhu {supplied}." },
      { when: "!listSupplied", en: "For each competitor, give its name and web addresses, each written in full from https://, from at least two different publishers, one of them its own website.", cs: "U každého konkurenta uveďte název a webové adresy, každou celou včetně https://, alespoň od dvou různých vydavatelů, z nichž jedním je jeho vlastní web." },
      { when: "!listSupplied", en: "List the market trends too: three to five in each of business, technology and regulation, each with a name and a web address, and for a regulation the law and the date it takes effect.", cs: "Uveďte také trendy na trhu: tři až pět v každé z oblastí byznys, technologie a regulace, každý s názvem a webovou adresou, a u regulace i příslušný předpis a datum, kdy nabývá účinnosti." },
      { when: "!listSupplied", en: "Write it as two sections, one headed Competitors and one headed Trends, in English or in Czech, with a heading for each entry.", cs: "Napište ho jako dva oddíly, jeden s nadpisem Konkurenti a druhý s nadpisem Trendy, česky nebo anglicky, s nadpisem u každé položky." },
      { when: "!listSupplied", en: "I then research only the addresses on your list and search for nothing else.", cs: "Pak zkoumám jen adresy z vašeho seznamu a nic dalšího nevyhledávám." },
      { when: "!listSupplied", en: "2. You have no list.", cs: "2. Seznam nemáte.", starts: "line" },
      { when: "!listSupplied", en: "Leave the folder empty, and I search the market myself — if this machine can search.", cs: "Nechte složku prázdnou a trh prohledám sám, pokud na tomto počítači vyhledávání funguje." },
      { when: "!listSupplied", en: "Searching needs an extension that is installed separately, and I cannot tell whether it is there until I try.", cs: "Vyhledávání potřebuje rozšíření, které se instaluje zvlášť, a jestli tu je, poznám, až když to zkusím." },
      { when: "!listSupplied", en: "The first thing I do when you tell me to begin is try it.", cs: "Až mi řeknete, ať začnu, vyhledávání nejdřív vyzkouším." },
      { when: "!listSupplied", en: "When you tell me to begin, I look in that folder first and, where it is empty, try one search before I claim anything.", cs: "Až mi řeknete, ať začnu, nejdřív se podívám do této složky, a pokud je prázdná, zkusím jedno vyhledávání, dřív než cokoli prohlásím.", starts: "para" },
      { when: "!listSupplied", en: "My first sentence tells you which of the two I am doing, and where I am searching it tells you whether searching works at all.", cs: "Hned první větou vám řeknu, kterým z obou způsobů pracuji, a pokud vyhledávám, také to, zda vyhledávání vůbec funguje." },
      { when: "!listSupplied", en: "If it does not, I ask you here in the chat for the names and web addresses instead, and the stage runs on those.", cs: "Pokud nefunguje, požádám vás tady v chatu o názvy a webové adresy a fáze poběží s nimi." },
      { when: "listSupplied", en: "Your list is already in the run's folder {supplied}:", cs: "Váš seznam už je ve složce běhu {supplied}:", starts: "para" },
      { when: "listSupplied", each: "file", en: "- {file}", cs: "- {file}", starts: "line" },
      { when: "listSupplied", en: "I research every competitor on that list myself, only at the addresses it gives, and search for nothing else.", cs: "Každého konkurenta z tohoto seznamu prozkoumám sám, jen na adresách, které uvádí, a nic dalšího nevyhledávám.", starts: "para" },
      { when: "!listSupplied", en: "Either way, I research every competitor in this market myself.", cs: "V obou případech prozkoumám každého konkurenta na tomto trhu sám.", starts: "para" },
      { en: "I hold profiles from earlier runs and I no longer reuse them, because a profile written for an earlier run answers that run's question rather than yours.", cs: "Profily z dřívějších běhů mám k dispozici, ale už je znovu nepoužívám, protože profil napsaný pro dřívější běh odpovídá na otázku toho běhu, a ne na vaši." },
      { en: "So this stage takes longer than it used to, and what I write at the end covers the whole market you gave me rather than part of it.", cs: "Tato fáze proto trvá déle než dřív, a co na konci napíšu, pokrývá celý trh, který jste mi zadali, a ne jen jeho část." },
      { en: "Then I write a map of the market, a card for each competitor and a short summary of what the market does, and I run the automated checks on them.", cs: "Pak napíšu mapu trhu, profil každého konkurenta a krátké shrnutí toho, co trh dělá, a spustím na ně automatické kontroly.", starts: "para" },
      { en: "Nobody approves this stage: once it passes its checks, the next stage starts from it.", cs: "Tuto fázi nikdo neschvaluje: jakmile projde kontrolami, další fáze na ni rovnou naváže." },
      { when: "listSupplied", en: "To start, run `SPOCK: what market material has been supplied` yourself: open the command palette, choose `Tasks: Run Task`, then pick it.", cs: "Pro začátek sami spusťte úlohu `SPOCK: what market material has been supplied`: otevřete paletu příkazů, zvolte `Tasks: Run Task` a potom tuto úlohu vyberte.", starts: "para" },
      { when: "listSupplied", en: "It opens one box: choose `yes` to take your list in.", cs: "Otevře jedno pole: zvolte `yes` a váš seznam se převezme." },
      { when: "listSupplied", en: "I never run it.", cs: "Já ji nikdy nespouštím.", star: true },
      { when: "listSupplied", en: "Once it has run, tell me here: I read what it recorded and start from your list.", cs: "Až doběhne, napište mi to sem: přečtu si, co zaznamenala, a začnu podle vašeho seznamu." },
      { when: "!listSupplied", en: "Tell me when to begin.", cs: "Dejte mi vědět, kdy mám začít.", starts: "para" },
    ] },
  { id: 'S3-CONFIDENTIAL', title: 'Otázka na interní materiál ve fázi 3 · The question on internal material at stage 3',
    when: { cs: 've fázi 3, když člověk dodal do složky supplied/ vlastní materiál (i seznam vložený do chatu), jednou, dřív než agent sestaví první profil konkurenta. Posílá ji Competitive Analysis a jmenuje v ní každou dodanou položku.',
      en: 'at stage 3, where the person supplied their own material in the supplied/ folder (a list pasted in the chat included), once, before the agent builds any card. The Competitive Analysis agent sends it and names each supplied item.' },
    file: '.github/skills/landscape-mapping/SKILL.md',
    after: '**Where the supplied folder holds anything, ask this once, before any card, naming each item the task listed:**',
    rows: [
      { en: "Before I build the cards: some of what you supplied may be for Česká spořitelna's eyes only.", cs: 'Než sestavím profily konkurentů: něco z toho, co jste dodali, může být jen pro interní potřebu České spořitelny.', starts: 'para' },
      { en: 'Is any of it internal to the bank or not public, for example an intranet page, an internal presentation or a prototype that has not been released?', cs: 'Je něco z toho interní materiál banky nebo materiál, který není veřejný, například stránka z intranetu, interní prezentace nebo prototyp, který ještě nebyl zveřejněn?', star: true },
      { en: 'Name which, or say none.', cs: 'Uveďte které, nebo řekněte, že nic.' },
      { en: 'Cards built on internal material stay in this run and are never kept for later runs.', cs: 'Profily konkurentů postavené na interním materiálu zůstanou v tomto běhu a nikdy se neuchovají pro další běhy.', star: true },
    ] },
  { id: 'S3-UNREACHABLE', title: 'Zastavení ve fázi 3, když se nedá otevřít žádná adresa · Stopping at stage 3 when no address opens',
    when: { cs: 've fázi 3, když se nepodaří otevřít žádnou webovou adresu, dodanou ani zadanou v chatu. Posílá ji Competitive Analysis místo chybového hlášení nástroje.',
      en: 'at stage 3, when none of the web addresses opens, supplied or given in the chat. The Competitive Analysis agent sends it in place of the tool\'s error.' },
    file: '.github/skills/landscape-mapping/SKILL.md',
    after: '**Where every address fails to open, the supplied ones or those given in the chat, stop and send this in place of the tool\'s error, as it stands, and in a Czech run the Czech block under it:**',
    rows: [
      { en: 'I have stopped: none of the web addresses would open, so I cannot research the market from this computer.', cs: 'Zastavil jsem se: žádnou z webových adres se nepodařilo otevřít, takže z tohoto počítače nemohu trh prozkoumat.', starts: 'para' },
      { en: 'Every one failed, which points to this computer\'s connection to the web rather than to the addresses.', cs: 'Selhaly všechny, což ukazuje spíš na připojení tohoto počítače k webu než na samotné adresy.' },
      { en: 'What to try next:', cs: 'Co zkusit dál:', starts: 'para' },
      { en: '- Connect this computer to another network, for example one outside the bank\'s network, and tell me to begin again.', cs: '- Připojte tento počítač k jiné síti, například mimo síť banky, a napište mi, ať začnu znovu.', starts: 'line', star: true },
      { en: '- Or ask ČS IT whether the bank\'s network or this computer stops VS Code from opening web pages.', cs: '- Nebo se zeptejte IT podpory České spořitelny, zda síť banky nebo tento počítač nebrání VS Code v otevírání webových stránek.', starts: 'line', star: true },
    ] },
  { id: "Z53-WS1", title: "Závěr odpovědi Workflow Support · How Workflow Support ends an answer",
    when: { cs: "agent Workflow Support pomáhá, když se běh zasekne. Každou odpověď končí jedním z těchto tří tvarů, aby člověk věděl, co má teď udělat. Následují dva hotové závěry pro nejčastější případy.",
      en: "the Workflow Support agent helps when a run is stuck. It ends every answer with one of these three shapes, so the person knows what to do now. Two ready-made closings for the most common cases follow." },
    file: ".github/skills/workflow-support/SKILL.md",
    after: "there, not the answer. **The last thing on the screen is one of three**, in this shape, and in a Czech run in the Czech block under it, as for the two closings further on:",
    rows: [
      { en: "What you can do now:", cs: "Co můžete udělat teď:", starts: "para" },
      { en: "{Where a task a person runs moves it:}", cs: "{Where a task a person runs moves it:}", starts: "para" },
      { en: "Run `{the task's full name}`: open the command palette, choose `Tasks: Run Task`, then pick it.", cs: "Spusťte `{the task's full name}`: otevřete paletu příkazů, zvolte `Tasks: Run Task` a potom tuto úlohu vyberte.", starts: "line" },
      { en: "It asks for {n} things, in this order:", cs: "Úloha se zeptá na tyto věci (celkem {n}), v tomto pořadí:" },
      { en: "1. {the box}{: type \"{value}\", where the run already holds it}", cs: "1. {the box}{: type \"{value}\", where the run already holds it}", starts: "line" },
      { en: "2. {…} Pressing Escape cancels and records nothing.", cs: "2. {…} Klávesou Escape úlohu zrušíte a nic se nezaznamená.", starts: "line" },
      { en: "You will know it worked when {what you will see}.", cs: "Že se to povedlo, poznáte podle toho, že {what you will see}." },
      { en: "{Where an agent has to act:}", cs: "{Where an agent has to act:}", starts: "para" },
      { en: "Send this to the {agent} in its chat, as it is:", cs: "Pošlete agentovi {agent} do jeho chatu tuto zprávu beze změny:", starts: "line" },
      { en: "> {the message, and nothing else} You will know it worked when {what you will see}.", cs: "> {the message, and nothing else} Že se to povedlo, poznáte podle toho, že {what you will see}.", starts: "line" },
      { en: "{Where no signature moves it:}", cs: "{Where no signature moves it:}", starts: "para" },
      { en: "Nobody can sign this off.", cs: "Tady nepomůže ničí podpis.", starts: "line" },
      { en: "What fixes it: {the sentence the task or the gate printed for it, in the person's language}.", cs: "Co to napraví: {the sentence the task or the gate printed for it, in the person's language}." },
      { en: "{Only where nothing on this run fixes it, add:}", cs: "{Only where nothing on this run fixes it, add:}", starts: "line" },
      { en: "Send this to whoever maintains the workflow:", cs: "Pošlete toto tomu, kdo workflow spravuje:", starts: "line" },
      { en: "> {what happened, at which stage, and what the task said, in two sentences}", cs: "> {what happened, at which stage, and what the task said, in two sentences}", starts: "line" },
    ] },
  { id: "Z53-WS2", title: "Závěr odpovědi Workflow Support · How Workflow Support ends an answer",
    when: { cs: "agent Workflow Support pomáhá, když se běh zasekne. Každou odpověď končí jedním z těchto tří tvarů, aby člověk věděl, co má teď udělat. Následují dva hotové závěry pro nejčastější případy.",
      en: "the Workflow Support agent helps when a run is stuck. It ends every answer with one of these three shapes, so the person knows what to do now. Two ready-made closings for the most common cases follow." },
    file: ".github/skills/workflow-support/SKILL.md",
    after: "may sign are listed as `NEVER_SIGNABLE` in `.github/scripts/gates.mjs`; open it before you say which kind it is.",
    rows: [
      { en: "Run `SPOCK: sign off a check this run cannot meet`: open the command palette, choose `Tasks: Run Task`, then pick it.", cs: "Spusťte `SPOCK: sign off a check this run cannot meet`: otevřete paletu příkazů, zvolte `Tasks: Run Task` a potom tuto úlohu vyberte.", starts: "para" },
      { en: "It asks for six things, in this order:", cs: "Úloha se zeptá na šest věcí, v tomto pořadí:" },
      { en: "1. Which check or checks, by number: type \"{the ids the gate recorded as failing}\"", cs: "1. Kterou kontrolu nebo které kontroly, podle čísla: napište „{the ids the gate recorded as failing}“", starts: "line" },
      { en: "2. Why it cannot be met, in your own words", cs: "2. Proč ji nelze splnit, vlastními slovy", starts: "line" },
      { en: "3. What was decided", cs: "3. Co bylo rozhodnuto", starts: "line" },
      { en: "4. Your name", cs: "4. Vaše jméno", starts: "line" },
      { en: "5. The role you are deciding in", cs: "5. Role, ve které rozhodujete", starts: "line" },
      { en: "6. What the failure points to: pick \"the workflow looks wrong\" or \"the material cannot meet it\" Pressing Escape cancels and records nothing.", cs: "6. Na co selhání ukazuje: vyberte „the workflow looks wrong“, nebo „the material cannot meet it“ Klávesou Escape úlohu zrušíte a nic se nezaznamená.", starts: "line" },
      { en: "You will know it worked when the run record carries the exception on the current stage and the next check moves the stage on to the decision.", cs: "Že se to povedlo, poznáte podle toho, že záznam běhu uvádí u aktuální fáze výjimku a další kontrola posune fázi k rozhodnutí." },
    ] },
  { id: "Z53-WS3", title: "Závěr odpovědi Workflow Support · How Workflow Support ends an answer",
    when: { cs: "agent Workflow Support pomáhá, když se běh zasekne. Každou odpověď končí jedním z těchto tří tvarů, aby člověk věděl, co má teď udělat. Následují dva hotové závěry pro nejčastější případy.",
      en: "the Workflow Support agent helps when a run is stuck. It ends every answer with one of these three shapes, so the person knows what to do now. Two ready-made closings for the most common cases follow." },
    file: ".github/skills/workflow-support/SKILL.md",
    after: "Read the run record for the stage the document belongs to. Where that stage is being written or reviewed, end with:",
    rows: [
      { en: "Run `SPOCK: record that I edited a document`: open the command palette, choose `Tasks: Run Task`, then pick it.", cs: "Spusťte `SPOCK: record that I edited a document`: otevřete paletu příkazů, zvolte `Tasks: Run Task` a potom tuto úlohu vyberte.", starts: "para" },
      { en: "It asks for four things, in this order:", cs: "Úloha se zeptá na čtyři věci, v tomto pořadí:" },
      { en: "1. The document you changed, by its path inside the run: type \"{the path}\"", cs: "1. Změněný dokument, podle jeho cesty v běhu: napište „{the path}“", starts: "line" },
      { en: "2. What you changed, in your own words", cs: "2. Co se změnilo, vlastními slovy", starts: "line" },
      { en: "3. Why you changed it, in your own words", cs: "3. Proč ke změně došlo, vlastními slovy", starts: "line" },
      { en: "4. Your name Pressing Escape cancels and records nothing.", cs: "4. Vaše jméno Klávesou Escape úlohu zrušíte a nic se nezaznamená.", starts: "line" },
      { en: "You will know it worked when the task says the edit is recorded and lists the record fields to compare with your change.", cs: "Že se to povedlo, poznáte podle toho, že úloha ohlásí, že je úprava zaznamenaná, a vypíše pole záznamu, která můžete porovnat se svou změnou." },
    ] },
];

export const QUESTIONS = [
  { en: "Did the brief add anything you didn't tell it?", cs: 'Objevilo se v zadání něco, co od vás nezaznělo?' },
  { en: 'Does the brief carry every constraint and boundary you gave it?', cs: 'Obsahuje zadání všechna omezení a hranice, které od vás zazněly?' },
  { en: 'Is any of the problems really a solution in disguise?', cs: 'Je některý z problémů ve skutečnosti skryté řešení?' },
  { en: 'Does each opportunity describe a change in what clients do?', cs: 'Popisuje každá příležitost změnu v tom, co klienti dělají?' },
  { en: 'Does the market summary avoid telling you what to build?', cs: 'Zdržuje se shrnutí trhu doporučení, co máte vytvořit?' },
  { en: 'Are the solutions really different from each other?', cs: 'Liší se jednotlivá řešení od sebe opravdu?' },
  { en: "Does each solution's compliance section fit that solution?", cs: 'Odpovídá oddíl compliance u každého řešení právě tomuto řešení?' },
  { en: 'Is each MVP option a complete way to pilot the solution?', cs: 'Je každá varianta MVP úplným způsobem, jak řešení pilotovat?' },
  { en: 'Does the MVP show how each compliance point is handled?', cs: 'Ukazuje MVP, jak je ošetřen každý bod compliance?' },
  { en: 'Does everything in the initiative come from the agreed PRD, without technical detail?', cs: 'Vychází všechno v iniciativě z odsouhlaseného PRD, bez technických podrobností?' },
];

const ONCE = { en: 'It will stop once and ask you to decide, on the document itself.', cs: 'Jednou se zastaví a požádá vás o rozhodnutí přímo nad dokumentem.' };
const SEVERAL = { en: 'several turns', cs: 'několik kol' };
export const STAGES = [
  { stage: 1, carry: { en: 'the brief stage', cs: 'fázi zadání' }, name: { en: 'the brief stage', cs: 'fáze zadání' }, Stage: { en: 'The brief stage', cs: 'Fáze zadání' },
    purpose: { en: 'setting down what the initiative is meant to achieve, for whom, why now and what is in and out of scope', cs: 'sepsat, čeho má iniciativa dosáhnout, pro koho, proč právě teď a co do ní patří a co ne' },
    work: { en: 'ask you the brief\'s questions and write your answers into the brief', cs: 'vám položím otázky k zadání a vaše odpovědi do něj zapíšu' },
    turns: SEVERAL, thing: { en: 'the brief', cs: 'zadání' }, ask: ONCE },
  { stage: 2, carry: { en: 'the problem stage', cs: 'fázi problémů' }, name: { en: 'the problem stage', cs: 'fáze problémů' }, Stage: { en: 'The problem stage', cs: 'Fáze problémů' },
    purpose: { en: 'turning the problem material you supply into problem hypotheses, and those into opportunities put in order', cs: 'z podkladů k problému, které dodáte, vytvořit hypotézy problémů a z nich seřazené příležitosti' },
    work: { en: 'read your problem material and write the problem hypotheses, then frame the opportunities and put them in order with you', cs: 'přečtu vaše podklady k problému a sepíšu hypotézy problémů, potom zformuluji příležitosti a spolu s vámi je seřadím' },
    turns: SEVERAL, thing: { en: 'the problem hypotheses and the prioritised opportunities', cs: 'hypotézy problémů a seřazené příležitosti' }, ask: ONCE },
  { stage: 3, carry: { en: 'the market stage', cs: 'fázi analýzy konkurence' }, name: { en: 'the market stage', cs: 'fáze analýzy konkurence' }, Stage: { en: 'The market stage', cs: 'Fáze analýzy konkurence' },
    purpose: { en: 'finding out what other banks and apps already do about the problems you prioritised', cs: 'zjistit, co s problémy, které jste seřadili, už dělají jiné banky a aplikace' },
    work: { en: 'research the market', cs: 'prozkoumám trh' },
    turns: SEVERAL, thing: { en: 'a map of the market, a card for each competitor and a short summary', cs: 'mapu trhu, profil každého konkurenta a krátké shrnutí' },
    ask: { en: 'It asks you for no decision. Where your own list of competitors is already in its folder, it starts by naming that list and works from it; where none is, it starts by explaining its two ways of working: from your own list of competitors, or by searching the market.',
      cs: 'Nebude od vás chtít žádné rozhodnutí. Pokud už je ve složce této fáze váš vlastní seznam konkurentů, začne tím, že ho uvede, a bude pracovat podle něj; pokud tam žádný není, začne tím, že vysvětlí své dva způsoby práce: podle vašeho vlastního seznamu konkurentů, nebo vyhledáváním na trhu.' } },
  { stage: 4, carry: { en: 'the solution stage', cs: 'fázi řešení' }, name: { en: 'the solution stage', cs: 'fáze řešení' }, Stage: { en: 'The solution stage', cs: 'Fáze řešení' },
    purpose: { en: 'generating a set of different solutions to the opportunities, each with its compliance section, for you to choose one', cs: 'navrhnout sadu odlišných řešení příležitostí, každé s oddílem compliance, abyste si jedno vybrali' },
    work: { en: 'generate the solutions and assemble them into one set', cs: 'navrhnu řešení a sestavím je do jedné sady' },
    turns: SEVERAL, thing: { en: 'the solution set', cs: 'sadu řešení' }, ask: ONCE },
  { stage: 5, carry: { en: 'the MVP stage', cs: 'fázi MVP' }, name: { en: 'the MVP stage', cs: 'fáze MVP' }, Stage: { en: 'The MVP stage', cs: 'Fáze MVP' },
    purpose: { en: 'setting out the ways the chosen solution could be piloted, and expanding the one you choose', cs: 'připravit varianty, jak zvolené řešení pilotovat, a rozpracovat tu, kterou si vyberete' },
    work: { en: 'write the MVP options, and once you choose one, expand it into a pilot', cs: 'sepíšu varianty MVP, a až si jednu vyberete, rozpracuji ji do pilotu' },
    turns: SEVERAL, thing: { en: 'the MVP options and the expanded pilot', cs: 'varianty MVP a rozpracovaný pilot' }, ask: ONCE },
  { stage: 6, carry: { en: 'the PRD stage', cs: 'fázi PRD' }, name: { en: 'the PRD stage', cs: 'fáze PRD' }, Stage: { en: 'The PRD stage', cs: 'Fáze PRD' },
    purpose: { en: 'writing the product requirements for the pilot you chose', cs: 'sepsat produktové požadavky na pilot, který jste zvolili' },
    work: { en: 'draft the PRD, and once you agree it the workflow writes the agreed PRD from the draft', cs: 'připravím návrh PRD, a až s ním budete souhlasit, workflow z něj vytvoří odsouhlasené PRD' },
    turns: SEVERAL, thing: { en: 'the PRD', cs: 'PRD' }, ask: ONCE },
  { stage: 7, carry: { en: 'the initiative stage', cs: 'fázi iniciativy' }, name: { en: 'the initiative stage', cs: 'fáze iniciativy' }, Stage: { en: 'The initiative stage', cs: 'Fáze iniciativy' },
    purpose: { en: 'writing the initiative Česká spořitelna reads, from the agreed PRD', cs: 'sepsat z odsouhlaseného PRD iniciativu, kterou bude Česká spořitelna číst' },
    work: { en: 'write the initiative from the agreed PRD', cs: 'sepíšu iniciativu z odsouhlaseného PRD' },
    turns: { en: 'one turn', cs: 'jedno kolo' }, thing: { en: 'the initiative', cs: 'iniciativu' }, ask: ONCE },
];
export const BOXES = {
  approval: [
    { en: 'Your name, which the record will carry', cs: 'Vaše jméno, které záznam ponese' },
    { en: 'The role you are deciding in', cs: 'Role, ve které rozhodujete' },
    { en: 'Answers to this gate\'s questions, optional: leave it empty to skip them', cs: 'Odpovědi na otázky této fáze, nepovinné: pokud je chcete vynechat, nechte pole prázdné' },
    { en: 'What you asked to be changed before approving, in your own words. Optional: leave it empty if nothing.', cs: 'Co jste před schválením chtěli změnit, vlastními slovy. Nepovinné: pokud nic, nechte pole prázdné.' },
  ],
  noQuestions: { en: 'Answers to this gate\'s questions: it asks none, so leave it empty', cs: 'Odpovědi na otázky této fáze: žádné nemá, takže pole nechte prázdné' },
  answersStand: { en: 'Your answers to this gate\'s questions: they are on the record, so leave it empty', cs: 'Vaše odpovědi na otázky této fáze: už jsou v záznamu, takže pole nechte prázdné' },
  choice: [
    { en: 'What kind: choice', cs: 'Druh: choice' },
    { en: 'Which one you chose: its id, as the document shows it', cs: 'Kterou položku jste zvolili: její označení, jak ho uvádí dokument' },
    { en: 'Why you chose it, in your own words', cs: 'Proč jste ji zvolili, vlastními slovy' },
    { en: 'Your name', cs: 'Vaše jméno' },
    { en: 'The role you decided in', cs: 'Role, ve které jste rozhodli' },
  ],
  agreement: [{ en: 'Who decided it: your name', cs: 'Kdo rozhodl: vaše jméno' }],
  nameOnRecord: { en: 'This run records {name}; type it as the record spells it.', cs: 'Tento běh uvádí jméno {name}; napište ho tak, jak je v záznamu.' },
  roleOnRecord: { en: 'Leave it empty to keep {role}, the role this run records for you.', cs: 'Pokud pole necháte prázdné, zůstane role {role}, kterou pro vás tento běh uvádí.' },
};
export const DOCS = {
  A1: { en: 'the brief', cs: 'zadání' },
  A3: { en: 'the set of problem hypotheses', cs: 'hypotézy problémů' },
  A4: { en: 'the list of prioritised opportunities', cs: 'seřazené příležitosti' },
  A8: { en: 'the solution set', cs: 'sadu řešení' },
  A9: { en: 'the selected solution', cs: 'vybrané řešení' },
  A10: { en: 'the set of MVP options', cs: 'varianty MVP' },
  A11: { en: 'the expanded pilot', cs: 'rozpracovaný pilot' },
  A12: { en: 'the PRD draft', cs: 'návrh PRD' },
  A13: { en: 'the agreed PRD', cs: 'odsouhlasené PRD' },
  A14: { en: 'the initiative', cs: 'iniciativu' },
};
export const THINGS = [{ en: 'thing', cs: 'věc' }, { en: 'things', cs: 'věci' }, { en: 'things', cs: 'věcí' }];
export const GRAMMAR = {
  qword: [{ en: 'question', cs: 'otázku' }, { en: 'questions', cs: 'otázky' }, { en: 'questions', cs: 'otázek' }],
  them: [{ en: 'it', cs: 'ni' }, { en: 'them', cs: 'ně' }, { en: 'them', cs: 'ně' }],
  act3: { choice: { en: 'choice', cs: 'výběru' }, approval: { en: 'approval', cs: 'schválení' } },
};
export const RESTS = {
  1: { en: 'what you told me in this chat', cs: 'toho, co jste mi řekli v tomto chatu' },
  2: { en: 'the problem material you supplied', cs: 'podkladů k problému, které jste dodali' },
  4: { en: 'the opportunities you put in order and the market research', cs: 'příležitostí, které jste seřadili, a z průzkumu trhu' },
  5: { en: 'the solution you chose', cs: 'řešení, které jste vybrali' },
  6: { en: 'the pilot you chose', cs: 'pilotu, který jste zvolili' },
  7: { en: 'the agreed PRD', cs: 'odsouhlaseného PRD' },
};
export const NEEDS = {
  material: { en: 'the problem material, as files in {supplied}', cs: 'podklady k problému jako soubory ve složce {supplied}' },
  run: { en: 'start the run with `SPOCK: start a run`: open the command palette, choose `Tasks: Run Task`, then pick it. It asks for the run id, the year, the month and a short name in lower case, as in {example}, then your name and the role you decide in. I never run it.',
    cs: 'spusťte běh úlohou `SPOCK: start a run`: otevřete paletu příkazů, zvolte `Tasks: Run Task` a potom tuto úlohu vyberte. Úloha se zeptá na označení běhu, tedy rok, měsíc a krátký název malými písmeny, například {example}, potom na vaše jméno a roli, ve které rozhodujete. Já ji nikdy nespouštím.' },
};
export const INDEX_LABELS = {
  Solution: { en: 'Solution', cs: 'Řešení' },
  Opportunities: { en: 'Opportunities', cs: 'Příležitosti' },
  Touchpoints: { en: 'Touchpoints', cs: 'Kontaktní body' },
  'Areas in play': { en: 'Areas in play', cs: 'Dotčené oblasti' },
  none: { en: 'none', cs: 'žádné' },
};
export function extraRows() {
  const out = [];
  for (const s of STAGES) for (const [k, v] of Object.entries(s)) if (v && typeof v === 'object' && 'en' in v) out.push({ at: `STAGES stage ${s.stage} ${k}`, ...v });
  for (const [k, v] of Object.entries(BOXES)) (Array.isArray(v) ? v : [v]).forEach((r, i) => out.push({ at: `BOXES ${k}${Array.isArray(v) ? ` ${i + 1}` : ''}`, ...r }));
  for (const [k, v] of Object.entries(NEEDS)) out.push({ at: `NEEDS ${k}`, ...v });
  for (const [k, v] of Object.entries(DOCS)) out.push({ at: `DOCS ${k}`, ...v });
  for (const [k, v] of Object.entries(RESTS)) out.push({ at: `RESTS ${k}`, ...v });
  for (const [k, v] of Object.entries(GRAMMAR))
    for (const [j, r] of (Array.isArray(v) ? v.entries() : Object.entries(v))) out.push({ at: `GRAMMAR ${k} ${j}`, ...r });
  THINGS.forEach((v, i) => out.push({ at: `THINGS ${i + 1}`, ...v }));
  for (const [k, v] of Object.entries(INDEX_LABELS)) out.push({ at: `INDEX_LABELS ${k}`, ...v });
  return out;
}

export function czechQuestion(en) {
  const q = QUESTIONS.find(x => x.en === en);
  return q ? q.cs : null;
}

export const WORDS = [
  { id: 'later_stage_4', checks: ['C118'], read: 'an opportunity\'s empty alternatives field giving its reason',
    wrap: '{b}(?:{}){e}', en: ['stage\\s*4'], cs: ['fáze\\s*4', 'fázi\\s*4', 'etapa\\s*4', 'etapě\\s*4'],
    shown: { en: ['stage 4'], cs: ['fáze 4', 'fázi 4', 'etapa 4', 'etapě 4'] } },
  { id: 'not_applicable', checks: ['C125'], read: 'a compliance screen\'s reason and the derived compliance section', czech_from: '1.12',
    en: ['not\\s+applicable'], cs: ['neuplatňuje\\s+se', 'nevztahuje\\s+se', 'nelze\\s+uplatnit'],
    shown: { en: ['not applicable'], cs: ['neuplatňuje se', 'nevztahuje se', 'nelze uplatnit'] } },
  { id: 'kr_increase', checks: ['C77'], read: 'the direction a goal cites for a key result', czech_from: '1.12',
    en: ['{b}increase{e}'], cs: ['{b}zvýš', '{b}růst'],
    shown: { en: ['increase'], cs: ['zvýšení', 'růst'] } },
  { id: 'kr_decrease', checks: ['C77'], read: 'the direction a goal cites for a key result', czech_from: '1.12',
    en: ['{b}decrease{e}'], cs: ['{b}sníž', '{b}pokles'],
    shown: { en: ['decrease'], cs: ['snížení', 'pokles'] } },
  { id: 'nothing_escalates', checks: ['C166'], read: 'the escalation line of a solution\'s compliance summary',
    wrap: '{b}(?:{})', en: ['no', 'none', 'nothing'], cs: ['nic', 'žádn'],
    shown: { en: ['no', 'none', 'nothing'], cs: ['nic', 'žádné'] } },
  { id: 'generic_reason', checks: ['C102'], read: 'the reason a lost solution gives', czech_from: '1.12',
    wrap: '^(?:it |the idea |this )?(?:{})\\.?$',
    en: ['failed', 'did not work', 'error', 'errored', 'timed out', 'n\\/a', 'tbd', 'unknown', 'none'],
    cs: ['selhalo', 'nefungovalo', 'chyba', 'vypršel čas', 'neznámo', 'nic'],
    shown: { en: ['failed', 'did not work', 'error', 'timed out', 'n/a', 'tbd', 'unknown', 'none'],
      cs: ['selhalo', 'nefungovalo', 'chyba', 'vypršel čas', 'neznámo', 'nic'] } },
  { id: 'bears_on_none', checks: ['C101'], read: 'a finding that bears on no problem of the run',
    en: ['bears on none', 'bear on none', 'no committed problem', 'none of the (?:committed )?problems', 'addresses none'],
    cs: ['ne(?:do)?týká se žádn(?:é|ého)[^.]{0,40}?(?:příležitost|problém)', 'nesouvisí s žádn(?:ou|ým)[^.]{0,40}?(?:příležitost|problém)'],
    shown: { en: ['bears on none'], cs: ['nedotýká se žádné'] } },
  { id: 'run_not_real', checks: ['C175'], read: 'the initiative\'s body and its reading copy, for a statement that the run is not real',
    wrap: '{b}(?:{}){e}', unicode_from: '1.14', en: ['fixtures?', 'id_basis'], cs: ['fiktivn[íi]', 'testovac[íi]'],
    shown: { en: ['fixture', 'id_basis'], cs: ['fiktivní', 'testovací'] } },
  { id: 'opportunity_from', checks: ['C115'], read: 'an opportunity\'s heading, naming the hypothesis it is framed from',
    wrap: '\\((?:{})[ \\t]+', en: ['from'], cs: ['z'],
    shown: { en: ['(from H1)'], cs: ['(z H1)'] } },
  { id: 'opportunity_yours', checks: ['C115'], read: 'an opportunity\'s heading, marking one a person brought',
    wrap: '\\((?:{})\\)', en: ['yours'], cs: ['vaše', 'vlastní'],
    shown: { en: ['(yours)'], cs: ['(vaše)', '(vlastní)'] } },
];

const WORD_START = '(?:\\b|(?<![\\p{L}\\p{N}_]))';
const WORD_END = '(?:\\b|(?![\\p{L}\\p{N}_]))';
const wordsRow = id => {
  const w = WORDS.find(x => x.id === id);
  if (!w) throw new Error(`${id} is not a row of WORDS in .github/scripts/fixed-messages.mjs`);
  return w;
};
export function wordsRe(id, { czech = true, unicode = true } = {}) {
  const w = wordsRow(id);
  const body = [...w.en, ...(czech ? w.cs : [])].join('|');
  const src = String(w.wrap || '(?:{})').replace('{}', () => body);
  const edges = /\{[be]\}/.test(src);
  return new RegExp(src.replace(/\{b\}/g, () => (unicode ? WORD_START : '\\b')).replace(/\{e\}/g, () => (unicode ? WORD_END : '\\b')),
    edges && unicode ? 'iu' : 'i');
}
export const wordsCzechFrom = id => wordsRow(id).czech_from || null;
export const wordsUnicodeFrom = id => wordsRow(id).unicode_from || null;
export function wordsShown(id) {
  const w = wordsRow(id);
  const all = [...w.shown.en, ...w.shown.cs].map(s => `"${s}"`);
  return all.length === 1 ? all[0] : `${all.slice(0, -1).join(', ')} or ${all[all.length - 1]}`;
}
export function shapeWordFaults(check, lines) {
  const out = [];
  for (const l of lines.filter(x => typeof x === 'string')) {
    for (const m of l.matchAll(/\{words:([^}]*)\}/g)) if (!WORDS.some(w => w.id === m[1])) out.push({ unknown: m[1] });
    const bare = l.replace(/`[^`]*`/g, ' ').replace(/\{words:[^}]*\}/g, ' ').toLowerCase();
    for (const w of WORDS) {
      if (!(w.checks || []).includes(check) || !w.shown.en.every(f => /\s/.test(f))) continue;
      const form = [...w.shown.en, ...w.shown.cs].find(f => bare.includes(f.toLowerCase()));
      if (form) out.push({ row: w.id, form });
    }
  }
  return out;
}
export const withWords = line => (typeof line === 'string'
  ? line.replace(/\{words:([a-z0-9_]+)\}/g, (m, id) => (WORDS.some(w => w.id === id) ? wordsShown(id) : m)) : line);

export const WORD_FILES = ['.github/scripts/check.mjs', '.github/scripts/gates.mjs', '.github/scripts/doc-structure.mjs', '.github/scripts/derive.mjs'];

const REGEX_AFTER = new Set(['return', 'typeof', 'case', 'do', 'else', 'in', 'of', 'new', 'delete', 'void', 'throw', 'yield', 'await', 'instanceof']);
export function patternLiterals(text) {
  const out = [];
  const starts = [0];
  for (let q = 0; q < text.length; q++) if (text[q] === '\n') starts.push(q + 1);
  const lineAt = x => { let lo = 0, hi = starts.length - 1; while (lo < hi) { const m = (lo + hi + 1) >> 1; if (starts[m] <= x) lo = m; else hi = m - 1; } return lo + 1; };
  const n = text.length;
  let i = text.startsWith('#!') ? Math.max(0, text.indexOf('\n')) : 0;
  let last = '', word = '';
  const braces = [];
  const template = () => {
    while (i < n) {
      const ch = text[i];
      if (ch === '\\') { i += 2; continue; }
      if (ch === '`') { i++; last = 'x'; word = ''; return; }
      if (ch === '$' && text[i + 1] === '{') { i += 2; braces.push(true); last = '{'; word = ''; return; }
      i++;
    }
  };
  while (i < n) {
    const c = text[i], d = text[i + 1];
    if (c === '/' && d === '/') { const e = text.indexOf('\n', i); i = e === -1 ? n : e; continue; }
    if (c === '/' && d === '*') { const e = text.indexOf('*/', i + 2); i = e === -1 ? n : e + 2; continue; }
    if (/\s/.test(c)) { i++; continue; }
    if (c === "'" || c === '"') {
      let j = i + 1;
      while (j < n && text[j] !== c && text[j] !== '\n') j += text[j] === '\\' ? 2 : 1;
      const m = /\.(includes|startsWith|endsWith|indexOf)\(\s*$/.exec(text.slice(Math.max(0, i - 40), i));
      if (m) out.push({ kind: 'string', line: lineAt(i), src: text.slice(i + 1, j), callee: m[1], literal: text.slice(i, j + 1) });
      i = j + 1; last = 'x'; word = ''; continue;
    }
    if (c === '`') { i++; template(); continue; }
    if (c === '{') { braces.push(false); last = '{'; word = ''; i++; continue; }
    if (c === '}') { const t = braces.pop(); i++; if (t) template(); else { last = 'x'; word = ''; } continue; }
    if (c === '/' && (last === '' || '(,=:[!&|?{};+-*%<>~^'.includes(last) || (last === 'w' && REGEX_AFTER.has(word)))) {
      let j = i + 1, cls = false;
      while (j < n && text[j] !== '\n') {
        const ch = text[j];
        if (ch === '\\') { j += 2; continue; }
        if (ch === '[') cls = true; else if (ch === ']') cls = false; else if (ch === '/' && !cls) break;
        j++;
      }
      let k = j + 1;
      while (k < n && /[a-z]/.test(text[k])) k++;
      out.push({ kind: 'regex', line: lineAt(i), src: text.slice(i + 1, j), flags: text.slice(j + 1, k), literal: text.slice(i, k) });
      i = k; last = 'x'; word = ''; continue;
    }
    if (/[A-Za-z_$]/.test(c)) { let j = i; while (j < n && /[\w$]/.test(text[j])) j++; word = text.slice(i, j); last = 'w'; i = j; continue; }
    if (/\d/.test(c)) { let j = i; while (j < n && /[\w.]/.test(text[j])) j++; last = 'x'; word = ''; i = j; continue; }
    last = (c === ')' || c === ']') ? 'x' : c; word = ''; i++;
  }
  return out;
}
export function literalWords(src, kind) {
  let s = String(src || '');
  if (kind === 'regex')
    s = s.replace(/\\u\{[0-9a-fA-F]+\}|\\u[0-9a-fA-F]{4}|\\x[0-9a-fA-F]{2}|\\c[A-Za-z]|\\[pPk]\{[^}]*\}|\\k<[^>]*>/g, ' ')
      .replace(/\\./g, ' ').replace(/\[(?:[^\]\\]|\\.)*\]/g, ' ').replace(/\(\?<[A-Za-z]\w*>/g, ' ');
  s = s.replace(/`[^`]*`/g, ' ').replace(/\b[a-z][a-z0-9]*(?:_[a-z0-9]+)+\b/g, ' ').replace(/\b[A-Za-z][\w-]*:/g, ' ');
  return [...new Set(s.match(/[A-Za-zÀ-ɏ]{3,}/g) || [])];
}

const WHY = {
  inject: 'a prompt-injection detector, which reads both languages already',
  language: 'one of the two language classifiers, which count each language\'s commonest words',
  url: 'a URL shape, which is not a word anyone writes',
  typeLetter: 'a key result\'s type letter, a field the Strategy Basis fixes',
  detail: 'the check\'s own detail text, which the workflow writes',
  output: 'a line the workflow itself prints, read back by the workflow',
  path: 'a path or a file name the workflow writes',
  flag: 'a command-line flag of the workflow\'s own scripts',
  field: 'a field value or token the workflow\'s forms and templates fix, the same in both languages',
  heading: 'a heading the Documentation Standards fix, read as the template writes it',
  both: 'reads both languages already',
  closingEn: 'the closing heading of a developed document, read in English only; its Czech is not read here (W33, reported)',
  caveatEn: 'the generic caveat a hypothesis\'s risk is refused for, read in English only; its Czech is not specified (W33, reported)',
  stageHeadingEn: 'a stage number in a document\'s heading, read in English only; a Czech "fáze 4" is not read here (W33, reported)',
};
export const WORDS_EXEMPT = [
  { file: '.github/scripts/gates.mjs', reason: WHY.detail, text: "/\\bwaits on the person: |, or sign the check off again with your reason$/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.detail, text: "/^(?:K\\d+\\b|an entry with no id\\b)/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^<!-- written stop: [0-9a-f]{16} -->\\n?/gm" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^Nothing was accepted\\. What Q\\d+ found waits on you, not on /m" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^Where this run cannot meet (it|them), you can accept/m" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/no frontmatter \\(first line must be ---\\)/" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\b(ignore|disregard|forget)\\s+(all\\s+|the\\s+|any\\s+)?(previous|above|prior|preceding|earlier)\\s+(instruction|rule|prompt|direction)/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\bsystem\\s+(prompt|message|instruction)/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\bnew\\s+instructions?\\b/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\byou\\s+are\\s+now\\b/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\b(write|save|edit|create|replace|delete|append|overwrite|put)\\b[^.\\n]{0,60}\\.github\\/[A-Za-z0-9._/-]+/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\bignoruj\\w*\\s+(předchoz\\w+|všechn\\w+|výše)/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.inject, text: "/\\bnov[éá]\\s+instrukce\\b/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.both, text: "/^##\\s+(How this was produced|Jak to vzniklo)\\s*$/m" },
  { file: '.github/scripts/check.mjs', reason: WHY.closingEn, text: "/^## What we could not establish\\s*$/m" },
  { file: '.github/scripts/check.mjs', reason: WHY.output, text: "/(names no input|no screening input)/" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^(NOM|SHD|LVL|INV|TL|AI)-\\d+[ab]?$/" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^\\|\\s*\\*\\*((?:NOM|SHD|LVL|INV|TL|AI)-\\d+[ab]?)\\*\\*\\s*\\|([^|]*)\\|([^|]*)\\|([^|]*)\\|/" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^((?:NOM|SHD|LVL|INV|TL|AI)-\\d+[ab]?)\\b([\\s\\S]*)$/" },
  { file: '.github/scripts/check.mjs', reason: WHY.typeLetter, text: "/\\btype\\s*:?\\s*`?([CI])`?\\b/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^((?:NOM|SHD|LVL|INV|TL|AI)-\\d+[ab]?)\\b/" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "/^supplied\\//" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "'superseded/'" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "'evidence-standards@'" },
  { file: '.github/scripts/check.mjs', reason: WHY.caveatEn, text: "/^(it |this |the hypothesis )?(could|may|might) be wrong|needs? (further )?(validation|research|testing)|further research|if (users|customers|people) disagree|may not generalis|^(unclear|unknown|tbd|n\\/a|-)\\.?$/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "'competitive-analysis-standards@'" },
  { file: '.github/scripts/check.mjs', reason: WHY.url, text: "/^www\\./i" },
  { file: '.github/scripts/check.mjs', reason: WHY.url, text: "/\\b(?:https?:\\/\\/|www\\.)[^\\s<>\"'()\\[\\]]+/gi" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^approved_endpoint:\\s*(?!null\\s*$)\\S/m" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^  - id:\\s*(\\S+)[\\s\\S]*?^    permits_real_material:\\s*(true|false)\\s*$/gm" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "/\\.(compliance|derived)\\.md$/" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "/\\/parts\\//" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "/\\/sources\\.md$/" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/\\b(A\\d{1,2}[a-z]?|H\\d+|OPT-[A-Z]\\b|ID-\\d+|R-A\\d{1,2}[a-z]?-\\d+|R\\d+|[GQ][1-7][a-z]?|C\\d{1,3})\\b(?!\\s*\\d{4})/g" },
  { file: '.github/scripts/check.mjs', reason: WHY.language, text: "/(?:\\b(?:se|je|jsou|že|pro|na|které|který|nebo|při|podle|této|tato|tento|jako|jeho|jejich|byla|bylo|nelze|aby|ale|což|takto|své|svých)\\b|[ěščřžýáíéúůňťď])/gi" },
  { file: '.github/scripts/check.mjs', reason: WHY.language, text: "/\\b(?:the|and|of|in|is|for|that|with|are|as|by|from|this|which|been|will|not|its|their|would|these|such)\\b/gi" },
  { file: '.github/scripts/check.mjs', reason: WHY.field, text: "/^\\*\\*\\[(universal|common|emerging|rare)\\]/i" },
  { file: '.github/scripts/check.mjs', reason: WHY.path, text: "'.record.md'" },
  { file: '.github/scripts/check.mjs', reason: WHY.flag, text: "'--document'" },
  { file: '.github/scripts/check.mjs', reason: WHY.flag, text: "'--estate'" },
  { file: '.github/scripts/check.mjs', reason: WHY.output, text: "/no frontmatter \\(first line must be ---\\)/" },
  { file: '.github/scripts/check.mjs', reason: WHY.flag, text: "'--for-writer'" },
  { file: '.github/scripts/check.mjs', reason: WHY.output, text: "/add\\(\\s*'(C\\d+)'/g" },
  { file: '.github/scripts/check.mjs', reason: WHY.detail, text: "/\\bpostdates?\\b|\\bpredates?\\b|\\bor later\\b|written before/i" },
  { file: '.github/scripts/gates.mjs', reason: WHY.path, text: "/(?:records\\/)?[A-Za-z0-9._-]+\\/[A-Za-z0-9._/-]+\\.md\\b/g" },
  { file: '.github/scripts/gates.mjs', reason: WHY.path, text: "/^records\\//" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^stage (\\d+)(?=[\\s:,;]|$)/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.path, text: "/^(?:[^\\s:/]+: )?(?:records\\/)?([^\\s:]+\\/[^\\s:]+?)(?=[:\\s]|$)/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^<!-- earlier failure: (.+) -->$/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^\\s*FAIL\\b/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^(\\S+), stage \\S+$/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/, about (\\S+), stage \\S+\\.$/" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^ *PARSE FAIL +(\\S[^\\n]*?) *\\n +(\\S[^\\n]*?) *$/gm" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^  ! (\\S+\\.mjs) exited (\\d+)$/gm" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^\\S+ — stage (\\d+) cannot be checked: the checker could not read (.+?), so Q\\d+ records nothing/m" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/, | and /" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^\\S+ is complete: [^\\n]*?\\. (?:In \\S+, )?(.+?) still fails? with no sign-off standing, though (?:the stage is|those stages are) accepted\\./m" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/,| and /" },
  { file: '.github/scripts/gates.mjs', reason: WHY.output, text: "/^(A\\d+) is agreed by a person, and no agent may mark it\\.$/m" },
  { file: '.github/scripts/gates.mjs', reason: WHY.path, text: "/^supplied\\//" },
  { file: '.github/scripts/gates.mjs', reason: WHY.path, text: "/\\.(docx|pptx|xlsx)\\.md$/i" },
  { file: '.github/scripts/gates.mjs', reason: WHY.field, text: "/trust|tag\\b/i" },
  { file: '.github/scripts/doc-structure.mjs', reason: WHY.stageHeadingEn, text: "/\\bstage\\s+\\d\\b/i" },
  { file: '.github/scripts/derive.mjs', reason: WHY.field, text: "/^\\s*([A-Z]+-\\d+)\\s*·\\s*(yes|no|cannot_tell)\\s*(?:·\\s*([\\w-]+)\\s*)?$/" },
  { file: '.github/scripts/derive.mjs', reason: WHY.path, text: "/\\.(answers|derived|compliance)\\.md$/" },
  { file: '.github/scripts/derive.mjs', reason: WHY.flag, text: "'--write'" },
];

export function wordFaults({ read = f => readFileSync(f, 'utf8'), files = WORD_FILES, exempt = WORDS_EXEMPT } = {}) {
  const faults = [];
  let count = 0, moved = 0, excused = 0;
  const used = new Set();
  for (const file of files) {
    let text;
    try { text = read(file); } catch { faults.push(`${file} cannot be read, so the words its patterns read are not known`); continue; }
    moved += (text.match(/\bwords(?:Re|For)\((?:\s*\w+\s*,)?\s*'[a-z0-9_]+'/g) || []).length;
    for (const l of patternLiterals(text)) {
      if (l.kind === 'string' && !l.callee) continue;
      const words = literalWords(l.src, l.kind);
      if (!words.length) continue;
      count++;
      const k = exempt.findIndex(e => e.file === file && e.text === l.literal);
      if (k !== -1) { excused++; used.add(k); continue; }
      faults.push(`${file}:${l.line} reads the word(s) ${words.map(w => `"${w}"`).join(', ')} with a pattern of its own (${l.literal}). ` +
        'A word a check reads in what an agent or a person writes goes into WORDS with its Czech; a pattern that reads no such word goes into WORDS_EXEMPT with its reason.');
    }
  }
  exempt.forEach((e, k) => {
    if (!used.has(k) && files.includes(e.file))
      faults.push(`WORDS_EXEMPT holds ${e.file}'s ${e.text}, and no pattern in that file reads it any more: take the exemption out.`);
  });
  return { faults, read: count, moved, exempt: excused };
}

const flat = s => String(s || '').replace(/\s+/g, ' ').trim();

export function render(id, lang = 'en', blocks = BLOCKS) {
  const b = blocks.find(x => x.id === id);
  if (!b) return null;
  let out = '';
  for (const [i, r] of b.rows.entries()) {
    const t = lang === 'cs' ? r.cs : r.en;
    out += i === 0 ? t : r.starts === 'para' ? `\n\n${t}` : r.starts === 'line' ? `\n${t}` : ` ${t}`;
  }
  return out;
}

const MARKER_RE = /^(?:- |> |\d+\. )/;
const BRACE_LINE_RE = /^\{[^{}]*\}$/;

export function splitRows(text) {
  const lines = String(text).replace(/\r/g, '').split('\n');
  const segs = [];
  let pendingPara = true, afterBrace = false;
  for (const raw of lines) {
    const l = raw.trim();
    if (!l) { pendingPara = true; afterBrace = false; continue; }
    const brace = BRACE_LINE_RE.test(l);
    const starts = pendingPara ? 'para' : (MARKER_RE.test(l) || brace || afterBrace) ? 'line' : null;
    if (starts || !segs.length) segs.push({ text: l, starts: starts || 'para' });
    else segs[segs.length - 1].text += ` ${l}`;
    pendingPara = false;
    afterBrace = brace;
  }
  const rows = [];
  for (const s of segs) {
    const t = s.text;
    const lead = (MARKER_RE.exec(t) || [''])[0].length;
    let depth = 0, tick = false, quote = null, from = 0, first = true;
    for (let i = lead; i < t.length; i++) {
      const ch = t[i];
      if (tick) { if (ch === '`') tick = false; continue; }
      if (quote) { if (ch === quote) quote = null; continue; }
      if (ch === '`') { tick = true; continue; }
      if (ch === '{') { depth++; continue; }
      if (ch === '}') { depth = Math.max(0, depth - 1); continue; }
      if (depth) continue;
      if (ch === '"') { quote = '"'; continue; }
      if (ch === '“') { quote = '”'; continue; }
      if (('.!'.includes(ch) || (ch === '?' && t[i - 1] !== ' ')) && (i + 1 === t.length || t[i + 1] === ' ')) {
        rows.push({ en: t.slice(from, i + 1).trim(), ...(first ? { starts: s.starts } : {}) });
        first = false;
        from = i + 1;
      }
    }
    const rest = t.slice(from).trim();
    if (rest) rows.push({ en: rest, ...(first ? { starts: s.starts } : {}) });
  }
  return rows;
}

const BRACE_RE = /\{[^{}]*\}/g;
const TICK_RE = /`[^`]*`/g;
export const hasWords = s => {
  let t = String(s || '').replace(TICK_RE, ' '), was;
  do { was = t; t = t.replace(BRACE_RE, ' '); } while (t !== was);
  return /\p{L}/u.test(t);
};
export function bracesOf(s) {
  const out = new Set();
  const t = String(s || '').replace(TICK_RE, m => ' '.repeat(m.length));
  for (const m of t.matchAll(BRACE_RE)) {
    if (m.index > 0 && /\p{L}/u.test(t[m.index - 1])) continue;
    out.add(flat(m[0].replace(/"[^"]*"|„[^“]*“|“[^”]*”/g, '"…"')));
  }
  return out;
}
export const ticksOf = s => new Set([...String(s || '').matchAll(TICK_RE)].map(m => m[0]));
const sameSet = (a, b) => a.size === b.size && [...a].every(x => b.has(x));
const listed = set => [...set].join(' ') || 'none';

const FENCE_RE = /^\s*```/;
const open = id => `<!-- cs:${id} -->`;
const close = id => `<!-- /cs:${id} -->`;

export function englishBlock(text, block) {
  const lines = text.split('\n');
  const at = lines.map((l, i) => (l.trim() === block.after.trim() ? i : -1)).filter(i => i !== -1);
  if (at.length !== 1) return { error: `the line it follows, "${block.after}", is in ${block.file} ${at.length} times rather than once` };
  let start = -1;
  for (let i = at[0] + 1; i < lines.length; i++) if (FENCE_RE.test(lines[i])) { start = i; break; }
  let end = -1;
  if (start !== -1) for (let i = start + 1; i < lines.length; i++) if (FENCE_RE.test(lines[i])) { end = i; break; }
  if (start === -1 || end === -1) return { error: `no fenced block follows "${block.after}" in ${block.file}` };
  return { start, end, body: lines.slice(start + 1, end).join('\n') };
}

export const czechBlock = block =>
  [open(block.id), '**In a Czech run:**', '', '```', render(block.id, 'cs', [block]), '```', close(block.id)].join('\n');

export function written(file, text, blocks = BLOCKS) {
  const errors = [];
  let out = text;
  for (const b of blocks.filter(x => x.printed)) {
    const a = out.indexOf(open(b.id)), z = out.indexOf(close(b.id));
    if (a !== -1 && z > a) out = out.slice(0, out[a - 1] === '\n' ? a - 1 : a) + out.slice(z + close(b.id).length);
  }
  for (const b of blocks.filter(x => !x.printed && x.file === file)) {
    const a = out.indexOf(open(b.id)), z = out.indexOf(close(b.id));
    if (a !== -1 && z > a) { out = out.slice(0, a) + czechBlock(b) + out.slice(z + close(b.id).length); continue; }
    const en = englishBlock(out, b);
    if (en.error) { errors.push(`${b.id}: ${en.error}`); continue; }
    const lines = out.split('\n');
    lines.splice(en.end + 1, 0, '', czechBlock(b));
    out = lines.join('\n');
  }
  return { text: out, errors };
}

export const files = (blocks = BLOCKS) => [...new Set(blocks.filter(b => !b.printed).map(b => b.file))];

export function drift(blocks = BLOCKS) {
  const out = [];
  for (const f of files(blocks)) {
    if (!existsSync(f)) { out.push(`${f} is named by the table and is not on disk`); continue; }
    const text = readFileSync(f, 'utf8');
    const named = out.length;
    for (const b of blocks.filter(x => !x.printed && x.file === f)) {
      const a = text.indexOf(open(b.id)), z = text.indexOf(close(b.id));
      if (a === -1 || z < a) out.push(`${f} carries no Czech block for ${b.id} — run \`node .github/scripts/fixed-messages.mjs --write\``);
      else if (text.slice(a, z + close(b.id).length) !== czechBlock(b))
        out.push(`${f}'s Czech block ${b.id} is not what the table gives, so it was edited by hand or the table changed since — write the Czech into the table and run \`node .github/scripts/fixed-messages.mjs --write\``);
    }
    if (out.length === named && written(f, text, blocks).text !== text) out.push(`${f} is not what \`fixed-messages.mjs --write\` writes`);
  }
  const filed = new Map(blocks.filter(b => !b.printed).map(b => [b.id, b.file]));
  for (const f of [...new Set([...files(blocks), ...MARKED_FILES])].filter(existsSync)) {
    for (const m of readFileSync(f, 'utf8').matchAll(/<!-- cs:([^ ]+) -->/g))
      if (filed.get(m[1]) !== f) out.push(`${f} carries a Czech block ${m[1]} the table does not file there`);
  }
  return out;
}

export const MARKED_FILES = ['.github/copilot-instructions.md', '.github/skills/landscape-mapping/SKILL.md',
  '.github/skills/workflow-support/SKILL.md', '.github/skills/opportunity-framing/SKILL.md', '.github/skills/prioritisation/SKILL.md'];

export function faults(asks = [], blocks = BLOCKS, questions = QUESTIONS, known = null) {
  const out = [];
  for (const b of blocks) {
    const en = b.printed ? null : existsSync(b.file) ? englishBlock(readFileSync(b.file, 'utf8'), b) : { error: `${b.file} is not on disk` };
    if (!en) {  }
    else if (en.error) out.push(`${b.id}: ${en.error}`);
    else {
      const disk = splitRows(en.body);
      const n = Math.max(disk.length, b.rows.length);
      for (let i = 0; i < n; i++) {
        const d = disk[i], r = b.rows[i];
        if (d && r && flat(d.en) === flat(r.en) && (d.starts || '') === (r.starts || '')) continue;
        out.push(`${b.id} in ${b.file}: row ${i + 1} reads ${d ? `"${d.en}"` : 'nothing'} on disk and ${r ? `"${r.en}"` : 'nothing'} in the table` +
          ` — a row's English and its Czech change together in the table, and the Czech goes into the next review document`);
        break;
      }
    }
    for (const [i, r] of b.rows.entries()) {
      const at = `${b.id} row ${i + 1}`;
      if (hasWords(r.en) && (!flat(r.cs) || flat(r.cs) === flat(r.en)))
        out.push(`${at}: "${r.en}" has ${flat(r.cs) ? 'its English' : 'no Czech'} where its Czech belongs`);
      const be = bracesOf(r.en), bc = bracesOf(r.cs);
      if (!sameSet(be, bc)) out.push(`${at}: the Czech carries the braces ${listed(bc)} where the English carries ${listed(be)}`);
      const te = ticksOf(r.en), tc = ticksOf(r.cs);
      if (!sameSet(te, tc)) out.push(`${at}: the Czech carries the backticked values ${listed(tc)} where the English carries ${listed(te)}`);
      if (b.printed && known) {
        for (const k of [...String(r.en).matchAll(/\{([^{}]*)\}/g)].map(m => m[1]))
          if (!known.fills.includes(k)) out.push(`${at}: {${k}} is not a fill messages.mjs makes, so no message could print this row`);
        const cond = r.when === undefined ? null : String(r.when).replace(/^!/, '');
        if (cond !== null && !known.conditions.includes(cond)) out.push(`${at}: its condition "${r.when}" is not one messages.mjs evaluates`);
        if (r.each !== undefined && !known.lists.includes(String(r.each))) out.push(`${at}: it repeats over "${r.each}", which is not a list messages.mjs fills`);
      }
    }
  }
  for (const r of extraRows()) {
    if (!flat(r.cs) || (hasWords(r.en) && flat(r.cs) === flat(r.en))) out.push(`${r.at}: "${r.en}" has ${flat(r.cs) ? 'its English' : 'no Czech'} where its Czech belongs`);
    if (!sameSet(bracesOf(r.en), bracesOf(r.cs))) out.push(`${r.at}: the Czech carries the braces ${listed(bracesOf(r.cs))} where the English carries ${listed(bracesOf(r.en))}`);
    if (!sameSet(ticksOf(r.en), ticksOf(r.cs))) out.push(`${r.at}: the Czech carries the backticked values ${listed(ticksOf(r.cs))} where the English carries ${listed(ticksOf(r.en))}`);
  }
  out.push(...drift(blocks));
  for (const a of asks) {
    const q = questions.find(x => x.en === a);
    if (!q) out.push(`the gate question "${a}" has no row in the table's QUESTIONS, so a Czech run has no Czech for it`);
    else if (!/\?$/.test(flat(q.cs)) || q.cs.includes('—'))
      out.push(`the gate question "${a}" has the Czech "${q.cs}", which ${/\?$/.test(flat(q.cs)) ? 'carries a long dash' : 'does not end in a question mark'}`);
  }
  return out;
}

export function reviewedEnglish(text) {
  const out = new Set();
  for (const line of String(text).replace(/\r/g, '').split('\n')) {
    if (!/^\s*\|/.test(line) || /^\s*\|[\s|:-]+\|\s*$/.test(line)) continue;
    const cells = line.trim().replace(/^\|/, '').replace(/\|$/, '').split(/(?<!\\)\|/).map(c => flat(c.replace(/\\\|/g, '|')));
    if (cells.length >= 3 && cells[1] !== 'English') out.add(cells[1]);
  }
  return out;
}

const cell = s => flat(s).replace(/\|/g, '\\|');
const tableHead = ['| # | English | Česky (návrh) |', '|---|---|---|'];

const INTRO = [
  '# Pevné texty workflow SPOCK: co je nového k připomínkám',
  '',
  '*The SPOCK workflow\'s fixed text: what is new, for review*',
  '',
  '## Úvod',
  '',
  'Tento dokument obsahuje pevné texty workflow SPOCK, které se od minulého dokumentu k připomínkám změnily nebo přibyly:',
  'věty, které agenti posílají člověku v přesně daných okamžicích běhu, otázky, které workflow klade u bran, a body',
  'compliance v kartách oblastí. V běhu vedeném česky agent zkopíruje český blok pod anglickým a žádnou větu nevynechá',
  'ani nesloučí s jinou. U každé věty najdete anglický originál a naše české znění.',
  '',
  'Prosíme vás, abyste české znění opravili přímo v pravém sloupci, nebo navrhli lepší formulaci. Vše, co je',
  'v obrácených apostrofech (`takto`) nebo ve složených závorkách ({takto}), ponechte beze změny.',
  '',
  'Připomínky prosíme zaslat do {date}.',
  '',
  '## Introduction',
  '',
  'This document holds the fixed text of the SPOCK workflow that changed or was added since the last review document:',
  'the sentences the agents send to the person at set moments of a run, the questions the workflow asks at its gates,',
  'and the compliance touchpoints of the area cards. In a Czech run the agent copies the Czech block under the English',
  'one, and drops no sentence and merges none. For every sentence you will find the English original and our Czech.',
  '',
  'Please correct the Czech directly in the right-hand column, or propose better wording. Leave anything in backticks',
  '(`like this`) or braces ({like this}) as it is.',
  '',
  'Please return your comments by {date}.',
  '',
  '## Jak dokument číst · How to read this',
  '',
  '1. Each message is split into sentences, numbered from 1 within the message, so a comment can point to, for example,',
  '   "section 1, sentence 3". Only the sentences you have not seen are listed, each under its number in the whole',
  '   message.',
  '2. **★** marks a sentence that must be kept complete and word for word: never dropped, shortened or merged. Every',
  '   other sentence is fixed too; ★ marks the ones where a loss matters most.',
  '3. **▸** marks a condition: an instruction to the agent saying when the sentences below it appear. It is never sent',
  '   to the person and needs no review, so it is not listed; the section\'s **When** line says when its sentences are',
  '   used.',
  '4. **¶** before a number means the sentence starts a new paragraph in the message. A leading "-" or "1." in a cell is',
  '   the bullet or step number as the person sees it.',
  '5. **Braces {…}** are filled by the agent from the run, in the run\'s language, so we left them in English. The one',
  '   exception is a sentence in quotation marks inside braces: that is fixed text, so it is translated. Where the word the',
  '   agent fills in decides the ending of a Czech word next to it (*vašeho / vaší*, *přijatá / přijaté*), the agent',
  '   adjusts the ending.',
  '6. **Backticks** hold task names, commands, file paths and values the person types or picks in VS Code. They stay',
  '   exactly as printed, because that is what the person finds on the screen.',
  '7. The agent speaks of itself in the masculine (*napsal jsem*, *sám*), as *agent* is masculine in Czech. When it',
  '   addresses the person, the Czech avoids endings that depend on gender (*jste schválil / schválila*), because the',
  '   agent does not know who is reading. Please keep both when you correct.',
  '8. In the compliance sections each touchpoint takes two rows: the touchpoint under its identifier, and under it,',
  '   marked ↳, what it means for the product. The identifier stays as the card gives it.',
];

export function reviewDocument(lastText, { blocks = BLOCKS, questions = QUESTIONS, cards = [], extra = extraRows() } = {}) {
  const seen = reviewedEnglish(lastText);
  const fresh = s => !seen.has(flat(s));
  const L = [...INTRO];
  let n = 0;
  const section = (title, when, body) => { L.push('', '---', '', `## ${++n} · ${title}`, ''); if (when) L.push(...when, ''); L.push(...body); };
  for (const b of blocks) {
    const rows = [];
    let k = 0;
    for (const r of b.rows) {
      if (!hasWords(r.en)) continue;
      k++;
      if (fresh(r.en)) rows.push(`| ${r.starts === 'para' ? '¶' : ''}${k}${r.star ? ' ★' : ''} | ${cell(r.en)} | ${cell(r.cs)} |`);
    }
    if (rows.length) section(b.title, b.when ? [`**Kdy:** ${b.when.cs}`, `**When:** ${b.when.en}`] : null, [...tableHead, ...rows]);
  }
  const qs = questions.map((q, i) => ({ ...q, k: i + 1 })).filter(q => fresh(q.en));
  if (qs.length) section('Otázky u bran · The questions at the gates',
    ['**Kdy:** když fáze dojde ke své bráně, workflow položí člověku otázky, na které žádná automatická kontrola odpovědět',
     'nedokáže. Odpovídá se y, n nebo ?, takže každá zůstává prostou otázkou s odpovědí ano, nebo ne.',
     '**When:** when a stage reaches its gate, the workflow puts to the person the questions no automated check can',
     'answer. Each is answered y, n or ?, so each stays a plain yes-or-no question.'],
    [...tableHead, ...qs.map(q => `| ${q.k} ★ | ${cell(q.en)} | ${cell(q.cs)} |`)]);
  const pairs = new Set();
  const words = extra.filter(r => hasWords(r.en) && fresh(r.en) && !pairs.has(`${r.en}\u0000${r.cs}`) && pairs.add(`${r.en}\u0000${r.cs}`));
  if (words.length) section('Slova vytištěných zpráv · The words the printed messages are filled with',
    ['**Kdy:** ve zprávách, které workflow vytiskne: název, účel a práce každé fáze, pole, na která se úloha ptá, názvy dokumentů',
     'a slova, která zpráva skloňuje podle počtu.',
     '**When:** in the messages the workflow prints: each stage\'s name, purpose and work, the boxes a task opens, the documents\'',
     'names and the words a message inflects by count.'],
    [...tableHead, ...words.map(r => `| ${cell(r.at)} | ${cell(r.en)} | ${cell(r.cs)} |`)]);
  for (const c of cards) {
    const body = [];
    for (const g of c.groups) {
      const rows = g.rows.filter(r => fresh(r.en.touchpoint) || fresh(r.en.means));
      if (!rows.length) continue;
      body.push(`**${g.cs} · ${g.en}**`, '', ...tableHead);
      for (const r of rows) body.push(`| ${r.id} | ${cell(r.en.touchpoint)} | ${cell(r.cs.touchpoint)} |`, `| ↳ | ${cell(r.en.means)} | ${cell(r.cs.means)} |`);
      body.push('');
    }
    if (body.length) {
      body.pop();
      section(`Body compliance: ${c.name_cs} · Compliance touchpoints: ${c.name}`,
        [`**Kdy:** ve fázi 4, v oddílu compliance u každého řešení v běhu vedeném česky. Workflow přebírá bod compliance a jeho význam doslova z karty oblasti (\`${c.body}\`, oddíl 13).`,
         `**When:** at stage 4, in each solution's compliance section of a Czech run. The workflow copies the touchpoint and what it means word for word from the area card (\`${c.body}\`, section 13).`],
        body);
    }
  }
  return L.join('\n') + '\n';
}

export async function cardTouchpoints() {
  const { areas, touchpoints, czechTouchpoints } = await import('./derive.mjs');
  return areas().map(a => {
    const en = touchpoints(a.body, 'en'), cs = czechTouchpoints(a.body);
    const groups = [];
    for (const [id, e] of en) {
      const c = cs.get(id) || { touchpoint: '', means: '', group: '' };
      let g = groups[groups.length - 1];
      if (!g || g.en !== e.group) groups.push(g = { en: e.group, cs: c.group, rows: [] });
      g.rows.push({ id, en: { touchpoint: e.touchpoint, means: e.means }, cs: { touchpoint: c.touchpoint, means: c.means } });
    }
    return { name: a.name, name_cs: a.name_cs, body: a.body, groups };
  });
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  const argv = process.argv.slice(2);
  if (argv[0] === '--review') {
    const [last, out] = argv.slice(1);
    if (!last || !out || !existsSync(last)) {
      console.log('usage: node .github/scripts/fixed-messages.mjs --review {the last review document} {the new one to write}');
      process.exit(2);
    }
    cardTouchpoints().then(cards => {
      const doc = reviewDocument(readFileSync(last, 'utf8'), { cards });
      writeFileSync(out, doc);
      console.log(`wrote ${out}: ${(doc.match(/^\| (?!#)/gm) || []).length} row(s) whose English ${last} does not hold`);
    }).catch(e => {
      console.log(`not written: ${String((e && e.message) || e).split('\n')[0]}`);
      process.exit(1);
    });
  } else if (argv[0] === '--write') {
    const errors = [];
    for (const f of [...new Set([...files(), ...MARKED_FILES])].filter(x => existsSync(x) || files().includes(x))) {
      if (!existsSync(f)) { errors.push(`${f} is not on disk`); continue; }
      const text = readFileSync(f, 'utf8');
      const w = written(f, text);
      errors.push(...w.errors);
      if (w.text !== text) { writeFileSync(f, w.text); console.log(`wrote ${f}`); }
    }
    for (const e of errors) console.log(`not written: ${e}`);
    console.log(`${BLOCKS.length} block(s) in ${files().length} file(s)${errors.length ? `, ${errors.length} not written` : ''}.`);
    process.exit(errors.length ? 1 : 0);
  } else if (argv.length) {
    console.log(`Unknown argument(s): ${argv.join(' ')}. This script takes --write, --review {last} {out}, or nothing.`);
    process.exit(2);
  } else {
    const d = drift();
    for (const x of d) console.log(x);
    console.log(d.length ? `\n${d.length} Czech block(s) differ from the table.` : `Every Czech block is what the table gives: ${BLOCKS.length} block(s) in ${files().length} file(s).`);
    process.exit(d.length ? 1 : 0);
  }
}
