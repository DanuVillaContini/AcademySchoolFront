import GridLoyout from "../../components/GridLoyout"

function CursadoScreen() {

    const content = <p>CRUD DETALLES CURSADO</p>;
    const footerContent = <span> FOOTER</span>;

    return (
        <>
            <GridLoyout
                props_content={content}
                props_footer={footerContent} />
        </>
    )
}

export default CursadoScreen