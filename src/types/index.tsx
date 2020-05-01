import { List } from 'immutable';

export interface WeatherData {
    iconUrl: string;
    date: Date;
    temperatureInCentigrade: number;
    pressureInMillibars: number;
}

export interface Forecast {
    locationMapUrl: string;
    dailyWeather: List<WeatherData>;
}

export interface Dictionary<T> {
    [key: string]: T;
}