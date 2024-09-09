import React from "react";
import { motion } from "framer-motion";

const IconMap = {
	addTile: AddTile,
	recordOverlay: RecordOverlay,
	comments: Comments,
	keyboardShortcuts: KeyboardShortcuts,
	mobilePreview: MobilePreview,
	annotate: MagicWand,
	present: Play,
	exit: Clear,
	help: Help,
	addPage: AddPage,
	emphasisPointer: EmphasisPointer,
	emphasisSelect: EmphasisRectSelect,
	emphasisScribble: EmphasisScribble,
	emphasisShine: EmphasisShine,
	text: TileText,
	image: TileImage,
};

export const Icon = props => {
	const defaultColor = "rgba(255,255,255,0.4)";
	const { name, color = defaultColor, size = 28, ...rest } = props;
	const Drawing = IconMap[name] ? IconMap[name] : null;

	const iconVariants = {
		hover: {
			fill: "rgba(255,255,255,0.4)",
			transition: { duration: 0.1 },
		},
		default: {
			fill: "rgba(255,255,255,0.4)",
			transition: { duration: 0.1 },
		},
		active: {
			fill: props.activeColor ? props.activeColor : "#ED00EB",
			transition: { duration: 0.1 },
		},
	};

	return (
		<motion.svg width={size} height={size} {...rest} viewBox="0 0 28 28" fill="none">
			<Drawing color={color} variants={props.variants ? props.variants : iconVariants} />
		</motion.svg>
	);
};

function AddTile(props) {
	return (
		<motion.path
			variants={props.variants}
			d="M15.0937 6.125C15.0937 5.52094 14.604 5.03125 14 5.03125C13.3959 5.03125 12.9062 5.52094 12.9062 6.125V12.9062H6.125C5.52094 12.9062 5.03125 13.3959 5.03125 14C5.03125 14.604 5.52094 15.0937 6.125 15.0937H12.9062V21.875C12.9062 22.4791 13.3959 22.9688 14 22.9688C14.604 22.9688 15.0937 22.4791 15.0937 21.875V15.0937H21.875C22.4791 15.0937 22.9688 14.604 22.9688 14C22.9688 13.3959 22.4791 12.9062 21.875 12.9062H15.0937V6.125Z"
		/>
	);
}

function RecordOverlay(props) {
	return (
		<g>
			<motion.path d="M14 18.375a4.375 4.375 0 100-8.75 4.375 4.375 0 000 8.75z" variants={props.variants} />
			<motion.path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M24.5 14c0 5.799-4.701 10.5-10.5 10.5S3.5 19.799 3.5 14 8.201 3.5 14 3.5 24.5 8.201 24.5 14zm-1.75 0a8.75 8.75 0 11-17.5 0 8.75 8.75 0 0117.5 0z"
				variants={props.variants}
			/>
		</g>
	);
}

function Comments(props) {
	return (
		<motion.path
			fillRule="evenodd"
			clipRule="evenodd"
			variants={props.variants}
			d="M4.375 16.83V9.626a3.5 3.5 0 013.5-3.5h12.25a3.5 3.5 0 013.5 3.5v7a3.5 3.5 0 01-3.5 3.5h-6.683a.875.875 0 00-.56.203L9.31 23.304a.875.875 0 01-1.435-.672V20.33a.206.206 0 00-.206-.206 3.294 3.294 0 01-3.294-3.294zm3.938-5.455c0-.483.391-.875.874-.875h9.626a.875.875 0 110 1.75H9.188a.875.875 0 01-.876-.875zM9.187 14a.875.875 0 000 1.75h7a.875.875 0 100-1.75h-7z"
		/>
	);
}

function KeyboardShortcuts(props) {
	return (
		<g>
			<motion.path
				variants={props.variants}
				d="M8.313 10.063a.438.438 0 00-.438.437v.875c0 .242.196.438.438.438h.874a.438.438 0 00.438-.438V10.5a.438.438 0 00-.438-.438h-.874zM8.313 13.125a.438.438 0 00-.438.438v.874c0 .242.196.438.438.438h.874a.438.438 0 00.438-.438v-.874a.438.438 0 00-.438-.438h-.874zM7.875 16.625c0-.242.196-.438.438-.438h.874c.242 0 .438.196.438.438v.875a.438.438 0 01-.438.438h-.874a.438.438 0 01-.438-.438v-.875zM11.813 16.188a.438.438 0 00-.438.437v.875c0 .242.196.438.438.438h4.374a.438.438 0 00.438-.438v-.875a.438.438 0 00-.438-.438h-4.375zM18.375 16.625c0-.242.196-.438.438-.438h.875c.241 0 .437.196.437.438v.875a.438.438 0 01-.438.438h-.875a.438.438 0 01-.437-.438v-.875zM11.813 10.063a.438.438 0 00-.438.437v.875c0 .242.196.438.438.438h.874a.438.438 0 00.438-.438V10.5a.438.438 0 00-.438-.438h-.874zM11.375 13.563c0-.242.196-.438.438-.438h.874c.242 0 .438.196.438.438v.874a.438.438 0 01-.438.438h-.874a.438.438 0 01-.438-.438v-.874zM15.313 10.063a.438.438 0 00-.438.437v.875c0 .242.196.438.438.438h.874a.438.438 0 00.438-.438V10.5a.438.438 0 00-.438-.438h-.875zM14.875 13.563c0-.242.196-.438.438-.438h.874c.242 0 .438.196.438.438v.874a.438.438 0 01-.438.438h-.875a.438.438 0 01-.437-.438v-.874zM18.813 10.063a.438.438 0 00-.438.437v.875c0 .242.196.438.438.438h.875a.438.438 0 00.437-.438V10.5a.438.438 0 00-.438-.438h-.875zM18.375 13.563c0-.242.196-.438.438-.438h.875c.241 0 .437.196.437.438v.874a.438.438 0 01-.438.438h-.875a.438.438 0 01-.437-.438v-.874z"
			/>
			<motion.path
				variants={props.variants}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.375 10.063a3.5 3.5 0 013.5-3.5h12.25a3.5 3.5 0 013.5 3.5v7.874a3.5 3.5 0 01-3.5 3.5H7.875a3.5 3.5 0 01-3.5-3.5v-7.875zm1.75 0c0-.967.784-1.75 1.75-1.75h12.25c.966 0 1.75.783 1.75 1.75v7.874a1.75 1.75 0 01-1.75 1.75H7.875a1.75 1.75 0 01-1.75-1.75v-7.875z"
			/>
		</g>
	);
}

function MobilePreview(props) {
	return (
		<g>
			<motion.path d="M12.25 20.125a.438.438 0 000 .875h3.5a.438.438 0 000-.875h-3.5z" variants={props.variants} />
			<motion.path
				variants={props.variants}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7.875 7a3.5 3.5 0 013.5-3.5h5.25a3.5 3.5 0 013.5 3.5v14a3.5 3.5 0 01-3.5 3.5h-5.25a3.5 3.5 0 01-3.5-3.5V7zm1.75 0c0-.966.784-1.75 1.75-1.75h5.25c.966 0 1.75.784 1.75 1.75v14a1.75 1.75 0 01-1.75 1.75h-5.25A1.75 1.75 0 019.625 21V7z"
			/>
		</g>
	);
}

function Play(props) {
	return (
		<motion.path
			variants={props.variants}
			d="M8.75 20.4271V7.57287C8.75 6.40632 10.0163 5.68026 11.0231 6.26958L22.0027 12.6967C22.9991 13.2799 22.9991 14.7201 22.0027 15.3033L11.0231 21.7304C10.0163 22.3197 8.75 21.5937 8.75 20.4271Z"
		/>
	);
}


function Help(props) {
	return (
		<motion.path
			variants={props.variants}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.0092 24.509V24.509C8.21018 24.509 3.50916 19.808 3.50916 14.009C3.50916 8.21006 8.21018 3.50903 14.0092 3.50903C19.8081 3.50903 24.5092 8.21006 24.5092 14.009V14.009C24.5092 19.808 19.8081 24.509 14.0092 24.509V24.509ZM14.0092 5.25903V5.25903C9.17666 5.25903 5.25916 9.17654 5.25916 14.009C5.25916 18.8415 9.17667 22.759 14.0092 22.759C18.8416 22.759 22.7592 18.8415 22.7592 14.009V14.0091C22.7592 9.17667 18.8417 5.25916 14.0092 5.25912L14.0092 5.25903ZM14.9935 15.759C14.9935 16.0007 14.7977 16.1965 14.556 16.1965H13.5717V16.1965C13.33 16.1965 13.1342 16.0007 13.1342 15.759C13.1342 12.8521 15.5951 13.126 15.5951 10.9465C15.5951 10.2216 14.7726 9.63403 13.9272 9.63403C13.0817 9.63403 12.2455 10.2216 12.2455 10.9465V10.9465C12.2425 11.1955 12.281 11.4433 12.3593 11.6797V11.6797C12.4387 11.9067 12.3191 12.1552 12.0921 12.2346C12.0458 12.2508 11.9971 12.2591 11.948 12.2591H11.0594V12.2591C10.862 12.2596 10.6886 12.1285 10.6352 11.9385V11.9385C10.548 11.6152 10.5056 11.2814 10.5092 10.9465C10.5092 9.25516 12.0761 7.88404 14.0092 7.88404C15.9422 7.88404 17.5092 9.25512 17.5092 10.9465C17.5091 13.7539 14.9934 13.6446 14.9934 15.7591L14.9935 15.759ZM14.0092 17.509V17.509C14.734 17.509 15.3217 18.0967 15.3217 18.8215C15.3217 19.5464 14.734 20.134 14.0092 20.134C13.2843 20.134 12.6967 19.5464 12.6967 18.8215V18.8216C12.6967 18.0967 13.2843 17.5091 14.0091 17.5091L14.0092 17.509Z"
		/>
	);
}


function Clear(props) {
	return (
		<motion.path
			variants={props.variants}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14.0044 3.50879H14.0044C19.8036 3.50855 24.505 8.20955 24.5053 14.0088C24.5055 19.808 19.8045 24.5094 14.0053 24.5097C8.20603 24.5099 3.50466 19.8089 3.50439 14.0097C3.50439 14.0095 3.50439 14.0093 3.50439 14.0091V14.0092C3.5044 8.21016 8.20533 3.50905 14.0044 3.50879L14.0044 3.50879ZM9.44814 17.3224V17.3224C9.11113 17.6693 9.11915 18.2237 9.46604 18.5607C9.80592 18.8909 10.3468 18.8908 10.6866 18.5605L13.9998 15.2473L17.3179 18.5654V18.5654C17.6644 18.9027 18.2188 18.8953 18.5561 18.5488C18.8872 18.2088 18.8872 17.6669 18.556 17.327L15.2381 14.0091L18.5689 10.6784V10.6784C18.9041 10.3298 18.8932 9.77545 18.5445 9.44028C18.2056 9.11441 17.6698 9.11441 17.3308 9.44028L13.9998 12.7707L10.674 9.44479V9.44479C10.332 9.10278 9.77752 9.10275 9.43552 9.44472C9.09351 9.78669 9.09348 10.3412 9.43545 10.6832L12.7614 14.0091L9.44814 17.3224Z"
		/>
	);
}
function AddPage(props) {
	return (
		<motion.path
			variants={props.variants}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M14 24.5C8.20103 24.5 3.5 19.799 3.5 14C3.5 8.20103 8.20103 3.5 14 3.5C19.799 3.5 24.5 8.20103 24.5 14V14C24.5 19.799 19.799 24.5 14 24.5ZM14.875 19.6875C14.875 20.1707 14.4832 20.5625 14 20.5625C13.5168 20.5625 13.125 20.1707 13.125 19.6875V14.875H8.3125C7.82925 14.875 7.4375 14.4832 7.4375 14C7.4375 13.5168 7.82925 13.125 8.3125 13.125H13.125V8.3125C13.125 7.82925 13.5168 7.4375 14 7.4375C14.4832 7.4375 14.875 7.82925 14.875 8.3125V13.125H19.6875C20.1707 13.125 20.5625 13.5168 20.5625 14C20.5625 14.4832 20.1707 14.875 19.6875 14.875H14.875V19.6875Z"
		/>
	);
}

