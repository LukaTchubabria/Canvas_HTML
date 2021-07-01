const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // restart all circle

    // init()
})

// Circle radius
var maxRadius = 30;
var minRadius = 7;

// Circle zoom speed

var mouseZoomSpeed = 4;
var mouseUnZoomSpeed = 5;

// Colors 

var circlesColors = [
    '#D92949',
    '#460273',
    '#0597F2',
    '#F2D16D',
    '#F27D16'
];

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = circlesColors[Math.floor(Math.random() * circlesColors.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth ||  this.x - radius < 0) {
            this.dx = -this.dx;
        };
    
        if (this.y + this.radius > innerHeight ||  this.y - this.radius < 0) {
            this.dy = -this.dy;
        };
    
        this.x += this.dx;
        this.y += this.dy;

        // interactivity

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += mouseZoomSpeed;
            }
        } else if (this.radius > minRadius) {
            this.radius -= mouseUnZoomSpeed;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {
    circleArray = [];
    for (var i = 0; i < 700; i++) {
        var radius = minRadius;
        var x = Math.random() * (innerWidth - 2 * radius) + radius;
        var y = Math.random() * (innerHeight - 2 * radius) + radius;
        var dx = (Math.random() - 0.5)*4;
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius))
    }
}



function animate() {
    requestAnimationFrame(animate);
    c. clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

init();
animate();