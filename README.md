# Parrit
Software development pairing management

[![Build Status](https://travis-ci.org/Pinwheeler/Parrit.svg?branch=master)](https://travis-ci.org/Pinwheeler/Parrit)

# Core Contributors
Big shoutout to the following people for helping to guide the direction that Parrit took. Core contributors also please feel free to add others to the core contributor list for those who significantly shape the direction of Parrit.

- [Darcie Fitzpatrick](mailto:dfitzpatrick@pivotal.io)
- [Joseph Greubel](mailto:jgreubel@pivotal.io)
- [Cat Zhang](mailto:czhang@pivotal.io)
- [Sylvia Lai](mailto:slai@pivotal.io)

# Tech Stack
- Maven
- Spring.io
- React.js
- Browserify
- Interact.js

# Installation

Clone into a new repo, cd into that folder

Make sure Ruby/Rake/Sass are install
```
gem install rake
gem install sass
```

```
$ npm install
$ rake build
$ rake spec
```

Before running tests make sure that a database called test exists
```
createdb test
```

# Running Locally

Build the static (JS and CSS) before attempting to run the application
```
grunt build
```

_This assumes that you have a psql database on port 5432 with username pivotal and no password._

If all of the tests pass, run the project as a spring project using your preferred method

# Want to contribute?

We have a [tracker backlog](https://www.pivotaltracker.com/n/projects/1504460), feel free to pick up a story. If you want need clarification on it and/or want help pointing it, shoot me an email anthonydreessen@gmail.com

# Set Environment Variables

To configure Google Analytics, set your tracking ID:

```
GOOGLE_ANALYTICS_TRACKING_ID=UA-XXXXXXXX-X
```

# Deploy to CloudFoundry

```
$ rake build
$ mvn package
$ cf push
```

