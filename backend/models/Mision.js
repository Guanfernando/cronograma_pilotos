//backend/models/Mision.js

import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js"; 

const Mision = sequelize.define("Mision", {
   
    sheetId: {
        type: DataTypes.INTEGER, 
        primaryKey: true,
        allowNull: false,
        field: 'sheetid'
    },
    misionDate: {
        type: DataTypes.DATEONLY,
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

    initialHourMeter: {
        type: DataTypes.TIME,
        field: 'initialhourmeter'
    },
    finalHourMeter: {
        type: DataTypes.TIME,
        field: 'finalhourmeter'
    },
    totalHourMeter: {
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
    },
    instructorName: {
        type: DataTypes.STRING,
        field: 'instructorname'
    },
    studentName: {
        type: DataTypes.STRING,
        field: 'studentname'
    },
}, {
    tableName: "misions",
    timestamps: false 
});

export default Mision;
