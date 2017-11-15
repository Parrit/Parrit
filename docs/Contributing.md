# Contributing

Please email us at parrit@pivotal.io so that we can add you to the [Parrit Slack](https://parrit.slack.com) and we will point you in the right
direction!

We have a public [Tracker backlog](https://www.pivotaltracker.com/n/projects/1504460) of prioritized stories.
If you want to pick one we can add you to the project, just send an email to parrit@pivotal.io
or any of the core contributors and we will make you a member. If you need clarification on the stories 
and/or want help pointing feel free to reach out.

Please submit a pull request when you are done!

## Installation

Clone the repository: `git clone https://github.com/Parrit/Parrit.git`

Change into the new directory: `cd Parrit`

### Create database

```bash
psql postgres
```

```psql
create database local_parrit;
```

### Build the app

Download dependencies for the static resources (JS and CSS)

```bash
cd frontend
npm install
```

Build the java app

```bash
./gradlew assemble
```

### Run all the tests

```bash
./gradlew test
```

### Starting the application locally

If all of the tests pass, run the project as a spring project using your preferred method.
To run the spring boot app locally using gradle, execute the following

```bash
./gradlew bootRun
```

You should be able to access the application at `http://localhost:8080`
