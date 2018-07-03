---
layout: default
title: Home
frontpage: true
---

Wicle is a modular component library for web development. It has rich collection of scss mixin's and functions, and some typescript library for web front-end developers.

# Installation

```sh
npm i wicle --save-dev
```

```js
const gbm = require('gulp-build-manager');

const javaScript = {
  buildName: 'javaScript',
  builder: 'GJavaScriptBuilder',
  src: ['assets/scripts/js/**/*.js'],
  dest: '_build/js',
  outFile: 'sample.js',
  buildOptions: {
    minify: true,
    sourceMap: true
  },
};

gbm({
  systemBuilds: {
    build: javaScript,
    clean: ['_build'],
    default: ['@clean', '@build'],
  }
});
```


## Wicle Development Kit (WDK)
wdk is scss utility library to help scss programming.
```scss
@import "wdk/wdk";
```

## Wicle - Wicle
Web front-end components
