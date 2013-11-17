var Class = require('./main.js');

///// Test suite

var mixins = {

	length: function() {
		return Math.sqrt(this.lengthSq());
	}
};

var Vector2 = new Class({

	Mixins: mixins,

	//We use named functions for the constructor,
	//but this is optional and only for cleaner debugging.
	initialize: function Vector2(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	},

	lengthSq: function() {
		var x = this.x, 
			y = this.y;
		return ( x * x + y * y );
	}
});

var Vector3 = new Class({

	Mixins: mixins,

	initialize: function Vector3(x, y, z) {
		//We can call the constructor 
		Vector2.call(this, x, y);
		this.z = z || 0;
	},

	lengthSq: function() {
		var x = this.x,
			y = this.y,
			z = this.z;
		return (x * x + y * y + z + z);
	}
}); 




var Point = function() {
	this._literal = 0;
	this._defined = 0;
	this.property = 0;
};

Point.prototype = Object.create({
	get literal() {
		return this._literal;
	},
	set literal(x) {
		this._literal = x;
	},

	test: []
});
Point.prototype.constructor = Point;

Object.defineProperty(Point.prototype, "defined", {
	get: function() {
		return this._defined;
	},
	set: function(x) {
		this._defined = x;
	}
});

//Object.create(obj)
console.log( new Point() );

//console.log(new Vector2().foo)



