//backend/models/Mision.js

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; 

const Mision = sequelize.define("Mision", {

    //estabecer relacion con la clave foranea 
        pilotId:{
        type: DataTypes.INTEGER, 
        allowNull: false,
       references:{
        model:"pilots",
        key:"id"
       }
    },
    misionId: {
        type: DataTypes.INTEGER, 
        allowNull: false,
        primaryKey: true,
        autoIncrement: true, 
    },
    misionDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    airplane: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "misions", 
    timestamps: false 
});

export default Mision;
