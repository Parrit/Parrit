# Parrit
A historical recommendation engine for daily pair rotation management, with an interactive visual aide of each pairing team.
Visit the app: http://parrit.cfapps.io/

[![Build Status](https://travis-ci.org/Pinwheeler/Parrit.svg?branch=master)](https://travis-ci.org/Pinwheeler/Parrit)

# Core Contributors
Big shoutout to the following people for helping to guide the direction that Parrit took. Core contributors also please feel free to add others to the core contributor list for those who significantly shape the direction of Parrit.

- [Anthony Dreessen](mailto:anthonydreessen@gmail.com) - Product Owner, Product Management + Full-stack Development
- [Darcie Fitzpatrick](mailto:darciefitzpatrick@gmail.com) - Product Design, Product Management + User Research
- [Joseph Greubel](mailto:jgreubel@pivotal.io) - Front-end Development, Back-end Development
- [Cat Zhang](mailto:czhang@pivotal.io) - Front-end Development, Product Design
- [Sylvia Lai](mailto:slai@pivotal.io) - Product Design, Product Management + User Research
- [Michael Oleske](mailto:moleske@pivotal.io) - Back-end Development

# Tech Stack
- Gradle
- Spring.io
- React.js
- Browserify
- Interact.js

# Installation

Clone into a new repo, cd into that folder

## Create databases

```bash
psql postgres
```

```psql
create user pivotal with password '';
create database test owner pivotal;
create database pivotal owner pivotal;
```

# Install dependencies
```
$ npm install
```

# Run all the tests

```
$ ./gradlew test
```

# Running the application locally

Build the static (JS and CSS) before attempting to run the application
```
$ ./gradlew jsBuild
```

If all of the tests pass, run the project as a spring project using your preferred method.
To run the spring boot app locally using gradle, enter the following
```
$ ./gradlew bootRun
```

You should be able to access the application at http://localhost:8080

# Want to contribute?

We have a public [Tracker backlog](https://www.pivotaltracker.com/n/projects/1504460) of prioritized stories.
If you want to pick one we can add you to the project, just send an email to parrit@pivotal.io
or any of the contributors listed above and we will make you a member.
If you need clarification on the stories and/or want help pointing feel free to reach out.

# Set Environment Variables

To configure Google Analytics, set your tracking ID:

```
GOOGLE_ANALYTICS_TRACKING_ID=UA-XXXXXXXX-X
```

# Deploy to CloudFoundry

1. Build the app first!
```
$ ./gradlew build
```

2. Push the test app
```
$ cf push parrit-test
```

3. Push the prod app
```
$ cf push parrit
```
