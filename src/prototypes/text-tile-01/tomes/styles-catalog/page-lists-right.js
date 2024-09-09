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
								content: "Right ",
							},
							{
								id: uniqueId("block_"),
								type: textBlockType.SPAN,
								content: "Lists ",
								color: "#FDFA57",
							},
						],
					},
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.P,
						content:
							"Block-styling and alignment options are new to lists. List marker width is roughly equal to the width of a single-digit tabular-lining numeral plus a period. Number markers are right aligned and bullet markers are center aligned. Center and right-aligned list markers become inlined with the content to maintain readability. Centered lists lose indentation hierarchy.",
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
			height6: 10,
			height12: 7,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Number list",
					},
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Apples",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Oranges",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Grapes",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Lemons",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Kiwis",
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
			height6: 10,
			height12: 7,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Bullet list",
					},
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Apples",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Oranges",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Grapes",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Lemons",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Kiwis",
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
			height6: 6,
			height12: 5,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Nested number",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								blocks: [
									{
										id: uniqueId("block_span_"),
										type: textBlockType.SPAN,
										content: "Number list level 1",
									},
									{
										id: uniqueId("block_ul_"),
										type: textBlockType.OL,
										blockStyle: textBlockType.P,
										blocks: [
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												blocks: [
													{
														id: uniqueId("block_span_"),
														type: textBlockType.SPAN,
														content: "Number list level 2",
													},
													{
														id: uniqueId("block_ul_"),
														type: textBlockType.OL,
														blockStyle: textBlockType.P,
														blocks: [
															{
																id: uniqueId("inline_li_"),
																type: textBlockType.LI,
																blocks: [
																	{
																		id: uniqueId("block_span_"),
																		type: textBlockType.SPAN,
																		content: "Number list level 3",
																	},
																],
															},
														],
													},
												],
											},
										],
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
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 6,
			height12: 5,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "Nested bullet",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								blocks: [
									{
										id: uniqueId("block_span_"),
										type: textBlockType.SPAN,
										content: "Bullet list level 1",
									},
									{
										id: uniqueId("block_ul_"),
										type: textBlockType.UL,
										blockStyle: textBlockType.P,
										blocks: [
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												blocks: [
													{
														id: uniqueId("block_span_"),
														type: textBlockType.SPAN,
														content: "Bullet list level 2",
													},
													{
														id: uniqueId("block_ul_"),
														type: textBlockType.UL,
														blockStyle: textBlockType.P,
														blocks: [
															{
																id: uniqueId("inline_li_"),
																type: textBlockType.LI,
																blocks: [
																	{
																		id: uniqueId("block_span_"),
																		type: textBlockType.SPAN,
																		content: "Bullet list level 3",
																	},
																],
															},
														],
													},
												],
											},
										],
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
			height6: 10,
			height12: 7,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Your Getting Started list:",
					},
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Add a text tile to the right of this one",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Add an image tile and then upload an image",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Drag the image to the right of this text box and release",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Add a narration by clicking the Record narration button in the menu to the right",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Share what you’ve created with your team via the Share button top right",
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
			height6: 10,
			height12: 7,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "Production Smoke Tests:",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content:
									"The workflows on the next page must be exercised before promoting a release from staging to production",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content:
									"On-duty engineer should ask on-duty designer to run through the workflows and the designer must give the 👍 for prod deployment to proceed",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content:
									"The goal is to ensure that the behavior observed on staging is not worse than what’s in production, i.e. only catch regressions",
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

	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 9,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_"),
						type: textBlockType.H4,
						content: "At a glance",
					},
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "When to go: August and September",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Elevation: 14,505 ft",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Length: ~20 miles roundtrip",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								blocks: [
									{
										id: uniqueId("block_span_"),
										type: textBlockType.SPAN,
										content: "Time:",
									},
									{
										id: uniqueId("block_ul_"),
										type: textBlockType.UL,
										blockStyle: textBlockType.P,
										blocks: [
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												content: "12- 16 hours (day trip)",
											},
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												content: "2 days (backpacking)",
											},
										],
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
			height6: 10,
			height12: 10,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.H0,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Introducing",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Display",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Lists",
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
			height6: 10,
			height12: 10,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.H0,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Introducing",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Display",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Lists",
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

	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 18,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.H1,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "When to go: August and September",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Elevation: 14,505 ft",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Length: ~20 miles roundtrip",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								blocks: [
									{
										id: uniqueId("block_span_"),
										type: textBlockType.SPAN,
										content: "Time:",
									},
									{
										id: uniqueId("block_ul_"),
										type: textBlockType.OL,
										blockStyle: textBlockType.H1,
										blocks: [
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												content: "12- 16 hours (day trip)",
											},
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												content: "2 days (backpacking)",
											},
										],
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
			height6: 32,
			height12: 16,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.H2,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content:
									"The workflows on the next page must be exercised before promoting a release from staging to production",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content:
									"On-duty engineer should ask on-duty designer to run through the workflows and the designer must give the 👍 for prod deployment to proceed",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content:
									"The goal is to ensure that the behavior observed on staging is not worse than what’s in production, i.e. only catch regressions",
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

	row = appendRowToPageInTome(page, tome);
	tile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			height6: 12,
			height12: 18,
			params: {
				alignmentX: alignmentX.RIGHT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_ul_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.H3,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "When to go: August and September",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Elevation: 14,505 ft",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Length: ~20 miles roundtrip",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								blocks: [
									{
										id: uniqueId("block_span_"),
										type: textBlockType.SPAN,
										content: "Time:",
									},
									{
										id: uniqueId("block_ul_"),
										type: textBlockType.UL,
										blockStyle: textBlockType.H3,
										blocks: [
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												blocks: [
													{
														id: uniqueId("block_span_"),
														type: textBlockType.SPAN,
														content: "12- 16 hours (day trip)",
													},
													{
														id: uniqueId("block_ul_"),
														type: textBlockType.UL,
														blockStyle: textBlockType.H3,
														blocks: [
															{
																id: uniqueId("inline_li_"),
																type: textBlockType.LI,
																content: "4 hours walking",
															},
															{
																id: uniqueId("inline_li_"),
																type: textBlockType.LI,
																content: "30 minute rest",
															},
															{
																id: uniqueId("inline_li_"),
																type: textBlockType.LI,
																content: "4 hours walking",
															},
															{
																id: uniqueId("inline_li_"),
																type: textBlockType.LI,
																content: "45 minute rest",
															},
														],
													},
												],
											},
											{
												id: uniqueId("inline_li_"),
												type: textBlockType.LI,
												content: "2 days (backpacking)",
											},
										],
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

	return page;
};
