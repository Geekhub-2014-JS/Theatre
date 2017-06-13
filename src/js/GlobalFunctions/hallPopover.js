function setSitsPopover () {
    $('[data-toggle="popover"]').popover({
        trigger: 'hover',
        placement: 'top',
        content: function () {
            var el = $(this);

            return el.parents("*[data-section]").attr("data-section")+", "+el.parents("*[data-row]").attr("data-row") +", "+ el.attr('data-place')
        }
    });
};