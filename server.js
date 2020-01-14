// Cargar mongoose
const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

//Metodos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/_db_andhis_',{useNewUrlParser : true})
.then(()=>{
    //crear servidor
app.listen(port,()=>{
    console.log('Servidor corriendo en localhost:' + port);
}
);
    console.log('[[La conexion a la base de datos _db_andhis_ se ha realizado correctamente');
})
.catch(err => console.log(err));