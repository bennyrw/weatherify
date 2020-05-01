import React from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import Search from './views/Search';
import Loading from './views/Loading';
import Results from './views/Results';

import { StoreState } from './store';
import { Forecast } from './types';
import { getText } from './constants';

interface Props {
  isFetchingForecast: boolean;
  forecast?: Forecast;
  errorKey?: string;
}

/**
 * Top level UI component.
 */
function App({ isFetchingForecast, forecast, errorKey }: Props) {
  const styles = useStyles();
  return (
    <Container component="main" maxWidth="xl">
      <Search />
      {errorKey && renderError(errorKey, styles)}
      <div className={styles.resultPanel}>
        {isFetchingForecast && <Loading />}
        {!isFetchingForecast && forecast && <Results />}
      </div>
    </Container>
  );
}

type Styles = any;

function renderError(errorKey: string, styles: Styles) {
  return (
    <div className={styles.error}>
      <Alert severity="error">{getText(errorKey)}</Alert>
    </div>
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
  error: {
    marginTop: theme.spacing(4),
  }
}));

function mapStateToProps({ isFetchingForecast, forecast, errorKey }: StoreState) {
  return {
    isFetchingForecast,
    forecast,
    errorKey,
  }
}

export default connect(mapStateToProps)(App);