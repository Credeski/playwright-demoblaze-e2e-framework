# Playwright DemoBlaze E2E Framework

[![CI](https://github.com/Credeski/playwright-demoblaze-e2e-framework/actions/workflows/playwright.yml/badge.svg)](https://github.com/Credeski/playwright-demoblaze-e2e-framework/actions)
![Playwright](https://img.shields.io/badge/Playwright-1.59-45ba4b?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript)
![License](https://img.shields.io/badge/license-ISC-blue)

A **Playwright + TypeScript** end-to-end test automation framework for [DemoBlaze](https://www.demoblaze.com/), built using the **Page Object Model (POM)**, custom fixtures, reporting, and GitHub Actions CI/CD..

> Built by [Credeski](https://github.com/Credeski) as a portfolio project to demonstrate SDET / QA automation practice: framework design, test strategy, CI integration, and reporting of results.

---

## Why this project exists

Most portfolio automation repos are a single spec file with a few `page.click()` calls. This one is built the way I'd want a framework to look on day one of a job: reusable page objects, typed fixtures instead of copy-pasted setup, reporting that a non-technical stakeholder could read, and a CI pipeline that actually gates on results instead of just running tests into the void.

## What's covered

| Suite | Scope |
|---|---|
| **Login** | Valid/invalid credentials, session state, error handling |
| **Product Browsing** | Category filters, product detail navigation, pagination |
| **Cart** | Add/remove items, quantity/price persistence across navigation |
| **Checkout** | Order form validation, purchase confirmation flow |

All suites run against **Chromium** in CI on every push/PR.
All suites run against Chromium in GitHub Actions CI.
Cross-browser execution is supported locally through Playwright projects.

## Tech stack

- **[Playwright](https://playwright.dev/)** (TypeScript) — browser automation
- **Page Object Model** — one class per page/component, tests stay declarative
- **Custom fixtures** — page objects and test data injected via `test.extend`, no manual instantiation in specs
- **Playwright HTML Reporter** — quick local triage
- **GitHub Actions** — CI on every push/PR, cross-browser matrix

## Getting started

**Prerequisites:** Node.js 18+, npm

```bash
git clone https://github.com/Credeski/playwright-demoblaze-e2e-framework.git
cd playwright-demoblaze-e2e-framework
npm install
npx playwright install --with-deps
cp .env.example .env
```

### Running tests

```bash
npm test                  # all suites, all browsers
npm run test:chromium     # Chromium only
npm run test:firefox      # Firefox only
npm run test:webkit       # WebKit only
npm run test:headed       # headed mode, useful for debugging
```

### Reports

```bash
npm run report            # open Playwright's HTML report
npm run allure:generate   # build Allure report from results
npm run allure:open       # open Allure report in browser
```

## CI/CD

Every push and pull request triggers the GitHub Actions workflow, which installs browsers, runs the full suite across all three engines, and publishes the HTML/Allure reports as build artifacts. See the [Actions tab](https://github.com/Credeski/playwright-demoblaze-e2e-framework/actions) for run history.

## Known Limitations

The framework was tested across Chromium, Firefox, and WebKit during development. Intermittent failures were observed in Firefox and WebKit due to instability within the DemoBlaze demo environment, particularly around cart synchronization and dynamic page loading.

To maintain a stable CI pipeline, GitHub Actions currently executes against Chromium while preserving support for local cross-browser execution.

This behavior is documented intentionally, as distinguishing environmental flakiness from genuine automation or application defects is an important QA engineering practice.

## Future Improvements

- API-level setup and teardown for improved test isolation
- Visual regression testing for key user journeys
- Enhanced synchronization strategies for dynamic content
- Parallel execution optimization in CI

## Author

**Credeski**
GitHub: [@Credeski](https://github.com/Credeski)

---

*This project is part of my QA automation portfolio, built to demonstrate framework architecture, cross-browser test design, and CI/CD integration skills for SDET roles.*