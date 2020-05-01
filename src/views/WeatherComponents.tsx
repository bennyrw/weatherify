import React from 'react';
import { connect } from 'react-redux';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import { StoreState } from '../store';
import { changeUnits } from '../actions';
import { Forecast, WeatherData } from '../types';

interface Props {
  isSmallScreen: boolean;
  forecast?: Forecast;
  forecastDayIndex: number;
  useCentigrade: boolean;
  onToggleUnits: (useCentigrade: boolean) => void;
}

const CENTIGRADE_LABEL = '°C';
const FAHRENHEIT_LABEL = '°F';

function WeatherComponents(props: Props) {
  const { isSmallScreen, forecast, forecastDayIndex, useCentigrade } = props;

  if (!forecast) {
    return null;
  }

  const dailyWeather = forecast.dailyWeather.get(forecastDayIndex) as WeatherData;
  const convertToFahrenheit = (centigrade: number) => (centigrade * 9 / 5) + 32;
  const formatTo1dp = (n : number) => Math.round(10 * n) / 10;
  const temperatureValue = useCentigrade ?
    formatTo1dp(dailyWeather.temperatureInCentigrade) :
    formatTo1dp(convertToFahrenheit(dailyWeather.temperatureInCentigrade));
  const pressure = `${dailyWeather.pressureInMillibars} mB`;

  // layout varies based on screen width
  return (
    <Container>
      <Grid container>
        {!isSmallScreen && renderTemperatureUnitsToggleGridItem(props)}
        <Grid item xs={isSmallScreen ? 6 : 12}>
          <Grid container justify="center">
            <img alt="weather icon" src={dailyWeather.iconUrl} width="50%"/>
          </Grid>
        </Grid>
        <Grid item xs={isSmallScreen ? 6 : 12}>
          <Grid container justify="center" alignItems="center" spacing={3} direction={isSmallScreen ? 'column' : 'row'}>
            <Grid item>
              <Typography>{temperatureValue} {useCentigrade ? CENTIGRADE_LABEL : FAHRENHEIT_LABEL}</Typography>
            </Grid>
            <Grid item>
              <Typography>{pressure}</Typography>
            </Grid>
            {isSmallScreen && renderTemperatureUnitsToggleGridItem(props)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

function renderTemperatureUnitsToggleGridItem({ useCentigrade, onToggleUnits }: Props) {
  const unitsOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const useCentigrade = e.target.checked;
    onToggleUnits(useCentigrade);
  }

  const temperatureUnitsLabel = useCentigrade ? CENTIGRADE_LABEL : FAHRENHEIT_LABEL;
  return (
    <Grid item xs={12}>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>
          <Switch checked={useCentigrade} onChange={unitsOnChange} />
        </Grid>
        <Grid item>
          <Typography>{temperatureUnitsLabel}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapStateToProps({ forecast, forecastDayIndex, useCentigrade }: StoreState) {
  return {
    forecast,
    forecastDayIndex,
    useCentigrade,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onToggleUnits: (useCentigrade: boolean) => dispatch(changeUnits(useCentigrade)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherComponents);