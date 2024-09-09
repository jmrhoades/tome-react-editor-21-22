export const transitions = {

	basic: {
		default: {
			type: "spring",
			stiffness: 600,
			damping: 35,
		},
		opacity: {
			type: "tween",
			ease: "easeOut",
			duration: 0.2,
		},
        color: {
			type: "tween",
			ease: "easeOut",
			duration: 0.2,
		},
        backgrounColor: {
			type: "tween",
			ease: "easeOut",
			duration: 0.2,
		},
	},

    layoutTransition: {
		type: "spring",
		stiffness: 650,
		damping: 60,
		mass: 1,
		//duration: 0,
	},

	instant: {
		type: "tween",
		ease: "linear",
		duration: 0.001,
	},

	fast: {
		type: "tween",
		ease: "easeOut",
		duration: 0.05,
	},

	quick: {
		type: "tween",
		ease: "easeOut",
		duration: 0.1,
	},

	playMode: {
		scale: {
			type: "spring",
			stiffness: 550,
			damping: 60,
		},
		opacity: {
			type: "tween",
			ease: "easeInOut",
			duration: 0.43,
		},
	},

};
