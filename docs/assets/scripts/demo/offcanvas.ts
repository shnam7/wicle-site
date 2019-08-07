
$('input[name=mode]').change( (e)=>{
    let $radio = $(e.currentTarget);
    if ($radio.prop('checked')) $('[data-control*=wz-control-]').each((index, element)=>{
        let $el = $(element);
        $el.data('mode', $(e.currentTarget).attr('value'));
    });
}).trigger('change');;
