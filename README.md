# Parrit
Software development pairing management

[![Build Status](https://travis-ci.org/Pinwheeler/Parrit.svg?branch=master)](https://travis-ci.org/Pinwheeler/Parrit)

# Core Contributors
Big shoutout to the following people for helping to guide the direction that Parrit took. Core contributors also please feel free to add others to the core contributor list for those who significantly shape the direction of Parrit.

- [Darcie Fitzpatrick](mailto:darciefitzpatrick@gmail.com)
- [Joseph Greubel](mailto:jgreubel@pivotal.io)
- [Cat Zhang](mailto:czhang@pivotal.io)
- [Sylvia Lai](mailto:slai@pivotal.io)
- [Michael Oleske](mailto:moleske@pivotal.io)

# Tech Stack
- Gradle
- Spring.io
- React.js
- Browserify
- Interact.js

# Installation

Clone into a new repo, cd into that folder

```
$ npm install
$ ./gradlew
```

**Before running tests make sure that a database called test exists**

# Running Locally

Build the static (JS and CSS) before attempting to run the application
```
$ ./gradlew jsBuild
```

_This assumes that you have a psql database server on port 5432 with username pivotal and no password and database name pivotal._

If all of the tests pass, run the project as a spring project using your preferred method. To run the spring boot app locally using gradle, enter the following
```
$ ./gradlew bootRun
```

# Want to contribute?

We have a public [Tracker backlog](https://www.pivotaltracker.com/n/projects/1504460) of prioritized stories. If you want to pick one we can add you to the project, just send an email to anthonydreessen@gmail.com or any of the contributors listed above and we will make you a member. If you need clarification on the stories and/or want help pointing feel free to reach out. 

# Set Environment Variables

To configure Google Analytics, set your tracking ID:

```
GOOGLE_ANALYTICS_TRACKING_ID=UA-XXXXXXXX-X
```

# Deploy to CloudFoundry

```
$ ./gradlew deploy
```

