(function (global) {
	if (!global.UAM) {
		global.UAM = {};
	}

	function newObject() {
		var constructor = arguments[0];
		var obj = {};
		
		obj = Object.create(constructor.prototype);
		var a = constructor.apply(obj, Array.prototype.slice.call(arguments, 1));
		
		if (Object(a) === a) {
			return a;
		}
		return obj;
	}

	global.UAM.newObject = newObject;
}(window));

/*
	Zaimplementuj funkcję newObject, która będzie działać analogicznie do operatora new. Pierwszym parametrem funkcji niech będzie
	konstruktor, natomiast pozostałe to parametry konstruktora. Przykładowe zastosowanie:

	new MyClass(arg1, arg2) -> newObject(MyClass, arg1, arg2)
*/


