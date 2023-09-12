function verificarInputs() {
    let user = document.getElementById("input-user").value;
    let TelefoneFixo = document.getElementById("input-TelF").value;
    let TelefoneCelular = document.getElementById("input-TelCel").value;
    let imgLink = document.getElementById("input-imgLink").value;
    let nascimento = document.getElementById("input-nascimento").value;
    let email = document.getElementById("input-email").value;
    let cEP = document.getElementById("input-cEP").value;
    let cidade = document.getElementById("input-cidade").value;
    let insta = document.getElementById("input-insta").value;
    let Git = document.getElementById("input-Git").value;

    if (user == '' || TelefoneFixo == '' || TelefoneCelular == '' || imgLink == '' || nascimento == '' || email == '' || cEP == '' || cidade == '' || insta == '' || Git == '') {
        return true;
    } else {
        return false;
    }
}

function envieMsg(msg, tipo) {
    let msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    let msgParaTela = `
        <p class='${tipo}'>${msg}</p>
    `

    msgDiv.innerHTML += msgParaTela;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);

}

class User {
    constructor(user, TelefoneFixo, TelefoneCelular, imgLink, nascimento, email, cEP, cidade, insta, Git) {
        this.user = user;
        this.TelefoneFixo = TelefoneFixo;
        this.TelefoneCelular = TelefoneCelular;
        this.imgLink = imgLink;
        this.nascimento = nascimento;
        this.age = this.getAge();
        this.email = email;
        this.cEP = cEP;
        this.cidade = cidade;
        this.insta = insta;
        this.Git = Git;
        this.id = this.randomId();
        this.signo = this.getZodiacSign();
    }
    getAge() {
        const hoje = new Date();
        const nascimento = new Date(this.nascimento);

        console.log("Data de hoje: ", hoje);
        console.log("Data de nascimento: ", this.nascimento);

        console.log("Verificar Nascimento: ", nascimento);

        const anoAtual = hoje.getFullYear();
        const mesAtual = hoje.getMonth() + 1;
        const diaAtual = hoje.getDate();

        const anoNascimento = nascimento.getFullYear();
        const mesNascimento = nascimento.getMonth() + 1;
        const diaNascimento = nascimento.getDate();

        let anos = anoAtual - anoNascimento;
        let meses = mesAtual - mesNascimento;
        let dias = diaAtual - diaNascimento;

        if (dias < 0) {
            meses--;
            dias += new Date(anoAtual, mesAtual - 1, 0).getDate();
        }

        if (meses < 0) {
            anos--;
            meses += 12;
        }

        return `${anos} anos`;

    }
    getZodiacSign() {
        let nasciment = new Date(this.nascimento);
        let month =  nasciment.getMonth() + 1;
        let day = nasciment.getDate();
        console.log("Passou pelo getSigno() da class User");
    
        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
           return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
           return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
           return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
           return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
           return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
           return "Gêmeos ♊";      
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
           return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
           return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
           return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
           return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
           return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
           return "Sagitário ♐";
        }
    }
    randomId(){
        return Math.floor(Math.random() * 9998) + 1;
}
}

function comporUser() {
    let user = document.getElementById("input-user").value;
    let TelefoneFixo = document.getElementById("input-TelF").value;
    let TelefoneCelular = document.getElementById("input-TelCel").value;
    let imgLink = document.getElementById("input-imgLink").value;
    let nascimento = document.getElementById("input-nascimento").value;
    let email = document.getElementById("input-email").value;
    let cEP = document.getElementById("input-cEP").value;
    let cidade = document.getElementById("input-cidade").value;
    let insta = document.getElementById("input-insta").value;
    let Git = document.getElementById("input-Git").value;

    const usuario = new User(user, TelefoneFixo, TelefoneCelular, imgLink, nascimento, email, cEP, cidade, insta, Git);

    armazenUsers.add(usuario)

    render();
}

