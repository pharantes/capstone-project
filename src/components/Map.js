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
                            <h3>{toilet.name}</h3>
                            <p>{toilet.address}</p>
                        </Popup>
                    </Marker>
                ))
            }
        </MapContainer>
    );
};

export default Map;
