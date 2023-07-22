import GridLoyout from "../../components/GridLoyout"
// import NavBarCustom from "../../components/NavBarCustom";

function CursadoScreen() {

    const navbarContent = <h1>Navbar</h1>;
    const sidebarContent = <h2>Sidebar Lateral</h2>;
    const content = <p>Main Content (CRUD)</p>;
    const footerContent = <span> FOOTER</span>;

    return (
        <>
            <GridLoyout props_navbar={navbarContent}
                props_sidebar={sidebarContent}
                props_content={content}
                props_footer={footerContent} />
        </>
    )
}

export default CursadoScreen
