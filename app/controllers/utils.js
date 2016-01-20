exports.GetData = function (Tabla,req, res, next)
{
     Tabla.findAll().then(function (dato) {
        res.data = dato;
        next();
    })
    .catch(function (error) {
        next(error);
        });
}

exports.GetDataW = function (Tabla,req, res, next,where)
{
   Tabla.find({
       // where: where
    }).then(function (dato) {
        res.data = dato;
        next();
    }
        ).catch(function (error) {
           next(error);
        });
}