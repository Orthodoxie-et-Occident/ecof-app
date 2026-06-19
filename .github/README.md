<p align="center">
  <img src="ecof.png" alt="ECOF" width="300"/>
</p>

<p align="center">
  Official mobile application of the <em>Eglise Catholique Orthodoxe de France</em>.
</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-3.4.7-blue" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green" />
  <img alt="Built with Vue" src="https://img.shields.io/badge/Vue-3-4FC08D?logo=vuedotjs&logoColor=white" />
  <img alt="Built with Ionic" src="https://img.shields.io/badge/Ionic-Vue%208-3880FF?logo=ionic" />
  <img alt="Capacitor" src="https://img.shields.io/badge/Capacitor-8-119EFF?logo=capacitor" />
</p>

---

## About

ECOF app is built to help the faithful and visitors of the _Eglise Catholique Orthodoxe de France_, stay connected with parish life. It brings together a parish directory and map, a liturgical calendar, and other community features in a single cross-platform app.

The app is built with **Ionic Vue** and **Capacitor**, and ships as a web app as well as native Android and iOS builds. It consumes the [ecof-api](https://github.com/jrc0de/ecof-api) backend for parish data and liturgical calendar feeds.

## Architecture

```mermaid
flowchart LR
    DB[(MySQL)] --> API["ecof-api"]
    API --> APP["ecof-app"]
    APP --> WEB["Web"]
    APP --> AND["Android"]
    APP --> IOS["iOS"]
 
    classDef db fill:#4A6FA5,stroke:#4A6FA5,color:#fff
    classDef api fill:#6E7681,stroke:#6E7681,color:#fff
    classDef app fill:#B3995B,stroke:#B3995B,color:#fff
    classDef device fill:#D4B483,stroke:#D4B483,color:#fff
 
    class DB db
    class API api
    class APP app
    class WEB,AND,IOS device
```

## Features

- 📍 **Parish directory & map** — find parishes near you, powered by [MapLibre GL](https://maplibre.org/) and offline-friendly [Protomaps](https://protomaps.com/) vector tiles
- ☦ **Offices**
- 📅 **Liturgical calendar**
- 📱 **Cross-platform** — single codebase for web, Android, and iOS via Capacitor

## Tech Stack

| Layer                | Technology                                                                                          |
| -------------------- | --------------------------------------------------------------------------------------------------- |
| Framework            | [Vue 3](https://vuejs.org/) + [Ionic Vue](https://ionicframework.com/docs/vue/overview)             |
| Native runtime       | [Capacitor](https://capacitorjs.com/) (Android & iOS)                                               |
| Mapping              | [MapLibre GL](https://maplibre.org/) + [Protomaps](https://docs.protomaps.com/)                     |
| Linting / formatting | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) + [oxfmt](https://oxc.rs/)                    |
| Backend              | [ecof-api](https://github.com/jrc0de/ecof-api) ([Hono](https://hono.dev/) + [Bun](https://bun.sh/)) |
| Database             | MySQL                                                                                               |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended) with npm, **or** [Bun](https://bun.sh/) as an alternative runtime/package manager
- For native builds: [Android Studio](https://developer.android.com/studio) and [Xcode](https://developer.apple.com/xcode/)

### Installation

```bash
git clone https://github.com/<your-org>/ecof-app.git
cd ecof-app
npm install
```

> Using Bun instead? Run `bun install` and replace `npm run <script>` with `bun run <script>` in the commands below.

### Development

Run the app in the browser with hot reload:

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Mobile (Capacitor)

After building the web assets, sync them to the native projects:

```bash
npm run build
npx cap sync
```

Then open the native project in the respective IDE:

```bash
npx cap open android
npx cap open ios
```

App icons and splash screens are managed via [`@capacitor/assets`](https://github.com/ionic-team/capacitor-assets).

## Linting & Formatting

```bash
npm run lint        # check for lint issues
npm run lint:fix     # auto-fix lint issues
npm run fmt          # format code
npm run fmt:check    # check formatting without writing
```

## Related Projects

- [ecof-api](https://github.com/jrc0de/ecof-api) — backend API (Hono) providing parishes calendars (iCal), liturgical calendar, and other content...

## License

This project is licensed under the [MIT License](../LICENSE).
