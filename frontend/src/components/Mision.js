/*//src/componenets/Mision.js

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Alert, Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import SheetForm from "./SheetForm";
const Mision = () => {
    const [pilots, setPilots] = useState([]);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");
    const [selectedPilot, setSelectedPilot] = useState(null); // ⬅ Nuevo estado para el piloto seleccionado
    const navigate = useNavigate();

    const handleMissionSubmit = async (formData) => {
        console.log("Formulario enviado:", formData);
        try {
            const response = await fetch ("http://192.168.10.19:4000/api/mision", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                alert("Misión agregada con exito!")
                fetchPilots();
            }else{
                const errorDetail = await response.text();
                console.error("Error del servidor:", errorDetail);
                setError(`Error al agregar Misión: ${errorDetail}`);
            }
        }catch(error){
            console.error("Errorde conexion: ", error);
            setError("No fue posible conectarser al servidor")
        }
    };

    useEffect(() => { 
        fetchPilots();
    }, []);

    
    const fetchPilots = async () => {
        try {
            const response = await fetch("http://192.168.10.19:4000/api/mision");
            if (!response.ok) {
                throw new Error("Error al obtener los datos");
            }
            const data = await response.json();
            console.log(data);
            setPilots(data);
        } catch (error) {
            console.error('❌ Error al obtener pilotos:', error);
            setError('Error al cargar los datos de los pilotos. Por favor, inténtalo de nuevo.');
        }
    };

    const filteredPilots = pilots.filter((pilot) =>
        `${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName} ${pilot.id}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );
    console.log("pilotos cargados", filteredPilots)
    return (
        <Container className='px-0'>
            <Row style={{ height: "110px" }}>
                <Col className="text mt-4" sm={10}> 
                    <h2>Registro de vuelo</h2>
                </Col>
                <Col xs={1}>
                    <Image width={140} src="/flying.png" onClick={() => navigate("/")} />
                </Col>
            </Row>

            <Row style={{ height: "110px" }}>
                <SearchBar search={search} setSearch={setSearch} onSearch={() => setSearch(search)} />
            </Row>

            {error && (
                <Alert variant="danger">
                    {error}
                    <Button variant="primary" onClick={fetchPilots} className="mt-2">
                        Reintentar
                    </Button>
                </Alert>
            )}

           
            {filteredPilots.length > 0 && (
                <Table striped bordered hover responsive size="xs">
                    <thead>
                        <tr>
                            <th>Nombres</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPilots.map((pilot) => (
                            <tr key={pilot.id}>
                                <td>{`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`}</td>
                                <td>
                                    <Button variant= "success" onClick={ () => setSelectedPilot(pilot)}>
                                        Agregar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
            {filteredPilots.length === 1 && selectedPilot && <SheetForm pilot={selectedPilot} onSubmit={handleMissionSubmit} />}

        </Container>
    );
}

export default Mision;*/
