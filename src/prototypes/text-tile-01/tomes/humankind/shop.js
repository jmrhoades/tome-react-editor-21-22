import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {

	// Page
	let page = appendPageToTome(tome, createTheme({ mode: "light" }));

	// Row
	let row = appendRowToPageInTome(page, tome);
	let tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 4,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2"),
						type: textBlockType.H2,
						content: "Shop by Humankind",
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
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "Deodorant — $15",
					},
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						content:
							"The most advanced natural deodorant ever — in a revolutionary, refillable container that saves our planet from plastic waste.",
					},
					{
						id: uniqueId("block_caption"),
						type: textBlockType.CAPTION,
						blocks: [
							{
								id: uniqueId("block_ln"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Available scents: Lemongrass, Eucalyptus, Rosemary-Mint, Lavender-Citrus, Coconut",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap6.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 10;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 8,
			params: {
				alignmentY: alignmentY.MIDDLE,
				alignmentX: alignmentX.LEFT,
				blocks: [
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "Toothpaste — $15",
					},
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						content:
							"100% natural toothpaste in tablet form, designed with dentists to polish and strengthen your teeth. Crush one tablet between teeth, and start brushing for a healthier planet.",
					},
					{
						id: uniqueId("block_caption"),
						type: textBlockType.CAPTION,
						blocks: [
							{
								id: uniqueId("block_ln"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Available flavors: Cinnamon",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap7.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 10;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 8,
			params: {
				alignmentY: alignmentY.MIDDLE,
				alignmentX: alignmentX.LEFT,
				blocks: [
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "Mouthwash — $15",
					},
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						content:
							"Natural mouthwash reinvented in a portable tablet form. Swish and spit, all while saving our planet from single-use plastic. 60 tablets per refill.",
					},
					{
						id: uniqueId("block_caption"),
						type: textBlockType.CAPTION,
						blocks: [
							{
								id: uniqueId("block_ln"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: "Available scents: Peppermint, Mint-Lemon, Ginger, Assorted Mix, Variety Pack",
							},
						],
					},
				],
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap8.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 10;

	return page;
};
