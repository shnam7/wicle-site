---
layout: default
title: Home
frontpage: true
---

# Introduction
Wicle is a modular component library for web development. It has rich collection of scss mixin's and functions, and some typescript library for web front-end developers.

# Installation
```sh
npm i wicle --save-dev
```

# How to use
### Prepare Wicle configuration file: _wicle.config.scss
```scss
@import "node_modules/wicle/scss/wdk/constants";

//--- wdk hooks: this should come before importing wdk
@mixin wdk-hook-variables-init() {
  //$w-font-size:           16px !global;
  //$w-color-theme:       $w-color-french-rose !global;
}


//---------------------------------------------------------
//  Config wicle collection
//  * init hooks: called before default variables are set
//---------------------------------------------------------
@mixin w-hook-reset-init() {
}

@mixin w-hook-navbar-init() {
  $key: 'w-navbar';
  @include ssv($key, 'brand/font-family', $w-font-sans, true);
}

@mixin w-hook-nav-init() {
  //$key: 'w-nav';
  //@include ssv($key, 'item-wrapper/fg', $w-color-shalimar);
}


@mixin w-hook-layout-default-init() {
  $key: 'w-layout-default';
  @include ssv($key, 'page/font-family', $w-font-roboto, true);
}
```
In wicle configuration file, you should not import any other wicle modules except *wdk/constants*.
Or, the configuration may not take effect correctly.

### Create style file importing the configuration: app.scss
wdk is scss utility library to help scss programming.
```scss
@import "wicle.config";
@import "node_modules/wicle/scss/wicle";

// ...

```
