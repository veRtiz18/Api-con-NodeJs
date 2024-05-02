const express = require('express');
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.hadler')
const cors = require('cors');


const app = express(); // : Aquí estás inicializando una instancia de la aplicación Express.
// Esto crea una aplicación Express vacía que puedes configurar y expandir según tus necesidades.

const port = process.env.PORT || 3000;
app.use(express.json());


// const whitelist = ['http://127.0.0.1:5500', 'https://myapp.com'];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   }
// }
app.use(cors());

app.get('/api', (req, res) => {
  res.send('<h1>Hola este es mi server en express</h1>');
})

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Mi port ${port}`)
})


