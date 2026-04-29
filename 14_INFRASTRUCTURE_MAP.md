# Infrastructure Map

## Зачем нужен этот документ

Этот документ нужен как карта инфраструктуры проекта.
Он показывает:

- где что хранится;
- какие элементы относятся к стратегии, продажам, delivery и сайту;
- какие внешние сервисы используются;
- как данные двигаются внутри проекта.

## 1. Общая карта проекта

Проект состоит из 5 инфраструктурных слоёв:

1. Управление и память проекта
2. Рыночная и продуктовая логика
3. Продажи и операторская работа
4. Внешний MVP-сайт
5. Клиентский execution layer

## 2. Где хранится проект

Основная папка проекта:

`C:\Users\Маша\Documents\My_Project\ecology`

GitHub-репозиторий:

`https://github.com/ktserakhava-beep/enotdoc-site`

## 3. Слой управления и памяти проекта

### Назначение

Хранит стратегию, решения, состояние проекта и управленческую память.

### Основные файлы

- [00_MASTER.md](C:/Users/Маша/Documents/My_Project/ecology/00_MASTER.md)
  Главная текущая истина проекта.

- [01_DECISIONS.md](C:/Users/Маша/Documents/My_Project/ecology/01_DECISIONS.md)
  Журнал стратегических решений.

- [02_TRACKS.md](C:/Users/Маша/Documents/My_Project/ecology/02_TRACKS.md)
  Карта треков проекта.

- [03_VALIDATION.md](C:/Users/Маша/Documents/My_Project/ecology/03_VALIDATION.md)
  Логика валидации спроса.

- [06_RISKS.md](C:/Users/Маша/Documents/My_Project/ecology/06_RISKS.md)
  Границы, red flags и ограничения.

- [07_DASHBOARD.md](C:/Users/Маша/Documents/My_Project/ecology/07_DASHBOARD.md)
  Текущий статус проекта.

- [08_NEXT_STEPS.md](C:/Users/Маша/Documents/My_Project/ecology/08_NEXT_STEPS.md)
  Ближайшие действия.

- [09_OPERATING_RHYTHM.md](C:/Users/Маша/Documents/My_Project/ecology/09_OPERATING_RHYTHM.md)
  Как продолжать работу без потери контекста.

- [10_READINESS_AUDIT.md](C:/Users/Маша/Documents/My_Project/ecology/10_READINESS_AUDIT.md)
  Насколько память проекта уже вынесена на диск.

- [11_NEW_CHAT_HANDOFF.md](C:/Users/Маша/Documents/My_Project/ecology/11_NEW_CHAT_HANDOFF.md)
  Как запускать новые чаты по проекту.

- [12_PROJECT_PATH_AND_FINANCIAL_PLAN.md](C:/Users/Маша/Documents/My_Project/ecology/12_PROJECT_PATH_AND_FINANCIAL_PLAN.md)
  Путь проекта и логика движения к деньгам.

- [13_PROJECT_HISTORY_AND_OPERATING_MEMORY.md](C:/Users/Маша/Documents/My_Project/ecology/13_PROJECT_HISTORY_AND_OPERATING_MEMORY.md)
  Отдельная операционная история проекта.

- [14_INFRASTRUCTURE_MAP.md](C:/Users/Маша/Documents/My_Project/ecology/14_INFRASTRUCTURE_MAP.md)
  Этот документ.

## 4. Слой рыночной и продуктовой логики

### Назначение

Хранит, что именно продаётся и почему.

### Папки и файлы

- [stages/](C:/Users/Маша/Documents/My_Project/ecology/stages)
  История сужения проекта по этапам:
  - market scan
  - strategy
  - validation
  - execution layer

- [tracks/](C:/Users/Маша/Documents/My_Project/ecology/tracks)
  Отдельные продуктовые и рыночные треки:
  - Waste
  - ROP
  - Auto
  - Partners
  - Expansion

- [offers/](C:/Users/Маша/Documents/My_Project/ecology/offers)
  Описания офферов по основным трекам.

- [05_SOURCES.md](C:/Users/Маша/Documents/My_Project/ecology/05_SOURCES.md)
  Важные рыночные и нормативные ссылки.

## 5. Слой продаж и операторской работы

### Назначение

Хранит всё, что нужно для ручной продажи и обработки лидов.

### Основные элементы

- [04_PIPELINE.csv](C:/Users/Маша/Documents/My_Project/ecology/04_PIPELINE.csv)
  Основная таблица лидов и статусов.

- [accounts/](C:/Users/Маша/Documents/My_Project/ecology/accounts)
  Списки целевых компаний и партнёров.

- [templates/](C:/Users/Маша/Documents/My_Project/ecology/templates)
  Шаблоны:
  - first response
  - pricing logic
  - proposal
  - outreach
  - scoring

- [meetings/](C:/Users/Маша/Documents/My_Project/ecology/meetings)
  Шаблоны фиксации звонков и возражений.

### Как это используется

Поток работы:

