import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme({ mode: "dark" }));



	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H2,
						blocks: [
							{
								id: uniqueId("block"),
								type: textBlockType.SPAN,
								content: "Choose and connect even more smart home accessories with ",
							},
							{
								id: uniqueId("block"),
								type: textBlockType.SPAN,
								content: "Matter",
								color: "#E66702"
							},
							{
								id: uniqueId("block"),
								type: textBlockType.SPAN,
								content: " compatibility.",
							}
						]
					},
					
				],
			},
		},
		row,
		tome,
		6
	);

	


	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block"),
						type: textBlockType.H3,
						content: "Reimagined Home app",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content: "The Home app is rebuilt from the ground up to be even more efficient and reliable. Navigate all your smart home accessories in the redesigned Home tab. New categories for climate, lights, security, and more let you access relevant accessories with just a tap. And a multicamera view puts your smart home cameras front and center.",
					},
				],
			},
		},
		row,
		tome,
		6
	);

	row.height = 9;

// Row
row = appendRowToPageInTome(page, tome);

tile = appendTileToRowInTome(
	{
		type: tileNames.IMAGE.name,
		params: {
			image: "/fitwell/apple-ios16-preview-phone-home.png",
			imageSize: "contain",
			//imagePosition: "center left",
		},
	},
	row,
	tome,
	6
);
	

tile = appendTileToRowInTome(
	{
		type: tileNames.IMAGE.name,
		params: {
			image: "/fitwell/matter__ovufn8u7x5ei_large_2x.png",
			imageSize: "contain",
			
		},
	},
	row,
	tome,
	6
);


	

	

	


	row.height = tile.height12;
	row.height = 12;
	return page;
};
