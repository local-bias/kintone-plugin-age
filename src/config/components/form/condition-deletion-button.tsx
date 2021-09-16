import React, { VFC } from 'react';
import { useSetRecoilState } from 'recoil';
import { produce } from 'immer';
import { IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { storageState } from '../../states';

type ContainerProps = Readonly<{ index: number }>;
type Props = Readonly<{ onClick: () => void }>;

const Component: VFC<Props> = ({ onClick }) => (
  <Tooltip title='この設定を削除する'>
    <IconButton {...{ onClick }}>
      <DeleteIcon fontSize='small' />
    </IconButton>
  </Tooltip>
);

const Container: VFC<ContainerProps> = ({ index }) => {
  const setStorage = useSetRecoilState(storageState);

  const onClick = () => {
    setStorage((_, _storage = _!) =>
      produce(_storage, (draft) => {
        draft.rows.splice(index, 1);
      })
    );
  };

  return <Component {...{ onClick }} />;
};

export default Container;
