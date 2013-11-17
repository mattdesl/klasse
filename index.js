function extend(ctor, definition) {
	for (var k in definition) {
		if (!definition.hasOwnProperty(k))
			continue;

		var def = definition[k];
		var isProp = typeof def === "object" && 
			 			( (def.get && typeof def.get === "function")
			 			||(def.set && typeof def.set === "function")
			 			);

		if (isProp) {
			Object.defineProperty(ctor.prototype, k, def);
		} else {
			ctor.prototype[k] = definition[k];
		}
	}
}

/**
 */
function mixin(myClass, mixins) {
	if (!mixins)
		return;

	//Inherits any mixins, such as functions or setter/getters.
	if (Array.isArray(mixins)) {
		for (var i=0; i<mixins.length; i++) {
			//Accept Classes (MyClass.prototype) or lightweight objects ( {} )
			extend(myClass, mixins[i].prototype || mixins[i]);
		}
	} else {
		//We could also mix in functions here, but
		//then we'd need to mix in properties for consistency.
		//and that can lead to conflicts on a class that just has set() or get().
		extend(myClass, mixins.prototype || mixins);
	}
		
}

/**
 * 
 */
function Class(definition) {
	if (!definition)
		definition = {};

	//The variable name here dictates what we see in Chrome debugger
	var initialize;
	if (definition.initialize) {
		if (typeof definition.initialize !== "function")
			throw new Error("initialize must be a function");
		initialize = definition.initialize;

		//Usually we should avoid "delete" in V8 at all costs.
		//However, its unlikely to make any performance difference
		//here since we only call this on class creation (i.e. not object creation).
		delete definition.initialize;
	} else {
		if (definition.Extends) {
			var base = definition.Extends;
			initialize = function () {
				base.apply(this, arguments);
			}; 
		} else {
			initialize = function () {}; 
		}
	}

	if (definition.Extends) {
		initialize.prototype = Object.create(definition.Extends.prototype);
		initialize.prototype.constructor = initialize;
		delete definition.Extends;
	} else {
		initialize.prototype.constructor = initialize;
	}

	//Grab the mixins, if they are specified...
	var mixins = null;
	if (definition.Mixins) {
		mixins = definition.Mixins;
		delete definition.Mixins;
	}

	//First, mixin if we can.
	mixin(initialize, mixins);

	//Now we grab the actual definition which defines the overrides.
	extend(initialize, definition);

	return initialize;
};

Class.extend = extend;
Class.mixin = mixin;

module.exports = Class;