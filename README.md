# Parrit
Software development pairing management

# Tech Stack
- Maven
- Spring.io
- React.js
- Browserify
- Inteact.js

# Installation

Clone into a new repo, cd into that folder

```$ npm install```
```$ rake browserify```
```$ rake jasmine```

If all of the tests pass, run the project as a spring project using your preferred method

# Want to contribute?

* We have a [tracker backlog](https://www.pivotaltracker.com/n/projects/1504460), feel free to pick up a story. If you want need clarification on it and/or want help pointing it, shoot me an email anthonydreessen@gmail.com
* I need help with setup instructions. If you become a contributor or otherwise clone this repo, please document the things you had to do in order to make it work. I've only done it once on my machine and it was not a new image.

#Gotchas

Browser javascript does not natively support require statements, so we're using a tool called Browserify to essentially compile all of the require statements down into one file. That file can be found at ```src/main/resources/static/built/bundle.js```. The main entry-point to editing this file is ```src/main/resources/static/main.js```. What this all means is that when you make changes to the javascript, you have to run ```rake browserify``` to compile it all and if you're using Spring Tool Suite, you need to refresh the project.
