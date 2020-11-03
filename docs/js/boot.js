// server baseURL: /wicle
var baseUrl = '/wicle/js/';

System.import(baseUrl + 'wicle.min.js').then(() => {
    System.import(baseUrl + "docs.min.js")
        .then((module) => {
            let page = document.getElementsByClassName('l-page')[0];
            if (page.classList.contains('demo-colors'))
                System.import(baseUrl + 'demo/colors.min.js');
            else if (page.classList.contains('demo-divider'))
                System.import(baseUrl + 'demo/divider.min.js');
            else if (page.classList.contains('demo-panel'))
                System.import(baseUrl + 'demo/panel.min.js')
            else if (page.classList.contains('demo-parallax'))
                System.import(baseUrl + 'demo/parallax.min.js')
            else if (page.classList.contains('demo-offcanvas'))
                System.import(baseUrl + 'demo/offcanvas.min.js')
            else if (page.classList.contains('demo-media-query'))
                System.import(baseUrl + 'demo/media-query.min.js')
        });
});

hljs.initHighlightingOnLoad();
