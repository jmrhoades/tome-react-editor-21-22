import { appendTomeToTomes } from "../tome/TomeContext";

import { makePage as scIntro} from "./styles-catalog/page-intro";
import { makePage as scScale} from "./styles-catalog/page-scale";

import { makePage as scCode} from "./styles-catalog/page-code";
import { makePage as scMargins} from "./styles-catalog/page-margins";
import { makePage as scInlineStyles} from "./styles-catalog/page-inline-styles";
import { makePage as scLists} from "./styles-catalog/page-lists-left";
import { makePage as scListsCentered} from "./styles-catalog/page-lists-centered";
import { makePage as scListsRight} from "./styles-catalog/page-lists-right";
import { makePage as scPlaceholder} from "./styles-catalog/page-placeholder";
import { makePage as scBlockquoteLeft} from "./styles-catalog/page-blockquote-left";
import { makePage as scBlockquoteCentered} from "./styles-catalog/page-blockquote-center";
import { makePage as scBlockquoteRight} from "./styles-catalog/page-blockquote-right";

import { makePage as humankindIntro} from "./humankind/intro";
import { makePage as humankindSoaps} from "./humankind/soaps";
import { makePage as humankindShop} from "./humankind/shop";
import { makePage as humankindFAQ} from "./humankind/faq";
import { makePage as humankindTable} from "./humankind/table";
import { makePage as humankindTubTalk} from "./humankind/tubtalk";

import { makePage as placeholder1} from "./placeholder/page-01";

import { makePage as oxideIntro} from "./oxide/intro";
import { makePage as oxideFastStorage} from "./oxide/fast-storage.js";
import { makePage as oxideProducts} from "./oxide/products";

import { makePage as pixyIntro} from "./pixy/intro";
import { makePage as pixyFigma} from "./pixy/figma";

import { makePage as fitwellIntro} from "./fitwell/intro";
import { makePage as fitwellMission} from "./fitwell/mission";
import { makePage as fitwellProblem} from "./fitwell/problem";
import { makePage as fitwellResearch} from "./fitwell/research";
import { makePage as fitwellSolution} from "./fitwell/solution";
import { makePage as fitwellFundraising} from "./fitwell/fundraising";


export const makeTestTomes = () => {
	// Set up
	const tomes = [];
	
	// Styles Catalog
	let tome = appendTomeToTomes(tomes, "styles-catalog", "Style updates");
	scIntro(tome); 
	scScale(tome); 
	scMargins(tome);
	scLists(tome);
	scListsCentered(tome);
	scListsRight(tome);
	scInlineStyles(tome);
	scCode(tome);
	scBlockquoteLeft(tome);
	scBlockquoteCentered(tome);
	scBlockquoteRight(tome);
	scPlaceholder(tome);

	// New Tome : Humankind Demo
	tome = appendTomeToTomes(tomes, "humankind-demo", "Humankind Soaps");
	humankindIntro(tome);
	humankindSoaps(tome);
	humankindShop(tome);
	humankindFAQ(tome);
	humankindTable(tome);
	humankindTubTalk(tome);

	// New Tome : Placeholders & Alignment
	tome = appendTomeToTomes(tomes, "placeholder-demo", "Placeholder");
	placeholder1(tome);

	// New Tome : Oxide website
	tome = appendTomeToTomes(tomes, "oxide-demo", "Oxide");
	oxideIntro(tome);
	oxideFastStorage(tome);
	oxideProducts(tome);

	// New Tome : Pixy 
	tome = appendTomeToTomes(tomes, "pixy-demo", "Pixy");
	pixyIntro(tome);
	pixyFigma(tome);

	// New Tome : Fitwell 
	tome = appendTomeToTomes(tomes, "fitwell", "Fitwell");
	fitwellIntro(tome);
	fitwellMission(tome);
	fitwellProblem(tome);
	fitwellResearch(tome);
	fitwellSolution(tome);
	fitwellFundraising(tome);

    // Return data
	// console.log(tomes);
	return tomes;
}