///<amd-module name="demo/parallax"/>

import Wicle from 'wicle';

const SURFACE_COUNT   = 5;

$(function () {
  let parallax = new Wicle.Parallax.Container(<any>window, 0.7);
  // let parallax = new Wicle.Parallax.Container(document.getElementById('l-site-container'), 0.7);

  for (let i=1; i<=SURFACE_COUNT; ++i)
    parallax.addSurface(new Wicle.Parallax.Surface(<any>document.getElementById('surface'+i)))
});
