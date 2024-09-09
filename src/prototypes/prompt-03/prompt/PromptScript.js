import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY } from "../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../tome/TomeContext";
import { Themes } from "../tome/Themes";

export const makeTome = (tome, saveState, deletePage, selectOutlinePage, updatePlaceholder) => {
	let page = null;
	let row = null;
	let tile = null;

	let delay = 0;
	let delayIncrement = 2500;

	// const tile1 = React.useRef();
	// const tile2 = React.useRef();
	// const tile3 = React.useRef();
	// const tile4 = React.useRef();
	// const tile5 = React.useRef();
	// const tile6 = React.useRef();

	let tile1 = {};
	let tile2 = {};
	let tile3 = {};
	let tile4 = {};
	let tile5 = {};
	let tile6 = {};

	let textTile1 = {};
	let textTile2 = {};
	let textTile3 = {};
	let textTile4 = {};
	let textTile5 = {};
	let textTile6 = {};
	let textTile7 = {};
	let textTile8 = {};

	delay += delayIncrement - 1000;
	setTimeout(() => {
		tome.tiles[0].params.content = "Introducing Cloudhop";

		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile1 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.CENTER,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H0,
							blocks: [
								{
									id: uniqueId("block"),
									type: textBlockType.SPAN,
									content: "Introducing ",
								},
								{
									id: uniqueId("block"),
									type: textBlockType.SPAN,
									content: "Cloudhop",
								},
							],
						},
					],
					textLoaded: false,
				},
			},
			row,
			tome
		);

		deletePage(tome.pages[0]);
		saveState();
		updatePlaceholder("Creating page 1 / 8");
	}, delay);

	delay += delayIncrement - 1000;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile2 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H1,
							content: "Problem",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H1,
							content: "Solution",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H1,
							content: "Features",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H1,
							content: "Benefits",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H1,
							content: "Pricing",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H1,
							content: "Next Steps",
						},
					],
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 2 / 8");
	}, delay);

	delay += delayIncrement + 500;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile3 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H2,
							content: "Problem",
							//color: "#96423C",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Traffic in the Bay Area is a daily nightmare for tech employees.",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Commuting to work can take hours and is highly stressful.",
						},
					],
				},
			},
			row,
			tome
		);
		tile1 = appendTileToRowInTome(
			{
				type: tileNames.IMAGE.name,
				params: {
					image: "/d-bgs/image1.jpg",
					imageSize: "cover",
					isLoading: true,
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 3 / 8");
	}, delay);

	setTimeout(() => {
		tile1.params.isLoading = false;
		saveState();
	}, delay + 1500);

	delay += delayIncrement + 10;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile4 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H2,
							content: "Solution",
							//color: "#4E7666",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"Introducing Cloudhop, a flying bus that transports tech employees from downtown San Francisco to a Silicon Valley campus.",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Cloudhop is fast, convenient, and affordable.",
						},
					],
				},
			},
			row,
			tome
		);

		tile2 = appendTileToRowInTome(
			{
				type: tileNames.IMAGE.name,
				params: {
					image: "/d-bgs/image2.jpg",
					imageSize: "cover",
					isLoading: true,
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 4 / 8");
	}, delay);

	setTimeout(() => {
		tile2.params.isLoading = false;
		saveState();
	}, delay + 1200);

	delay += delayIncrement;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile5 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H2,
							content: "Features",
							//color: "#6AAED0",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H4,
							content: "High-speed electric propulsion system",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Cloudhop can fly at speeds of up to 150 mph, making it the fastest way to commute",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H4,
							content: "Luxurious interiors",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"Cloudhop features comfortable seats, ample legroom, and other amenities to make commuting a pleasure",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H4,
							content: "Safe and reliable",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"Cloudhop is designed and built to the highest safety standards, ensuring a smooth and trouble-free ride",
						},
					],
				},
			},
			row,
			tome
		);
		tile3 = appendTileToRowInTome(
			{
				type: tileNames.IMAGE.name,
				params: {
					image: "/d-bgs/image3.jpg",
					isLoading: true,
					imageSize: "cover",
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 5 / 8");
	}, delay);

	setTimeout(() => {
		tile3.params.isLoading = false;
		saveState();
	}, delay + 3000);

	delay += delayIncrement + 1500;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile6 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H2,
							content: "Benefits",
							//color: "#FDF6A5",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H4,
							content: "Save time",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"Cloudhop cuts commuting time in half, so tech employees can spend more time at home or in the office",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H4,
							content: "Save money",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Cloudhop is significantly cheaper than driving or using ride-sharing services",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.H4,
							content: "Reduce stress",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Cloudhop offers a comfortable and relaxing commuting experience",
						},
					],
				},
			},
			row,
			tome
		);
		tile4 = appendTileToRowInTome(
			{
				type: tileNames.IMAGE.name,
				params: {
					image: "/d-bgs/image7.jpg",
					imageSize: "cover",
					isLoading: true,
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 6 / 8");
	}, delay);

	setTimeout(() => {
		tile4.params.isLoading = false;
		saveState();
	}, delay + 2500);

	delay += delayIncrement + 1000;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile7 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H2,
							content: "Environmental impact",
							//color: "#81983E",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"Cloudhop is powered by electric propulsion, making it a zero-emissions mode of transportation",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"By reducing traffic on the roads, Cloudhop helps to reduce air pollution and greenhouse gas emissions",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Cloudhop is a sustainable and environmentally-friendly way to commute to work",
						},
					],
				},
			},
			row,
			tome
		);
		tile5 = appendTileToRowInTome(
			{
				type: tileNames.IMAGE.name,
				params: {
					image: "/d-bgs/image8.jpg",
					imageSize: "cover",
					isLoading: true,
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 7 / 8");
	}, delay);

	setTimeout(() => {
		tile5.params.isLoading = false;
		saveState();
	}, delay + 1500);

	delay += delayIncrement;
	setTimeout(() => {
		// Page
		page = appendPageToTome(tome, Themes[0]);
		// Row
		row = appendRowToPageInTome(page, tome);
		textTile8 = appendTileToRowInTome(
			{
				type: tileNames.TEXT.name,
				params: {
					alignmentX: alignmentX.LEFT,
					alignmentY: alignmentY.MIDDLE,
					blocks: [
						{
							id: uniqueId("block"),
							type: textBlockType.H2,
							content: "Pricing",
							//color: "rgba(255,255,255,0.4)",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content:
								"Cloudhop is offered at a flat monthly rate, making it easy to budget for commuting expenses",
						},
						{
							id: uniqueId("block"),
							type: textBlockType.P,
							content: "Subsidies and discounts are available for frequent users and large groups",
						},
					],
				},
			},
			row,
			tome
		);

		tile6 = appendTileToRowInTome(
			{
				type: tileNames.IMAGE.name,
				params: {
					image: "/d-bgs/image9.jpg",
					imageSize: "cover",
					isLoading: true,
				},
			},
			row,
			tome
		);
		saveState();
		selectOutlinePage(page);
		updatePlaceholder("Creating page 8 / 8");
	}, delay);

	setTimeout(() => {
		tile6.params.isLoading = false;
		saveState();
	}, delay + 1250);

	setTimeout(() => {
		textTile1.params.textLoaded = true;
		textTile2.params.textLoaded = true;
		textTile3.params.textLoaded = true;
		textTile4.params.textLoaded = true;
		textTile5.params.textLoaded = true;
		textTile6.params.textLoaded = true;
		textTile7.params.textLoaded = true;
		textTile8.params.textLoaded = true;
	}, delay + 1500);

	return delay;
};
