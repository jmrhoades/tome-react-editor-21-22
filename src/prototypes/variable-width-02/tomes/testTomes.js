import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as lightcastIntro } from "./overline-lightcast/intro";

import { makePage as pixyIntro } from "./pixy/intro";

import { makePage as examplesIntro } from "./examples/intro";
import { makePage as examplesGraph } from "./examples/graph";
import { makePage as examplesHORTC } from "./examples/hortc";
import { makePage as examplesNulls } from "./examples/nulls";
import { makePage as examplesCaptions } from "./examples/captions";
import { makePage as examplesEmbeds } from "./examples/embeds";
import { makePage as examplesClips } from "./examples/clips";

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

	// New Tome : Examples
	tome = appendTomeToTomes(tomes, "examples", "Variable Width Examples");
	examplesIntro(tome);
	examplesGraph(tome);
	examplesNulls(tome);
	examplesCaptions(tome);
	examplesHORTC(tome);
	//examplesEmbeds(tome);
	examplesClips(tome);

	// Return data
	// console.log(tomes);
	return tomes;
};
