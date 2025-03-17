//backend/modelsPilot.js
import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Pilot = sequelize.define('Pilot', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true,       
        allowNull: false,
        unique: true            
    },

    idType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    secondName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    firstLastName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    secondLastName: {
        type: DataTypes.STRING,
        allowNull: true
    },

    birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    telephoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },

    city: {
        type: DataTypes.STRING,
        allowNull: false
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    rh: {
        type: DataTypes.STRING,
        allowNull: false
    },

    weight: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    eps: {
        type: DataTypes.STRING,
        allowNull: false
    },

    emergencyContact: {
        type: DataTypes.STRING,
        allowNull: false
    },

    emergencyNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },

    licenseType: {
        type: DataTypes.STRING,
        allowNull: false
    },

    licenseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    medicalCertificate: {
        type: DataTypes.STRING,
        allowNull: false
    },

    certificateExpiration: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }

}, {
    timestamps: false
});

export default Pilot;
