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

const MisionForm = (pilot, onSubmit) => {
    const [misionId, setMisionId] = useState("");
    const [misionDate, setMisionDate] = useState("");
    const [airplane, setAirplane] = useState("");
    const [description, setDescription] = useState("");
    const [Instructor, setInstructor] = useState("");
    const [startTime, setStartTime] = useState("");
    const [finalTime, setFinalTime] = useState("");
    


//funcion para cambiar la descripcion de la aeronave
const handleAirplaneChange = (event) => {
    const selectedAirplane = event.target.value;
    setAirplane(selectedAirplane);
    setDescription(airplanedescriptions[selectedAirplane]);
}

//funcion para manejar el envio del formulario
const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
        misionId,
        misionDate,
        airplane,
        description,
        pilotId: pilot?.id
    };
    console.log(formData);
    onSubmit (formData);

}


    return (
        <Container>
        <Form handleSubmit={handleSubmit}>
        <Row className="mb-1">
        <Col xs={2} md={2}>

            <Form.Label>Misión #*</Form.Label>
            <Form.Control type="number" value={misionId} onChange={(e) => setMisionId(e.target.value)} placeholder="Misión #" required />
        </Col>

        <Col xs={2} md={2}>
            <Form.Label>Fecha*</Form.Label>
            <Form.Control type="Date" name="misionDate" required />
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
            <Form.Control type="text" name="instructor" value={description} disabled />
        </Col>
        {/*<Col xs={2} md={3}>
        <Form.Label>Instructor*</Form.Label>
        <Form.Select name="instructor" required>
            <option value="">Seleccione</option>
            <option value="instructor1">instructor1</option>
            <option value="instructor2">instructor2</option>
            <option value="instructor3">instructor3</option>
            <option value="instructor4">instructor4</option>
        </Form.Select>
        </Col>
        </Row>
        <Row>
            <Col xs={2} md={2}>
            <Form.Label>Hora inicio</Form.Label>
            <Form.Control type="time" name="startTime" required />
            </Col>
            <Col xs={2} md={2}>
            <Form.Label>Hora Fin</Form.Label>
            <Form.Control type="time" name="finaltime" required />
            </Col>*/}
        </Row>
        <Col>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Guardar
        </Button>
        </Col>
        </Form>
        <Row className="mt-4">
                <Col>
                    <h5>Datos del Piloto</h5>
                    <p><strong>Nombre:</strong> {`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`}</p>
                    <p><strong>ID:</strong> {pilot.id}</p>
                    <p><strong>Tipo ID:</strong> {pilot.idType}</p>
                    <p><strong>Rh:</strong> {pilot.rh}</p>
                    <p><strong>Peso:</strong> {pilot.weight} Kg</p>
                    <p><strong>Tipo Licencia:</strong> {pilot.licenseType}</p>
                    <p><strong>Número Licencia:</strong> {pilot.licenseNumber}</p>
                    <p><strong>Fecha Certificado Médico:</strong> {pilot.medicalCertificate}</p>
                    <p><strong>Vencimiento Certificado:</strong> {pilot.certificateExpiration}</p>
                </Col>
            </Row>
            </Container>
    
    );
};

export default MisionForm;