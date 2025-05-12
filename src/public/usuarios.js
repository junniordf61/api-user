const API_BASE_URL = "https://api-user-5gkk.onrender.com";

document.getElementById('listarUsuarios').addEventListener('click', listarUsuarios);

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

