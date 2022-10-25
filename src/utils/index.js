// buffer 转 16进制
export function buffer2hex(buffer) {
	const hexArr = Array.prototype.map.call(
		new Uint8Array(buffer),
		function (bit) {
			return ("00" + bit.toString(16)).slice(-2);
		}
	);
	return hexArr;
}

// buffer 转 字符串
// buffer: ArrayBuffer,
// callback: Function,
// encoding: string = "UTF-8"
export function buffer2String(buffer, callback, encoding = "UTF-8") {
	const blob = new Blob([buffer], { type: "text/plain" });
	const reader = new FileReader();

	reader.onload = function (evt) {
		if (evt.target) callback(evt.target.result);
	};
	reader.readAsText(blob, encoding);
}

export function columnNameToNumber(name) {
	if (!name || typeof name !== "string") return;

	name = name.toUpperCase();
	let sum = 0;
	for (let i = 0; i < name.length; i++) {
		sum = sum * 26;
		sum = sum + (name[i].charCodeAt(0) - "A".charCodeAt(0) + 1);
	}

	return sum;
}

export function columnNumberToName(number) {
	let dividend = number;
	let name = "";
	let modulo = 0;

	while (dividend > 0) {
		modulo = (dividend - 1) % 26;
		name = String.fromCharCode("A".charCodeAt(0) + modulo) + name;
		dividend = Math.floor((dividend - modulo) / 26);
	}

	return name;
}

export function transformRange(merges) {
	return merges.map(({ s, e }) => {
		return (
			columnNumberToName(s.c) + s.r + ":" + columnNumberToName(e.c) + e.r
		);
	});
}

export function viewMerge(merges, current, type) {
	for (let i = 0; i < merges.length; i++) {
		const val = merges[i];

		if (val.s.r == current.r + 1 && val.s.c === current.c + 1) {
			const { s, e } = val;
			const col = e.c - s.c,
				row = e.r - s.r;

			if (type === "col") return col ? col + 1 : null;

			if (type === "row") return row ? row + 1 : null;
		}
	}
	return null;
}

export function rowspan(merges, current) {
	return viewMerge(merges, current, "row");
}

export function colspan(merges, current) {
	return viewMerge(merges, current, "col");
}

export function cellVisible(current, merges) {
	const c = current.c + 1;
	const r = current.r + 1;

	let visible = true;

	for (let i = 0; i < merges.length; i++) {
		let { s, e } = merges[i];

		if (s.c === c && e.c === c && s.r < r && r <= e.r) {
			visible = false;
			break;
		} else if (s.r === r && e.r === r && s.c < c && c <= e.c) {
			visible = false;
			break;
		}
	}

	return visible;
}
