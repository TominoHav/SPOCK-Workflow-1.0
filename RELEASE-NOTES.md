# SPOCK Workflow 1.16.1: what is new

**This page covers releases 1.2 to 1.16.1.** Each release holds everything in the one before it, so read back as
far as the version you were on. How to set up and how to test are still in [`SETUP.md`](./SETUP.md) and the
[tester guide](./specifications/onboarding/TESTER-GUIDE.md).

## New in 1.16.1

### Documents updated in this release

These changed since `spock-workflow-1.16`.

- [Setting up SPOCK on your computer](./SETUP.md)
- [Pilot Workflow — Business Logic Specification](./specifications/PILOT-BUSINESS-LOGIC.md)
- [Brief Fields](./specifications/definitions/know-how/product/brief-fields.md)
- [Initiative Template](./specifications/definitions/know-how/product/initiative-template.md)
- [PRD Template](./specifications/definitions/know-how/product/prd-template.md)
- [Agent Interaction](./specifications/definitions/know-how/writing/agent-interaction.md)
- [The tasks, and what each one does](./specifications/onboarding/TASKS.md)
- [Testing the discovery workflow](./specifications/onboarding/TESTER-GUIDE.md)

### Getting 1.16.1

- **On 1.9 to 1.16, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.

### Saving documents

- **On a run started on 1.16.1, VS Code no longer stops the agent's corrections** with *"Failed to save '…': The
  content of the file is newer"*. Nothing the workflow runs writes into a document while the agent is working on it:
  the checks read the document as the agent left it, and what depends on its content, its status included, is written
  into it when you approve.

### Starting

- **The brief is there from the start.** `SPOCK: start a run` writes the brief as an empty template, at
  `1-brief/initiative-brief.md` in the run's folder, and the agent fills it in.
- **The agent no longer asks for your name and role.** The run holds them from the moment you started it, and the
  agent writing the brief takes them from there. It asks only where the run holds none.

### Approving

- **A review request is no longer sent back for its formatting.** Where the agent writes a line the task printed as a
  link, without its full stop, or joined to the next line in one sentence, the line counts as sent. So the request
  reaches you once, without the same lines repeated underneath it.
- **A message the workflow sends back comes again whole.** When the workflow sends the agent's message back, for
  example a review request that left out a line it must carry, VS Code folds that message away into the turn's steps.
  The agent now sends the whole message again, complete, never only the lines that were missing.

## New in 1.16

### Getting 1.16

- **On 1.9 to 1.15, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.

### If VS Code says a file could not be saved

- **VS Code may refuse to save an agent's correction to a document.** It shows *"Failed to save '…': The content of
  the file is newer"*, with **Compare** and **Overwrite**. This happens when the agent corrects a document in the
  same turn as a task that changed that document, typically after a check sent it back: the task updates the file,
  and VS Code still holds the agent's older copy. We met it on VS Code 1.141 on 9 October; a public VS Code report
  shows it on earlier versions too, so it can happen on 1.140. It is a VS Code behaviour, not a step of the workflow.
- **Click Overwrite, then tell the agent.** Write in the chat: *"VS Code showed Failed to save, so your corrections
  were not saved. I clicked Overwrite. Check it again."* The agent reads the file again and reruns the checks, and the
  stage carries on. Do not leave the message unanswered: until the file is saved, the agent keeps checking an old
  copy, gets the same failure each time, and spends credits doing it.
- **This still applies to a run started before 1.16.1**, which keeps working the old way to its end: to get the
  fix, start a new run.

### Documents

- **A document the agent writes opens as finished text.** VS Code keeps the agent's changes three seconds after its
  turn ends, so a file it wrote no longer waits for you to press Keep or Undo. The setting is in this folder's own
  VS Code settings.

### After you run a task

- **The agent first tells you what the task said.** When you have run a task and write anything in the chat, the
  agent is handed what the task printed before anything else, and is told to tell you that first and only then read
  the run's record. Where the task refused what you typed, that is what it tells you, with the task's reason.
- **A message the task printed for you reaches you as printed.** Where the task printed a message to send you, such
  as what comes next and who carries the next stage, the agent is told to send it as it stands, and a turn that
  leaves it out is sent back to send it word for word.

### Starting

- **Stage 1 with no run asks you to start one.** Where no run is open, stage 1's opening says what it needs from you:
  start the run with `SPOCK: start a run`, from the command palette under `Tasks: Run Task`. It asks for the run's
  name, as in `2026-10-card-freeze`, then your name and the role you decide in. The agent never runs it.
- **Your brief is the one file you attach.** At stage 1, in stage 1's chat, attach your brief: the agent that writes
  the brief reads what is attached there. Any other material still goes in the stage's `supplied/` folder, and
  `SETUP.md` says what to do if another file was attached.

### Approving

- **The ask for a review only asks whether you approve.** When a document is finished, the agent tells you about it
  and asks you to read it and say what you think. The task to run, the boxes it opens and the gate's questions come
  once you have said you approve, in one message, with the questions under the boxes. At stage 4 the approval's
  steps and questions come after the task that records your choice.
- **The changes you asked for are listed in both cases.** Where you asked for changes during a stage, before the
  document was written or by sending it back after reading it, the agent is told to list each one, in your words,
  with the ask for your review.

### Agents

- **When the workflow stops an agent writing a file, it gives the real reason.** A file in the wrong place for the
  stage in flight, one belonging to a stage not in flight, one naming another run in its front matter, a document
  that has lost its id, and a record named the wrong way each get a reason of their own and what to do, where before
  they all got the same general one.

### Stage 1

- **A field you could not give carries only what you said.** Where the brief records something as not known or
  declined, that is a claim about what you said: the gap records that you were asked, and its note holds nothing else
  unless it quotes your own words. The check that reads it now names that fix.

### Stage 2

- **Opportunities are numbered O1, O2 and on**, never with a hypothesis's number, and each opportunity's heading
  names the hypothesis it comes from, as in `O3: <its name> (from H3)`, or `(yours)` for one you brought. On a run
  started on 1.16 the stage 2 check holds both, and the documents the workflow writes from the record, such as the
  solution set's table and the selected solution, show an opportunity as `O1 (H1)`, as the agent is told to write
  it in the prioritised list.
- **An opportunity you cannot rank is placed by its evidence.** Where you rank the others and cannot tell for one,
  the agent places it among the ranked on the weight of its evidence, as the ranking question said it would. It
  parks one only for a reason of its own, which the document gives.

### Stage 3

- **Every source on a competitor card is a page the agent opened.** The agent is told to open the page behind each
  source it cites and record that page's address: a search result is not a source. On a run started on 1.16, the
  stage 3 check refuses a source whose address is a site's front page, and, on a searched market, a source with no
  address.

### Stage 5

- **An MVP option keeps who the solution is for, now with a second example.** For a solution that lets an applicant
  save an unfinished application and come back to it, resuming by a link sent to the applicant, or only for
  applications started on the web, is an option. Having contact-centre staff call applicants back instead, with
  nothing built that the applicant sees, is not: staff act in the applicant's place, so it is a solution of its own
  at stage 4.

