import express from 'express';
import fs from 'fs';
import path from 'path';
import { removeCircularReferences, setSeoTags } from '../../utils/helpers.js';
import { getProductDetail } from '../../../src/helper/frontendHelpers.js'


const router = express.Router();

export default function ProductDetail(vite, isProduction) {
    router.get('/:slug?', async (req, res) => {
        const url = req.originalUrl;
        const slug = req.params.slug;
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

               let extraData = await getProductDetail(slug)
               if (extraData?.status !== 200) {
                res.status(200).send(`
                    <script>
                        window.location.href = 'https://lebello.com/product/';
                    </script>
                `);
                return;
            }
               extraData =extraData?.data?.data
               console.log("getProductDetail",extraData?.product_data[0]?.seo_title)
               const seoData = {
                   title: extraData?.product_data[0]?.seo_title || 'Lebello',
                   description: extraData?.product_data[0]?.meta_description ,
                   keywords: extraData?.product_data[0]?.meta_keywords,
                   ogTitle: extraData?.product_data[0]?.seo_title,
                   ogDescription: extraData?.product_data[0]?.meta_description,
                   ogImage: ''
                };
                
                extraData = removeCircularReferences(extraData)
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
