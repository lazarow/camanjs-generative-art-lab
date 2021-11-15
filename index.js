const fs = require("fs");
const Caman = require("caman").Caman;

/**
 * Loading all custom plugins, filters, and blenders.
 */
fs.readdirSync("./plugins/").filter(fn => fn.substr(-10) === ".plugin.js").forEach(fn => require("./plugins/" + fn)(Caman));
fs.readdirSync("./filters/").filter(fn => fn.substr(-10) === ".filter.js").forEach(fn => require("./filters/" + fn)(Caman));
fs.readdirSync("./blenders/").filter(fn => fn.substr(-11) === ".blender.js").forEach(fn => require("./blenders/" + fn)(Caman));


/**
 * Images to load.
 */
const images = ["./up.png", "./right.png"];
const promises = images.map(imagePath => new Promise((resolve) => {
    Caman(imagePath, function () { resolve(this); });
}))

/**
 * Loading images and do something with them.
 */
Promise.all(promises).then((camanImages) => {
    const [image1, image2] = camanImages;
    image1.cover(image2);
    image1.render(function () {
        this.save("./out.png");
    });
});

