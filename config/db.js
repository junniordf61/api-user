import mongoose from 'mongoose';

export async function conectaNoBanco() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('🟢 Conectado ao MongoDB com sucesso!');
    } catch (erro) {
        console.log('Erro ao conectar no banco', erro);
    };
};