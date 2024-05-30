let centerXs = [70, 490, 320, 430, 240, -20]; 
let centerYs = [70, 490, 130, 240, 430, 370]; 
let circle1Xs = [210, 540, 130]; 
let circle1Ys = [20, 350, 320]; 
let circle2Xs = [350, 480, 280, 20]; 
let circle2Ys = [540, 100, 280, 215]; 
let circle3Xs = [175, 385, 370, 90]; 
let circle3Ys = [175, 385, -15, 470]; 

let pg; 
let numSegments = 50; 
let segments = []; 
let drawSegments = true; 
let isInit = false; 
let originalWidth, originalHeight; 
let originalSegments = []; 

// Get the minimum window size
function minWindowSize() {
    return min(windowWidth, windowHeight);
}

// Generate random colors
function randomColor() {
    return color(random(255), random(255), random(255));
}

//Set initial function
function setup() {
    let Size = minWindowSize(); // Obtain minimum window size
    createCanvas(Size, Size); // Create Canvas

    pg = createGraphics(Size, Size); // Create drawing objects
    originalWidth = Size; // Set original width
    originalHeight = Size; // Set original height

    pg.background(0, 84, 121); // Set background color
    isInit = false; //Set initialization status
    generateGraphicsAndSegments(); //Generating images and segmentation
}

// Generating images and segmentation
function generateGraphicsAndSegments() {
    pg.background(0, 84, 121); 
    let Size = minWindowSize(); 

    pg.push(); //Save the current drawing state
    pg.scale(Size / 500); // Zoom drawing
    for (let i = 0; i < centerXs.length; i++) { //Traverse the center coordinates of a circle
        let x = centerXs[i];
        let y = centerYs[i];
        pg.fill(color(random(180, 255), random(180, 255), random(180, 255))); 
        pg.stroke(randomColor());
        pg.strokeWeight(random(1, 4)); 
        pg.circle(x, y, 140); // Draw a circle

        drawChain(x, y, 80, 20); // Draw a chain
        drawConcentricCircles(x, y, 60, 8); //Draw concentric circles

        circleRing(x, y); // Draw a circular ring

        if (random() < 0.2) { // Randomly draw curves
            drawPinkCurve(x, y, 75);
        }
    }


    /////Traverse the coordinates of the first circle group//
    for (let i = 0; i < circle1Xs.length; i++) { 
        let x = circle1Xs[i];
        let y = circle1Ys[i];
        Circle1(x, y); 
        drawChain(x, y, 75, 15); 
        if (random() < 0.2) { 
            drawPinkCurve(x, y, 75);
        }
    }


    ////Traverse the coordinates of the second circle group///
    for (let i = 0; i < circle2Xs.length; i++) { 
        let x = circle2Xs[i];
        let y = circle2Ys[i];
        Circle2(x, y); 
        drawChain(x, y, 75, 20); 

        if (random() < 0.2) { 
            drawPinkCurve(x, y, 75);
        }
    }


    ///Traverse the coordinates of the third circle group//
    for (let i = 0; i < circle3Xs.length; i++) { 
        let x = circle3Xs[i];
        let y = circle3Ys[i];
        pg.fill(color(random(180, 255), random(180, 255), random(180, 255))); //
        drawChain(x, y, 75, 15); 
        pg.circle(x, y, 140); 
        Circle3(x, y); 
        pg.fill(randomColor()); 
        pg.circle(x, y, 60); 
        drawConcentricCircles(x, y, 30, 5); 

        if (random() < 0.2) { 
            drawPinkCurve(x, y, 75);
        }
    }
    pg.pop(); 

    let segmentWidth = pg.width / numSegments; // Calculate the division width
    let segmentHeight = pg.height / numSegments; // Calculate segmentation height
    segments = []; //Clear split array

    for (let segYPos = 0; segYPos < pg.height; segYPos += segmentHeight) { // Traversing segmented images
        for (let segXPos = 0; segXPos < pg.width; segXPos += segmentWidth) {
            let segmentColour = pg.get(segXPos + segmentWidth / 2, segYPos + segmentHeight / 2); // Get Split Color
            let segment = new ImageSegment(segXPos, segYPos, segmentWidth, segmentHeight, segmentColour); // Create split image objects
            segments.push(segment); //Add split image to array
        }
    }
    originalSegments = segments.map(seg => new ImageSegment(seg.srcImgSegXPos, seg.srcImgSegYPos, seg.srcImgSegWidth, seg.srcImgSegHeight, seg.srcImgSegColour)); // 复制原始分割图像数组
    isInit = true; // Set initialization status
}

//---------Draw a circular ring--------//
function circleRing(centerX, centerY) {
    let radius = 35; 
    let numRects = 20; 
    let rectWidth = 5; 
    let rectHeight = 7; 
    let cornerRadius = 8; 
    let layerNum = random(4, 6); 
    let s = 5 / layerNum; 
    pg.fill(randomColor()); 
    pg.stroke(0, 0); 
    for (let a = 0; a < layerNum; a++) { 

        for (let i = 0; i < numRects; i++) { 
            let angle = TWO_PI / numRects * i; 
            let x = centerX + cos(angle) * radius; 
            let y = centerY + sin(angle) * radius; 

            pg.push(); 
            pg.translate(x, y); 
            pg.rotate(angle); 
            pg.rectMode(CENTER); 
            pg.rect(0, 0, rectWidth * s, rectHeight * s, cornerRadius); 
            pg.pop(); 
        }
        radius = radius + 32 / layerNum; 
        numRects = numRects + 3; 
    }
}

