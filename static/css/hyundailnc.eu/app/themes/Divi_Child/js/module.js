/* ------------------------------------------- */
/* ------ Module.js -------------------------- */
/*
 Modules werden nach dem "Revealing Module Pattern" erstellt.
 More info:
 https://medium.freecodecamp.com/javascript-modules-a-beginner-s-guide-783f7d7a5fcc#.fc42xwnry
 Alle js Files werden in eine bundle.js minified.
 Die module.js Datei muss als letztes minimiert werden, da sie abhängig von allen anderen ist.
 */
/* ------------------------------------------- */

/* ------ 00 Index --------------------------- */

// 01 Example Module
// 02 Module 1
// 0X Module Loader


/* ------ 01 Example Module ------------------ */

/*
 var myModule = (function ($) {

 // Keep this variable private inside this closure scope
 var myVar= [93, 95, 88, 0, 55, 91];

 var average = function() {
 var total = myVar.reduce(function(accumulator, item) {
 return accumulator + item;
 }, 0);

 return'Your average var is ' + total / myVar.length + '.';
 };

 var failing = function() {
 var getZero = myVar.filter(function(item) {
 return item < 70;
 });

 return 'You failed ' + getZero.length + ' times.';
 };

 // Explicitly reveal public pointers to the private functions
 // that we want to reveal publicly

 return {
 average: average,
 failing: failing
 }
 })(jQuery);

 // Module Loader
 myModule.failing();
 myModule.average(); // 'Your average grade is 70.33333333333333.'
 */


/* ------ 02 Module 1 ------------------------ */

var header = (function($) {
   var appendsecondary = function () {
       if( $(window).width() < 961 ) {
           $('#et-secondary-nav').appendTo('#top-menu');
       }
   };

   var movelogo = function () {
       var checkwidth = $(window).width() * 0.8;
       var push_left = $(window).width() * 0.1;

       if( checkwidth > 1080 ) {
           push_left = ( $(window).width() - 1080 ) * 0.5;
       }

       $('.logo_container')
           .appendTo('#page-container')
           .addClass('logo_js')
           .css({
               'left': push_left + 'px',
               'top': '0',
               'position': 'fixed'
               }
           );


   };

   return {
       appendsnd: appendsecondary,
       movelogo: movelogo
   }
})(jQuery);

var iefixes = (function($) {
    var fixminheight = function () {

        var header_container = $('.et_pb_fullwidth_header_container.center');

        if( $('body').hasClass('ie')) {
            if( header_container.length ){

                header_container.css( 'height', function() {
                   return $(this).height();
                });
            }
        }
    };

    return {
        fixminheight: fixminheight,
    }
})(jQuery);

var productSwitch = (function($) {

    var init = function() {
        $('.pageswitcher').append('<span class="closebtn"><i class="fa fa-times fa-2x" aria-hidden="true"></i></span>');
    };

    var slidedown = function () {
        $('.logo_container a').click( function(e) {
            e.preventDefault();
            $('.pageswitcher').addClass('slidedown');
        });
    };

    var slideup = function () {
        $('.pageswitcher .closebtn').click( function(e) {
            e.preventDefault();
           $('.pageswitcher').removeClass('slidedown');
        });
    };

    return {
        init: init,
        slidedown: slidedown,
        slideup: slideup
    }

})(jQuery);

var productGrid = (function ($) {

    var wrap = function () {
        $('.product-grid .et_pb_blurb').each(function () {
            container = $(this).find('.et_pb_blurb_container');
            thumb = $(this).find('.et_pb_main_blurb_image');
            container.wrapInner('<div class="tile-content" />');
            thumb.clone().prependTo(container);
        });
    };

    var anim = function () {
        $('.product-grid .et_pb_blurb').click(function (e) {
            e.preventDefault();
            if ($(this).hasClass('show')) {
                $(this).removeClass('show delay').addClass('hide');
            } else {

                /*$(this).siblings().removeClass('show');*/

                if ($(this).siblings('.show').length) {
                    $(this).addClass('delay');
                }

                $(this).siblings('.show').removeClass('show delay').addClass('hide');

                $(this).removeClass('hide').addClass('show');


            }
        });
    };

    return {
        wrap: wrap,
        anim: anim
    }

})(jQuery);

