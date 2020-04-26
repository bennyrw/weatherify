import {List} from 'immutable';

export enum WeatherType {
    SUNNY,
    RAINY,
    SNOWY
    // TODO
}

export interface DailyForecast {
    prevailingWeather: WeatherType;
    date: Date;
    temperatureInCentigrade: number;
    pressureInMillibars: number;
}

export interface Forecast {
    dailyForecasts: List<DailyForecast>
}