### Stage 7

- **An initiative with no Jira key yet is titled by its name alone**, with no brackets and no dash; one with a key
  keeps `[KEY] - <name>`. On a run started on 1.16, the stage 7 check holds the title to it.
- **`SPOCK: record the Jira key` suggests the corrected form.** A key typed without its hyphen, as `SPOCK223` or
  `SPOCK 223`, is still refused and records nothing, and the task now asks whether you meant `SPOCK-223`. An answer
  that means there is no key, such as `none` or `not yet`, is offered `none yet`. Run the task again and type it.

## New in 1.15

### Getting 1.15

- **On 1.9 to 1.14, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.
- **Coming from 1.11, this update brings 1.12, 1.13 and 1.14 as well.** Their sections below are new to you too.

### Stage 3

- **Where your market list is already in the run's folder, stage 3 opens with it.** When the stage opens with a file
  in the run's `3-competitive-analysis/supplied/` folder, the agent names each file there and says it researches every
  competitor on that list, only at the addresses it gives, and searches for nothing else. It then asks you to run
  `SPOCK: what market material has been supplied` yourself, which opens one box: choose `yes` to take your list in.
  The agent never runs that task. Once it has run, tell the agent, and it starts from your list.
- **Only with that folder empty does the opening set out the two ways of working**, your own list or a search of the
  market, and say what goes in a list. It then waits for your word to begin, as before.

### Stage 5

- **Every MVP option keeps who the chosen solution is for.** The agent is told that an option may narrow the
  channel, the client group or the scope, and never who sees the solution, uses it or decides with it. For a warning
  shown to a client at the moment they pay, the same warning in the app only, or only for clients over 60, is an
  option. The same warning shown to call-centre and branch staff instead, for them to pass on, is not, because the
  client no longer sees it.
- **A pilot for other people is a solution of its own.** A way to pilot that hands the chosen solution to someone
  else belongs at stage 4, as a solution in its own right, and not among the options.

## New in 1.14

### Getting 1.14

- **On 1.9 to 1.13, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.

### Starting a run

- **The run's name is yours to type.** The Product Manager has you start the run with `SPOCK: start a run`, which
  asks for the run's name (the year, the month and a short name, in lower case, as in `2026-10-card-freeze`), your
  name and your role, and creates the run's folder. The agent is told never to name or rename the run itself.
- **The agent picker says what each agent does, in the documents' own names.** Each agent's description names the
  documents it works from and writes, such as the brief, the solution set and the agreed PRD, and the Product
  Manager's and the Business Analyst's name every stage they carry.

### Approving

- **An approval with a mistyped role records nothing.** Where the role you type in
  `SPOCK: approve what is in front of me` is one or two letters away from a role the run already records, the task
  stops before anything is recorded, not your name and not your role, and names the role as the run spells it. Type
  it that way if it is the same role; if it really is a different one, name it so it does not read as a slip.

### Agents

- **An agent that tries a step that is not its own is stopped at that moment.** Starting a task that opens a box for
  you is one: the task does not start, VS Code shows a note in the chat beginning "A hook prevented chat from
  continuing", and the agent goes on to tell you what to do instead, such as which task to run and what its boxes
  ask. The note is not an error. This is the guard the 1.11 notes said would be switched on.

### Dates

- **The agents write dates as the workflow prints them.** They are told to write a date in a document's text or in
  a table day first, in Czech and English runs alike. A field whose value is a date, such as the initiative's
  `created` and `updated`, keeps the form `2026-10-01`, because the workflow reads it.
- **The box that replaces a decision takes the date as the run shows it.** In
  `SPOCK: replace a decision that no longer stands`, type the date of the decision it replaces as the front page
  shows it, as in `24. 9. 2026`. Where a date matches no decision, the dates it lists are written the same way.
- **When `SPOCK: record a body this stage could not read` refuses know-how the stage has to read, it gives its dates
  day first**, as every other date the workflow shows you.

### Stage 3

- **When no web address will open, the agent stops and says what to try.** Where every address fails, the ones you
  supplied and the ones given in the chat, the agent is told to stop and say so in place of the tool's error, then
  suggest two things: connect the computer to another network, for example one outside the bank's network, and tell
  it to begin again; or ask ČS IT whether the bank's network or the computer stops VS Code from opening web pages.
- **Stage 3 researches every competitor it selects, even one the shared store holds a recent profile for.** The
  stored profile is kept beside the new one and never stands in for it, as since 1.7.

### Stage 5

- **While stage 5 waits on your choice, the message says that only the option you choose goes forward.** The agent
  expands that one, the PRD at the next stage is written from it, and the other options stop there.

### Stage 7

- **On a run started on 1.14, the stage 7 gate reads more.** It reads the initiative's reading copy as well as the
  initiative for words that call the run a fixture or a test, in Czech as in English. And it refuses, in either, a
  requirement numbered as the PRD numbers them, such as R1, which a reader at the bank cannot follow.

### Czech runs

- **The headings under *Jak to vzniklo* may name a gate or a stage**, as those under *How this was produced* may in an
  English run. The gate used to refuse them.

## New in 1.13

### Getting 1.13

- **On 1.9 to 1.12, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.

### Dates

- **The dates the workflow shows you are written day first, as in 1. 10. 2026**, in Czech and English runs alike,
  with the time after it where one is shown, as in 1. 10. 2026 21:25: on the run's front page, in what a task says it
  recorded, in the update task's lines and in `SPOCK: how the workflow performed`. Dates the workflow keeps for
  itself, in the run record and in a document's front matter, stay in the form `2026-10-01`, and a check that quotes
  one quotes it as it is kept.

### Approving

- **The request to review quotes what you are asked to judge.** Where a document opens with its lines on what you
  judge and where to find it, the request quotes them under *As it opens:*, after the document's finding.
- **Asking again for a sign-off that already stands records nothing, and the task succeeds.**
  `SPOCK: sign off a check this run cannot meet` says which sign-off stands and that nothing more is needed. To change
  it instead, replace it with `SPOCK: replace a decision that no longer stands`. Where only some of the checks you
  named are covered, nothing is recorded, and the task says to sign the others on their own or to replace the
  sign-off that stands.

### Stage 4

- **A solution's compliance touchpoints include the ones it could not settle yet.** The agent is told to list every
  touchpoint it answered yes and every one it could not settle, never one it answered no. Stage 5 then writes each
  unsettled one into the MVP, or leaves it out with a reason.

### Sending us your run

- **Each stage's chat goes as an exported file.** For each stage, open the chat its agent worked in from the chat
  history, run **Chat: Export Chat...** from the Command Palette and save the file, one file per chat. A chat you
  opened on the side is not a stage's chat. Send the files with the run's whole folder zipped, and never a screenshot
  in place of a file: a screenshot shows part of a chat, the file holds all of it. The tester guide's new section 9
  gives the steps, and SETUP says the same in short. This replaces the chat session files they asked for before.

## New in 1.12

### Getting 1.12

- **On 1.9, 1.10 or 1.11, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.

### The messages you get

