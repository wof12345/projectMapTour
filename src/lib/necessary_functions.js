//debug
// let arr = [2, 3, 5, 2, 1, 5, 6];
const Log = {
	reset: '\x1b[0m',
	bright: '\x1b[1m',
	dim: '\x1b[2m',
	underscore: '\x1b[4m',
	blink: '\x1b[5m',
	reverse: '\x1b[7m',
	hidden: '\x1b[8m',

	fg: {
		black: '30m',
		red: '31m',
		green: '32m',
		yellow: '33m',
		blue: '34m',
		magenta: '35m',
		cyan: '36m',
		white: '37m',
		crimson: '38m'
	},
	bg: {
		black: '100m',
		red: '101m',
		green: '102m',
		yellow: '103m',
		blue: '104m',
		magenta: '105m',
		cyan: '106m',
		white: '107m',
		crimson: '108m'
	}
};

//always put this before the variables file
function BINARYSEARCH(arr, start, end, target, param) {
	if (end >= start) {
		let mid = Math.floor(start + (end - start) / 2);
		// console.log(arr, mid, target);

		if (arr[mid] === target) {
			if (param) return mid;
			else return true;
		}

		if (arr[mid] > target) return BINARYSEARCH(arr, start, mid - 1, target, param);

		return BINARYSEARCH(arr, mid + 1, end, target, param);
	}
	return false;
}

function GENERATERANDOMNUMBER(arrayToCompare, lowerrange, upperrange, type, iteration) {
	if (lowerrange > upperrange) {
		lowerrange = upperrange;
	}
	let generatedNumber;
	if (type === 'integer') {
		generatedNumber = Math.floor(Math.random() * (upperrange - lowerrange) + lowerrange);
	} else if (type === 'double') {
		generatedNumber = Math.random() * (upperrange - lowerrange) + lowerrange;
	}

	let binSres = BINARYSEARCH(arrayToCompare, 0, arrayToCompare.length - 1, generatedNumber)[0];
	// console.log(binSres);

	if (!binSres && generatedNumber >= lowerrange) {
		return generatedNumber;
	} else {
		if (iteration >= upperrange) arrayToCompare = [];
		return GENERATERANDOMNUMBER(arrayToCompare, lowerrange, upperrange, type, ++iteration);
	}
}

function fgColorSet(color) {
	if (color === 'black') {
		color = Log.fg.black;
	} else if (color === 'red') {
		color = Log.fg.red;
	} else if (color === 'green') {
		color = Log.fg.green;
	} else if (color === 'yellow') {
		color = Log.fg.yellow;
	} else if (color === 'blue') {
		color = Log.fg.blue;
	} else if (color === 'magenta') {
		color = Log.fg.magenta;
	} else if (color === 'crimson') {
		color = Log.fg.crimson;
	} else if (color === 'white') {
		color = Log.fg.white;
	} else if (color === 'cyan') {
		color = Log.fg.cyan;
	}

	return color;
}

function bgColorSet(backgroundcolor) {
	if (backgroundcolor === 'black') {
		backgroundcolor = Log.fg.black;
	} else if (backgroundcolor === 'red') {
		backgroundcolor = Log.fg.red;
	} else if (backgroundcolor === 'green') {
		backgroundcolor = Log.fg.green;
	} else if (backgroundcolor === 'yellow') {
		backgroundcolor = Log.fg.yellow;
	} else if (backgroundcolor === 'blue') {
		backgroundcolor = Log.fg.blue;
	} else if (backgroundcolor === 'magenta') {
		colbackgroundcoloror = Log.fg.magenta;
	} else if (backgroundcolor === 'crimson') {
		backgroundcolor = Log.fg.crimson;
	} else if (backgroundcolor === 'white') {
		backgroundcolor = Log.fg.white;
	} else if (backgroundcolor === 'cyan') {
		backgroundcolor = Log.fg.cyan;
	}

	return backgroundcolor;
}

function LOG(data, color, backgroundcolor, type) {
	color = fgColorSet(color);

	backgroundcolor = bgColorSet(backgroundcolor);

	if (type === 'log') {
		console.log(`\x1b[${color}%s\x1b[${backgroundcolor}`, data);
	} else if (type === 'info') {
		console.info(`\x1b[${color}%s\x1b[${backgroundcolor}`, data);
	} else if (type === 'error') {
		console.error(`\x1b[${color}%s\x1b[${backgroundcolor}`, data);
	} else if (type === 'warn') {
		console.warn(`\x1b[${color}%s\x1b[${backgroundcolor}`, data);
	} else if (type === 'table') {
		console.table(`\x1b[${color}%s\x1b[${backgroundcolor}`, data);
	}
}

function CPAPITALIZEFIRST(string) {
	string = string.charAt(0).toUpperCase() + string.slice(1);
}

function SETCONTENT(target, data) {
	target = data;
}

function GETDOMQUERY(className) {
	let data = document.querySelectorAll(className);

	if (data.length === 1) return data[0];
	else return data;
}

function APPLYSTYLES(elements, styles) {
	elements.forEach((elm, ind) => {
		if (elm) elm.style = styles[ind];
	});
}

function TIMEOUT(passedFunction, delay) {
	return setTimeout(() => {
		passedFunction();
	}, delay);
}

function INTERVAL(passedFunction, delay) {
	return setInterval(() => {
		passedFunction();
	}, delay);
}

function CLEARALLTIMEOUT(array) {
	for (let i = 0; i < array.length; i++) {
		clearTimeout(array[i]);
	}
}

function CLEARALLINTERVAL(array) {
	for (let i = 0; i < array.length; i++) {
		clearInterval(array[i]);
	}
}

function TIMEDANIMATION(passedCollection, passedStyles, interval, iteration, timeOutArray) {
	if (iteration >= passedCollection.length) return;

	APPLYSTYLES([passedCollection[iteration]], [passedStyles[iteration]]);

	timeOutArray.TimeOutFunctions.push(
		TIMEOUT(
			TIMEDANIMATION.bind(
				this,
				passedCollection,
				passedStyles,
				interval,
				++iteration,
				timeOutArray
			),
			interval
		)
	);
}

function OBJECTTOARRAY(obj) {
	let array = [];
	for (const property in obj) {
		array.push([property, obj[property]]);
	}
	return array;
}

function ARRAYTOOBJ(arr) {
	let obj = {};
	for (const item of arr) {
		obj[item[0]] = item[1];
	}
	return obj;
}

// console.log(GENERATERANDOMNUMBER([0, 1, 2, 3, 4, 8, 9], 0, 10, "integer"));
// let arr = OBJECTTOARRAY({ maun: "come", woman: "come" });
// console.log(arr);
// console.log(ARRAYTOOBJ(arr));

export { Log, BINARYSEARCH, GENERATERANDOMNUMBER, LOG, SETCONTENT, APPLYSTYLES };
