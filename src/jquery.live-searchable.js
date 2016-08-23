/**
 * LiveSearchable jQuery plugin
 *
 * @copyright Copyright 2016, Dmitriy Vasilenko
 * @license   Apache License, Version 2.0 (http://www.opensource.org/licenses/apache2.0.php)
 * @version   v1.0.0
 *
 *
 */
//TODO: Input validation before submit
(function ($, window, undefined) {
    
    "use strict";
    
    var old = $.fn.liveSearchable;
     
    var LiveSearchable = function(element, options) {
        this.$element = $(element);
        this.prevInputValue = '',

        this.options = $.extend({}, $.fn.liveSearchable.defaults, options);
        
        if (this.options.minInput < 2 ) {
            throw new Error('Invalid "Minimum Input" option!');
        }
        
        this.options.searchDelay = parseInt(this.options.searchDelay);
        if (isNaN(this.options.searchDelay)) {
            throw new Error('Invalid "Search Delay" option!');
        }

        this.options.limitResult = parseInt(this.options.limitResult);
        if (isNaN(this.options.limitResult)) {
            throw new Error('Invalid "Limit Results" option!');
        }
        
        if(!this.options.url) {
             throw new Error('Url is not defined!');
        }
        
        if (typeof this.options.beforeRender  !== "function") {
            throw new Error('"beforeItemRender" Callback must be specified!');
        }
        
        if (!this.options.data.text || !this.options.data.href) {
            throw new Error('Attributes "data.text" and "data.name" must be defined!');
        }
        
        this.setupEvents();
        
        return this;
    };
    
    LiveSearchable.prototype = {
        constructor: LiveSearchable,
        
        setupEvents: function () {
            var self = this;
            
            this.$element.attr('autocomplete', 'off');
            
            this.$element.click(function(e) {
                e.stopPropagation();
            });
            
            $('.liveSearchable-results').click(function(e){e.stopPropagation();});
            
            $('body').on('mouseenter', '.liveSearchable-results li',  function(e) {
                $('.active-searchable-item').removeClass('active-searchable-item');
                $(e.currentTarget).addClass('active-searchable-item');
                
            }).on('click', '.liveSearchable-results li', function(e){
                self.loadPage($('a', $(e.target)));
                
            }).click(this.destroySearchContainer);

           
           $(window).keydown(function(event){
                var item = $('.active-searchable-item a');
                
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
                    class: 'live-searchable-item',
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
                    class: 'liveSearchable-results'
                });
        },
        
        clearResults: function () {
            var resultsContainer = $('.liveSearchable-results');
            
            if (resultsContainer.length > 0){
                resultsContainer.remove();
            }
        },
        
        isNavKey: function (keyCode) {
            return $.inArray(keyCode, [37, 38, 39, 40]) !== -1; //arrows: up, down, left, right
        },
        
        navigate: function(keyCode) {
            var resultContainer = $( ".liveSearchable-results" );

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
            var activeItem = $('.active-searchable-item', resultContainer),
                activeClass = 'active-searchable-item',    
                input = this.$element;    

            if(!activeItem.length && direction === 'up') {
                input.val(this.prevInputValue);
                return;
            }   
            
            if(!activeItem.length) {
                var firstItem = $('li', resultContainer).first();
                
                firstItem.addClass(activeClass);  
                $(input).val($('.live-searchable-item', firstItem).text());
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
            input.val($('.live-searchable-item', prevChild).text());
        },
        
        moveDown: function (input, activeItem, itemClass) {
            var nextChild = activeItem.next();
            
            if(!nextChild.length) {
                return;
            }

            activeItem.removeClass(itemClass);
            nextChild.addClass(itemClass); 

            input.val($('.live-searchable-item', nextChild).text());
        },
        
        destroySearchContainer: function (e) {
            $('.liveSearchable-results').remove();
        },
        
        loadPage: function (element) {
            var href = element.attr('href');
            
            this.destroySearchContainer();
            
            document.location.href = href;
        },
        
        destroy: function () {
            this.$element.empty();
        }
    };
    
    $.fn.liveSearchable = function (option) {
        var args = Array.prototype.slice.call(arguments, 1),
            methodReturn,
            $this = $(this),
            data = $this.data('live-searchable'),
            options = typeof option === 'object' && option;
    
        if (!data) $this.data('live-searchable', (data = new LiveSearchable(this, options) ));
            
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };
    
    $.fn.liveSearchable.defaults = {
        url: '',
        method: 'GET',
        minInput: 2,
        searchDelay: 200,
        limitResult: 10,
        resultContainer: 'liveSearchable-results',
        appendContainer: '',
        beforeRender: null,
        beforeRequestSend: null,
        data: {
            text: '',
            href: ''
        }
    };
    
    $.fn.liveSearchable.Constructor = LiveSearchable;
    
    $.fn.liveSearchable.noConflict = function () {
        $.fn.liveSearchable = old;
        return this;
    };
     
})(jQuery, window);