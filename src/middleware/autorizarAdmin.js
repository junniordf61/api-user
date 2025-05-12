import jwt from 'jsonwebtoken';

export function autorizarAdmin(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({message: 'Token não fornecido'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== 'admin') {
        return res.status(403).json({message: 'Acesso restrito a administradores'});
    }
    
    req.usuario = decoded;
    next();
    } catch (erro) {
        res.status(401).json({message:'Token inválido'});
    }
};