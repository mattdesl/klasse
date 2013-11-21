
var Class = require('./index.js');
/////////// Lightweight Mixins
Class.ignoreFinals = true;

var mixA = {
	a: "",

	//simplified klasse format
	test: {
		//'test' cannot be overridden
		configurable: true,

		get: function() {
			return "foo";
		}
	}
};

//A true property descriptor
Object.defineProperty(mixA, "bar", {
	enumerable: true,

	get: function() {
		return "bar";
	}
});

/////////// Class Mixins
var MixB = new Class({
	b: "t",

	test: {
		configurable: true,
		get: function() {
			return "override";
		}
	}
});

var Person = new Class({

	Extends: MixB,

	Mixins: mixA,

	initialize: 
	function Person() {

	},

	// test: {
	// 	get: function() {
	// 		return "override2";
	// 	}
	// }
});

var p = new Person();
console.log(p);
console.log(p.test);