//This page focuses specifically on the Canvas.

var gardenDiv = document.getElementById("gardenSct");
var theCanvWidth = 9 * gardenDiv.offsetWidth / 10;
var theCanvHeight = 8 * gardenDiv.offsetHeight / 10;
console.log(theCanvWidth + " " + theCanvHeight);

//2D array of all purchasable plants: Seeds, Sunflower, Tomato, Orchid, Apple, Rose
var plantsCanv = [[], [], [], [], [], []];

function setup(){
    var canvas = createCanvas(theCanvWidth, theCanvHeight);
    canvas.parent('gardenCanv');
    //Begins the "seeds per second" function
    seedsPerSec();
}

function draw(){
    /*clear the previous canvas, so the page doesn't get crowded by things the user 
    can't even see*/
    clear();

    //The sky in the background
    background('#C4E4F6');

    //Hills in the background
    fill('#6BB604');
    noStroke();
    circle(theCanvWidth/4, theCanvHeight/3, theCanvWidth/3);
    circle(5*theCanvWidth/8, theCanvHeight/3, theCanvWidth/4);

    //The floor
    fill('#895A35');
    noStroke();
    rect(0, theCanvHeight/4, theCanvWidth, theCanvHeight);

    //the rows for each plant
    stroke("#A6754E");
    strokeWeight(5);
    for(let i = 0; i < 5; i++){
        let lineHeight = (20-3*i)*theCanvHeight/20;
        //see explanation about rows above spawnSunflower() function below
        line(0, lineHeight, theCanvWidth, lineHeight)
    }
    strokeWeight(1);
    
    

    for(var i = 0; i < plantsCanv.length; i++){
        for(var j = 0; j < plantsCanv[i].length; j++){
            plantsCanv[i][j].spawn();
        }
    }

    noLoop();
}

//the 'floor' is 3/4ths of the canvas, which needs to be split into 5 segments for the 5
//different plant types. 3/4 * 1/5 = 3/20ths, so each plant will have 3/20ths of the
//screen to spawn in (rounded to 2/20ths, so there's some space between them)

//sunflower starts at the bottom (theCanvHeight) and 2/20ths of the screen at the bottom
var sunflowerYmin = theCanvHeight;
var sunflowerYmax = 18 * theCanvHeight / 20;
function spawnSunflower(){
    //only spawns a maximum of 25 flowers, to ensure the canvas isn't entirely overtaken 
    //by sunflowers !
    if(plantsCanv[1].length < 26){
        let plantX = random(0, theCanvWidth);
        let plantY = random(sunflowerYmin, sunflowerYmax);
        console.log(plantX + " " + plantY);
        plantsCanv[1].push(new Sunflower(plantX, plantY)); 
        console.log(plantsCanv[1]);
        draw();
    }
}

var tomatoYmin = 16 * theCanvHeight / 20;
var tomatoYmax = 14 * theCanvHeight / 20;
function spawnTomato(){
    //only spawns a maximum of 25 tomato plants, to ensure the canvas isn't entirely 
    //overtaken by them!
    if(plantsCanv[2].length < 26){
        let plantX = random(0, theCanvWidth);
        let plantY = random(tomatoYmin, tomatoYmax);
        console.log(plantX + " " + plantY);
        plantsCanv[2].push(new Tomato(plantX, plantY)); 
        console.log(plantsCanv[2]);
        draw();
    }
}

var orchidYmin =  12 * theCanvHeight / 20;
var orchidYmax = 10 * theCanvHeight / 20;
function spawnOrchid(){
    //only spawns a maximum of 25 orchids, to ensure the canvas isn't entirely 
    //overtaken by them!
    if(plantsCanv[3].length < 26){
        let plantX = random(0, theCanvWidth);
        let plantY = random(orchidYmin, orchidYmax);
        console.log(plantX + " " + plantY);
        plantsCanv[3].push(new Orchid(plantX, plantY)); 
        console.log(plantsCanv[3]);
        draw();
    }
}

//since apples are trees, they spawn in the farthest row back. they're in this spot
//in the functions because they're purchasable before roses.

//also the spawn area is slightly lower so no trees spawn floating :P
var appleYmin =  4 * theCanvHeight / 20;
var appleYmax = 3 * theCanvHeight / 20;
function spawnApple(){
    //only spawns a maximum of 10 apple trees, to ensure the canvas isn't entirely 
    //overtaken by them!
    if(plantsCanv[4].length < 11){
        let plantX = random(0, theCanvWidth);
        let plantY = random(appleYmin, appleYmax);
        plantsCanv[3].push(new Apple(plantX, plantY)); 
        console.log(plantsCanv[4]);
        draw();
    }
}

var roseYmin =  8 * theCanvHeight / 20;
var roseYmax = 6 * theCanvHeight / 20;
function spawnRose(){
    //only spawns a maximum of 25 roses, to ensure the canvas isn't entirely 
    //overtaken by them!
    if(plantsCanv[3].length < 26){
        let plantX = random(0, theCanvWidth);
        let plantY = random(orchidYmin, orchidYmax);
        console.log(plantX + " " + plantY);
        plantsCanv[3].push(new Orchid(plantX, plantY)); 
        console.log(plantsCanv[3]);
        draw();
    }
}