function EmphasisPointer(props) {
	return (
		<motion.path
			variants={props.variants}
			d="M15.0742 23.9365C19.3125 23.9365 21.6953 21.2803 21.6953 16.749V14.874C21.6953 13.1553 20.8652 12.1104 19.9375 12.1104C19.7227 12.1104 19.6152 12.2178 19.6152 12.4229V13.2529C19.6152 13.6436 19.4102 13.8389 19.1758 13.8389C18.9219 13.8389 18.7266 13.6436 18.7266 13.2529V12.7061C18.7266 11.7002 18.0723 11.0361 17.2031 11.0361C16.8027 11.0361 16.627 11.2021 16.627 11.5342V12.667C16.627 13.0576 16.4316 13.2529 16.1973 13.2529C15.9434 13.2529 15.7383 13.0576 15.7383 12.667V11.6221C15.7383 10.4893 15.0742 9.95215 14.2344 9.95215C13.8535 9.95215 13.6582 10.1279 13.6582 10.4502V12.667C13.6582 13.0576 13.4531 13.2529 13.2188 13.2529C12.9648 13.2529 12.7695 13.0576 12.7695 12.667V5.25488C12.7695 4.53223 12.291 4.06348 11.6855 4.06348C11.0312 4.06348 10.5723 4.53223 10.5723 5.25488V16.1045C10.5723 16.3779 10.4062 16.5146 10.2402 16.5146C10.0742 16.5146 9.9375 16.417 9.82031 16.1436L8.38477 12.7549C8.16992 12.2568 7.83789 12.042 7.39844 12.042C6.73438 12.042 6.30469 12.501 6.30469 13.0479C6.30469 13.2725 6.35352 13.458 6.40234 13.6143L7.98438 18.3311C9.33203 22.3057 11.959 23.9365 15.0742 23.9365Z"
		/>
	);
}

function EmphasisRectSelect(props) {
	return (
		<g>
			<motion.path
				variants={props.variants}
				d="M5 4C4.44772 4 4 4.44772 4 5V7.25C4 7.80228 4.44772 8.25 5 8.25C5.55228 8.25 6 7.80228 6 7.25V6H7.25C7.80228 6 8.25 5.55228 8.25 5C8.25 4.44772 7.80228 4 7.25 4H5Z"
			/>
			<motion.path
				variants={props.variants}
				d="M20.75 4C20.1977 4 19.75 4.44772 19.75 5C19.75 5.55228 20.1977 6 20.75 6H22V7.25C22 7.80228 22.4477 8.25 23 8.25C23.5523 8.25 24 7.80228 24 7.25V5C24 4.44772 23.5523 4 23 4H20.75Z"
			/>
			<motion.path
				variants={props.variants}
				d="M10.75 5C10.75 4.44772 11.1977 4 11.75 4H16.25C16.8023 4 17.25 4.44772 17.25 5C17.25 5.55228 16.8023 6 16.25 6H11.75C11.1977 6 10.75 5.55228 10.75 5Z"
			/>
			<motion.path
				variants={props.variants}
				d="M6 20.75C6 20.1977 5.55228 19.75 5 19.75C4.44772 19.75 4 20.1977 4 20.75V23C4 23.5523 4.44772 24 5 24H7.25C7.80228 24 8.25 23.5523 8.25 23C8.25 22.4477 7.80228 22 7.25 22H6V20.75Z"
			/>
			<motion.path
				variants={props.variants}
				d="M10.75 23C10.75 22.4477 11.1977 22 11.75 22H16.25C16.8023 22 17.25 22.4477 17.25 23C17.25 23.5523 16.8023 24 16.25 24H11.75C11.1977 24 10.75 23.5523 10.75 23Z"
			/>
			<motion.path
				variants={props.variants}
				d="M24 20.75C24 20.1977 23.5523 19.75 23 19.75C22.4477 19.75 22 20.1977 22 20.75V22H20.75C20.1977 22 19.75 22.4477 19.75 23C19.75 23.5523 20.1977 24 20.75 24H23C23.5523 24 24 23.5523 24 23V20.75Z"
			/>
			<motion.path
				variants={props.variants}
				d="M23 10.75C23.5523 10.75 24 11.1977 24 11.75V16.25C24 16.8023 23.5523 17.25 23 17.25C22.4477 17.25 22 16.8023 22 16.25V11.75C22 11.1977 22.4477 10.75 23 10.75Z"
			/>
			<motion.path
				variants={props.variants}
				d="M6 11.75C6 11.1977 5.55228 10.75 5 10.75C4.44772 10.75 4 11.1977 4 11.75V16.25C4 16.8023 4.44772 17.25 5 17.25C5.55228 17.25 6 16.8023 6 16.25V11.75Z"
			/>
		</g>
	);
}

