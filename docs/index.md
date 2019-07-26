---
layout: default
title: Home
frontpage: true
---

# Introduction
Wicle is a modular component library for web front-end development. It provides a collection of web components in scss and typescript modules.

# Installation
```sh
npm i wicle --save-dev
```

# How to use
First create a configuration file for your site, like this:

```scss
// file: _site.config.scss

@import "wdk";    // Make WDK constants and tools available

//--- Define site-wide variables
// $site-page-width: 960px;


//--- Theme Configuration
// select one of Wicle predefined themes
// @import "wicle/themes/amaranth";
// @import "wicle/themes/harley-davison-orange";
// @import "wicle/themes/purple";
// @import "wicle/themes/teal";

// Or, define custom theme
// $w-theme-color:           $w-color-amaranth;


//-----------------------------------------------
//  Wicle custom config
//-----------------------------------------------
// $w-font-size:           15px;
// $w-site-page-width:     $site-page-width;

// use mixin to avoid unnecessaty global variable definition($key)
@mixin wicle-custom-config {
//--- navbar
// $key: 'w-navbar';
// @include ssv($key, 'brand/font-family', $w-font-sans-default, true);

//--- nav
//$key: 'w-nav';
//@include ssv($key, 'item-wrapper/fg', $w-color-shalimar);

//--- layout
// $key: 'w-layout';
// @include ssv($key, 'page/font-family', $w-font-roboto, true);
}
@include wicle-custom-config();


//--- Finally, include Wicle config
@import "wicle.config";
```


Now, create site style file, including the configuration.

```scss
// file: my-site-styles.scss:

// Include the configuration file, so that it takes precedence. And then, include Wicle.
@import "site.config";
@import "wicle";    // import Wicle components

//--- Enable Wicle optional features if necessary (optional class generation)
@include w-button-modifier-color-scheme();
@include w-panel-modifier-color-scheme();

// Now you are ready to add your own styles from here.
// ...

```
