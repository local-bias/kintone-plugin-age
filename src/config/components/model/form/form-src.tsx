import { Skeleton } from '@mui/material';
import React, { FC, memo, Suspense } from 'react';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import { RecoilFieldSelect } from '@konomi-app/kintone-utilities-react';

import { dateFieldsState } from '../../../states/kintone';
import { srcFieldCodeState } from '../../../states/plugin';

const Component: FC = () => {
  const srcFieldCode = useRecoilValue(srcFieldCodeState);

  const onChange = useRecoilCallback(
    ({ set }) =>
      (fieldCode: string) => {
        set(srcFieldCodeState, fieldCode);
      },
    []
  );

  return <RecoilFieldSelect state={dateFieldsState} onChange={onChange} fieldCode={srcFieldCode} />;
};

const Placeholder: FC = () => <Skeleton variant='rounded' width={400} height={56} />;

const Container: FC = () => (
  <Suspense fallback={<Placeholder />}>
    <Component />
  </Suspense>
);

export default memo(Container);
