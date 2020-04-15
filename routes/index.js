module.exports = (app) => {
  const piadas = require('../controllers/paidas.controller');

  // Create a new Note
  app.post('/piadas', piadas.create);

  // Retrieve all piadas
  app.get('/piadas', piadas.findAll);

   // Retrieve random piada
   app.get('/piadaRandom', piadas.random);


  // Retrieve a single Note with noteId
  app.get('/piadas/:piadaId', piadas.findOne);

  // Update a Note with noteId
  app.put('/piadas/:piadaId', piadas.update);

  // Delete a Note with noteId
  app.delete('/piadas/:piadaId', piadas.delete);
}