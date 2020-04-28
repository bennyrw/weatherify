const ZOOM_LEVEL = 12;

/**
 * Get a URL that corresponds to a map of the given longitude and latitude and is
 * suitable for use in an <img> src attribute.
 * @param longitude 
 * @param latitude 
 * @return URL, currently a blob but could alternatively be a base64 image.
 */
export async function getLocationMapURL(longitude: number, latitude: number): Promise<string> {
    try {
        const {x, y, z} = getTileInfo(longitude, latitude, ZOOM_LEVEL);

        const response = await fetch(getRequestUrl(x, y, z));
        const blob = await response.blob();
        // blob will persist for this session
        return URL.createObjectURL(blob);
    } catch (e) {
        throw new Error(`Error occurred getting location map: ${e.message}`);
    }
}

// https://wiki.openstreetmap.org/wiki/Tiles
const getRequestUrl = (x: number, y: number, z: number) =>
    `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;

/**
 * Get the tile x & y co-ordinates for a given longitude and latitude
 */
function getTileInfo(longitude: number, latitude: number, zoom: number) {
    return {
        x: long2tile(longitude, zoom),
        y: lat2tile(latitude, zoom),
        z: zoom,
    }
}

// OSM helper methods from https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
function long2tile(longitude: number, zoom: number) {
    return Math.floor((longitude + 180) / 360 * Math.pow(2, zoom));
}
function lat2tile(latitude: number, zoom: number) {
    return Math.floor(
        (1 - Math.log(Math.tan(latitude * Math.PI / 180) + 1
        /
        Math.cos(latitude * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)
    );
}
