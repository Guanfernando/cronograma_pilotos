import React, { useEffect, useState } from "react";
import { Table, Alert, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";

const PilotsList = () => {
    const [pilots, setPilots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoader, setShowLoader] =useState(true);

    const fetchPilots = async () => {
        try {
            const response = await axios.get('http://localhost:4000/api/pilotslist');
            setPilots(response.data);
        } catch (error) {
            console.error('❌ Error al obtener pilotos:', error.response || error);
            setError('Error al cargar los datos de los pilotos. Por favor, inténtalo de nuevo.');
        } finally {
            setTimeout(() => {
                setShowLoader(false);
                setLoading(false);
            }, 3000);
        }
    };

    useEffect(() => {
        fetchPilots();
    }, []);

    if (loading && showLoader) {
        return <Loader />; 
    }

    if (error) {
        return (
            <div className="container mt-4">
                <Alert variant="danger">
                    {error}
                    <Button variant="primary" onClick={fetchPilots} className="mt-3">
                        Reintentar
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="px-5">
            <h2 className="mb-4">Información de Pilotos</h2>
            {pilots.length > 0 ? (
                <Table striped bordered hover responsive size="sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombres</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Ciudad</th>
                            <th>Direccion</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {pilots.map((pilot) => (
                            <tr key={pilot.id}>
                                <td>{pilot.id}</td>
                                <td>{`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`}</td>
                                <td>{new Date(pilot.birthday).toLocaleDateString()}</td>
                                <td>{pilot.email}</td>
                                <td>{pilot.telephoneNumber}</td>
                                <td>{pilot.city}</td>
                                <td>{pilot.address}</td>
                                
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <p>No hay pilotos registrados</p>
            )}
        </div>
    );
};

export default PilotsList;