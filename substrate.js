// Substrate Watercolor
// j.tarbell   June, 2004
// Albuquerque, New Mexico
// complexification.net

// p5.js port by @dribnet July 2021

let dimx = 0;
let dimy = 0;
let num = 0;
// maxnum value interpolated between "medium" and "large"
let maxnum = 0;

       // * small:  250x250, maxnum=100  625     2.5
       // * medium: 500x500, maxnum=150  1666    
       // * large:  900x900, maxnum=200  4050

// grid of cracks
let cgrid = [];
let cracks = [];

// sand painters
let sands = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  begin();
}

function draw() {
  // crack all cracks
  for (let n=0; n<num; n++) {
    cracks[n].move();
  }
}

function mousePressed() {
  begin();
}

function windowResized() {
  // print("resize to", windowWidth, windowHeight);
  resizeCanvas(windowWidth, windowHeight);
  begin();
}

// added by dribnet for screen caps
function keyTyped() {
  if (key == '!') {
    saveScreenShot(dimx, dimy);
  }
}


// METHODS --------------------------------------------------

function makeCrack() {
  if (num<maxnum) {
    // make a new crack instance
    cracks[num] = new Crack();
    num++;
  }
}


function begin() {
  dimx = windowWidth;
  dimy = windowHeight;

  // given W and H, maxnum can be approx as 5.5 x ^ 0.53 where x = (W+H)/2
  // here's a table of what that looks like for jared's given three sizes
       // * small:  250x250, maxnum=100 (computed: 5.5*250^0.53 = 103)
       // * medium: 500x500, maxnum=150 (computed: 5.5*500^0.53 = 148)
       // * large:  900x900, maxnum=200 (computed: 5.5*900^0.53 = 202)
  // if you can fit the curve better, let me know :-)
  // PS: thanks for nothing GPT4 https://chat.openai.com/share/cc4da1ad-98f9-44aa-8924-c14bdd096f42

  maxnum = 5.5 * Math.pow((dimx+dimy)/2, 0.53);

  cgrid = Array(dimx*dimy).fill(0);
  cracks = [];

  // erase crack grid
  for (let y=0; y<dimy; y++) {
    for (let x=0; x<dimx; x++) {
      cgrid[y*dimx+x] = 10001;
    }
  }
  // make random crack seeds
  for (let k=0; k<16; k++) {
    let i = int(random(dimx*dimy-1));
    cgrid[i]=int(random(360));
  }

  // make just three cracks
  num=0;
  for (let k=0; k<3; k++) {
    makeCrack();
  }
  background(255);
}


// COLOR METHODS ----------------------------------------------------------------

// note: original code file built a color-table from the
// pollockShimmering.gif when run. this version caches
// the result to remove that depedency. - @dribnet

const goodcolor = ["#fff0d0","#ffc828","#ffe898","#f0c898","#ffffd0","#a07800","#e8c898","#f8e070","#fff0c8","#d0b080","#fff8d0","#f8e8e0","#ffd8b0","#d0b078","#f0d8c0","#f0d8d0","#ffffd8","#c8c098","#d0c058","#e0c8a8","#d8d0b0","#f8f8d0","#b0a098","#fff0c0","#f0e8b8","#986870","#fff8d8","#ffe8c8","#f0e8c0","#f0e8d8","#e0d8b8","#e0d0a0","#e0d0b0","#d0c8a0","#e8e8d8","#f0d898","#f8f0d8","#fff0a0","#f8e878","#ffe878","#e8c848","#e8b878","#f8e050","#585048","#ffffc8","#a8a078","#e8e098","#f8f0c8","#e8d8a8","#fff8c8","#f0f8a8","#f0f0c0","#ffe078","#f0e8c8","#e8e080","#ffe868","#d0c0a0","#f0e080","#ffe890","#e0c858","#f8e0b8","#f0e0b8","#d8c898","#fff0b8","#c8b078","#f8e8b8","#e8d8c8","#f0c868","#a09078","#fff8c0","#f0f0c8","#ffe8b0","#e8e0b0","#ffd028","#b09030","#f0f0d0","#c0c090","#f8e0c0","#d0b890","#c0b078","#b0b098","#a8a880","#f0e0c0","#e0e0b8","#585838","#d0d0c0","#382810","#383828","#b8b8b0","#c0b090","#98a0b8","#e0b080","#c8c8b8","#f8e0b0","#d8c070","#f8e8c0","#e0d098","#e0d8b0","#586868","#e8f0c0","#906848","#b08868","#e8b828","#ffe8c0","#b0b078","#e0e0b0","#686870","#e0d8a0","#a0a0a8","#e0a060","#685858","#ff9828","#c0a060","#905818","#f8f0b8","#a89868","#a89070","#b0a870","#f0f0e0","#a89848","#586858","#e0b850","#c8b060","#b09020","#e0e0c0","#906070","#a07078","#b88868","#f8e0d8","#c09888","#ffe8d0","#d8c0a0","#c0c0b0","#e8c880","#c8b8a0","#d0c8b0","#fff0e8","#e8f0e0","#f8b828","#384030","#302008","#505860","#d8c0b0","#f0e0b0","#ffd0b8","#a05810","#501000","#e8c078","#f8b888","#e8d050","#fff0d8","#f0d870","#984008","#805800","#e8e0c8","#b8b8a8","#f0e8a0","#102028","#708080","#d8c8a0","#b0b8b0","#ffd8a0","#582800","#d8c8b0","#fff098","#d0c8a8","#fff8b0","#687078","#f0d098","#607070","#484858","#787880","#983010","#fff8e0","#905048","#a82818","#603810","#f8f8f8","#fff0f8"];

