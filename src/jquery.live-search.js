/**
 * jQuery LiveSearch plugin
 *
 * @copyright Copyright 2016, Dmitriy Vasilenko
 * @license   MIT License
 * @version   v0.1.0-beta
 */

(function ($, window, undefined) {
    
    "use strict";
    
    var old = $.fn.liveSearch;
     
    var liveSearch = function(element, options) {
        this.$element = $(element);
        this.prevInputValue = '',

        this.options = $.extend({}, $.fn.liveSearch.defaults, options);
        
        this.validateOnInit(this.options);
        
        this.setupEvents();
        
        return this;
    };
    
    liveSearch.prototype = {
        constructor: liveSearch,
        
        setupEvents: function () {
            var self = this;
            
            this.$element.attr('autocomplete', 'off');
            
            this.$element.click(function(e) {
                e.stopPropagation();
            });
            
            $('.lsearch-results').click(function(e){e.stopPropagation();});
            
            $('body').on('mouseenter', '.lsearch-results li',  function(e) {
                $('.active-lsearch-item').removeClass('active-lsearch-item');
                $(e.currentTarget).addClass('active-lsearch-item');
                
            }).on('click', '.lsearch-results li', function(e){
                self.loadPage($('a', $(e.target)));
                
            }).click(this.destroySearchContainer);

           
           $(window).keydown(function(event){
                var item = $('.active-lsearch-item a');
                
                if(event.keyCode === 13 && item.length) {
                    event.preventDefault();
                    self.loadPage(item);
                    return false;
                }
            });
            
            this.$element.keyup({classContext: this}, this.onKeyUp);
        },
        
        onKeyUp: function (e){
            var $this = $(this),
                value = $this.val(),
                classContext = e.data.classContext,
                options = classContext.options;
                
            if(classContext.isNavKey(e.keyCode)) {
                classContext.navigate(e.keyCode);
                return;
            }
            
            if (value !== classContext.previousInput) { 
                classContext.previousInput = value;
                
                classContext.clearResults();
                
                if(value.length > options.minInput) {
                    
                    classContext.prevInputValue = value;
                    
                    setTimeout(function(){
                        classContext.getData(options);
                    }, options.searchDelay);     
                }
            }
        },
        
        getData: function(options) {
            var self = this;      
            
            $.ajax({
                url: options.url,
                method: options.method,
                data: {
                    data: self.getInputValue(),
                    limit: options.limitResult
                }
            }).done(function(response){
                self.render(self.getPreparedResponse(response));
            });
        },
        
        getInputValue: function() {
            return typeof this.options.beforeRequestSend  === "function" ?
                    this.options.beforeRequestSend(this.$element.val()) : 
                    this.$element.val();
        },
        
        getPreparedResponse: function (response) {
            return this.options.beforeRender(response);
        },
        
        render: function (response) { 
            if(response.length < 1) {return;}
            this.$element.after(this.createItems(response));
        },
        
        createItems: function (response) {
            var dataOpt = this.options.data,
            searchWrapper = this.getResultsWrapper();
                
            $.each(response, function (key, value) {
                var li = $('<li>'),
                    item = $('<a/>', {
                    class: 'lsearch-item',
                    text: value[dataOpt.text],
                    href: value[dataOpt.href]    
                }).appendTo($('<div>'));

                item.appendTo(li); 
                li.appendTo(searchWrapper);
            });
            
            return searchWrapper;
        },
        
        getResultsWrapper: function () {
            var self = this;
            
            return $('<div>', {
                    style: 'width:' + self.$element.outerWidth() + 'px',
                    class: 'lsearch-results'
                });
        },
        
        clearResults: function () {
            var resultsContainer = $('.lsearch-results');
            
            if (resultsContainer.length > 0){
                resultsContainer.remove();
            }
        },
        
        isNavKey: function (keyCode) {
            return $.inArray(keyCode, [37, 38, 39, 40]) !== -1; //arrows: up, down, left, right
        },
        
        navigate: function(keyCode) {
            var resultContainer = $( ".lsearch-results" );

            if(resultContainer.length){
                switch(keyCode){
                    case 40:
                        this.moveToResult('down', resultContainer);
                        break;
                    case 38:
                        this.moveToResult('up', resultContainer);
                        break;
                    default:
                        break;
                }
            }
        },
        
        moveToResult: function(direction, resultContainer) {
            var activeItem = $('.active-lsearch-item', resultContainer),
                activeClass = 'active-lsearch-item',    
                input = this.$element;    

            if(!activeItem.length && direction === 'up') {
                input.val(this.prevInputValue);
                return;
            }   
            
            if(!activeItem.length) {
                var firstItem = $('li', resultContainer).first();
                
                firstItem.addClass(activeClass);  
                $(input).val($('.lsearch-item', firstItem).text());
            } else {
                direction === 'down' ? this.moveDown(input, activeItem, activeClass):
                                       this.moveUp(input, activeItem, activeClass);
            }   
        },
        
        moveUp: function (input, activeItem, itemClass) {
            var prevChild = activeItem.removeClass(itemClass).prev();

            if(!prevChild.length && input.val() !== this.prevInputValue) {
                input.val(this.prevInputValue);
                input.focus();
                return;
            }
       
            prevChild.addClass(itemClass); 
            input.val($('.lsearch-item', prevChild).text());
        },
        
        moveDown: function (input, activeItem, itemClass) {
            var nextChild = activeItem.next();
            
            if(!nextChild.length) {
                return;
            }

            activeItem.removeClass(itemClass);
            nextChild.addClass(itemClass); 

            input.val($('.lsearch-item', nextChild).text());
        },
        
        loadPage: function (element) {
            var href = element.attr('href');
            
            this.destroySearchContainer();
            
            document.location.href = href;
        },
        
        destroySearchContainer: function (e) {
            $('.lsearch-results').remove();
        },
        
        validateOnInit: function(options) {
            if (options.minInput < 2 ) {
                throw new Error('Invalid "Minimum Input" option!');
            }

            options.searchDelay = parseInt(options.searchDelay);
            if (isNaN(options.searchDelay)) {
                throw new Error('Invalid "Search Delay" option!');
            }

            options.limitResult = parseInt(options.limitResult);
            if (isNaN(options.limitResult)) {
                throw new Error('Invalid "Limit Results" option!');
            }

            if(!options.url) {
                 throw new Error('Url is not defined!');
            }

            if (typeof options.beforeRender  !== "function") {
                throw new Error('"beforeRender" Callback must be specified!');
            }

            if (!options.data.text || !options.data.href) {
                throw new Error('Attributes "data.text" and "data.href" must be defined!');
            }
        },
        
        destroy: function () {
            this.$element.empty();
        }
    };
    
    $.fn.liveSearch = function (option) {
        var args = Array.prototype.slice.call(arguments, 1),
            methodReturn,
            $this = $(this),
            data = $this.data('live-search'),
            options = typeof option === 'object' && option;
    
        if (!data) $this.data('live-search', (data = new liveSearch(this, options) ));
            
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };
    
    $.fn.liveSearch.defaults = {
        url: '',
        method: 'GET',
        minInput: 2,
        searchDelay: 200,
        limitResult: 10,
        resultContainer: 'lsearch-results',
        appendContainer: '',
        beforeRender: null,
        beforeRequestSend: null,
        data: {
            text: '',
            href: ''
        }
    };
    
    $.fn.liveSearch.Constructor = liveSearch;
    
    $.fn.liveSearch.noConflict = function () {
        $.fn.liveSearch = old;
        return this;
    };
     
})(jQuery, window);