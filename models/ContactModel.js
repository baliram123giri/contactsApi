const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
const Website = require("./WebsiteModel");

const Contact = sequelize.define("Contact", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    comment: DataTypes.STRING,
    WebsiteId: DataTypes.INTEGER
})

// Contact.sync({ alter: true })
Website.hasMany(Contact, { foreignKey: "WebsiteId" })
Contact.belongsTo(Website)

module.exports = Contact