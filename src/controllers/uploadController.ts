import { Request, Response } from 'express';
import { processImage } from '../services/upload';
import { handleError } from '../utils/errorUtils';

export const uploadAndProcessImage = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const description = await processImage(file.path);
    res.status(200).json({ description });
  } catch (error) {
    res.status(500).json({ error: handleError(error) });
  }
};
