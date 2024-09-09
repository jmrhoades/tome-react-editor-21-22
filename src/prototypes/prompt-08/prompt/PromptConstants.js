export const pageCountOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const tomeTypes = [
	{ name: "Presentation", id: "PRESENTATION", placeholder: "presentation", temperature: 0.5, pages: 6, },
	{ name: "Presentation outline", id: "PRESENTATION_OUTLINE", placeholder: "presentation outline", temperature: 0.4, pages: 6 },
	{ name: "Story", id: "STORY", placeholder: "story", temperature: 0.5, pages: 6, },
];

export const imageOptions = [
	{ name: "Generated", id: "GENERATED" },
	{ name: "Placeholders", id: "PLACEHOLDERS" },
	{ name: "No images", id: "NONE" },
];

export const artStyles = [
	{ name: "Auto", id: "AUTO" },
	{ name: "None", id: "NONE" },
	{ name: "Color pop", id: "COLOR_POP", prompt: "Colorpop style, candle with a blue pastel background" },
	{ name: "Surrealism", id: "SURREALISM", prompt: "surrealism Salvador Dali matte background melting oil on canvas" },
	{
		name: "Epic",
		id: "EPIC",
		prompt:
			"Epic cinematic brilliant stunning intricate meticulously detailed dramatic atmospheric maximalist digital matte painting",
	},

	{ name: "Modern Comic", id: "MODERN_COMIC", prompt: "Mark Brooks and Dan Mumford, comic book art, perfect, smooth" },

	{
		name: "CGI Character",
		id: "CGI CHARACTER",
		prompt:
			"Pixar, Disney, concept art, 3d digital art, Maya 3D, ZBrush Central 3D shading, bright colored background, radial gradient background, cinematic, Reimagined by industrial light and magic, 4k resolution post processing",
	},

	{ name: "Candy", id: "CANDY", prompt: "vibrant colors Candyland wonderland gouache swirls detailed" },

	{ name: "Synthwave", id: "SYNTHWAVE", prompt: "synthwave neon retro" },

	{ name: "Cyberpunk", id: "CYBERPUNK", prompt: "cyberpunk 2099 blade runner 2049 neon" },

	{ name: "Heavenly", id: "HEAVENLY", prompt: "heavenly sunshine beams divine bright soft focus holy in the clouds" },

	{
		name: "Neo Impressionist",
		id: "NEO_IMPRESSIONIST",
		prompt:
			"neo-impressionism expressionist style oil painting, smooth post-impressionist impasto acrylic painting, thick layers of colourful textured paint",
	},

	{
		name: "Pop Art",
		id: "POP ART",
		prompt:
			"Screen print, pop art, splash screen art, triadic colors, digital art, 8k resolution trending on Artstation, golden ratio, symmetrical, rule of thirds, geometric bauhaus",
	},

	{
		name: "Photo",
		id: "PHOTO",
		prompt: "Professional photography, bokeh, natural lighting, canon lens, shot on dslr 64 megapixels sharp focus",
	},

	{
		name: "Fantasy",
		id: "FANTASY",
		prompt:
			"detailed matte painting, deep color, fantastical, intricate detail, splash screen, complementary colors, fantasy concept art, 8k resolution trending on Artstation Unreal Engine 5",
	},

	{
		name: "Artistic Portrait",
		id: "ARTISTIC PORTRAIT",
		prompt:
			"head and shoulders portrait, 8k resolution concept art portrait by Greg Rutkowski, Artgerm, WLOP, Alphonse Mucha dynamic lighting hyperdetailed intricately detailed Splash art trending on Artstation triadic colors Unreal Engine 5 volumetric lighting",
	},

	{
		name: "Bon Voyage",
		id: "BON VOYAGE",
		prompt:
			"8k resolution concept art by Greg Rutkowski dynamic lighting hyperdetailed intricately detailed Splash art trending on Artstation triadic colors Unreal Engine 5 volumetric lighting Alphonse Mucha WLOP Jordan Grimmer orange and teal",
	},

	{
		name: "Anime",
		id: "ANIME",
		prompt:
			"Studio Ghibli, Anime Key Visual, by Makoto Shinkai, Deep Color, Intricate, 8k resolution concept art, Natural Lighting, Beautiful Composition",
	},
];
