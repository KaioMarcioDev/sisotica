
// src/middleware/authMiddleware.js
export const requireLogin = (req, res, next) => {
    console.log("Verificando sessão:", req.session); // Log para verificação
    if (!req.session || !req.session.userid) {
        return res.status(401).json({ message: "Você precisa estar logado para acessar esta página" });
    }
    next();
};

export const restrictToRole = (role) => (req, res, next) => {
    console.log("Verificando role:", req.session.role); // Log para verificação
    if (req.session.role !== role) {
        return res.status(403).json({ message: "Acesso não autorizado" });
    }
    next();
};
