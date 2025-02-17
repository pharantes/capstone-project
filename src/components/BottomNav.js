import Link from "next/link";

const BottomNav = () => {
    return (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: '#fff', boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', zIndex: 100 }}>
            <ul style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
                <li><Link href="/map">Map</Link></li>
                <li><Link href="/favorites">Favorites</Link></li>
                <li><Link href="/settings">Settings</Link></li>
            </ul>
        </div>
    );
};

export default BottomNav;