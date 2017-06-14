/**
 * Created by kds on 13.06.2017.
 */
function findSitInDOM(venue, row, place) {
    var selectPlace = document.querySelector('.' + venue);

    if (!selectPlace) {
        selectPlace = document.querySelector('[data-section="' + venue + '"]');
    };

    selectPlace.querySelectorAll('[data-row="' + row + '"]').forEach(function (element) {
        if (element.querySelector('[data-place="' + place + '"]')) {
            selectPlace = element.querySelector('[data-place="' + place + '"]');
        }
    });

    //diffent frontend halls structure
    if (selectPlace && selectPlace.tagName === 'UL') {
        selectPlace = selectPlace.querySelector('[data-place="' + place + '"]');
    }
    return selectPlace;
};
