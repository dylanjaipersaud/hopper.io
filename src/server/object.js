class Object{
    constructor(id, x, y, dir, speed){
        this.id = id;
        this.x = x;
        this.y = y;
        this.direction = dir;
        this.speed = speed
    }

    update(dt){
        this.x += dt * this.speed * Math.sin(this.direction);
        this.y -= dt * this.speed * Math.cos(this.direction);
    }


}

module.exports = Object;