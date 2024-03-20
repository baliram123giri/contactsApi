
const UserType = require("../../models/UserTypeModel");
const User = require("../../models/UsersModel");
const { errorRequest } = require("../../utils/Helper");
const { createUserValidation, updateUserValidation } = require("./validation");

//create a new User
async function createUser({ body }, res) {
    try {
        await createUserValidation.validateAsync(body)
        const user = await User.create(body)
        return res.json(user)
    } catch (error) {
        await errorRequest(res, error)
    }
}

//get a new User
async function listUser({ }, res) {
    try {
        const data = await User.findAll({
            attributes: {
                exclude: ["password"]
            },
            include: [{
                model: UserType,
                attributes: ["name"]
            }]
        })
        return res.json(data)
    } catch (error) {
        await errorRequest(res, error)
    }
}

//update a User
async function updateUser({ body, params: { id } }, res) {
    try {
        await updateUserValidation.validateAsync(body)
        const user = await User.findOne({ where: { id: Number(id) } })
        if (!user) return res.status(404).json({ message: "User not found" })
        //update
        await User.update(body, { where: { id: user.id } })
        return res.json({ message: "User updated successfully" })
    } catch (error) {
        await errorRequest(res, error)
    }
}

//single User
async function singleUser({ params: { id } }, res) {
    try {
        const data = await User.findOne({ where: { id: Number(id) } })
        return res.json(data)
    } catch (error) {
        await errorRequest(res, error)
    }
}

//delete
async function deleteUser({ params: { id } }, res) {
    try {
        const user = await User.findOne({ where: { id: Number(id) } })
        if (!user) return res.status(404).json({ message: "User not found" })
        await User.destroy({ where: { id: user.id } })
        return res.json({ message: "User deleted" })
    } catch (error) {
        await errorRequest(res, error)
    }
}
module.exports = { createUser, updateUser, deleteUser, listUser, singleUser }