import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Switch,
  TextField,
  Tooltip,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import DeleteIcon from '@material-ui/icons/Delete';

import Footer from './Footer';
import { Config, Row } from '../utils/absolutes';

interface Props {
  config: any;
  fieldProperties: { read(): Promise<any> | void; };
  setConfig: () => any;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {

  },
  configContainer: {

  },
  textInput: {
    margin: theme.spacing(1),
    minWidth: "300px",
  },
  icon: {
    fill: "rgba(0, 0, 0, .3)"
  }
}));

export default (props: any) => {

  const { initConfig, fieldProperties } = props;

  const fields = fieldProperties.read();

  const classes = useStyles();
  const init: Config = Object.keys(initConfig).length ? initConfig : { rows: [getRow()] };

  const [config, setConfig] = React.useState(init);

  const addRow = () => {
    setConfig({ ...config, rows: [...config.rows, getRow()] });

    console.log({ config })
  }

  const deleteRow = (position: number) => {
    config.rows.splice(position, 1);
    setConfig({ ...config });
  }

  const handleSrcChange = (e: any, index: number) => {
    config.rows[index].src = e.target.value;
    setConfig({ ...config });
  }
  const handleDstChange = (e: any, index: number) => {
    config.rows[index].dst = e.target.value;
    setConfig({ ...config });
  }
  const handleUpdateChange = (e: any, index: number) => {
    config.rows[index].updates = e.target.checked;
    setConfig({ ...config });
  }

  return (
    <div className={classes.root}>
      <div className={classes.configContainer}>
        {config.rows.map((input: Row, index: number) => (
          <Grid container key={'inputs' + index} direction="row" justify="flex-start" alignItems="center">
            <TextField
              select
              className={classes.textInput}
              label="年齢の算出元"
              value={input.src}
              onChange={(e) => handleSrcChange(e, index)}
              variant="outlined"
            >
              {fields.dateFields.map((field: any) => (
                <MenuItem key={field.code} value={field.code}>
                  {field.label}
                </MenuItem>
              ))}
            </TextField>
            <ArrowForwardIcon className={classes.icon} />
            <TextField
              select
              className={classes.textInput}
              label="自動入力するフィールド"
              value={input.dst}
              onChange={(e) => handleDstChange(e, index)}
              variant="outlined"
            >
              {fields.inputFields.map((field: any) => (
                <MenuItem key={field.code} value={field.code}>
                  {field.label}
                </MenuItem>
              ))}
            </TextField>
            <FormControlLabel
              control={
                <Switch
                  checked={input.updates}
                  onChange={(e) => handleUpdateChange(e, index)}
                  name="updates"
                  color="primary"
                />
              }
              label="レコードが上書きされる度に最新化する"
            />
            {config.rows.length > 1 && (
              <Tooltip title="行を削除する" aria-label="delete">
                <Button startIcon={<DeleteIcon className={classes.icon} />} onClick={() => deleteRow(index)} />
              </Tooltip>
            )}
          </Grid>
        ))}
        <Button color="primary" onClick={addRow} startIcon={<AddIcon />}>行を追加</Button>
      </div>
      <Footer config={config} />
    </div>
  )
}

const getRow = (): Row => ({ src: "", dst: "", updates: false });