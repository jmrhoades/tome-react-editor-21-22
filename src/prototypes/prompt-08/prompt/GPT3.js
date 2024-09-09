import { uniqueId } from "lodash";
import { tileNames, textBlockType, alignmentX, alignmentY, lineLength } from "../page/TileConstants";
import { appendPageToTome, appendRowToPageInTome, appendTileToRowInTome } from "../tome/TomeContext";
import { artStyles } from "./PromptConstants";

export const makeTitlePrompt = (user_input, artifact_type, autoArtStyle = false) => {
	//console.log("makeTitlePrompt", artifact_type);
	const isStory = artifact_type.placeholder === "story";
	let p = [];
	if (artifact_type.placeholder === "presentation" || artifact_type.placeholder === "presentation outline") {
		p.push("You are a world-famous public speaker. Write a compelling, punchy title");
		p.push(`for a presentation.`);
	} else if (isStory) {
		p.push(`You are a bestselling author writing a clever, entertaining story.`);
		//p.push(`about "${user_input}".`);
		p.push(`Write a title for this story. `);
	}
	if (autoArtStyle) {
		// Art styles list
		p.push(
			`Also choose the most relevant art style for this ${artifact_type.placeholder} from the following art styles:`
		);
		let styles = " [";
		for (let i = 0; i < artStyles.length; i++) {
			if (artStyles[i].id !== "AUTO" && artStyles[i].id !== "NONE") {
				styles += artStyles[i].id;
				if (i < artStyles.length - 1) styles += ", ";
			}
		}
		styles += "]";
		p.push(styles);
	}
	p.push(`\nFormat should be in valid JSON like this: `);
	p.push(autoArtStyle ? `{"title":"", "artStyle":""}` : `{"title":""}`);
	p.push(`\nThis is the topic:`);
	p.push(`\n"""\n`);
	p.push(`${user_input}`);
	p.push(`\n"""`);
	//p.push(isStory ?` \nThe story is about this topic: "${user_input}".` : `\nThis is the topic: "${user_input}".`);
	return p.join(" ");
};

export const makePagesPrompt = (user_input, artifact_type, page_count, images, artStyle) => {
	console.log("makeTitlePrompt", artifact_type, page_count, images, artStyle);
	let p = [];
	if (artifact_type === "presentation") {
		//p.push(`Write an engaging, compelling ${page_count} page presentation. `);
		p.push(`Write an engaging and informative 1 to 8 page presentation. `);
		//p.push(`Write an engaging and informative presentation. `);
		//p.push(`about "${user_input}".`);
		p.push(`Each page contains a title and 2 punchy paragraphs. `);
		p.push(`Each paragraph should be less than 20 words. `);
		p.push(`Skip the title page and outline page. Do not include a references page.`);
		//p.push(`The presentation should be written in the same language that the topic is written in. `);
	} else if (artifact_type === "presentation outline") {
		//p.push(`Write a logical ${page_count} page presentation outline. `);
		p.push(`Write a logical and informative 1 to 8 page presentation outline. `);
		//p.push(`Write a logical and informative presentation outline. `);
		//p.push(`about "${user_input}".`);
		p.push(`Each page contains a title and 3 section titles for the content.`);
		p.push(`Skip the title and outline page. Do not include a references page.`);
		//p.push(`The presentation should be written in the language that the topic is written in.`);
	} else if (artifact_type === "story") {
		//p.push(`You are a bestselling author writing an entertaining ${page_count} page story. `);
		p.push(`You are a bestselling author writing an entertaining 1 to 8 page story. `);
		//p.push(`You are a bestselling author writing an entertaining page story. `);
		//p.push(`about "${user_input}".`);
		p.push(`Each page contains a chapter title and 3 narrative, colorful paragraphs. `);
		p.push(`Each paragraphs should be less than 20 words. `);
		//p.push(`The story should be written in the language that the topic is written in.`);
	}
	if (images.id === "GENERATED") addImageDescription(p, artStyle);
	p.push(`Format should be in valid JSON like this: `);
	p.push(makeJSONTemplate(images.id === "GENERATED"));
	p.push(`\nThis is the topic: "${user_input}".`);
	return p.join(" ");
};

export const addImageDescription = (p, art_style) => {
	p.push(`Each page should also have a 15 word description of an image that describes the page's content. `);
	if (art_style.id !== "NONE") {
		p.push(`The image description should have a ${art_style.name} aesthetic.`);
	}

	// `and a richly detailed image description, describing each page's content very specifically,`,
	// `as if written by the world's greatest artist in 300-400 characters,`,
	// `with no proper nouns using the content`
};

