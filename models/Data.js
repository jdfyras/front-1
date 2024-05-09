import mongoose from 'mongoose';

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
    state_sys: Number
});

const DataModel = mongoose.model('Data', dataSchema, 'infoIot');
export default DataModel;
