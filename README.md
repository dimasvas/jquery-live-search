JQuery Live Search Plugin (Beta)
================================

The jQuery Live Search Plugin provides provides easy live search functionality for input element.

## Getting Started:

### Downloading the files

Download files from github or use bower.

### Instalation:

Include jQuery and the plugin on a page. Select an input to add live search functionality and call the `liveSearch` method.

```html
<form>
	<input type="text" id="searchable">
</form>
<script src="jquery.js"></script>
<script src="jquery.validate.js"></script>

<script>
$(function(){
    $( "#searchable" ).liveSearch({
        url: '/url/to-get/database/data.php',
        beforeRender: function(response){
                return response.data;
        },
        data: {
                text: 'name',
                href: 'url' 
        }
    });
});
</script>
```

For more information on how to configure options see below.

## Options:

### url
Specify url to get data.
Required.

```javascript
$( "#searchable" ).liveSearch({
        url: 'http://somedomain.com/path-to/database.php'
        ...
    });
```

### method
Specify request method GET or POST.
Default value: GET.
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        method: 'POST'
    });
```

### minInput
Specify the minimum number of characters entered by user to start searching.
Default value: 2.
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        minInput: 4
    });
```

### searchDelay
Specify time in ms between user input and start searching.
Default value: 400.
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        searchDelay: 4
    });
```

### limitResult
Specify limit of items to be returned from backend.
Default value: 10.
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        limitResult: 10
    });
```

### beforeRender
Method is called after response has been received. Here must be specified property that holds data collection.
Method gives possibility to work with nay data structure with no backend changes.
Required.

For example json response is:

```javascript
{
    "success":true,
    "code":200,
    "data": ["some collection data"]	
}
```

The method will look like:

```javascript
$( "#searchable" ).liveSearch({
        ...
        beforeRender: function(response){
                return response.data;
        },
    });
```

### beforeRequestSend
Method is called before request is sent. Can be used to validate user input.
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        beforeRequestSend: function(inputValue){
            // validate inputValue
            return validatedInputValue;
        },
    });
```

### data
Specify fields name for text and url. Brings flexibility to receive data from backend with no changes in response.
Required.

For example object item:

```javascript
{
    "name": "Some name",
    "url": "http://some.url"
}
```

```javascript
$( "#searchable" ).liveSearch({
        ...
        data: {
            text: 'name',
            href: 'url'
        }
    });
```

Object fields will be mapped to corresponding fields in plugin.



## License:
Copyright &copy; Dmitry Vasilenko<br>
Licensed under the MIT license.