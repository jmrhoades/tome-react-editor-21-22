import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as newTome } from "./new/new";


export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = appendTomeToTomes(tomes, "new", "New Tome");
	newTome(tome);
	//aboutPage(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};
