# Setting up SPOCK on your computer

**9 October 2026** · **Release:** 1.16.1

**SPOCK is a discovery workflow that runs inside VS Code with GitHub Copilot.** You talk to its agents in the Copilot
chat, they write the documents, and you decide at each stage. Everything runs on your own computer, in this folder.

**Setup takes about fifteen minutes and is done once per computer.** After that, starting a run is one message.

**Already set up with an earlier version? Do not install anything again.** Update as step 8 says, and then:

1. **Close the Copilot chats you had open, and reload VS Code** (Command Palette › `Developer: Reload Window`). A chat
   opened before the update keeps working from the old instructions.
2. **Run SPOCK: check my setup** (step 4), and see that the six agents it names are listed (step 5).
3. **Start your next run as before** (step 6), on the model step 6 names.

---

## 1. What you need installed

| What | Why | Where to get it |
|---|---|---|
| **VS Code**, a current version | The workflow runs inside it | [code.visualstudio.com](https://code.visualstudio.com/) |
| **GitHub Copilot and GitHub Copilot Chat**, signed in with your Česká spořitelna GitHub account | The agents are Copilot agents | [GitHub Copilot in the VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot); VS Code asks you to sign in |
| **Node.js 20 or 22** | Every step the workflow runs is a small Node script. Nothing else is installed | [nodejs.org](https://nodejs.org/en/download): choose version 22, an LTS version |
| **Git** | To get this folder and to update it later | [git-scm.com](https://git-scm.com/downloads) |

You check all of it at once in step 4.

## 2. Get the workflow

**Clone it, so that updating later is one step.** In VS Code, open the Command Palette (**View › Command Palette**),
type **Git: Clone**, paste the address of the SPOCK repository you were given, choose where to keep the folder, and
pick **Open** when VS Code asks.

Downloading the ZIP from the repository page also works. Updating is then a new download rather than one step (see
step 8).

## 3. Open it in VS Code

1. **File › Open Folder**, and choose the folder that directly contains `.github` and `.vscode`, not a folder above
   it. The workflow finds its agents, tasks and settings only from there.
2. **When VS Code asks whether you trust the authors of the files in this folder, choose to trust them.** In
   restricted mode VS Code does not run tasks, and the workflow cannot move without them.

**The workflow keeps no record of your Copilot sessions.** Copilot can write a local trace, but VS Code takes its
trace settings (`github.copilot.chat.otel.*`) only from your own user settings, so nothing in this folder switches
one on. Where one is on, as on the pilot team's computer for its own measurement, it holds the names of the tools the
agent used, the paths of the files it touched, the models, the token counts and the repository's address and branch,
and no text of your prompts or documents (Copilot Chat 0.66). It stays on that computer, and git ignores
`.copilot-traces/`. `"github.copilot.chat.otel.enabled": false` in your user settings switches it off.

## 4. Check your setup

**Run the task SPOCK: check my setup** (Terminal › Run Task…). Pick **GitHub Copilot** when it asks which tool you
use. It says, line by line, what is in place and what to do about anything missing. Run it again until its last line
says everything is in place.

The workflow refuses to start a run until it knows which tool you use, and the record of each run carries what you
picked here. If the list of tasks holds no task starting with `SPOCK:`, VS Code has another folder open or is in
restricted mode: go back to step 3.

## 5. Check that the agents are there

**The check in step 4 names the six agents; open the agent picker and see that they are listed.**

- **Any missing:** your Copilot setup may not allow custom agents or agent mode. Stop and report it, with a
  screenshot of the picker.
- **Extra ones listed:** VS Code also picks up agent files from other places on your computer. Report the names you
  see before you start a run.

---

## 6. Your first run

**Before the first message, choose the model in the model picker on the chat box: Claude Sonnet 5, with effort
High and the 1M token context.** The agents cannot see which model is chosen, so nothing checks it for you.

**Choose a topic you know.** The agents prepare the work, and you make every decision, in your own name.

1. **In the Copilot chat, choose the Product Manager agent and send: `Start a discovery run.`**
2. **Start the run, then answer its questions.** It names the task `SPOCK: start a run`, where you type the run's
   name (the year, the month and a short name, in lower case), your name and your role; the task creates the run's
   folder under `runs/`.
3. **You type no commands.** When the workflow needs you to record something, such as an approval, a choice or a
   signature, the agent tells you **the task's name and each box to fill in**. Run it yourself from the Command
   Palette (**Terminal › Run Task…**, or `Tasks: Run Task`) and type into the boxes that appear at the top of the
   window. For a few boxes the agent tells you exactly what to type, such as a stage number; **a box for your name,
   role, reason or decision is filled by you alone.** **An agent never runs these for you**; if one tries, tell it
   to stop. **A task's full words are in VS Code's Terminal panel and in `.github/last-task.md`.** Where VS Code
   says a task *failed*, those words say why, and the agent tells you what they mean and what to do next.
4. **Keep VS Code's default approvals for at least your first two runs, and do not choose to allow everything.**
   VS Code asks before an agent does some things, such as running one of the workflow's tasks or opening a file
   outside this folder. Allow the workflow's own `SPOCK:` tasks that open no boxes, which an agent may run;
   [`specifications/onboarding/TASKS.md`](./specifications/onboarding/TASKS.md) says for each task whether it opens
   boxes. **A task that opens boxes for you to fill in is yours to run**, so say no if an agent tries to start one.
   **At stage 3 VS Code also asks before the agent opens a web page.** With a list, allow the addresses in it, and
   refuse and write down any other address it asks for. Testing search, allow its searches and the pages it asks
   for. Say no to anything else outside this folder. If VS Code offers no "Allow All", or turns it off, a Česká
   spořitelna policy is the likely cause; you do not need it.
5. **What you supply along the way:**
   - **Stage 2, your problem material** (research notes, tickets, interview notes), as files in the run's
     `2-problems/supplied/` folder. The agent then reads them in with `SPOCK: read in the problem material`, and
     converts Word, PowerPoint, Excel and PDF files first; put them in as they are. A Tableau dashboard exported
     to PowerPoint is read like any `.pptx`: its text and speaker notes, not its charts, which the export saves as
     pictures. A PDF is read page by page. A scanned or copy-protected PDF cannot be read: open it in Word, save
     it as a Word document, and put that in the folder instead. An older `.doc`, `.ppt` or `.xls` is not read:
     save it in the current format first.
     Material that turns up later goes in the same folder. You can also edit a file or put in its new version; to
     retire a file, move it into the run's `superseded/` folder. The agent tells you what changed and you take it in
     with `SPOCK: add problem material`, which asks you to confirm.
     To add a problem in your own words, run
     `SPOCK: add a problem in my own words` yourself. **Both work only after the material has been read in, and
     then only before stage 2 starts, while it is being written, or after its check has failed.** Before the
     material is read in there is nothing to add to, and at any other point they refuse. Once stage 2 has been
     put in front of you, new material would change what you are deciding on: send stage 2 back first with
     `SPOCK: send a stage back to be redone`, then add the material, and stage 2 is written again with it.
     A longer text or an export you pasted in the chat goes in with `SPOCK: take in what I pasted in the chat`,
     which you run yourself with what you pasted still copied, and which asks your name: it saves exactly that in
     `2-problems/supplied/` as yours. Before the material is read in, the read-in takes it with the rest; once
     stage 2 has been put in front of you, it refuses as the other two do.
   - **Stage 3, your market list, or none.** When stage 3 opens with that folder empty, the agent explains two ways of
     working and waits for you to tell it to begin; with your list already there, it names the list and asks you to
     run `SPOCK: what market material has been supplied`, which takes it in. One folder decides which, the run's
     `3-competitive-analysis/supplied/`:
     **Either way, it researches every competitor in your market itself. It no longer reuses a profile from an
     earlier run, because a profile written for an earlier run answers that run's question rather than yours,
     so this stage takes longer than it did and its summary covers the whole market you gave it.**
     - **A list in that folder, as one file.** The agent is instructed to research only the addresses on your
       list, open them, and search for nothing. Its opening message, with the folder still empty, says what goes in
       the file. **Use this
       way unless you are testing the other**, because it needs nothing more installed. If you are testing with the
       scenarios pack, its `MARKET-SCAN-PROMPT.md` helps you find the competitors; what goes in the file is what the
       opening message says. Unzip the pack outside this folder, so that no agent reads it. **Open every address in
       the file before you hand it over, and remove any that does not open.**
     - **The folder left empty.** The agent searches the market itself. **That needs two things this setup does
       not install:** VS Code's web search extension (`ms-vscode.vscode-websearchforcopilot`), and a key for its
       search service, which the extension asks for the first time it searches. Without them the agent cannot
       search: it is instructed to say so on the market map and to ask you for addresses.
6. **Everything the run produces stays in `runs/<run name>/`, on your computer.** Runs are excluded from git, so git
   never uploads them. They can hold client material: do not copy them anywhere shared; step 10 names the one person a
   run is sent to.
7. **What an agent reads is sent to GitHub Copilot to process, as in any Copilot chat.** That includes the material
   you supply and the web pages it opens. **At stage 3, what else leaves your computer depends on the way it works:**
   - **With a market list**, the agent is instructed to open the web addresses in your list and to search for
     nothing. Where the web search extension is installed the agent can still search, so this is what it is
     instructed to do, not a guarantee.
   - **With the folder empty**, the agent sends web searches through the web search extension, which passes them
     to Tavily, or to Bing where the extension is set to, and it opens the pages the searches find. Its
     instructions say every search names only the market, the product category and public competitors, never
     wording from your brief or your material. While it maps the market, it is also instructed to write down each
     search word for word in the run's folder. While it writes the card for each competitor it may search again,
     and its instructions there ask for at least five searches per competitor; those searches are not written
     down. None of this is a guarantee: no automated check reads what a search contains or whether it was written
     down.
8. **Never attach a file in the chat.** A file attached there stays in the chat's history and is sent again with
   every later message, so every turn after it costs more, and a PDF can make later turns fail with *Could not
   process PDF*. Material goes in the stage's `supplied/` folder, as step 5 says; a PDF goes in as it is, as a PDF,
   and the workflow reads it. **The one file you attach is your brief, at stage 1**, in stage 1's chat: the agent
   that writes the brief reads what is attached there. If any other file was attached, open a new chat, pick the
   same agent in the agent picker on the chat box, and say: continue the run {the run's name}. The run is kept on
   disk, so nothing is lost. **A
   message sent after five minutes or more away costs far more than one sent at once**, even a one-line answer: in
   one tester's run the median was about 100 credits against 11. The likely reason is that after a pause the whole
   conversation is processed again at full price. Expect it, and do not report it as a fault.

**If you are stuck, ask the Workflow Support agent**: it looks at where the run is and tells you what to do next.
**If you have a question about the method itself, ask the Methodology Coach.**

---

## 7. Starting again

- **After a finished run, start the next one the same way:** open a new chat, choose the Product Manager and send
  `Start a discovery run.` A finished run stays in `runs/`, and the new run's tasks act on the new run. To send a stage
  of a finished run back, withdraw a sign-off on it, record its Jira key or keep its competitors while no run is
  unfinished, keep only that run in `runs/`: with several finished runs there, those tasks name them and wait for you
  to move the others out.
- **To start over before a run is finished, move its folder out first.** Close its chats, then move
  `runs/<run name>/` out of this folder, to a place on your computer that is not shared. While two runs are
  unfinished, every task that acts on a run refuses, because it cannot tell which run you mean.
- **Keep a run you are reporting on** until your findings are sent. It is the record of what happened.

## 8. When a new version arrives

**Finish a run on the version it started on.** Then close your Copilot chats and run the task
**SPOCK: update this copy to the latest release**. It asks one thing: pick **update**.

It keeps your runs, your setting in `.github/surface` and where your runs are kept, and prints the version before
and after. If it says files of the workflow were changed on this computer, run it again and pick the second choice:
it keeps a copy of those files in your runs folder and puts the release's back. While a run is unfinished, the copy
stays on its version: the task says so and changes nothing, and its second choice only puts back that version's files.

When it has finished, reload VS Code: Command Palette › `Developer: Reload Window`.

- **Downloaded as a ZIP:** a ZIP cannot update a folder. Unzip the new version into a new folder and do steps 3 to 5
  in it, which includes picking your tool again in step 4. Keep the old folder for the runs you made there.
- **On 1.8 or earlier** the task is not there yet. Update once with `git pull`, or Source Control › Pull, as before;
  from then on use the task.

## 9. What not to change

- **Do not edit anything under `.github/` or `.vscode/`.** Those files are the workflow; a change there changes what
  every agent does. The one setting there, the tool you use, is set by the check in step 4.
- **Do not add your runs to git or push them.** To hand a run to a colleague, copy its folder: the tester guide,
  section 3.4, says how.
- Now and then the workflow stops a step an agent tries, such as starting a task that is yours to run. VS Code then
  shows a note in the chat beginning "A hook prevented chat from continuing", and the agent goes on to tell you what
  to do instead. The note is not an error. The workflow may also send an agent back to finish its message, which
  needs nothing from you.

## 10. Reporting what you find

**Say which version you were on** (the release named at the top of this page), **which stage and agent**, **what
you did**, and **what you expected to happen instead**. A screenshot of the chat helps. **Write it yourself, in your
own document outside this folder, and send it to Igor Tadić alone, with the run's whole folder, `runs/<run name>/`,
zipped, and each stage's chat exported as its own file.** For each stage, open the chat its agent worked in from the
chat history, then run **Chat: Export Chat...** from the Command Palette and save the file. Never send a screenshot
instead of the file; section 9 of the tester guide says more. Do not ask an agent to write it. The detailed testing protocol is in
[`specifications/onboarding/TESTER-GUIDE.md`](./specifications/onboarding/TESTER-GUIDE.md).
