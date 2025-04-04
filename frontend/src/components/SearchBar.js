//src/components/SearchBar.js
import React from "react";
import {Form, Row, Col} from "react-bootstrap";

const SearchBar = ({search, setSearch, onSearch}) => {
    

    const handleSearch = (event) => {
        event.preventDefault();
        onSearch();
    };

return (
    <Row style={{ height: "110px" }}>
        
    
        <Form onSubmit={handleSearch}>
        <Row>
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
        
        
            </Col>
            </Row>
    </Form>
    
    </Row>
)};
export default SearchBar;
