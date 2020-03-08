/**
 * docs main script
 */

/// <reference path="../../../dist/js/wicle.d.ts" />
import * as Parallax from 'wicle/ui/parallax';


// Wicle.Nav.start('.w-nav', {
//   // parentLink: true,  // enable link of parent item in accordion menu
// });


import { offcanvas } from 'wicle/ui/offcanvas';
import { nav } from 'wicle/ui/nav';
import { mqStart } from 'wicle/ui/media-query';


offcanvas();
nav();
mqStart();

let parallax = new Parallax.Container(<any>window, 0.7);
parallax.addSurface(new Parallax.Surface(<any>document.getElementById('surface-shadow'), 0.5));
