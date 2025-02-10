import {Col, Row, Image, Container, Form, Button} from 'react-bootstrap';
import React, {useState} from 'react';


const PilotsForm = ({onSubmit}) => {

    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async  (event) => {
        event.preventDefault();
        const data = {id, firstName, secondName};
         

            try {
                const response = await fetch('http://localhost:4000/api/pilots', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
            });

            if (response.ok) {
                setMessage('Piloto agregado con exito!');
                setId(0);
                setFirstName("");
            } else {
                setMessage('Error al agregar piloto');
            }
            } catch (error) {
                console.error('Error de conexion', error);
                }
    };



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
            <Form onSubmit={handleSubmit}>
                <Row>

                    <Col xs={2} md={2}>
                        <Form.Label>Número Documento*</Form.Label>
                        <Form.Control 
                        type="number" 
                        placeholder="Documento" 
                        required value={id}
                        onChange={(e) => setId  (e.target.value)} />
                    </Col>

                    <Col xs={2} md={2}>
                        <Form.Label>Primer Nombre*</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Primer Nombre" 
                        required value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} />
                    </Col>

                    <Col xs={2} md={2}>
                        <Form.Label>Segundo Nombre</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Segundo Nombre"
                        value={secondName}
                        onChange={(e) => setSecondName(e.target.value)} />
                    </Col>

                </Row>

                    <Button type='submit'>Guardar</Button>
                    {message && <p>{message}</p>}         

            </Form>
        </Container>
    )
};
export default PilotsForm;
