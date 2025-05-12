const API_BASE_URL = "https://api-user-5gkk.onrender.com";

document.getElementById('listarUsuarios').addEventListener('click', listarUsuarios);

async function listarUsuarios() {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${API_BASE_URL}/usuarios`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(error);
    }

    const usuarios = await res.json();
    const listaUsuarios = document.getElementById('listaUsuarios');
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
