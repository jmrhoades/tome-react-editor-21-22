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
			height6: 12,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h1_"),
						type: textBlockType.H1,
						content: "High-performing personal care products that are kinder to your body and our planet.",
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
			height6: 3,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "How it works",
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
			height6: 5,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_caption"),
						type: textBlockType.CAPTION,
						content: "Step one",
					},
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "Today",
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
			height6: 8,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content:
							"We send you a refillable container and your first refill. Containers are free when you subscribe.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Each container is designed to be durable and easy to travel with, reducing single-use plastic with each refill.",
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
			height6: 5,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_caption_"),
						type: textBlockType.CAPTION,
						content: "Step two",
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Ongoing",
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
			height6: 8,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content:
							"We send you convenient refills on your schedule. Subscribe & save 15% or reorder as needed.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Subscription refills arrive in 2-Packs with 10% off. You can customize your refill frequency anytime through your account.",
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
			height6: 5,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_caption_"),
						type: textBlockType.CAPTION,
						content: "Step three",
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Over time",
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
			height6: 8,
			height12: 6,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Reduce your plastic footprint, saving our planet from single-use waste.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content: "We ship using 100% Earth-friendly packaging, and are a proudly carbon-neutral company.",
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
				image: "/images/soap9.jpg",
				imageSize: "cover",
			},
		},
		row,
		tome
	);
	row.height = 6;

	// Row
	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 25,
			height12: 13,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "How can I use less plastic?",
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content:
							"Our products help our planet without having to sacrifice quality or convenience. Our approach to personal care benefits your body, our planet, and future generations.",
					},
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						blocks: [
							{
								id: uniqueId("block_ln"),
								type: textBlockType.LINEBREAK,
							},
							{
								id: uniqueId("block_span_"),
								type: textBlockType.SPAN,
								content:
									"I used the Citrus Lavender shampoo, Grapefruit conditioner, Rosemary Mint deodorant, and Ginger mouthwash for about three weeks before writing this review. I’m glad I stuck with the products because my body took some time to adjust to the natural-based ingredients.",
							},
						],
					},
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						content:
							"The shampoo lathers really well, which has been an issue with other shampoo bars I’ve tried in the past. The scent is fruity and refreshing, and it certainly leaves my hair feeling clean. Although, immediately after rinsing, my hair almost feels squeaky clean and a bit tangled. As someone who has a lot of waves (and frizz!), I absolutely need a conditioner to follow this shampoo bar. That said, I plan to use the bar until it's gone because the scent is so fresh and it feels good to really lather up my hair, especially after humid summer days.",
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
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "What if I need to replace my container?",
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
			height6: 6,
			height12: 3,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"I used the Citrus Lavender shampoo, Grapefruit conditioner, Rosemary Mint deodorant, and Ginger mouthwash for about three weeks before writing this review. I’m glad I stuck with the products because my body took some time to adjust to the natural-based ingredients.",
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
			height6: 4,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "How well did the products actually work?",
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
			height6: 8,
			height12: 4,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"If you did a waste audit, I imagine you’d find that a large percentage of your waste is from single-use plastics, like straws, yogurt cups, shampoo and conditioner bottles, mascara tubes, cleaning product bottles and sprays, and more. And less than 10 percent of plastic waste gets recycled. So yes, it matters how much you consume! But it’s hard to find everyday household ",
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
			height6: 4,
			height12: 2,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h3"),
						type: textBlockType.H3,
						content: "How did the products arrive?",
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
			height6: 9,
			height12: 5,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						content:
							"I was so impressed with the shipping materials by Humankind used. The outer package was a “recycled paper parcel” that felt like cardstock paper, and it has since fully broken down in my backyard compost bin! Inside, each item I ordered was individually boxed in simple tan and white boxes (which I think were undyed). There were no unnecessary packing peanuts or tissue papers, and the size of the package matched the amount within.",
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