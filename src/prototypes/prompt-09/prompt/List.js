/*
NOTES
- this is scrollable list
- it's given a height based on the number of items inside
- it has a max height
- it will overflow-y scroll if the height of the items exceeds the max height
- the list has spacer rows at the top and bottom to provide the appearance of scrollview padding
- the list 
*/

import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { ListStates, SCOPED_ITEM_HEIGHT, ROOT_ITEM_HEIGHT } from "./Prompt";
import { ListItem } from "./ListItem";
import {
	tListItemScoped,
	tListItemHide,
	tListItemShow,
} from "./Transitions";
import { ScrollBar } from "./ScrollBar";

const ScrollViewWrap = styled(motion.div)`
	position: relative;
`;

const ScrollView = styled(motion.div)`
	display: flex;
	flex-direction: column-reverse;
	overflow-y: auto;
	scrollbar-width: 0;
	&::-webkit-scrollbar {
		width: 0px;
	}
`;

const SpacerItem = styled(motion.div)`
	width: 100%;
	flex-shrink: 0;
`;

const scrollViewPaddingY = 5;
const scrollViewPaddingX = 0;

export const List = props => {
	const isScoped = props.listState === ListStates.SCOPED;
	const needsScrollBar = props.list.length > props.maxListRows;
	const maxHeight = ROOT_ITEM_HEIGHT * (props.maxListRows + 0.5) + scrollViewPaddingY;
	const scrollRef = React.useRef(null);
	// What height should the scrollview be?
	let height = 0;
	if (isScoped) {
		height = SCOPED_ITEM_HEIGHT;
	} else {
		height = ROOT_ITEM_HEIGHT * props.list.length + scrollViewPaddingY + scrollViewPaddingY;
		if (height > maxHeight) height = maxHeight;
	}

	return (
		<ScrollViewWrap>
			<ScrollView
				key={props.id + "_scroller"}
				id={props.id + "_scroller"}
				style={{
					pointerEvents: props.isRootList && isScoped ? "none" : "auto",
					paddingLeft: scrollViewPaddingX,
					paddingRight: scrollViewPaddingX,
					maxHeight: maxHeight,
				}}
				ref={scrollRef}
			>
				
				<SpacerItem style={{ height: scrollViewPaddingY }} />
				{props.list.map((item, i) => (
					<motion.div
						key={item.id}
						initial={false}
						animate={{
							y:
								isScoped && props.scope.id === item.id
									? 17 + i * ROOT_ITEM_HEIGHT + (scrollRef.current ? scrollRef.current.scrollTop : 0)
									: 0,
							opacity: isScoped && props.scope.id !== item.id ? 0 : 1,
						}}
						transition={
							isScoped && props.scope.id === item.id
								? tListItemScoped
								: !isScoped
								? tListItemShow
								: tListItemHide
						}
						style={{
							zIndex: props.focussedItem.id === item.id ? 2 : 0,
						}}
					>
						<ListItem
							isRootList={props.isRootList}
							data={item}
							theme={props.theme}
							scope={props.scope}
							listState={props.listState}
							focussedItem={props.focussedItem}
							setFocussedItem={props.setFocussedItem}
							index={i}
							onTap={() => {
								props.listItemTapped(item);
							}}
							disableIntentHovers={props.disableIntentHovers}
							isUsingFallbackIntents={props.isUsingFallbackIntents}
							value={props.value}
							prompt={props.prompt}
							descopeBar={props.descopeBar}
							scopeBar={props.scopeBar}
							scrollTop={scrollRef.current ? scrollRef.current.scrollTop : 0}
							toggleRecentsList={props.toggleRecentsList}
							filteredChildList={props.filteredChildList}
						/>
					</motion.div>
				))}
				<SpacerItem style={{ height: scrollViewPaddingY }} />
				
			</ScrollView>
			{!isScoped && needsScrollBar && (
				<ScrollBar
					theme={props.theme}
					scrollRef={scrollRef}
					scrollViewHeight={height}
					contentHeight={ROOT_ITEM_HEIGHT * props.list.length + 10}
				/>
			)}
		</ScrollViewWrap>
	);
};
