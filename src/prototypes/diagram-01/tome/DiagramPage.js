import { tiles } from "../tile/Tile";

const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
};

export const newTome = [
	{
		id: "page" + Math.random(),
		order: 1,
		tiles: [
			{
				id: "tileAPageA" + Math.random(),
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {},
			},
			{
				id: "tileBPageA" + Math.random(),
				order: 2,
				size: "half",
				type: tiles.NULL,
				params: {},
			},
		],
	},
];

export const DiagramPage = [
	{
		id: "pageZ",
		order: 1,
		presense: [],
		tiles: [
			{
				id: "tileAPageA",
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Diagram Tile",
						},
						{
							type: textBlockType.P,
							content: "This tile is for managers, engineers, designers and people in sales and marketing who want a quick way to create compelling, easy-to-read:",
						},
						{
							type: textBlockType.LI,
							content: [
								"Workflow diagrams",
								"Org charts",
								"Software architecture maps",
								"User flows",
								"Site maps",
								"Flow charts",
							]
						},
						
					],
				},
			},
			{
				id: "tileBPageA",
				order: 2,
				size: "half",
				type: tiles.DIAGRAM,
				params: {
					
				},
			},
		],
	},
];
