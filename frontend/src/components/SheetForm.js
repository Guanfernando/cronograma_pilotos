// compoenente para el formulario de hoja de vuelo enlazado al componente Mision.js
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const SheetForm = () => {
    const [airplaneList, setAirplaneList] = useState([]);
    const [fuelConsumption, setFuelConsumption] = useState(0);
    const [airplane, setAirplane] = useState("");
    const [descriptionAirplane, setDescriptionAirplane] = useState("");
    const [instructorName, setInstructorName] = useState("");
    const [instructorNameSuggestions, setInstructorNameSuggestions] = useState([]);
    const [, setError] = useState(null);
    const [instructorNameList, setInstructorNameList] = useState([]);
    const [studentName, setStudentName] = useState("");
    const [studentNameSuggestions, setStudentNameSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        //convertir formulario a objeto directamente
        const formData = Object.fromEntries(new FormData(event.target));
        
        // agreagr la descripcion de la aeronave
        formData.descriptionAirplane = descriptionAirplane;


        //calcular el consumo de ombustible
        const initial = parseInt(formData.initialFuel) || 0;
        const final = parseInt(formData.finalFuel) || 0;
        const load = parseInt(formData.loadFuel) || 0;
        const consumption = initial + load - final;
        setFuelConsumption(consumption); //establece el consumo calculado
        formData.fuelConsumption = consumption; //envia el consumo AL formulario

        
        
        console.log("Formulario enviado:", formData);
        try {
            const response = await axios.post("http://localhost:4000/api/mision", formData);
            if (response.status === 200 || response.status === 201) {
                alert("Misión agregada con éxito!");
                event.target.reset();
                setFuelConsumption(0);
                setDescriptionAirplane("");
                setAirplane("");
            }
        } catch (err) {
            console.error("Error de conexión: ", err);
            setError(err.response?.data?.message || "No fue posible conectarse al servidor");
        }
    };

    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [airplanesResponse, instructorNamesResponse] = await Promise.all([
                    axios.get("http://localhost:4000/api/airplane"),
                    axios.get("http://localhost:4000/api/pilotslist")
                ]);
                setAirplaneList(airplanesResponse.data);
                setInstructorNameList(instructorNamesResponse.data);
            } catch (error) {
                console.error("Error al obtener datos", error);
                setError("Error al obtener la lista de aeronaves o instructores");
            }
        };
        fetchData();
    }, [])

    
    //funcion para cambiar la descripcion de la aeronave
    const handleAirplaneChange = async (event) => {
       const selectedAirplane = event.target.value;
       setAirplane(selectedAirplane);
       if (selectedAirplane) {       
            try {
                const response = await axios.get(`http://localhost:4000/api/airplane/${selectedAirplane}`)
                setDescriptionAirplane(`${response.data.airplaneType} - ${response.data.airplaneModel}`);
            } catch (error) {
                console.error("Error al obtener la descripción de la aeronave:", error);
            }
       } else { 
        setDescriptionAirplane("");
       }
    }

    return (
        <Container>
            <Row style={{ height: "130px" }}>
                <Col className="text mt-5" sm={10}>
                    <h2>Registro de vuelo</h2>
                </Col>
                <Col xs={1}>
                    <Image width={140} src="/flying.png" onClick={() => navigate("/")} />
                </Col>
            </Row>
        <Form onSubmit={handleSubmit}>
        <Row className="mb-5" >
        <Col xs={12} md={1}>

            <Form.Label>Nro.*</Form.Label>
            <Form.Control type="number" name="sheetId" placeholder="Hoja #" required />
        </Col>

        <Col xs={2} md={2}>
            <Form.Label>Aeronave*</Form.Label>
                <Form.Select name="airplane" value={airplane} onChange={handleAirplaneChange} required>
                    <option value="">Seleccione</option>
                    {airplaneList.map((plane) => (<option key={plane.airplaneId} value={plane.airplaneId}>{plane.airplaneId}</option>))}
                </Form.Select>
        </Col>
        <Col xs={12} md={3}>
            <Form.Label>Descripción</Form.Label>
            <Form.Control name="descriptionAirplane" type="text" value={descriptionAirplane} readOnly />
        </Col>
        <Col xs={12} md={2}>
            <Form.Label>Fecha*</Form.Label>
            <Form.Control type="Date" name="misionDate"/>
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>GLS Inicial</Form.Label>
            <Form.Control type="number" name="initialFuel" />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>GLS Final</Form.Label>
            <Form.Control type="number" name="finalFuel" />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>Carga GLS</Form.Label>
            <Form.Control type="number" name="loadFuel" />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>Consumo</Form.Label>
            <Form.Control type="number" name="fuelConsumption" value={fuelConsumption} readOnly/>
        </Col>
        </Row>
        <Row className="mb-5">
            <Col xs={12} md={1}>
            <Form.Label>Horometro Inicial</Form.Label>
            <Form.Control 
                type="text" 
                name="initialHourMeter"
                pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
                placeholder="00:00"
                maxLength="5"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 2 && !value.includes(':')) {
                        e.target.value = value + ':';
                        if (value > '24:') {
                            e.target.value = '00:';
                        }
                    }
                }}
            />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Horometro Final</Form.Label>
            <Form.Control 
                type="text" 
                name="finalHourMeter"
                pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
                placeholder="00:00"
                maxLength="5"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 2 && !value.includes(':')) {
                        e.target.value = value + ':';
                        if (value > '24:') {
                            e.target.value = '00:';
                        }
                    }
                }}
            />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Horometro Total</Form.Label>
            <Form.Control 
                type="text" 
                name="totalHourMeter"
                pattern="^([01]?[0-9]|2[0-3]):[0-5][0-9]$"
                placeholder="00:00"
                maxLength="5"
                onChange={(e) => {
                    const value = e.target.value;
                    if (value.length === 2 && !value.includes(':')) {
                        e.target.value = value + ':';
                    }
                }}
            />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSN Inicial</Form.Label>
            <Form.Control type="number" name="initialTsnMotor" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSN Final</Form.Label>
            <Form.Control type="number" name="finalTsnMotor" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSO Inicial</Form.Label>
            <Form.Control type="number" name="initialTsoMotor" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSO Final</Form.Label>
            <Form.Control type="number" name="finalTsoMotor" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSN Inicial</Form.Label>
            <Form.Control type="number" name="initialTsnPropeller" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSN Final</Form.Label>
            <Form.Control type="number" name="finalTsnPropeller"/>
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSO Inicial</Form.Label>
            <Form.Control type="number" name="initialTsoPropeller" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSO Final</Form.Label>
            <Form.Control type="number" name="finalTsoPropeller" />
            </Col>
            </Row>
            <Row className="mb-3">
            <Col xs={12} md={3}>
                <Form.Label>InstructorName</Form.Label>
                <div className="position-relative">
                    <Form.Control 
                        type="text" 
                        name="instructorName" 
                        value={instructorName}
                        onChange={(e) => {
                            const value = e.target.value;
                            setInstructorName(value);
                            if (value.length >= 3) {
                                const filtered = instructorNameList.filter(pilot =>
                                    pilot.role === "I" &&
                                    `${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`
                                        .toLowerCase()
                                        .includes(value.toLowerCase())
                                );
                                setInstructorNameSuggestions(filtered);
                            } else {
                                setInstructorNameSuggestions([]);
                            }
                        }}
                        placeholder="Nombre del instructorName"
                    />
                    {instructorNameSuggestions.length > 0 && (
                        <div className="position-absolute w-100 bg-white border rounded mt-1" style={{zIndex: 1000, maxHeight: '200px', overflowY: 'auto'}}>
                            {instructorNameSuggestions.map((pilot) => (
                                <div
                                    key={pilot.id}
                                    className="p-2 hover-bg-light cursor-pointer"
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        setInstructorName(`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`);
                                        setInstructorNameSuggestions([]);
                                    }}
                                >
                                    {`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Col>
            <Col xs={12} md={3}>
                <Form.Label>Estudiante</Form.Label>
                <div className="position-relative">
                    <Form.Control 
                        type="text" 
                        name="studentName" 
                        value={studentName}
                        onChange={(e) => {
                            const value = e.target.value;
                            setStudentName(value);
                            if (value.length >= 3) {
                                const filtered = instructorNameList.filter(pilot =>
                                    pilot.role === "E" &&
                                    pilot.firstName + ' ' + (pilot.secondName || '') + ' ' + pilot.firstLastName + ' ' + pilot.secondLastName !== instructorName &&
                                    `${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`
                                        .toLowerCase()
                                        .includes(value.toLowerCase())
                                );
                                setStudentNameSuggestions(filtered);
                            } else {
                                setStudentNameSuggestions([]);
                            }
                        }}
                        placeholder="Nombre del estudiante"
                    />
                    {studentNameSuggestions.length > 0 && (
                        <div className="position-absolute w-100 bg-white border rounded mt-1" style={{zIndex: 1000, maxHeight: '200px', overflowY: 'auto'}}>
                            {studentNameSuggestions.map((pilot) => (
                                <div
                                    key={pilot.id}
                                    className="p-2 hover-bg-light cursor-pointer"
                                    style={{cursor: 'pointer'}}
                                    onClick={() => {
                                        setStudentName(`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`);
                                        setStudentNameSuggestions([]);
                                    }}
                                >
                                    {`${pilot.firstName} ${pilot.secondName || ''} ${pilot.firstLastName} ${pilot.secondLastName}`}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </Col>
            </Row>

            {/*<Col xs={2} md={2}>
            <Form.Label>Alumno*</Form.Label>
                {PilotsList.map((pilot) => (<input key={plane.pilotName} value={plane.pilotName}>{plane.airplaneId}</input>))}
            </Col>*/}


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
