//src/components/Dashboard
import React, {useNavigate} from "react-router-dom"
import { Image, Col, Row} from "react-bootstrap";



const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <Row className="mt-5">
            <Col md={{span:4, offset:4}}>
                <Image src= '/icono_piloto.png' width={200} onClick={() => navigate("/api/pilots/")} />
                <Image src= '/icono_listado.png' width={200} onClick={() => navigate("/api/pilotslist/")} />
            </Col>
        </Row>
    )
};
export default Dashboard;