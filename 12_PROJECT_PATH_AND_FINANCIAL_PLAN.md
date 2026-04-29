# Project Path And Financial Plan

## Зачем нужен этот файл

Этот файл нужен как короткая управленческая память проекта:

- как мы пришли к текущему направлению;
- что именно уже создано;
- какие инструменты и сервисы использовали;
- как сейчас устроен проект;
- что делать дальше, чтобы прийти к первым деньгам.

Это не архив всех чатов.
Это рабочее напоминание для продолжения проекта без потери логики.

## 1. Как создавался проект по шагам

### Этап 1. Широкое изучение рынка

Старт проекта был не с сайта и не с продукта, а с широкого изучения направлений.

Что делали:

- смотрели, какие экологические и околорегуляторные ниши в Беларуси имеют реальные платежные сигналы;
- собирали открытые источники, рыночные ссылки, признаки услуг, тендеров и спроса;
- сравнивали Waste, ROP, Water, Emissions, Ecopassport, Auto и партнёрские каналы.

Что выяснили:

- у Waste есть самый понятный и продаваемый первый wedge;
- у ROP есть сильный второй трек с будущим software/data потенциалом;
- Auto лучше использовать как вертикальную упаковку поверх Waste;
- Partners имеют смысл как канал, а не как стартовый продукт;
- Water / Emissions / Ecopassport лучше оставить на потом.

Файлы:

- [stages/stage-01-market-scan.md](C:/Users/Маша/Documents/My_Project/ecology/stages/stage-01-market-scan.md)
- [05_SOURCES.md](C:/Users/Маша/Documents/My_Project/ecology/05_SOURCES.md)
- [archive/00_CHAT_ARCHIVE_INDEX.md](C:/Users/Маша/Documents/My_Project/ecology/archive/00_CHAT_ARCHIVE_INDEX.md)

### Этап 2. Сужение стратегии

После широкого скана проект не пошёл в пять направлений сразу.
Была собрана последовательность.

Что решили:

- Waste = первый wedge;
- ROP = второй трек;
- Auto = вертикаль поверх Waste;
- Partners = канал;
- Expansion = потом.

Логика:

- не строить пять бизнесов сразу;
- сначала запустить самый продаваемый и операционно понятный контур.

Файлы:

- [stages/stage-02-strategy.md](C:/Users/Маша/Documents/My_Project/ecology/stages/stage-02-strategy.md)
- [00_MASTER.md](C:/Users/Маша/Documents/My_Project/ecology/00_MASTER.md)
- [01_DECISIONS.md](C:/Users/Маша/Documents/My_Project/ecology/01_DECISIONS.md)
- [02_TRACKS.md](C:/Users/Маша/Documents/My_Project/ecology/02_TRACKS.md)

### Этап 3. Формулировка первого оффера

После выбора Waste как первого wedge был сформирован первый продаваемый оффер.

Что получилось:

- Waste Compliance Setup + Monthly Support

Что продаётся по сути:

- не "AI-эколог";
- не "вся экология под ключ";
- а приведение в порядок waste-документов и регулярного контура сопровождения.

Базовая логика:

- 24h fit-check;
- scope;
- setup за 7-14 дней;
- monthly support.

Файлы:

- [offers/waste-offer-v1.md](C:/Users/Маша/Documents/My_Project/ecology/offers/waste-offer-v1.md)
- [tracks/waste.md](C:/Users/Маша/Documents/My_Project/ecology/tracks/waste.md)
- [03_VALIDATION.md](C:/Users/Маша/Documents/My_Project/ecology/03_VALIDATION.md)
- [templates/pricing-logic.md](C:/Users/Маша/Documents/My_Project/ecology/templates/pricing-logic.md)

### Этап 4. Сборка операционного слоя

После оффера появился не кодовый продукт, а operator-first система:

- pipeline;
- templates;
- pricing logic;
- meeting templates;
- accounts;
- working rhythm;
- risk guardrails.

То есть сначала собиралась управляемая ручная машина продаж и исполнения.

Файлы:

- [04_PIPELINE.csv](C:/Users/Маша/Documents/My_Project/ecology/04_PIPELINE.csv)
- [06_RISKS.md](C:/Users/Маша/Documents/My_Project/ecology/06_RISKS.md)
- [07_DASHBOARD.md](C:/Users/Маша/Documents/My_Project/ecology/07_DASHBOARD.md)
- [08_NEXT_STEPS.md](C:/Users/Маша/Documents/My_Project/ecology/08_NEXT_STEPS.md)
- [09_OPERATING_RHYTHM.md](C:/Users/Маша/Documents/My_Project/ecology/09_OPERATING_RHYTHM.md)
- [templates/intake-first-response.md](C:/Users/Маша/Documents/My_Project/ecology/templates/intake-first-response.md)
- [templates/proposal-pack.md](C:/Users/Маша/Documents/My_Project/ecology/templates/proposal-pack.md)
- [templates/waste-outreach-pack.md](C:/Users/Маша/Documents/My_Project/ecology/templates/waste-outreach-pack.md)

