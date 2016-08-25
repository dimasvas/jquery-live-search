describe('Live Search Unit Test', function () {
  it('should return element withoue errors', function () {
    var fixture = $('<input type="text" id="searchable">');
    fixture.liveSearch({
        url: 'database.php',
        beforeRender: function(response){
            return response.data;
        },
        data: {
            text: 'name',
            href: 'url' 
        }
    });
    
    expect(fixture.length).toBe(1);
  });
  
  it('should throw error on empty url', function () {
    expect(function() {
        $.fn.liveSearch(); 
    }).toThrow(new Error('Url is not defined!'));
  });
  
  it('should throw error on beforeItemRender', function () {
    expect(function() {
        $.fn.liveSearch(
            {
                url: "fake.url"
            }
        ); 
    }).toThrow(new Error('"beforeRender" Callback must be specified!'));
  });
  
  it('should throw error on data attribute', function () {
    expect(function() {
        $.fn.liveSearch(
            {
                url: "fake.url",
                beforeRender: function(data) {
                    return data;
                }
            }
        ); 
    }).toThrow(new Error('Attributes "data.text" and "data.href" must be defined!'));
  });
  
  it('should throw error on limitResult', function () {
    expect(function() {
        $.fn.liveSearch(
            {
                url: "fake.url",
                beforeRender: function(data) {
                    return data;
                },
                data: {
                   text: 'name',
                    href: 'url'   
                },
                limitResult: ''
            }
        ); 
    }).toThrow(new Error('Invalid "Limit Results" option!'));
  });
  
  it('should throw error on minInput', function () {
    expect(function() {
        $.fn.liveSearch(
            {
                url: "fake.url",
                beforeRender: function(data) {
                    return data;
                },
                data: {
                   text: 'name',
                    href: 'url'   
                },
                minInput: 1
            }
        ); 
    }).toThrow(new Error('Invalid "Minimum Input" option!'));
  });
  
});
