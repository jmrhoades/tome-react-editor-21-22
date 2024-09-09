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
						content: "Code",
						color: "#FDFA57",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content:
							"Code snippets are inline styles that can be applied inside any block style. Code snippets have opaque backgrounds that respond to the page theme. They have a border radius that's proportional to the size of its font and a left and right padding equal to the border radius. Code blocks could also be added and accessed through a markdown shortcut.",
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
			height12: 12,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "Code snippet",
							},
						],
					},
					{
						id: uniqueId("block_h1_"),
						type: textBlockType.H1,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "Code snippet",
							},
						],
					},
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "Code snippet",
							},
						],
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "Code snippet",
							},
						],
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "Code snippet",
							},
						],
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.CAPTION,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "Code snippet",
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
			height12: 20,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Expressions as statements",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: "Here is an expression: ",
							},
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "1 + 2 + 3",
							},
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: ".",
							},
						],
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content:
									"What happens if we create a JS file that includes only this expression? Let's imagine we save the following content as ",
							},
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "test.js",
							},
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: ":",
							},
						],
					},
					{
						id: uniqueId("block_pre_"),
						type: textBlockType.PRE,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "1 ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "+ ",
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "2 ",
								color: "#FDFA57",
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "+ ",
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "3",
								color: "#FDFA57",
							},
						],
					},

					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: "How many statements does this file have? Zero or one?",
							},
						],
					},

					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content:
									"Here's the deal: expressions can't exist on their own. They're always part of a statement. And so in this case, we have a statement that looks like this:",
							},
						],
					},
					{
						id: uniqueId("block_pre_"),
						type: textBlockType.PRE,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "/* expression slot */",
							},
						],
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: "The statement is essentially empty aside from its expression slot. Our expression ",
							},
							{
								id: uniqueId("block_code_"),
								type: textBlockType.CODE,
								content: "1 + 2 + 3",
							},
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: " fills this slot, and our statement is complete.",
							},
						],
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_code_"),
								type: textBlockType.SPAN,
								content: "In other words, all of the following lines are valid statements:",
							},
						],
					},
					{
						id: uniqueId("block_pre_"),
						type: textBlockType.PRE,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "// Statement 1:",
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "let hi = /* expression slot */;",
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "// Statement 2:",
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "return /* expression slot */;",
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
								
								
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
								
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "// Statement 3:",
							},
							{
								id: uniqueId("block_br"),
								type: textBlockType.LINEBREAK,
								
							},
							{
								id: uniqueId("block_spane_"),
								type: textBlockType.SPAN,
								content: "if (/* expression slot */) { }",
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

	return page;
};


