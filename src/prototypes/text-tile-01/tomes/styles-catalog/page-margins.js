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
						content: "Margins",
						color: "#FDFA57",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"This page demos bottom margins in long-form, mixed-content tiles. Margins are used for consistent vertical spacing when moving from headings to paragraphs. Special rules have been added to create visual breaks when moving from paragraphs back to headings. Lists also have special rules which allow them to be stacked on top of each other without gaps.",
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
			height6: 64,
			height12: 38,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.TOP,
				blocks: [
					{
						id: uniqueId("block_h0_"),
						type: textBlockType.H0,
						content: "PrimaHealth",
					},
					{
						id: uniqueId("block_h1_"),
						type: textBlockType.H1,
						content: "👋 from Sofia",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"We help more patients access the healthcare they need by offering affordable monthly payment options.",
					},
					{
						id: uniqueId("block_h2_"),
						type: textBlockType.H2,
						content: "Approve up to 90% of patients",
					},
					{
						id: uniqueId("block_p"),
						type: textBlockType.P,
						content:
							"Many patients looking for care are turned away because of increased out-of-pocket costs and unsophisticated credit algorithms. But that doesn’t have to be the case. It’s time to get more people the treatment they deserve.",
					},
					{
						id: uniqueId("block_h3_"),
						type: textBlockType.H3,
						content: "Our superpower: assessing ability to pay…",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Our proprietary credit analytics engine is our secret weapon. We use it to instantly assess a patient’s ability to pay by evaluating over 200 attributes that are designed to optimize approvals and reduce risk in each healthcare segment we serve.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"Traditional patient finance companies deny about 50% of credit applicants.  With our Greenlight program, you can approve up to 90%.",
					},
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "We've cracked the code",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content:
							"There's no longer a need for providers to turn away patients, offer multiple finance solutions, or try to manage in-house payment plans.",
					},
					{
						id: uniqueId("block_p_"),
						type: textBlockType.P,
						content: "Serving the underserved",
					},
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
					{
						id: uniqueId("block_h4_"),
						type: textBlockType.H4,
						content: "What we cover",
					},
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.OL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Audiology",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Cosmetic Surgery",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Dental & Orthodontic",
							},
						],
					},
					{
						id: uniqueId("block_ol_"),
						type: textBlockType.UL,
						blockStyle: textBlockType.P,
						blocks: [
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Hair Replacement",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "LASIK & Vision",
							},
							{
								id: uniqueId("inline_li_"),
								type: textBlockType.LI,
								content: "Medical Spas",
							},
						],
					},
					{
						id: uniqueId("block_caption_"),
						type: textBlockType.CAPTION,
						content:
							"Sometimes getting the care we need means getting something that’ll help us live a happier, healthier, and more active lifestyle. That’s why we offer financing plans for all kinds of outpatient care from addiction treatment and mental health services to MRIs and knee replacement surgery. Let’s see what we can do to get you back to where you want to be.",
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
