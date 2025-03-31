//backend/models/Mision.js

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; 

const Mision = sequelize.define("Mision", {
    pilotId:{
        type: DataTypes.INTEGER, 
        allowNull: false,
        references:{
            model: "pilots",
            key: "id"
        },
        field: 'pilotid'  // Añadido field para mapeo correcto
    },
    misionId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        field: 'misionid',    // Añadido field para mapeo correcto
    },
    misionDate: {
        type: DataTypes.DATE,
        field: 'misiondate'
    },
    airplane: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airplane'
    },
    description: {
        type: DataTypes.STRING,
        field: 'description'
    }
}, {
    tableName: "misions",
    timestamps: false 
});

export default Mision;