function EmphasisScribble(props) {
	return (
		<motion.path
			variants={props.variants}
			d="M1.84956 17.1205C2.31001 17.6146 3.03999 17.6034 3.51167 17.1205L5.48823 15.1439C12.8667 7.76552 16.1684 4.57607 17.2128 5.60927C17.999 6.38417 15.955 8.68642 12.8891 12.2914C9.83442 15.8964 6.27437 19.8607 8.76753 22.3764C10.9912 24.6112 14.4838 21.7362 17.415 18.9174C19.9194 16.5028 21.2109 15.3236 21.5366 15.6381C21.8286 15.9301 21.1884 16.6376 20.3349 18.1312C19.2568 19.9843 17.8305 22.2865 19.3242 23.7802C20.4697 24.9257 22.3339 24.3192 24.5688 22.0619C25.1079 21.5116 25.1416 20.7816 24.6586 20.31C24.187 19.8495 23.4794 19.8495 22.9965 20.2987C21.7612 21.4555 20.9863 22.0956 20.8515 21.9721C20.728 21.8598 21.3232 20.9389 22.2441 19.4115C23.895 16.6825 24.3554 15.1327 23.2324 14.0209C21.7724 12.5609 19.5263 13.6391 15.7417 17.2216C12.6196 20.164 11.0024 21.2533 10.4296 20.6918C9.77827 20.0404 11.0361 17.9965 14.6635 13.83C19.3354 8.43935 20.8178 5.8788 18.875 3.94716C16.4604 1.53261 13.9223 3.39687 3.82612 13.4818L1.84956 15.4584C1.37788 15.9301 1.38911 16.6488 1.84956 17.1205Z"
		/>
	);
}

function EmphasisShine(props) {
	return (
		<motion.path
			variants={props.variants}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M2.53192 11.5035L6.36517 13.4239C6.84083 13.6583 7.41655 13.4629 7.65106 12.9875C7.88408 12.5151 7.69269 11.9433 7.2222 11.7061L3.38895 9.78576C2.91437 9.54922 2.33779 9.74199 2.10113 10.2163C1.86447 10.6907 2.05734 11.2669 2.53192 11.5035L2.53192 11.5035ZM8.04414 9.40917C8.4201 9.78344 9.02843 9.78222 9.40289 9.40646C9.7763 9.03174 9.77629 8.42579 9.40287 8.05109L6.5196 5.16926C6.14436 4.79423 5.53599 4.79424 5.16076 5.16929C4.78553 5.54434 4.78554 6.1524 5.16078 6.52744L8.04414 9.40917ZM11.7062 7.2382C11.9488 7.70987 12.528 7.89569 12.9999 7.65324C13.4643 7.41466 13.653 6.84902 13.4248 6.3796L11.5033 2.53839C11.2702 2.06206 10.6948 1.86486 10.2182 2.09793C9.7416 2.33101 9.5443 2.90609 9.7775 3.38243C9.77988 3.3873 9.78231 3.39216 9.78478 3.39699L11.7062 7.2382ZM8.93836 15.0402L10.0774 16.1792C10.3575 16.4596 10.8121 16.4599 11.0926 16.1799C11.0929 16.1797 11.0932 16.1794 11.0934 16.1792L16.1833 11.088C16.4639 10.8073 16.4639 10.3524 16.1833 10.0717L15.0442 8.93233C14.7641 8.65195 14.3096 8.65158 14.0291 8.93152C14.0288 8.93179 14.0286 8.93206 14.0283 8.93233L8.93845 14.0237C8.65787 14.3045 8.65783 14.7593 8.93836 15.0401L8.93836 15.0402ZM11.8078 17.9311L12.042 18.1653C12.3586 18.4816 12.7446 18.72 13.1693 18.8614L15.9559 19.7896C16.3807 19.931 16.7666 20.1694 17.0832 20.4858L22.3196 25.7186C22.695 26.0938 23.3037 26.0938 23.6791 25.7186L25.7184 23.6807H25.7184C26.0937 23.3057 26.0939 22.6976 25.7187 22.3224C25.7186 22.3223 25.7185 22.3222 25.7184 22.3221L20.4819 17.0889C20.1654 16.7726 19.9269 16.387 19.7853 15.9626L18.8565 13.1777C18.7149 12.7532 18.4764 12.3676 18.1598 12.0513L17.9256 11.8171C17.6445 11.5362 17.1887 11.5362 16.9076 11.8171L11.8078 16.9136C11.5267 17.1944 11.5266 17.6497 11.8075 17.9307C11.8076 17.9308 11.8077 17.9309 11.8078 17.931V17.9311Z"
		/>
	);
}

