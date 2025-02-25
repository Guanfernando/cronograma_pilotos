//src/components/SearchBar.js
import React, {useState} from "react";
import {Form, Button, Row, Col} from "react-bootstrap";

const SearchBar = ({onSearch}) => {
    const [search, setSearch] = useState("");

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch(search);
    };

return (
    <Row style={{ height: "110px" }}>
        
    
        <Form onSubmit={handleSearch}>
        <Col className="text mt-2" sm={3}>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Buscar piloto"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                />
            </Form.Group>
            </Col>
            <Col className="text mt-2" sm={4}>
            <Button variant="primary" type="submit">
                Buscar
            </Button>
            </Col>
    </Form>
    
    </Row>
)};
export default SearchBar;
