var Class = require('./index.js');

//Here is a mixin, which can contain
//functions, objects, properties, or whatever else
//you wish to place on the prototype. You can also use
//a new Class for a Mixin base. 
var mixins = {

	length: function() {
		return Math.sqrt(this.lengthSq());
	}
};

var Vector2 = new Class({

	Mixins: mixins,

	//We use named functions for the constructor,
	//but this is optional and only for cleaner debugging.
	initialize: 
	function Vector2(x, y) {
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

	initialize: 
	function Vector3(x, y, z) {
		//We can call the constructor like so
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


console.log(new Vector2());


// var Point = new Class({

// 	Extends: Vector2,

// });


var Person =  Class({
	
	initialize:
	function Person(ageValue) {
		this._age = ageValue || 0;	
	},

	age: {
		get: function() {
			return this;
		}
	}
});

var Test = function() {

};
Test.prototype.foo = function() {
	throw new Error("fooerr");
};


var p = new Person();
console.log(p);
console.log(p.age);

var o = {
	get age() {
		return this._age;
	}
};

console.log(o.age);

// p.foo()


// var f = new Test().foo();

