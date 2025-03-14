//src/components/Dashboard
import React from "react";
import { useNavigate } from "react-router-dom";
import { Image, Col, Row, Tooltip, OverlayTrigger } from "react-bootstrap";
// Importa el archivo CSS
import "../Styles.css";

const Dashboard = () => {
    const navigate = useNavigate();

    const renderTooltip = (text) => (
        <Tooltip>{text}</Tooltip>
    );

    return (
        <Row className="mt-3">
            <Col className="text-center">
                <Row>
                    <Col sm={12}>
                        <Image width={300} src="/flying.png"/>
                    </Col>
                </Row>
                <OverlayTrigger placement="top" overlay={renderTooltip('Administrador')}>
                    <Image className="dashboard-icon" src='/icono_administrador.png' width={100} onClick={() => navigate("/api/admin/")} />
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderTooltip('Agregar Piloto')}>
                    <Image className="dashboard-icon" src='/icono_piloto.png' width={100} onClick={() => navigate("/api/pilots/")} />
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderTooltip('Listado de Pilotos')}>
                    <Image className="dashboard-icon" src='/icono_listado.png' width={100} onClick={() => navigate("/api/pilotslist/")} />
                </OverlayTrigger>
                <OverlayTrigger placement="top" overlay={renderTooltip('Agregar Misión')}>
                    <Image className="dashboard-icon" src='/icono_mision.png' width={100} onClick={() => navigate("/api/mision/")} />
                </OverlayTrigger>
            </Col>
        </Row>
    );
};

export default Dashboard;