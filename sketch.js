let centerXs = [70, 490, 320, 430, 240, -20]; 
let centerYs = [70, 490, 130, 240, 430, 370]; 
let circle1Xs = [210, 540, 130]; //First circle group X coordinate array
let circle1Ys = [20, 350, 320]; // First circle group Y coordinate array
let circle2Xs = [350, 480, 280, 20]; // Second circle group X coordinate array
let circle2Ys = [540, 100, 280, 215]; // Second circle group Y coordinate array
let circle3Xs = [175, 385, 370, 90]; // Third circle group X coordinate array
let circle3Ys = [175, 385, -15, 470]; //Third circle group Y coordinate array

let pg;


//Get the minimum window size
function minWindowSize() {
    return min(windowWidth, windowHeight);
}

function randomColor() {
    return color(random(255), random(255), random(255));
}

function setup() {
    let Size = minWindowSize(); 
    createCanvas(Size, Size); 

    pg = createGraphics(Size, Size); 
    originalWidth = Size; 
    originalHeight = Size; 

    pg.background(0, 84, 121); 
    isInit = false; 
    generateGraphicsAndSegments(); 
}

//Generating images and segmentation
function generateGraphicsAndSegments() {
    pg.background(0, 84, 121); 
    let Size = minWindowSize(); 

    pg.push(); // Save the current drawing state
    pg.scale(Size / 500); // Zoom drawing
    for (let i = 0; i < centerXs.length; i++) { 
        let x = centerXs[i];
        let y = centerYs[i];
        pg.fill(color(random(180, 255), random(180, 255), random(180, 255))); 
        pg.stroke(randomColor());
        pg.strokeWeight(random(1, 4)); 
        pg.circle(x, y, 140); // Draw circle

        drawChain(x, y, 80, 20); //Draw a chain
        drawConcentricCircles(x, y, 60, 8); // Draw concentric circles

        circleRing(x, y); // Draw a circular ring

        if (random() < 0.2) { // Randomly draw curves
            drawPinkCurve(x, y, 75);
        }
    }

    for (let i = 0; i < circle1Xs.length; i++) { //Coordinates of the first circle group
        let x = circle1Xs[i];
        let y = circle1Ys[i];
        Circle1(x, y); //Draw the first circle
        drawChain(x, y, 75, 15); // Draw a chain

        if (random() < 0.2) { 
            drawPinkCurve(x, y, 75);
        }
    }

    for (let i = 0; i < circle2Xs.length; i++) { // Coordinates of the second circle group
        let x = circle2Xs[i];
        let y = circle2Ys[i];
        Circle2(x, y); //Draw the second circle
        drawChain(x, y, 75, 20); 

        if (random() < 0.2) { 
            drawPinkCurve(x, y, 75);
        }
    }

    for (let i = 0; i < circle3Xs.length; i++) { // Coordinates of the third circle group
        let x = circle3Xs[i];
        let y = circle3Ys[i];
        pg.fill(color(random(180, 255), random(180, 255), random(180, 255))); 
        drawChain(x, y, 75, 15); 
        pg.circle(x, y, 140); 
        Circle3(x, y); // circle 3
        pg.fill(randomColor()); 
        pg.circle(x, y, 60); // 
        drawConcentricCircles(x, y, 30, 5); // Concentric circle

        if (random() < 0.2) { 
            drawPinkCurve(x, y, 75);
        }
    }
    pg.pop(); // Restore drawing status


    isInit = true; // Set initialization status
}

// Draw a circular ring
function circleRing(centerX, centerY) {
    let radius = 35; 
    let numRects = 20; 
    let rectWidth = 5; 
    let rectHeight = 7; 
    let cornerRadius = 8; 
    let layerNum = random(4, 6)
    let s = 5 / layerNum; // Scale factor
    pg.fill(randomColor()); 
    pg.stroke(0, 0); 
    for (let a = 0; a < layerNum; a++) { 

        for (let i = 0; i < numRects; i++) {
            let angle = TWO_PI / numRects * i; 
            let x = centerX + cos(angle) * radius; 
            let y = centerY + sin(angle) * radius; 

            pg.push(); // Save drawing status
            pg.translate(x, y); 
            pg.rotate(angle); 
            pg.rectMode(CENTER); // Set rectangular mode as center
            pg.rect(0, 0, rectWidth * s, rectHeight * s, cornerRadius); 
            pg.pop(); //Restore drawing status
        }
        radius = radius + 32 / layerNum; // Increase radius
        numRects = numRects + 3; // Increase the number of rectangles
    }
}

// Draw concentric circles
function drawConcentricCircles(centerX, centerY, maxDiameter, numCircles) {
    let step = maxDiameter / numCircles;
    let e = random(1, 255); 
    for (let i = 0; i < numCircles; i++) {
        let diameter = maxDiameter - i * step;
        let offsetX = random(-1, 1); 
        let offsetY = random(-1, 1); 
        if (i < 6) {
            pg.fill(e, e, e);
        } else {
            pg.fill(randomColor()); 
        }
        pg.stroke(randomColor()); 
        pg.strokeWeight(random(0, 5)); 
        pg.ellipse(centerX + offsetX, centerY + offsetY, diameter, diameter); // Draw an ellipse
    }
}

