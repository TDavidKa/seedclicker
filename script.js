/*Just to note, the exact numbers for a lot of these things are very much subject to 
change. The scale on a lot of the plant prices is really wacky, but I'm not entirely 
sure what calculations to do to tune them to ne fairer.*/

var seeds = 1000000;
var perSec = 0;

//The amount of purchasable plants: Seeds, Sunflower, Tomato, Orchid, Apple, Rose
var plants = [0, 0, 0, 0, 0, 0];

//The prices of each purchasable plant.
var prices = [50, 100, 1024, 4096, 9890, 23240];

//The value each plant makes per second
var plantVal = [0.1, 5, 25, 128, 512, 1536]

function seedMouseOver(seed){
    seed.style.width="37.5%";
    seed.style.height="80%";
}

function seedMouseLeave(seed){
    seed.style.width="35%";
    seed.style.height="75%";
}

//runs every time the seed is clicked
function seedMouseDown(seed){
    seed.style.width="35%";
    seed.style.height="75%";
    //Increment the amount of seeds by one. Will likely be more in the future based on Upgrades
    seeds++;
    //Updates seed amount
    document.getElementById("seedAmt").innerHTML = String(seeds);
}

function seedMouseUp(seed){
    seed.style.width="37.5%";
    seed.style.height="80%";
}

/*Once again, for reference,
0: seeds
1: sunflower
2: tomato
3: orchid
4: apple
5: rose
*/
function onBuy(plantNum){
    console.log("Workin!");
    if(seeds >= prices[plantNum]){
        seeds -= prices[plantNum];
        plants[plantNum]++;

        //Would be easier to do *=, but this ensures we always get a whole number for 
        //the price.
        prices[plantNum] = Math.round(1.25 * prices[plantNum]);
        if(plantNum == 0){
            document.querySelector("#seedPlantCost").innerHTML = prices[0];
            document.querySelector("#seedPlantOwned").innerHTML = plants[0];
        }
        else if(plantNum == 1){
            document.querySelector("#sunPlantCost").innerHTML = prices[1];
            document.querySelector("#sunPlantOwned").innerHTML = plants[1];
            spawnSunflower();
        }
        else if(plantNum == 2){
            document.querySelector("#tomatoPlantCost").innerHTML = prices[2];
            document.querySelector("#tomatoPlantOwned").innerHTML = plants[2];
            spawnTomato();
        }
        else if(plantNum == 3){
            document.querySelector("#orchidPlantCost").innerHTML = prices[3];
            document.querySelector("#orchidPlantOwned").innerHTML = plants[3];
            spawnOrchid();
        }
        else if(plantNum == 4){
            document.querySelector("#applePlantCost").innerHTML = prices[4];
            document.querySelector("#applePlantOwned").innerHTML = plants[4];
            spawnApple();
        }
        else if(plantNum == 5){
            document.querySelector("#rosePlantCost").innerHTML = prices[5];
            document.querySelector("#rosePlantOwned").innerHTML = plants[5];
        }
    }
}

function seedsPerSec(){
    /*Each plant type makes a different number of seeds per second, per plant. This 
    multiplies the amount of each plant type by their plant multiplier (for now they're 
    just constants, in the future it'll also be based on Upgrades 😁) */
    perSec = plants[0] * plantVal[0] + plants[1] * plantVal[1] + plants[2] * plantVal[2] + plants[3] * plantVal[3] + plants[4] * plantVal[4] + plants[5] * plantVal[5];

    seeds += perSec;
    //https://stackoverflow.com/questions/7342957/how-do-you-round-to-one-decimal-place-in-javascript
    //Basically just ensures that the seed amount never has more than one decimal point when above 1000.
    if(seeds <=1000){
        seeds = Math.round(10*seeds) / 10;
    }
    //if we're above 1000 seeds, tens of seeds won't really matter
    else{
        seeds = Math.round(seeds);
    }
    //Ensures that the perSec amount never has more than one decimal point when above 1000.
    if(perSec <=1000){
        perSec = Math.round(10*perSec) / 10;
    }
    //if we're above 1000 seeds per second, tens of seeds per sec won't really matter
    else{
        perSec = Math.round(perSec);
    }

    //Update the seed amount and seeds per second on the page.
    document.querySelector("#seedPerSec").innerHTML = String(perSec);
    document.querySelector("#seedAmt").innerHTML = String(seeds);
    
    //runs this function every second
    setTimeout(seedsPerSec, 1000);
}

function overlayToggle(){
    let overlay = document.querySelector("#overlay");
    console.log(overlay.style.display);
    if(overlay.style.display === "none" || overlay.style.display === ""){
        overlay.style.display = "block";
    }
    else{
        overlay.style.display = "none";
    }
}

function menuToggle(){
    let menu = document.querySelector("#menu");
    console.log(menu.style.display);
    if(menu.style.display === "none" || menu.style.display === ""){
        menu.style.display = "block";
    }
    else{
        menu.style.display = "none";
    }
}