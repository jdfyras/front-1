import mongoose from 'mongoose';

const transfoSchema = new mongoose.Schema({
    idond: String,
    token: String,
    flameData: Number,
    smokeData: Number,
    temperaturetransfo: Number,
    temperatureData: Number,
    humidityData: Number,
    doorData: Number,
    stat_sys: Number
});

const TransfoModel = mongoose.model('TransfoData', transfoSchema, 'transfoIot');
export default TransfoModel;
