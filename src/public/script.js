const API_BASE_URL = "https://api-user-zzka.onrender.com";

const formContainer = document.getElementById('formContainer');
const registerContainer = document.getElementById('registerContainer');
const usuariosContainer = document.getElementById('usuariosContainer');
const listaUsuarios = document.getElementById('listaUsuarios');

function showRegister() {
  formContainer.classList.add('hidden');
  registerContainer.classList.remove('hidden');
  usuariosContainer.classList.add('hidden');
}

function showLogin() {
  formContainer.classList.remove('hidden');
  registerContainer.classList.add('hidden');
  usuariosContainer.classList.add('hidden');
}

document.getElementById('loginBtn').onclick = async function () {
  const email = document.getElementById('loginEmail').value;
  const senha = document.getElementById('loginSenha').value;

  if (!email || !senha) return alert('Preencha todos os campos.');

  const res = await fetch(`${API_BASE_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha })
  });

  const data = await res.json();
  if (res.ok && data.token) {
    localStorage.setItem('token', data.token);
    verPerfilAposLogin();
  } else {
    alert(data.message || 'Erro ao fazer login.');
  }
};

document.getElementById('registerBtn').onclick = async function () {
  const nome = document.getElementById('registerNome').value;
  const email = document.getElementById('registerEmail').value;
  const senha = document.getElementById('registerSenha').value;

  if (!nome || !email || !senha) return alert('Preencha todos os campos.');

  const res = await fetch(`${API_BASE_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha })
  });

  const data = await res.json();
  alert(data.message || 'Usuário cadastrado com sucesso!');
  showLogin();
};

document.getElementById('listarUsuarios').addEventListener('click', listarUsuarios);

async function listarUsuarios() {
  const res = await fetch(`${API_BASE_URL}/usuarios`);
  const usuarios = await res.json();

  listaUsuarios.innerHTML = '';
  usuarios.forEach(user => {
    const li = document.createElement('li');
    li.textContent = `Nome: ${user.nome} | Email: ${user.email} | Perfil: ${user.role}`;
    listaUsuarios.appendChild(li);
  });
}

async function verPerfilAposLogin() {
  const token = localStorage.getItem('token');

  const res = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });

  const data = await res.json();

  if (data.usuario) {
    document.getElementById('formContainer').classList.add('hidden');
    document.getElementById('perfilContainer').classList.remove('hidden');
    document.getElementById('perfilInfo').innerHTML = `
      <p><strong>Nome:</strong> ${data.usuario.nome}</p>
      <p><strong>Email:</strong> ${data.usuario.email}</p>
      <p><strong>Role:</strong> ${data.usuario.role}</p>
    `;
  } else {
    alert('Erro ao carregar o perfil');
  }
}

window.onload = function() {
  const token = localStorage.getItem('token');
  if (token) {
    verPerfilAposLogin();
  } else {
    showLogin();
  }
};
