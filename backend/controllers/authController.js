const login = (req, res) => {
  const { usuario, password } = req.body;

  // Estas son tus credenciales maestras. ¡No las olvides!
  const USUARIO_SECRETO = "admin";
  const PASSWORD_SECRETO = "jlbarber2026";

  if (usuario === USUARIO_SECRETO && password === PASSWORD_SECRETO) {
    // Si atina, lo dejamos pasar
    res.json({ success: true, mensaje: "¡Bienvenido Jefe!" });
  } else {
    // Si se equivoca, lo rebotamos con un error 401 (No Autorizado)
    res.status(401).json({ success: false, mensaje: "Credenciales incorrectas" });
  }
};

module.exports = { login };