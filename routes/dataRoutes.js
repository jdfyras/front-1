import express from 'express';
import DataModel from '../models/Data.js';

const router = express.Router();

router.get('/monitor/addgroupe', async (req, res) => {
    try {
        const newData = new DataModel({ ...req.query });
        await newData.save();
        res.send('Data successfully saved in MongoDB collection "infoIot"');
    } catch (error) {
        console.error("Error saving data to MongoDB:", error);
        res.status(500).send("Error saving data to MongoDB");
    }
});

export default router;
