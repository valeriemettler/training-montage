//static is used for non-instance properties
//use static for things that won't change
//You can call static properties without creating a new instance
//and you can override it with another static in the child
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log("point", Point.distance(p1, p2));

class Point2 extends Point {
  static distance(a,b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;

    return Math.sqrt(dx*dx + dy*dy) + 1;
  }
}
const p3 = new Point2(5, 5);
const p4 = new Point2(10, 10);

console.log("point", Point2.distance(p3, p4));