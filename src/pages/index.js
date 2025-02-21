import { useRouter } from "next/router";
import useSWR from "swr";
import dynamic from "next/dynamic";

// Dynamically import Map component to prevent SSR issues
const Map = dynamic(() => import("../components/Map"), { ssr: false });

const MapPage = () => {
    const router = useRouter();

    // Fetch toilets data
    const fetchToilets = async () => {
        const query = `[out:json];
          area["name"="Berlin"]->.searchArea;
          (
            node["amenity"="toilets"](area.searchArea);
          );
          out body;`;

        const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        return data.elements.map((element) => ({
            lat: element.lat,
            lon: element.lon,
            name: element.tags.name || "No given name",
            description: element.tags.description || "No given description",
            address: element.tags.addr || "No address information",
            access: element.tags.access || "No access information",
            fee: element.tags.fee || "No fee information",
            charge: element.tags.charge || "No charge information",
            male: element.tags.male || "No information",
            female: element.tags.female || "No information",
            unisex: element.tags.unisex || "No information",
            wheelchair: element.tags.wheelchair || "No information",
        }));
    };

    const { data, error } = useSWR("toiletsData", fetchToilets);

    if (error) return <div>Error loading toilets</div>;
    if (!data) return <div>Loading toilets...</div>;

    return (
        <div>
            <h1>Public Toilets Map</h1>
            <Map toiletsData={data} />
        </div>
    );
};

export default MapPage;
