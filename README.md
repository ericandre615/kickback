# Kickback
----------

## What it is

Simple lightweight Ajax / XHR module that utilizes native *Promises*. Supports XHR2 features when available.
This is the start of a series of small, lightweight modules that do one thing. The goal later is to have a
module buidler that is fast and easy to use so you can customize a nice library in which you only require what you need and yet they will all extend each other so they can used together.

## Features

* Basic Ajax/XHR (mostly supports IE7+)
* Utilizes native ES6 Promises (to support other browsers use the [ES6-promise polyfill](https://github.com/jakearchibald/es6-promise))
* Supports FormData file uploads
* Asynchronous 
* Supports browser and NodeJS/Browserify

## Global
the _kickback_ object is the only global object exposed to _window_.

## Isomorphic?
Somewhat. It supports NodeJS / CommonJS module pattern. However, NodeJS doesn't know anything about the
XMLHttpRequest object. And it really shouldn't. Use built-in [http module](https://nodejs.org/api/http.html) for that. If you want to use
the require() module pattern you can. Then you can use browserify to bundle it for the browser.

**Example**

_script.js_

    var kickback = require('./dist/kickback');
    kickback.request('http://someurl/to/file').then(function(response) { console.log(response) };


In terminal

````browserify script.js -o bundle.js````

Then you can include ````<script src="bundle.js"></script>```` in your index.html file

## Usage
Kickback only has one method ````.request();```` In the future I may add one specifically for file uploads. But this is all it really needs. If you like to save on space you can easily alias this with something like:
````var kbr = kickback.request; ```` and then you can just use kbr for all ajax request.

kickback utilizes promises. So the basic usage would be

    kickback.request('http://someurl/get')
    .then(function(response) {
        //here is the response if the promise is resolved
    })
    .then(null, function(error) {
        // much like try catch this .then will catch a promise reject
        // you can also use .catch, which is basically an alias
        // However earlier version of IE have catch as a reserver word
        // so you must use the [] syntax to support them .then()['catch'](//catch error);
    });

kickback takes only one configuration object. Use as many or as little options as you need. If you supply a string
as the argument like about it must be the url and it will automatically use a GET request. (just handy shortcut)

## Configuration Object Properties
* **url:** [type: string] The url for the request _default_ '/'?
* **method:** [type: string] The method (POST, GET, PUT, DELETE) _default_ GET
* **data:**   [type: object or string] The data to send in the request _default_ null
* **async:** [type: boolean] Whether the request is async or sync (kinda defeats the purpose to set this false/sync)_default_ true
* **serialize:** [type:boolean] use built-in private serialize method to serialize object into urlencoded string _default_ false
* **headers:** [type: object] set request headers. Currently only supports 1 header. Should have a type and value property. **Example** ````headers: {type: 'Content-Type', value="multipart/form-data"};```` _defaults_ depends on the data, how it's passed and what the form enctype is set to.
* **cors:** [type: boolean] cross-domain requests, currently XHR2 it just works, this is a future development to support non-XHR2 browser and using the withCredentials _default_ false
* **auto** [type: boolean] whether to try and detect and format data. This depends on the data you are trying to send and what the browser supports. It includes feature detection for FormData API. This is the most heavy operation in the module and added quite a bit of code. Use with caution however below are some test results that should always work _default_ false

Auto should work with either a simple object or passing the form element itself. First, it checks if the browsers supports FormData API. If so, it uses that and things are simple. Else it will run the serialize method and turn the data into a urlencoded string.

## works with: ##

    data = {
        'username': 'Eric Andre',
        'email': 'eric.andre@phase3mc.com',
        'message': 'some message from the user'
    };

OR with form as HTMLElement

    data = document.querySelector('form');

OR if you are getting it through a submit event you can easily do

    contactForm.addEventListener('submit', function(e) {
        data = e.srcElement;
    });

However you go about giving it the form element.

## Examples

_bare minimum (probably should try and handle error though)_

    kickback.request('http://somefile/get.php').then(function(response) { console.log(response); });

_bare minimum with alias_

    var kb = kickback.request;
    kb('http://somefile/get.php').then(function(response) { console.log(response); });

_Beefy example (assume data has been processed as a simple object)_

    kbr({
        url: 'http://localhost:8080/tests/form-action.php',
        data: data,
        serialize: true,
        method: 'POST'
    })
    .then(function(response) {
        return JSON.parse(response);
    })
    .then(function(response) {
        // now you've got the JSON response
        // you could have just done it with one then,
        // but you can chain promises and do more complex and interesting things
    })
    .then(null, function(err) {
        throw new Error(err);
    });


_Beefier Example (best example case for using auto)_

    var formSubmit = document.querySelector('form');
    formSubmit.addEventListener('submit', function(e) {
        e.preventDefault();
    
        // this is where we could be checking the data before passing it
        var sendData = {
            'username': formValues.username.value,
            'email': formValues.email.value,
            'msg': formValues.msg.value
        };
    
        kbr({
            url: 'http://localhost:8080/tests/form-action.php',
            data: sendData,
            auto: true,
            method: 'POST'
        })
        .then(function(response) {
            return JSON.parse(response);
        }).then(null, function(err) {
            throw new Error(err);
        }).then(function(response) {
            var ul = document.createElement('ul');
            elem.innerHTML = "";
            ul.setAttribute('id','users');
            elem.appendChild(ul);
    
            ul.appendChild(document.createElement('li')).innerHTML = response.username;
            ul.appendChild(document.createElement('li')).innerHTML = response.email;
            ul.appendChild(document.createElement('li')).innerHTML = response.message;
        });
    }, false);

## License

[MIT](http://opensource.org/licenses/MIT)
