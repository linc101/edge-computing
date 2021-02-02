function formatFunc(str) {
	let num = parseInt(str);
	return num > 9 ? str : '0' + str;
}
export function formatTime(UTCDate, formatType = 'Y-M-D h:m:s') {
	if (!UTCDate) {
		return '';
	}
	let date = new Date(UTCDate);
	let year = date.getFullYear();
	let month = formatFunc(date.getMonth() + 1);
	let day = formatFunc(date.getDate());
	let hour = formatFunc(date.getHours());
	let minute = formatFunc(date.getMinutes());
	let second = formatFunc(date.getSeconds());
	if (formatType === 'Y-M-D h:m:s') {
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	}
	if (formatType === 'Y-M-D') {
		return `${year}-${month}-${day}`;
	}
}
