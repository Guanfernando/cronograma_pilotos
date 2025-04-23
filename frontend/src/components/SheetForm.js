// compoenente para el formulario de hoja de vuelo enlazado al componente Mision.js
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image, ListGroup  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const SheetForm = () => {
    const [airplaneList, setAirplaneList] = useState([]);
    const [airplane, setAirplane] = useState("");
    const [descriptionAirplane, setDescriptionAirplane] = useState("");
    const [pilotName, setPilotName] = useState("");
    const [pilotNameSugessted, setPilotNameSugessted] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        //convertir formulario a objeto directamente
        const formData = Object.fromEntries(new FormData(event.target));
        console.log("Formulario enviado:", formData);
        try {
            const response = await fetch ("http://192.168.10.19:4000/api/mision", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                alert("Misión agregada con exito!")
                event.target.reset();
            }else{
                setError(`Error al agregar nueva hoja: ${error}`);
            }
        }catch(error){
            console.error("Errorde conexion: ", error);
            setError("No fue posible conectarser al servidor")
        }
    };

    //funcion para autocompletar el nombre del piloto
   
    //funcion para traer el nombre del piloto
    useEffect(() => {
        const studentName = pilotName.trim();
        if (studentName.length < 3) {
            setPilotNameSugessted([]);
            return;          
        }
    
        const nameSugessted = async () => {
            try {
                const response = await axios.get(`http://192.168.10.19:4000/api/pilotsList/${pilotName}`);
                const formattedNames = response.data.map(pilot => 
                    `${pilot.firstName} ${pilot.secondName} ${pilot.firstLastName} ${pilot.secondLastName}`.trim()
                );
    
                const matches = formattedNames.filter(name => 
                    name.toLowerCase().startsWith(studentName.toLowerCase())
                );
    
                setPilotNameSugessted(matches);
            } catch (error) {
                console.error("No hay coincidencias", error);
                setPilotNameSugessted([]);
            }
        };
    
        nameSugessted();
    }, [pilotName]);

    const handleSuggestionClick = (name) => {
        setPilotName(name); // Escribe el nombre en el input
        setPilotNameSugessted([]); // Limpia sugerencias
    };

    //funcion para cargar la lista de aeronaves
    useEffect(() => {
        const fetchAirplaneList = async () => {
            try {
                const response = await axios.get("http://192.168.10.19:4000/api/airplane");
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
                const response = await axios.get(`http://192.168.10.19:4000/api/airplane/${selectedAirplane}`)
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
                <Form.Select value={airplane} onChange={handleAirplaneChange} required>
                    <option value="">Seleccione</option>
                    {airplaneList.map((plane) => (<option key={plane.airplaneId} value={plane.airplaneId}>{plane.airplaneId}</option>))}
                </Form.Select>
        </Col>
        <Col xs={12} md={3}>
            <Form.Label>Descripción</Form.Label>
            <Form.Control type="text" value= {descriptionAirplane} disabled />
        </Col>
        <Col xs={12} md={2}>
            <Form.Label>Fecha*</Form.Label>
            <Form.Control type="Date" name="misionDate" />
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
            <Form.Control type="number" name="fuelConsumption" />
        </Col>
        </Row>
        <Row className="mb-5">
            <Col xs={12} md={1}>
            <Form.Label>Horometro Inicial</Form.Label>
            <Form.Control type="time" name="initialHourMeter" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Horometro Final</Form.Label>
            <Form.Control type="time" name="finalHourMeter" />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Horometro Total</Form.Label>
            <Form.Control type="time" name="totalHourMeter" />
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
            <Row className="mb-5">
            <Col xs={12} md={3}>
                <Form.Label>Alumno</Form.Label>
                <Form.Control
                    type="text"
                    name="studentName"
                    value={pilotName}
                    onChange={(e) => setPilotName(e.target.value)}
                    autoComplete="off"
                />
                {pilotNameSugessted.length > 0 && (
                    <ListGroup style={{ position: 'absolute', zIndex: 1000 }}>
                        {pilotNameSugessted.map((name, index) => (
                            <ListGroup.Item key={index} action onClick={() => handleSuggestionClick(name)}>
                                {name}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            {/*<Col xs={2} md={2}>
            <Form.Label>Alumno*</Form.Label>
                {PilotsList.map((pilot) => (<input key={plane.pilotName} value={plane.pilotName}>{plane.airplaneId}</input>))}
            </Col>*/}

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
