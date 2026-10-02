
function validarNome(nome) {
  return nome.trim().length >= 3;
}

function validarEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validarSenha(senha) {
  return senha.length >= 6 && /\d/.test(senha);
}


function mostrarMensagem(elementoId, msg, classe) {
  const el = document.getElementById(elementoId);
  el.textContent = msg;
  el.className = classe;
}


function getUsuarios() {
  const dados = localStorage.getItem("usuariosBiblioteca");
  return dados ? JSON.parse(dados) : [];
}

function salvarUsuarios(lista) {
  localStorage.setItem("usuariosBiblioteca", JSON.stringify(lista));
}


function cadastrar() {
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const senha = document.getElementById("senha");
  const confirmar = document.getElementById("confirmar");

  let valido = true;

  document.querySelectorAll("input").forEach(i => {
    i.classList.remove("erro", "sucesso");
  });

  
  if (!validarNome(nome.value)) {
    nome.classList.add("erro");
    valido = false;
  } else {
    nome.classList.add("sucesso");
  }

  
  if (!validarEmail(email.value)) {
    email.classList.add("erro");
    valido = false;
  } else {
    email.classList.add("sucesso");
  }

  
  if (!validarSenha(senha.value)) {
    senha.classList.add("erro");
    valido = false;
  } else {
    senha.classList.add("sucesso");
  }

  
  if (senha.value !== confirmar.value || confirmar.value === "") {
    confirmar.classList.add("erro");
    valido = false;
  } else {
    confirmar.classList.add("sucesso");
  }

  if (!valido) {
    mostrarMensagem("mensagem", "❌ Verifique os campos obrigatórios!", "erro-msg");
    return;
  }

  // Verifica se o e-mail já está cadastrado
  const usuarios = getUsuarios();
  const jaExiste = usuarios.some(u => u.email === email.value);

  if (jaExiste) {
    mostrarMensagem("mensagem", "❌ Este e-mail já está cadastrado!", "erro-msg");
    email.classList.add("erro");
    return;
  }


  usuarios.push({
    nome: nome.value,
    email: email.value,
    senha: senha.value
  });
  salvarUsuarios(usuarios);

  mostrarMensagem("mensagem", "✅ Cadastro realizado com sucesso!", "sucesso-msg");

  document.getElementById("formCadastro").reset();
  document.querySelectorAll("input").forEach(i => i.classList.remove("sucesso"));
}


function login() {
  const emailInput = document.getElementById("loginEmail");
  const senhaInput = document.getElementById("loginSenha");

  emailInput.classList.remove("erro", "sucesso");
  senhaInput.classList.remove("erro", "sucesso");

  const email = emailInput.value;
  const senha = senhaInput.value;

  if (email === "" || senha === "") {
    mostrarMensagem("mensagemLogin", "❌ Preencha e-mail e senha!", "erro-msg");
    return;
  }

  const usuarios = getUsuarios();
  const usuario = usuarios.find(u => u.email === email);

  if (!usuario) {
    emailInput.classList.add("erro");
    mostrarMensagem("mensagemLogin", "❌ Usuário não encontrado!", "erro-msg");
    return;
  }

  if (usuario.senha !== senha) {
    senhaInput.classList.add("erro");
    mostrarMensagem("mensagemLogin", "❌ Senha incorreta!", "erro-msg");
    return;
  }

  emailInput.classList.add("sucesso");
  senhaInput.classList.add("sucesso");
  mostrarMensagem("mensagemLogin", "✅ Login realizado com sucesso, " + usuario.nome + "!", "sucesso-msg");
}


function rodarTestes() {
  console.assert(validarEmail("teste@gmail.com") === true, "Email válido falhou");
  console.assert(validarEmail("teste@") === false, "Email inválido passou");

  console.assert(validarNome("Maria") === true, "Nome válido falhou");
  console.assert(validarNome("Jo") === false, "Nome inválido passou");

  console.assert(validarSenha("123456") === true, "Senha válida falhou");
  console.assert(validarSenha("abc") === false, "Senha inválida passou");

  console.log("✅ Testes de unidade concluídos!");
}

rodarTestes();