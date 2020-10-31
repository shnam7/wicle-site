// server baseURL: shnam7.github.io/wicle
baseUrl = (window.location.hostname === 'localhost') ? '/js/' : '/wicle/js/';

// importmap script
// const im = document.createElement('script');
// im.type = 'importmap';
// im.textContent = JSON.stringify({
// 	imports: {
// 		'wicle': baseUrl + '/wicle.min.js',
// 	}
// });
// document.currentScript.after(im);

// System.config({
//   baseURL: baseUrl
// });

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