function somecolor() {
  return color(random(goodcolor));
}


// OBJECTS -------------------------------------------------------

function Crack() {
  this.x = null;
  this.y = null;
  this.t = null; // direction of travel in degrees

  this.findStart = function() {
    // pick random point
    let px=0;
    let py=0;

    // shift until crack is found
    let found=false;
    let timeout = 0;
    while ((!found) || (timeout++>1000)) {
      px = int(random(dimx));
      py = int(random(dimy));
      if (cgrid[py*dimx+px]<10000) {
        found=true;
      }
    }

    if (found) {
      // start crack
      let a = cgrid[py*dimx+px];
      if (random(100)<50) {
        a-=90+int(random(-2, 2.1));
      }
      else {
        a+=90+int(random(-2, 2.1));
      }
      this.startCrack(px, py, a);
    }
    else {
      //println("timeout: "+timeout);
    }
  }

  this.startCrack = function(X, Y, T) {
    this.x=X;
    this.y=Y;
    this.t=T;//%360;
    this.x+=0.61*cos(this.t*PI/180);
    this.y+=0.61*sin(this.t*PI/180);
  }

  this.move = function() {
    // continue cracking
    this.x+=0.42*cos(this.t*PI/180);
    this.y+=0.42*sin(this.t*PI/180); 

    // bound check
    let z = 0.33;
    let cx = int(this.x+random(-z, z));  // add fuzz
    let cy = int(this.y+random(-z, z));

    // draw sand painter
    this.regionColor();

    // draw black crack
    stroke(0, 85);
    point(this.x+random(-z, z), this.y+random(-z, z));


    if ((cx>=0) && (cx<dimx) && (cy>=0) && (cy<dimy)) {
      // safe to check
      if ((cgrid[cy*dimx+cx]>10000) || (abs(cgrid[cy*dimx+cx]-this.t)<5)) {
        // continue cracking
        cgrid[cy*dimx+cx]=int(this.t);
      }
      else if (abs(cgrid[cy*dimx+cx]-this.t)>2) {
        // crack encountered (not self), stop cracking
        this.findStart();
        makeCrack();
      }
    }
    else {
      // out of bounds, stop cracking
      this.findStart();
      makeCrack();
    }
  }

  this.regionColor = function() {
    // start checking one step away
    let rx=this.x;
    let ry=this.y;
    let openspace=true;

    // find extents of open space
    while (openspace) {
      // move perpendicular to crack
      rx+=0.81*sin(this.t*PI/180);
      ry-=0.81*cos(this.t*PI/180);
      let cx = int(rx);
      let cy = int(ry);
      if ((cx>=0) && (cx<dimx) && (cy>=0) && (cy<dimy)) {
        // safe to check
        if (cgrid[cy*dimx+cx]>10000) {
          // space is open
        }
        else {
          openspace=false;
        }
      }
      else {
        openspace=false;
      }
    }
    // draw sand painter
    this.sp.render(rx, ry, this.x, this.y);
  }

  // sand painter
  this.findStart();
  this.sp = new SandPainter();
}

function SandPainter() {
  this.c = somecolor();
  this.g = random(0.01, 0.1);

  this.render = function(x, y, ox, oy) {
    // modulate gain
    this.g+=random(-0.050, 0.050);
    let maxg = 1.0;
    if (this.g<0) {
      this.g=0;
    }
    if (this.g>maxg) {
      this.g=maxg;
    }

    // calculate grains by distance
    // let grains = int(sqrt((ox-x)*(ox-x)+(oy-y)*(oy-y)));
    let grains = 64;

    // lay down grains of sand (transparent pixels)
    let w = this.g/(grains-1);
    for (let i=0; i<grains; i++) {
      let a = 0.1-i/(grains*10.0);
      stroke(red(this.c), green(this.c), blue(this.c), a*256);
      point(ox+(x-ox)*sin(sin(i*w)), oy+(y-oy)*sin(sin(i*w)));
    }
  }
}
