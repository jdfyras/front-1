import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'; // Importation de body-parser
import mongoose from 'mongoose'; // Importation de mongoose

import connect from './config/db.js';
import routes from './routes/index.js';
import Engine from "./middlewares/apareilingine.js";
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cookieParser());
dotenv.config();

// Configuration de CORS
app.use(cors({ 
    credentials: true, 
    origin: true
}));

// Middleware pour parser les données POST
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", routes);

// Définition du schéma de données MongoDB//groupe
const dataSchema = new mongoose.Schema({
  idgrp: String,
  token: String,
  flameData: Number,
  smokeData: Number,
  temperatureData: Number,
  humidityData: Number,
  doorData: Number,
  fuelLevel: Number,
  engineTemperature: Number,
  chargerState: Number,
  batteryVoltage: Number,
  generatorState: Number,
  phaseVoltage: Number,
  phaseCurrent: Number,
  frequency: Number,
  coolantTemperature: Number,
  coolantLevel: Number,
  coolantViscosity: Number,
  operationTime: Number,
  lastStartTime: Number,
  latitude: Number,
  longitude: Number,
  state_sys: Number,
});

// Création du modèle MongoDB à partir du schéma
const DataModel = mongoose.model('Data', dataSchema, 'infoIot');

// Route pour la réception des données et l'enregistrement dans MongoDB
app.get('/monitor/addgroupe', async (req, res) => {
  try {
    const newData = new DataModel({
      idgrp: req.query.idgrp,
      token: req.query.token,
      flameData: req.query.flameData,
      smokeData: req.query.smokeData,
      temperatureData: req.query.temperatureData,
      humidityData: req.query.humidityData,
      doorData: req.query.doorData,
      fuelLevel: req.query.fuelLevel,
      engineTemperature: req.query.engineTemperature,
      chargerState: req.query.chargerState,
      batteryVoltage: req.query.batteryVoltage,
      generatorState: req.query.generatorState,
      phaseVoltage: req.query.phaseVoltage,
      phaseCurrent: req.query.phaseCurrent,
      frequency: req.query.frequency,
      coolantTemperature: req.query.coolantTemperature,
      coolantLevel: req.query.coolantLevel,
      coolantViscosity: req.query.coolantViscosity,
      operationTime: req.query.operationTime,
      lastStartTime: req.query.lastStartTime,
      latitude: req.query.latitude,
      longitude: req.query.longitude,
      state_sys: req.query.state_sys,
    });

    await newData.save();
    
    res.send('Données enregistrées avec succès dans la collection "infoIot" de MongoDB');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données dans MongoDB :', error);
    res.status(500).send('Erreur lors de l\'enregistrement des données dans MongoDB');
  }
});

// Définition du schéma de données pour les transformateurs//transfo
const transfoSchema = new mongoose.Schema({
  idond: String,
  token: String,
  flameData: Number,
  smokeData: Number,
  temperaturetransfo: Number,
  temperatureData: Number,
  humidityData: Number,
  doorData: Number,
  stat_sys: Number,
});

// Création du modèle MongoDB à partir du schéma
const TransfoModel = mongoose.model('TransfoData', transfoSchema, 'transfoIot');

// Route pour la réception des données des transformateurs et l'enregistrement dans MongoDB
app.get('/monitor/addtransfo', async (req, res) => {
  try {
    const newTransfoData = new TransfoModel({
      idond: req.query.idond,
      token: req.query.token,
      flameData: req.query.flameData,
      smokeData: req.query.smokeData,
      temperaturetransfo: req.query.temperaturetransfo,
      temperatureData: req.query.temperatureData,
      humidityData: req.query.humidityData,
      doorData: req.query.doorData,
      stat_sys: req.query.stat_sys,
    });

    await newTransfoData.save();
    
    res.send('Données des transformateurs enregistrées avec succès dans la collection "transfoIot" de MongoDB');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données des transformateurs dans MongoDB :', error);
    res.status(500).send('Erreur lors de l\'enregistrement des données des transformateurs dans MongoDB');
  }
});

