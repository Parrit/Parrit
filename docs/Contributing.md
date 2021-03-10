# Contributing

Please email us at parrithelp@gmail.com so that we can add you to the [Parrit Slack](https://parrit.slack.com) and we will point you in the right
direction!

We have a public [Tracker backlog](https://www.pivotaltracker.com/n/projects/1504460) of prioritized stories.
If you want to pick one we can add you to the project, just send an email to parrit@pivotal.io
or any of the core contributors and we will make you a member. If you need clarification on the stories 
and/or want help pointing feel free to reach out.

Please submit a pull request when you are done!

## Prerequisites

Make sure these are installed on your machine:

* Java 8
* Node 8 with NPM 5
* PostgreSQL 9.6

## Installation

Clone the repository: `git clone https://github.com/Parrit/Parrit.git`

Change into the new directory: `cd Parrit`

### Creating the local database

```bash
createdb local_parrit;
```

### Building the app

```bash
./gradlew build
```

### Running the tests

```bash
./gradlew test
```

### Starting the application locally

```bash
./gradlew bootRun
```

You should be able to access the application at `http://localhost:8080`
