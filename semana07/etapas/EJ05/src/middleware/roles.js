function permitirRoles(...rolesPermitidos) {
  return (req, res, next) => {
    if (!req.usuario || !rolesPermitidos.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'Rol insuficiente' });
    }
    return next();
  };
}
module.exports = { permitirRoles };
