// helper functions below for supporting blocks/purview/screencap

function saveScreenShot(dimx, dimy) {
  // generate dimx x dimy substrate.png of entire canvas
  var offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = dimx;
  offscreenCanvas.height = dimy;
  var context = offscreenCanvas.getContext('2d');
  // background is flat white
  context.fillStyle="#FFFFFF";
  context.fillRect(0, 0, dimx, dimy);
  context.drawImage(this.canvas, 0, 0, dimx, dimy);
  // save to browser
  var downloadMime = 'image/octet-stream';
  var imageData = offscreenCanvas.toDataURL('image/png');
  imageData = imageData.replace('image/png', downloadMime);
  p5.prototype.downloadFile(imageData, 'substrate.png', 'png');
}
