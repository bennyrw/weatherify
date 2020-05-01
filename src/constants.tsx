import { Dictionary } from './types';

/**
 * Toggle various debugging behaviours. Useful when getting layout right while the app is in particular states.
 */
export const DEBUG = {
    MOCK_LOADING: false,
    MOCK_FORECAST: false,
    MOCK_ERROR: false,
}

/**
 * The current locale. In future, could be set by user, taken from Accept Language header, etc.
 */
export const LOCALE = 'en-GB';

/**
 * Translation database. Each language could be stored as a separate JSON file.
 * For each locale, keys imply the semantics of the message.
 */
const TEXT: Dictionary<Dictionary<string>> = {
    'en-GB': {
        'fetch-general-error': 'A problem occurred. Please try again.',
        'fetch-location-not-found': "Sorry, we couldn't find that location. Please try again.",
        'now': 'Now'
    }
};

/**
 * Get the tranlsation for a given semantic message key.
 * @param key The message key/identifier.
 * @param locale The locale to use.
 */
export const getText = (key: string, locale = LOCALE) => TEXT[locale] && TEXT[locale][key];