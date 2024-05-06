import mongoose from "mongoose";
const { Schema } = mongoose;

const EnregistrementCompteurSchema = new Schema({
    idlamp: { type: String, required: true, default: '' },
    ID_LIGNE: { type: String, required: true },
    ID_POSTE: { type: String, required: true },
    tension: { type: String, required: true, default: '' },
    current: { type: String, required: true },
    reading_time: { type: Date, required: true },
    state_lamp: { type: String, required: true },
    NIV_LIGHT: { type: String, required: true },
    cosphi: { type: String, required: true },
    power: { type: String, required: true },
    is_connected: { type: Number, required: true }
}, 
{ timestamps: true });

export default mongoose.model("EnregistrementCompteur", EnregistrementCompteurSchema);
