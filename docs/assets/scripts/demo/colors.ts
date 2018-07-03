///<amd-module name="demo/colore"/>

$(()=>{
  $('.color-items').find('h5').each((index, el)=>{
    let $el = $(el);
    let text = $el.text();
    let pos = text.indexOf('#');
    let bg = text.substr(pos, 7);
    $el.text(text.slice(0, pos+7));

    // ref: https://24ways.org/2010/calculating-color-contrast
    let r = parseInt(bg.substr(1,2),16);
    let g = parseInt(bg.substr(3,2),16);
    let b = parseInt(bg.substr(5,2),16);
    let yiq = ((r*299)+(g*587)+(b*114))/1000;
    let fg = (yiq >= 256*0.6) ? 'black' : 'white';

    $el.wrap("<div/>")
      .addClass('color-item');
    $el.css('color', fg);
    $el.css('background', bg);
  });
});
