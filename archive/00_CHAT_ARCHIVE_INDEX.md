# Chat Archive Index

## Purpose
- Store project memory from Codex chats on disk
- Reduce dependency on chat history
- Make it safe to work in 1–3 chats and eventually archive/delete old branches

## Archive Status

| Chat / Branch | Status | Migrated Into | Notes |
|---|---|---|---|
| Изучи гранты Беларуси | Partial | [archive/chat-01-izuchi-granty-belarusi.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-01-izuchi-granty-belarusi.md) | Early wide direction research summarized, details may still be incomplete |
| Широкий поиск направлений | Partial | [archive/chat-02-shirokiy-poisk-napravleniy.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-02-shirokiy-poisk-napravleniy.md) | Broad market comparison summarized into stages and tracks |
| Оценка широких направлений | Partial | [archive/chat-03-otsenka-shirokih-napravleniy.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-03-otsenka-shirokih-napravleniy.md) | Ranking and scoring logic captured |
| Этапы | Active master branch | [archive/chat-04-etapy-master.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-04-etapy-master.md) | Main sequencing logic preserved in project files |
| трек 01 Waste | Good | [archive/chat-05-track-01-waste.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-05-track-01-waste.md) | Core track transferred into [tracks/waste.md](C:\Users\Маша\Documents\изучение грантов\экология\tracks\waste.md) |
| трек 02 ROP | Good | [archive/chat-06-track-02-rop.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-06-track-02-rop.md) | Second track transferred into [tracks/rop.md](C:\Users\Маша\Documents\изучение грантов\экология\tracks\rop.md) |
| трек 03 Авто | Good | [archive/chat-07-track-03-auto.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-07-track-03-auto.md) | Vertical package transferred into [tracks/auto.md](C:\Users\Маша\Documents\изучение грантов\экология\tracks\auto.md) |
| трек 04 консультанты / партнеры | Good | [archive/chat-08-track-04-partners.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-08-track-04-partners.md) | Partner logic transferred into [tracks/partners.md](C:\Users\Маша\Documents\изучение грантов\экология\tracks\partners.md) |
| трек 05 Water / Emissions / Ecopassport | Good | [archive/chat-09-track-05-expansion.md](C:\Users\Маша\Documents\изучение грантов\экология\archive\chat-09-track-05-expansion.md) | Expansion logic transferred into [tracks/expansion.md](C:\Users\Маша\Documents\изучение грантов\экология\tracks\expansion.md) |

## Safe Deletion Rule
- Do not delete old chats until:
  - core conclusions are in `00_MASTER.md`
  - decisions are in `01_DECISIONS.md`
  - tracks are in `tracks/*.md`
  - critical links are in `05_SOURCES.md`
  - chat-level summaries exist in `archive/`

## Current Assessment
- Strategic memory is already mostly migrated
- Fine-grained wording and some long-form details may still exist only in chats
- Safe next step: continue work from files, keep old chats as read-only archive until no longer needed
