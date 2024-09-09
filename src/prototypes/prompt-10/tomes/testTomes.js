import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as newPage } from "./new/new";

import { makePage as page1 } from "./skateboard/page1";
import { makePage as page2 } from "./skateboard/page2";
import { makePage as page3 } from "./skateboard/page3";
import { makePage as page4 } from "./skateboard/page4";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = appendTomeToTomes(tomes, "new", "New Tome");
	newPage(tome);
	//aboutPage(tome);

		// New Tome
		tome = appendTomeToTomes(tomes, "skateboard", "Skateboard");
		page1(tome);
		page2(tome);
		page3(tome);
		page4(tome);
	

	// Return data
	// console.log(tomes);
	return tomes;
};
