var Class = require('./index.js');

///// Test suite

var mixins = {

	length: function() {
		return Math.sqrt(this.lengthSq());
	}
};

var Vector2 = new Class({

	Mixins: mixins,

	test: "t",

	//We use named functions for the constructor,
	//but this is optional and only for cleaner debugging.
	initialize: 
	function Vector2(x, y) {
		this.x = x || 0;
		this.y = y || 0;
		this.test2 = [];
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


console.log(new Vector2())