var filterableGrid = (function ($) {

    var currentfilter = {tag: "all", series: "all", categories: "all", color: "all", application: "all"};
    $('.grid_detail_view').css('width', 'calc(' + $('.et_pb_portfolio_items').width() + 'px - ' + $('.et_pb_portfolio_items').width() + 'px * 1.66666 / 100' );

    var get_count_class = function (i) {

        var count_class = "first-item";

        if( i % 6 === 1) count_class = "second-item";
        if( i % 6 === 2) count_class = "third-item";
        if( i % 6 === 3) count_class = "fourth-item";
        if( i % 6 === 4) count_class = "fifth-item";
        if( i % 6 === 5) count_class = "sixth-item";

        return count_class;

    };

    var filter = function (posttype, selectedfilter) {

        $('.et_pb_filterable_portfolio').find('.et_pb_portfolio_item').each(function(i) {
            var count_class = get_count_class(i);

            $(this).addClass(count_class);
        });

        var $the_portfolio = $('.filterable_'+ posttype + '_grid');

        $the_portfolio.on('click', '.reset_filter', function(e) {

            var $the_portfolio_items = $(this).parents('.et_pb_filterable_portfolio').find('.et_pb_portfolio_items');

            currentfilter = {tag: "all", series: "all", categories: "all", color: "all", application: "all", category: "all", design: "all"};

            e.preventDefault();
            $the_portfolio.find('.et_pb_portfolio_filters a').removeClass('active' + selectedfilter);
            $the_portfolio.find('.et_pb_portfolio_item').removeClass('active' + selectedfilter + ' inactive' + selectedfilter);
            $the_portfolio_items.find('.et_pb_portfolio_item').show();
            $the_portfolio_items.find('.et_pb_portfolio_item').addClass('active');

            $the_portfolio_items.find('.et_pb_portfolio_item').each(function(i){
                var count_class = get_count_class(i);

                $(this).addClass(count_class);
            });
        });


        $the_portfolio.on('click', '.et_pb_' + selectedfilter + '_filter a', function (e) {

            e.preventDefault();
            var category_slug = $(this).data('category-slug');
            currentfilter[selectedfilter] = category_slug;

            var filterclasses = '.et_pb_portfolio_item';

            if (posttype == "color") {
                if (currentfilter.tag !== "all") {
                    filterclasses += '.'+posttype+'_tag-' + currentfilter.tag;
                }

                if (currentfilter.series !== "all") {
                    filterclasses += '.'+posttype+'_series-' + currentfilter.series;
                }

                if (currentfilter.categories !== "all") {
                    filterclasses += '.'+posttype+'_categories-' + currentfilter.categories;
                }
            }


            if (posttype == "sinknbowl") {
                if (currentfilter.color !== "all") {
                    filterclasses += '.'+posttype+'_color-' + currentfilter.color;
                }

                if (currentfilter.application !== "all") {
                    filterclasses += '.'+posttype+'_application-' + currentfilter.application;
                }
            }

            if (posttype == "bodaqtile"  || posttype == "bodaqinteriorfilm" || posttype == "bodaqplate") {
                if (currentfilter.category !== "all") {
                    filterclasses += '.'+posttype+'_category-' + currentfilter.category;
                }
            }

            if (posttype == "bodaqinteriorfilm" ) {
                if (currentfilter.design !== "all") {
                    filterclasses += '.'+posttype+'_category-' + currentfilter.design;
                }
            }



            console.log(filterclasses);
             var $the_portfolio_items;
             var $the_portfolio_visible_items;

            $the_portfolio_items = $(this).parents('.et_pb_filterable_portfolio').find('.et_pb_portfolio_items');

                $the_portfolio.find('.et_pb_' + selectedfilter + '_filter_all').removeClass('active' + selectedfilter);
                $the_portfolio.find('.et_pb_' + selectedfilter + '_filter a').removeClass('active' + selectedfilter);
                $the_portfolio.find('.et_pb_' + selectedfilter + '_filter_all a').removeClass('active' + selectedfilter);

                $(this).addClass('active' + selectedfilter);

                $the_portfolio_items.find('.et_pb_portfolio_item').hide();

                $the_portfolio_items.find(filterclasses).show();
                $the_portfolio_items.find(filterclasses).addClass('active' + selectedfilter);

            var active_category = $the_portfolio.find('.et_pb_' + selectedfilter + '_filter > a.active' + selectedfilter).data('category-slug');

            window.et_pb_set_responsive_grid($the_portfolio.find('.et_pb_portfolio_items'), '.et_pb_portfolio_item');

            if ('all' === active_category) {
                $the_portfolio_visible_items = $the_portfolio.find('.et_pb_portfolio_item');
            } else {
                $the_portfolio_visible_items = $the_portfolio.find(filterclasses);
            }

            $the_portfolio_items.find('.et_pb_portfolio_item').removeClass('first-item second-item third-item fourth-item fifth-item sixth-item');

            $the_portfolio_visible_items.each(function(i){
               var count_class = get_count_class(i);

                $(this).addClass(count_class);

            });

            setTimeout(function () {
                if (!$the_portfolio.attr('id')) {
                    return;
                }

                var this_portfolio_state = [];
                this_portfolio_state.push($the_portfolio.attr('id'));
                this_portfolio_state.push($the_portfolio.find('.et_pb_' + selectedfilter + '_filter > a.active' + selectedfilter).data('category-slug'));

                if ($the_portfolio.find('.et_pb_portofolio_pagination a.active' + selectedfilter).length) {
                    this_portfolio_state.push($the_portfolio.find('.et_pb_portofolio_pagination a.active' + selectedfilter).data('page'));
                } else {
                    this_portfolio_state.push(1);
                }

                this_portfolio_state = this_portfolio_state.join(et_hash_module_param_seperator);

                et_set_hash(this_portfolio_state);
            }, 500);
        });
    };

    var filter_v2 = function (posttype, selectedfilter) {

        /**
         * Define variables
         */
        var $the_grid = $('.filterable_'+ posttype + '_grid'),
            $the_filters = {};

        // Check if the grid even exists. If not, exit
        if( !$the_grid.length) {
            return;
        }

        // Map Filters from array to object
        for (var i = 0; i < selectedfilter.length; i++) {
            var key = selectedfilter[i];
            $the_filters[key] = 'all';
        }

        /**
         * Number each grid item (based on rows)
         */
        $the_grid.find('.et_pb_portfolio_item').each(function(i) {
            var count_class = get_count_class(i);

            $(this).addClass(count_class);
        });

        /**
         * Filter Reset function
         */
        $the_grid.on('click', '.reset_filter', function(e) {

            e.preventDefault();

            // Get current grid
            var $the_grid_items = $(this).parents('.filterable_product_grid').find('.product_grid_items');

            // Reset Filters
            $.each($the_filters, function(key){
               $the_filters[key] = 'all';
            });

            $the_grid_items.find('.et_pb_portfolio_item').show();
            $the_grid_items.find('.et_pb_portfolio_item').addClass('active');

            // Set item numbering relative to the row
            $the_grid_items.find('.et_pb_portfolio_item').each(function(i){
                var count_class = get_count_class(i);

                $(this).addClass(count_class);
            });

            // Show all filters

            $(this).siblings('.filter_select').find('a').show();
        });

        /**
         * Filter Function
         */
        $the_grid.on('click', '.product_grid_filter a', function (e) {

            e.preventDefault();

            // Define Filters
            var filter_wrap = $(this).parents('.filter_select'),
                selected_filter = filter_wrap.attr('class').split('_').pop(),
                $filter_classes = '.product_grid_item',
                $the_grid_items = $(this).parents('.filterable_product_grid').find('.product_grid_items'),
                $the_grid_visible_items,
                shown_filters = [],
                filter_elements = $(this).parents('.product_grid_filters').find('li a');


            // Set Filter
            $the_filters[selected_filter] = $(this).data('category-slug');

            // Add all chosen Filters to a string
            $.each($the_filters, function(key,value) {
               if( $the_filters[key] !== 'all' ) {
                   $filter_classes += '.' + posttype + '_' + key + '-' + value;
               }
            });

            // Highlight Filter
            filter_wrap.find('a').removeClass('active_filter');
            $(this).addClass('active_filter');

            // Find all relevant items, show them and hide the rest
            $the_grid_visible_items = $the_grid_items.find($filter_classes);

            $the_grid_items.find('.et_pb_portfolio_item').hide();

            $the_grid_visible_items.show();
            $the_grid_visible_items.addClass('active');

            window.et_pb_set_responsive_grid($the_grid.find('.product_grid_items'), '.product_grid_item');

            // Set numbering again and hide irrelavant filters
            $the_grid_items.find('.product_grid_item').removeClass('first-item second-item third-item fourth-item fifth-item sixth-item');

            filter_elements.hide();

            $the_grid_visible_items.each(function(i){
                var count_class = get_count_class(i),
                    el = $(this),
                    reg = new RegExp(posttype + '_[a-zA-Z-0-9]+-[a-zA-Z-0-9]+[a-zA-Z-0-9]+','g'),
                    el_classes = el.attr('class').match(reg);

                // Fetch all filters to show
                $.each(el_classes, function(i,value) {
                    value = value.substring(value.indexOf("-") + 1);
                   shown_filters.indexOf(value) === -1 ? shown_filters.push(value) : '' ;
                });

                el.addClass(count_class);

            });

            // Show all relevant filters
            filter_elements.each(function(){

                shown_filters.indexOf( $(this).data('category-slug') ) !== -1 ?  $(this).show() : '';

            });

        });
    };

    var color_grid_detail_view = function () {

        var $the_grid = $('.filterable_product_grid'),
            $grid_detail = $the_grid.find('.grid_detail_view');

        $grid_detail.append('<span class="closebtn"><i class="fa fa-times fa-3x"></i></span>');

        $the_grid.find('.product_grid_item > a').click(function (e) {
            e.preventDefault();

            if ($(this).parent().hasClass('show_details')) {
                $(this).parent().removeClass('show_details');

            } else {
                $the_grid.find('.product_grid_item').removeClass('show_details');
                $(this).parent().addClass('show_details');
            }
        });

        $grid_detail.find('.closebtn').click(function (e) {
           e.preventDefault();

           $(this).parents('.et_pb_color_grid_item').removeClass('show_details');
        });
    };

    return {
        filter: filter,
        filter_v2: filter_v2,
        color_grid_detail_view: color_grid_detail_view
    }
})(jQuery);


