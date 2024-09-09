import { tileNames, textBlockType, tableTileType } from "../page/TileConstants";
const TH = tableTileType.TH;
const TD = tableTileType.TD;

export const testTome = {
	pages: [
		{
			id: "page_colors_a",
			order: 1,
		},
		{
			id: "page_null_a",
			order: 2,
		},
		{
			id: "page_null_b",
			order: 3,
		},
		{
			id: "page_humankind_a",
			order: 4,
		},
	],
	rows: [
		{
			pageId: "page_colors_a",
			id: "row_colors_a",
			order: 1,
			height: 9,
			flexHeight: true,
		},
		{
			pageId: "page_colors_a",
			id: "row_colors_b",
			order: 2,
			height: 5,
			flexHeight: true,
		},
		{
			pageId: "page_colors_a",
			id: "row_colors_c",
			order: 3,
			height: 5,
			flexHeight: true,
		},
		{
			pageId: "page_null_a",
			id: "row_null_a",
			order: 1,
			height: 12,
			flexHeight: true,
		},
		{
			pageId: "page_null_b",
			id: "row_null_b",
			order: 1,
			height: 12,
			flexHeight: true,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_a",
			order: 1,
			height: 3,
			flexHeight: true,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_b",
			order: 2,
			height: 12,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_c",
			order: 3,
			height: 4,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_d",
			order: 4,
			height: 5,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_e",
			order: 5,
			height: 5,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_f",
			order: 6,
			height: 5,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_g",
			order: 7,
			height: 2,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_h",
			order: 8,
			height: 9,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_i",
			order: 9,
			height: 2,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_j",
			order: 10,
			height: 7,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_k",
			order: 11,
			height: 7,
		},
		{
			pageId: "page_humankind_a",
			id: "row_humankind_l",
			order: 12,
			height: 7,
		},
	],
	tiles: [
		{
			pageId: "page_colors_a",
			rowId: "row_colors_a",
			id: "tile_colors_a",
			order: 1,
			width: 6,
			type: tileNames.COLOR.name,
			params: {
				backgroundColor: "rgba(61, 44, 79, 1)",
				label: "A",
				labelColor: "rgba(193, 142, 242, 1)",
			},
		},
		{
			pageId: "page_colors_a",
			rowId: "row_colors_b",
			id: "tile_colors_b",
			order: 1,
			width: 12,
			type: tileNames.COLOR.name,
			params: {
				backgroundColor: "rgba(42, 54, 77, 1)",
				label: "C",
				labelColor: "rgba(177, 212, 255, 1)",
			},
		},
		{
			pageId: "page_colors_a",
			rowId: "row_colors_a",
			id: "tile_colors_c",
			order: 2,
			width: 6,
			type: tileNames.COLOR.name,
			params: {
				backgroundColor: "rgba(75, 75, 77, 1)",
				label: "B",
				labelColor: "rgba(192, 194, 198, 1)",
			},
		},
		{
			pageId: "page_colors_a",
			rowId: "row_colors_c",
			id: "tile_colors_d",
			order: 1,
			width: 12,
			type: tileNames.COLOR.name,
			params: {
				backgroundColor: "rgba(64, 44, 60, 1)",
				label: "D",
				labelColor: "rgba(239, 136, 215, 1)",
			},
		},
		{
			pageId: "page_null_a",
			rowId: "row_null_a",
			id: "tile_null_a",
			order: 1,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Paste matching tile type to null tile",
					},
					{
						type: textBlockType.P,
						content:
							"Pasting a tile from the clipboard that matches the tile type of the selected null tile will result in a replace operation instead of paste.",
					},
				],
			},
		},
		{
			pageId: "page_null_a",
			rowId: "row_null_a",
			id: "tile_null_c",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/device-laptop-purple-smoke.png",
				imageSize: "contain",
			},
		},
		{
			pageId: "page_null_b",
			rowId: "row_null_b",
			id: "tile_null_b",
			order: 1,
			width: 6,
			type: tileNames.TEXT.name,
			isNull: true,
			params: {},
		},
		{
			pageId: "page_null_b",
			rowId: "row_null_b",
			id: "tile_null_d",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			isNull: true,
			params: {},
		},

		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_a",
			id: "tile_humankind_a",
			order: 1,
			width: 12,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H1,
						content: "Humankind Soaps",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_b",
			id: "tile_humankind_b",
			order: 1,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap1.jpg",
				imageSize: "cover",
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_b",
			id: "tile_humankind_c",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap2.jpg",
				imageSize: "cover",
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_c",
			id: "tile_humankind_d",
			order: 1,
			width: 12,
			height6: 6,
			height12: 4,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H3,
						content:
							"Formulated with plant extracts and essential oils, our Moods are named for the benefits their ingredients provide and how they make you feel.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_d",
			id: "tile_humankind_e",
			order: 1,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Active",
					},
					{
						type: textBlockType.P,
						content:
							"A fresh, green blend to give you an energy boost. Lemongrass refreshes and cleanses, Ginger awakens the senses and Rosemary sharpens the mind.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_d",
			id: "tile_humankind_f",
			order: 2,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Awake",
					},
					{
						type: textBlockType.P,
						content:
							"When you need a gentle pick me up, choose this stimulating, spicy blend of Bitter Orange, Grapefruit and Hemp Seed oils.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_e",
			id: "tile_humankind_g",
			order: 1,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Balance",
					},
					{
						type: textBlockType.P,
						content:
							"Balance owes its uplifting qualities to Rose Geranium, Linden Blossom and Frankincense, a floriental blend that restores harmony and aids relaxation.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_e",
			id: "tile_humankind_h",
			order: 2,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Cosy",
					},
					{
						type: textBlockType.P,
						content:
							"When you're in need of comfort, choose Cosy, our heart-warming mood with a nostalgic blend of Rose Absolute, Patchouli and Cinnamon.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_f",
			id: "tile_humankind_i",
			order: 1,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Indulge",
					},
					{
						type: textBlockType.P,
						content:
							"This decadent, floral concoction of Ylang Ylang, Rose and Palmarosa essential oils encourages a blissed-out state.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_f",
			id: "tile_humankind_j",
			order: 2,
			width: 6,
			height6: 4,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Relax",
					},
					{
						type: textBlockType.P,
						content:
							"A herbaceous blend to help you slow down and unwind. Lavender helps restore harmony while Eucalyptus works to clarify the mind.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_g",
			id: "tile_humankind_k",
			order: 1,
			width: 12,
			height6: 2,
			height12: 2,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Data",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_h",
			id: "tile_humankind_l",
			order: 1,
			width: 12,
			height6: 9,
			height12: 9,
			type: tileNames.TABLE.name,
			params: {
				title: "Product popularity, by month",
				columns: [208, 127, 127, 127, 127, 127, 127, 127, 127, 127],
				header: ["", "April", "May", "June", "July", "August", "Septemeber", "October", "November", "December"],
				rows: [
					[
						{ type: TD, content: "💛 Active" },
						{ type: TD, content: "17" },
						{ type: TD, content: "26" },
						{ type: TD, content: "53" },
						{ type: TD, content: "34" },
						{ type: TD, content: "76" },
						{ type: TD, content: "90" },
						{ type: TD, content: "43" },
						{ type: TD, content: "23" },
						{ type: TD, content: "19" },
					],
					[
						{ type: TD, content: "💚 Awake" },
						{ type: TD, content: "55" },
						{ type: TD, content: "43" },
						{ type: TD, content: "70" },
						{ type: TD, content: "65" },
						{ type: TD, content: "43" },
						{ type: TD, content: "21" },
						{ type: TD, content: "33" },
						{ type: TD, content: "87" },
						{ type: TD, content: "22" },
					],
					[
						{ type: TD, content: "💙 Balance" },
						{ type: TD, content: "23" },
						{ type: TD, content: "12" },
						{ type: TD, content: "18" },
						{ type: TD, content: "19" },
						{ type: TD, content: "17" },
						{ type: TD, content: "11" },
						{ type: TD, content: "67" },
						{ type: TD, content: "64" },
						{ type: TD, content: "41" },
					],
					[
						{ type: TD, content: "🖤 Cozy" },
						{ type: TD, content: "17" },
						{ type: TD, content: "11" },
						{ type: TD, content: "0" },
						{ type: TD, content: "0" },
						{ type: TD, content: "1" },
						{ type: TD, content: "6" },
						{ type: TD, content: "12" },
						{ type: TD, content: "18" },
						{ type: TD, content: "23" },
					],
					[
						{ type: TD, content: "💜 Indulge" },
						{ type: TD, content: "6" },
						{ type: TD, content: "12" },
						{ type: TD, content: "92" },
						{ type: TD, content: "104" },
						{ type: TD, content: "153" },
						{ type: TD, content: "243" },
						{ type: TD, content: "74" },
						{ type: TD, content: "32" },
						{ type: TD, content: "5" },
					],
				],
				
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_i",
			id: "tile_humankind_m",
			order: 1,
			width: 12,
			height6: 2,
			height12: 2,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H2,
						content: "Popular Scents",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_j",
			id: "tile_humankind_n",
			order: 1,
			width: 6,
			height6: 5,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Grapefruit",
					},
					{
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_j",
			id: "tile_humankind_o",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap3.jpg",
				imageSize: "cover",
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_k",
			id: "tile_humankind_p",
			order: 1,
			width: 6,
			height6: 5,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Tea Tree",
					},
					{
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_k",
			id: "tile_humankind_q",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap4.jpg",
				imageSize: "cover",
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_l",
			id: "tile_humankind_r",
			order: 1,
			width: 6,
			height6: 5,
			height12: 3,
			type: tileNames.TEXT.name,
			params: {
				blocks: [
					{
						type: textBlockType.H4,
						content: "Peppermint",
					},
					{
						type: textBlockType.P,
						content:
							"We built Tome so you can drop artifacts and ideas onto the page without worrying about how it looks—and stay focused on landing your message.",
					},
				],
			},
		},
		{
			pageId: "page_humankind_a",
			rowId: "row_humankind_l",
			id: "tile_humankind_s",
			order: 2,
			width: 6,
			type: tileNames.IMAGE.name,
			params: {
				image: "/images/soap5.jpg",
				imageSize: "cover",
			},
		},
	],
};
