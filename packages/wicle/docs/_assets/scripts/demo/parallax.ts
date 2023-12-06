/**
 * demo - parallax
 */

import * as Parallax from 'wicle/ui/parallax';

const SURFACE_COUNT = 5;

let parallax = new Parallax.Container(<any>window, 0.7);
for (let i = 1; i <= SURFACE_COUNT; ++i)
    parallax.addSurface(new Parallax.Surface(<any>document.getElementById('surface' + i)))