// -------Draw concentric circles-------/
function drawConcentricCircles(centerX, centerY, maxDiameter, numCircles) {
    let step = maxDiameter / numCircles; // time step 
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
        pg.ellipse(centerX + offsetX, centerY + offsetY, diameter, diameter); 
    }
}

// --------Draw dots-----//
function drawCircleDots(centerX, centerY, radius, numDots, dot) {
    let angleStep = TWO_PI / numDots; //
    pg.fill(randomColor()); //
    pg.noStroke(); 
    for (let i = 0; i < numDots; i++) {
        let angle = i * angleStep;
        let x = centerX + cos(angle) * radius; 
        let y = centerY + sin(angle) * radius; 
        pg.ellipse(x, y, dot, dot);
    }
}


// ----------Draw circular lines-----//
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

// ------Draw the first circle-------//
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
        drawCircleDots(centerX, centerY, baseRadius + i * radiusIncrement, 30 + i * 7, 5); 
        drawCircleLines(centerX, centerY, 30 + numLayers * radiusIncrement, 200, 20); //
    }
}

// Draw the second circle
function Circle2(centerX, centerY) {
    let numLayers = 10; 
    let initialRadius = 30; 
    let radiusStep = 4; 
    let initialNumDots = 40; //
    let dotsIncrement = 6; 

    pg.fill(randomColor()); 
    pg.noStroke(); 
    pg.circle(centerX, centerY, 140); 

    pg.fill(randomColor()); 
    pg.ellipse(centerX, centerY, 30, 30); 

    for (let i = 0; i < numLayers; i++) { 
        let radius = initialRadius + i * radiusStep; 
        let numDots = initialNumDots + i * dotsIncrement; //
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
        if (i % 2 == 0) { // 判断奇偶
            let x = centerX + cos(angle) * innerRadius; 
            let y = centerY + sin(angle) * innerRadius; 
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
    for (let p of points) {
        vertex(p.x, p.y); 
    }
    pg.endShape(CLOSE); 
}

// Draw a pink curve
function drawPinkCurve(centerX, centerY, radius) {
    let angle = random(TWO_PI); 
    let x1 = centerX + cos(angle) * radius; 
    let y1 = centerY + sin(angle) * radius; 
    let cp1x = centerX + cos(angle + PI / 4) * radius / 2; 
    let cp1y = centerY + sin(angle + PI / 4) * radius / 2; 

    pg.stroke(255, 105, 180); 
    pg.strokeWeight(3); 
    pg.noFill(); 
    pg.bezier(centerX, centerY, cp1x, cp1y, cp1x, cp1y, x1, y1); 
}

// Draw Chain
function drawChain(centerX, centerY, chainRadius, numLinks) {
    let angleStep = TWO_PI / numLinks; 
    for (let i = 0; i < numLinks; i++) { 
        let angle = i * angleStep; 
        let x = centerX + cos(angle) * chainRadius; 
        let y = centerY + sin(angle) * chainRadius; 
        pg.fill(255); 
        pg.stroke(0); //
        pg.strokeWeight(2.5); 
        pg.ellipse(x + 1, y + 1, 6, 6); 
    }
}



function draw() {
    background(0); 
    if (isInit == false) { // Determine whether to initialize
        generateGraphicsAndSegments(); //Generating images and segmentation
    }
    let time = map(mouseX,0,width,0,60); // Map time based on mouse X position

    console.log(time); 
    if (frameCount % int(time) === 0) { // Determine whether to regenerate the image
        generateGraphicsAndSegments(); //Generating images and segmentation
    }


    if (drawSegments) { //Determine whether to draw a segmented image
        for (const segment of segments) { // Traversing segmented images
            segment.scale = dist(segment.srcImgSegXPos, segment.srcImgSegYPos, mouseX, mouseY) / 100; // Calculate scaling ratio
            segment.draw(); // Draw segmented images
        }
    } else {
        image(pg, 0, 0, width, height); // Draw a complete image
    }
}

// Keyboard press event
function keyPressed() {
    if (key == " ") { // Check the space bar
        drawSegments = !drawSegments; // Switch drawing mode
    }
}

//Window Resizing Event
function windowResized() {
    let Size = minWindowSize(); 
    resizeCanvas(Size, Size); 
    pg.resizeCanvas(Size, Size); 
    segments = originalSegments.map(seg => new ImageSegment(seg.srcImgSegXPos * (Size / originalWidth), seg.srcImgSegYPos * (Size / originalHeight), seg.srcImgSegWidth * (Size / originalWidth), seg.srcImgSegHeight * (Size / originalHeight), seg.srcImgSegColour)); // Update segmented images
    isInit = false; 
}

// Image segmentation class
class ImageSegment {

    constructor(srcImgSegXPosInPrm, srcImgSegYPosInPrm, srcImgSegWidthInPrm, srcImgSegHeightInPrm, srcImgSegColourInPrm) {
        this.srcImgSegXPos = srcImgSegXPosInPrm; 
        this.srcImgSegYPos = srcImgSegYPosInPrm; 
        this.srcImgSegWidth = srcImgSegWidthInPrm; 
        this.srcImgSegHeight = srcImgSegHeightInPrm; 
        this.srcImgSegColour = srcImgSegColourInPrm; 
        this.scale = 1; 
    }

    draw() {
        stroke(0); // Set black lines
        fill(this.srcImgSegColour); 
        rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth * this.scale, this.srcImgSegHeight * this.scale); 
    }
}
