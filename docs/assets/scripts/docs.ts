/**
 * docs main script
 */

/// <reference path="../../../dist/js/wicle.d.ts" />

// Wicle.Nav.start('.w-nav', {
//   // parentLink: true,  // enable link of parent item in accordion menu
// });


import { offcanvas } from 'wicle/ui/offcanvas';
import { nav } from 'wicle/ui/nav';
import { mqStart } from 'wicle/ui/media-query';


offcanvas();
nav();
mqStart();
