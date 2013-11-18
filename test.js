var Class = require('./index.js');


var mix = {
	test: {
		get: function() {
			return "foo1";
		}
	}
};

Object.defineProperty(mix, "bar", {
	enumerable: true,

	get: function() {
		return "bar1";
	}
});

var Mix2 = new Class({

	initialize: function() {
		this._weight = 0;
	},

	weight: {
		// enumerable: true,
		get: function() {
			return this._weight;
		}
	}
})

var Person = new Class({

	Mixins: [mix, Mix2],

	initialize: 
	function Person(age) {
		this._age = age || 0;
		this.property = "blah";
		Mix2.call(this);
	},

	protoProperty: "foo",

    /** The 'age' property. */
    age: {
        get: function() { 
            return this._age;
        },

        set: function(value) {
            if (value < 0)
                throw new Error("age must be positive");
            this._age = value;
        }
    }
});


var p = new Person(12);
p.age += 2; //increases age
// console.log(p.age); //prints 14
// p.age = -1; //throws error

// console.log(Object.getOwnPropertyDescriptor(mix, "bar"))

console.log(p);
console.log(p.bar);
console.log(p.test);
console.log(p.weight);