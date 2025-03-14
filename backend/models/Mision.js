//backend/models/Mision.js
import { Model, DataTypes } from "sequelize";
import sequelize from "sequelize";

const Mision = sequelize.define("Mision",{
    misionId :{
        DataTypes: DataTypes.NUMBER,
        allowNull: false
    },
    misionDate: {
        DataTypes: DataTypes.DATE,
        allowNull: false
    },
    airplane: {
        DataTypes: DataTypes.STRING,
        allowNull: false
    },
    description: {
        DataTypes: DataTypes.STRING,
        allowNull: false
    }
    
});

export default Mision;

