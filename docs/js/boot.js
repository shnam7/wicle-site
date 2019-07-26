// server baseURL: shnam7.github.io/wicle
baseUrl = (window.location.hostname === 'localhost') ? '/js' : '/wicle/js';

SystemJS.config({
  baseURL: baseUrl
});

SystemJS.import("wicle.min.js").then(()=>{
  SystemJS.import("docs.min.js")
    .then((module)=>{
      SystemJS.import('docs');

      let page = document.getElementsByClassName('l-page')[0];
      if (page.classList.contains('demo-colors'))
        SystemJS.import('demo/colors.min.js');
      else if (page.classList.contains('demo-divider'))
        SystemJS.import('demo/divider.min.js');
      else if (page.classList.contains('demo-parallax'))
        SystemJS.import('demo/parallax.min.js')
          .then(()=>SystemJS.import('demo/parallax'));
    });
});

hljs.initHighlightingOnLoad();
