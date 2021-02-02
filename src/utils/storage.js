export const setSession = (key, value) => {
	set(key, value, 'sessionStorage');
};

export const getSession = (key) => {
	return get(key, 'sessionStorage');
};

export const removeSession = (key) => {
	remove(key, 'sessionStorage');
};

export const setStorage = (key, value) => {
	set(key, value, 'localStorage');
};

export const getStorage = (key) => {
	return get(key, 'localStorage');
};

export const removeStorage = (key) => {
	remove(key, 'localStorage');
};

function set(key, value, type) {
	if (typeof value === 'object') {
		window[type].setItem(key, JSON.stringify(value));
		return;
	}
	console.log(`${key}:${value}`);
	window[type].setItem(key, value);
}

function get(key, type) {
	const value = window[type].getItem(key) || '';
	// try {
	// 	return JSON.parse(value);
	// } catch (err) {
	// 	console.log(err);
	// }
	return value;
}

function remove(key, type) {
	if (key) {
		window[type].removeItem(key);
	} else {
		window[type].clear();
	}
}
