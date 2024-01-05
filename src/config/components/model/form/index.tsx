import React, { FC } from 'react';

import {
  PluginFormSection,
  PluginFormTitle,
  PluginFormDescription,
  RecoilSwitch,
} from '@konomi-app/kintone-utilities-react';
import SrcForm from './form-src';
import DstForm from './form-dst';
import DeleteButton from './condition-delete-button';
import { getConditionPropertyState, isUpdateOnSaveState } from '@/config/states/plugin';

const Component: FC = () => (
  <div className='p-4'>
    <PluginFormSection>
      <PluginFormTitle>計算対象とする日付フィールド</PluginFormTitle>
      <PluginFormDescription>
        年齢を計算する対象となる日付フィールドを選択してください。
      </PluginFormDescription>
      <PluginFormDescription last>
        選択できるのは「日付」フィールドと「日時」フィールドのみです。
      </PluginFormDescription>
      <SrcForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>年齢を反映するフィールド</PluginFormTitle>
      <PluginFormDescription>
        日付フィールドをもとに計算した年齢を反映するフィールドを選択してください。
      </PluginFormDescription>
      <PluginFormDescription last>
        選択できるのは「文字列1行」、「数値」、「文字列複数行」、「リッチテキスト」のみです。
      </PluginFormDescription>
      <DstForm />
    </PluginFormSection>
    <PluginFormSection>
      <PluginFormTitle>更新設定</PluginFormTitle>
      <PluginFormDescription>
        レコードを保存する度に、年齢を自動的に更新するかどうかを設定します。
      </PluginFormDescription>
      <PluginFormDescription last>
        設定が無効の場合、年齢は日付フィールドに初めて値が入力された場合のみ更新されます。
      </PluginFormDescription>
      <RecoilSwitch state={isUpdateOnSaveState} label='レコードを保存する度に年齢を更新する' />
    </PluginFormSection>
    <DeleteButton />
  </div>
);

export default Component;
