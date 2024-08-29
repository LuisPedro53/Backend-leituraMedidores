import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAIFileManager } from '@google/generative-ai/server';
import fs from 'fs';
import path from 'path';

const apiKey = 'AIzaSyBYoHLKBqrYwy-d9met6uSocsHMY3XVYLw';

if (!apiKey) {
  throw new Error('API_KEY is not defined in environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);
const fileManager = new GoogleAIFileManager(apiKey);

export const processImage = async (filePath: string): Promise<string> => {
  // Fazer upload da imagem para a API Gemini
  const file = await fileManager.uploadFile(filePath, {
    mimeType: 'image/jpeg', // Ajuste conforme o tipo de arquivo
    displayName: path.basename(filePath),
  });

  // Gerar conteúdo com base na imagem
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: file.file.mimeType,
        fileUri: file.file.uri,
      },
    },
    { text: 'Descreva o conteúdo desta imagem.' },
  ]);

  // Limpar o arquivo local
  fs.unlinkSync(filePath);

  return result.response.text();
};
