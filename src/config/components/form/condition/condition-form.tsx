import React, { ChangeEvent, ChangeEventHandler, VFC, VFCX } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from '@emotion/styled';
import produce from 'immer';
import { Properties } from '@kintone/rest-api-client/lib/client/types';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import { dateFieldsState, inputFieldsState, storageState } from '../../../states';
import { FormControlLabel, MenuItem, Switch, TextField } from '@material-ui/core';

type ContainerProps = { condition: kintone.plugin.Condition; index: number };
type Props = ContainerProps & {
  dateFields: Properties;
  inputFields: Properties;
  onSrcChange: ChangeEventHandler<HTMLInputElement>;
  onDstChange: ChangeEventHandler<HTMLInputElement>;
  onUpdatesChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const Component: VFCX<Props> = ({
  className,
  condition,
  dateFields,
  inputFields,
  onSrcChange,
  onDstChange,
  onUpdatesChange,
}) => (
  <div {...{ className }}>
    <div>
      <TextField
        select
        className='input'
        label='年齢の算出元'
        value={condition.src}
        onChange={onSrcChange}
        variant='outlined'
      >
        {Object.entries(dateFields).map(([code, { label }], i) => (
          <MenuItem key={i} value={code}>
            {`${label} (${code})`}
          </MenuItem>
        ))}
      </TextField>
      <ArrowForwardIcon className='icon' />
      <TextField
        select
        className='input'
        label='自動入力するフィールド'
        value={condition.dst}
        onChange={onDstChange}
        variant='outlined'
      >
        {Object.entries(inputFields).map(([code, { label }], i) => (
          <MenuItem key={i} value={code}>
            {`${label} (${code})`}
          </MenuItem>
        ))}
      </TextField>
    </div>
    <div>
      <FormControlLabel
        control={<Switch checked={condition.updates} onChange={onUpdatesChange} color='primary' />}
        label='レコードが上書きされる度に再計算する'
      />
    </div>
  </div>
);

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

const Container: VFC<ContainerProps> = ({ condition, index }) => {
  const dateFields = useRecoilValue(dateFieldsState);
  const inputFields = useRecoilValue(inputFieldsState);
  const setStorage = useSetRecoilState(storageState);

  const onSrcChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.rows[index].src = e.target.value;
      })
    );
  };
  const onDstChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.rows[index].dst = e.target.value;
      })
    );
  };
  const onUpdatesChange = (_: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.rows[index].updates = checked;
      })
    );
  };

  return (
    <StyledComponent
      {...{ condition, index, dateFields, inputFields, onSrcChange, onDstChange, onUpdatesChange }}
    />
  );
};

export default Container;
