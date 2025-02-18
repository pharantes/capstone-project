import BottomNav from "./BottomNav";

const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
            <main>{children}</main>
            <BottomNav />
        </div>
    );
};

export default Layout;