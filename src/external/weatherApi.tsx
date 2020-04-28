import {Forecast, DailyForecast} from '../types';
import { List } from 'immutable';

export async function getLocationForecast(longitude: number, latitude: number): Promise<Forecast> {
    try {
        const response = await fetch(getRequestUrl(longitude, latitude));
        const json = await response.json();
        const dailyData = json.daily as Array<DailyForecastData>

        return {
            dailyForecasts: List(dailyData.map(parseDailyForecast)),
        };
    } catch (e) {
        throw new Error(`Failed to get weather for location, error: ${e.message}`);
    }
}

type WeatherItem = {
    // icon code for the weather
    icon: string;
}

type DailyForecastData = {
    // unix timestamp of forecast, UTC
    dt: number;
    temp: {
        // temperature during the day time in centigrade
        day: number;
    }
    // atmospheric pressure in millibars
    pressure: number;
    // prevailing weather information (single length array)
    weather: Array<WeatherItem>;

    // many more fields available: https://openweathermap.org/api/one-call-api
}

function parseDailyForecast(dailyData: DailyForecastData): DailyForecast {
    return {
        weatherIconUrl: getIconUrl(dailyData.weather[0].icon),
        date: new Date(dailyData.dt * 1000),
        temperatureInCentigrade: dailyData.temp.day,
        pressureInMillibars: dailyData.pressure,
    }
}

const getIconUrl = (icon: string) =>
    `http://openweathermap.org/img/wn/${icon}@2x.png`;

// In production you'd take more care over this key, e.g. if using an authenticated backend
// of your own, have that make the API call instead of the client JS. Additional options here:
// https://developers.google.com/maps/api-key-best-practices
const API_KEY = 'e56d308d4e223c8749d63fe32d8b8442';
// todo - is it obfuscated in built code?

const getRequestUrl = (longitude: number, latitude: number) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;