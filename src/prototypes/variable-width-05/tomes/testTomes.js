import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as newTome } from "./new/new";

import { makePage as xlIntro } from "./xl/intro";
import { makePage as xlGraph } from "./xl/graph";
import { makePage as xlDevices } from "./xl/devices";
import { makePage as xlScrolling } from "./xl/scrolling";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = appendTomeToTomes(tomes, "new", "Multi Columns");
	newTome(tome);

	// New Tome
	tome = appendTomeToTomes(tomes, "xl", "Tome XL — Edit Layout");
	xlIntro(tome);
	xlGraph(tome);
	xlDevices(tome);
	xlScrolling(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};
