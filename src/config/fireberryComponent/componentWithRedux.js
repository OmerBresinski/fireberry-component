const componentWithRedux = `import React from "react";
import { createSelector } from "reselect";
import { useDispatch, useSelector } from "react-redux";
import * as S from "./style";

const NAME = () => {
    const dispatch = useDispatch();
    const state = useSelector(selectState);

    return <S.NAME></S.NAME>;
};

export default NAME;

const getState = (state) => state;
const selectState = createSelector([getState], (state) => state);
`;

module.exports = { componentWithRedux };
