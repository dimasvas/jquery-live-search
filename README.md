JQuery Live Search Plugin (Beta)
================================

The jQuery Live Search Plugin provides easy live search functionality for input element.

## Getting Started:

### Downloading the files

Download files from github or use bower.

### Instalation:

Using bower:<br>

```sh
bower install jquery-live-search-plg
```

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
Specify url to get data.<br>
Required.

```javascript
$( "#searchable" ).liveSearch({
        url: 'http://somedomain.com/path-to/database.php'
        ...
    });
```

### method
Specify request method GET or POST.<br>
Default value: GET.<br>
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        method: 'POST'
    });
```

### minInput
Specify the minimum number of characters entered by user to start searching.<br>
Default value: 2.<br>
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        minInput: 4
    });
```

### searchDelay
Specify time in ms between user input and start searching.<br>
Default value: 400.<br>
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        searchDelay: 1000
    });
```

### limitResult
Specify limit of items to be returned from backend.<br>
Default value: 10.<br>
Optional.

```javascript
$( "#searchable" ).liveSearch({
        ...
        limitResult: 10
    });
```

### beforeRender
Method is called after response has been received. Here must be specified property that holds data collection.
Method gives possibility to work with any data structure with no backend changes.<br>
Required.

For example, json response:

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
Method is called before request is sent. Can be used to validate user input.<br>
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
Specify fields name for text and url. Functionality gives flexibility to receive data from backend with no changes in response.<br>
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