import express from 'express';
import fs from 'fs';
import path from 'path';
import { removeCircularReferences, setSeoTags } from '../../utils/helpers.js';
import { getContractDesignData } from '../../../src/helper/frontendHelpers.js'


const router = express.Router();

export default function ourMaterials(vite, isProduction) {
    router.get('/', async (req, res) => {
        const url = req.originalUrl;
        try {
            let template, render;

            const rootDir = path.resolve();
                       const indexPath = isProduction
                       ? path.resolve(rootDir, 'dist/client/index.html')
                       : path.resolve(rootDir, 'index.html');
           
                       if (!isProduction) {
                           template = fs.readFileSync(indexPath, 'utf-8');
                           template = await vite.transformIndexHtml(url, template);
                           render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
                       } else {
                           template = fs.readFileSync(indexPath, 'utf-8');
                           render = (await import('../../../dist/server/entry-server.js')).render;
                       }

               let extraData = await getContractDesignData()
               extraData = removeCircularReferences(extraData?.data?.data)
            const seoData = {
                title: 'Contract Outdoor Furniture Manufacturer : Outdoor Hospitality|Lebello',
                description: 'Contract designer and manufacturer of luxury outdoor hospitality...',
                keywords: 'Contract Outdoor Furniture, Hospitality Outdoor Furniture...',
                ogDescription: 'Exclusive Modern Outdoor Contract furniture design and manufacturer...',
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

    return router;
}
