import React, { FC, memo } from 'react';
import { useRecoilCallback } from 'recoil';
import { useSnackbar } from 'notistack';
import { PluginConfigResetButton } from '@konomi-app/kintone-utilities-react';
import { storageState } from '../../../states/plugin';
import { createConfig } from '@/lib/plugin';

const Component: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const reset = useRecoilCallback(
    ({ set }) =>
      () => {
        set(storageState, createConfig());
        enqueueSnackbar('設定をリセットしました', { variant: 'success' });
      },
    []
  );

  return <PluginConfigResetButton reset={reset} />;
};

export default memo(Component);
