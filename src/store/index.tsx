import { Forecast } from '../types';

export interface StoreState {
    /**
     * Set if an error occurred that the user might want to know about.
     */
    error?: string;
    /**
     * The current location, if any has been set.
     */
    location?: string;
    /**
     * Whether we're currently fetching data for the forecast.
     */
    isFetchingForecast: boolean;
    /**
     * The day of the forecast to display, indexed from 0.
     */
    forecastDayIndex: number;
    /**
     * Whether to use centigrade for the temperature units.
     */
    useCentigrade: boolean;
    /**
     * Forecast data, if we've received any.
     */
    forecast?: Forecast;
}

export function getInitialState(): StoreState {
    return {
        isFetchingForecast: false,
        forecastDayIndex: 0,
        useCentigrade: true,
    };
}