- **The workflow's messages are the same words in every run.** A stage's opening, the request to review, the request
  for your signature, the message while a stage waits on you, the hand-off once a stage is accepted and the run's
  last message are printed by the task, and the agent sends each as printed, in the run's language. The opening also
  says that the agent runs the automated checks itself: you do nothing for them.
- **The request to review says what to judge.** It names the finished document and where it is, quotes its finding,
  says what it rests on and what could not be established, and lists the approval's questions with the items they
  ask about.
- **The run's last message names the initiative's reading copy**, to share outside the workflow, and says why the
  Jira step waits, where it does.
- **When a task refuses what you typed, it says nothing was recorded, and why**, instead of saying a script stopped.

### Your documents

- **The documents you approve open the same way.** From stage 2 on, apart from the market stage and the initiative,
  a document opens under its title with what it carries from the stages before, any change you recorded since the
  brief, and two to four lines on what you are asked to judge and where. Its finding follows, in a few sentences.
- **When a stage waits on your approval, the task output opens with the same facts**, such as the segment and
  channels from the brief and the solution and option you chose, so you can check the documents against them.
- **The workflow lays out each document before the agent writes it.** The places still to fill read `[[fill: …]]`,
  and a document still holding one is not counted as written.
- **Stage 4's solution set opens with a table**: for each solution, the opportunities it addresses, its compliance
  touchpoints and the areas in play. Asked for one base solution with variants, the agent explains that variants are
  what stage 5 builds, and writes solutions that each address a different combination of opportunities.
- **Stage 5 sets apart the ways to pilot that do not fit the brief's time horizon**, under *Later, beyond the brief's
  horizon*, after *How to choose between them*, so you choose among options you can pilot.
- **The market stage has room for a long search.** Its research may run for up to 90 minutes.

### Tasks

- **At stages 4 and 5, you record your choice with `SPOCK: record a decision I made`, then approve with
  `SPOCK: approve what is in front of me`.** The task `SPOCK: approve and record which one I chose` is gone.
- **Two tasks open no box any more, and the agent runs them.** `SPOCK: record a body this stage could not read`
  records know-how that arrived the day the stage ran; `SPOCK: record what I had to read` records a document the agent
  had to read that its stage does not name. Know-how that was there before the stage began is not recorded: the stage
  has to read it, and the task names `SPOCK: send a stage back to be redone`, which is yours to run or not.

### The run's front page

- **A check you signed off says where it stands now**: it still fails, it passes now and its sign-off covers nothing,
  or the checker could not read the run. A sign-off the workflow narrowed says when, and which checks pass.
- **A gap in know-how that a check refuses is shown as refused**, with the reason.
- **A document changed after its stage was accepted is named**, here and by `SPOCK: check the whole run`. To keep the
  change, send the stage back with `SPOCK: send a stage back to be redone` and record it with
  `SPOCK: record that I edited a document`; otherwise undo it. It does not stop the run.

## New in 1.11

### Getting 1.11

- **On 1.9 or 1.10, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code and run
  `SPOCK: check my setup`.
- **Still on 1.8, pull once by hand**, as the 1.10 section below says, including its step for the competitor store.
  From then on, use the task.

### Setting up

- **Setting up needs no Git commands.** You get the folder from inside VS Code: open the Command Palette, type
  **Git: Clone**, paste the address you were given, choose where to keep the folder, and pick **Open**. Downloading
  the ZIP also works, but then each update is a new download into a new folder.
- **`SPOCK: check my setup` checks everything at once.** It asks which tool you use: pick **GitHub Copilot**. Then it
  says, one line each, what is in place: Node.js, your tool, which release this copy is and how it updates, the
  agents that must be listed in the chat's agent picker, the model to pick, and where your runs are kept. Its last
  line says everything is in place, or lists what to do. Run it again until it says everything is in place.

### Your material

- **A PDF is read as it is.** Put it in the stage's `supplied/` folder as a PDF. The convert task writes its text
  beside it, one section per page, and the agent cites the PDF like any other file. A scanned or protected PDF, or one
  that cannot be read, is reported with what to do: open it in Word, save it as a Word document, and put that in the
  folder instead.
- **More files are read, and Office files are read as they are laid out.** Teams and Zoom transcripts (`.vtt`,
  `.srt`) are read as they are, and the macro-enabled Word, PowerPoint and Excel files (`.docm`, `.pptm`, `.xlsm`)
  convert like the others; their macros are never read or run. Slides are read in the deck's own order with their
  speaker notes, each Excel cell stays under its own column and a date reads as a date, and a Word table reads one row
  per line.
- **Never attach a file in the chat.** An attached file is sent again with every later message, and a PDF can make
  later turns fail. If you attached one, open a new chat, pick the same agent, and say: continue the run, with its
  name. The run is on disk, so nothing is lost.
- **Changing your material after it was read in takes one task.** Add, change or remove a file, or move an old one
  into the run's `superseded/` folder, and the agent lists what changed, file by file: new, changed, moved to
  superseded, removed. It then asks you to run `SPOCK: add problem material`. Its one box asks whether to take in what
  the agent listed: **yes** records every change at once, **no** records nothing. The agent then redoes what rested on
  a file that was replaced or removed. A changed market list at stage 3 works the same way, with
  `SPOCK: what market material has been supplied`.
- **Files that arrive without dates are dated by you.** Anonymised material often carries no date. The read-in lists
  each such file, with the year it names where it names one, and nothing from those files counts as dated until you
  confirm the period each comes from with `SPOCK: date the material that arrived without dates`. Its first box holds
  `as listed`, which takes the periods as they stand; correct or complete a file after a semicolon, as in
  `as listed; tickets.csv: 2026-Q2`. A period is a year, a quarter or a month. A file you leave without one stays
  undated. The second box is your name.
- **A competitor benchmark in your stage 2 material is explained.** The agent says what the file looks like, that
  stage 3 does not read reports, and what stage 3 does take: one list of competitors and trends, with addresses. Keep
  the file as problem material or take it out of the folder; either way, the competitors and addresses in it can go
  into your stage 3 list.

### Stage 2

- **The approval shows what each hypothesis rests on.** When stage 2 waits on you, the task lists each hypothesis with
  how many observations support it, from how many origins, and how many of them are first-hand.
- **When the evidence contradicts an earlier stage 2 document, the agent tells you.** It says what the document says
  and what the observations show, and stage 2 waits on your decision: have the document corrected, or keep it with
  your reason by signing the check off with `SPOCK: sign off a check this run cannot meet`. The approval lists each
  contradiction and how it was settled.

### Approving

- **You answer a gate's questions in the approval itself.** `SPOCK: approve what is in front of me` asks for your
  name, your role, and in its third box your answers to the questions the agent listed: `y`, `n` or `?`, numbered, as
  in `1y 2n`. Answering is optional: leave the box empty to skip, and a skipped question is recorded as skipped. Where
  a gate asks no question, leave it empty. There is no separate task for the answers any more.
- **What you asked to change is on the record.** When a document is ready for review, the agent lists the changes you
  asked for during the stage. The approval's fourth box asks what you asked to be changed before approving, in your
  own words: correct the list, or leave the box empty. What you type goes into the document's decision block.