function TileText(props) {
	return (
		<g>
			<motion.path
				variants={props.variants}
				d="M3.75388 21C4.2014 21 4.5998 20.7165 4.74645 20.2937L5.72832 17.463C5.76322 17.3624 5.85802 17.2949 5.96452 17.2949H11.0772C11.1838 17.2949 11.2787 17.3626 11.3135 17.4634L12.2896 20.2925C12.4357 20.7159 12.8342 21 13.2821 21V21C14.0093 21 14.5163 20.2787 14.2701 19.5945L10.151 8.14813C9.90307 7.45929 9.24967 7 8.51758 7V7C7.78549 7 7.13208 7.45929 6.88419 8.14813L2.76536 19.5937C2.51899 20.2783 3.0263 21 3.75388 21V21ZM6.75274 15.5176C6.58095 15.5176 6.46035 15.3483 6.51645 15.1859L8.44845 9.59466C8.45914 9.56372 8.48827 9.54297 8.521 9.54297V9.54297C8.55373 9.54297 8.58286 9.56372 8.59354 9.59466L10.5255 15.1859C10.5816 15.3483 10.461 15.5176 10.2892 15.5176H6.75274Z"
			/>
			<motion.path
				variants={props.variants}
				d="M19.6892 21.2324C21.4255 21.2324 22.4031 20.3506 22.7927 19.5645H22.8748V20.002C22.8748 20.5532 23.3216 21 23.8728 21V21C24.424 21 24.8708 20.5532 24.8708 20.002V14.0273C24.8708 10.9717 22.4646 10.3633 20.7966 10.3633C19.2673 10.3633 17.8353 10.8591 16.9782 12.0503C16.6296 12.5348 16.9747 13.1596 17.5566 13.2921V13.2921C18.0332 13.4007 18.5032 13.1255 18.8418 12.773C19.2594 12.338 19.9059 12.0176 20.824 12.0176C22.1433 12.0176 22.8201 12.708 22.8201 13.8975V13.9453C22.8201 14.6904 22.0544 14.6768 20.1677 14.8955C18.1785 15.1279 16.1414 15.6475 16.1414 18.0332C16.1414 20.0977 17.6931 21.2324 19.6892 21.2324ZM20.1335 19.5918C18.9783 19.5918 18.1443 19.0723 18.1443 18.0605C18.1443 16.9668 19.115 16.5771 20.2976 16.4199C20.9607 16.3311 22.533 16.1533 22.8269 15.8594V17.2129C22.8269 18.457 21.8357 19.5918 20.1335 19.5918Z"
			/>
		</g>
	);
}

function TileImage(props) {
	return (
		<g>
			<motion.path
				variants={props.variants}
				d="M9.625 13.125C10.5915 13.125 11.375 12.3415 11.375 11.375C11.375 10.4085 10.5915 9.625 9.625 9.625C8.6585 9.625 7.875 10.4085 7.875 11.375C7.875 12.3415 8.6585 13.125 9.625 13.125Z"
			/>
			<motion.path
				variants={props.variants}
				fillRule="evenodd"
				clipRule="evenodd"
				d="M7 5.25C5.067 5.25 3.5 6.817 3.5 8.75V19.25C3.5 21.183 5.067 22.75 7 22.75H21C22.933 22.75 24.5 21.183 24.5 19.25V8.75C24.5 6.817 22.933 5.25 21 5.25H7ZM7 7C6.0335 7 5.25 7.7835 5.25 8.75V19.25L7.96824 16.5318C8.41996 16.08 9.13131 16.0192 9.65322 16.3876L12.3286 18.276C12.4109 18.3341 12.5222 18.3285 12.5982 18.2624L16.5763 14.8032C17.0965 14.3509 17.8781 14.3781 18.3656 14.8656L22.75 19.25V8.75C22.75 7.7835 21.9665 7 21 7H7Z"
			/>
		</g>
	);
}

