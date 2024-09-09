import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as newTome } from "./new/new";
import { makePage as testType } from "./new/type";
import { makePage as aboutPage } from "./new/about";

import { makePage as xlIntro } from "./xl/intro";
import { makePage as xlVideo } from "./xl/video";
import { makePage as xlGraph } from "./xl/graph";
import { makePage as xlDevices } from "./xl/devices";
import { makePage as xlMagnetic } from "./xl/magnetic";
import { makePage as xlScrolling } from "./xl/scrolling";

export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;

	// New Tome
	tome = appendTomeToTomes(tomes, "new", "New Tome");
	newTome(tome);
	//aboutPage(tome);

	// New Tome
	tome = appendTomeToTomes(tomes, "sample-pages", "New Tome");
	xlIntro(tome);
	xlVideo(tome);
	//xlGraph(tome);
	xlDevices(tome);
	testType(tome);
	xlMagnetic(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};