### Этап 5. Сборка первого внешнего MVP

После этого был собран не SaaS, а простой внешний вход:

- landing;
- intake form;
- Apps Script endpoint;
- Google Sheets intake;
- privacy page.

Логика была такая:

- сначала получить входящий лид;
- быстро дать fit-check;
- не строить сложный продукт раньше рынка.

Файлы:

- [mvp-site/index.html](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/index.html)
- [mvp-site/styles.css](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/styles.css)
- [mvp-site/privacy.html](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/privacy.html)

### Этап 6. Проверка execution layer

После запуска технического intake был сделан ручной тестовый прогон клиента.

Что это дало:

- появилась структура клиентской папки;
- появился checklist;
- появился fit-check report;
- стало видно, где система уже рабочая, а где ещё сырая.

Файлы:

- [clients/2026-04-10-test-ooo-paketservis](C:/Users/Маша/Documents/My_Project/ecology/clients/2026-04-10-test-ooo-paketservis)

### Этап 7. Фиксация проекта в Git и GitHub

Проект был зафиксирован в git и опубликован на GitHub.

Что сделали:

- инициализировали git;
- сделали первый коммит `init`;
- создали репозиторий `enotdoc-site`;
- запушили ветку `main`.

Это важно не только для сайта, а для дисциплины проекта и сохранности результата.

## 2. Какие инструменты и сервисы использовали

### Для анализа и сборки проекта

- Codex / ChatGPT как рабочий исследовательский и операционный ассистент
- локальная файловая база проекта как source of truth
- Markdown-файлы как проектная память
- CSV-файлы как лёгкий pipeline и account list

### Для внешнего MVP

- HTML
- CSS
- простой JS в `index.html`

### Для intake

- web form на лендинге
- Google Apps Script endpoint
- Google Sheets как intake table

### Для юридического и доверительного слоя

- privacy page
- operator identity
- базовая data processing policy

### Для управления кодом и версионированием

- git
- GitHub

## 3. Что уже сделано

### Стратегически

- рынок сужен;
- порядок треков определён;
- первый wedge выбран;
- guardrails зафиксированы;
- pricing hypothesis зафиксирована.

### Как продукт

- оффер сформулирован;
- ICP зафиксирован;
- CTA определён;
- fit-check как entry point определён;
- setup и monthly support очерчены.

### Как продажи

- есть ICP/account lists;
- есть outreach templates;
- есть pricing logic;
- есть proposal structure;
- есть intake response templates.

### Как delivery

- собран первый checklist;
- собран fit-check report template;
- собрана структура клиентской папки;
- сделан один тестовый dry run.

### Как внешний вход

- landing собран;
- CTA работает;
- intake form работает;
- Apps Script интеграция починена на уровне поля `email_or_phone`;
- privacy page существует.

### Как память проекта

- core knowledge вынесен в файлы;
- archive чатов вынесен в `archive/`;
- decisions и tracks зафиксированы;
- создан git-репозиторий.

## 4. Что является реальным центром проекта сейчас

Главный центр проекта сейчас не сайт.

Главный центр проекта сейчас:

- [00_MASTER.md](C:/Users/Маша/Documents/My_Project/ecology/00_MASTER.md)
- [07_DASHBOARD.md](C:/Users/Маша/Documents/My_Project/ecology/07_DASHBOARD.md)
- [08_NEXT_STEPS.md](C:/Users/Маша/Documents/My_Project/ecology/08_NEXT_STEPS.md)
- [tracks/waste.md](C:/Users/Маша/Documents/My_Project/ecology/tracks/waste.md)
- [04_PIPELINE.csv](C:/Users/Маша/Documents/My_Project/ecology/04_PIPELINE.csv)

Сайт это только вход.
Деньги будут не от сайта, а от связки:

- входящий или исходящий лид;
- fit-check;
- scope;
- proposal;
- setup;
- monthly support.

## 5. В чём была основная логика пути

Проект создавался по правильной для MVP последовательности:

1. не код;
2. не дизайн;
3. не SaaS;
4. сначала рынок;
5. потом wedge;
6. потом оффер;
7. потом operator-first система;
8. потом landing;
9. потом intake;
10. потом dry run клиента.

Это важно помнить, чтобы не уйти обратно в хаос и в преждевременную разработку.

## 6. Что сейчас мешает получить деньги быстрее всего

Не мешает сайт как таковой.
Не мешает отсутствие сложной автоматизации.

Главные реальные тормоза сейчас:

- пока нет 1-3 реальных прогонов клиента через fit-check;
- ещё не накоплены реальные objection patterns;
- delivery начинает формироваться, но ещё не прошёл через несколько живых кейсов;
- pipeline как система есть, но фактических выигранных кейсов ещё нет.

## 7. Куда идти дальше, чтобы получить финансовый результат

Ниже не "идеальный план", а практический маршрут к деньгам.

### Шаг 1. Получить первые реальные входы или ручные лиды

Цель:

- довести не сайт, а реальный поток в fit-check.

Что делать:

