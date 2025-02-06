import {Col, Row, Image, Container, Form, Button} from 'react-bootstrap';


const PilotsForm = () => {
    return (
        <Container>
        <Row>
            <Col sm={10}>
            <h1>Registro de Pilotos</h1>
            </Col>
            <Col sm={2}>
            <Image width={180} src="/flying.png"/>
            </Col>
        </Row>
            


        </Container>
    )
};
export default PilotsForm;
