const internModel = require('../model/internModel')
const collegeModel = require('../model/collegeModel')
const validator = require("email-validator");
var _ = require('lodash');

var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/im;

// ================================ APIs / Interns ===================================================================================
const createIntern = async (req, res) => {
    try {

        const { name, email, mobile, collegeName, isDeleted } = req.body
        if (_.isEmpty(req.body)) {
            return res.status(400).send({ status: false, messgae: "All fields are mendatory...." })
        }

        // ================================= validating name ===================================================================

        if (!name) {
            return res.status(400).send({ status: false, messgae: "Name is mendatory.." })

            // ========================= email validation =============================================================

        } else if (!email) {
            return res.status(400).send({ status: false, messgae: "email is mendatory.." })
        }
        else if (validator.validate(email) != true) {
            return res.status(400).send({ status: false, messgae: "Invalid Email.." })
        }

        // ============================= mobile validation =============================================================

        else if (re.test(mobile) != true) {
            return res.status(400).send({ status: false, messgae: "Invalid Mobile Number" })
        }
        else if (!mobile) {
            return res.status(400).send({ status: false, messgae: "mobile is mendatory.." })

            // ============================= collegeName validation ===========================================================

        } else if (!collegeName) {
            return res.status(400).send({ status: false, messgae: "collegeName is mendatory.." })
        } else {

            // =========================== if intern are already registered ====================================================

            let findAllIntern = await internModel.find({ $or: [{ email: email }, { name: name }, { mobile: mobile }] })
            if (findAllIntern.length > 0) return res.status(400).send({ status: false, message: "You are already Registered.." })

            // ============================= if college not found ==========================================================

            let findAllCollege = await collegeModel.find({ "name": { $regex: collegeName, "$options": "i" } })
            if (findAllCollege.length < 1) return res.status(400).send({ status: false, message: "College not found" })

            collegeId = findAllCollege[0]._id

            let data = { name, email, mobile, collegeId, isDeleted }

            // ========================= Intern created =====================================================================

            let createIntern = await internModel.create(data)
            res.status(201).send({ status: true, data: createIntern })
        }
    } catch (error) {
        res.status(500).send({ status: false, error: error.message })
    }

}

module.exports = { createIntern }