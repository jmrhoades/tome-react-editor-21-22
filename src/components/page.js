import React from "react";
import styled from 'styled-components';
import { Helmet } from "react-helmet";

export const Page = ({title, ...props}) => {
  return (
    <PageWrap>
        <Helmet>
            <title>{title}</title>
        </Helmet>
        {props.children}
    </PageWrap>
  )
}

const PageWrap = styled("div")`
  height: 100%;
`;
