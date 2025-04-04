// compoenente para el formulario de misiones enlazado al componente Mision.js
import React, {useState} from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";


//datos de las aeronaves
const airplanedescriptions = {
    HK5092G: "TECNAM P2002 JF ANÁLOGO",
    HK5183G: "TECNAM P2002 JF ANÁLOGO",
    HK5206G: "TECNAM P2002 JF GARMIN", 
    HK5252G: "TECNAM P2002 JF GARMIN"
};



const MisionForm = ({pilot, onSubmit}) => {
    const [sheetId, setsheetId] = useState("");
    const [misionDate, setMisionDate] = useState("");
    const [airplane, setAirplane] = useState("");
    const [description, setDescription] = useState("");
    const [initialFuel, setInitialFuel] = useState("");
    const [finalFuel, setFinalFuel] = useState("");
    const [fuelConsumption, setFuelConsumption] = useState("");
    const [instructor, setInstructor] = useState("");
    const [startTime, setStartTime] = useState("");
    const [finalTime, setFinalTime] = useState("");
    const [fuelLoad, setFuelLoad] = useState("");
    


    //funcion para cambiar la descripcion de la aeronave
    const handleAirplaneChange = (event) => {
        const selectedAirplane = event.target.value;
        setAirplane(selectedAirplane);
        setDescription(airplanedescriptions[selectedAirplane]);
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
                <Form.Select name="airplane" value={airplane} onChange={handleAirplaneChange} required>
                    <option value="">Seleccione</option>
                    <option value="HK5092G">HK5092G</option>
                    <option value="HK5183G">HK5183G</option>
                    <option value="HK5206G">HK5206G</option>
                    <option value="HK5252G">HK5252G</option>
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
            <Form.Control type="time" name="finaltime" required />
            </Col>

            </Row>
            <Row className="mb-3">
            <Col xs={2} md={1}>
            <Form.Label>Carga GLS</Form.Label>
            <Form.Control type="number" name="fuelLoad" required />
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

export default MisionForm;