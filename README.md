## klasse

A minimal class/mixin utility for JavaScript, focusing on performance, Node compatibility, and composition over inheritance. 

## syntax

Inspired by [MooTools](http://mootools.net/docs/core/Class/Class), the syntax is simple and readable:

```javascript
var MyClass = new Class({
	
	//Base class to extend from
	Extends: BaseClass,

	//Optional array of mixins
	Mixins: [ myMixins ], 

	initialize:
	function MyClass() {
		this.prop = "foo";
	}
});
```

Keywords:
	
- `Extends`: Optional. Specifies the base class for prototype chain.
- `Mixins`: Optional. Can be an array, or just a single mixin. A mixin is a lightweight object or a `Class` (i.e. function) which defines methods, properties, and so forth to be added directly to a class prototype. 
- `initialize`: Optional. The constructor method, generally a named function for clearer debugging. If not specified, and a base class is given to `Extends`, the constructor will default to calling the base class constructor. Otherwise, an empty constructor will be used.

## performance & V8 optimizations in mind

Encourages best performance in a number of ways:

- Lookups in a long prototype chain can be more costly, so composition over inheritance is encouraged with Mixins.
- No funky magic going on in the constructor (like in MooTools) -- just what you've defined for `initialize`. This is more ideal for V8 optimizations (hidden classes).
- Does not clutter objects with caller/super/etc. information. Too many properties in a class will make it less likely to be optimized by V8 and other engines.[1](http://console-to-chrome.appspot.com/#26)

## constructor best practices

- Use a named constructor function so it appears correctly in the debugger, and in stack traces.
- Declare all instance variables for the class up-front in the constructor. This is done for two reasons:
	1. It's ideal for hidden classes in V8 and other engines.
	2. If you declare an instance property on the object passed to the `Class` constructor, it will be
	placed in the object's prototype. This leads to an unnecessary lookup in the prototype chain. It also may cause problems for Arrays and Objects, because they are not re-initialized as you might expect.

## Usage

Here is a Vector example, where we use shared code but favour composition rather than inheritance. Inheritance (i.e. Vector3 extends Vector2) would lead to more lookups on the prototype chain.


## Getters/Setters

An object passed with a `set` or `get` 