- **After you record a decision, the task says what comes next.** Once you record your stage 4 choice with
  `SPOCK: record a decision I made`, for example, it says that stage 4 is waiting on you at G4, which solution you
  chose, and that you approve with `SPOCK: approve what is in front of me`.
- **The steps that are yours stay yours.** A task that opens a box for you to fill, such as your name, your choice or
  your approval, is yours to run. The agent is told to name the task for you and end its turn, never to start it. This
  release carries a guard that stops an agent at the moment it starts such a task; it is switched on once it has been
  run on a ČS-managed Windows computer.

### Taking work back

- **A stage's whole work can be taken back in one step.** After you send a stage back, the output names the line to
  type in the file box of `SPOCK: take something back`, as in `4-solutions (12 files)`. Type the folder alone to see
  what it would take back and what stays, with nothing moved. What is taken back goes to `superseded/`; nothing is
  deleted.

### When something goes wrong

- **Every check says what passes.** After a failed check, the gate follows each failure with what passes, and what to
  do names the agent's own next step or, where only you can clear it, the one task to run.
- **Workflow Support reads what the last task did**: which task ran, what it does, and which boxes it opens, so an
  agent no longer tells you about a box the task never opened.
- **A failure stays in view until it passes.** If a task failed and another task ran after it, Workflow Support still
  sees the failure, until the task that failed passes.

## New in 1.10

### Getting 1.10

- **On 1.9, the update is a task.** Finish your run, close your Copilot chats, run
  `SPOCK: update this copy to the latest release` and pick **update**. Then reload VS Code.
- **Still on 1.8, pull once by hand**, as the 1.9 section below says. From then on, use the task. If you ran stage 3
  on 1.8, first put the competitor store back with `git checkout -- .github/store`, or the pull stops on it: the
  competitors you kept stay in your runs, and the store is rebuilt from them at the next stage 3.

### The boxes you fill

- **Every box says what it takes, with an example, and refuses a value that does not fit.** Nothing is recorded, and
  the last line in the terminal names the box, says why and shows the example. Run the task again.
- **You type your role once.** `SPOCK: start a run` asks for the run id, your name and your role. After that, leave a
  role box empty to keep the role the run records for you. You still type your name each time: it is your signature.
- **A name box refuses a role, or a value with no letter in it. A reason box refuses words that do not say why**, such
  as a name, a role or check numbers alone.
- **The sign-off task takes only a check the gate recorded failing at this stage**, and names the ones you can sign
  off.
- **A choice typed as `SOL 5` is recorded as SOL5.**
- **At stage 7, the Jira key has its own task, `SPOCK: record the Jira key`.** Type the key, as in PROJ-1234, or
  `none yet`.
- **When a box entry was refused, the next stop opens with "Your last entry was not recorded."**, then the refusal and
  what the box takes. A "done" in the chat no longer passes for a recorded answer.

### Stage 1

- **A key result the strategy basis does not hold is recorded in your own words.** The agent says the basis does not
  hold it and, where your words may mean a measure the basis leaves out on purpose, asks which. It never records a
  stand-in you did not choose.

### Stage 2

- **Stage 2 asks you to rank the opportunities.** Two questions over the whole set: which reach the most customers,
  and which hurt customers most. An order is enough, and two can share a place. If you cannot tell them apart, say so,
  and the order rests on the evidence behind each. It then asks why each problem occurs. An opportunity added later
  is ranked again with the rest.
- **An opportunity you bring yourself is accepted** without a hypothesis under it, and marked as yours.
- **With fewer than three prioritised opportunities, the approval tells you what that means for stage 4** and lets you
  approve as it is. Stage 4 then forms three solutions that share them, and says so at the top of the solution set.

### Stage 3

- **Stage 3 asks once whether any material you supplied is internal to the bank or not public.** A card built on such
  material, or on supplied material nobody said was public, stays in its run. `SPOCK: keep this run's competitors`
  copies only the other cards and says how many stayed. The shared store never shows a confidential card.
- **The shared competitor store names no person as its owner.** It reads *to be named by ČS*.

### Choosing, from stage 4 on

- **When you are asked to choose from a set, the message says you will choose one, and only that one is taken
  forward.** Before you choose, you can discuss, change, drop or add one. It used to say "This is a set, not a single
  answer".
- **Replacing your stage 4 choice after approval carries it through.** With `SPOCK: replace a decision that no longer
  stands`, the selected solution is written again from the new choice, and stages 5 onward are marked out of date and
  redone from it with `SPOCK: continue`.
- **At stage 6, a PRD draft missing a touchpoint is fixed before you are asked to agree**, so you agree once.
- **At stage 7, an initiative edited after its reading copy was written fails the gate**, naming the copy and the task
  that writes it again.

### When a check fails

- **After a failed check, the gate says what passes** for the document the failure is about. This covers the checks
  that failed in earlier test runs.
- **`SPOCK: explain what the gate failed` lists the failures under the document each is about**, in stage order. For
  each check it says what failed, what it is for, what passes, what to do, and whether you can sign it off.
- **The report the agent reads after each write files each finding under its document**, with what passes.

### The run's record

- **Stop a run with `SPOCK: stop this run`.** Type your name, pick one of four reasons, and add a note if you want.
  The run stops for good and nothing is deleted. A stopped run counts as finished, so it no longer stands in the way
  of another run or an update.
- **One name correction covers every stage.** `SPOCK: correct a name on the record` no longer asks for a stage. It
  corrects the spelling wherever the run records it and prints one line per stage.
- **A stray copy of a document stops the approval.** Where two files claim to be one document, such as a "… copy.md"
  saved beside it, the approval names both and `SPOCK: take something back` for the copy.
- **On the run's front page, each decision cell of an out-of-date stage says so**: decided on its date by its person,
  and out of date.
- **A document that still lists an entry whose part was taken back fails the gate**, naming who took it back and when.

### Czech runs

- **Every fixed message comes in the same Czech words at every stage**: a stage's opening, the review request, the
  approval, the hand-off, the market stage's opening and Workflow Support's closings. A gate's questions are printed
  in Czech by the task, and the agent passes them on as printed.
- **The settled terms hold in the documents and in the chat**: the person the run works with is *člověk*, *Domain
  Lead* stays in English, and a run is *běh*, on the front page as in the messages.

## New in 1.9

### Updating your copy

- **Getting 1.9 is the last update by hand.** 1.8 has no update task, so finish your run and update once with
  `git pull`, or Source Control › Pull. Then close your Copilot chats and reload VS Code.
- **From 1.9 on, a task does it:** run `SPOCK: update this copy to the latest release` and pick **update**. It keeps
  your runs, your setting in `.github/surface` and where your runs are kept: a runs folder you moved no longer stops
  an update. While a run is unfinished, it leaves the copy on its version and says so.
- **If it says files of the workflow were changed on this computer**, run it again and pick the second choice. It
  keeps a copy of those files in your runs folder and puts the release's back.

### Two new checks at the gate

Both hold runs started on 1.9 or later, name the files they find, and cannot be signed off.

