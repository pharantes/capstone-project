import useSWR from "swr";
import { useSession } from "next-auth/react";

const fetcher = (url) =>
    fetch(url, { credentials: "include" }).then((res) => res.json());

export default function FavoriteList() {
    const { data: session, status } = useSession();

    // Only fetch if session is available
    const { data, error } = useSWR(session ? "/api/favorites" : null, fetcher);

    if (status === "loading") return <div>Loading session...</div>;
    if (!session) return <div>Please log in to view your favorites.</div>;
    if (error) return <div>Error loading favorites.</div>;
    if (!data || !data.favorites) return <div>You have no favorites yet.</div>;

    const { toiletIds } = data.favorites;

    return (
        <div>
            <h1>Your Favorites</h1>
            {toiletIds && toiletIds.length > 0 ? (
                <ul>
                    {toiletIds.map((id, index) => (
                        <li key={index}>
                            Toilet ID: {id || "Unknown"} {/* Later replace with full details */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites found.</p>
            )}
        </div>
    );
}