class ListaUsers {
    constructor() {
        this.listaUsers = [];
    }
    add(user) {
        if (verificarInputs()) {
            console.log("Deu erro");
            return envieMsg("Preencha todos os dados!", "error");
        } else if (!isURLValida(user.imgLink)) {
            envieMsg("URL inválida", "error");
        } else {
            console.log("Deu certo");
            this.listaUsers.push(user);
            limparInputs();
            envieMsg("Cadastro feito com sucesso", "sucesso");
        }
    }
    getUserById(id) {
        return this.listaUsers.find(usuario => usuario.id == id);
    }
    

}

const armazenUsers = new ListaUsers();

function limparInputs() {
    document.getElementById("input-user").value = '';
    document.getElementById("input-TelF").value = '';
    document.getElementById("input-TelCel").value = '';
    document.getElementById("input-imgLink").value = '';
    document.getElementById("input-nascimento").value = '';
    document.getElementById("input-email").value = '';
    document.getElementById("input-cEP").value = '';
    document.getElementById("input-cidade").value = '';
    document.getElementById("input-insta").value = '';
    document.getElementById("input-Git").value = '';

}

function renderizarUsers(id) {
document.getElementById("containerLista").classList.remove("hidden");



    const user = armazenUsers.getUserById(id); 
   

    const listaHTML = document.getElementById("containerLista");
    listaHTML.innerHTML = '';

        const usersDiv = `
       <div class="usersDelta">
       <img id="userImg" src="${user.imgLink}" alt="${user.user}">
       <h1>${user.user}</h1>
       <h2>Indentificador: ${user.id}</h2>
       <h3>Telefone: ${formatedCellphone(user.TelefoneFixo)}</h3>
       <h3>Celular: ${formatedCellphone(user.TelefoneCelular)}</h3>
       <h3>Data de Nascimento: ${dateinPTBR(user.nascimento)}</h3>
       <h3>Idade: ${user.getAge()}</h3>
       <h3>Signo: ${user.signo}</h3>
       <h3>Email: ${user.email}</h3>
       <h3>CEP: ${formatedCep(user.cEP)}</h3>
       <h3>Cidade: ${user.cidade}</h3>
       <h3>Instagram: ${user.insta}</h3>
       <h3>Github: ${user.Git}</h3>

       <button id="botao-voltar" class="butto" onclick="volta()">Voltar</button>
       </div>
       `
        listaHTML.innerHTML += usersDiv;
    }


function render() {
    document.getElementById("cardLista").classList.remove("hidden");
    let userdCard = ''
    let card = armazenUsers.listaUsers;

    card.forEach((user)=> { 
        userdCard += `
        <div class="usercardDelta" onclick="renderizarUsers(${user.id})" >
        <img id="userImg" src="${user.imgLink}" alt="${user.user}">
        <h1>${user.user}</h1>
        <h3>Telefone: ${formatedCellphone(user.TelefoneFixo)}</h3>
        <h3>Celular: ${formatedCellphone(user.TelefoneCelular)}</h3>
        </div>`
    }) 
    document.getElementById("cardLista").innerHTML = userdCard;
}
function volta() {
    document.getElementById("container").classList.remove("hidden")
    document.getElementById("containerLista").classList.add("hidden")
}

function isURLValida(url) {
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return true;
    } else {
        return false;
    }
}

function formatedCellphone(cellphone) {
    console.log("Passou pela funcao formatedCellphone()");

    let cellphoneArray = cellphone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}
function dateinPTBR(data) {
    console.log("Passou pela funcao dateinPTBR()");

    let dateArray = data.split("-");
    let datePTBR = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
    return datePTBR;
}
function formatedCep(cep) {
    console.log("Passou pela funcao formatedCellphone()");

    let cepArray = cep.split("");
    let cepFormated = cepArray[0] + cepArray[1]
        + cepArray[2] + cepArray[3] + cepArray[4] + "-"
        + cepArray[5] + cepArray[6]
        + cepArray[7];
    return cepFormated;
}