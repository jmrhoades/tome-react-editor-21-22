import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as oxideIntro} from "./oxide/intro";
import { makePage as oxideFastStorage} from "./oxide/fast-storage.js";
import { makePage as oxideProducts} from "./oxide/products";

import { makePage as fitwellIntro} from "./fitwell/intro";
import { makePage as fitwellMission} from "./fitwell/mission";
import { makePage as fitwellProblem} from "./fitwell/problem";
import { makePage as fitwellSolution} from "./fitwell/solution";
import { makePage as fitwellFundraising} from "./fitwell/fundraising";
import { makePage as fitwellMobile} from "./fitwell/mobile";
import { makePage as fitwellGraph} from "./fitwell/graph";
import { makePage as fitwellDiagram} from "./fitwell/diagram";

import { makePage as examplesIntro} from "./examples/intro";
import { makePage as examplesGraph} from "./examples/graph";
import { makePage as examplesHORTC} from "./examples/hortc";
import { makePage as examplesNulls} from "./examples/nulls";
import { makePage as examplesCaptions} from "./examples/captions";
import { makePage as examplesEmbeds} from "./examples/embeds";
import { makePage as examplesClips} from "./examples/clips";


export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	let tome = null;
	
	// New Tome : Oxide website
	tome = appendTomeToTomes(tomes, "oxide", "Oxide");
	oxideIntro(tome);
	oxideFastStorage(tome);
	oxideProducts(tome);

	// New Tome : Fitwell 
	tome = appendTomeToTomes(tomes, "fitwell", "Fitwell");
	fitwellIntro(tome);
	fitwellMission(tome);
	fitwellProblem(tome);
	//fitwellResearch(tome);
	fitwellSolution(tome);
	fitwellFundraising(tome);
	fitwellMobile(tome);
	fitwellGraph(tome);
	fitwellDiagram(tome);
	
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
}