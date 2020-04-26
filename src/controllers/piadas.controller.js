import Piadas from '../models/piadas.model'

// Create and Save a new piada
export const create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).send({
      message: 'Tem de ter um objeto piada, senão não tem piada -.-'
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
export const findAll = (req, res) => {
  Piadas.find()
    .then(piadas => {
      res.status(200).send({ count: piadas.length, data: piadas })
    }).catch(err => {
      res.status(500).send({
        message: err.message || 'Não tem piada mas existe um erro...'
      })
    })
}

// Find a single piada with a piadaId
export const findOne = (req, res) => {
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
export const update = (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: 'Tem de ter um objeto piada, senão não tem piada -.-'
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
export const remove = (req, res) => {
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
export const random = (req, res) => {
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
