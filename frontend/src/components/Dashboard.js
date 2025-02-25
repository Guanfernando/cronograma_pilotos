//src/components/Dashboard
import React, {useNavigate} from "react-router-dom"
import { Image, Col, Row} from "react-bootstrap";



const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <Row className="mt-5">
            <Col className="text-center">
                <h1>ESCUELA DE AVIACIÓN FLYING</h1>
                <Image src= '/icono_piloto.png' width={120} onClick={() => navigate("/api/pilots/")} />
                <Image src= '/icono_listado.png' width={120} onClick={() => navigate("/api/pilotslist/")} />
                <Image src= '/icono_mision.png' width={120} onClick={() => navigate("/api/mision/")} />
            </Col>
        </Row>
    )
};
export default Dashboard;