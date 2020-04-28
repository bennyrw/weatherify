import {List} from 'immutable';

export interface DailyForecast {
    weatherIconUrl: string;
    date: Date;
    temperatureInCentigrade: number;
    pressureInMillibars: number;
}

export interface Forecast {
    // todo
    locationMap?: string;
    dailyForecasts: List<DailyForecast>;
}