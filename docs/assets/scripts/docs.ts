///<amd-module name="docs"/>

import Wicle from 'wicle';

Wicle.nav('.w-nav', {
  // parentLink: true,  // enable link of parent item in accordion menu
});

// let baseUrl = SystemJS.getConfig().baseURL;
// // let moduleName = baseUrl + "docs";
// let moduleName = SystemJS.resolveSync("docs");
// console.log("moduleName=", moduleName);
//
// console.log('A2', SystemJS.getConfig());
// console.log('A2', SystemJS.registry);
// console.log('A2', SystemJS.registry.has(moduleName));
//
// for (let entry in System.registry.entries())
//   console.log('Entry=', entry);


// ["demo/parallax"]
//   .forEach((moduleName)=>{
//     if (SystemJS.registry.get(moduleName)) {
//       console.log('AAAAAAA', moduleName);
//       SystemJS.import('./js/demo/' + moduleName);
//     }
//   });