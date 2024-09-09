import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme());

	// Row
	row = appendRowToPageInTome(page, tome);
	
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 11,
			height12: 9,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H2,
						content: "Introducing Pixy, your friendly flying camera.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content: "It’s a pocket-sized, free-flying sidekick that’s a fit for adventures big and small.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Pixy is a companion to Snapchat. Videos from flights are wirelessly transferred and saved into Snapchat Memories. From there, use Snapchat’s editing tools, Lenses, and Sounds to customize what you capture.",
					},
				],
			},
		},
		row,
		tome,
		7
	);

	tile = appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {
				image: "/pixy/pixy3.jpg",
				video: "/pixy/Learn to Fly-qpz8Q2spioo.mp4",
			},
		},
		row,
		tome,
		5

	);
	
	row.height = 12;


	return page;
};
