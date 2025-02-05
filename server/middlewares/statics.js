import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function staticMiddleware(app, isProduction) {
    if (isProduction) {
        app.use(express.static(path.resolve(__dirname, '../../dist/client')));
        app.use('/assets', express.static(path.resolve(__dirname, '../../dist/assets')));
    } else {
        app.use(express.static(path.resolve(__dirname, '../../public'))); 
    }
}