function MagicWand(props) {
	return (
		<motion.path
			variants={props.variants}
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M5.17839 23.8591C5.38145 24.0623 5.62255 24.2235 5.88792 24.3334C6.15328 24.4434 6.43771 24.5 6.72495 24.5C7.0122 24.5 7.29662 24.4434 7.56199 24.3334C7.82735 24.2235 8.06845 24.0623 8.27152 23.8591L20.084 12.0466C20.2872 11.8435 20.4484 11.6024 20.5583 11.337C20.6683 11.0716 20.7249 10.7871 20.7249 10.4998C20.7249 10.2125 20.6683 9.92806 20.5583 9.66265C20.4484 9.39724 20.2872 9.1561 20.084 8.953L19.6465 8.5155C19.4434 8.31239 19.2023 8.15127 18.937 8.04135C18.6716 7.93142 18.3872 7.87485 18.1 7.87485C17.8127 7.87485 17.5283 7.93142 17.263 8.04135C16.9976 8.15127 16.7565 8.31239 16.5534 8.5155L4.74089 20.328C4.53777 20.5311 4.37665 20.7722 4.26673 21.0376C4.1568 21.3029 4.10022 21.5873 4.10022 21.8746C4.10022 22.1618 4.1568 22.4462 4.26673 22.7116C4.37665 22.9769 4.53777 23.218 4.74089 23.4211L5.17839 23.8591ZM14.7282 12.8157L17.7907 9.75318C17.8313 9.71255 17.8795 9.68031 17.9326 9.65831C17.9857 9.63632 18.0425 9.625 18.1 9.625C18.1574 9.625 18.2143 9.63632 18.2674 9.65831C18.3205 9.68031 18.3687 9.71255 18.4093 9.75318L18.8468 10.1907C18.8875 10.2313 18.9197 10.2795 18.9417 10.3326C18.9637 10.3856 18.975 10.4425 18.975 10.5C18.975 10.5574 18.9637 10.6143 18.9417 10.6674C18.9197 10.7204 18.8875 10.7687 18.8468 10.8093L15.7843 13.8718C15.7437 13.9124 15.6955 13.9446 15.6424 13.9666C15.5893 13.9886 15.5324 14 15.475 14C15.4175 14 15.3607 13.9886 15.3076 13.9666C15.2545 13.9446 15.2063 13.9124 15.1657 13.8718L14.7282 13.4343C14.6875 13.3937 14.6553 13.3454 14.6333 13.2924C14.6113 13.2393 14.6 13.1824 14.6 13.125C14.6 13.0675 14.6113 13.0106 14.6333 12.9576C14.6553 12.9045 14.6875 12.8563 14.7282 12.8157ZM14.222 6.32384C14.0496 6.29097 13.8911 6.20704 13.7671 6.08296C13.643 5.95887 13.5591 5.80036 13.5263 5.628L13.3286 4.5899C13.3171 4.52945 13.2849 4.47491 13.2375 4.43567C13.1901 4.39644 13.1305 4.37497 13.0689 4.37497C13.0074 4.37497 12.9478 4.39644 12.9004 4.43567C12.853 4.47491 12.8208 4.52945 12.8093 4.5899L12.6114 5.62804C12.5785 5.80036 12.4946 5.95883 12.3706 6.08287C12.2465 6.20691 12.0881 6.29081 11.9158 6.32367L10.8776 6.52142C10.8172 6.53292 10.7626 6.56515 10.7234 6.61255C10.6842 6.65996 10.6627 6.71956 10.6627 6.78109C10.6627 6.84263 10.6842 6.90223 10.7234 6.94964C10.7626 6.99704 10.8172 7.02927 10.8776 7.04077L11.9158 7.23852C12.0881 7.27138 12.2465 7.35527 12.3706 7.47932C12.4946 7.60336 12.5785 7.76183 12.6114 7.93415L12.8093 8.97233C12.8208 9.03278 12.853 9.08733 12.9004 9.12656C12.9478 9.16579 13.0074 9.18726 13.0689 9.18726C13.1305 9.18726 13.1901 9.16579 13.2375 9.12656C13.2849 9.08733 13.3171 9.03278 13.3286 8.97233L13.5263 7.93419C13.5592 7.76187 13.6431 7.60341 13.7671 7.47936C13.8912 7.35532 14.0496 7.27142 14.222 7.23857L15.2601 7.04082C15.3205 7.02931 15.3751 6.99708 15.4143 6.94968C15.4536 6.90228 15.475 6.84267 15.475 6.78114C15.475 6.7196 15.4536 6.66 15.4143 6.6126C15.3751 6.56519 15.3205 6.53296 15.2601 6.52146L14.222 6.32384ZM24.722 13.3238C24.5496 13.291 24.3911 13.207 24.2671 13.083C24.143 12.9589 24.0591 12.8004 24.0263 12.628L23.8286 11.5899C23.8171 11.5294 23.7848 11.4749 23.7374 11.4357C23.69 11.3965 23.6304 11.375 23.5689 11.375C23.5074 11.375 23.4478 11.3965 23.4004 11.4357C23.353 11.4749 23.3208 11.5294 23.3093 11.5899L23.1114 12.628C23.0786 12.8004 22.9947 12.9588 22.8706 13.0829C22.7466 13.2069 22.5881 13.2908 22.4158 13.3237L21.3776 13.5214C21.3172 13.5329 21.2626 13.5651 21.2234 13.6126C21.1842 13.66 21.1627 13.7196 21.1627 13.7811C21.1627 13.8426 21.1842 13.9022 21.2234 13.9496C21.2626 13.997 21.3172 14.0293 21.3776 14.0408L22.4158 14.2385C22.5881 14.2714 22.7466 14.3553 22.8706 14.4793C22.9947 14.6034 23.0786 14.7618 23.1114 14.9341L23.3093 15.9723C23.3208 16.0327 23.353 16.0872 23.4004 16.1264C23.4478 16.1656 23.5074 16.1871 23.5689 16.1871C23.6304 16.1871 23.69 16.1656 23.7374 16.1264C23.7848 16.0872 23.8171 16.0327 23.8286 15.9723L24.0263 14.9341C24.0592 14.7618 24.1431 14.6034 24.2671 14.4793C24.3912 14.3553 24.5496 14.2714 24.722 14.2385L25.7601 14.0408C25.8206 14.0293 25.8751 13.997 25.9144 13.9496C25.9536 13.9022 25.9751 13.8426 25.9751 13.7811C25.9751 13.7196 25.9536 13.66 25.9144 13.6126C25.8751 13.5651 25.8206 13.5329 25.7601 13.5214L24.722 13.3238ZM23.196 4.32525L22.9485 2.84077C22.9386 2.78037 22.9075 2.72547 22.8609 2.68585C22.8142 2.64623 22.755 2.62448 22.6938 2.62448C22.6326 2.62448 22.5734 2.64623 22.5267 2.68585C22.4801 2.72547 22.449 2.78037 22.4391 2.84077L22.1916 4.32525C22.1467 4.5951 22.0185 4.84415 21.8251 5.03759C21.6316 5.23103 21.3826 5.3592 21.1128 5.40417L19.6282 5.65153C19.5678 5.66145 19.5129 5.69251 19.4733 5.73917C19.4337 5.78582 19.4119 5.84504 19.4119 5.90625C19.4119 5.96745 19.4337 6.02667 19.4733 6.07333C19.5129 6.11998 19.5678 6.15104 19.6282 6.16096L21.1128 6.40841C21.3826 6.45338 21.6316 6.58154 21.8251 6.77497C22.0185 6.96841 22.1467 7.21745 22.1916 7.48729L22.4391 8.97177C22.449 9.03216 22.4801 9.08707 22.5267 9.12669C22.5734 9.16631 22.6326 9.18806 22.6938 9.18806C22.755 9.18806 22.8142 9.16631 22.8609 9.12669C22.9075 9.08707 22.9386 9.03216 22.9485 8.97177L23.196 7.48729C23.2409 7.21747 23.3691 6.96844 23.5625 6.77501C23.7559 6.58158 24.0049 6.45341 24.2747 6.40841L25.7593 6.16096C25.8197 6.15104 25.8746 6.11998 25.9142 6.07333C25.9538 6.02667 25.9756 5.96745 25.9756 5.90625C25.9756 5.84504 25.9538 5.78582 25.9142 5.73917C25.8746 5.69251 25.8197 5.66145 25.7593 5.65153L24.2747 5.40417C24.0049 5.35917 23.7559 5.231 23.5625 5.03756C23.369 4.84412 23.2409 4.59508 23.196 4.32525Z"
		/>
	);
}

