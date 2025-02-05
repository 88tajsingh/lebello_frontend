export function removeCircularReferences(data) {
    if (!data) return data;

    const cache = new Set();

    return JSON.parse(
        JSON.stringify(data, (key, value) => {
            if (typeof value === 'object' && value !== null) {
                if (cache.has(value)) {
                    return; // Circular reference found, skip it
                }
                cache.add(value);
            }
            return value;
        })
    );
}

export function setSeoTags(seoData) {
    return `
        <title>${seoData?.title || 'Default Title'}</title>
        <meta name="description" content="${seoData?.description || 'Default Description'}">
        <meta name="keywords" content="${seoData?.keywords || 'Default Keywords'}">
        <meta property="og:title" content="${seoData?.ogTitle || 'Default OG Title'}">
        <meta property="og:description" content="${seoData?.ogDescription || 'Default OG Description'}">
        <meta property="og:image" content="${seoData?.ogImage || ''}">
    `;
}