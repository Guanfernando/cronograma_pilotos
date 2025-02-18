//src/components/Dashboard
import React, {useNavigate} from "react-router-dom"
import { Image } from "react-bootstrap";



const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="dashboard">
            <div className="dashboard__header">
                <h1>Dashboard</h1>
                <Image src= '/icono_piloto.png' width={200} onClick={() => navigate("/api/pilots/")} />
                <Image src= '/icono_listado.png' width={200} onClick={() => navigate("/api/pilotslist/")} />
            </div>
            <div className="dashboard__content">
                <h2>Content</h2>
                <p>Some content</p>
            </div>
            </div>
    )
};
export default Dashboard;