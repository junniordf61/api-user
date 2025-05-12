import express from "express";
import { usuario } from "../src/models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { autenticarToken } from "../src/middleware/authMiddleware.js";
import { autorizarAdmin } from "../src/middleware/autorizarAdmin.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const usuarios = await usuario.find();
    res.json(usuarios);
  } catch (erro) {
    res.status(500).json({ message: "Erro ao buscar usuário" });
  }
});

router.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


router.get("/perfil", autenticarToken, async (req, res) => {
  try {
    const usuarioCompleto = await usuario.findById(req.usuario.id).select('-senha');
    if (!usuarioCompleto) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ message: 'Perfil acessado com sucesso', usuario: usuarioCompleto });
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar perfil" });
  }
});


router.get('/admin/dashboard', autenticarToken, autorizarAdmin, (req, res) => {
  res.json({message: 'Painel do administrador acessado com sucesso!'});
});

router.post("/", async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    await usuario.create({ nome, email, senha: senhaCriptografada });

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (erro) {
    res.status(400).json({ message: "Usuário não cadastrado" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuarioExistente = await usuario.findOne({ email });
    if (!usuarioExistente) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuarioExistente.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuarioExistente._id, 
        email: usuarioExistente.email, 
        role: usuarioExistente.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login realizado com sucesso!", token });
  } catch (erro) {
    res.status(500).json({ message: "Erro ao fazer login" });
  }
});

router.patch('/promover/:id', autenticarToken, autorizarAdmin, async (req, res) => {
      try {
        const usuarioPromovido = await usuario.findByIdAndUpdate(
          req.params.id,
          {role: 'admin'},
          {new: true}
        );
        res.json({message: 'Usuário promovido a admin', usuario: usuarioPromovido});
        } catch (erro) {
          res.status(500).json({message: 'Erro ao promover usuário'});
        }
      });

export default router;
