'use strict';

// execution
// enable rest in raven.conf 'rest=1' (be sure to disable after)
// node ./ravencoin-utils/blkconverter1.js

// convert block json from ravend format to ravencore format

// get ./ravencoin-utils/inputs/blk220909.dat by:
// curl 127.0.0.1:8766/rest/block/00000058bcc33dea08b53691edb9e49a9eb8bac36a0db17eb5a7588860b1f590.hex | xxd -r -p > ./ravencoin-utils/inputs/blk1.dat

// get ./ravencoin-utils/inputs/blk220909.json by
// curl 127.0.0.1:8766/rest/block/00000058bcc33dea08b53691edb9e49a9eb8bac36a0db17eb5a7588860b1f590.json > ./ravencoin-utils/inputs/blk1.json

// get ./ravencoin-utils/inputs/blk1.js by manually edit the file

// Manually check if blk1-ravencore.json match with blk1.json

var ravencore = require('..');
var Block = ravencore.Block;
var fs = require('fs');

var first8Bytes = new Buffer ([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF]); // won't be used in block allocation, just fill with some inane values

var blockBuffer = fs.readFileSync('ravencoin-utils/inputs/blk1.dat');

var ravencoreFormatBlockBuffer = Buffer.concat([first8Bytes, blockBuffer]);

var blk = Block.fromRawBlock(ravencoreFormatBlockBuffer);

var blkJSON = blk.toJSON();
var blkJSONStr = JSON.stringify(blkJSON, null, 2);

fs.writeFileSync('ravencoin-utils/outputs/blk1-ravencore.dat', ravencoreFormatBlockBuffer);
fs.writeFileSync('ravencoin-utils/outputs/blk1-ravencore.json', blkJSONStr);
