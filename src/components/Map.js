import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
const position = [52.52, 13.405]; // Berlin center

// Custom marker icon
const toiletIcon = new L.Icon({
    iconUrl: "/poo.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});
const Map = ({ toiletsData = [] }) => {


    return (
        <MapContainer center={position} zoom={12} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
                toiletsData.map((toilet) => (
                    <Marker key={toilet.id} position={[toilet.lat, toilet.lon]} icon={toiletIcon}>
                        <Popup>
                            <h3>Name: {toilet.name}</h3>
                            <span>Description: {toilet.description}</span><br />
                            <span>Access: {toilet.access}</span><br />
                            <span>Address: {toilet.address}</span><br />
                            <span>Fee: {toilet.fee}</span><br />
                            <span>Charge: {toilet.charge}</span><br />
                            <span>Male: {toilet.male}</span><br />
                            <span>Female: {toilet.female}</span><br />
                            <span>Unisex: {toilet.unisex}</span><br />
                            <span>Wheelchair: {toilet.wheelchair}</span><br />

                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};

export default Map;
