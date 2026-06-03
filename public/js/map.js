const lng = coordinates[0];
const lat = coordinates[1];

const map = L.map("map").setView([lat, lng], 13);

L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution:
            "&copy; OpenStreetMap contributors",
        
    }
).addTo(map);

L.marker([lat, lng])
    .addTo(map)
    .bindPopup(listingTitle)
    .openPopup();

L.circle([lat, lng], {
    radius: 500,
    color: "#4A90E2",          // border color
    fillColor: "#4A90E2",
    fillOpacity: 0.2,
    weight: 3,             // border thickness
}).addTo(map);