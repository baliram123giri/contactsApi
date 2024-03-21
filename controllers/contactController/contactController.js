const { Op } = require("sequelize");
const Contact = require("../../models/ContactModel");
const Website = require("../../models/WebsiteModel");
const { errorRequest, pagination, getColumnsKeys, metaData, successResponseToken } = require("../../utils/Helper");
const { createContactValidation, updateContactValidation } = require("./validation");

//create a new Contact
async function createContact({ body, params: { websitename } }, res) {
    try {
        const isWebsitename = await Website.findOne({ where: { name: websitename } })
        if (!isWebsitename) return res.status(404).json({ message: "Website not found" })
        await createContactValidation.validateAsync(body)
        const contact = await Contact.create({ ...body, WebsiteId: isWebsitename.id })

        return res.json(await successResponseToken(contact, res, "Successfully Sent"))
    } catch (error) {
        await errorRequest(res, error)
    }
}

//get a new Contact
async function listContact({ query }, res) {
    try {
        const { limit, page, panginationSchema, rangeSearch } = await pagination(query)
        const globleSearch = await getColumnsKeys(Contact, query?.search)
        const { count, rows: data } = await Contact.findAndCountAll({
            where: {
                //global search 
                ...(query?.search ? {
                    [Op.or]: [...globleSearch, {
                        "$Website.name$": { [Op.like]: `%${query?.search}%` }
                    }]
                } : {}),
                //range search
                ...rangeSearch
            },
            include: [{
                model: Website,
                attributes: ["name"]
            }],
            ...panginationSchema,
        })
        return res.json(await metaData(data, page, count, limit, res));
    } catch (error) {
        await errorRequest(res, error)
    }
}

//update a Contact
async function updateContact({ body, params: { id } }, res) {
    try {
        await updateContactValidation.validateAsync(body)
        const contact = await Contact.findOne({ where: { id: Number(id) } })
        if (!contact) return res.status(404).json({ message: "Contact not found" })
        //update
        const data = await Contact.update(body, { where: { id: contact.id } })
        return res.json(await successResponseToken(data, res, "Updated Successfully"))
    } catch (error) {
        await errorRequest(res, error)
    }
}

//single Contact
async function singleContact({ params: { id } }, res) {
    try {
        const data = await Contact.findOne({ where: { id: Number(id) } })
        return res.json(await successResponseToken(data, res))
    } catch (error) {
        await errorRequest(res, error)
    }
}

//delete
async function deleteContact({ params: { id } }, res) {
    try {
        const contact = await Contact.findOne({ where: { id: Number(id) } })
        if (!contact) return res.status(404).json({ message: "Contact not found" })
        await Contact.destroy({ where: { id: contact.id } })
        return res.json(await successResponseToken(undefined, res, "Deleted Successfully"))
    } catch (error) {
        await errorRequest(res, error)
    }
}
module.exports = { createContact, updateContact, deleteContact, listContact, singleContact }