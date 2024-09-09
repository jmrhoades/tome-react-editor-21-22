// https://codepen.io/netsi1964/pen/LYGaOvv

let coordinates = [],
	lines = [],
	lineType = "C";

// init(originalPath);

function setLineType() {
	eleAppSettings.classList.remove(`app-settings--${lineType}`);
	eleLineType
		.querySelectorAll("input")
		.forEach((e) => (lineType = e.checked ? e.id : lineType));
	eleAppSettings.classList.add(`app-settings--${lineType}`);
	addRoundCorners(originalPath);
}

function init(path) {
	setLineType();
	coordinates = [];
	lines = [];
	// get the points in an array
	let rawCoordinates = path
		.getAttribute("d")
		.replace(/[mlz]/gi, "")
		.split(" ")
		.filter((c) => c.trim() != "");

	for (let i = 0; i < rawCoordinates.length; i += 2) {
		const coor = { x: rawCoordinates[i], y: rawCoordinates[i + 1] };
		coordinates.push(coor);
		pathPoints.appendChild(getCircle(coor, { r: POINT_RADIUS }));
	}

	const numberOfCoordinates = coordinates.length;
	let largestRadius = 0;
	for (let i = 0; i < numberOfCoordinates; i++) {
		const coorBefore =
			i === 0 ? coordinates[numberOfCoordinates - 1] : coordinates[i - 1];
		const coor = coordinates[i];
		const coorAfter =
			i === numberOfCoordinates - 1 ? coordinates[0] : coordinates[i + 1];

		//  construct temporary line path (beforLine) going from point to point before current point
		const lineBefore = getLine(coor, coorBefore);

		//  construct temporary line path (afterLine) going from point to point after current point
		const lineAfter = getLine(coor, coorAfter);

		// Line between two lines
		let lineBetween = getLine(coorBefore, coorAfter);
		let lineBetweenLength = lineBetween.getTotalLength();
		let middlePoint = lineBetween.getPointAtLength(lineBetweenLength / 2);
		lineBetween = getLine(coor, middlePoint);

		const maxRadius = parseInt(
			Math.min(lineBefore.getTotalLength(), lineAfter.getTotalLength()) / 2
		);
		largestRadius = maxRadius > largestRadius ? maxRadius : largestRadius;

		lines.push({ lineBefore, lineAfter, coor, lineBetween, maxRadius });
	}
	eleRadius.setAttribute("max", largestRadius);
	eleRadius2.setAttribute("max", largestRadius);
	
}

function addRoundCorners(path) {
	// find radius
	radius = eleRadius.value;
	radius2 = eleRadius2.value;
	eleRadiusInfo.setAttribute("radius", radius);
	eleRadiusInfo2.setAttribute("radius", radius2);

	// for each point
	const numberOfCoordinates = coordinates.length;
	let d = "";
	cornerPoints.innerHTML = "";
	for (let i = 0; i < numberOfCoordinates; i++) {
		let { lineBefore, lineAfter, coor, lineBetween, maxRadius } = lines[i];
		const minorRadius = Math.min(radius, maxRadius);
		const minorRadius2 = Math.min(radius2, maxRadius);
		const beforePoint = lineBefore.getPointAtLength(minorRadius);
		const afterPoint = lineAfter.getPointAtLength(minorRadius);
		const beforePoint2 = lineBefore.getPointAtLength(minorRadius2);
		const afterPoint2 = lineAfter.getPointAtLength(minorRadius2);

		coor = lineBetween.getPointAtLength(minorRadius2);

		// generate data to new rounded path
		switch (lineType) {
			case "Q":
				d += `${i === 0 ? "M" : "L"} ${getCoordinates(
					beforePoint
				)} ${lineType} ${getCoordinates(coor)} ${getCoordinates(afterPoint)} `;
				cornerPoints.appendChild(getCircle(coor, { r: POINT_RADIUS }));
				break;
			case "C":
				d += `${i === 0 ? "M" : "L"} ${getCoordinates(
					beforePoint
				)} ${lineType} ${getCoordinates(beforePoint2)} ${getCoordinates(
					afterPoint2
				)} ${getCoordinates(afterPoint)} `;
				cornerPoints.appendChild(
					getCircle(beforePoint2, { r: POINT_RADIUS, fill: POINT_FILL })
				);
				cornerPoints.appendChild(
					getCircle(afterPoint2, { r: POINT_RADIUS, fill: POINT_FILL })
				);
				break;
		}

		cornerPoints.appendChild(getCircle(beforePoint, { r: POINT_RADIUS, fill: POINT_FILL }));
		cornerPoints.appendChild(getCircle(afterPoint, { r: POINT_RADIUS, fill: POINT_FILL }));
	}
	roundCornerPath.setAttribute("d", d + " Z");
}

function getCoordinates(point) {
	return `${Math.round(point.x)} ${Math.round(point.y)}`;
}

function getLine(coor1, coor2) {
	const line = getElement("path");
	line.setAttribute("d", `M ${coor1.x} ${coor1.y} L  ${coor2.x} ${coor2.y}`);
	return line;
}

function getCircle(coor, attrs) {
	const circle = getElement("circle", { cx: coor.x, cy: coor.y, ...attrs });
	return circle;
}
function getElement(tagName, attrs) {
	const ele = document.createElementNS(SVGNS, tagName);
	const allAttributes = { ...sharedAttributes, ...attrs };
	Object.keys(allAttributes).forEach((att) => {
		ele.setAttribute(att, allAttributes[att]);
	});
	return ele;
}
