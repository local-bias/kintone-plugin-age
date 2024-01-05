import { Skeleton } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { RecoilFieldSelect } from '@konomi-app/kintone-utilities-react';

import { textFieldsState } from '../../../states/kintone';
import { dstFieldCodeState } from '../../../states/plugin';

const Component: FC = () => {
  const dstFieldCode = useRecoilValue(dstFieldCodeState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (fieldCode: string) => {
        set(dstFieldCodeState, fieldCode);
      },
    []
  );

  return <RecoilFieldSelect state={textFieldsState} onChange={onChange} fieldCode={dstFieldCode} />;
};

const Placeholder: FC = () => <Skeleton variant='rounded' width={400} height={56} />;

const Container: FC = () => (
  <Suspense fallback={<Placeholder />}>
    <Component />
  </Suspense>
);

export default memo(Container);
