import {Col, Row, Image, Container, Form, Button} from 'react-bootstrap';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';


const PilotsForm = ({onSubmit}) => {

    const [id, setId] = useState(0);
    const [firstName, setFirstName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [firstLastName, setFirstLastName] = useState("");
    const [secondLastName, setSecondLastName] = useState("");
    const [birthday, setBirthday]=useState("");
    const [email, setEmail] = useState("");
    const [nationality, setNationality] = useState("");

    const [message, setMessage] = useState("");


    const navigate = useNavigate();

    const handleSubmit = async  (event) => {
        event.preventDefault();
        const data = {id, firstName, secondName, firstLastName, secondLastName, birthday, email };

    
         

            try {
                const response = await fetch('http://localhost:4000/api/pilots', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
            });

            if (response.ok) {
                  setMessage('Piloto agregado con exito!');
                setId();
                setFirstName("");
            } else {
                setMessage('Error al agregar piloto, verifique todos los campos o si el registro ya existe!');
            }
            } catch (error) {
                console.error('Error de conexion', error);
                }
    };



    return (
        <Container>
        <Row className="xs-1">
            <Col className="text mt-3" sm={10}>
                <h1>Registro de Pilotos</h1>
            </Col>
            <Col xs={1}>  
                <Image width={190} src="/flying.png"  onClick={() => navigate("/")} />
            </Col>
        </Row> 
        <Row>
            <Col sm={12}>
            <h3>Información Personal</h3>
            </Col>
        </Row>
            <Form onSubmit={handleSubmit}>
                
                <Row className="mb-3">
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

                    <Col xs={2} md={2}>
                        <Form.Label>Primer Apellido*</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Primer Apellido" 
                        required value={firstLastName} 
                        onChange={(e) => setFirstLastName(e.target.value)} />
                    </Col>

                    <Col xs={2} md={2}>
                        <Form.Label>Segundo Apellido*</Form.Label>
                        <Form.Control 
                        type="text" 
                        placeholder="Segundo Apellido" 
                        required value={secondLastName} 
                        onChange={(e) => setSecondLastName(e.target.value)} />
                    </Col>

                    <Col xs={2} md={2}>
                        <Form.Label>Fecha de Nacimiento*</Form.Label>
                        <Form.Control 
                        type="date" 
                        placeholder="Fecha de Nacimiento" 
                        required value={birthday} 
                        onChange={(e) => setBirthday(e.target.value)} />
                    </Col>
                </Row>

                <Row className="mb-3">
                <Col xs={2} md={4}>
                        <Form.Label>Correo Electronico*</Form.Label>
                        <Form.Control 
                        type="email" 
                        placeholder="Correo Electronico"
                        required value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                    </Col>
                </Row>

                    <Button type='submit'>Guardar</Button>
                    {message && <p>{message}</p>}         

            </Form>
        </Container>
    )
};
export default PilotsForm;
