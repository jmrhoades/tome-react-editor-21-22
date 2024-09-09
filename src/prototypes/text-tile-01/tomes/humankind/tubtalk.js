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
			height6: 2,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Tub Talk",
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
			type: tileNames.TWITTER.name,
			height6: 8,
			height12: 6,
			params: {
				displayName: "Aesop",
				userName: "@aesopskincare",
				avatar: "/images/avatars/aesop.png",
				tweet: "Enhanced with ingredients rich in anti-oxidants, the Parsley Seed range is well suited to city living, where skin is particularly susceptible to free radical damage. ",
				time: "1:02 PM",
				date: "Apr 15, 2022",
				retweets: 5,
				likes: 51,
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TWITTER.name,
			height6: 8,
			height12: 6,
			params: {
				displayName: "Kristy Tillman",
				userName: "@KristyT",
				avatar: "/images/avatars/kristy_tillman.png",
				tweet: "Watching Willy Wonka for the 1000th and wondering how many people have ever seen all 4 of their grandparents in the same bed?",
				time: "1:02 PM",
				date: "Apr 15, 2022",
				retweets: 5,
				likes: 51,
			},
		},
		row,
		tome
	);
	row.height = tile.height6;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 2,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Product Review",
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
			type: tileNames.FIGMA.name,
			height6: 8,
			height12: 6,
			params: {},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.CODE.name,
			height6: 8,
			height12: 6,
			params: {},
		},
		row,
		tome
	);
	row.height = tile.height6;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "New website",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_m_"),
								type: textBlockType.MENTION,
								content: "Jesse Chase",
							},
							{
								id: uniqueId("block_span_"),
								type: textBlockType.SPAN,
								content: " to add Figma prototypes",
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
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Soapy code",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height6;
    return page;
};