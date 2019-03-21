//Named functions
(function($){
    jQuery.fn.lightTabs = function(options){

        var createTabs = function(){
            tabs = this;
            i = 0;

            showPage = function(i){
                $(tabs).find('.tabs-content').children('div').hide();
                $(tabs).find('.tabs-content').children('div').eq(i).fadeIn(1000);
                $(tabs).find('.tabs-navigation').children('li').removeClass('active');
                $(tabs).find('.tabs-navigation').children('li').eq(i).addClass('active');
            };

            showPage(0);

            $(tabs).find('.tabs-navigation').children('li').each(function(index, element){
                $(element).attr('data-page', i);
                i++;
            });

            $(tabs).find('.tabs-navigation').children('li').click(function(){
                showPage(parseInt($(this).attr('data-page')));
            });
        };
        return this.each(createTabs);
    };
})(jQuery);

//Function initialize request or triggered on the document.ready
$(function () {

    //Functions triggered by resize
    $(window).on('resize', function(){

        //Selects
        if($('.select-main__select').length > 0){
            $('.select-main__select').each(function () {
                if ($(this).data('placeholder')) {
                    var thisDropdownParent = $(this).closest($('.select-main')),
                        thisPlaceholder = $(this).data('placeholder');
                    $(this).select2({
                        dropdownParent: thisDropdownParent,
                        minimumResultsForSearch: Infinity,
                        placeholder: thisPlaceholder
                    });
                } else {
                    var thisDropdownParent = $(this).closest($('.select-main'));
                    $(this).select2({
                        dropdownParent: thisDropdownParent,
                        minimumResultsForSearch: Infinity
                    });
                }
            })
        }
    });

    //Remove the placeholder from the form field when focusing on it
	if($('input,textarea').length > 0){
		$('input,textarea').focus(function () {
			$(this).data('placeholder', $(this).attr('placeholder'))
				.attr('placeholder', '');
		}).blur(function () {
			$(this).attr('placeholder', $(this).data('placeholder'));
		});
	}

    //All inputs with type tel have mask +7 (999) 999 99 99
	if($('input[type=tel]').length > 0){
		$('input[type=tel]').mask('+7 (999) 999 99 99');
	}

	//Selects
    if($('.select-main__select').length > 0){
        $('.select-main__select').each(function () {
            if ($(this).data('placeholder')) {
                var thisDropdownParent = $(this).closest($('.select-main')),
                    thisPlaceholder = $(this).data('placeholder');
                $(this).select2({
                    dropdownParent: thisDropdownParent,
                    minimumResultsForSearch: Infinity,
                    placeholder: thisPlaceholder
                });
            } else {
                var thisDropdownParent = $(this).closest($('.select-main'));
                $(this).select2({
                    dropdownParent: thisDropdownParent,
                    minimumResultsForSearch: Infinity
                });
            }
        })
    }

    //Custom scrollbar
    if($('.scrollbar-inner').length > 0){
        jQuery('.scrollbar-inner').scrollbar();
    }

	//Fixed Header on Desktop
    if($('#header').length > 0){
        var headerHeight = $('#header').outerHeight();
        $( window ).scroll(function() {
            if($(window).scrollTop() > headerHeight) {
                $('body').css('padding-top', headerHeight);
                $('#header').addClass('fixed');
            } else {
                $('body').css('padding-top', '0');
                $('#header').removeClass('fixed');
            }
        });
    }

    //Sliders

    //Tabs
    if ($('#product-tabs').length > 0) {
        $('#product-tabs').lightTabs();
    }

    //Modals
    if($('.popup-with-form').length > 0) {
        $('.popup-with-form').magnificPopup({
            type: 'inline',
            fixedContentPos: false,
            fixedBgPos: true,
            overflowY: 'auto',
            closeBtnInside: true,
            preloader: false,
            focus: '#name',
            midClick: true,
            removalDelay: 300,
            mainClass: 'my-mfp-zoom-in',

            // When elemened is focused, some mobile browsers in some cases zoom in
            // It looks not nice, so we disable it:
            callbacks: {
                beforeOpen: function() {
                    if($(window).width() < 700) {
                        this.st.focus = false;
                    } else {
                        this.st.focus = '#name';
                    }
                }
            }
        });
    }

	//Assistance to clients Accordion
    if($('.assistance-list__item-question').length > 0) {
        $('body').on('click', '.assistance-list__item-question', function (){
            $(this).next().slideToggle();
            $(this).toggleClass('active');
        });
    }

});