# Parrit
Software development pairing management

[![Build Status](https://travis-ci.org/Pinwheeler/Parrit.svg?branch=master)](https://travis-ci.org/Pinwheeler/Parrit)

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

_This assumes that you have a psql database on port 5432 with username pivotal and no password._

If all of the tests pass, run the project as a spring project using your preferred method

# Want to contribute?

* We have a [tracker backlog](https://www.pivotaltracker.com/n/projects/1504460), feel free to pick up a story. If you want need clarification on it and/or want help pointing it, shoot me an email anthonydreessen@gmail.com
* I need help with setup instructions. If you become a contributor or otherwise clone this repo, please document the things you had to do in order to make it work. I've only done it once on my machine and it was not a new image.

#Deploy to CloudFoundry

```
$ rake build
$ mvn package
$ cf push <<APP_NAME>> -p target/parrit-<<Version>>.jar
```

