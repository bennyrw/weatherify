import React from 'react';
import {connect} from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Search from './views/Search';
import Loading from './views/Loading';
import Results from './views/Results';

import {StoreState} from './store';
import { Forecast } from './types';

interface Props {
  isFetchingForecast: boolean;
  forecast?: Forecast;
}

function App({isFetchingForecast, forecast}: Props) {
  const styles = useStyles();
  return (
    <Container component="main" maxWidth="xl">
      <Search/>
      <div className={styles.resultPanel}>
        {isFetchingForecast && <Loading/>}
        {!isFetchingForecast && forecast && <Results/>}
      </div>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  resultPanel: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: 'hidden',
  },
}));

function mapStateToProps({isFetchingForecast, forecast}: StoreState) {
  return {
    isFetchingForecast,
    forecast,
  }
}

export default connect(mapStateToProps)(App);