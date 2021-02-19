import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

import * as plugin from '../utils/pluginUtil';
import { Config } from '../utils/absolutes';

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default (props: { config: Config }) => {
  const classes = useStyles();

  const onClickSave = (e: any) => {
    plugin.setConfig(props.config);
  };

  return (
    <div>
      <Button
        className={classes.button}
        variant='contained'
        color='primary'
        onClick={onClickSave}
        startIcon={<SaveIcon />}
      >
        設定を保存
      </Button>
      <Button
        className={classes.button}
        variant='contained'
        onClick={() => history.back()}
        startIcon={<SettingsBackupRestoreIcon />}
      >
        変更しないで戻る
      </Button>
    </div>
  );
};
