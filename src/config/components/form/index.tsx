import React, { FC, VFCX } from 'react';
import { useRecoilValue } from 'recoil';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

import { storageState } from '../../states/plugin';
import ConditionAdditionButton from './condition-addition-button';
import Condition from './condition';

type Props = Readonly<{storage: Plugin.Config;}>;

const Component: VFCX<Props> = ({ className, storage }) => (
  <div {...{ className }}>
    {!storage && (
      <>
        <CircularProgress />
        <div>設定情報を取得しています</div>
      </>
    )}
    {!!storage && (
      <>
        {storage.conditions.map((condition, index) => (
          <Condition key={index} {...{ condition, index }} />
        ))}
        <ConditionAdditionButton label='新しい自動計算設定' />
      </>
    )}
  </div>
);

const StyledComponent = styled(Component)`
  width: 100%;

  & > div {
    padding: 1em;
  }
`;

const Container: FC = () => {
  const storage = useRecoilValue(storageState);

  return <StyledComponent {...{ storage }} />;
};

export default Container;