- **The workflow's own files must be the release's.** A file under `.github/` or `.vscode/` changed, removed or added
  on this computer fails every gate. Your settings are not counted. Run the update task and pick the second choice:
    it keeps a copy of the changed files and puts the release's back.
- **Every file in a supplied folder must have been read in, and be unchanged.** From stage 3's gate on, one that is
  not fails the gate: take it out, or put the original back. To add problem material after stage 2 is accepted, send
  stage 2 back with `SPOCK: send a stage back to be redone`, then add it with `SPOCK: add problem material`.

### Pasting in the chat

- **Text or a list you paste in the chat goes in with `SPOCK: take in what I pasted in the chat`**, under the name
  you type, not as a file the agent writes. It saves exactly what your clipboard holds: problem material at stage 2,
  your market list at stage 3. Copy the text first if you typed it. Put a file attached to the chat in the supplied
  folder yourself.

### Your market list

- **A list with no competitor entry is not recorded.** `SPOCK: what market material has been supplied` says how it
  read each section and shows a four-line example. Such a list used to be recorded with no competitors.
- **Before stage 3 runs, it names each competitor with addresses from fewer than two publishers**, whose card the
  gate would refuse. Add an address, or go ahead as it is.

### Handing a run to a colleague

- **Hand a run over by copying its folder, never through git.** The tester guide, section 3.4, gives the steps; the
  new owner runs `SPOCK: record who owns this stage`. Leave the small `.keep` file in each new run's supplied folders:
  it keeps them in a copy.
- **With two unfinished runs, every task names both and says how to move your own out**, where it used to ask which
  run you meant.

### What the documents say

- **Compliance sections, the expanded MVP and the PRD no longer say who wrote the compliance cards.**
- **A source written as its reference, a description and its address now matches its row in the run's sources.** It
  used to fail every gate.

## New in 1.8

### Stage 2 and your research

- **A research file holding several interviews is taken in without anything being done by hand.** Where the
  stage adds an entry for each interview in one file, the workflow now records that file's size and
  fingerprint against every entry before it checks anything. It used to check first and refuse the entries
  for a measurement nothing had written yet, leaving the agent to work out its own way past. **You do not
  need to split a file up, and the agent has nothing to fill in.**

### Windows

- **Stage 4 goes through on Windows.** It used to stop at the step that puts the solution set together, saying
  every solution's compliance section had been worked out from a different version of the solution, and working
  it out again never helped. The cause was how Windows ends each line of a saved file, which one step set aside
  and the next did not. Both now read files the same way, and a solution that really changed after its
  compliance section was worked out is still caught.
- **A hand edit to the text around the solutions or the competitor cards, saved on Windows, is recorded**
  instead of refused.

### The run's record

- **An approval always carries the name of the person who gave it.** An approval with no name is refused, where
  it used to be signed with the name the computer holds.
- **Every place a person's name is recorded refuses an agent's name**: decisions, refinements, taking a decision
  back, accepting a stale stage, stopping a run, keeping a stage and naming an owner. Seven of fifteen used not
  to.
- **A stopped run stays stopped.** Once a run is stopped, nothing moves it on, approves it or writes into it.
- **Sending a stage back keeps the answers you gave to its gate questions**, marked as withdrawn with the day
  and the reason, the way every other withdrawn decision is kept. They used to disappear.
- **The check that catches a hand-edited run record works again**: a decision recorded on a stage that was
  never reviewed, or dated with something that is not a date, is caught.

## New in 1.7

### Windows

This release is mostly one thing: the workflow was written and proven on a Mac, and a first run on Windows
found the places that assumed it. **Nothing here changes what the workflow does. It changes where it worked.**

- **The tasks that take the name of your run now run on Windows.** Reading in your problem material, adding
  more of it, and adding a problem in your own words all failed with a path that had the runs folder in it
  twice, and no amount of re-running helped. They work.
- **Taking a document back works on Windows.** It used to refuse, saying the file was outside the run when
  it was plainly inside it.
- **A document is read whichever way your machine saved it.** 1.5 covered line endings; this adds the
  invisible mark some Windows editors write at the start of a file, which used to make a document read as
  having no front matter at all. A file saved by one person and edited by another is read the same way.
- **A folder path a message shows you is written the way your machine writes it**, rather than half one way
  and half the other.
- **The setup step that sets your surface is an edit you make in the editor.** It used to be given as a
  command to paste into a terminal, in a form that quietly wrote the wrong thing on Windows.
- **`SPOCK: check the repository` runs to the end on a Windows copy.** One of its readers used to stop the
  whole run partway with an error, so several checks never reported at all.

### Stage 3 and the market

- **Stage 3 researches every competitor in your market itself, and no longer reuses a profile from an
  earlier run.** This reverses what 1.5 introduced, and it is worth saying why. A competitor profile is
  written against the question the run that made it was asking: where that run found the experience broke
  down, and what it went looking for and did not find. Reused in a run asking a different question, it
  answers the wrong one, and the market summary at the end of the stage is drawn only from what this run
  researched. So until a stored profile records which question it was researched for, the stage researches
  everything again. **Stage 3 takes longer than it did in 1.5 and its summary covers the whole market you
  gave it.** Where there are more competitors than the stage can research, it names the ones it did not
  reach and why.

## New in 1.6

### Files saved on Windows

- **Everyone's copy of the workflow is now the same copy.** Git on Windows rewrites line endings as it writes files
  out, so two people could hold versions of the same file that differed in every line without either of them doing
  anything wrong. The workflow now tells git to give every machine the same files, whatever each machine is set to,
  and `SPOCK: check the repository` says plainly whether yours matches. This does not change anything you write: a
  file you save yourself is read either way, as it has been since 1.5.

## New in 1.5

### Files saved on Windows

- **A document saved with Windows line endings is read like any other.** It used to be refused with
  `frontmatter not closed` over a block that is plainly closed, and in some places it was read as having no front
  matter at all, with nothing said about it. Every place a file is read now takes both kinds of line ending, so you
  do not need to convert a file by hand before you hand it over.

### Stage 3 and the market

- **Before it researches anything, stage 3 lists the competitors it already holds a profile of from earlier runs**,
  each with the date it was researched, and asks whether you want any of them researched again. Name the ones you
  want done afresh, or tell it to go ahead. The ones you name are researched in this run. Where it holds none, it
  says so in one sentence and carries on without stopping. Where two runs hold a profile of the same competitor, the
  one offered is the most recently researched.
- **The offer to search the market for you says what it depends on, and the agent tries a search before it claims
  it can.** Searching needs an extension installed separately, and the agent cannot tell whether it is there until
  it tries. When you leave the market folder empty and tell it to begin, it issues one search first, and its first
  sentence tells you whether searching works at all. Where it does not, it asks you in the chat for the names and
  web addresses instead, and the stage runs on those. A run with a market list searches nothing, so there is nothing
  to try. On a Czech run the condition is translated with the rest of the message.
- **When the task that assembles the competitor cards refuses, it says what to do about it**, in the same words
  stage 3's shapes page uses: empty the card region between the opening and the closing heading, then run it again.
  When it works, it names each part it placed and the order it placed them in, so you can see what went into the
  document.

### What the agents say

