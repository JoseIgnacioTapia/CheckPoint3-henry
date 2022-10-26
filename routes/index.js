'use strict';

const models = require('../models/model');
const express = require('express');
// const { response } = require('../app')

const router = express.Router();
router.use(express.json());

// Escriban sus rutas acá
// Siéntanse libres de dividir entre archivos si lo necesitan

// Hint:  investigá las propiedades del objeto Error en JS para acceder al mensaje en el mismo.

router.get('/users', (req, res) => {
  res.status(200).send(models.listUsers());
});

router.post('/users', (req, res) => {
  const { email, name } = req.body;
  try {
    const user = models.addUser(email, name);
    res.status(201).json({ msg: user });
  } catch (err) {
    res.status(400).json({ error: 'El usuario ya existe' });
  }
});

router.patch('/users/plan', (req, res) => {
  const { user } = req.query;
  try {
    res.status(200).json({ msg: models.switchPlan(user) });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/series', (req, res) => {
  const { category } = req.body;

  try {
    res.json(models.listSeries(category));
  } catch (error) {
    res.json(400).json({ error: error.message });
  }
});

router.post('/series', (req, res) => {
  const { name, seasons, category, year } = req.body;

  try {
    models.addSerie(name, seasons, category, year);
    res
      .status(201)
      .json({ msg: `La serie ${name} fue agregada correctamente` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/series/:category', (req, res) => {
  const { category } = req.params;

  try {
    res.status(200).json(models.listSeries(category));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/play/:serie', (req, res) => {
  const { serie } = req.params;
  const { user } = req.query;

  try {
    res.status(200).json({ msg: models.play(serie, user) });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/watchAgain', (req, res) => {
  const { user } = req.query;

  try {
    res.status(200).json(models.watchAgain(user));
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/rating/:serie', (req, res) => {
  const { serie } = req.params;
  const { email, score } = req.body;

  try {
    res.status(200).json({ msg: models.rateSerie(serie, email, score) });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
