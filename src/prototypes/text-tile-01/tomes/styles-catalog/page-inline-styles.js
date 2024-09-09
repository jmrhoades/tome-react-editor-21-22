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
				backgroundColor: "rgba(255,255,255,0.0)",
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						content: "Inline styles",
						color: "#FDFA57",
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_span_"),
								type: textBlockType.SPAN,
								content:
									"This page demonstrates consistent line-heights in mixed-style blocks. Applying bold, italic, underline or code styles to text should not affect the vertical rhythm of the block in any way. Using the variable version of Diatype normalizes the metrics of available styles within the 400-700 weight range. Diatype Mono is shrunk 95% to maintain the block’s line height.",
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
			height6: 4,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.CAPTION,
						content:
							"Last summer, as Peter Kriss and Nate Pinsley moved into their new two-bedroom beach house on Pine Walk in Fire Island, they took stock of the keepsakes and tchotchkes the previous owners had left behind — a pair of old sewing machines, a box of Halloween decorations, racks of colorful costumes.",
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
			height6: 4,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_caption_"),
						type: textBlockType.CAPTION,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								content: "Last ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								color: "rgba(124, 240, 205, 1)",
								content: "summer",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", as  ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD,
								content: "Peter Kriss",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.MENTION,
								content: "Nate Pinsley",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " moved into their ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.UNDERLINED,
								content: "new two-bedroom beach house",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " on ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(147, 124, 240, 1)",
								content: "Pine Walk",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " in ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.STRIKETHROUGH,
								content: "Fire Island",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", they took stock of the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "keepsakes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "tchotchkes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC,
								content: " previous owners",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " had left behind — ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC_UNDERLINED,
								content: "a pair of old sewing machines,",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " a box of ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "Halloween",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " decorations,  ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								color: "rgba(240, 179, 124, 1)",
								content: "racks",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " of ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(217, 240, 124, 1)",
								content: "colorful",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "costumes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ".",
							},
						],
					},
				],
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
			height6: 7,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Last summer, as Peter Kriss and Nate Pinsley moved into their new two-bedroom beach house on Pine Walk in Fire Island, they took stock of the keepsakes and tchotchkes the previous owners had left behind — a pair of old sewing machines, a box of Halloween decorations, racks of colorful costumes.",
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
			height6: 7,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								content: "Last ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								color: "rgba(124, 240, 205, 1)",
								content: "summer",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", as  ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD,
								content: "Peter Kriss",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.MENTION,
								content: "Nate Pinsley",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " moved into their ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.UNDERLINED,
								content: "new two-bedroom beach house",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " on ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(147, 124, 240, 1)",
								content: "Pine Walk",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " in ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.STRIKETHROUGH,
								content: "Fire Island",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", they took stock of the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "keepsakes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "tchotchkes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC,
								content: " previous owners",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " had left behind — ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC_UNDERLINED,
								content: "a pair of old sewing machines,",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " a box of ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "Halloween",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " decorations,  ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								color: "rgba(240, 179, 124, 1)",
								content: "racks",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " of ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(217, 240, 124, 1)",
								content: "colorful",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "costumes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ".",
							},
						],
					},
				],
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
			height6: 7,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content:
							"Last summer, as Peter Kriss and Nate Pinsley moved into their new two-bedroom beach house on Pine Walk in Fire Island, they took stock of the keepsakes and tchotchkes the previous owners had left behind — a pair of old sewing machines, a box of Halloween decorations, racks of colorful costumes.",
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
			height6: 7,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								content: "Last ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								color: "rgba(124, 240, 205, 1)",
								content: "summer",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", as  ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD,
								content: "Peter Kriss",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.MENTION,
								content: "Nate Pinsley",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " moved into their ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.UNDERLINED,
								content: "new two-bedroom beach house",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " on ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(147, 124, 240, 1)",
								content: "Pine Walk",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " in ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.STRIKETHROUGH,
								content: "Fire Island",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", they took stock of the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "keepsakes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "tchotchkes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC,
								content: " previous owners",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " had left behind — ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC_UNDERLINED,
								content: "a pair of old sewing machines,",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " a box of ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "Halloween",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " decorations,  ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								color: "rgba(240, 179, 124, 1)",
								content: "racks",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " of ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(217, 240, 124, 1)",
								content: "colorful",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "costumes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ".",
							},
						],
					},
				],
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
			height6: 12,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content:
							"Last summer, as Peter Kriss and Nate Pinsley moved into their new two-bedroom beach house on Pine Walk in Fire Island, they took stock of the keepsakes and tchotchkes the previous owners had left behind — a pair of old sewing machines, a box of Halloween decorations, racks of colorful costumes.",
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
			height6: 12,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								content: "Last ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								color: "rgba(124, 240, 205, 1)",
								content: "summer",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", as  ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD,
								content: "Peter Kriss",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.MENTION,
								content: "Nate Pinsley",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " moved into their ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.UNDERLINED,
								content: "new two-bedroom beach house",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " on ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(147, 124, 240, 1)",
								content: "Pine Walk",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " in ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.STRIKETHROUGH,
								content: "Fire Island",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", they took stock of the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "keepsakes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "tchotchkes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC,
								content: " previous owners",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " had left behind — ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC_UNDERLINED,
								content: "a pair of old sewing machines,",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " a box of ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "Halloween",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " decorations,  ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								color: "rgba(240, 179, 124, 1)",
								content: "racks",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " of ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(217, 240, 124, 1)",
								content: "colorful",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "costumes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ".",
							},
						],
					},
				],
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
			height6: 22,
			height12: 18,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content:
							"Last summer, as Peter Kriss and Nate Pinsley moved into their new two-bedroom beach house on Pine Walk in Fire Island, they took stock of the keepsakes and tchotchkes the previous owners had left behind — a pair of old sewing machines, a box of Halloween decorations, racks of colorful costumes.",
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
			height6: 22,
			height12: 18,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						blocks: [
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								content: "Last ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.ITALIC,
								color: "rgba(124, 240, 205, 1)",
								content: "summer",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", as  ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD,
								content: "Peter Kriss",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.MENTION,
								content: "Nate Pinsley",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " moved into their ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.UNDERLINED,
								content: "new two-bedroom beach house",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " on ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(147, 124, 240, 1)",
								content: "Pine Walk",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " in ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.STRIKETHROUGH,
								content: "Fire Island",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ", they took stock of the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "keepsakes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " and ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.LINK,
								href: "https://google.com",
								content: "tchotchkes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " the ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC,
								content: " previous owners",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " had left behind — ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.BOLD_ITALIC_UNDERLINED,
								content: "a pair of old sewing machines,",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " a box of ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "Halloween",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " decorations,  ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								color: "rgba(240, 179, 124, 1)",
								content: "racks",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " of ",
							},

							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								color: "rgba(217, 240, 124, 1)",
								content: "colorful",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: " ",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.CODE,
								content: "costumes",
							},
							{
								id: uniqueId("block_span"),
								type: textBlockType.SPAN,
								content: ".",
							},
						],
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
