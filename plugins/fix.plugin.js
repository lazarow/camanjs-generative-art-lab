module.exports = function (Caman) {
    /**
     * After http://bl.ocks.org/mknecht/b230c0a41a78a618021a
     */
    Caman.Pixel.prototype.coordinatesToLocation = Caman.Pixel.coordinatesToLocation;
    Caman.Pixel.prototype.locationToCoordinates = Caman.Pixel.locationToCoordinates;
    Caman.Pixel.prototype.putPixelRelative = function(horiz, vert, rgba) {
        if (this.c == null) {
            throw "Requires a CamanJS context";
        }
        const newLoc = this.loc + (this.c.dimensions.width * 4 * (vert * -1)) + (4 * horiz);
        if (newLoc > this.c.pixelData.length || newLoc < 0) {
            return;
        }
        this.c.pixelData[newLoc] = rgba.r;
        this.c.pixelData[newLoc + 1] = rgba.g;
        this.c.pixelData[newLoc + 2] = rgba.b;
        this.c.pixelData[newLoc + 3] = rgba.a;
        return true;
    };
    Caman.Pixel.prototype.getPixel = function(x, y) {
        if (this.c == null) {
          throw "Requires a CamanJS context";
        }
        const loc = this.coordinatesToLocation(x, y, this.c.dimensions.width);
        return this.pixelAtLocation(loc);
    };
    Caman.Pixel.prototype.putPixel = function(x, y, rgba) {
        if (this.c == null) {
            throw "Requires a CamanJS context";
        }
        const loc = this.coordinatesToLocation(x, y, this.c.dimensions.width);
        this.c.pixelData[loc] = rgba.r;
        this.c.pixelData[loc + 1] = rgba.g;
        this.c.pixelData[loc + 2] = rgba.b;
        return this.c.pixelData[loc + 3] = rgba.a;
    };
};