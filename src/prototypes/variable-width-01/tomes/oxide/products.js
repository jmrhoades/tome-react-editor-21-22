import { uniqueId } from "lodash";
import { tileNames, textBlockType, tableTileType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	// Page
	let page = appendPageToTome(tome, createTheme({ mode: "oxide" }));

	// Row
	let row = appendRowToPageInTome(page, tome);
	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 4,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H1,
						content: "Product",
					},
				],
			},
		},
		row,
		tome
	);
    row.height = 4;

	// Row
	row = appendRowToPageInTome(page, tome);

	appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Sign up to get in line",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Fill out the form to let us know you would like to reserve a rack.",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Order your rack",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Late 2022, we will be ready to start shipping racks.",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Get your rack delivered",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content:
							"Oxide team members will deliver your rack to your datacenter and connect it to power and network.",
					},
				],
			},
		},
		row,
		tome
	);
	

    appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {
				video: "/oxide/rotating-rack-animation.mp4",
                autoPlay: true,
			},
		},
		row,
		tome
	);

    row.height = 12;
	row.autoHeight = false;

	return page;
};
