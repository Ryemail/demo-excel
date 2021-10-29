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

export function transformRange(string) {
	if (!string || typeof string !== "string") return;

	const column = string.replace(/[0-9]/g, "").split(":"),
		row = string.replace(/[A-Z]/g, "").split(":");

	return {
		s: { r: +row[0], c: columnNameToNumber(column[0]) },
		e: { r: +row[1], c: columnNameToNumber(column[1]) },
	};
}

export function merge(merges, current, type) {
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
	return merge(merges, current, "row");
}

export function colspan(merges, current) {
	return merge(merges, current, "col");
}
