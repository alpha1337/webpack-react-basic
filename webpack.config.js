// NodeJS Dependency -- The path module provides utilities for working with file and directory paths.
const path = require('path');

// The module.exports is a special object.
// module is a variable that represents current module.
// exports is an object that will be exposed as a module.
// So, whatever you assign to module.exports will be exposed as a module.
module.exports = {
    // By default the current directory is used, but it's recommended to pass a value in your configuration.
    // The following absolute path makes your configuration independent from CWD
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'app.bundle.js'
    },
    // Load node_module dependencies, presets and plugins.
    module: {
        // An array of Rules which are matched to requests when modules are created. These rules can modify how the
        // module is created. They can apply loaders to the module, or modify the parser.
        rules: [
            {
                // Rule.test is a shortcut to Rule.resource.test
                // Rule.resource = A Condition matched with the resource.
                // Condition.test = string, regEx, function, array or an object.
                // RegEx Breakdown:
                // \. = matches the character "." literally (case sensitive)
                // js = matches the character "js" literally (case sensitive)
                // $ = asserts position at the end of the string
                test: /\.js$/,
                // Excluding node_modules folder so that they do not transpile down
                // as all of our dependencies should already be written in ES5.
                exclude: [/node_modules/],
                // A list of UseEntries (objects) which are applied to modules. Each entry specifies a loader to be used.
                // Must have a loader property being a string. It is resolved relative to the
                // configuration context with the loader resolving options
                use: {
                    // https://github.com/babel/babel-loader
                    // Allows transpiling JavaScript files using Babel and webpack.
                    loader: 'babel-loader',
                    // shortcut to Rule.use: [ {options} ]
                    // These values are passed to the loader, which should interpret it as loader options.
                    options: {
                        // ==============
                        // Loader Presets
                        // ==============
                        // es2015: Only compiles ES2015 to ES5.
                        // react: Strip flow types and transform JSX into createElement calls.
                        // env: Automatically determines the Babel plugins you need based on your supported environments.
                        presets: ['es2015', 'react', 'env'],
                        // ==============
                        // Loader Plugins
                        // ==============
                        // Allows ES7 to be rendered
                        plugins: [require('babel-plugin-transform-class-properties')]
                    }
                }
            },
            {
                // Compile CSS & SASS
                test: /\.scss$/,
                // Dependencies: node-sass
                // ==============
                // Loader Info
                // ==============
                // style-loader: Adds CSS to the DOM by injecting a <style> tag
                // css-loader: Interprets @import and url() like import/require() and will resolve them.
                // sass-loader: Compiles sass by extracting text then using css-loader to bundle styles into a JS module.
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader', options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader', options: {
                        sourceMap: true
                    }
                }]
            },
            {
                test: /\.(png|jpg|gif)$/,
                // Search CSS and Templates for image files, optimizes images and place them in 'dist/images' for production
                // ==============
                // Loader Info
                // ==============
                // file-loader: Instructs webpack to emit the required object as file and to return its public url.
                // url-loader: The url-loader works like the file-loader, but can return a DataURL if the file is smaller than a byte limit.
                use: [{
                    loader: 'file-loader', options: {
                        useRelativePath: false,
                        outputPath: '/images/'
                    }
                }, {
                    loader: 'url-loader', options: {
                        limit: 8192
                    }
                }]
            }
        ]
    }
};