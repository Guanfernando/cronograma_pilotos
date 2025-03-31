import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import UserForm from "./UserForm";
import InstructorForm from "./InstructorForm";
import StageForm from "./StageForm";
import AirplaneForm from "./AirplaneForm";


const Admin = () => {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState(null);

    const forms = {
        user: <UserForm />,
        instructor: <InstructorForm />,
        stage: <StageForm />,
        airplane: <AirplaneForm />
    }

    
    return (
        <Container className='px-0'>
        <Row style={{ height: "110px" }}>
            <Col className="text mt-4" sm={10}>
                <h2>Administrador</h2>
            </Col>
            <Col xs={1}>
                <Image width={140} src="/flying.png" onClick={() => navigate("/")} />
            </Col>
        </Row>
        <Row style={{ height: "110px" }}>
            <Col>
            <Button onClick={() => setFormulario("user")}>Nuevo Usuario</Button>
            </Col>
            <Col>
            <Button onClick={() => setFormulario("instructor")}>Nuevo Instructor</Button>
            </Col>
            <Col>
            <Button onClick={() => setFormulario("stage")}>Nueva Etapa</Button>
            </Col>
            <Col>
            <Button onClick={() => setFormulario("airplane")}>Nueva Aeronave</Button>
            </Col>
        </Row>
        <Row className="mt-4">
                <Col>{forms[formulario] || null}</Col>
            </Row>
        </Container>
    )
};

export default Admin;