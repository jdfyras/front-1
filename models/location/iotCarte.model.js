import mongoose from 'mongoose';
const { Schema } = mongoose;

const IoTCarteSchema = new Schema(
    {
        carte_name: { type: String, required: true },
        id_concentrateur: { type: Number, required: true },
        id_poste: { type: Number, required: true },
        id_client: { type: String, required: true },
        gouvernorat: { type: String, required: true },
        city: { type: String, required: true },
        rue: { type: String, required: true },
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.model('IoTCarte', IoTCarteSchema);
