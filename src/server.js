import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import usuariosRoutes from '../routes/usuariosRoutes.js'
import { conectaNoBanco } from '../config/db.js'


dotenv.config();
await conectaNoBanco();

const app = express();
app.use(cors());

// Resolver __dirname para ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir arquivos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Garantir que a raiz sirva o index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());
app.use('/usuarios', usuariosRoutes);

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
