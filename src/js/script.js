$(document).ready(function () {

    $('#search').on('keyup', function () {
        let search = $(this).val();

        let order = $('.order-title').attr('data-order');

        $(order).each(function () {
            console.log($(this));
        });
    });

});
