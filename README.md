[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Parrit/Parrit/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Parrit/Parrit.svg)](https://github.com/Parrit/Parrit/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Parrit/Parrit.svg)](https://github.com/Parrit/Parrit/network)
[![Open Issues](https://img.shields.io/github/issues/Parrit/Parrit.svg)](https://github.com/Parrit/Parrit/issues)

# Parrit

A historical recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.

> The original [parrit.io](https://parrit.io/) app has been archived — please join the new spiritual successor at **[parrit.org](https://parrit.org/)**!

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Running Server Locally](#running-server-locally)
- [Running Tests](#running-tests)
- [Core Contributors](#core-contributors)
- [Want to Contribute?](#want-to-contribute)
- [License](#license)

## Tech Stack

- **Backend:** Spring Boot (Java)
- **Frontend:** ReactJS + Webpack
- **Build Tool:** Gradle
- **Database:** PostgreSQL (migrations via Flyway)

## Prerequisites

Before running Parrit locally, make sure you have the following installed:

| Tool | Notes |
|------|-------|
| Java JDK | Compatible with the project's `sourceCompatibility` (see `build.gradle`) |
| PostgreSQL | Used for persistent storage |
| Node.js & npm | Required to build/run the React frontend |
| Gradle Wrapper | Included in the repo (`./gradlew`) — no separate Gradle install needed |

## Running Server Locally

1. **Create a PostgreSQL user and database:**

   ```bash
   createuser parrit --pwprompt   # set password to "parrit"
   createdb local_parrit -O parrit
   ```

2. **Run database migrations:**

   ```bash
   ./gradlew migrate
   ```

3. **Start the application:**

   ```bash
   ./gradlew bootRun
   ```

4. **Access the app:**

   Open [http://localhost:8080](http://localhost:8080) in your browser.

### Troubleshooting

- **Connection refused / FlywayException:** confirm PostgreSQL is running and the `parrit` user/database exist with the credentials above.
- **Port already in use:** stop any other process bound to port `8080`, or update the port configuration in `application.properties`.
- **Frontend assets not loading:** make sure dependencies are installed inside the `frontend` directory:

  ```bash
  cd frontend
  npm install
  ```

## Running Tests

Backend tests (also runs the frontend test suite via Gradle):

```bash
./gradlew test
```

Frontend tests and linting only:

```bash
cd frontend
npm test
npm run lint
```

## Core Contributors

Big shoutout to the following people for helping to guide the direction that Parrit took. Core contributors, please feel free to add others to this list for those who significantly shape the direction of Parrit.

- [Anthony Dreessen](mailto:anthonydreessen@gmail.com) — Product Owner, Product Management + Full-stack Development
- [Darcie Fitzpatrick](mailto:darciefitzpatrick@gmail.com) — Product Design, Product Management + User Research
- [Cat Zhang](mailto:cielzee@gmail.com) — Product Management + Product Design
- [Joseph Greubel](mailto:joegreubel1@gmail.com) — Front-end Development, Back-end Development
- [Michael Oleske](mailto:moleske@pivotal.io) — Back-end Development

📺 Watch the tech talk on the making of Parrit: [youtu.be/YVMuMK5Ru_A](https://youtu.be/YVMuMK5Ru_A)

## Want to Contribute?

We'd love your help! See the [Contributing Guide](./docs/Contributing.md) for setup details, coding conventions, and how to submit a pull request.

## License

This project is licensed under the [MIT License](./LICENSE).
