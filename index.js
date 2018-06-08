#!/usr/bin/env node
require('babel-register')({
    presets: [ 'env', 'stage-0', 'stage-1', 'stage-2', 'stage-3', 'react' ]
});

require("./src/app.js");
