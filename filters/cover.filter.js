module.exports = function (Caman) {
    Caman.Filter.register("cover", function (cover) {
        const coverPixel = new Caman.Pixel(0, 0, 0, 0, cover);
        this.process("cover", function (originPixel) {
            const { x, y } = originPixel.locationXY();
            let { r:cr, g:cg, b:cb, a:ca } = coverPixel.getPixel(x, y);
            let { r:or, g:og, b:ob, a:oa } = originPixel;
            if (ca > 0) {
                ca /= 255;
                oa /= 255;
                originPixel.r = ca * cr + oa * or;
                originPixel.g = ca * cg + oa * og;
                originPixel.b = ca * cb + oa * ob;
                originPixel.a = (ca + oa) * 255;
            }
            return originPixel;
        });
    });
};