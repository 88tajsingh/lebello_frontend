import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { removeCircularReferences, setSeoTags } from '../utils/helpers.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function ssrMiddleware(app, vite, isProduction) {
    app.get('*', async (req, res) => {
        console.log('ssrMiddleware');
        const url = req.originalUrl;

        try {
            let template, render;

            if (!isProduction) {
                template = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf-8');
                template = await vite.transformIndexHtml(url, template);
                render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
            } else {
                template = fs.readFileSync(path.resolve(__dirname, '../../dist/client/index.html'), 'utf-8');
                render = (await import('../../dist/server/entry-server.js')).render;
            }

            const extraData = {}; 

            const seoData = {
                title: 'Default Title',
                description: 'Default Description',
                keywords: 'Default Keywords',
                ogTitle: 'Default OG Title',
                ogDescription: 'Default OG Description',
                ogImage: ''
            };

            const seoTags = setSeoTags(seoData);
            const context = { url, extraData };
            const { html: appHtml } = await render(url, context);

            const html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace(
                    '<!--extra-data-->',
                    `<script>window.__EXTRA_DATA__ = ${JSON.stringify(extraData)}</script>`
                )
                .replace('<!--seo-tags-->', seoTags);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            if (!isProduction) vite?.ssrFixStacktrace(e);
            console.error(e);
            res.status(500).end(e.stack);
        }
    });
}
