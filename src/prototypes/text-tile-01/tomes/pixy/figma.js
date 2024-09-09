import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	// Page
	let page = appendPageToTome(tome, createTheme());

	// Row
	let row = appendRowToPageInTome(page, tome);
	appendTileToRowInTome(
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
							"Pixy is a companion to Snapchat. Videos from flights are wirelessly transferred and saved into Snapchat Memories. From there, use Snapchat’s editing tools, Lenses, and Sounds to customize what you capture. ",
					},
				],
			},
		},
		row,
		tome
	);

	appendTileToRowInTome(
		{
			type: tileNames.FIGMA.name,
			params: {
				src: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2F1QSPGUdWKhpOv3SQsvpEeO%2FUntitled%3Fnode-id%3D2%253A259",
			},
		},
		row,
		tome
	);
	row.height = 12;


	return page;
};


