import express from 'express';
import { postPingController } from '../controllers/status.controller.js';

/* logica del /api/status */

const statusRouter = express.Router()

statusRouter.post('/ping', postPingController)

export default statusRouter