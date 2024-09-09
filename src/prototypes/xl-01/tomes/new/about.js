import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { Themes } from "../../tome/Themes";

export const makePage = tome => {
	let page = null;
	let row = null;
	let tile = null;

	// Page
	page = appendPageToTome(tome, Themes[0]);

	// Row
	row = appendRowToPageInTome(page, tome);

	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.CENTER,
				alignmentY: alignmentY.MIDDLE,
				blocks: [
					{
						id: uniqueId("block_h_"),
						type: textBlockType.H1,
						content: "About",
					},
				],
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
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.H3,
						content:
							"Xiao Wang (b. 1990), is a Chinese born, New York based figurative painter primarily working with oil paint. Wang creates constructed scenes that are often inspired by and sourced from real life settings, the paintings combine dramatic, moody color palettes with a realist approach. Wang's work captures feelings of uncertainty and anxiety using uneasy figures, distorted colors, and uncanny landscape elements, they draw attention to the mental burdens brought on by many of the issues of the contemporary. Many of his pieces are voiced from his perspective as a Chinese immigrant who is navigating through the experience of being trapped between two worlds.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 7;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.H3,
						content:
							"The visual style of Wang's work recalls Romanticism, the Symbolist Movement, Expressionism, and Magical Realism. Through examining visual arts that reflect rapid social and cultural historical change, he explores the personal and the collective psyche in the current moment of chaos.",
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
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.H3,
						content:
							"Xiao Wang studied at the Glasgow School of Art in Scotland where he received his BFA degree in Painting and Printmaking. He continued his study at San Francisco Art Institute and earned his MFA degree in Painting.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 3;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.H3,
						content:
							"Wang has shown internationally in Europe and The United States. His work has been featured in publications such as Booooooom, Hyperallergic, Juxtapoz Magazine, Hi-Fructose Magazine, Create Magazine, and New American Paintings. Wang has also attended artist residency programs at MASS MoCA (MA), the Vermont Studio Center (VT), and Root Division (CA).",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = 8;

	return page;
};
