// compoenente para el formulario de misiones enlazado al componente Mision.js
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const SheetForm = ({pilot, onSubmit}) => {
    const [sheetId, setsheetId] = useState("");
    const [misionDate, setMisionDate] = useState("");
    const [airplaneList, setAirplaneList] = useState([]);
    const [airplane, setAirplane] = useState("");
    const [description, setDescription] = useState("");
    const [initialFuel, setInitialFuel] = useState("");
    const [finalFuel, setFinalFuel] = useState("");
    const [fuelConsumption, setFuelConsumption] = useState("");
    const [instructor, setInstructor] = useState("");
    const [startTime, setStartTime] = useState("");
    const [finalTime, setFinalTime] = useState("");
    const [fuelLoad, setFuelLoad] = useState("");
    
    //funcion para cargar la lista de aeronaves
    useEffect(() => {
        const fetchAirplaneList = async () => {
            try {
                const response = await axios.get("http://localhost:4000/api/airplane");
                setAirplaneList(response.data); 
            } catch (error) {
                console.error("Datos no encontrados", error);
            }
        };
        fetchAirplaneList();

    }, [])



    //funcion para cambiar la descripcion de la aeronave
    const handleAirplaneChange = async (event) => {
       const selectedAirplane = event.target.value;
       setAirplane(selectedAirplane);
       if (selectedAirplane) {       
            try {
                const response = await axios.get(`http://localhost:4000/api/airplane/${selectedAirplane}`)
                setDescription(response.data.airplaneModel);
            } catch (error) {
                console.error("Error al obtener la descripción de la aeronave:", error);
            }
       } else { 
        setDescription("");
       }
    }

    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            pilotId: pilot.id,
            sheetId,
            misionDate,
            airplane,
            description,
            initialFuel,
            finalFuel,
            fuelConsumption,
            instructor,
            startTime,
            finalTime,
            fuelLoad,
        };
        console.log(formData);
        onSubmit(formData);

        // Limpiar el formulario
        setsheetId("");
        setMisionDate("");
        setAirplane("");
        setDescription("");
        setInitialFuel("");
        setFinalFuel("");
        setFuelConsumption("");
        setInstructor("");
        setStartTime("");
        setFinalTime("");
        setFuelLoad("");
    };
    console.log("Datos del piloto:", pilot);


    return (
        <Container>
        <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
        <Col xs={1} md={1}>

            <Form.Label>Nro.*</Form.Label>
            <Form.Control type="number" value={sheetId} onChange={(e) => setsheetId(e.target.value)} placeholder="Hoja #" required />
        </Col>

        <Col xs={2} md={2}>
            <Form.Label>Fecha*</Form.Label>
            <Form.Control type="Date" value={misionDate} onChange={(e) => setMisionDate(e.target.value)} required />
        </Col>
        <Col xs={2} md={2}>
            <Form.Label>Aeronave*</Form.Label>
                <Form.Select value={airplane} onChange={handleAirplaneChange} required>
                    <option value="">Seleccione</option>
                    {airplaneList.map((plane) => (<option key={plane.airplaneId} value={plane.airplaneId}>{plane.airplaneId}</option>))}
                </Form.Select>
        </Col>
        <Col xs={2} md={3}>
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" value={description} disabled />
        </Col>
        <Col xs={2} md={1}>
            <Form.Label>GLS Inicial</Form.Label>
            <Form.Control type="number" name="initialFuel" required />
        </Col>
        <Col xs={2} md={1}>
            <Form.Label>GLS Final</Form.Label>
            <Form.Control type="number" name="finalFuel" required />
        </Col>
        <Col xs={2} md={1}>
            <Form.Label>Carga GLS</Form.Label>
            <Form.Control type="number" name="fuelLoad" required />
        </Col>
        <Col xs={2} md={1}>
            <Form.Label>Consumo</Form.Label>
            <Form.Control type="number" name={fuelConsumption} required/>
        </Col>
        </Row>
        <Row className="mb-3">
            <Col xs={2} md={2}>
            <Form.Label>Hora inicio</Form.Label>
            <Form.Control type="time" name="startTime" required />
            </Col>
            <Col xs={2} md={2}>
            <Form.Label>Hora Fin</Form.Label>
            <Form.Control type="time" name="finalTime" required />
            </Col>

            </Row>
       
        <Col>
        <Button variant="primary" type="submit">
            Guardar
        </Button>
        </Col>
        
        </Form>
            </Container>
    
    );
};

export default SheetForm;