export const makeJSONTemplate = images => {
	let j = `{"pages":[{"title":"","content":[]}]}`;
	if (images) j = `{"pages":[{"title":"","content":[],"image_description":""}]}`;

	//let j = `"page": {"order":"", "title":"","content":[]}`;
	//if (images) j = `"page": {"order":"", "title":"","content":[],"image_description":""}`;

	return j;
};

export const makeRewriteBlocksPrompt = (blocks, artifact_type) => {
	let p = [];
	let title = blocks[0].content;
	let content = "";
	if(blocks[1] && blocks[1].content) content += blocks[1].content;
	if(blocks[2] && blocks[2].content) content += (", " + blocks[2].content);
	if(blocks[3] && blocks[3].content) content += (", " + blocks[3].content);
	if(blocks[4] && blocks[4].content) content += (", " + blocks[4].content);
	p.push(`You are a freelance editor helping a client rewrite a page of their ${artifact_type.placeholder}. `);
	p.push(`You will rewrite the title and the content of the page.`);
	p.push(`You will try to trim the number of words used.`);
	p.push(`Output in valid JSON like this: {"title":"","content":["", ""]}`);
	p.push(`\nRewrite this page: {"title":"${title}","content":[${content}]}.`);
	return p.join(" ");
};

/*
export const makeJSONTemplate = (page_count, content_count) => {
	let j = `{"pages":[`;
	for (let i = 0; i < page_count; i++) {
		j += `{ `;
        j += `"title": "",`;
		j += `"content": [`;
		for (let k = 0; k < content_count; k++) {
			j += `""`;
			if (k !== content_count - 1) j += `,`;
		}
		j += `],`;
		j += `"image_description":""`;
		j += `}`;
	}
	j += `]}`; // pages
	return j;
};
*/

export const initializeOutline = (tome, theme, saveState) => {
	// Page
	const page = appendPageToTome(tome, theme);
	// Row
	const row = appendRowToPageInTome(page, tome);
	const textTile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				textLoaded: true,
				blocks: [],
			},
		},
		row,
		tome
	);
	tome.outlineTextTile = textTile;
	saveState();
	return textTile;
};

export const buildPageFromJSON = (
	artifact_type,
	images,
	pageData,
	tome,
	saveState,
	showPage,
	theme,
	autoPaging,
	outlineTextTile,
	requestImageForTile,
	artStyle
) => {
	console.log(pageData);

	const hasImages = images.id !== "NONE";
	const hasPlaceholderImages = images.id === "PLACEHOLDERS";

	const art_style = artStyle.prompt;
	if (artStyle.ID === "AUTO") {
		// use auto
	}
	//console.log(artStyle, art_style);

	// Update outline
	outlineTextTile.params.blocks.push({
		id: uniqueId("block"),
		type: textBlockType.H2,
		content: pageData.title,
	});

	// Page
	const page = appendPageToTome(tome, theme);
	page.isGenerated = true;

	// Blocks
	const blocks = [
		{
			id: uniqueId("block"),
			type: textBlockType.H3,
			content: pageData.title,
		},
	];
	if (artifact_type === "presentation outline" && hasImages) {
		pageData.content.map(p =>
			blocks.push({
				id: uniqueId("block"),
				type: textBlockType.H4,
				content: p,
			})
		);
	} else {
		pageData.content.map(p =>
			blocks.push({
				id: uniqueId("block"),
				type: textBlockType.P,
				content: p,
			})
		);
	}

	// Row
	let row = appendRowToPageInTome(page, tome);
	let textTile = appendTileToRowInTome(
		{
			type: tileNames.TEXT.name,
			params: {
				alignmentX: hasImages ? alignmentX.LEFT : alignmentX.LEFT,
				alignmentY: alignmentY.MIDDLE,
				blocks: blocks,
				isGenerated: true,
				canRegenerate: true,
			},
		},
		row,
		tome
	);
	if (hasImages) {
		if (hasPlaceholderImages) {
			appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {},
				},
				row,
				tome
			);
		} else {
			const imageTile = appendTileToRowInTome(
				{
					type: tileNames.IMAGE.name,
					params: {
						image: "",
						imageSize: "cover",
						isLoading: true,
						needsGeneration: true,
						prompt: pageData.image_description,
						artStyle: artStyle.prompt,
						canRegenerate: true,
					},
				},
				row,
				tome
			);
			requestImageForTile(imageTile);
		}
	}

	saveState();
	if (autoPaging.current === true) showPage(page);

	return new Promise(resolve => {
		setTimeout(() => {
			textTile.params.textLoaded = true;
			resolve(true);
		}, 1000);
	});
};
