import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default async function viteConfig(app) {
    const isProduction = process.env.NODE_ENV === 'production';
    let vite = null;

    if (!isProduction) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom'
        });
    }

    return { vite, isProduction };
}
