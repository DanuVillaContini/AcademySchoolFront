import GridLoyout from "../../components/GridLoyout"
// import CrudDetail from "../../components/CrudDetail"

// import NavBarCustom from "../../components/NavBarCustom";

function CursadoScreen() {

    
    const sidebarContent = <h2>Sidebar Lateral</h2>;
    const content = <p>Crud</p>;
    const footerContent = <span> FOOTER</span>;
    

    return (
        <>
            <GridLoyout
                props_sidebar={sidebarContent}
                props_content={content}
                props_footer={footerContent} />
        </>
    )
}

export default CursadoScreen