import express from 'express';
import compression from 'compression';
import viteConfig from './config/vite.js';
import ssrMiddleware from './middlewares/ssr.js';
import staticMiddleware from './middlewares/statics.js';
import mainRoutes from './routes/mainRoute.js';
import contractDesign from './routes/contract/contractDesign.js';
import ProductDetail from './routes/Products/productDetail.js';

async function createServer() {
    
    const app = express();

    app.use(compression());

    const { vite, isProduction } = await viteConfig(app);

    if (vite) app.use(vite.middlewares);

    staticMiddleware(app, isProduction);

    app.use('/', mainRoutes(vite, isProduction));
    app.use('/products', ProductDetail(vite, isProduction));
    app.use('/contract-designs', contractDesign(vite, isProduction));
    app.use('/contract-designs', contractDesign(vite, isProduction));

    ssrMiddleware(app, vite, isProduction);

    return app;
}

createServer().then((app) => {
    app.listen(4173, () => {
        console.log('Server running at http://localhost:4173');
    });
});