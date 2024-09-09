import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as lightcastIntro } from "./overline-lightcast/intro";

import { makePage as pixyIntro } from "./pixy/intro";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome : Oxide website
	tome = appendTomeToTomes(tomes, "overline-lightcast", "Overline: Lightcast");
	lightcastIntro(tome);

	// New Tome : Pixy
	tome = appendTomeToTomes(tomes, "pixy", "Pixy");
	pixyIntro(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};
