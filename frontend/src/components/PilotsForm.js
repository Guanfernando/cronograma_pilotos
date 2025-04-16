import { Col, Row, Image, Container, Form, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PilotsForm = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Convertir formulario a objeto directamente
        const formData = Object.fromEntries(new FormData(event.target));
        
        try {
            const response = await fetch('http://192.168.10.19:4000/api/pilots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setMessage('Piloto agregado con éxito!');
                event.target.reset();
            } else {
                setMessage('Error al agregar piloto, verifique todos los campos o si el registro ya existe!');
            }
        } catch (error) {
            console.error('Error de conexión', error);
            setMessage('Error de conexión con el servidor');
        }
    };

    return (
        <Container className='px-0'>
            <Row style={{ height: "110px" }}>
                <Col className="text mt-4" sm={10}>
                    <h2>Registro de Estudiantes / Pilotos</h2>
                    <h5>Información Personal</h5>
                </Col>
                <Col xs={1}>
                    <Image width={140} src="/flying.png" onClick={() => navigate("/")} />
                </Col>
            </Row>
  
            <Form onSubmit={handleSubmit}>
                <Row className="mb-1">
                    <Col xs={2} md={2}>
                        <Form.Label>Tipo Documento</Form.Label>
                        <Form.Select name="idType" required>
                            <option value="">Seleccione</option>
                            <option value="CC">Cédula Ciudadanía</option>
                            <option value="CE">Cédula Extranjería</option>
                            <option value="P">Pasaporte</option>
                            <option value="TI">Tarjeta de Identidad</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Número Documento*</Form.Label>
                        <Form.Control type="number" name="id" placeholder="Documento" required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Primer Nombre*</Form.Label>
                        <Form.Control type="text" name="firstName" placeholder="Primer Nombre" required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Segundo Nombre</Form.Label>
                        <Form.Control type="text" name="secondName" placeholder="Segundo Nombre" />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Primer Apellido*</Form.Label>
                        <Form.Control type="text" name="firstLastName" placeholder="Primer Apellido" required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Segundo Apellido*</Form.Label>
                        <Form.Control type="text" name="secondLastName" placeholder="Segundo Apellido" />
                    </Col>
                </Row>

                <Row className="mb-1">
                    <Col xs={12} md={4}>
                        <Form.Label>Correo Electrónico*</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Correo Electrónico" required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Teléfono*</Form.Label>
                        <Form.Control type="number" name="telephoneNumber" placeholder="Teléfono" required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Ciudad*</Form.Label>
                        <Form.Control type="text" name="city" placeholder="Ciudad" required />
                    </Col>

                    <Col xs={12} md={4}>
                        <Form.Label>Dirección*</Form.Label>
                        <Form.Control type="text" name="address" placeholder="Dirección Domicilio" required />
                    </Col>
                    </Row>

                    <Row className="mb-1">
                    <Col xs={12} md={2}>
                        <Form.Label>Fecha de Nacimiento*</Form.Label>
                        <Form.Control type="date" name="birthday" required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Rh*</Form.Label>
                        <Form.Select name="rh" required>
                            <option value="">Seleccione</option>
                            <option value="O+">O +</option>
                            <option value="O-">O -</option>
                            <option value="A+">A +</option>
                            <option value="A-">A -</option>
                            <option value="B+">B +</option>
                            <option value="B-">B -</option>
                            <option value="AB+">AB +</option>
                            <option value="AB-">AB -</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Peso en Kg.*</Form.Label>
                        <Form.Control type="number" name="weight" placeholder="Peso en Kg." required />
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>EPS*</Form.Label>
                        <Form.Control type="text" name="eps" placeholder="EPS" required />
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col xs={12} md={3}>
                        <Form.Label>Contacto de Emergencia</Form.Label>
                        <Form.Control type="text" name="emergencyContact" placeholder="Nombre" required />
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="number" name="emergencyNumber" placeholder="Telefono" required />
                    </Col>
                </Row>
                <Row className="mb-3">
                    <h5>Información Académica / Profesional</h5>
                </Row>

                <Row className="mb-1">
                    <Col xs={12} md={2}>
                        <Form.Label>Tipo de Licencia</Form.Label>
                        <Form.Select name="licenseType" required>
                            <option value="">Seleccione</option>
                            <option value="PCA">PCA</option>
                            <option value="PPA">PPA</option>
                            <option value="PCH">PCH</option>
                            <option value="PPH">PPH</option>
                        </Form.Select>
                    </Col>

                    <Col xs={12} md={2}>
                        <Form.Label>Numero de Licencia*</Form.Label>
                        <Form.Control type="number" name="licenseNumber" placeholder="Numero Licencia" required />
                    </Col>
                    <Col xs={12} md={2}>
                        <Form.Label>Certificado Médico*</Form.Label>
                        <Form.Control type="date" name="medicalCertificate" required />
                        <Form.Label>Fecha de Vencimiento*</Form.Label>
                        <Form.Control type="date" name="certificateExpiration" required />
                    </Col>

                    {/*<Col xs={2} md={2}>
                        <Form.Label>Primer Apellido*</Form.Label>
                        <Form.Control type="text" name="firstLastName" placeholder="Primer Apellido" required />
                    </Col>

                    <Col xs={2} md={2}>
                        <Form.Label>Segundo Apellido*</Form.Label>
                        <Form.Control type="text" name="secondLastName" placeholder="Segundo Apellido" required />
                    </Col>*/}
                </Row>


                <Button type='submit'>Guardar</Button>
                
                {message && <p>{message}</p>}
            </Form>
        </Container>
    );
};

export default PilotsForm;
