const data = require('./userData.json')

module.exports = function(app){
  const express = require('express')
  const router = express.Router()

  router.get(`/users`, (req, res, next) => {
    let key = Object.keys(req.query)[0]
    switch (key) {
      case undefined:
        return res.status(200).send(data)

      case 'age':
        let age = data.filter(user => user.age <= req.query.age)
        return res.status(200).send(age)

      case 'favorites':
        let favorites = data.filter(user => user.favorites.includes(req.query.favorites) === true)
        return res.status(200).send(favorites)

      case 'email':
        let email = data.filter(user => user.email === req.query.email)
        return res.status(200).send(email)

      case 'lastname':
        let lastname = data.filter(user => user.last_name == req.query.lastname)
        return res.status(200).send(lastname)

      default: return res.status(200).send(data)

    }
  })

  router.get(`/users/:userId`, (req, res, next) => {
    if(!req.params.userId) {
      return res.status(404).json(null)
    } else {
      let requestedUser = data.filter(user => user.id == req.params.userId)[0]
      if(requestedUser) {
        return res.status(200).send(requestedUser)
      } else return res.status(404).json(null)
    }
  })

  router.get(`/admins`, (req, res, next) => {
    let admins = data.filter(user => user.type === 'admin')
    return res.status(200).send(admins)
  })

  router.get(`/nonadmins`, (req, res, next) => {
    let nonadmins = data.filter(user => user.type !== 'admin')
    return res.status(200).send(nonadmins)
  })

  router.get(`/user_type/:userType`, (req, res, next) => {
    let userType = data.filter(user => user.type === req.params.userType)
    return res.status(200).send(userType)
  })

  router.put(`/users/:userId`, (req, res, next) => {
    let user = data.filter(user => user.id == req.params.userId)[0]
    let userIndex = data.indexOf(user)
    data.splice(userIndex, 1, req.body)
    return res.status(200).send(data)

  })

  router.post(`/users`, (req, res, next) => {
    let user = req.body
    let id = data[data.length - 1].id
    user.id = id + 1
    data.push(user)
    return res.status(200).send(data)
  })

  router.delete(`/users/:userId`, (req, res, next) => {
    console.log('DELETE api/users/:userId', req.params.userId)
    let user = data.filter(user => user.id == req.params.userId)[0]
    let userIndex = data.indexOf(user)
    data.splice(userIndex, 1)
    return res.status(200).send(data)
  })

  return router
}
