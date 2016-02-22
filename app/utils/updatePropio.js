module.exports.TiposRoles = function(rol,updateRol)
{
     rol.descripcion = updateRol.descripcion;
}


module.exports.TiposEstadosApuesta = function(EstadosApuesta,updateEstadosApuesta)
{
     EstadosApuesta.descripcion = updateEstadosApuesta.descripcion;
}


module.exports.TiposEstadosJugador = function(EstadosJugador,updatEstadosJugador)
{
     EstadosJugador.descripcion = updatEstadosJugador.descripcion;
}






var JugadoresNoAdmin = function(jugador,updateUser)
{
    jugador.username = updateUser.username;
    jugador.Nombre = updateUser.Nombre;
    jugador.password = updateUser.password;
    jugador.CorreoExterno = updateUser.CorreoExterno;
}

module.exports.JugadoresNoAdmin = JugadoresNoAdmin;


module.exports.Jugadores = function(jugador,updateUser)
{
    JugadoresNoAdmin(jugador,updateUser);
    jugador.activo = updateUser.activo;
    jugador.IdRol = updateUser.IdRol;
}


module.exports.Saldos = function(saldo,updateSaldos)
{
    saldo.saldo = updateSaldos.saldo;
     
}