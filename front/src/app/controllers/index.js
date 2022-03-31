class Index extends BaseController {
    constructor() {
        super()
        this.init()
    }

    init() {
        if (localStorage.getItem(this.storageToken)) {
            this.token = localStorage.getItem(this.storageToken)
            if (this.token !== undefined) {
                this.showHeaderConnected()
            }
        }
        else {
            $("#headerBody").innerHTML = `
                <h6 data-bs-target="#modalSign" data-bs-toggle="modal">Connexion</h6>
                <h6 data-bs-target="#modalSignup" data-bs-toggle="modal">Inscription</h6>`
        }
    }

    inscription() {
        const email = $("#email")
        const pseudo = $("#pseudo")
        const password = $("#password")

        let errorEmail, errorPseudo, errorPassword = false

        if (email.value.length === 0) {
            email.style.borderColor = "#ff0100"
            $("#errorMsg").innerHTML += `<p>Veuillez remplir de champ de l'email</p>`
            errorEmail = true
        } else {
            if (!validateEmail(email.value)) {
                email.style.borderColor = "#ff0100"
                $("#errorMsg").innerHTML += `<p>Format de l'email non valide</p>`
                errorEmail = true
            } else {
                email.style.borderColor = "#ced4da"
                $("#errorMsg").innerHTML = ""
                errorEmail = false
            }
        }

        if (pseudo.value.length === 0) {
            pseudo.style.borderColor = "#ff0100"
            $("#errorMsg").innerHTML += `<p>Veuillez remplir de champ du pseudo</p>`
            errorPseudo = true
        } else {
            pseudo.style.borderColor = "#ced4da"
            $("#errorMsg").innerHTML = ""
            errorPseudo = false
        }

        if (password.value.length === 0) {
            password.style.borderColor = "#ff0100"
            $("#errorMsg").innerHTML += `<p>Veuillez remplir de champ du password</p>`
            errorPassword = true
        } else {
            password.style.borderColor = "#ced4da"
            $("#errorMsg").innerHTML = ""
            errorPassword = false
        }


        if (!errorEmail && !errorPseudo && !errorPassword) {
            this._send('signup', 'POST', { 'Content-Type' : 'application/json'}, {
                email : email.value,
                pseudo : pseudo.value,
                password : password.value
            })
                .then(res => {
                    res.json().then(data => {
                        if (res.status !== 200) {
                            $("#errorMsg").innerHTML += `<p>`+data+`</p>`
                        } else {
                            $('#modalSignup').style.display = "none"
                            $('.modal-backdrop').style.display = "none"
                            email.value = ""
                            pseudo.value = ""
                            password.value = ""
                            this.toastInfo(data)
                        }
                    })
                })
                .catch(err => {
                    this.toastError(err)
                })
        }
    }

    connection() {
        const email = $("#emailConnexion")
        const password = $("#passwordConnexion")

        let errorEmail, errorPassword = false

        if (email.value.length === 0) {
            email.style.borderColor = "#ff0100"
            $("#errorMsgConnexion").innerHTML += `<p>Veuillez remplir de champ de l'email</p>`
            errorEmail = true
        } else {
            if (!validateEmail(email.value)) {
                email.style.borderColor = "#ff0100"
                $("#errorMsgConnexion").innerHTML += `<p>Format de l'email non valide</p>`
                errorEmail = true
            } else {
                email.style.borderColor = "#ced4da"
                $("#errorMsgConnexion").innerHTML = ""
                errorEmail = false
            }
        }

        if (password.value.length === 0) {
            password.style.borderColor = "#ff0100"
            $("#errorMsgConnexion").innerHTML += `<p>Veuillez remplir de champ du password</p>`
            errorPassword = true
        } else {
            password.style.borderColor = "#ced4da"
            $("#errorMsgConnexion").innerHTML = ""
            errorPassword = false
        }

        if (!errorEmail && !errorPassword) {
            this._send('login', 'POST', { 'Content-Type' : 'application/json' }, {
                email : email.value,
                password : password.value
            })
                .then(res => {
                    res.json().then(data => {
                        if (res.status !== 200) {
                            $("#errorMsgConnexion").innerHTML += `<p>`+data+`</p>`
                        } else {
                            $('#modalSign').style.display = "none"
                            $('.modal-backdrop').style.display = "none"
                            email.value = ""
                            password.value = ""
                            $("#errorMsgConnexion").innerHTML = ""
                            localStorage.setItem(this.storageToken, data)
                            this.toastInfo("User connected !")
                            this.showHeaderConnected()
                        }
                    })
                })
                .catch(err => {
                    this.toastError(err)
                })
        }

    }

    showHeaderConnected() {
        this._send('users', 'get', { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${this.token}` })
            .then(res => {
                res.json().then(data => {
                    if (res.status === 200) {
                        $("#headerBody").innerHTML = `
                            <p>Connecté avec `+data.pseudo+`</p>
                            <h6 data-bs-target="#modalLogout" data-bs-toggle="modal">Déconnexion</h6>`
                    } else {
                        this.deconnection()
                    }
                })
            })
            .catch(err => {
                this.toastError(err)
            })
    }

    deconnection() {
        localStorage.removeItem(this.storageToken)
        this.init()
    }
}

window.userController = new Index()

