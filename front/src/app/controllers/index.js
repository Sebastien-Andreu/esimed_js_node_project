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
                this.isConnected = true
            }
        }
        else {
            $("#headerBody").innerHTML = `
                <h6 data-bs-target="#modalSign" data-bs-toggle="modal">Connexion</h6>
                <h6 data-bs-target="#modalSignup" data-bs-toggle="modal">Inscription</h6>`

            this.isConnected = false
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
                            this.token = data
                            this.toastInfo("User connected !")
                            this.isConnected = true
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
        this._send('users', 'get', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        })
            .then(res => {
                res.json().then(data => {
                    if (res.status === 200) {
                        this.user = data
                        $("#headerBody").innerHTML = `
                            <p>Connecté avec ` + data.pseudo + `</p>
                            <h6 data-bs-target="#modalLogout" data-bs-toggle="modal">Déconnexion</h6>`
                        this.showSession()
                    } else {
                        this.deconnection()
                        this.toastError("Le token n'est pas valide")
                    }

                })
            })
            .catch(err => {
                this.deconnection()
                this.toastError(err)
            })
    }

    showSession() {
        $("#headerSessionList").innerHTML = `<h1>List des sessions</h1>`
        this._send('sessions/' + this.user.id, 'get', {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        })
            .then(res => {
                res.json().then(data => {
                    if (res.status === 200) {
                        $("#sessionList").innerHTML= ''
                        data.forEach( session => {
                            $("#sessionList").innerHTML += `
                                <div class="containerSession" id="session`+session.id+`">
                                <div>
                                    <div class="headerList">
                                        <h2>Session du `+session.date+`</h2>
                                        <button type="button" class="btn btn-outline-info btn-lg" data-bs-target="#modalCreateUS" data-bs-toggle="modal" onclick="userController.saveSessionId(`+session.id+`)" ">Ajouter une personne</button>
                                    </div>
                                </div>
                                </div>
                            `

                            this._send('userSessions/meet/' + session.id, 'get', {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.token}`
                            })
                                .then(res => {
                                    res.json().then(data => {
                                        if (res.status === 200) {
                                            $("#session" + session.id).innerHTML += `<div id="meet` + session.id + `">  
                                                <h3>Personne rencontré</h3>
                                            </div>
                                            `
                                            data.forEach(userSession => {
                                                this._send('meet/' + userSession.id + '&' + session.id, 'get', {
                                                    'Content-Type': 'application/json',
                                                    'Authorization': `Bearer ${this.token}`
                                                })
                                                    .then(res => {
                                                        res.json().then(meet => {
                                                            console.log(meet)
                                                            $("#meet" + session.id).innerHTML += `
                                                                <div class="show">` + userSession.name + `, ` + userSession.surname + `, ` + userSession.date + `, ` + userSession.sexe + `, ` + meet[0].note + `/10
                                                                    <button type="button" class="btn btn-danger" data-bs-target="#modalDeleteMeet" data-bs-toggle="modal"  onclick="userController.saveUserToMeet(` + userSession.id + `, ` + session.id + `)">Supprimer</button>
                                                                </div>
                                                            `
                                                        })
                                                    })
                                                    .catch(err => {
                                                        this.toastError(err)
                                                    })
                                            })

                                        }
                                    })
                                })
                                .catch(err => {
                                    this.toastError(err)
                                })

                            this._send('userSessions/notMeet/' + session.id, 'get', {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${this.token}`
                            })
                                .then(res => {
                                    res.json().then(data => {
                                        if (res.status === 200) {
                                            $("#session" + session.id).innerHTML += `<div id="notMeet`+session.id+`">  
                                                <h3>Personne a rencontrer</h3>
                                            </div>`
                                            data.forEach( userSession => {
                                                $("#notMeet" + session.id).innerHTML += `
                                                    <div class="show">` + userSession.name +`, `+ userSession.surname+`, `+ userSession.date+`, `+ userSession.sexe + `
                                                        <button type="button" class="btn btn-success" data-bs-target="#modalMeet" data-bs-toggle="modal"  onclick="userController.saveUserToMeet(`+userSession.id+`, `+session.id+`)" ">Rencontrer</button>
                                                        <button type="button" class="btn btn-danger" data-bs-target="#modalDelete" data-bs-toggle="modal"  onclick="userController.saveUserSelected(`+userSession.id+`)" ">Supprimer</button>
                                                    </div>
                                                `
                                            })
                                        }
                                    })
                                })
                                .catch(err => {
                                    this.toastError(err)
                                })
                        })
                    }
                })
            })
            .catch(err => {
                this.toastError(err)
            })
    }

    deconnection() {
        localStorage.removeItem(this.storageToken)
        this.isConnected = false
        $("#headerSessionList").innerHTML = ''
        $("#sessionList").innerHTML = ''
        this.init()
    }

    onUserWantToCreateSession() {
        if (!this.isConnected) {
            new bootstrap.Modal("#modalSign").show()
        } else {
            const today = new Date();
            const myDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            this._send('sessions', 'post', { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${this.token}` }, {
                date: myDate,
                idUser: this.user.id
            })
                .then(res => {
                    this.toastInfo("Une nouvelle session a été créée")
                    this.init()
                })
                .catch(err => {
                    this.toastError(err)
                })
        }
    }

    addUserSession() {
        if (this.sessionId !== undefined) {
            let genre = undefined
            if ($("#USHomme").checked) {
                genre = "Homme"
            } else {
                genre = "Femme"
            }

            this._send('userSessions', 'post', { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${this.token}` }, {
                name: $("#USName").value,
                surname: $("#USSurname").value,
                sexe: genre,
                date: $("#USDate").value,
                idSession: this.sessionId
            })
                .then(res => {
                    this.toastInfo("Une nouvelle utilisateur a été ajouté a la session")
                    $('#modalCreateUS').style.display = "none"
                    $('.modal-backdrop').style.display = "none"
                    this.init()
                })
                .catch(err => {
                    this.toastError(err)
                })
        }
    }

    saveSessionId(id) {
        this.sessionId = id
    }

    saveUserSelected(id) {
        this.idUserSelected = id
    }

    saveUserToMeet(idUser, idSession) {
        this.idUserSelected = idUser
        this.sessionId = idSession
    }

    deleteUserSession() {
        if (this.idUserSelected !== undefined) {
            this._send('userSessions', 'delete', { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${this.token}` }, {
                idSession: this.idUserSelected,
            })
                .then(res => {
                    this.toastInfo("l'utilisateur a bien été supprimé")
                    this.init()
                    this.userSelected = undefined
                })
                .catch(err => {
                    this.toastError(err)
                })
        }
    }

    meetUserSession() {
        if (this.idUserSelected !== undefined && this.sessionId !== undefined) {
            const today = new Date();
            const myDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

            this._send('meet', 'post', { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${this.token}` }, {
                date: myDate,
                idUser: this.user.id,
                idSession: this.sessionId,
                idUserSession: this.idUserSelected,
                note: $("#meetNote").value
            })
                .then(res => {
                    this.toastInfo("l'utilisateur a bien été rencontré")
                    this.init()
                    $("#meetNote").value = "0"
                    this.userSelected = undefined
                })
                .catch(err => {
                    this.toastError(err)
                })
        }
    }

    deleteUserSessionMeet() {
        if (this.idUserSelected !== undefined && this.sessionId !== undefined) {
            this._send('meet', 'delete', { 'Content-Type' : 'application/json', 'Authorization': `Bearer ${this.token}` }, {
                idUser: this.user.id,
                idSession: this.sessionId,
                idUserSession: this.idUserSelected
            })
                .then(res => {
                    this.toastInfo("la rencontre a bien été supprimé")
                    this.init()
                    this.userSelected = undefined
                })
                .catch(err => {
                    this.toastError(err)
                })
        }
    }
}

window.userController = new Index()

