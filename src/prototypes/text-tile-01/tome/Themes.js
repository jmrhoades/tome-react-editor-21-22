import { colors } from "../ds/Colors";

export const createTheme = config => {
	// Light or dark?
	const isLight = config && config.mode && config.mode === "light";

	// Create theme config
	const theme = {};

	/*
    COLORS
    */
	theme.colors = {};
	const opaque = isLight ? colors.light.opaque : colors.dark.opaque;
	const transparent = isLight ? colors.light.transparent : colors.dark.transparent;
	const shadows = isLight ? colors.light.shadows : colors.dark.shadows;

	// Opaque colors
	theme.colors.z0 = opaque.z0;
	theme.colors.z1 = opaque.z1;
	theme.colors.z2 = opaque.z2;
	theme.colors.z3 = opaque.z3;
	theme.colors.z4 = opaque.z4;
	theme.colors.z5 = opaque.z5;
	theme.colors.z6 = opaque.z6;

	// Transparent colors
	theme.colors.t0 = transparent.t0;
	theme.colors.t1 = transparent.t1;
	theme.colors.t2 = transparent.t2;
	theme.colors.t3 = transparent.t3;
	theme.colors.t4 = transparent.t4;
	theme.colors.t5 = transparent.t5;
	theme.colors.t6 = transparent.t6;
	theme.colors.t7 = transparent.t7;
	theme.colors.t8 = transparent.t8;
	theme.colors.t9 = transparent.t9;

	// Shadows
	theme.shadows = {};
	theme.shadows.small = shadows.small;
	theme.shadows.medium = shadows.medium;
	theme.shadows.large = shadows.large;

	// Accent color
	theme.colors.accent = colors.accent;

	// Backgrounds
	theme.colors.backgrounds = {};
	theme.colors.backgrounds.canvas = isLight ? theme.colors.z1 : theme.colors.z0;
	theme.colors.backgrounds.page = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.newPage = isLight ? theme.colors.t1 : theme.colors.z1;
	theme.colors.backgrounds.tile = {};
	theme.colors.backgrounds.tile.null = isLight ? theme.colors.z1 : theme.colors.z2;
	theme.colors.backgrounds.tile.default = isLight ? "hsla(0, 0%, 100%, 0)" : theme.colors.t0;
	theme.colors.backgrounds.tile.dragging = isLight ? "hsla(0, 0%, 100%, 0.3)" : theme.colors.t2;
	theme.colors.backgrounds.tile.twitter = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.tile.code = isLight ? theme.colors.z0 : theme.colors.z1;
	theme.colors.backgrounds.panel = isLight ? theme.colors.z0 : theme.colors.z1;

	// Controls
	theme.colors.controls = {};
	theme.colors.controls.selected = isLight ? theme.colors.z0 : theme.colors.t4;
	theme.colors.controls.border = isLight ? theme.colors.t1 : theme.colors.t0;
	theme.colors.controls.canvasMaterial = isLight ? "hsla(0, 0%, 96%, 0.5)" : "hsla(0, 0%, 0%, 0.5)";

	theme.colors.controls.resize = {};
	theme.colors.controls.resize.handle = isLight ? theme.colors.z3 : theme.colors.z5;
	theme.colors.controls.resize.handleActive = isLight ? theme.colors.accent : theme.colors.accent;
	theme.colors.controls.resize.indicatorBackground = isLight ? theme.colors.z0 : theme.colors.z4;
	theme.colors.controls.resize.indicatorForeground = isLight ? theme.colors.z6 : theme.colors.t9;
	theme.colors.controls.resize.indicatorLarge = true;
	theme.colors.controls.resize.indicatorShow = isLight ? true : true;
	theme.colors.controls.resize.grid = theme.colors.accent;

	// Text tile colors
	theme.colors.text = {};
	theme.colors.text.heading = isLight ? "hsla(0, 0%, 0%, 1)" : "hsla(0, 0%, 100%, 1)";
	theme.colors.text.body = isLight ? "hsla(0, 0%, 40%, 1)" : theme.colors.z6;
	theme.colors.text.mentionBackground = isLight ? theme.colors.z2 : theme.colors.z3;
	theme.colors.text.codeBackground = isLight ? theme.colors.z2 : theme.colors.z3;
	theme.colors.text.link = "rgba(208,208,208, 1)";
	theme.colors.text.caret = theme.colors.accent;
	theme.colors.text.selection = isLight ? colors.accent15 : colors.accent30;
	theme.colors.text.blockquotebar = isLight ? theme.colors.t3 : theme.colors.t3;

	// Table tile colors
	theme.colors.table = {};
	theme.colors.table.heading = isLight ? "hsla(0, 0%, 0%, 1)" : "hsla(0, 0%, 100%, 1)";
	theme.colors.table.body = isLight ? "hsla(0, 0%, 40%, 1)" : theme.colors.z6;
	theme.colors.table.cell = isLight ? theme.colors.z1 : theme.colors.z2;

	// Image & Video tile colors
	theme.colors.media = {};
	theme.colors.media.caption = {};
	theme.colors.media.caption.light = {};
	theme.colors.media.caption.light.background = colors.dark.transparent.t8;
	theme.colors.media.caption.light.text = colors.light.opaque.z6;
	theme.colors.media.caption.dark = {};
	theme.colors.media.caption.dark.background = colors.light.transparent.t8;
	theme.colors.media.caption.dark.text = colors.dark.opaque.z6;

	/*
    TYPOGRAPHY
    */
	theme.typography = {};
	theme.typography.fontFamily = "ABCDiatype";
	theme.typography.fontFamilyMono = "ABCDiatypeMono";
	theme.typography.baseSize = 22;
	theme.typography.scale = 1.666; //1.46;
	theme.typography.baseWeight = 400;
	theme.typography.mediumWeight = 550;
	theme.typography.boldWeight = 700;

	if (config && config.mode && config.mode === "oxide") {
		theme.typography.baseSize = 24;
		theme.typography.scale = 1.666;
		theme.typography.boldWeight = 350;
		//theme.colors.backgrounds.canvas = "hsla(198, 33%, 6%, 1)";
		theme.colors.backgrounds.canvas = "hsla(198, 37%, 7%, 1)";
		theme.colors.backgrounds.page = "hsla(198, 37%, 7%, 1)";
		theme.colors.backgrounds.newPage = theme.colors.t1;
		theme.colors.text.heading = "#F5CF65";
		theme.colors.text.body = "#D1D2D3";
		theme.colors.accent = "#F5CF65";
		theme.colors.controls.canvasMaterial = "hsla(198, 37%, 7%, 0.5)";
		theme.colors.text.selection = "hsla(161, 27%, 31%, 0.333)";

		theme.colors.controls.resize.handle = theme.colors.t4;
		theme.colors.controls.resize.handleActive = theme.colors.accent;
		theme.colors.controls.resize.indicatorLarge = false;
		theme.colors.controls.resize.indicatorBackground = theme.colors.accent;
		theme.colors.controls.resize.indicatorForeground = theme.colors.backgrounds.page;
		theme.colors.controls.resize.indicatorShow = true;
		theme.colors.controls.resize.grid = theme.colors.accent;
	}

	theme.typography.fontColor = {};
	theme.typography.fontColor.H0 = theme.colors.text.heading;
	theme.typography.fontColor.H1 = theme.colors.text.heading;
	theme.typography.fontColor.H2 = theme.colors.text.heading;
	theme.typography.fontColor.H3 = theme.colors.text.heading;
	theme.typography.fontColor.H4 = theme.colors.text.heading;
	theme.typography.fontColor.P = theme.colors.text.body;
	theme.typography.fontColor.CAPTION = theme.colors.text.body;
	theme.typography.fontColor.LINK = "inherit";

	theme.typography.fontSize = {};
	const bS = theme.typography.baseSize;
	const s = theme.typography.scale;
	theme.typography.fontSize.H0 = bS * s * s * s;
	theme.typography.fontSize.H1 = bS * s * s;
	theme.typography.fontSize.H2 = bS * s;
	theme.typography.fontSize.H3 = bS;
	theme.typography.fontSize.H4 = bS;
	theme.typography.fontSize.P = bS;
	//theme.typography.fontSize.CAPTION = (bS * 1) / s;
	theme.typography.fontSize.CAPTION = 15;

	theme.typography.fontWeight = {};
	theme.typography.fontWeight.H0 = theme.typography.boldWeight;
	theme.typography.fontWeight.H1 = theme.typography.boldWeight;
	theme.typography.fontWeight.H2 = theme.typography.boldWeight;
	theme.typography.fontWeight.H3 = theme.typography.boldWeight;
	theme.typography.fontWeight.H4 = theme.typography.boldWeight;
	theme.typography.fontWeight.P = theme.typography.baseWeight;
	theme.typography.fontWeight.CAPTION = theme.typography.baseWeight + 50;
	theme.typography.fontWeight.BOLD = theme.typography.boldWeight;
	theme.typography.fontWeight.BOLD_ITALIC = theme.typography.boldWeight;
	theme.typography.fontWeight.BOLD_ITALIC_UNDERLINED = theme.typography.boldWeight;

	theme.typography.lineHeight = {};
	theme.typography.lineHeight.H0 = "105%";
	theme.typography.lineHeight.H1 = "105%";
	theme.typography.lineHeight.H2 = "110%";
	theme.typography.lineHeight.H3 = "120%";
	theme.typography.lineHeight.H4 = "1.4";
	theme.typography.lineHeight.P = "1.4";
	theme.typography.lineHeight.CAPTION = "1.4";

	theme.typography.letterSpacing = {};
	theme.typography.letterSpacing.H0 = "-0.01em";
	theme.typography.letterSpacing.H1 = "-0.01em";
	theme.typography.letterSpacing.H2 = "-0.01em";
	theme.typography.letterSpacing.H3 = "0";
	theme.typography.letterSpacing.H4 = "0";
	theme.typography.letterSpacing.P = "0";
	theme.typography.letterSpacing.CAPTION = "0";

	theme.typography.marginBottom = {};
	theme.typography.marginBottom.H0 = "0.4em";
	theme.typography.marginBottom.H1 = "0.4em";
	theme.typography.marginBottom.H2 = "0.5em";
	theme.typography.marginBottom.H3 = "0.5em";
	theme.typography.marginBottom.H4 = "0.5em";
	theme.typography.marginBottom.P = "0.5em";
	theme.typography.marginBottom.CAPTION = "0.6875em";

	return theme;
};
