import {Col, Row, Image, Container, Form, Button} from 'react-bootstrap';
import React, {useState, useEffect} from 'react';


const PilotsForm = () => {

    const [id, setId] = useState(0);
    const [name, setName] = useState("");


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            id: id,
            name: name
            };
            
    }



    return (
        <Container>
        <Row>
            <Col className="text mt-5" sm={10}>
                <h1>Registro de Pilotos</h1>
            </Col>
            <Col sm={2}>  
                <Image width={190} src="/flying.png"/>
            </Col>
        </Row> 
        <Row>
            <Col sm={12}>
            <h3>Información Personal</h3>
            </Col>
        </Row>
        <Row>
            <Col xs={2} md={2}>
                <Form.Label>Número Documento*</Form.Label>
                <Form.Control type="number" placeholder="Documento" required value={id} onChange={(e) => setId(e.target.value)} />
            </Col>
            <Col xs={2} md={3}>
            <Form.Label>Primer Nombre*</Form.Label>
            <Form.Control type="text" placeholder="Primer Nombre" required value={name} onChange={(e) => setName(e.target.value)} />
            </Col>
        </Row>

            <Button onClick={handleSubmit}>Guardar</Button>            


        </Container>
    )
};
export default PilotsForm;
