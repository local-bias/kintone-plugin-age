import React, { Suspense, VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';

import { restoreStorage } from '@common/plugin';
import { ErrorBoundary } from '@common/components/error-boundary';

import { Footer, Form, SocialIcons } from './components';
import { pluginIdState, storageState } from './states';
import { Loading } from '@common/components/loading';

const Component: VFC<{ pluginId: string }> = ({ pluginId }) => (
  <>
    <RecoilRoot
      initializeState={({ set }) => {
        set(pluginIdState, pluginId);
        set(storageState, restoreStorage(pluginId));
      }}
    >
      <ErrorBoundary>
        <SnackbarProvider maxSnack={3}>
          <Suspense fallback={<Loading label='設定情報を取得しています' />}>
            <Form />
            <Footer />
          </Suspense>
        </SnackbarProvider>
      </ErrorBoundary>
    </RecoilRoot>
    <SocialIcons />
  </>
);

export default Component;