function changeMenuColor(obj){
    obj.style.background = "#FAEFD4";
}
function menuColorBack(obj){
    obj.style.background = "#FFEBBD";
}

class Sunflower{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    //https://editor.p5js.org/p5/sketches/hhu8mAXJpQ7 for flower shape
    spawn(){
        scale(0.5);
        //petals
        fill("#EDD400");
        translate(this.x*2, this.y*2);
        noStroke();
        
        for (let i = 0; i < 10; i ++) {
          ellipse(0, 0, theCanvWidth/37, theCanvHeight/5);
          rotate(PI/5);
        }

        //center circle of flowers
        translate(-this.x*2, -this.y*2);
        fill("#8F5902");
        circle(this.x*2, this.y*2, theCanvHeight/10);
        console.log(this.x + " " + this.y);
        scale(2);
    }
}

class Tomato{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    
    spawn(){
        noFill();
        ellipseMode(CENTER);

        //plant stem
        strokeWeight(3);
        stroke("#6A9955");
        let radius = theCanvHeight/16;

        arc(this.x, this.y - radius/2, radius, radius, HALF_PI, 3*HALF_PI);
        arc(this.x, this.y - 3*radius/2, radius, radius, 3*HALF_PI, HALF_PI);

        let theLeaf = new Leaf(this.x + radius/2, this.y - 2*radius, radius, 5*PI/4);
        theLeaf.spawn();
        let theLeaf2 = new Leaf(this.x - 3*radius/4, this.y - 3*radius/4, radius, 5*PI/6);
        theLeaf2.spawn();
        
        //wooden stake for the tomato plant
        stroke("#E8D9BF");
        strokeWeight(5);
        line(this.x, this.y, this.x, this.y - theCanvHeight/8);

        strokeWeight(1);
    }
}

class Orchid{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    
    spawn(){
        noFill();
        //the stem
        strokeWeight(4);
        stroke("#6A9955");
        //beziers are complicated 😒
        let x1 = this.x;
        let y1 = this.y;
        let x2 = this.x;
        let y2 = y1 - height/8;
        let x3 = this.x;
        let y3 = this.y - height/8;
        let x4 = this.x - width/26;
        let y4 = this.y - height/10;
        bezier(x1, y1, x2, y2, x3, y3, x4, y4);
        strokeWeight(1);
        
        //the "flowers" on the orchid branch
        //I took....... artistic liberties, on a lot of the numbers here. definitely
        //could be a lot better with dynamic generation, but I didn't want to
        //micromanage even *more* numbers in this one spawn function.
        //I didn't mean for it to look like grapes. oops!
        fill("#DB67CF");
        stroke("#DB67CF");
        let circleR = theCanvHeight/50;
        circle(x4, y4+circleR/2, circleR);
        circle(x4+circleR, y4+circleR/2-2, circleR);
        circle(x4+circleR*2, y4+circleR/2-4, circleR);
        circle(x4+3*circleR/2, y4+circleR/2+3, circleR);
        circle(x4+circleR/2, y4+circleR/2+6, circleR);
        circle(x4+circleR, y4+circleR/2+10, circleR);
        
    }
}

class Apple{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    spawn(){
        fill("#BF8D65");
        noStroke();
        let rectWidth = theCanvWidth/35;
        let rectHeight = theCanvHeight/6;
        //the base of the tree
        //apparently this.x and this.y refers to the center top of the tree trunk
        rect(this.x - rectWidth/2, this.y, rectWidth, rectHeight);
        arc(this.x, this.y + rectHeight, 3*rectWidth/2, 3*rectWidth/2, PI, 0);

        //leaves
        fill("#6A9955");
        circle(this.x, this.y-rectHeight/2, rectWidth*2);
        circle(this.x+rectWidth/2, this.y, rectWidth*2);
        circle(this.x-rectWidth/2, this.y, rectWidth*2);

        //apples!
        //I tried to randomize them in a "for" loop, but they would randomize *every*
        //time I added a new apple tree, even the ones that had already spawned.
        //so instead, I just used set locations for each apple.
        fill("#FF0024");
        circle(this.x + rectWidth/7, this.y + rectHeight/8, rectWidth/4);
        circle(this.x + 3*rectWidth/5, this.y - rectHeight/2, rectWidth/4);
        circle(this.x - 3*rectWidth/5, this.y + rectHeight/5, rectWidth/4);
        circle(this.x - 4*rectWidth/5, this.y + rectHeight/17, rectWidth/4);
        circle(this.x - 3*rectWidth/17, this.y - 2*rectHeight/3, rectWidth/4);
    }
}

// Rotations are shockingly hard to use in p5, so I had to make a Leaf class for the
//tomato plant art
class Leaf{
    constructor(x, y, r, rotate){
        this.x = x;
        this.y = y;
        this.r = r/2;
        this.rotate = rotate;
    }

    spawn(){
        fill("#6A9955");
        translate(this.x, this.y);
        rotate(this.rotate);
        
        ellipse(0, 0, this.r/4, this.r);
        
        rotate(-this.rotate);
        translate(-this.x, -this.y);
        noFill();
    }
}