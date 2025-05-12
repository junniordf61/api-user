import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
    const authHeaders = req.headers['authorization'];
    if (!authHeaders) {
        return res.status(401).json({message: 'Token não fornecido'});
    }

    const token = authHeaders.replace('Bearer ', '').trim();  //remove o prefixo bearer e deixa o token limpo

    try {
        const usuarioDecodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = usuarioDecodificado;
        next();
    } catch {
        return res.status(403).json({message: 'Token inválido ou expirado'})
    }
}
