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


var Jugadores = function(jugador,updateUser)
{
    jugador.username = updateUser.username;
    jugador.Nombre = updateUser.Nombre;
    jugador.password = updateUser.password;
    jugador.CorreoExterno = updateUser.CorreoExterno;
}

module.exports.Jugadores = Jugadores;


module.exports.JugadoresForAdmin = function(jugador,updateUser)
{
    Jugadores(jugador,updateUser);
    jugador.activo = updateUser.activo;
    jugador.IdRol = updateUser.IdRol;
}