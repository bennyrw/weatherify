import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Slider, { Mark } from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { StoreState } from '../store';
import { Forecast } from '../types';
import WeatherComponents from './WeatherComponents';
import { changeDay } from '../actions';

interface Props {
  forecast?: Forecast;
  forecastDayIndex: number;
  onChangeDay: (daysInFuture: number) => void;
}

function ResultsPanel(props: Props) {
  const { forecast } = props;
  // todo - is this best practice?
  const isSmallScreen = !useMediaQuery('(min-width:800px)');
  const styles = useStyles();

  if (!forecast) {
    return null;
  }

  const map = <img src={forecast.locationMapUrl} width="100%" />;

  // layout varies based on screen width
  if (isSmallScreen) {
    return (
      <Container>
        <WeatherComponents isSmallScreen={isSmallScreen} />
        {renderChangeDaySlider(props, styles)}
        {map}
      </Container>
    );
  } else {
    return (
      <Container>
        <Grid container justify="center" direction="row">
          <Grid item xs={6}>
            {map}
          </Grid>
          <Grid item xs={6}>
            <WeatherComponents isSmallScreen={isSmallScreen} />
          </Grid>
        </Grid>
        {renderChangeDaySlider(props, styles)}
      </Container>
    );
  }
}

type Styles = any;

function renderChangeDaySlider({ forecast, forecastDayIndex, onChangeDay }: Props, styles: Styles) {
  const sliderOnChange = (e: React.ChangeEvent<{}>, value: number | number[]) => {
    const dayIndex = value instanceof Array ? value[0] : value;
    onChangeDay(dayIndex);
  }

  // cast as it won't be undefined here as we've checked earlier
  const dailyWeather = (forecast as Forecast).dailyWeather;
  let dayIndex = 0;
  const marks: List<Mark> = dailyWeather.map(weatherData => {
    // todo not localised
    const day = dayIndex === 0 ?
      'Now' :
      weatherData.date.toLocaleString('en-us', { weekday: 'short' });
    return {
      value: dayIndex++,
      label: <Typography>{day}</Typography>
    }
  });

  return <Slider
    className={styles.slider}
    aria-label='change day'
    marks={marks.toArray()}
    min={0}
    max={dailyWeather.size - 1}
    onChange={sliderOnChange}
    value={forecastDayIndex} />;
}

const useStyles = makeStyles((theme) => ({
  slider: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(6),
  },
}));

function mapStateToProps({ forecast, forecastDayIndex }: StoreState) {
  return {
    forecast,
    forecastDayIndex,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onChangeDay: (daysInFuture: number) => dispatch(changeDay(daysInFuture)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsPanel);