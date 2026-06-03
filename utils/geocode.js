async function getCoordinates(location) {

    const apiKey = process.env.GEOAPIFY_API_KEY;

    const url =
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(location)}&apiKey=${apiKey}`;

    const response = await fetch(url);

    const data = await response.json();

    console.log("Location:", location);
    console.log(data);

    if (!data.features || data.features.length === 0) {
        throw new Error(`Location not found: ${location}`);
    }

    return {
        longitude: data.features[0].geometry.coordinates[0],
        latitude: data.features[0].geometry.coordinates[1],
    };
}

module.exports = getCoordinates;