import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	// Page
	let page = appendPageToTome(tome, createTheme());

	// Row
	let row = appendRowToPageInTome(page, tome);
	let tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						content: "Scale",
						color: "#FDFA57",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Each style’s font size is found by progressively applying a 1.46 ratio (perfect-fifthish) to a base size of 22pts. The inverse ratio is used to find sizes smaller than the base size. A display size has been added for layouts that require emphasis and a caption size has been added to provide more flexibility when creating layouts with media.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height12;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 19,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						content: "Designed to bring joy to the everyday.",
					},
					{
						id: uniqueId("block_h1_"),
						type: textBlockType.H1,
						content: "Designed with instinct, to bring joy to the everyday.",
					},
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Designed with instinct, to bring joy back to the everyday through the Glyph Interface.",
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content:
							"Designed with instinct, to bring joy back to the everyday. Through the Glyph Interface, a perfected OS and camera.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Designed with instinct, to bring joy back to the everyday. Through the Glyph Interface, a perfected OS and exceptional dual camera. All startlingly fast.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.CAPTION,
						content:
							"Designed with instinct, to bring joy back to the everyday. Through the Glyph Interface, a perfected OS and exceptional dual camera. All startlingly fast. Once, tech was thrilling. Every new product surprised us. And delighted us. Where did that go?",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height12;

	return page;
};