- **On a Czech run every line an agent writes is in Czech, including the short lines between its tool calls**: what
  it is about to do, what it has just read, what comes next. A task's name is the one exception and stays exactly as
  printed, so you can find it in the list.
- **Every sentence that sends you to a task names `Tasks: Run Task`**: open the command palette, choose
  `Tasks: Run Task`, then pick the task. The hand-offs at the end of a stage, the Workflow Support agent and the
  tester guide all say it the same way, and the task page says plainly that the palette does not list task labels on
  its own.
- **When an agent hands you a task, it asks you to write back once you have run it**, and says what that does: it
  reads the run record on its next turn, so anything you write in the chat is enough to carry on. It also says in
  the same breath that it is not running the task itself and that its turn is over. You no longer write into a chat
  that does not answer.
- **A number an agent gives you is read off the run's record**, not off the file you supplied and not off what a
  file says about itself. Until your material is written into the record there is no count to give, so the agent
  describes what arrived instead of naming a number. Where a count it has already given you has changed, it says
  that it changed and gives the new one in the same message, rather than leaving the two standing side by side.
- **An agent that has been refused twice by the same task for the same reason stops.** The rule that stopped it
  after two changes to a document for a failing check now covers a refusing task as well. A refusal names what it
  wants and does not change between tries, so the agent opens its stage's shapes page, where that refusal is written
  out in its own words, before it tells you or names the Workflow Support agent.

### The run's front page

- **Each sign-off gets its own line.** The headline names the stage and says the check is still failing, and under
  it there is one line per sign-off: the checks it covers, the reason in the words the person typed, and what was
  accepted. Two people's reasons no longer run together into one sentence, and a sign-off recording nothing accepted
  ends after its reason.
- **The page says how files left the run, read from what was recorded when they left.** Where a person took files
  back, it says how many, from which stage, by whom and on what day, and quotes the reason each one gave. Where
  nothing on a file says how it left, the page says that rather than naming a cause. It used to state that a re-run
  had replaced them, which is not what happened. It counts files and names stages, and never prints a filename.
- **On a Czech run the block saying what the run does not claim, `## Co tento run netvrdí`, is Czech throughout.**
  Every line under it follows: what a stage still owes, what it does not wait for, a quality rule nobody has
  answered yet, a signed failure with its reason, a body of know-how a stage did not read, a document that has gone
  stale, the files kept in `superseded/`, and what `notes/` holds.

### When a check fails, and signing it off

- **A failure about a stage you have already accepted gives you one instruction, not two.** Where the finding says
  to sign the check again, the lines under it no longer add that nobody can sign this one off. They say that the
  stage is accepted, that nothing written at the current stage changes it, that you sign the check it names again on
  that stage, and that no document should be edited to satisfy it.
- **A sign-off you marked as a workflow fault is counted across the pilot, not only on your own run.** The pilot's
  figures list every check signed off that way, how many runs signed it, how many withdrew it, and the reason each
  person gave. A check signed against the workflow on several runs names a rule the build gets wrong rather than a
  run that went badly.

### Sending a stage back

- **When a stage reads a body of know-how it had declared it could not read, you are told at the moment the gap is
  withdrawn.** Sending the stage back and advancing it again clears the gap, and the line saying so is now printed
  on every route through, not only on one of them. A degradation used to leave the record in silence.

## New in 1.4

### Starting a run

- **Stage 1 shows you every key result in the Strategy Basis, all twenty-five, grouped by their objective**, each
  with its identifier, its words, its direction and its type. The agent says which two or three it would look at
  first and why, and says plainly that the rest are there because the nearest by topic is often not the one a
  person picks. It no longer narrows the list to its own shortlist.
- **When you name a key result yourself, the agent reads its row back to you before it records anything**: the
  identifier, the words, the direction, the type and the section it sits in, in your language. Where the
  identifier is not in the Strategy Basis, it says so and asks. Where the direction or the type you wrote differs
  from the row, it says both and leaves the choice to you. It never corrects you quietly, and it never records a
  row it did not read.
- **A key result recorded with a direction, a type or a section beside its identifier is checked against the
  Strategy Basis.** C77 compares each of the three with the row and names the difference. A bare identifier such
  as `SHD-1` is still a whole answer.

### Your material

- **When you say what a file is, your answer sets its research label, and it is recorded as yours**: your name,
  the date and your own words, in that item's `provenance`. The agent's own reading of the file goes in the same
  place beside it, what the file says about itself and what the agent read that as, so the item carries both and
  a later reader can see where the two differ. The agent never drops its reading because you answered.
- **A label of `synthetic` or `human` with nothing recorded beside it is refused.** On a run started on 1.4, C33
  fails and names the item. A run started on an earlier version is not held to this, and the check says so and
  names the build.

### Names on the record

- **A name typed with a slip is corrected with a new task, `SPOCK: correct a name on the record`.** Give the
  stage, the name as it is recorded, the name it should be, who is correcting it and why. It changes that stage's
  owner, its gates and its decisions, and the run's front page carries a line saying what was corrected, by whom
  and when. Nothing is approved again and no gate runs a second time.
- **Both spellings stay on the record.** The spelling typed at the time is kept beside the corrected one, so the
  record still shows what the gate saw, and a correction on its own never counts as a change to the work.
- **The task refuses what it must not do**, and writes nothing when it does: an empty box, the same name in both
  name boxes, a producer's name, a name the stage does not record (it lists the names that stage does record and
  where), and a name that is another person rather than another spelling of the same one, where it names the
  send-back instead.
- **A name recorded in two cases, or with and without its accents, counts as one person.** *veronika* beside
  *Veronika* no longer reads as two accountable people at C167, and where one person is on the record under more
  than one spelling, the check's line names the spellings so you can correct them.

### When a check fails, and signing it off

- **The agent gives you no wording for any box that is yours, and there is no exception for a sign-off.** It says
  in plain words what failed and stops there: no example answer, no draft, no reason and no decision, for any box.
  What the record carries is what you typed. The only example you see is one a task printed for its own box.
- **When a gate fails, its output lists the six boxes of `SPOCK: sign off a check this run cannot meet` in order**,
  with the first box already carrying the numbers of the checks that failed and can be signed. You can read the
  whole form before you open it.
- **A sign-off covering two or more checks narrows on its own when one of them starts passing.** The workflow
  supersedes it, records a copy covering only the checks still failing, keeps your words, your name, your role and
  your date, and prints one line saying what happened. Nothing is asked of you, and you never sign the same check
  twice.
- **A finding about a stage you have already accepted is listed under that stage, never as the next stage's work.**
  Where a sign-off covers it, it is shown as accepted by a person and not yours to change. Where none does, it is
  shown as being about a stage that is already accepted and does not clear as the run advances. Either way the
  agent writing the current stage is no longer handed it as something to fix.

### Sending a stage back, and taking a file back

- **A run started on an earlier version can be sent back and advanced again.** It used to stop with the record
  saying the same body of know-how was both read and not read, and there was no way out. The stage now withdraws
  the gap it had declared, the gate passes, and the front page stops saying the stage did not read something it
  has since read.
