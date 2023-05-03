/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/ubses';
  var tbody = document.getElementById('ubsTableContent');
  tbody.innerHTML = '';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => { data.ubses.forEach(ubs => insertList(ubs.cnes, ubs.nome_fantasia, ubs.endereco, ubs.latitude, 
                                            ubs.longitude, ubs.telefone, ubs.fila, ubs.movimentacao_mes, 
                                            ubs.media_movimentacao_diaria))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


const getUsuarios = async () => {
  let url = 'http://127.0.0.1:5000/usuarios';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      atualizaSelectUsuarios(data.usuarios)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const getUBSes = async () => {
  let url = 'http://127.0.0.1:5000/ubses';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      atualizaSelectUBSes(data.ubses)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()

getUsuarios()

getUBSes()


/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo usuário com nome, celular 
  --------------------------------------------------------------------------------------
*/
const novoUsuario = () => {
  let nome = document.getElementById("nome").value;
  let celular = document.getElementById("celular").value;

  if (nome === '') {
    alert("Escreva o nome do usuário!");
  } else if (isNaN(celular)) {
    alert("O campo celular precisa ter números!");
  } else {
    postUsuario(nome, celular)
    alert("Usuário adicionado na base de dados!")
    getUsuarios()
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para colocar um usuário na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postUsuario = async (nome, celular) => {
  const formData = new FormData();
  formData.append('nome', nome);
  formData.append('celular', celular);

  let url = 'http://127.0.0.1:5000/usuario';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json() )
    .catch((error) => {
      console.error('Error:', error);
    });
}


const atualizaSelectUsuarios = (usuarios) => {
  //Pega o select de usuários
  selectUsuario = document.getElementById("usuario_id");
  //Limpas as opções do select
  selectUsuario.options.length = usuarios.length;
  //Carrega a lista de usuarios vindas da base no select
  for(let i = 0; i < usuarios.length; i++) {
    let option = document.createElement("option");
    option.text = usuarios[i].nome;
    option.value = usuarios[i].id;
    selectUsuario.options[i] = option;    
  }
}

const atualizaSelectUBSes = (ubses) => {
  //Pega tag select de UBSes da página index.html
  selectUBS = document.getElementById("ubs_id");
  //Atualiza o tamanho da lista de acordo com o tamanho da lista de ubses
  selectUBS.options.length = ubses.length;
  //Carrega a lista de ubses vindas da base no select
  for(let i = 0; i < ubses.length; i++) {
    let option = document.createElement("option");
    option.text = ubses[i].nome_fantasia;
    option.value = ubses[i].id;
    selectUBS.options[i] = option;
  }
}


/*
  --------------------------------------------------------------------------------------
  Função para adicionar uma nova Unidade de Saúde com CNES, nome, endereço, latitude, 
  longitude, telefone 
  --------------------------------------------------------------------------------------
*/
const novaUBS = () => {
  let cnes = document.getElementById("cnes").value;
  let nome_fantasia = document.getElementById("nome_fantasia").value;
  let endereco = document.getElementById("endereco").value;
  let latitude = document.getElementById("latitude").value;
  let longitude = document.getElementById("longitude").value;
  let telefone = document.getElementById("telefone").value;
  
  if (nome_fantasia === '' || endereco === '') {
    alert("Escreva o nome, endereço e a cidade da Unidade Básica de Saúde");
  } else if (isNaN(telefone) || isNaN(latitude) || isNaN(longitude) || isNaN(cnes)) {
    alert("Os campos CNES, Telefone, latitude e longitude precisam ter números!");
  } else {
    postUBS(cnes, nome_fantasia, endereco, latitude, longitude, telefone)
    alert("Unidade Básica de Saúde adicionada na base de dados!")
    getList()
    getUBSes()
  }
}


/*
  ------------------------------------------------------------------------------------------
  Função para colocar uma unidade básica de saúde na lista do servidor via requisição POST
  ------------------------------------------------------------------------------------------
*/
const postUBS = async (cnes, nome_fantasia, endereco, latitude, longitude, telefone) => {
  const formData = new FormData();
  formData.append('cnes', cnes);
  formData.append('nome_fantasia', nome_fantasia);
  formData.append('endereco', endereco);
  formData.append('latitude', latitude);
  formData.append('longitude', longitude);
  formData.append('telefone', telefone);

  let url = 'http://127.0.0.1:5000/ubs';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {return response.json()})
    .catch((error) => {
      console.error('Error:', error);
    });
}




/*
  ---------------------------------------------------------
  Função para adicionar um novo registro de entrada na UBS 
  ---------------------------------------------------------
*/
const novoRegistro = () => {
  let usuario_id = document.getElementById("usuario_id").value;
  let ubs_id = document.getElementById("ubs_id").value;
  
  if (usuario_id === 0 || ubs_id === 0) {
    alert("Selecione o usuário e a UBS!");
  } else {
    postRegistro(usuario_id, ubs_id);
    alert("registro realizado!");
    getList();
  }
}




/*
  ------------------------------------------------------
  Função para registrar usuário em uma unidade de saude 
  ------------------------------------------------------
*/
const postRegistro = async (usuario_id, ubs_id) => {
  const formData = new FormData();
  formData.append('usuario_id', usuario_id);
  formData.append('ubs_id', ubs_id);
  
  let url = 'http://127.0.0.1:5000/registro';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (cnes, nome, endereco, latitude, longitude, telefone, fila, movimentacao_mes, media_movimentacao_diaria) => {
  var createImg = document.createElement('img');
  createImg.src = "https://img.icons8.com/ios/50/000000/google-maps.png";
  createImg.style.width = "25px";

  var createA = document.createElement('a');
  createA.setAttribute('href', 'https://www.google.com/maps/?q='+latitude+','+longitude);
  createA.appendChild(createImg);

  var item = [cnes, nome, endereco, createA, telefone, fila, movimentacao_mes, media_movimentacao_diaria]
  var table = document.getElementById('ubsTableContent');
  var row = table.insertRow();
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    if(i == 3){
      cel.appendChild(createA);      
    }else{
      cel.textContent = item[i];
    }
    cel.style = "text-align: center;"
  }
}