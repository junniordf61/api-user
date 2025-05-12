const API_URL = 'https://api-user-zzka.onrender.com/usuarios';


const formContainer = document.getElementById('formContainer');
const registerContainer = document.getElementById('registerContainer');
const usuariosContainer = document.getElementById('usuariosContainer');
const listaUsuarios = document.getElementById('listaUsuarios');
const perfilContainer = document.getElementById('perfilContainer');
const perfilInfo = document.getElementById('perfilInfo');

// Alternar Telas
function showRegister() {
  formContainer.classList.add('hidden');
  registerContainer.classList.remove('hidden');
  usuariosContainer.classList.add('hidden');
  perfilContainer.classList.add('hidden');
}

function showLogin() {
  formContainer.classList.remove('hidden');
  registerContainer.classList.add('hidden');
  usuariosContainer.classList.add('hidden');
  perfilContainer.classList.add('hidden');
}

function showUsuarios() {
  formContainer.classList.add('hidden');
  registerContainer.classList.add('hidden');
  usuariosContainer.classList.remove('hidden');
  perfilContainer.classList.add('hidden');
}

// Login com token e redirecionamento para o perfil
document.getElementById('loginBtn').onclick = async function () {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;

  if (!email || !senha) return alert('Preencha todos os campos.');

  const res = await fetch('/https://api-user-zzka.onrender.com/usuarios/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem('token', data.token);
    verPerfilAposLogin();
  } else {
    alert(data.message || 'Erro ao fazer login.');
  }
};

// Cadastro de usuário
document.getElementById('registerBtn').onclick = async function () {
  const nome = document.getElementById('registerNome').value;
  const email = document.getElementById('registerEmail').value;
  const senha = document.getElementById('registerSenha').value;

  if (!nome || !email || !senha) return alert('Preencha todos os campos.');

  const res = await fetch('https://api-user-zzka.onrender.com/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  });

  const data = await res.json();
  alert(data.message || 'Usuário cadastrado com sucesso!');
  showLogin();
};

// Listagem de usuários protegida por token
document.getElementById('listarUsuarios').addEventListener('click', listarUsuarios);

async function listarUsuarios() {
  const token = localStorage.getItem('token');
  const res = await fetch('/https://api-user-zzka.onrender.com/usuarios', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const usuarios = await res.json();

  listaUsuarios.innerHTML = '';
  usuarios.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `Nome: ${user.nome} | Email: ${user.email} | Perfil: ${user.role}`;
    listaUsuarios.appendChild(li);
  });
}

// Visualizar o perfil após o login
async function verPerfilAposLogin() {
  const token = localStorage.getItem('token');

  const res = await fetch('/https://api-user-zzka.onrender.com/usuarios/perfil', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await res.json();

  if (data.usuario) {
    showPerfil(data.usuario);
  } else {
    alert('Erro ao carregar o perfil');
  }
}

// Exibe o container de perfil preenchido
function showPerfil(usuario) {
  formContainer.classList.add('hidden');
  registerContainer.classList.add('hidden');
  usuariosContainer.classList.add('hidden');
  perfilContainer.classList.remove('hidden');

  perfilInfo.innerHTML = `
    <p><strong>Nome:</strong> ${usuario.nome}</p>
    <p><strong>Email:</strong> ${usuario.email}</p>
    <p><strong>Role:</strong> ${usuario.role}</p>
  `;
}

// Visualizar perfil manualmente
async function verPerfil() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado.');
    return;
  }

  const res = await fetch('/https://api-user-zzka.onrender.com/usuarios/perfil', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await res.json();
  if (data.usuario) {
    showPerfil(data.usuario);
  } else {
    alert('Erro ao carregar o perfil');
  }
}

// Ver Painel do Administrador
async function verAdminDashboard() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Você precisa estar logado como administrador.');
    return;
  }

  const res = await fetch('/https://api-user-zzka.onrender.com/usuarios/admin/dashboard', {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await res.json();
  alert(data.message || JSON.stringify(data, null, 2));
}

// Controle de Sessão ao carregar a página
window.onload = function() {
  const token = localStorage.getItem('token');
  if (token) {
    verPerfilAposLogin();
  } else {
    showLogin();
  }
};
