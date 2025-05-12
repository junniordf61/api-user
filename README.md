# 🛡️ Sistema de Gestão de Usuários com Autenticação JWT

Este projeto é uma API Node.js com integração a um Front-end HTML/CSS/JavaScript puro, que simula um painel de gestão de usuários com cadastro, login e autenticação via JWT.


## 📋 Funcionalidades

- ✅ Cadastro de usuários
- ✅ Login com geração de Token JWT
- ✅ Listagem protegida de usuários (exige token)
- ✅ Visualização do perfil do usuário logado
- ✅ Painel exclusivo para administradores
- ✅ Controle de sessão no Front-end
- ✅ Design responsivo com efeito glassmorphism



## 🚀 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **MongoDB + Mongoose**
- **JWT (JSON Web Token)**
- **Bcrypt (Criptografia de Senhas)**
- **HTML5 + CSS3 + JavaScript Puro**


## ⚙️ Como Rodar o Projeto Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio

### Instale as depedências 
npm install

Configure as Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:

MONGO_URI=sua_string_de_conexao_do_mongodb
JWT_SECRET=sua_chave_secreta

4. Inicie o Servidor
bash
Copiar
Editar
npm run dev

🌐 Acessar o Front-end

Abra o navegador em:
http://localhost:3000

🔒 Controle de Acesso
Apenas usuários autenticados conseguem:

Listar usuários

Ver perfil

Apenas administradores conseguem:

Acessar o painel /admin/dashboard

📝 Licença
Este projeto está sob a licença MIT.
Sinta-se livre para usar e contribuir.

🤝 Contribuições
Contribuições são bem-vindas!
Abra uma issue ou envie um pull request.


📌 **Troque** `seu-usuario/seu-repositorio` pelo seu GitHub.

Deseja que eu gere uma **versão em inglês** também?

