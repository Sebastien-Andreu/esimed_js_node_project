class BaseController {
    constructor() {
        this.setBackButtonView('index')
        this.token = undefined
        this.storageToken = 'TOKEN'
        this.baseUrl = 'http://localhost:3000/'
    }
    setBackButtonView(view) {
        window.onpopstate = function() {
            navigate(view)
        }; history.pushState({}, '');
    }

    _send(url, method, headers, body) {
        url = this.baseUrl + url

        const fetchInit = {
            method: method,
            headers: headers,
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(body)
        }

        return fetch(url, fetchInit)
    }

    toastInfo(body) {
        $(".toast-body").innerHTML = body
        new bootstrap.Toast($("#toast")).show();
    }

    toastError(body) {
        $(".toast-body").innerHTML = body
        new bootstrap.Toast($("#toastError")).show();
    }
}
