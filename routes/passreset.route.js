import express from 'express';
import reset from '../controllers/userManagement/passwordController.js';
const router = express.Router();

router.post('/', reset);

export default router;
