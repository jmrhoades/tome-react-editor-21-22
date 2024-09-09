import { appendTomeToTomes } from "../tome/TomeContext";


import { makePage as clockIntro } from "./clock/intro";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;


	// New Tome : Clock WIP
	tome = appendTomeToTomes(tomes, "clock", "Clock WIP");
	clockIntro(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};
