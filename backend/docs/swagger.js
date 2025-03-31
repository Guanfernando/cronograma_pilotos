import swaggerJSDoc from "swagger-jsdoc";

//documentacion del uso de API REstfull con swagger
const swaggerOptions ={
    definition:{
        openapi:"3.0.0",
        info: {
            title: "API Pilotos", 
            version:"1.0.0",
            description: "Documetnación de la API para gestion de pilotos y misiones"
        },
    },
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;