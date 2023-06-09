const download = require('download');
const {images} = require('./images.cjs');
async function fun() {
  for (const file of images) {
    const filePath = `${__dirname}\\public\\media\\items\\`;
    console.log(filePath);
    
    await download(file, filePath)
      .then(() => {
        console.log('Download Completed');
      });
  }
}

fun();