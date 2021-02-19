import React from 'react';

import { Fab, Tooltip } from '@material-ui/core';

import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles, Theme } from '@material-ui/core/styles';

import blueGrey from '@material-ui/core/colors/blueGrey';

const URL_HOMEPAGE = 'https://localbias.work';
const URL_TWITTER = 'https://twitter.com/LbRibbit';
const URL_GITHUB = 'https://github.com/Local-Bias?tab=repositories';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  fab: {
    color: blueGrey[100],
    boxShadow: 'none',
  },
  icon: {
    color: blueGrey[400],
  },
}));

export default () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Tooltip title='ホームページ' aria-label='Homepage'>
        <Fab className={classes.fab} aria-label='Homepage' onClick={() => openNewTab(URL_HOMEPAGE)}>
          <HomeIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Tooltip title='ツイッター' aria-label='Twitter' onClick={() => openNewTab(URL_TWITTER)}>
        <Fab className={classes.fab} aria-label='Twitter'>
          <TwitterIcon className={classes.icon} />
        </Fab>
      </Tooltip>
      <Tooltip title='GitHub' aria-label='GitHub'>
        <Fab className={classes.fab} aria-label='GitHub' onClick={() => openNewTab(URL_GITHUB)}>
          <GitHubIcon className={classes.icon} />
        </Fab>
      </Tooltip>
    </div>
  );
};

const openNewTab = (path: any) => window.open(path, '_blank');