//Draw dots
function drawCircleDots(centerX, centerY, radius, numDots, dot) {
    let angleStep = TWO_PI / numDots; 
    pg.fill(randomColor()); 
    pg.noStroke(); 
    for (let i = 0; i < numDots; i++) { 
        let angle = i * angleStep; 
        let x = centerX + cos(angle) * radius; 
        let y = centerY + sin(angle) * radius; 
        pg.ellipse(x, y, dot, dot);
    }
}

// Draw circular lines
function drawCircleLines(centerX, centerY, startRadius, numLines, lineLength) {
    pg.strokeWeight(1); 
    for (let i = 0; i < numLines; i++) { 
        let angle = TWO_PI / numLines * i; 
        pg.stroke(randomColor()); 
        let xStart = centerX + cos(angle) * startRadius; 
        let yStart = centerY + sin(angle) * startRadius; 
        let xEnd = centerX + cos(angle) * (startRadius + lineLength); 
        let yEnd = centerY + sin(angle) * (startRadius + lineLength); 
        pg.line(xStart, yStart, xEnd, yEnd); 
    }
}

// Draw the first circle
function Circle1(centerX, centerY) {
    let baseRadius = 30;
    let radiusIncrement = 5; 
    let numLayers = 4; 
    pg.fill(255, 204, 0); 
    pg.noStroke(); 
    pg.circle(centerX, centerY, 140); 
    pg.fill(randomColor()); 
    pg.noStroke(); 
    pg.circle(centerX, centerY, 70);

    for (let i = 0; i < numLayers; i++) { 
        drawCircleDots(centerX, centerY, baseRadius + i * radiusIncrement, 30 + i * 7, 5); // Draw dots
        drawCircleLines(centerX, centerY, 30 + numLayers * radiusIncrement, 200, 20); //Draw circular lines
    }
}

// Draw the second circle
function Circle2(centerX, centerY) {
    let numLayers = 10; 
    let initialRadius = 30; 
    let radiusStep = 4; 
    let initialNumDots = 40; 
    let dotsIncrement = 6; 
    pg.fill(randomColor()); 
    pg.noStroke(); 
    pg.circle(centerX, centerY, 140); 
    pg.fill(randomColor()); 
    pg.ellipse(centerX, centerY, 30, 30); 
    for (let i = 0; i < numLayers; i++) { 
        let radius = initialRadius + i * radiusStep; 
        let numDots = initialNumDots + i * dotsIncrement; 
        drawCircleDots(centerX, centerY, radius, numDots, 3); 
    }
}

// Draw the third circle
function Circle3(centerX, centerY) {
    let innerRadius = 35; 
    let outerRadius = 65; 
    let numPoints = 120; 
    let points = []; 
    for (let i = 0; i < numPoints; i++) { 
        let angle = TWO_PI / numPoints * i; 
        if (i % 2 == 0) { 
            let x = centerX + cos(angle) * innerRadius; //Calculate the X coordinate
            let y = centerY + sin(angle) * innerRadius; //Calculate the Y coordinate
            points.push(createVector(x, y)); 
        } else {
            let x = centerX + cos(angle) * outerRadius; 
            let y = centerY + sin(angle) * outerRadius; 
            points.push(createVector(x, y)); 
        }
    }
    pg.strokeWeight(1); 
    pg.stroke(randomColor()); 
    pg.noFill(); 
    pg.beginShape(); 
    for (let p of points) 
        { vertex(p.x, p.y); }
    pg.endShape(CLOSE); 
}

// Draw a pink curve
function drawPinkCurve(centerX, centerY, radius) {
    let angle = random(TWO_PI); 
    let x1 = centerX + cos(angle) * radius; // Calculate the X coordinate of the endpoint
    let y1 = centerY + sin(angle) * radius; // Calculate the Y coordinate of the endpoint
    let cp1x = centerX + cos(angle + PI / 4) * radius / 2; //Calculate the X-coordinate of the control point
    let cp1y = centerY + sin(angle + PI / 4) * radius / 2; // Calculate the Y-coordinate of the control point

    pg.stroke(255, 105, 180); 
    pg.strokeWeight(3); 
    pg.noFill(); 
    pg.bezier(centerX, centerY, cp1x, cp1y, cp1x, cp1y, x1, y1); // Draw a Bezier curve
}

// Draw Chain
function drawChain(centerX, centerY, chainRadius, numLinks) {
    let angleStep = TWO_PI / numLinks; // Calculate angle step size
    for (let i = 0; i < numLinks; i++) { 
        let angle = i * angleStep; 
        let x = centerX + cos(angle) * chainRadius; 
        let y = centerY + sin(angle) * chainRadius; 
        pg.fill(255);
        pg.stroke(0); 
        pg.strokeWeight(2.5); 
        pg.ellipse(x + 1, y + 1, 6, 6);
    }
}

// Move the mouse to control the flashing speed
function draw() {
    background(0); 

    if (isInit == false) { // Determine whether to initialize
        generateGraphicsAndSegments(); // Generating images and segmentation
    }
    let time = map(mouseX,0,width,0,60); // Map time based on mouse X positionMap time based on mouse X position

    if (frameCount % int(time) === 0) { // Determine whether to regenerate the image
        generateGraphicsAndSegments(); // Generating images and segmentation
    }
    image(pg,0,0);
}


// Window Resizing
function windowResized() {
    let Size = minWindowSize(); //Calculate the minimum window size
    resizeCanvas(Size, Size); // Canvas Size 
    pg.resizeCanvas(Size, Size); 

    isInit = false; // Reset initialization flag
}


