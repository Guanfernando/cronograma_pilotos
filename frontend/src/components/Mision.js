import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const Mision = () => {

    const navigate = useNavigate();

    return(
        <Container className='px-0'>
            <Row style={{ height: "110px" }}>
                <Col className="text mt-4" sm={10}>
                    <h2>Registro de Misiones</h2>
                </Col>
                <Col xs={1}>
                    <Image width={140} src="/flying.png" onClick={() => navigate("/")} />
                </Col>
            </Row>
        </Container>
    )
};
export default Mision;