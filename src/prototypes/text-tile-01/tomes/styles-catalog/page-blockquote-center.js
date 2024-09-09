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
				backgroundColor: "rgba(255,255,255,0.00)",
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						blocks: [
							{
								id: uniqueId("block_"),
								type: textBlockType.SPAN,
								content: "Center ",
								
							},
							{
								id: uniqueId("block_"),
								type: textBlockType.SPAN,
								content: "Blockquotes ",
								color: "#FDFA57",
							},
						],
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content:
							"Blockquote styling and alignment options are all new. The quote marker (the vertical bar) is 6pts wide and has a background theme color of T4. Left and center aligned blockquote markers are flush left. Right-aligned blockquotes have quote markers on the right.",
						
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
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H1,
						content: "Perfection is attained not when there is no longer anything to add, but when there is no longer anything to take away.",
					},
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.P,
						content: "Antoine de Saint-Exupéry",
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
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H1,
						content: "You can’t use up creativity. The more you use, the more you have.",
					},
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.P,
						content: "Maya Angelou",
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
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H2,
						content: "The only secret of magic is that I’m willing to work harder on it than you think it’s worth.",
					},
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.P,
						content: "Penn Jillette",
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
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("blockquote_h0_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H0,
						content: "Designed",
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
			height12: 7,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h1_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H1,
						content: "Designed with instinct, to bring joy to the everyday.",
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
			height12: 6,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H2,
						content: "Designed with instinct, to bring joy back to the everyday through the Interface.",
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
			height12: 5,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.H3,
						content:
							"Designed with instinct, to bring joy back to the everyday. Through the Glyph Interface, a perfected OS and camera.",
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
			height12: 6,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_ul_"),
								type: textBlockType.UL,
								blockStyle: textBlockType.P,
								blocks: [
									{
										id: uniqueId("inline_li_"),
										type: textBlockType.LI,
										content: "We know how to assess a patient's ability to pay",
									},
									{
										id: uniqueId("inline_li_"),
										type: textBlockType.LI,
										content: "Most patients will get approved",
									},
									{
										id: uniqueId("inline_li_"),
										type: textBlockType.LI,
										content: "Customize your own finance program (no one-size-fits-all approach with us)",
									},
									{
										id: uniqueId("inline_li_"),
										type: textBlockType.LI,
										content: "Stay connected to your business with on-demand, real-time reports",
									},
								],
							},
						],
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
			height12: 3,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.BLOCKQUOTE,
						blockStyle: textBlockType.CAPTION,
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
