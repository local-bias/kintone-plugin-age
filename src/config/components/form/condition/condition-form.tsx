import React, { ChangeEvent, FC, FCX } from 'react';
import { useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import { produce } from 'immer';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { FormControlLabel, Switch } from '@mui/material';
import { storageState } from '@/config/states/plugin';
import { RecoilFieldSelect } from '@konomi-app/kintone-utilities-react';
import { dateFieldsState, textFieldsState } from '@/config/states/kintone';

type ContainerProps = { condition: Plugin.Condition; index: number };

const Component: FCX<ContainerProps> = ({ className, condition, index }) => {
  const setStorage = useSetRecoilState(storageState);

  const onSrcChange = (fieldCode: string) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].srcFieldCode = fieldCode;
      })
    );
  };
  const onDstChange = (fieldCode: string) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].dstFieldCode = fieldCode;
      })
    );
  };
  const onUpdatesChange = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.conditions[index].updates = checked;
      })
    );
  };

  return (
    <div {...{ className }}>
      <div>
        <RecoilFieldSelect
          label='年齢の算出元'
          state={dateFieldsState}
          fieldCode={condition.srcFieldCode}
          onChange={onSrcChange}
        />
        <ArrowForwardIcon className='icon' />
        <RecoilFieldSelect
          label='自動入力するフィールド'
          state={textFieldsState}
          fieldCode={condition.dstFieldCode}
          onChange={onDstChange}
        />
      </div>
      <div>
        <FormControlLabel
          control={
            <Switch checked={condition.updates} onChange={onUpdatesChange} color='primary' />
          }
          label='レコードが上書きされる度に再計算する'
        />
      </div>
    </div>
  );
};

const StyledComponent = styled(Component)`
  padding: 0 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  > div {
    &:first-of-type {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
    }
  }
`;

const Container: FC<ContainerProps> = (props) => {
  return <StyledComponent {...props} />;
};

export default Container;
