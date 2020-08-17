///  This function creates the circle objects that will fly at users.

function Circle(x, y, dx, dy, radius, color, swervefactor, homing) {
  this.dx = dx;
  this.dy = dy;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.swervefactor = swervefactor;
  this.homing = homing;

  ///This function stems from the problem I was having of circles overlapping and then all flying exactly on top
  ///of eachother towards players.  This basically just adds a bit of random velocity every frame.

  this.swerve = function () {
    let randomnumber = this.swervefactor * (0.5 - Math.random());
    this.dx += randomnumber * 0.5;
    this.dy += randomnumber * 0.5;
  };

  ///Im kinda proud of this one because instead of just setting dx = -dx like I see a lot in online tutorials
  ///I chose to set the dx to either the abs or -abs of this.dy/this.dx etc.  This is important because you can get
  /// into a situation where a ball spawns on a border of an element and it will keep flipping dx from dx to -dx before
  ///the circle ever has time to leave that zone that switches the velocity, so you just have a vibrating cirle in that instance on the border.
  ///This one you will not have that same issue because we use Math.abs().

  this.bounceoffborder = function () {
    if (this.x - this.radius < 0) {
      this.x = Math.abs(this.x);
      this.dx = Math.abs(this.dx);
    }
    if (this.y - this.radius <= 0) {
      this.y = Math.abs(this.y);
      this.dy = Math.abs(this.dy);
    }
    if (this.x + this.radius >= canvas.width) {
      this.x = canvas.width - this.radius;
      this.dx = -Math.abs(this.dx);
    }
    if (this.y + this.radius >= canvas.height) {
      this.y = canvas.height - this.radius;
      this.dy = -Math.abs(this.dy);
    }

    this.x += this.dx;
    this.y += this.dy;
  };

  this.lookforcollision = function () {
    let distance = Math.sqrt(
      (pointer.x - this.x) ** 2 + (pointer.y - this.y) ** 2
    );
    if (distance < this.radius) {
      score.collision++;
    }
  };

  this.adjustVelocity = function () {
    // Adjusts the velocity to be attracted to the cursor depending on how far away
    if (this.x > pointer.x) {
      this.dx -= (this.x + pointer.x) / ballattraction;
    } else {
      this.dx += (this.x + pointer.x) / ballattraction;
    }
    if (this.y > pointer.y) {
      this.dy -= (this.y + pointer.y) / ballattraction;
    } else {
      this.dy += (this.y + pointer.y) / ballattraction;
    }

    this.dy = this.dy * dragcoefficient;
    this.dx = this.dx * dragcoefficient;
  };

  ///Radius of all Circles is slowly decreased until they get to a minimum radius, at which point the dissappear.
  ///The next level starts once all circles have dissapppeared.

  this.decreaseradius = function () {
    this.radius -= 0.1 * levelconfig.speed[score.level - 1];
    if (this.radius < 3) {
      circlearray = circlearray.filter((circle) => circle.radius > 1);
    }
  };

  this.draw = function () {
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fill();
  };

  this.update = function () {
    this.swerve();

    if (this.homing) {
      this.adjustVelocity();
    }
    this.lookforcollision();
    this.bounceoffborder();
    this.decreaseradius();
    this.draw();
  };
}
