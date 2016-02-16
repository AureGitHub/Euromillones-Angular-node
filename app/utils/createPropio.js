
module.exports.Jugadores = function(createUser)
{
    
    var jugador={};
    jugador.username = createUser.username;
    jugador.Nombre = createUser.Nombre;
    jugador.password = createUser.password;
    jugador.CorreoExterno = createUser.CorreoExterno;
    jugador.activo = createUser.activo;
    jugador.IdRol = createUser.IdRol;
    
    return jugador;
    
}