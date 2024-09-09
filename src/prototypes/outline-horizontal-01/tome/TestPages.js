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




export const testPages = [
	{
		id: "pageZ",
		order: 1,
		presense: ["henri_liriani.png", "jesse_chase.png", "brian_nelson.png"],
		tiles: [
			{
				id: "tileBPageA",
				order: 1,
				size: "half",
				type: tiles.IMAGE,
				params: {
					image: "./images/ds-image-square-mountains-2.jpg",
				},
			},
			{
				id: "tileAPageA",
				order: 2,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Text Header",
						},
						{
							type: textBlockType.P,
							content:
								"Body text",
						},
					],
				},
			},
			
		],
	},
	{
		id: "pageY",
		order: 2,
		tiles: [
			{
				id: "tileAPageA",
				order: 1,
				size: "full",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Text Header",
						},
						{
							type: textBlockType.P,
							content: "Here’s an example of a paragraph with a much greater amount of body text.",
						},
						{
							type: textBlockType.P,
							content: "Let’s look at one with even more. There’s something to be said for the way the colors transition in the photo of the mountain to the left. It represents warm and cold hues, as well as bright and dark shades.",
						},
					],
				},
			},
			
		],
	},
	{
		id: "pageA",
		order: 3,
		presense: ["dave_dash.png"],
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
							content: "Animation Framework",
						},
						{
							type: textBlockType.P,
							content:
								"The animate prop can accept an object of values. When one of them changes, the motion component will automatically animate to the new state.",
						},
						{
							type: textBlockType.P,
							content: "The animation used can be configured using the transition prop.",
						},
					],
				},
			},
			{
				id: "tileBPageA",
				order: 2,
				size: "half",
				type: tiles.IMAGE,
				params: {
					image: "./images/code-example-01.svg",
				},
			},
		],
		overlay: {
			id: "overlay" + Math.random(),
			video: "/videos/1049471842-preview.mp4",
		},
	},
	{
		id: "pageB",
		order: 4,
		tiles: [
			{
				id: "tileAPageB",
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Page Transitions",
						},
						{
							type: textBlockType.P,
							content: "By default, Motion will create an appropriate animation for a snappy transition based on the types of value being animated. For instance, physical properties like x or scale will be animated via a spring simulation. Whereas values like opacity or color will be animated with a tween.",
						},
						{
							type: textBlockType.P,
							content:
								"However, you can set different types of animation by passing a Transition to the transition prop.",
						},
					],
				},
			},
			{
				id: "tileBPageB",
				order: 2,
				size: "half",
				type: tiles.IMAGE,
				params: {
					image: "./images/device-mock-01.png",
				},
			},
		],
	},
	{
		id: "pageX",
		order: 5,
		presense: ["yuchen_liu.png", "sahana_rajasekar.png"],
		tiles: [
			{
				id: "tileXPageA",
				order: 1,
				size: "full",
				type: tiles.IMAGE,
				params: {
					image: "./images/benjamin-voros-phIFdC6lA4E-unsplash.jpg",
				},
			},
		]
	},
	{
		id: "pageC",
		order: 6,
		presense: ["yuchen_liu.png", "sahana_rajasekar.png"],
		tiles: [
			{
				id: "tileAPageC",
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Variants",
						},
						{
							type: textBlockType.P,
							content:
								"Target objects are useful for simple, single-component animations. But sometimes we want to create animations that propagate throughout the DOM, and orchestrate those animations in a declarative way. We can do so with variants.",
						},
						{
							type: textBlockType.P,
							content: "Variants are sets of pre-defined target objects.",
						},
					],
				},
			},
			{
				id: "tileBPageC",
				order: 2,
				size: "half",
				type: tiles.IMAGE,
				params: {
					image: "./images/code-example-02.svg",
				},
			},
		],
	},
	{
		id: "pageD",
		order: 7,
		tiles: [
			{
				id: "tileAPageD",
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Orchestration",
						},
						{
							type: textBlockType.P,
							content:
								"By default, all these animations will start simultaneously. But by using variants, we gain access to extra transition props like when, delayChildren, and staggerChildren that can let parents orchestrate the execution of child animations.",
						},
					],
				},
			},
			{
				id: "tileBPageD",
				order: 2,
				size: "half",
				type: tiles.VIDEO,
				params: {
					video: "/videos/device-mock-02.mp4",
				},
			},
		],
	},
	{
		id: "pageE",
		order: 8,
		tiles: [
			{
				id: "tileAPageE",
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Sagra Farms",
						},
						{
							type: textBlockType.P,
							content:
								"This past week (Thur - Sat) I spent a couple nights at Sagra Farms. Sagra is a startup that pulls from the agriturismo tradition (from Italy and other coutries) where you stay at a farm, learn, eat, and (optionally) help out.",
						},
						{
							type: textBlockType.P,
							content:
								"Sagra has a focus on regenerative farms that care for the health of the planet and our bodies.",
						},
						{
							type: textBlockType.P,
							content:
								"Their first location is at Stemple Creek in Tomales, CA. But they're adding farms across the US.",
						},
					],
				},
			},
			{
				id: "tileBPageE",
				order: 2,
				size: "half",
				type: tiles.IMAGE,
				params: {
					image: "./images/d4244a5c-9010-4277-9ae9-245026311c04.jpg.webp",
				},
			},
		],
	},
];