/*
function PencilInRect(props) {
	return (
		<motion.path
			variants={iconVariants}
			d="M26.6118 6.68994L27.2593 6.02587C27.583 5.68554 27.5996 5.2207 27.2759 4.89697L27.0601 4.67285C26.7695 4.38232 26.2881 4.42382 25.9727 4.73925L25.3169 5.38671L26.6118 6.68994ZM17.1406 15.1567L18.8921 14.4014L26.0059 7.29589L24.7026 6.00927L17.5972 13.1147L16.8086 14.8164C16.7256 15.0156 16.9497 15.2397 17.1406 15.1567ZM4.44043 20.7598H21.7642C23.333 20.7598 24.2046 19.9048 24.2046 18.3442V11.2305L22.5278 12.9072V18.1948C22.5278 18.8423 22.1626 19.2075 21.5068 19.2075H4.68945C4.04199 19.2075 3.67676 18.8423 3.67676 18.1948V11.2803C3.67676 10.6245 4.04199 10.2676 4.68945 10.2676H18.2944L19.8384 8.72363H4.44043C2.87158 8.72363 2 9.57031 2 11.1309V18.3442C2 19.9048 2.87158 20.7598 4.44043 20.7598ZM6.74805 15.9785C7.42871 15.9785 7.97656 15.4224 7.97656 14.7417C7.97656 14.0527 7.42871 13.5049 6.74805 13.5049C6.05908 13.5049 5.50293 14.0527 5.50293 14.7417C5.50293 15.4224 6.05908 15.9785 6.74805 15.9785ZM10.417 15.9785C11.0977 15.9785 11.6538 15.4224 11.6538 14.7417C11.6538 14.0527 11.0977 13.5049 10.417 13.5049C9.72803 13.5049 9.18018 14.0527 9.18018 14.7417C9.18018 15.4224 9.72803 15.9785 10.417 15.9785ZM14.0859 15.9785C14.7666 15.9785 15.3228 15.4224 15.3228 14.7417C15.3228 14.0527 14.7666 13.5049 14.0859 13.5049C13.4053 13.5049 12.8491 14.0527 12.8491 14.7417C12.8491 15.4224 13.4053 15.9785 14.0859 15.9785Z"
		/>
	);
}




function Pencil(props) {
	return (
		<motion.path
			variants={iconVariants}
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M4.39787 23.2154L5.28057 20.2674V20.2674C5.44667 19.7127 5.74776 19.2078 6.15688 18.798L17.3777 7.56001V7.56001C17.548 7.38937 17.8244 7.38909 17.995 7.55938C17.9952 7.55959 17.9954 7.5598 17.9956 7.56001L20.4361 10.0047V10.0047C20.6068 10.1757 20.6068 10.4525 20.4361 10.6236L9.21579 21.8612V21.8612C8.80651 22.2712 8.30177 22.5732 7.74693 22.7399L4.80597 23.6236V23.6236C4.63257 23.6756 4.44985 23.5772 4.39785 23.4038C4.37942 23.3424 4.37943 23.2769 4.39787 23.2154V23.2154ZM22.035 4.75782L23.2363 5.96064V5.96064C23.7464 6.47181 23.7464 7.29948 23.2363 7.81065L21.7721 9.27658V9.27658C21.6025 9.44661 21.3272 9.44694 21.1571 9.27732C21.1569 9.27707 21.1566 9.27683 21.1564 9.27658L18.7236 6.84045V6.84045C18.5535 6.67002 18.5535 6.39401 18.7236 6.22358L20.1878 4.75765V4.75765C20.6968 4.2476 21.5229 4.24678 22.033 4.75581C22.0336 4.75648 22.0343 4.75715 22.035 4.75782V4.75782Z"
		/>
	);
}



function Annotate(props) {
	return (
		<g>
			<motion.path
				variants={iconVariants}
				d="M2 12.71C2 11.1147 2 10.317 2.29563 9.70138C2.59083 9.08665 3.08665 8.59083 3.70138 8.29563C4.31704 8 5.11469 8 6.71 8H21.29C22.8853 8 23.683 8 24.2986 8.29563C24.9134 8.59083 25.4092 9.08665 25.7044 9.70138C26 10.317 26 11.1147 26 12.71V16.29C26 17.8853 26 18.683 25.7044 19.2986C25.4092 19.9134 24.9134 20.4092 24.2986 20.7044C23.683 21 22.8853 21 21.29 21H6.71C5.11469 21 4.31704 21 3.70138 20.7044C3.08665 20.4092 2.59083 19.9134 2.29563 19.2986C2 18.683 2 17.8853 2 16.29V12.71Z"
			/>
			<path
				d="M22.0396 5.25753L23.1933 4.15413L24.2016 3.10964L24.2435 3.14972L24.4792 2.92431C25.5279 1.91398 27.4619 1.51645 28.8253 2.83709L28.8389 2.85022L29.1533 3.16649C29.7503 3.75302 30.1016 4.54791 30.0831 5.41001C30.0647 6.26322 29.6898 7.01441 29.1482 7.56586L29.1396 7.57467L27.3547 9.34785L22.2663 14.6063L19.3647 15.8184L19.3607 15.8201C18.3002 16.2646 17.3198 15.8239 16.7986 15.3115C16.2708 14.7926 15.8054 13.7943 16.2722 12.7093L16.288 12.6725L17.583 9.96574L22.0852 5.30201L22.0396 5.25753Z"
				fill="#090909"
			/>
			<path
				d="M5.5 16C6.32843 16 7 15.3284 7 14.5C7 13.6716 6.32843 13 5.5 13C4.67157 13 4 13.6716 4 14.5C4 15.3284 4.67157 16 5.5 16Z"
				fill="#090909"
			/>
			<path
				d="M9.5 16C10.3284 16 11 15.3284 11 14.5C11 13.6716 10.3284 13 9.5 13C8.67157 13 8 13.6716 8 14.5C8 15.3284 8.67157 16 9.5 16Z"
				fill="#090909"
			/>
			<path
				d="M15 14.5C15 15.3284 14.3284 16 13.5 16C12.6716 16 12 15.3284 12 14.5C12 13.6716 12.6716 13 13.5 13C14.3284 13 15 13.6716 15 14.5Z"
				fill="#090909"
			/>
			<motion.path
				variants={iconVariants}
				d="M26.9127 6.20601L27.696 5.39398C28.0877 4.97781 28.1078 4.40939 27.7161 4.01352L27.455 3.73946C27.1035 3.3842 26.5211 3.43495 26.1394 3.82067L25.3461 4.6124L26.9127 6.20601ZM18.3607 13.9783L20.4797 13.0546L26.3686 6.76282L24.7919 5.1895L18.913 11.4813L17.959 13.5621C17.8586 13.8057 18.1297 14.0798 18.3607 13.9783Z"
			/>
		</g>
	);
}

function AnnotateSFNotes(props) {
	return (
		<motion.path
			variants={iconVariants}
			d="M7.45898 23.0312H20.2324C22.2637 23.0312 23.3379 21.9668 23.3379 19.9551V8.73438C23.3379 6.72266 22.2637 5.64844 20.2324 5.64844H7.45898C5.4375 5.64844 4.35352 6.71289 4.35352 8.73438V19.9551C4.35352 21.9668 5.4375 23.0312 7.45898 23.0312ZM7.50781 21.0293C6.75586 21.0293 6.35547 20.6582 6.35547 19.8672V11.459C6.35547 10.668 6.75586 10.2871 7.50781 10.2871H20.1738C20.9258 10.2871 21.3359 10.668 21.3359 11.459V19.8672C21.3359 20.6582 20.9258 21.0293 20.1738 21.0293H7.50781ZM9.08008 13.5488H18.6211C18.9629 13.5488 19.2168 13.2852 19.2168 12.9531C19.2168 12.6211 18.9629 12.3672 18.6211 12.3672H9.08008C8.72852 12.3672 8.47461 12.6211 8.47461 12.9531C8.47461 13.2852 8.72852 13.5488 9.08008 13.5488ZM9.08008 16.2539H18.6211C18.9629 16.2539 19.2168 16 19.2168 15.668C19.2168 15.3359 18.9629 15.0723 18.6211 15.0723H9.08008C8.72852 15.0723 8.47461 15.3359 8.47461 15.668C8.47461 16 8.72852 16.2539 9.08008 16.2539ZM9.08008 18.959H15.0859C15.4277 18.959 15.6816 18.7051 15.6816 18.373C15.6816 18.0312 15.4277 17.7676 15.0859 17.7676H9.08008C8.72852 17.7676 8.47461 18.0312 8.47461 18.373C8.47461 18.7051 8.72852 18.959 9.08008 18.959Z"
		/>
	);
}

function AnnotateStickyNote(props) {
	return (
		<motion.path
			variants={iconVariants}
			fillRule="evenodd"
			clipRule="evenodd"
			d="M17.3333 23V18.3958C17.3333 18.1007 17.4366 17.8498 17.6432 17.6432C17.8498 17.4366 18.1007 17.3333 18.3958 17.3333H23V7.0625C23 6.76736 22.8967 6.51649 22.6901 6.3099C22.4835 6.1033 22.2326 6 21.9375 6H7.0625C6.76736 6 6.51649 6.1033 6.3099 6.3099C6.1033 6.51649 6 6.76736 6 7.0625V21.9375C6 22.2326 6.1033 22.4835 6.3099 22.6901C6.51649 22.8967 6.76736 23 7.0625 23H17.3333ZM22.9668 18.75H18.75V22.9668C19.355 22.8561 19.842 22.6163 20.2109 22.2474L22.2474 20.2109C22.6163 19.842 22.8561 19.355 22.9668 18.75ZM9.95486 10.7222C9.49846 10.7222 9.12847 11.0922 9.12847 11.5486C9.12847 12.005 9.49846 12.375 9.95486 12.375H19.0451C19.5015 12.375 19.8715 12.005 19.8715 11.5486C19.8715 11.0922 19.5015 10.7222 19.0451 10.7222H9.95486ZM9.12847 14.8542C9.12847 14.3978 9.49846 14.0278 9.95486 14.0278H16.566C17.0224 14.0278 17.3924 14.3978 17.3924 14.8542C17.3924 15.3106 17.0224 15.6806 16.566 15.6806H9.95486C9.49846 15.6806 9.12847 15.3106 9.12847 14.8542Z"
		/>
	);
}

*/
