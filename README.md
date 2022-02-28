# aframe-petri-net-sim

Base for creating virtual reality experiences on the Web using A-Frame. #aframevr #webvr. Simulating scene logic with generated CPN tools diagram based on Petri Nets.

## Prerequisites

This project requires NodeJS (version 8 or later) and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
6.4.1
v8.16.0
```

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/ORG/PROJECT.git
$ cd PROJECT
```

To install and set up the library, run:

```sh
$ npm install
```

## Usage

### Serving the app

To build project a run server run:

```sh
$ npm start
```

With help of [LarvelMix](https://laravel-mix.com/docs/6.0/installation) app gonna bundle the application to the dist folder and then start up the development server.

### Serving the app for development

To build project a run dev server with [BrowserSync](https://browsersync.io/docs/options/) functionality run:

```sh
$ npm run dev
```

This will leverage webpack's ability to watch your filesystem for changes. This command runs 2 scripts in 2 separate Commandline windows sequentially.

```sh
$ node server.js
```

This command starts up the development server.

```sh
$ npx mix
```

npx mix watch command will watch your filesystem for changes. Now, each time you update a file, Mix will automatically recompile the file and rebuild your bundle.
