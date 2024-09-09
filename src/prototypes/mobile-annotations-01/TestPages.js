import { colors } from "../../ds/Colors";
import { tiles } from "./Tile";
import { annotationDirections } from "./Annotation";

export const textBlockType = {
	P: "p",
	LI: "li",
	H1: "h1",
};

const exampleLabel = `The “Dolomiti Stars” tour starts in Cortina, one of the crown jewels of the region, and follows through the heart of the Dolomities.`;

export const TestPages = [
	{
		id: "pageA",
		order: 1,
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
							content: "The Dolomites",
						},
						{
							type: textBlockType.P,
							content: `Marmolada is a mountain in northeastern Italy and the highest mountain of the
								Dolomites (a section of the Alps). It lies between the borders of Trentino and
								Veneto. The Marmolada is an ultra-prominent peak (Ultra).`,
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
					image: "./images/ds-image-square-mountains-1.jpg",
				},
				annotations: [
					{
						id: "annotation001",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.right,
						alwaysOn: false,
						x: 0.06,
						y: 0.06,
						offsetX: 98,
					},
					{
						id: "annotation002",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 2,
						position: annotationDirections.left,
						alwaysOn: false,
						x: 0.94,
						y: 0.06,
						offsetX: -92,
					},
					{
						id: "annotation003",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 3,
						position: annotationDirections.right,
						alwaysOn: false,
						x: 0.06,
						y: 0.94,
					},
					{
						id: "annotation004",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 4,
						position: annotationDirections.left,
						alwaysOn: false,
						x: 0.94,
						y: 0.94,
					},
				],
			},
		],
	},

	{
		id: "pageB",
		order: 2,
		tiles: [
			{
				id: "tileAPageB",
				order: 1,
				size: "full",
				type: tiles.IMAGE,
				params: {
					image: "./images/ds-image-wide-mountains-1.jpg",
				},
				annotations: [
					{
						id: "annotation001",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.05,
						y: 0.1,
						offsetX: 98,
					},
					{
						id: "annotation002",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 2,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.95,
						y: 0.1,
						offsetX: -92,
					},
					{
						id: "annotation003",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 3,
						position: annotationDirections.bottom,
						alwaysOn: false,
						x: 0.05,
						y: 0.9,
						offsetX: 98,
					},
					{
						id: "annotation004",
						lineStyle: "straight",
						color: colors.annotations.yellow,
						text: exampleLabel,
						order: 4,
						position: annotationDirections.bottom,
						alwaysOn: false,
						x: 0.95,
						y: 0.9,
						offsetX: -92,
					},
				],
			},
		],
	},

	{
		id: "pageC",
		order: 3,
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
							content: "Annamite Range",
						},
						{
							type: textBlockType.P,
							content: `The Annamite Range or the Annamese Mountains is a major mountain range of eastern
							Indochina, extending approximately 1,100 km through Laos, Vietnam, and a small
							area in northeast Cambodia.`,
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
					image: "./images/ds-image-square-mountains-2.jpg",
				},
				annotations: [
					{
						id: "annotation004",
						lineStyle: "straight",
						color: colors.annotations.magenta,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.5,
						y: 0.25,
						offsetX: 0,
					},
					{
						id: "annotation005",
						lineStyle: "straight",
						color: colors.annotations.magenta,
						text: exampleLabel,
						order: 2,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.25,
						y: 0.75,
						offsetX: 44,
					},
				],
			},
		],
	},

	{
		id: "pageD",
		order: 4,
		tiles: [
			{
				id: "tileAPageD",
				order: 1,
				size: "full",
				type: tiles.IMAGE,
				params: {
					image: "./images/ds-image-wide-mountains-2.jpg",
				},
				annotations: [
					{
						id: "annotation004",
						lineStyle: "straight",
						color: colors.annotations.magenta,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.5,
						y: 0.25,
						offsetX: 0,
					},
					{
						id: "annotation005",
						lineStyle: "straight",
						color: colors.annotations.magenta,
						text: exampleLabel,
						order: 2,
						position: annotationDirections.bottom,
						alwaysOn: false,
						x: 0.25,
						y: 0.75,
						offsetX: 44,
					},
				],
			},
		],
	},

	{
		id: "pageE",
		order: 5,
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
							content: "Koryak Mountains",
						},
						{
							type: textBlockType.P,
							content: `The Koryak Mountains or Koryak Highlands are a mountain range in Far-Eastern
							Siberia, Russia, located partly in Chukotka Autonomous Okrug and in Kamchatka
							Krai.`,
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
					image: "./images/ds-image-square-mountains-3.jpg",
				},
				annotations: [
					{
						id: "annotation007",
						lineStyle: "wavy",
						color: colors.annotations.cyan,
						text: exampleLabel,
						order: 0,
						position: annotationDirections.left,
						alwaysOn: true,
						x: 0.91,
						y: 0.075,
						offsetX: 0,
					},
					{
						id: "annotation006",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.right,
						alwaysOn: false,
						x: 0.15,
						y: 0.45,
						offsetX: 70,
					},
					{
						id: "annotation008",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: exampleLabel,
						order: 2,
						position: annotationDirections.left,
						alwaysOn: false,
						x: 0.88,
						y: 0.75,
						offsetX: 44,
					},
				],
			},
		],
	},

	{
		id: "pageF",
		order: 6,
		tiles: [
			{
				id: "tileAPageF",
				order: 1,
				size: "full",
				type: tiles.IMAGE,
				params: {
					image: "./images/ds-image-wide-mountains-3.jpg",
				},
				annotations: [
					{
						id: "annotation007",
						lineStyle: "wavy",
						color: colors.annotations.cyan,
						text: exampleLabel,
						order: 0,
						position: annotationDirections.top,
						alwaysOn: true,
						x: 0.91,
						y: 0.075,
						offsetX: -84,
					},
					{
						id: "annotation006",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.15,
						y: 0.45,
						offsetX: 70,
					},
					{
						id: "annotation008",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: exampleLabel,
						order: 2,
						position: annotationDirections.bottom,
						alwaysOn: false,
						x: 0.88,
						y: 0.75,
						offsetX: -80,
					},
				],
			},
		],
	},

	{
		id: "pageG",
		order: 7,
		tiles: [
			{
				id: "tileAPageG",
				order: 1,
				size: "half",
				type: tiles.TEXT,
				params: {
					blocks: [
						{
							type: textBlockType.H1,
							content: "Köpet Dag",
						},
						{
							type: textBlockType.P,
							content: `The Köpet Dag is a mountain range on the border between Turkmenistan and Iran
							that extends about 650 kilometres along the border southeast of the Caspian Sea.`,
						},
					],
				},
				annotations: [
					{
						id: "annotation009",
						lineStyle: "line",
						color: colors.annotations.cyan,
						text: "Always on annotation",
						order: 1,
						position: annotationDirections.top,
						alwaysOn: true,
						x: 0.5,
						y: 0.5,
						offsetX: 0,
					},
				],
			},
			{
				id: "tileBPageG",
				order: 2,
				size: "half",
				type: tiles.IMAGE,
				params: {
					image: "./images/ds-image-square-mountains-4.jpg",
				},
				annotations: [
					{
						id: "annotation009",
						lineStyle: "wavy",
						color: colors.annotations.cyan,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.left,
						alwaysOn: false,
						x: 0.91,
						y: 0.075,
						offsetX: 0,
					},
					{
						id: "annotation010",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: "Not always on but interactive",
						order: 2,
						position: annotationDirections.right,
						alwaysOn: false,
						x: 0.15,
						y: 0.45,
						offsetX: 0,
					},
					{
						id: "annotation011",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: "Another always on annotation",
						order: 3,
						position: annotationDirections.left,
						alwaysOn: true,
						x: 0.88,
						y: 0.75,
						offsetX: 44,
					},
				],
			},
		],
	},
	{
		id: "pageH",
		order: 8,
		tiles: [
			{
				id: "tileAPageG",
				order: 1,
				size: "full",
				type: tiles.IMAGE,
				params: {
					image: "./images/ds-image-wide-mountains-4.jpg",
				},
				annotations: [
					{
						id: "annotation009",
						lineStyle: "wavy",
						color: colors.annotations.cyan,
						text: exampleLabel,
						order: 1,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.91,
						y: 0.075,
						offsetX: -90,
					},
					{
						id: "annotation010",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: "Always on",
						order: 2,
						position: annotationDirections.top,
						alwaysOn: false,
						x: 0.15,
						y: 0.45,
						offsetX: 0,
					},
					{
						id: "annotation011",
						lineStyle: "straight",
						color: colors.annotations.white,
						text: "Another always on label",
						order: 3,
						position: annotationDirections.bottom,
						alwaysOn: true,
						x: 0.88,
						y: 0.75,
						offsetX: -32,
					},
				],
			},
		],
	},
];