- начать outreach по `accounts/waste-targets.csv`;
- использовать landing как supporting asset;
- вести все ответы в `04_PIPELINE.csv`;
- не ждать "идеальной готовности".

### Шаг 2. Прогнать 3 реальных кейса через fit-check

Цель:

- проверить, что система работает не в теории, а на живых документах.

Что делать:

- на каждого реального клиента создавать папку по клиентской структуре;
- фиксировать checklist;
- отдавать fit-check result в одном формате;
- смотреть, где повторяются пробелы.

### Шаг 3. Закрыть первый paid setup

Цель:

- перейти от "интересно" к "деньги пришли".

Что делать:

- не брать сложный кейс;
- не обещать лишнего;
- продавать fixed scope;
- не уходить в "давайте сразу всё по экологии".

### Шаг 4. Стандартизировать delivery по итогам первого платного кейса

Цель:

- чтобы второй и третий клиент делались быстрее и спокойнее.

Что делать:

- обновить checklist;
- обновить fit-check report;
- обновить setup workplan;
- дописать missing-documents-request и scope-and-price-note.

### Шаг 5. Зафиксировать ежемесячный ритм поддержки

Цель:

- чтобы выручка шла не только от setup, но и от monthly support.

Что делать:

- на первом клиенте собрать monthly rhythm;
- сделать понятный handover из setup в support;
- проверить, за что клиент реально готов платить регулярно.

## 8. Практический ориентир по деньгам

Краткая логика monetization:

- 1 платный diagnostic или 1 setup уже подтверждает, что воронка не пустая;
- 2+ paid setups дают сильный рыночный сигнал;
- 1 клиент на setup + monthly support важнее, чем много "интересных" разговоров;
- ранний финансовый результат нужен не как прибыльность навсегда, а как доказательство, что выбранный wedge действительно покупают.

## 9. Что нельзя забыть

- Проект не про "сделать красивый сайт".
- Проект не про "собрать большую систему".
- Проект не про "автоматизировать всё заранее".
- Проект про то, чтобы:
  - взять понятную боль;
  - продать понятный первый результат;
  - безопасно исполнить;
  - удержать клиента на сопровождении.

## 10. Что читать, если нужно быстро вспомнить проект

Если нужен быстрый вход:

1. [00_MASTER.md](C:/Users/Маша/Documents/My_Project/ecology/00_MASTER.md)
2. [07_DASHBOARD.md](C:/Users/Маша/Documents/My_Project/ecology/07_DASHBOARD.md)
3. [08_NEXT_STEPS.md](C:/Users/Маша/Documents/My_Project/ecology/08_NEXT_STEPS.md)
4. [tracks/waste.md](C:/Users/Маша/Documents/My_Project/ecology/tracks/waste.md)
5. [offers/waste-offer-v1.md](C:/Users/Маша/Documents/My_Project/ecology/offers/waste-offer-v1.md)
6. [04_PIPELINE.csv](C:/Users/Маша/Documents/My_Project/ecology/04_PIPELINE.csv)

Если нужен стратегический контекст:

1. [01_DECISIONS.md](C:/Users/Маша/Documents/My_Project/ecology/01_DECISIONS.md)
2. [02_TRACKS.md](C:/Users/Маша/Documents/My_Project/ecology/02_TRACKS.md)
3. [03_VALIDATION.md](C:/Users/Маша/Documents/My_Project/ecology/03_VALIDATION.md)
4. [06_RISKS.md](C:/Users/Маша/Documents/My_Project/ecology/06_RISKS.md)
5. [archive/00_CHAT_ARCHIVE_INDEX.md](C:/Users/Маша/Documents/My_Project/ecology/archive/00_CHAT_ARCHIVE_INDEX.md)

Если нужен внешний слой:

1. [mvp-site/index.html](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/index.html)
2. [mvp-site/styles.css](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/styles.css)
3. [mvp-site/privacy.html](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/privacy.html)

Если нужен execution слой:

1. [clients/2026-04-10-test-ooo-paketservis](C:/Users/Маша/Documents/My_Project/ecology/clients/2026-04-10-test-ooo-paketservis)
2. [templates/intake-first-response.md](C:/Users/Маша/Documents/My_Project/ecology/templates/intake-first-response.md)
3. [templates/proposal-pack.md](C:/Users/Маша/Documents/My_Project/ecology/templates/proposal-pack.md)
4. [meetings/README.md](C:/Users/Маша/Documents/My_Project/ecology/meetings/README.md)

## 11. Текущий честный статус проекта

Проект уже не на стадии "идея".

Он уже находится на стадии:

- стратегия собрана;
- оффер собран;
- landing собран;
- intake работает;
- execution skeleton собран;
- память проекта зафиксирована;
- git и GitHub настроены.

Но проект ещё не на стадии стабильной выручки.

Следующий рубеж проекта:

- первый реальный fit-check;
- первый paid setup;
- первый monthly support.

Когда это произойдёт, проект перейдёт из "хорошо собранный MVP" в "доказанный продаваемый контур".
