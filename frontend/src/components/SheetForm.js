// compoenente para el formulario de misiones enlazado al componente Mision.js
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, Image  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const SheetForm = ({pilot}) => {
    const [sheetId, setsheetId] = useState("");
    const [airplaneList, setAirplaneList] = useState([]);
    const [airplane, setAirplane] = useState("");
    const [descriptionAirplane, setDescriptionAirplane] = useState("");
    const [misionDate, setMisionDate] = useState("");
    const [initialFuel, setInitialFuel] = useState("");
    const [finalFuel, setFinalFuel] = useState("");
    const [loadFuel, setLoadFuel] = useState("");
    const [fuelConsumption, setFuelConsumption] = useState("");
    const [instructor, setInstructor] = useState("");
    const [initialHourMeter, setInitialHourMeter] = useState("");
    const [finalHourMeter, setFinalHourMeter] = useState("");
    const [TotalHourMeter, setTotalHourMeter] = useState("");
    const [error, setError] = useState(null);
    const [initialTsnMotor, setInitialTsnMotor] = useState("");
    const [finalTsnMotor, setFinalTsnMotor] = useState("");
    const [initialTsoMotor, setInitialTsoMotor] = useState("");
    const [finalTsoMotor, setFinalTsoMotor] = useState("");
    const [initialTsnPropeller, setInitialTsnPropeller] = useState("");
    const [finalTsnPropeller, setFinalTsnPropeller] = useState("");
    const [initialTsoPropeller, setInitialTsoPropeller] = useState("");
    const [finalTsoPropeller, setFinalTsoPropeller] = useState("");
    const navigate = useNavigate();

    const handleSheetSubmit = async (formData) => {
        console.log("Formulario enviado:", formData);
        try {
            const response = await fetch ("http://192.168.10.19:4000/api/mision", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                alert("Misión agregada con exito!")
                
            }else{
                const errorDetail = await response.text();
                console.error("Error del servidor:", errorDetail);
                setError(`Error al agregar nueva hoja: ${errorDetail}`);
            }
        }catch(error){
            console.error("Errorde conexion: ", error);
            setError("No fue posible conectarser al servidor")
        }
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
    // Función para manejar el envío del formulario
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = {
            sheetId,
            misionDate,
            airplane,
            descriptionAirplane,
            initialFuel,
            finalFuel,
            loadFuel,
            fuelConsumption,
            instructor,
            initialHourMeter,
            finalHourMeter,
            TotalHourMeter,
            initialTsnMotor,
            finalTsnMotor,
            initialTsoMotor,
            finalTsoMotor,
            initialTsnPropeller,
            finalTsnPropeller,
            initialTsoPropeller,
            finalTsoPropeller,
        };
        console.log(formData);
        handleSheetSubmit(formData);

        // Limpiar el formulario
        setsheetId("");
        setMisionDate("");
        setAirplane("");
        setDescriptionAirplane("");
        setInitialFuel("");
        setFinalFuel("");
        setLoadFuel("");
        setFuelConsumption("");
        setInstructor("");
        setInitialHourMeter("");
        setFinalHourMeter("");
        setTotalHourMeter("");
        setInitialTsnMotor("");
        setFinalTsnMotor("");
        setInitialTsoMotor("");
        setFinalTsoMotor("");
        setInitialTsnPropeller("");
        setFinalTsnPropeller("");
        setInitialTsoPropeller("");
        setFinalTsoPropeller("");




        // Redirigir a la página de inicio
    };
    console.log("Datos del piloto:", pilot);


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
            <Form.Control type="number" value={sheetId} onChange={(e) => setsheetId(e.target.value)} placeholder="Hoja #" required />
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
            <Form.Control type="Date" value= {misionDate} onChange={(e) => setMisionDate(e.target.value)}  />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>GLS Inicial</Form.Label>
            <Form.Control type="number" value= {initialFuel} onChange={(e) => setInitialFuel(e.target.value)}  />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>GLS Final</Form.Label>
            <Form.Control type="number" value= {finalFuel} onChange={(e) => setFinalFuel(e.target.value)} />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>Carga GLS</Form.Label>
            <Form.Control type="number" value= {loadFuel} onChange={(e) => setLoadFuel (e.target.value)} />
        </Col>
        <Col xs={12} md={1}>
            <Form.Label>Consumo</Form.Label>
            <Form.Control type="number" value={fuelConsumption} onChange={(e) => setFuelConsumption (e.target.value)} />
        </Col>
        </Row>
        <Row className="mb-5">
            <Col xs={12} md={1}>
            <Form.Label>Horometro Inicial</Form.Label>
            <Form.Control type="time" value={initialHourMeter} onChange={(e) => setInitialHourMeter (e.target.value)}  />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Horometro Final</Form.Label>
            <Form.Control type="time" value={finalHourMeter} onChange={(e) => setFinalHourMeter (e.target.value)} />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Horometro Total</Form.Label>
            <Form.Control type="time" value={TotalHourMeter} onChange={(e) => setTotalHourMeter (e.target.value)} />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSN Inicial</Form.Label>
            <Form.Control type="number" value={initialTsnMotor} onChange={(e) => setInitialTsnMotor (e.target.value)} />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSN Final</Form.Label>
            <Form.Control type="number" value={finalTsnMotor} onChange={(e) => setFinalTsnMotor (e.target.value)} />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSO Inicial</Form.Label>
            <Form.Control type="number" value={initialTsoMotor} onChange={(e) => setInitialTsoMotor (e.target.value)} />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Motor TSO Final</Form.Label>
            <Form.Control type="number" value={finalTsoMotor} onChange={(e) => setFinalTsoMotor  (e.target.value)}  />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSN Inicial</Form.Label>
            <Form.Control type="number" value={initialTsnPropeller} onChange={(e) => setInitialTsnPropeller  (e.target.value)} />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSN Final</Form.Label>
            <Form.Control type="number" value={finalTsnPropeller}  onChange={(e) => setFinalTsnPropeller  (e.target.value)}/>
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSO Inicial</Form.Label>
            <Form.Control type="number" value={initialTsoPropeller} onChange={(e) => setInitialTsoPropeller  (e.target.value)}  />
            </Col>
            <Col xs={12} md={1}>
            <Form.Label>Helice TSO Final</Form.Label>
            <Form.Control type="number" value={finalTsoPropeller} onChange={(e) => setFinalTsoPropeller  (e.target.value)} />
            </Col>
            </Row>
            <Row className="mb-5">
            <Col xs={2} md={2}>
            {/*<Form.Label>Aeronave*</Form.Label>
                <Form.Select value={pilot} onChange={handlePilotChange} required>
                <option value="">Seleccione</option>
                {PilotsList.map((plane) => (<option key={plane.pilotName} value={plane.pilotName}>{plane.airplaneId}</option>))}
            </Form.Select>*/}
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
