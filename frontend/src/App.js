import React from "react";
import "./Styles.css";
import PilotsForm from "./components/PilotsForm";
import { Col, Row } from "react-bootstrap";



function App() {
  return (
    <div className="Principal">
      <Row>
        <Col sm={6}>
        <h3 >PROGRAMACIÓN DE VUELOS</h3>
        </Col>
      </Row>
      <PilotsForm />
    </div>
  );
}

export default App;
