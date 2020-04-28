/**
 * Get the longitude and latitude for a given location.
 * Returns null if the location isn't found.
 */
export async function getCoordinatesForLocation(location: string): Promise<Coordinates | null> {
    let error;
    try {
        const response = await fetch(getRequestUrl(location));
        const json = await response.json();
        if (json.length == 1) {
            return {
                longitude: Number(json[0].lon),
                latitude: Number(json[0].lat),
            };
        } else {
            return null;
        }
    } catch (e) {
        error = e.message;
    }

    throw new Error(`Failed to find coordinates for location ${location}${error ? ", error: " + error : ''}`);
}

export type Coordinates = {
    longitude: number;
    latitude: number;
}

// https://nominatim.org/release-docs/develop/api/Search/
const getRequestUrl = (location: string) =>
`https://nominatim.openstreetmap.org/search?q=${encodeURI(location)}&format=json&limit=1`;