import { Container, Table } from "react-bootstrap"


function CrudDetail() {




    return (
        <>
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Materia</th>
                            <th>Nota Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* debo hacer la funcionalidad para que un <td> mapee la materia y el otro td mapee la nota */}
                        <tr>
                            <td>Matematicas</td>
                            <td>8.5</td>
                        </tr>
                        <tr>
                            <td>Historia</td>
                            <td>7.2</td>
                        </tr>
                        <tr>
                            <td>Ciencias</td>
                            <td>9.0</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </>
    )
}

export default CrudDetail
