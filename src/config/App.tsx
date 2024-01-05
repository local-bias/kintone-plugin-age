import React, { Suspense, FC } from 'react';
import { RecoilRoot } from 'recoil';
import { SnackbarProvider } from 'notistack';
import { Form } from './components';
import Footer from './components/model/footer';
import { PluginErrorBoundary } from './components/functional/error-boundary';
import {
  PluginBanner,
  PluginContent,
  PluginLayout,
  PluginConfigProvider,
  Notification,
} from '@konomi-app/kintone-utilities-react';
import { URL_BANNER, URL_PROMOTION } from '@/lib/statics';
import { LoaderWithLabel } from '@konomi-app/ui-react';
import pluginConfig from '../../plugin.config.mjs';

const Component: FC = () => (
  <>
    <RecoilRoot>
      <PluginConfigProvider config={pluginConfig}>
        <PluginErrorBoundary>
          <Notification />
          <SnackbarProvider maxSnack={3}>
            <Suspense fallback={<LoaderWithLabel label='設定情報を取得しています' />}>
              <PluginLayout singleCondition>
                <PluginContent>
                  <Form />
                </PluginContent>
                <PluginBanner url={URL_BANNER} />
                <Footer />
              </PluginLayout>
            </Suspense>
          </SnackbarProvider>
        </PluginErrorBoundary>
      </PluginConfigProvider>
    </RecoilRoot>
    <iframe
      title='promotion'
      loading='lazy'
      src={URL_PROMOTION}
      style={{ border: '0', width: '100%', height: '64px' }}
    />
  </>
);

export default Component;