// Définition du schéma de données pour les climatiseurs...armoire
const climatiseurSchema = new mongoose.Schema({//shema f mongo de données 
  idond: String,
  token: String,
  flameData: Number,
  smokeData: Number,
  doorData: Number,
  state_sys: Number,
  Va: Number,
  Vb: Number,
  Vc: Number,
  Vab: Number,
  Vbc: Number,
  Vca: Number,
  Ia: Number,
  Ib: Number,
  Ic: Number,
  In: Number,
  Wa: Number,
  Wb: Number,
  Wc: Number,
  Wt: Number,
  Qa: Number,
  Qb: Number,
  Qc: Number,
  Qt: Number,
  Sa: Number,
  Sb: Number,
  Sc: Number,
  St: Number,
  Pfa: Number,
  Pfb: Number,
  Pfc: Number,
  Pft: Number,
  F: Number,
  kWht: Number,
  KVARHt: Number,
  KWHF: Number,
  KWHB: Number,
  KVARHF: Number,
  KVARHB: Number,
  Last_demand: Number,
  Present_demand: Number,
  Peak_demand: Number,
  temperature: Number,
  humidity: Number,
});

// Création du modèle MongoDB à partir du schéma
const ClimatiseurModel = mongoose.model('ClimatiseurData', climatiseurSchema, 'climatiseurIot');

// Route pour la réception des données des climatiseurs et l'enregistrement dans MongoDB//be3tha donnée b get
app.get('/monitor/addclimatiseur', async (req, res) => {
  try {
    const newClimatiseurData = new ClimatiseurModel({
      idond: req.query.idond,
      token: req.query.token,
      flameData: req.query.flameData,
      smokeData: req.query.smokeData,
      doorData: req.query.doorData,
      state_sys: req.query.state_sys,
      Va: req.query.Va,
      Vb: req.query.Vb,
      Vc: req.query.Vc,
      Vab: req.query.Vab,
      Vbc: req.query.Vbc,
      Vca: req.query.Vca,
      Ia: req.query.Ia,
      Ib: req.query.Ib,
      Ic: req.query.Ic,
      In: req.query.In,
      Wa: req.query.Wa,
      Wb: req.query.Wb,
      Wc: req.query.Wc,
      Wt: req.query.Wt,
      Qa: req.query.Qa,
      Qb: req.query.Qb,
      Qc: req.query.Qc,
      Qt: req.query.Qt,
      Sa: req.query.Sa,
      Sb: req.query.Sb,
      Sc: req.query.Sc,
      St: req.query.St,
      Pfa: req.query.Pfa,
      Pfb: req.query.Pfb,
      Pfc: req.query.Pfc,
      Pft: req.query.Pft,
      F: req.query.F,
      kWht: req.query.kWht,
      KVARHt: req.query.KVARHt,
      KWHF: req.query.KWHF,
      KWHB: req.query.KWHB,
      KVARHF: req.query.KVARHF,
      KVARHB: req.query.KVARHB,
      Last_demand: req.query.Last_demand,
      Present_demand: req.query.Present_demand,
      Peak_demand: req.query.Peak_demand,
      temperature: req.query.temperature,
      humidity: req.query.humidity,
    });

    await newClimatiseurData.save();
    
    res.send('Données des climatiseurs enregistrées avec succès dans la collection "climatiseurIot" de MongoDB');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données des climatiseurs dans MongoDB :', error);
    res.status(500).send('Erreur lors de l\'enregistrement des données des climatiseurs dans MongoDB');
  }
});



const port = process.env.PORT || 4000;
server.listen(port, () => {
    connect()
    console.log(`Le serveur écoute sur le port ${port}`);
});

var engine = new Engine({ agents: 24 }, io);
engine.init();
engine.run();
io.on("connection", (socket) => {
 console.log("connected to socket.io")

 socket.on('setup', (userData) => {
  console.log('ek')
  socket.join(userData._id)
  socket.emit("connected")
 })
});
