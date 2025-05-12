const API_BASE_URL = "https://api-user-5gkk.onrender.com";

const formContainer = document.getElementById('formContainer');
const registerContainer = document.getElementById('registerContainer');
const usuariosContainer = document.getElementById('usuariosContainer');
const listaUsuarios = document.getElementById('listaUsuarios');

function showRegister() {
  formContainer.classList.add('hidden');
  registerContainer.classList.remove('hidden');
  usuariosContainer.classList.add('hidden');
}

function logout() {
  localStorage.removeItem('token');
  formContainer.classList.remove('hidden');
  registerContainer.classList.add('hidden');
  usuariosContainer.classList.add('hidden');
  perfilContainer.classList.add('hidden');
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

  try {
    const res = await fetch(`${API_BASE_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      verPerfilAposLogin();
    } else {
      alert(data.message || 'Erro ao fazer login.');
    }
  } catch (error) {
    console.error('Erro no login:', error.message);
    alert('Erro ao comunicar com o servidor: ' + error.message);
  }
};

document.getElementById('registerBtn').onclick = async function () {
  const nome = document.getElementById('registerNome').value;
  const email = document.getElementById('registerEmail').value;
  const senha = document.getElementById('registerSenha').value;

  if (!nome || !email || !senha) return alert('Preencha todos os campos.');

  try {
    const res = await fetch(`${API_BASE_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const data = await res.json();
    alert(data.message || 'Usuário cadastrado com sucesso!');
    showLogin();
  } catch (error) {
    console.error('Erro no cadastro:', error.message);
    alert('Erro ao comunicar com o servidor: ' + error.message);
  }
};

document.getElementById('listarUsuarios').addEventListener('click', listarUsuarios);

async function listarUsuarios() {
  try {
    const res = await fetch(`${API_BASE_URL}/usuarios`);
    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const usuarios = await res.json();
    listaUsuarios.innerHTML = '';
    usuarios.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `Nome: ${user.nome} | Email: ${user.email} | Perfil: ${user.role}`;
      listaUsuarios.appendChild(li);
    });
  } catch (error) {
    console.error('Erro ao listar usuários:', error.message);
    alert('Erro ao listar usuários: ' + error.message);
  }
}

async function verPerfilAposLogin() {
  const token = localStorage.getItem('token');

  try {
    const res = await fetch(`${API_BASE_URL}/usuarios/perfil`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

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
  } catch (error) {
    console.error('Erro ao carregar o perfil:', error.message);
    alert('Erro ao comunicar com o servidor: ' + error.message);
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
