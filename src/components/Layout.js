const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', paddingBottom: '60px' }}>
            <main>{children}</main>
        </div>
    );
};

export default Layout;