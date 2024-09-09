import { uniqueId } from "lodash";
import { tileNames, textBlockType, tableTileType, alignmentX, alignmentY } from "../../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../../tome/TomeContext";
import { createTheme } from "../../tome/Themes";

export const makePage = tome => {
    const TD = tableTileType.TD;

	// Page
	let page = appendPageToTome(tome, createTheme({ mode: "light" }));

	// Row
	let row = appendRowToPageInTome(page, tome);
	let tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H0,
						content: "Humankind Soaps",
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
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap1.jpg",
				imageSize: "cover",
				caption: {
						background: page.theme.colors.media.caption.light.background,
						color: page.theme.colors.media.caption.light.text,
						content: "Olive oil based soaps",
						alignmentY: alignmentY.BOTTOM,
				},
			},
		},
		row,
		tome
	);
	tile = appendTileToRowInTome(
		{
			type: tileNames.VIDEO.name,
			params: {
				image: "/images/soap2.jpg",
				video: "/humankind/humankind-intro.mp4",
			},
		},
		row,
		tome
	);
	row.height = 11;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content:
							"Formulated with plant extracts and essential oils, our Moods are named for the benefits their ingredients provide and how they make you feel.",
					},
				],
			},
		},
		row,
		tome
	);
	//console.log(tile);
	row.height = tile.height12;

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
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Active",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"A fresh, green blend to give you an energy boost. Lemongrass refreshes and cleanses, Ginger awakens the senses and Rosemary sharpens the mind.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height6;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 4,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Awake",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"When you need a gentle pick me up, choose this stimulating, spicy blend of Bitter Orange, Grapefruit and Hemp Seed oils.",
					},
				],
			},
		},
		row,
		tome
	);

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
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Balance",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Balance owes its uplifting qualities to Rose Geranium, Linden Blossom and Frankincense, a floriental blend that restores harmony and aids relaxation.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height6;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 4,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Cosy",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"When you're in need of comfort, choose Cosy, our heart-warming mood with a nostalgic blend of Rose Absolute, Patchouli and Cinnamon.",
					},
				],
			},
		},
		row,
		tome
	);

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
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Indulge",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"This decadent, floral concoction of Ylang Ylang, Rose and Palmarosa essential oils encourages a blissed-out state.",
					},
				],
			},
		},
		row,
		tome
	);
	row.height = tile.height6;
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 4,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Relax",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"A herbaceous blend to help you slow down and unwind. Lavender helps restore harmony while Eucalyptus works to clarify the mind.",
					},
				],
			},
		},
		row,
		tome
	);

	
	

	

	return page;
};