- **`SPOCK: take something back` no longer asks you for a path you cannot know.** Give it a folder and it lists
  the files that folder holds and takes nothing back, so you can pick one. Give it a path missing its stage
  number, such as `competitive-analysis/parts/05-mbank.md`, and it matches what the run holds and prints the full
  path. Leave the file box empty and it takes back only what the checks report joined to nothing. A raw system
  error no longer reaches you.

### What the agents say

- **Stage 2 names the agent that carries stage 3, and tells you to switch to it.** Every hand-off now names the
  next stage's agent, taken from the line *It is carried by* in the output of the task that moved the run, and
  gives the three steps: open a new chat, choose that agent in the picker, say *continue the run* with the run's
  name. Where the same agent carries the next stage, it says so in a line above the steps, and the steps stay.
- **There is a message for the end of a run.** Once stage 7 is accepted the agent says the run is finished and
  reads the front page back to you item by item. It never tells you nothing is outstanding while the page it
  points at shows a document that was never made.

### Checking and finishing

- **An absence that names its opportunity inside a sentence now counts.** C56 reads the opportunity's identifier
  as a word of its own, so `- problem: O3` and `- problem: "[O3] nobody in ten mentioned it"` both pass, and `O1`
  is not found inside `O12`. Where it does fail, the message names the file the list of absences was read from and
  the shapes that pass.
- **A competitor card can carry its figures on a record without a second check refusing them.** C104 now finds a
  card part's entry on the record by `identity_key` where the list is keyed that way, so C104 and C109 can be
  satisfied at the same time. Both messages name the document, the record files and the entry that was compared,
  and say that the document's own text is never read for those values.
- **Stage 3's shapes page has a section for each of those two checks**, with what the check reads and the shapes
  it passes and refuses. It says plainly that taking a part back is not a way to clear C104: a part you take back
  is one the check stops reading, so it passes in silence and the card's figures stay in the document with no
  record behind them.
- **A touchpoint you inherit is written down by its identifier everywhere its count is stated.** The expanded MVP
  and the agreed PRD name every touchpoint they carry forward, the unchanged ones where they are designed in and
  the changed ones where you say what changed. On a run started on 1.4, C185 fails where a compliance screen
  disagrees with itself, or where either document leaves an inherited touchpoint unwritten. It counts identifiers
  and never words, so it reads the same on a Czech run.
- **The run's front page says why the initiative (A15) was never made.** Its cell in the chain table reads
  *(parked: the authoritative Jira host is not named, so nothing can create the issue)* instead of
  *(not produced)*, in the run's language. A stage that is simply unwritten still reads *(not produced)*.

## New in 1.3

### Starting a run, and working in Czech

- **On a Czech run, the run's front page, `runs/<run name>/README.md`, is in Czech**: its headings, labels, table
  headers and stage names.
- **The list of your problem material (A2) is written in the run's language**, and on a Czech run the run's list of
  sources, `sources.md`, has a Czech heading and opening sentence.
- **On a Czech run started on 1.3, the compliance section of each stage 4 solution is in Czech**: the area names, the
  framing and the touchpoints it quotes from all four compliance cards, the Compliance card included. A run started
  on an earlier version keeps its compliance sections in English.
- **The agents are instructed to keep ČS's strategy names as ČS writes them in Czech documents**: *Membership*, never
  *Partnerství*, and each pillar name as the Strategy Basis gives it.

### Your material

- **Each file of problem material gets a research label** when it is read in: `synthetic`, `human` or `not_stated`,
  from what the file says about itself, and never `human` by default. The agent is instructed to name each file's
  label when it puts stage 2 to you, so you can say where one is wrong. The label changes nothing in how the material
  is rated.
- **A Tableau dashboard exported to PowerPoint is read like any `.pptx`**: its text is read, and its charts, which the
  export saves as pictures, are not. Put the figures that matter into a text file beside it.
- **On a run started on 1.3 with a market list, a competitor card cites only pages on your list or under an address
  on it.** Each source on a card records the page that was read, and stage 3's check C184 fails on any other page. An
  address you give the agent in the chat is used only once you have added it to the list file and the list has been
  recorded again with `SPOCK: what market material has been supplied`.

### Answering the judged questions

- **The answers box of `SPOCK: record the judged half of this gate` takes your answers without numbers, in the order
  the task output lists the questions**: `y` where the gate asks one question, `y ?` where it asks two. Numbered
  answers such as `1y 2?` still work. Give one bare answer per question; mixing numbered and bare answers is refused.

### Sending back and keeping a stage

- **`SPOCK: send a stage back to be redone` and `SPOCK: keep a later stage as it is` open a fourth box: the role you
  decided in.** The role recorded is yours, never the stage owner's. If you leave the box empty, the role you have
  already recorded on this run is used; if you have recorded none, nothing is sent back or kept, and the task asks
  you to type your role.

### A record saved under the wrong name

