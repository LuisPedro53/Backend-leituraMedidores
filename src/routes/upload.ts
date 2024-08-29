import { Router } from 'express';
import { uploadAndProcessImage } from '../controllers/uploadController';
import upload from '../utils/upload';

const router = Router();

router.post('/upload', upload.single('image'), uploadAndProcessImage);

export default router;
