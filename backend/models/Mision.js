//backend/models/Mision.js

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; 

const Mision = sequelize.define("Mision", {
   /* pilotId:{
        type: DataTypes.INTEGER, 
        allowNull: false,
        references:{
            model: "pilots",
            key: "id"
        },
        field: 'pilotid'
    },*/

    sheetId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        field: 'sheetid'
    },
    misionDate: {
        type: DataTypes.DATE,
        allowNull: false,
        field: 'misiondate'
    },
    airplane: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'airplane'
    },
    descriptionAirplane: {
        type: DataTypes.STRING,
        field: 'descriptionairplane'
    },
    initialFuel: {
        type: DataTypes.INTEGER,
        field: 'initialfuel'
    },
    finalFuel: {
        type: DataTypes.INTEGER,
        field: 'finalfuel'
    },
    loadFuel: {
        type: DataTypes.INTEGER,
        field: 'loadfuel'
    },
    fuelConsumption: {
        type: DataTypes.INTEGER,
        field: 'fuelconsumption'
    },
    /*instructor: {
        type: DataTypes.STRING,
        field: 'instructor'
    },*/
    initialHourMeter: {
        type: DataTypes.TIME,
        field: 'initialhourmeter'
    },
    finalHourMeter: {
        type: DataTypes.TIME,
        field: 'finalhourmeter'
    },
    TotalHourMeter: {
        type: DataTypes.TIME,
        field: 'totalhourmeter'
    },
    initialTsnMotor: {
        type: DataTypes.INTEGER,
        field: 'initialtsnmotor'
    },
    finalTsnMotor: {
        type: DataTypes.INTEGER,
        field: 'finaltsnmotor'
    },
    initialTsoMotor: {
        type: DataTypes.INTEGER,
        field: 'initialtsomotor'
    },
    finalTsoMotor: {
        type: DataTypes.INTEGER,
        field: 'finaltsomotor'
    },
    initialTsnPropeller: {
        type: DataTypes.INTEGER,
        field: 'initialtsnpropeller'
    },
    finalTsnPropeller: {
        type: DataTypes.INTEGER,
        field: 'finaltsnpropeller'
    },
    initialTsoPropeller: {
        type: DataTypes.INTEGER,
        field: 'initialtsopropeller'
    },
    finalTsoPropeller: {
        type: DataTypes.INTEGER,
        field: 'finaltsopropeller'
    }
}, {
    tableName: "misions",
    timestamps: false 
});

export default Mision;