- **A record saved under a name the workflow does not read, such as `R-A10-01.yaml`, is named**, with the name it
  should have, such as `A10-r01-mvp-options.record.md`. The stage's checks name both, and `SPOCK: fill in the
  envelope` stops, names them and writes nothing for that document. The agent writes the record again under the
  right name. The misnamed file stays until you take it back with `SPOCK: take something back`.

### Stage 1 and stage 3

- **Stage 1 asks what a person would see change when the product goal moves.** A metric nobody can observe is
  challenged once more; if there is still none, the goals are marked unknown with that reason.
- **An initiative that serves Love Brand gets a whole goal.** Love Brand carries no key results by design, so stage 1
  records the product goal, its metric and how it serves Love Brand, with no key result and that reason, rather than
  marking the goals unknown. At stage 4 the solution's strategic alignment names Love Brand and gives the same reason.
- **Stage 3's agent is instructed to go from the market map to the competitor cards to the market summary without
  waiting for you**, and to stop once Q3 has run. Nobody approves stage 3, so there is nothing to confirm between its
  documents.

### Links and what the agents say

- **The agents are instructed to write a link to a file as its path from the workspace folder**, such as
  `runs/<run name>/6-prd/1-prd-draft.md`, so that it opens.
- **The agents are instructed to say what holds now**, never what the workflow used to do or when it changed.

### Checking and finishing

- **When a stage's check runs again, the task prints what it finds this time.** After you mark the PRD agreed, for
  example, you see *Q6 passed* with no failure line before it.
- **At stage 5, while no MVP option is chosen, the review points you to the options (A10)**, where you choose the
  option the expanded MVP (A11) is built from.
- **`SPOCK: check what is written, then continue` lists a finding once**, under the document that has to change.
- **If you withdraw a sign-off on a finished run and its check still fails**, the front page, `SPOCK: continue` and
  `SPOCK: check the whole run` name the check and the stage and tell you to sign it again with `SPOCK: sign off a
  check this run cannot meet`. `SPOCK: check the whole run` then shows as failed, and says that checks fail on this run.

### Who owns the know-how

- **A new page, [`KNOW-HOW-OWNERS.md`](./specifications/onboarding/KNOW-HOW-OWNERS.md), lists every area of
  know-how the agents read**: Compliance, Market, Method, Product and Writing, each area's files, and how a change is
  made. **Česká spořitelna owns every area**, and ČS names the person at ČS for each. Every know-how file's header
  names Česká spořitelna as its owner.

## New in 1.2

### Starting a run, and working in Czech

- **Stage 1 asks the language first, and your answer covers the conversation as well as the documents**, at every
  stage and with every agent. If you do not choose, the run is Czech and the agent tells you so.
- **In a Czech run, the headings the checks read are Czech:** the stage 3 verdict (C84), the stage 4 solutions, and
  the chosen-solution document written when you approve stage 4, so C98 and C100 no longer fail on it at stages 5, 6
  and 7. Where a verdict or solution heading is wrong, the message names the Czech heading to use.
- **A market finding that bears on no opportunity can be written in Czech**, and C101 accepts it.
- **The brief asks for the product goal once, as the product's North Star**: one level, not two.

### When a check fails, and signing it off

- **The agent tries twice, then stops.** When the same check still fails after its second change, it tells you what
  the check wants and what it changed, names the Workflow Support agent, and sets out your options, signing the check
  off among them. It does not open the workflow's code.
- **A task that fails shows why.** Its full words stay in VS Code's Terminal panel and in `.github/last-task.md`, and
  the agent tells you what they mean.
- **Before you open `SPOCK: sign off a check this run cannot meet`, the agent says in plain words what failed**, with an
  example answer for the box asking why it cannot be met and one for the box asking what was decided. What you type is
  recorded exactly as you type it.
- **The sign-off has a last box: what the failure points to.** Pick *the workflow looks wrong* when you think the check
  or the workflow is at fault rather than your material: the run's front page then marks it as a suspected workflow
  fault, and it is listed for whoever maintains the workflow. Pick *the material cannot meet it* when what you supplied
  cannot give the check what it asks.
- **You sign a failure once.** In a run on 1.2 or later, a later stage whose gate finds the same failure about a stage
  you already accepted carries your sign-off and does not ask again, until that stage changes.
- **Six checks can never be signed off**, because they guard the run record itself. The task refuses them and says
  what fixes each one instead.
- **A market list longer than ten no longer fails C182.** With a list, the stage aims to profile every name on it, up
  to ten, and records why it left any others out.
- **If a problem-material file changes after it was read in, stage 2's check says how to go on:** put back the version
  that was read in, or sign the check off and say why.
- **You no longer need to tell the agent you have run a task.** While a stage waits on you, the agent reads the run
  record first, whatever you write next.

### Withdrawing a sign-off

- **A sign-off can be withdrawn on its own** with `SPOCK: replace a decision that no longer stands`: pick the kind
  `exception` and give the sign-off's date. It stays on the record, marked withdrawn with your reason, and nothing new
  is recorded.
- **On a stage that is accepted or in review, the withdrawal runs that stage's gate again**, and the gates of later
  stages that carried the sign-off. Any check still failing there is named, for you to sign again.
- **If a check you signed off now passes, C168 fails** and names the sign-off to withdraw and the date to give. C168
  itself cannot be signed off.
- **To reword a sign-off, withdraw it and sign again.** A second sign-off on the same check is refused, and the refusal
  names those two steps.

### Sending a stage back

- **`SPOCK: send a stage back to be redone` keeps the stage's decisions.** Choices, directions and sign-offs on it stay
  on the record, marked withdrawn with the day and your reason. Later stages that have been through their gate are
  marked stale, to be kept with `SPOCK: keep a later stage as it is` or redone once this stage is accepted again.

### Names and roles

- **A Czech job title such as *Product Manažer* is recorded as you type it.** Where the run already has the English
  one, the task prints a heads-up instead of refusing.
- **A name that differs from one already on the run by accents or a letter or two is recorded as typed**, with a
  heads-up naming the spelling on the run and `SPOCK: replace a decision that no longer stands` if you want to correct
  it. The one refusal left is a role in plain letters that is one or two letters away from one on the run, such as
  *product managed*.
- **A role typed as an agent's name, or an approval by someone other than the Product Manager on a stage the Product
  Manager approves, gets a heads-up, not a refusal.**
- **A line starting `Heads-up:` means the task succeeded.** The agent tells you what it said, and you decide whether
  anything needs changing. Agents write every name and role exactly as the record carries it.

### The PRD agreement

- **Stage 6's checks run on the draft before you are asked to mark it agreed**, including those that compare it with
  earlier documents and trace each requirement. You are asked only once nothing is listed.
- **If the draft changes after you marked it, even after its check failed, mark it agreed again** with
  `SPOCK: mark the PRD agreed`. The agreed PRD is written afresh from the draft as it now stands.

### A new task that explains a failed gate

- **`SPOCK: explain what the gate failed` opens no boxes and records nothing.** For each check the current stage's gate
  fails, it prints what failed, what the check is for and, where the stage describes one, the shape that passes. The
  agent runs it when it is stuck on a check, and you can run it yourself from the Command Palette.

### What you send back, and to whom

- **Write your report yourself**, in your own document outside the workflow folder. Do not ask an agent to write it.
- **Send it to Igor Tadić alone**, with the run's whole folder, `runs/<run name>/`, zipped, and the chat session files
  of the run's chats. Section 6 of the tester guide says where VS Code keeps them.
- **Your version is on the run.** A run started on 1.2 or later records it, and its front page,
  `runs/<run name>/README.md`, says so: *Started on build 1.3.* for a run started on 1.3, in Czech on a Czech run.
- **Keep the run folder's name.** If it is renamed, the tasks keep working and the check asks you to rename it back to
  the name the run was given.

## Before you start

- **The model.** In the model picker on the chat box, before the first message, choose
  Claude Sonnet 5 with effort High and the 1M token context (SETUP.md, step 6).
  The agents cannot see the model, so nothing checks it for you.
- **A new chat for each stage.** When a stage is accepted, the agent names the agent for the next one: open a new chat,
  choose that agent, and say *continue the run* with the run's name. Do this even when the same agent carries on.
  Every agent says who it is before it starts.
- **Material that turns up later goes into `2-problems/supplied/` as new files**, and the agent adds it with
  `SPOCK: add problem material`. A file already read in stays as it was.
- **A market list:** write each web address in full, from `https://`, as stage 3's opening message asks while that
  folder is still empty. Open every address before you hand the file over, and remove any that does not open
  (SETUP.md, step 6).
- **Getting 1.15** (SETUP.md, step 8):
  - Finish a run on the version it started on.
  - **On 1.9 to 1.14:** close your Copilot chats, run `SPOCK: update this copy to the latest release` and pick
    **update**.
  - **Still on 1.8:** pull by hand once, with `git pull` or Source Control › Pull, as the 1.9 section says. From then
    on, use the task.
  - **Downloaded as a ZIP:** unzip 1.15 into a new folder and do steps 3 to 5 of SETUP.md there, which includes setting
    `.github/surface`. Keep the old folder for the runs you made in it.
  - **Then close your open Copilot chats and reload VS Code** (Command Palette › `Developer: Reload Window`), and check
    that `.github/surface` says `copilot` and that the six agents are listed.