1. Лид попадает в intake или находится вручную.
2. Лид фиксируется в `04_PIPELINE.csv`.
3. По лидy используется template для первого ответа.
4. Дальше идёт fit-check.
5. Потом scope / proposal / setup.

## 6. Слой внешнего MVP-сайта

### Назначение

Это внешний вход для клиента.
Он объясняет оффер и переводит человека в заявку.

### Папка

- [mvp-site/](C:/Users/Маша/Documents/My_Project/ecology/mvp-site)

### Основные файлы

- [mvp-site/index.html](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/index.html)
  Главный landing page.

- [mvp-site/styles.css](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/styles.css)
  Стили лендинга.

- [mvp-site/privacy.html](C:/Users/Маша/Documents/My_Project/ecology/mvp-site/privacy.html)
  Политика обработки персональных данных.

- изображения и логотипы
  - фоновые картинки
  - logo
  - визуальные элементы

### Что делает сайт

Сайт:

- показывает оффер;
- даёт CTA;
- собирает заявку через форму;
- передаёт данные в Apps Script.

## 7. Слой intake и внешних сервисов

### Внешние сервисы

- Google Apps Script
- Google Sheets
- GitHub
- Git

### Как работает intake

Цепочка:

1. Пользователь заполняет форму на `mvp-site/index.html`
2. JS собирает payload
3. payload уходит в Google Apps Script endpoint
4. Apps Script пишет заявку в Google Sheets

### Какие поля идут из формы

- company
- contact
- emailOrPhone
- problem

### Особое замечание

Поле `emailOrPhone` уже требовало точечного исправления в Apps Script, чтобы телефоны с `+375...` не превращались в `#ERROR!` в Google Sheets.

## 8. Слой client execution

### Назначение

Это внутренняя ручная инфраструктура под реального клиента.

### Папка

- [clients/](C:/Users/Маша/Documents/My_Project/ecology/clients)

Сейчас внутри есть тестовый прогон:

- [clients/2026-04-10-test-ooo-paketservis](C:/Users/Маша/Documents/My_Project/ecology/clients/2026-04-10-test-ooo-paketservis)

### Структура одного клиента

- `00_admin`
- `01_raw_documents`
- `02_analysis`
- `03_client_output`
- `04_setup_working`
- `05_expert_review`
- `06_final_output`
- `07_communications`

### Что это даёт

Эта структура нужна, чтобы:

- не терять документы;
- отделять сырой вход от анализа;
- отделять внутренние записи от клиентских deliverables;
- проводить fit-check и setup руками, но одинаково.

## 9. Архивный слой

### Назначение

Хранит историю происхождения проекта из чатов и ранних веток логики.

### Папка

- [archive/](C:/Users/Маша/Documents/My_Project/ecology/archive)

### Ключевой файл

- [archive/00_CHAT_ARCHIVE_INDEX.md](C:/Users/Маша/Documents/My_Project/ecology/archive/00_CHAT_ARCHIVE_INDEX.md)

Он нужен, чтобы не потерять происхождение решений и при этом не держать всё только в истории сообщений.

## 10. Git и репозиторная инфраструктура

### Локально

В проекте инициализирован git.

Что есть:

- локальный git-репозиторий
- ветка `main`
- первый коммит `init`

### Удалённо

GitHub-репозиторий:

- `ktserakhava-beep/enotdoc-site`

### Зачем это нужно

- не потерять проект;
- иметь историю изменений;
- иметь точку публикации;
- держать проект в дисциплине.

## 11. Главные зависимости проекта

### Без чего проект может жить

- без SaaS;
- без CRM;
- без сложного backend;
- без большой автоматизации.

### Без чего проект не может жить

- без operator-first файловой системы;
- без pipeline;
- без offer logic;
- без работающего intake;
- без ручного fit-check;
- без реальных клиентов.

## 12. Как двигаются данные в проекте

### Входящий поток

1. клиент приходит через сайт или outbound
2. оставляет заявку или отвечает вручную
3. данные попадают в intake
4. данные заносятся в pipeline

### Операторский поток

1. создаётся кейс клиента
2. собираются raw documents
3. запускается checklist
4. собирается fit-check report
5. выносится verdict

### Delivery поток

1. если кейс fit
2. запускается setup
3. собираются client deliverables
4. затем запускается monthly support

## 13. Главный принцип инфраструктуры

Инфраструктура проекта специально сделана лёгкой.

Её логика:

- минимум сложных систем;
- максимум управляемости;
- файлы как память;
- таблицы как рабочий слой;
- сайт как вход;
- оператор как центр выполнения.

Это не временный недостаток.
Это сознательная архитектура раннего MVP.

## 14. Что важно не перепутать

- `mvp-site/` не равен всему проекту
- GitHub-репозиторий не равен бизнесу
- intake не равен продаже
- fit-check не равен setup
- setup не равен support

Настоящая инфраструктура проекта — это вся связка:

- стратегия
- оффер
- pipeline
- templates
- landing
- intake
- client folders
- execution layer

Только вместе они дают проект, которым можно управлять.
