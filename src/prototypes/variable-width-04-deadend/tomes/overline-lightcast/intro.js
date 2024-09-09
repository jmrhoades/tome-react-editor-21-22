import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, createTheme({ mode: "light" }));

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H1,
						content: "Visual Language",
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
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content:
							"The visual identity is built on a black and white foundation, with bursts of vibrant color that provide the grateful energy that Lightcast brings to their work. To craft this color system, we provided a way to blend colors into what is known as the “Glow.”",
					},
				],
			},
		},
		row,
		tome,
		5
	);
	row.height = 12;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {
				video: "/lightcast/Lightcast Glow-719233983.mp4",
				autoPlay: true,
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
			type: tileNames.VIDEO.name,
			params: {
				video: "/lightcast/lc-guidelines-718776260.mp4",
				autoPlay: true,
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/lightcast/illustration-3.jpg",
				caption: {
					content:
						"The Glow is then applied to patterns and backgrounds to provide a consistent visual language throughout the identity.",
					background: page.theme.colors.media.caption.light.background,
					text: page.theme.colors.media.caption.light.text,
				},
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
			height6: 5,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H3,
						content:
							"Strategy",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Lightcast has been hard at work for over two decades capturing and clarifying data that helps communities prosper. Their mission is to drive economic prosperity and mobility by providing the insights needed to build and develop people, institutions, companies, and communities.",
					},
				],
			},
		},
		row,
		tome,
		8
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
						id: uniqueId("block_"),
						type: textBlockType.H3,
						content:
							"Identity",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "The identity for Lightcast tells a story of partnership and growth. The logomark, coined the “Tessell” after tessellation, reveals two repeating polygons. The two together indicate the partnership Lightcast brings to their customers, and the second shape being taller indicates the idea of upward momentum.",
					},
				],
			},
		},
		row,
		tome,
		4
	);
	row.height = 10;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 5,
			height12: 8,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H2,
						content:
							"The thought and care that you put into creating the Lightcast identity is truly next level and we couldn’t be happier.",
					},
					{
						id: uniqueId("block_"),
						type: textBlockType.P,
						content: "Dave Reinke, VP of Marketing",
					},
				],
			},
		},
		row,
		tome,
		4
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.IMAGE.name,
			params: {
				image: "/lightcast/illustration-2.jpg",
			},
		},
		row,
		tome,
		8
	);

	row.height = 20;

	return page;
};
