import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Icon from "./Icon";
const StyledDiv = styled.div`
display: flex;
justify-content: space-between;
`;

const position = [52.52, 13.405]; // Berlin center

// Custom marker icon
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet properly
import "leaflet/dist/leaflet.css"; // Import Leaflet CSS
const toiletIcon = new L.Icon({
    iconUrl: "/poo.svg",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
});


async function onToggleFavorite(id) {
    try {
        const response = await fetch("/api/favorites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ toiletId: id }),
        });

        if (!response.ok) {
            throw new Error("Failed to update favorite status");
        }

        const data = await response.json();
    } catch (error) {
        console.error("Error toggling favorite:", error);
    }
}
const Map = ({ toiletsData = [] }) => {

    return (
        <MapContainer center={position} zoom={12} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {
                toiletsData.map((toilet, index) => (
                    <Marker key={toilet.id || index} position={[toilet.lat, toilet.lon]} icon={toiletIcon}>
                        <Popup>
                            <StyledDiv>
                                <h3>Name: {toilet.name}</h3>
                                <Icon id={toilet.id} onToggleFavorite={onToggleFavorite} />
                            </StyledDiv>
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

