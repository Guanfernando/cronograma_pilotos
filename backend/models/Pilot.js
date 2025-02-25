//backend/models.pilot.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Pilot = sequelize.define('Pilot', {
    idType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    secondName:{
     type: DataTypes.STRING,
    },

    firstLastName:{
        type: DataTypes.STRING,
        allowNull:false
    },

    secondLastName:{
        type: DataTypes.STRING,
       
    },

    birthday:{
        type: DataTypes.STRING,
        allowNull: false
    },

    telephoneNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    city:{
        type: DataTypes.STRING,
        allowNull: false
    },

    address:{
        type: DataTypes.STRING,
        allowNull: false
    },

    email:{
        type: DataTypes.STRING,
        allowNull: false
        
    },

    rh:{
        type:DataTypes.STRING,
        allowNull: false
    },

    weight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    eps:{
        type: DataTypes.STRING,
        allowNull: false
    },

    emergencyContact:{
        type: DataTypes.STRING,
        allowNull: false
    },

    emergencyNumber:{
        type: DataTypes.INTEGER,
        allowNull: false
    }


},{

    timestamps: false

});

export default Pilot;


