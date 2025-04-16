import React, { useState } from "react";
// Importamos los componentes necesarios de react-bootstrap
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

// Componente para el registro de aeronaves
const AirplaneForm = () => {
    // Estado único para todos los campos del formulario
    const [formData, setFormData] = useState({
        airplaneId: "",
        airplaneType: "",
        airplaneModel: ""
    });
    // Estado para manejar mensajes de éxito o error
    const [message, setMessage] = useState({ text: "", type: "" });

    // Manejador para actualizar el estado cuando cambian los inputs
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Manejador para enviar el formulario
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            // Envío de datos al servidor
            const response = await fetch("http://192.168.10.19:4000/api/airplane", {
                method: "POST",
                headers: { "Content-Type": "application/json" }, 
                body: JSON.stringify(formData)
            });
                console.log("Datos enviados:", formData);
                console.log("Respuesta del servidor:", response);
            if (response.ok) {
                // Limpiamos el formulario y mostramos mensaje de éxito
                setMessage({ text: "Aeronave registrada exitosamente", type: "success" });
                setFormData({ airplaneId: "", airplaneType: "", airplaneModel: "" });
            } else {
                // Manejamos el error del servidor
                const error = await response.text();
                setMessage({ text: `Error: ${error}`, type: "danger" });
            }
        } catch (error) {
            // Manejamos errores de conexión
            setMessage({ text: "Error de conexión con el servidor", type: "danger" });
            console.error("Error:", error);
        }
    };

    return (
        <Container>
            {/* Encabezado del formulario */}
            <Row className="mb-3">
                <Col>
                    <h4>Registro de Aeronaves</h4>
                </Col>
            </Row>

            {/* Componente para mostrar mensajes de éxito o error */}
            {message.text && (
                <Alert variant={message.type} dismissible onClose={() => setMessage({ text: "", type: "" })}>
                    {message.text}
                </Alert>
            )}

            {/* Formulario de registro */}
            <Form onSubmit={handleSubmit}>  {/* Eliminar ref={formRef} */}
                <Row className="mb-3">
                    <Col xs={2} md={2}>
                        <Form.Label>Matricula</Form.Label>
                        <Form.Control type="text" name="airplaneId" value={formData.airplaneId} onChange={handleChange} required placeholder= "HK1234" />
                    </Col>
                    <Col xs={12} md={3}>
                        <Form.Label>Tipo</Form.Label>
                        <Form.Control type="text" name="airplaneType" value={formData.airplaneType} onChange={handleChange} required placeholder="Ej: TECNAM" />
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Label>Descripción / Modelo</Form.Label>
                        <Form.Control type="text" name="airplaneModel" value={formData.airplaneModel} onChange={handleChange} required placeholder="Ej: P2002 JF GARMIN"/>
                    </Col>
                </Row>
                <Button type="submit" variant="primary">
                    Guardar
                </Button>
            </Form>
        </Container>
    );
};

export default AirplaneForm;