//
// Wicle scripts main
//

///<amd-module name="wicle" />

import MediaQuery from "./core/MediaQuery";
import Nav from "./ui/Nav";
import * as Parallax from "./ui/Parallax"
import {Options} from "./core/types";

const mq: MediaQuery = new MediaQuery();

const Wicle = {
  get mq() { return mq; },
  nav: (selector: string, options: Options = {})=>{ Nav.start(selector, options)},
  Parallax: Parallax,
};

export default Wicle;
