const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')
const Pangolin = require('../models/pangolin')

const authMiddleware = require('../auth_middleware')
router.use(authMiddleware)

router.get('/', (req, res, next) => {
    Pangolin.find()
        .then((pangolinList) => res.status(200).json(pangolinList))
        .error((error) => res.status(400).json({ error }))
})
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    Pangolin.findOne({ _id: id })
        .then((pangolin) => res.status(200).json(pangolin))
        .error((error) => res.status(400).json({ error }))
})
router.post('/', (res, req, next) => {
    delete req.body._id
    const pangolin = new Pangolin({
        ...req.body
    })
    pangolin.save()
        .then(() => res.status(201).json({ message: 'Pangolin create !' }))
        .error(() => res.status(400).json({ error }))
})
router.put('/:id', (res, req, next) => {
    const id = req.params.id
    delete req.body._id
    const pangolin = req.body
    Pangolin.findByIdAndUpdate(id, pangolin, { new: false })
        .then((updatedPangolin) => res.status(200).json(updatedPangolin))
        .catch((error) => res.status(400).json({ error }))
})
router.delete('/:id', (res, req, next) => {
    Pangolin.deleteOne({ _id: id })
        .then(() => res.status(200).json({ message: "Pangolin delete !"}))
        .catch((error) => res.status(400).json({ error }))
})

module.exports = router
