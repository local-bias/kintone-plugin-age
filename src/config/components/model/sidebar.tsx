import { conditionsState, selectedConditionIdState } from '@/config/states/plugin';
import { getNewCondition } from '@/lib/plugin';
import { PluginCondition } from '@/schema/plugin-config';
import { BundledSidebar } from '@konomi-app/kintone-utilities-react';
import { useSnackbar } from 'notistack';
import React, { FC, useCallback } from 'react';
import { useRecoilCallback, useRecoilState, useRecoilValue } from 'recoil';

const Sidebar: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [conditions, setConditions] = useRecoilState(conditionsState);
  const selectedConditionId = useRecoilValue(selectedConditionIdState);
  const label = useCallback((params: { condition: PluginCondition; index: number }) => {
    const { condition, index } = params;
    return (
      <div>
        <div className='text-[11px] text-gray-400'>{`設定${index + 1}`}</div>
        <div>{condition.dstFieldCode || '未設定'}</div>
      </div>
    );
  }, []);

  const onSelectedConditionChange = useRecoilCallback(
    ({ set }) =>
      (condition: PluginCondition | null) => {
        if (condition === null) {
          set(selectedConditionIdState, null);
          return;
        } else {
          set(selectedConditionIdState, condition.id);
        }
      },
    []
  );

  const onConditionDelete = () => {
    enqueueSnackbar('設定情報を削除しました', { variant: 'success' });
  };

  return (
    <BundledSidebar
      conditions={conditions}
      setConditions={setConditions}
      getNewCondition={getNewCondition}
      labelComponent={label}
      onSelectedConditionChange={onSelectedConditionChange}
      selectedConditionId={selectedConditionId}
      onConditionDelete={onConditionDelete}
    />
  );
};

export default Sidebar;
