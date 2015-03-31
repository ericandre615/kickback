var kickback = function(kbObj) {
    // options configuration and defaults
    kbObj = kbObj || {};
    kbObj.url = (kbObj.url) ? kbObj.url : '/';
    kbObj.data = (kbObj.data) ? kbObj.data : null;
    kbObj.method = (kbObj.method) ? kbObj.method : 'GET';
    kbObj.headers = (kbObj.headers) ? kbObj.headers : false;
    kbObj.cors = (kbObj.cors) ? kbObj.cors : false;
    kbObj.async = (kbObj.async) ? kbObj.async : true;
    kbObj.serialize = (kbObj.serialize) ? kbObj.serialize : false;

    function serialize(obj) {
        var str = [];
        for(var p in obj){
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        }
        return str.join("&");
    };

    if(kbObj.serialize === true) {
        kbObj.data = serialize(kbObj.data);
    }

    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(kbObj.method, kbObj.url, kbObj.async);

        // check status
        xhr.onload = function() {
            if(xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(Error('Error: ', xhr.statusTxt));
            }
        };

        // network error
        xhr.onerror = function() {
            reject(Error('Network Error'));
        };

        // set headers
        if(kbObj.headers !== false) {
            kbObj.headers.type = kbObj.headers.type || 'Content-Type';
            kbObj.headers.value = kbObj.headers.value || 'text/plain;charset=UTF-8';
            xhr.setRequestHeader(kbObj.headers.type, kbObj.headers.value);
        }
        
        if(kbObj.headers === false && kbObj.method.toLowerCase() === 'post' && kbObj.serialize === true) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        // make the request
        if(kbObj.method.toLowerCase() === 'get') {
            xhr.send(null);
        } else {
            xhr.send(kbObj.data);
        }
    });
};

kickback.get = function(url, cors) {
    if(typeof url === 'undefined') {
        return new Error('No URL supplied');
    }

    // return new Promise
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);

        xhr.onload = function() {
            // check status OK
            if(xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(Error(xhr.statusText));
            }
        };

        // handle network errors
        xhr.onerror = function() {
            reject(Error('Network Error'));
        };

        // make the request
        xhr.send();
    });
};

// see if we are in node if so support it!
if(typeof module !== 'undefined' && module.exports) {
    module.exports = kickback;
}
