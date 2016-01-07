var path = require('path');

var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null, null, null,
  { dialect: "sqlite", storage: "miBD.sqlite" }
  );

var Jugadores = sequelize.import(path.join(__dirname, 'jugadores'));

exports.Jugadores = Jugadores;

sequelize.sync().then(function () {


  Jugadores.count().then(function (count) {
    if (count === 0) {   // la tabla se inicializa solo si está vacía
      Jugadores.bulkCreate(
        [
          { id: 0, username: 'jdesande', password:'123456', Nombre: 'Jose Aurelio de Sande Villarroel', activo: 1, CorreoExterno: 'aure.desande@gmail.com', role: 1 },
          { id: 1, username: 'aalonso', password:'123456', Nombre: 'Alberto Alonso Alonso', activo: 1, CorreoExterno: '', role: 2 },
          { id: 2, username: 'aaranzue', password:'123456', Nombre: 'Alberto Aranzueque González', activo: 0, CorreoExterno: '', role: 2 },
          { id: 3, username: 'aencinas', password:'123456', Nombre: 'Alberto Encinas Escobar', activo: 1, CorreoExterno: '', role: 2 },
          { id: 4, username: 'azani', password:'123456', Nombre: 'Alberto Zani Fernández', activo: 1, CorreoExterno: '', role: 2 },
          { id: 5, username: 'aolazaba', password:'123456', Nombre: 'Alejandro Olazabal Bourdet', activo: 0, CorreoExterno: '', role: 2 },
          { id: 6, username: 'aernest', password:'123456', Nombre: 'Alfred Ernest Rinaldi', activo: 1, CorreoExterno: '', role: 2 },
          { id: 7, username: 'arobles', password:'123456', Nombre: 'Alvaro Robles Fernández', activo: 1, CorreoExterno: '', role: 2 },
          { id: 8, username: 'ajimene1', password:'123456', Nombre: 'Ana Belén Jiménez González', activo: 0, CorreoExterno: '', role: 2 },
          { id: 9, username: 'aarevalo', password:'123456', Nombre: 'Ana Mª Arevalo De La Cruz', activo: 0, CorreoExterno: '', role: 2 },
          { id: 10, username: 'ccermeno', password:'123456', Nombre: 'Cayetana Cermeño Barona', activo: 0, CorreoExterno: '', role: 2 },
          { id: 11, username: 'Cnavarre', password:'123456', Nombre: 'Carlos Navarrete', activo: 0, CorreoExterno: 'carlosnavec@gmail.com', role: 2 },
          { id: 12, username: 'cretuert', password:'123456', Nombre: 'Cristina Retuerta León', activo: 1, CorreoExterno: '', role: 2 },
          { id: 13, username: 'crodrig1', password:'123456', Nombre: 'Cristina Rodrigo Serrano', activo: 1, CorreoExterno: '', role: 2 },
          { id: 14, username: 'dcepedal', password:'123456', Nombre: 'David Cepedal Fernández', activo: 0, CorreoExterno: '', role: 2 },
          { id: 15, username: 'dsainz', password:'123456', Nombre: 'David Sainz Mera', activo: 1, CorreoExterno: '', role: 2 },
          { id: 16, username: 'DiegoMorano', password:'123456', Nombre: 'Diego Morano Lobo', activo: 0, CorreoExterno: 'diegomorano@auna.com', role: 2 },
          { id: 17, username: 'epacheco', password:'123456', Nombre: 'Elena Pacheco González', activo: 1, CorreoExterno: '', role: 2 },
          { id: 18, username: 'esanche2', password:'123456', Nombre: 'Elena Sánchez Arribas', activo: 1, CorreoExterno: '', role: 2 },
          { id: 19, username: 'ecruz', password:'123456', Nombre: 'Eusebio Cruz García', activo: 1, CorreoExterno: '', role: 2 },
          { id: 20, username: 'fblanco1', password:'123456', Nombre: 'Fernando Blanco Oroz', activo: 0, CorreoExterno: 'byterider2006@gmail.com', role: 2 },
          { id: 21, username: 'fmerelo', password:'123456', Nombre: 'Fernando Javier Merelo Rueda', activo: 1, CorreoExterno: '', role: 2 },
          { id: 22, username: 'fsanche1',  password:'123456', Nombre: 'Francisco José Sánchez Amador', activo: 1, CorreoExterno: 'horconboy@gmail.com', role: 2 },
          { id: 23, username: 'gperez3', password:'123456', Nombre: 'Gabriel Pérez Sánchez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 24, username: 'gdeluis', password:'123456', Nombre: 'Gonzalo de Luis Martínez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 25, username: 'gcenjor', password:'123456', Nombre: 'Guillermo Cenjor Rodríguez', activo: 0, CorreoExterno: '', role: 2 },
          { id: 26, username: 'IsmaelHern', password:'123456', Nombre: 'Ismael Hernandez', activo: 1, CorreoExterno: 'ismael.hernandez.fernandez@madrid.org', role: 2 },
          { id: 27, username: 'jcastril', password:'123456', Nombre: 'Javier Castrillón Bodas', activo: 1, CorreoExterno: '', role: 2 },
          { id: 28, username: 'jmonter2', password:'123456', Nombre: 'Jesús Manuel Montero Gullón', activo: 1, CorreoExterno: '', role: 2 },
          { id: 29, username: 'jros', password:'123456', Nombre: 'Jesus Ros Selgas', activo: 0, CorreoExterno: '', role: 2 },
          { id: 30, username: 'JesusGonzalez', password:'123456', Nombre: 'Jesus Gonzalez', activo: 1, CorreoExterno: 'JeGonzalez@magrama.es', role: 2 },
          { id: 31, username: 'jjuara', password:'123456', Nombre: 'Jose Carlos Juara Palomino', activo: 1, CorreoExterno: '', role: 2 },
          { id: 32, username: 'jgomez4', password:'123456', Nombre: 'José Francisco Gómez Martín', activo: 1, CorreoExterno: '', role: 2 },
          { id: 33, username: 'jpanos', password:'123456', Nombre: 'José Ignacio Paños Fernandez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 34, username: 'jromero4', password:'123456', Nombre: 'José Manuel Romero Ibañez', activo: 0, CorreoExterno: '', role: 2 },
          { id: 35, username: 'jgarrid1', password:'123456', Nombre: 'José Miguel Garrido Ballesteros', activo: 1, CorreoExterno: '', role: 2 },
          { id: 36, username: 'jblanco3', password:'123456', Nombre: 'Juan Mª Blanco Llorente', activo: 1, CorreoExterno: '', role: 2 },
          { id: 37, username: 'jfajardo', password:'123456', Nombre: 'Julio Fajardo Lazo', activo: 0, CorreoExterno: 'fajardoju@hotmail.com', role: 2 },
          { id: 38, username: 'kzetel', password:'123456', Nombre: 'Karina Zetel', activo: 1, CorreoExterno: '', role: 2 },
          { id: 39, username: 'Laura Vega', password:'123456', Nombre: 'Laura Vega', activo: 0, CorreoExterno: 'voyasalirenagrosfera@hotmail.com', role: 2 },
          { id: 40, username: 'lsolis', password:'123456', Nombre: 'Lidia Solís Conde', activo: 1, CorreoExterno: '', role: 2 },
          { id: 41, username: 'lretuert', password:'123456', Nombre: 'Lorenzo Retuerta León', activo: 1, CorreoExterno: '', role: 2 },
          { id: 42, username: 'lmartin4', password:'123456', Nombre: 'Luis Martín Romero', activo: 0, CorreoExterno: '', role: 2 },
          { id: 43, username: 'mgarci10', password:'123456', Nombre: 'Mª  Victoria García Martín', activo: 1, CorreoExterno: '', role: 2 },
          { id: 44, username: 'mgonza17', password:'123456', Nombre: 'Mª Jesús González de la Rosa', activo: 1, CorreoExterno: '', role: 2 },
          { id: 45, username: 'mzamarre', password:'123456', Nombre: 'Mª José Zamarreño Bueno', activo: 1, CorreoExterno: '', role: 2 },
          { id: 46, username: 'mperez2', password:'123456', Nombre: 'Mª Luisa Pérez Ayuso', activo: 0, CorreoExterno: 'mperezayuso@gmail.com', role: 2 },
          { id: 47, username: 'mmarti14', password:'123456', Nombre: 'Mª Soledad Martínez Cerezo', activo: 1, CorreoExterno: '', role: 2 },
          { id: 48, username: 'mcuadra', password:'123456', Nombre: 'Manuel Francisco Cuadra García', activo: 1, CorreoExterno: '', role: 2 },
          { id: 49, username: 'mmarti13', password:'123456', Nombre: 'Manuel Martínez Miralles', activo: 0, CorreoExterno: 'manumm11@hotmail.com', role: 2 },
          { id: 50, username: 'mfrancia', password:'123456', Nombre: 'María Francia Hernández', activo: 1, CorreoExterno: '', role: 2 },
          { id: 51, username: 'mvacas', password:'123456', Nombre: 'Mercedes Vacas Merino', activo: 1, CorreoExterno: 'mercedesvacas@gmail.com', role: 2 },
          { id: 52, username: 'mpoveda', password:'123456', Nombre: 'Miguel Angel Poveda Mañosa', activo: 0, CorreoExterno: '', role: 2 },
          { id: 53, username: 'mmorale1', password:'123456', Nombre: 'Miguel Morales García', activo: 0, CorreoExterno: '', role: 2 },
          { id: 54, username: 'nzabalet', password:'123456', Nombre: 'Nekane Zabaleta Erostarbe', activo: 1, CorreoExterno: 'nekane.zabaleta@gmail.com', role: 2 },
          { id: 55, username: 'nserra', password:'123456', Nombre: 'Nuria Serra Ramiro', activo: 1, CorreoExterno: '', role: 2 },
          { id: 56, username: 'oserna', password:'123456', Nombre: 'Oscar Serna Serna', activo: 0, CorreoExterno: '', role: 2 },
          { id: 57, username: 'prey', password:'123456', Nombre: 'Pelayo Rey Rodríguez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 58, username: 'ppato', password:'123456', Nombre: 'Pilar Pato Garrudo', activo: 1, CorreoExterno: '', role: 2 },
          { id: 59, username: 'rcolomo', password:'123456', Nombre: 'Roberto Colomo Romero', activo: 0, CorreoExterno: '', role: 2 },
          { id: 60, username: 'rmolina', password:'123456', Nombre: 'Rocío Molina Utrera', activo: 1, CorreoExterno: '', role: 2 },
          { id: 61, username: 'racero', password:'123456', Nombre: 'Ruben Acero Herreros', activo: 0, CorreoExterno: '', role: 2 },
          { id: 62, username: 'srecio', password:'123456', Nombre: 'Sara Recio García', activo: 0, CorreoExterno: '', role: 2 },
          { id: 63, username: 'srodrig1', password:'123456', Nombre: 'Silvia Rodríguez Solano', activo: 1, CorreoExterno: '', role: 2 },
          { id: 64, username: 'Susana Fernandez', password:'123456', Nombre: 'Susana Fernandez', activo: 0, CorreoExterno: 'sufers.es@gmail.com', role: 2 },
          { id: 65, username: 'vormeno', password:'123456', Nombre: 'Vanesa Ormeño Elvar', activo: 0, CorreoExterno: '', role: 2 },
          { id: 66, username: 'vrodrig3', password:'123456', Nombre: 'Vanessa Rodríguez de la Rosa', activo: 1, CorreoExterno: '', role: 2 },
          { id: 67, username: 'vgomez1', password:'123456', Nombre: 'Víctor Gómez Gálvez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 68, username: 'Vanessa Baeza', password:'123456', Nombre: 'Vanessa Baeza', activo: 1, CorreoExterno: 'ismael.hernandez.fernandez@madrid.org', role: 2 },
          { id: 69, username: 'bmunoz1', password:'123456', Nombre: 'Belen Muñoz', activo: 0, CorreoExterno: '', role: 2 },
          { id: 70, username: 'eserrano', password:'123456', Nombre: 'Eva Serrano', activo: 1, CorreoExterno: '', role: 2 },
          { id: 71, username: 'jmartin6', password:'123456', Nombre: 'Jose Javier Martín Carnes', activo: 0, CorreoExterno: '', role: 2 },
          { id: 72, username: 'mgomez3', password:'123456', Nombre: 'Mª Angeles Gómez Leira', activo: 0, CorreoExterno: '', role: 2 },
          { id: 73, username: 'calvare5', password:'123456', Nombre: 'Carlos Alvarez Beringola', activo: 0, CorreoExterno: '', role: 2 },
          { id: 74, username: 'mmarti11', password:'123456', Nombre: 'Mª Carmen Martín Soria', activo: 1, CorreoExterno: '', role: 2 },
          { id: 75, username: 'jgonza34', password:'123456', Nombre: 'Juan Pablo González Mier', activo: 0, CorreoExterno: '', role: 2 },
          { id: 76, username: 'jmoreno4', password:'123456', Nombre: 'Jose Luis Moreno Barriga', activo: 1, CorreoExterno: '', role: 2 },
          { id: 77, username: 'mferna27', password:'123456', Nombre: 'Miguel Ángel Fernández López', activo: 0, CorreoExterno: 'miguelangel.mfernandez@gmail.com', role: 2 },
          { id: 78, username: 'sronda', password:'123456', Nombre: 'Salvador Manuel Ronda Gomez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 79, username: 'fcarmona', password:'123456', Nombre: 'Francisco Borja Carmona Castaño', activo: 0, CorreoExterno: '', role: 2 },
          { id: 80, username: 'rmarti17', password:'123456', Nombre: 'Rubén Martínez García', activo: 0, CorreoExterno: '', role: 2 },
          { id: 81, username: 'blopez5', password:'123456', Nombre: 'Beatriz López López', activo: 0, CorreoExterno: 'beitaninfa@hotmail.com', role: 2 },
          { id: 82, username: 'jmarti39', password:'123456', Nombre: 'Javier Martín Roncero', activo: 0, CorreoExterno: 'jmarti135@gmail.com', role: 2 },
          { id: 83, username: 'slaso', password:'123456', Nombre: 'Susana Laso', activo: 1, CorreoExterno: '', role: 2 },
          { id: 84, username: 'mferna10', password:'123456', Nombre: 'Mª José Fernández Sanjuán', activo: 1, CorreoExterno: '', role: 2 },
          { id: 85, username: 'agarci42', password:'123456', Nombre: 'Alejandro García Perez', activo: 0, CorreoExterno: '', role: 2 },
          { id: 86, username: 'ivaldivi.ext', password:'123456', Nombre: 'Ignacio Valdivia Herrero', activo: 1, CorreoExterno: '', role: 2 },
          { id: 87, username: 'rrubio4', password:'123456', Nombre: 'Ruben Rubio Iniesta', activo: 1, CorreoExterno: '', role: 2 },
          { id: 88, username: 'mperez39', password:'123456', Nombre: 'Mª Soledad Pérez Pérez', activo: 0, CorreoExterno: '', role: 2 },
          { id: 89, username: 'vastorga.ext', password:'123456', Nombre: 'Victor Astorga Acevedo', activo: 0, CorreoExterno: 'victorastace@hotmail.com', role: 2 },
          { id: 90, username: 'aalvare9', password:'123456', Nombre: 'Angel Alvarez Cabrera', activo: 1, CorreoExterno: 'angealv@gmail.com', role: 2 },
          { id: 91, username: 'asobrin1.ext', password:'123456', Nombre: 'Alvaro Sobrino Molina', activo: 0, CorreoExterno: 'alvaro.sobrinom@gmail.com', role: 2 },
          { id: 92, username: 'rdefruto', password:'123456', Nombre: 'Raul De Frutos', activo: 0, CorreoExterno: '', role: 2 },
          { id: 93, username: 'srebollo', password:'123456', Nombre: 'Sonia Rebollo Andrés', activo: 0, CorreoExterno: '', role: 2 },
          { id: 94, username: 'rvillalb', password:'123456', Nombre: 'Rosa María Villalba Conde', activo: 0, CorreoExterno: '', role: 2 },
          { id: 95, username: 'mredondo', password:'123456', Nombre: 'Mª Milagros Redondo González', activo: 1, CorreoExterno: '', role: 2 },
          { id: 96, username: 'aiglesia', password:'123456', Nombre: 'Abraham de la Iglesia Cotillo', activo: 1, CorreoExterno: '', role: 2 },
          { id: 97, username: 'cgarcia2', password:'123456', Nombre: 'Carlos García Rodríguez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 98, username: 'agarci37', password:'123456', Nombre: 'Alfredo García Calero', activo: 1, CorreoExterno: '', role: 2 },
          { id: 99, username: 'mvizcain', password:'123456', Nombre: 'Manuel Vizcaíno Serrano', activo: 0, CorreoExterno: '', role: 2 },
          { id: 100, username: 'rgomez6', password:'123456', Nombre: 'Rafael Gómez Del Prado', activo: 1, CorreoExterno: '', role: 2 },
          { id: 101, username: 'pvillaca', password:'123456', Nombre: 'Pedro Villacañas Landrove', activo: 0, CorreoExterno: '', role: 2 },
          { id: 102, username: 'rgomez8', password:'123456', Nombre: 'Raul Gomez Gonzalez', activo: 0, CorreoExterno: 'rguacamayo@yahoo.es', role: 2 },
          { id: 103, username: 'scrg', password:'123456', Nombre: 'Sergio Crespo Granjo', activo: 0, CorreoExterno: '', role: 2 },
          { id: 104, username: 'aperez11', password:'123456', Nombre: 'Agustín Pérez Vicente', activo: 0, CorreoExterno: 'agus_perez2002@yahoo.es', role: 2 },
          { id: 105, username: 'mlopez16', password:'123456', Nombre: 'Marta Lopez De Zuazo Sanchez', activo: 1, CorreoExterno: '', role: 2 },
          { id: 106, username: 'eescude1', password:'123456', Nombre: 'Esther Escudero Bayle', activo: 1, CorreoExterno: '', role: 2 },
          { id: 107, username: 'gcastane', password:'123456', Nombre: 'Gerardo Castañer Villaluenga', activo: 1, CorreoExterno: '', role: 2 },
          { id: 108, username: 'ialmansa', password:'123456', Nombre: 'Isabela Almansa De Lara', activo: 1, CorreoExterno: '', role: 2 },
          { id: 109, username: 'yfs', password:'123456', Nombre: 'Yolanda Fernandez Sanmames', activo: 1, CorreoExterno: '', role: 2 },


        ]
        ).then(function () {
          console.log('<<Jugadores>> inicializada');
        });
    }
    console.log('<<Jugadores>> contiene ' + count + ' elementos');

  });

});