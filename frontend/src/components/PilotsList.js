//src/components/PilotsList.js
import React, { useEffect, useState } from "react";
import { Table, Alert, Button, Col, Image, Row } from "react-bootstrap";
import Loader from "./Loader";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const PilotsList = () => {
    const [pilots, setPilots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showLoader, setShowLoader] = useState(true);
    const [pilotosFiltrados, setPilotosFiltrados] = useState([]);
    const navigate = useNavigate();

    // Función para manejar la búsqueda
    const handleSearch = (query) => {
        if (!query) {
            setPilotosFiltrados(pilots); // Si no hay búsqueda, mostrar todos
            return;
        }
        const resultados = pilots.filter((pilot) =>
            `${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName} ${pilot.id}`
                .toLowerCase()
                .includes(query.toLowerCase())
        );
        setPilotosFiltrados(resultados);
    };

    // Función para exportar datos a Excel
    const handleExportExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(pilotosFiltrados.length > 0 ? pilotosFiltrados : pilots);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "PilotsList");

        // Guardar el archivo
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
        saveAs(data, "PilotsList.xlsx");
    };

    // Función para obtener pilotos
    const fetchPilots = async () => {
        try {
            const response = await fetch('http://localhost:4000/api/pilotslist');
            if (!response.ok){
                throw new Error("Error al obtener los datos");
            }
            const data = await response.json();
            setPilots(data);
            setPilotosFiltrados(data);
        } catch (error) {
            console.error('❌ Error al obtener pilotos:', error);
            setError('Error al cargar los datos de los pilotos. Por favor, inténtalo de nuevo.');
        } finally {
            setTimeout(() => {
                setShowLoader(false);
                setLoading(false);
            }, 2000);
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
                    <Button variant="primary" onClick={fetchPilots} className="mt-8">
                        Reintentar
                    </Button>
                </Alert>
            </div>
        );
    }

    return (
        <div className="px-5">
            <Row style={{ height: "110px" }}>
                <Col className="text mt-4" sm={10}>
                    <h2>Información de Estudiantes/Pilotos</h2>
                </Col>
                <Col xs={1}>
                    <Image width={140} src="/flying.png" onClick={() => navigate("/")} />
                </Col>
            </Row>
            <Row style={{ height: "110px" }}>
            <SearchBar onSearch={handleSearch} />
            </Row>
            {pilotosFiltrados.length > 0 ? (
                <>
                    <Table striped bordered hover responsive size="xs">
                        <thead>
                            <tr>
                                <th>Tipo ID</th>
                                <th>ID</th>
                                <th>Nombres</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Ciudad</th>
                                <th>Dirección</th>
                                <th>Fecha de Nacimiento</th>
                                <th>Rh</th>
                                <th>Peso Kg.</th>
                                <th>EPS</th>
                                <th>Contacto de Emergencia</th>
                                <th>Telefono de Emergencia</th>
                                <th>Typo Licencia</th>
                                <th>Numero Licencia</th>
                                <th>Fecha Certificado Médico</th>
                                <th>Vencimiento Certificado</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            {pilotosFiltrados.map((pilot) => (
                                
                                <tr key={pilot.id}>
            
                                    <td>{pilot.idType}</td>
                                    <td>{pilot.id}</td>
                                    <td>{`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`}</td>
                                    <td>{pilot.email}</td>
                                    <td>{pilot.telephoneNumber}</td>
                                    <td>{pilot.city}</td>
                                    <td>{pilot.address}</td>
                                    <td>{new Date(pilot.birthday).toLocaleDateString()}</td>
                                    <td>{pilot.rh}</td>
                                    <td>{pilot.weight}</td>
                                    <td>{pilot.eps}</td>
                                    <td>{pilot.emergencyContact}</td>
                                    <td>{pilot.emergencyNumber}</td>
                                    <td>{pilot.licenseType}</td>
                                    <td>{pilot.licenseNumber}</td>
                                    <td>{pilot.medicalCertificate}</td>
                                    <td>{pilot.certificateExpiration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Button onClick={handleExportExcel} style={{ marginBottom: "5px" }}>Convertir a XLSX</Button>
                </>
            ) : (
                <p>No hay pilotos registrados</p>
            )}
        </div>
    );
};

export default PilotsList;
