const Piadas = require('../models/piadas.model')

// Create and Save a new piada
exports.create = (req, res) => {
  console.log('req', req.body)
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: 'piada content can not be empty'
    })
  }

  // Create a piada
  const piada = new Piadas({
    joke: req.body.joke,
    response: req.body.response,
    category: req.body.category
  })

  // Save piada in the database
  piada.save()
    .then(data => {
      res.status(201).send(data)
    }).catch(err => {
      console.log('err', err._message)
      if (err.message === 'Path `joke` is required.') {
        res.status(406).send('Joke is required')
      } else {
        res.status(406).send({
          message: err.message || 'Não tem piada mas existe um erro...'
        })
      }
    })
}

// Retrieve and return all piadas from the database.
exports.findAll = (req, res) => {
  Piadas.find()
    .then(piadas => {
      res.send(piadas)
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Não tem piada mas existe um erro...'
      })
    })
}

// Find a single piada with a piadaId
exports.findOne = (req, res) => {
  console.log('req.params', req.params)
  Piadas.findById(req.params.piadaId)
    .then(piada => {
      if (!piada) {
        return res.status(404).send({
          message: `Olha essa piada nao existe vé la melhor.. ${req.params.piadaId}`
        })
      }
      res.send(piada)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Olha essa piada nao existe vé la melhor..' + req.params.PId
        })
      }
      return res.status(500).send({
        message: 'Error retrieving piada with id ' + req.params.piadaId
      })
    })
}

// Update a piada identified by the piadaId in the request
exports.update = (req, res) => {
// Validate Request
  if (!req.body.content) {
    return res.status(400).send({
      message: 'Para ter piada tem de ter piada'
    })
  }

  // Find piada and update it with the request body
  Piadas.findByIdAndUpdate(req.params.piadaId, {
    joke: req.body.joke,
    response: req.body.response,
    category: req.body.category
  }, { new: true })
    .then(piada => {
      if (!piada) {
        return res.status(404).send({
          message: `Olha essa piada nao existe vé la melhor.. ${req.params.piadaId}`
        })
      }
      res.send(piada)
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Olha essa piada nao existe vé la melhor.. ${req.params.piadaId}`
        })
      }
      return res.status(500).send({
        message: 'Erro ao meter a piada deve ser muito má que nem o servidor a quer'
      })
    })
}

// Delete a piada with the specified piadaId in the request
exports.delete = (req, res) => {
  Piadas.findByIdAndRemove(req.params.piadaId)
    .then(piada => {
      if (!piada) {
        return res.status(404).send({
          message: `Olha essa piada nao existe vé la melhor.. ${req.params.piadaId}`
        })
      }
      res.status(202).send({ message: 'Piada deleted' })
    }).catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: `Olha essa piada nao existe vé la melhor.. ${req.params.piadaId}`
        })
      }
      return res.status(500).send({
        message: 'Could not delete piada with id ' + req.params.piadaId
      })
    })
}

// Delete a piada with the specified piadaId in the request
exports.random = (req, res) => {
  Piadas.aggregate([{ $sample: { size: 1 } }])
    .then(piadas => {
      // Get position 0 from array
      res.status(200).send(piadas[0])
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Não tem piada mas existe um erro...'
      })
    })
}
