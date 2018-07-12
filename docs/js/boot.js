SystemJS.config({
  baseURL: '/js',
});

SystemJS.import("wicle.min.js").then(()=>{
  SystemJS.import("docs.min.js")
    .then((module)=>{
      SystemJS.import('docs');

      let page = document.getElementById('l-page');
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
