module.exports = {
    // proxy API requests to Valet during development
    devServer: {
        //proxy: 'http://localhost:3000'
        proxy: 'https://crysmo.neksys.ru'
        // proxy:process.env.VUE_APP_PROXY,
        // public:process.env.VUE_APP_PROXY,
        // proxy: 'http://yusdoc.ru'
    },

    // output built static files to Laravel's public dir.
    // note the "build" script in package.json needs to be modified as well.
    // outputDir: '../public',

    // modify the location of the generated HTML file.
    // make sure to do this only in production.
    // indexPath: process.env.NODE_ENV === 'production'
    //     ? '../resources/views/index.blade.php'
    //     : 'index.html'
};