/* ------ Custom jQuery Stuff ---------------- */

jQuery.fn.manipulateText = function (str, className) {
    var regex = new RegExp(str, "gi");

    return this.each(function () {
        this.innerHTML = this.innerHTML.replace(regex, function(matched) {return "<sup class=\"" + className + "\">" + matched + "</sup>";});
    });
};


/* ------ 0X Module Loader ------------------- */

header.appendsnd();
header.movelogo();

iefixes.fixminheight();

productSwitch.init();
productSwitch.slidedown();
productSwitch.slideup();
productGrid.wrap();
productGrid.anim();
/*filterableGrid.filter('color', 'tag');
filterableGrid.filter('color', 'series');
filterableGrid.filter('color', 'categories');*/
//filterableGrid.filter('sinknbowl', 'color');
//filterableGrid.filter('sinknbowl', 'application');

//filterableGrid.filter('bodaqtile', 'category');
//filterableGrid.filter('bodaqinteriorfilm', 'category');
//filterableGrid.filter('bodaqplate', 'category');

filterableGrid.filter_v2('sinknbowl', ['color', 'application']);

filterableGrid.filter_v2('bodaqinteriorfilm', ['category', 'design']);
filterableGrid.filter_v2('bodaqplate', ['category']);
filterableGrid.filter_v2('bodaqtile', ['category']);

filterableGrid.filter_v2('color', ['tag', 'series', 'categories']);

filterableGrid.color_grid_detail_view();

jQuery("p").manipulateText("\u00AE","superscript");
jQuery("h1").manipulateText("\u00AE","superscript");
jQuery("h2").manipulateText("\u00AE","superscript");
jQuery("h3").manipulateText("\u00AE","superscript");
jQuery("h4").manipulateText("\u00AE","superscript");
jQuery("a").manipulateText("\u00AE","superscript");
jQuery("li").manipulateText("\u00AE","superscript");

jQuery('.nav.et_disable_top_tier').find('.menu-item-has-children > a').click(function(e){
    e.preventDefault();
});
