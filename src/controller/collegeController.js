const collegeModel = require("../model/collegeModel");

// ====================================== APIs/ college ==============================================================

const isvalidResquest = (requestBody) => {
    return Object.keys(requestBody).length > 0
}
// ================================ valid details to fetch the data ===================================================================================

const createCollege = async (req, res) => {
    try {
        let requestBody = req.body
        if (!isvalidResquest(requestBody)) return res.status(400).send({ satus: false, message: " please provide valid details in body section" })

        let { name, fullName, logoLink } = requestBody

        //============================ name required ===============================================================

        if (!name) return res.status(400).send({ status: false, message: "Oppss..!! name is Required" });
        
        // ==================================== fullname required =========================================================

        if (!fullName) return res.status(400).send({ status: false, message: "Oppss..!! fullName is required" });
        
        // ================================ logoLink mandatory =============================================================
         
        if (!logoLink) return res.status(400).send({ status: false, message: "Oppss..!! logo link is required" });

        // ========================== if name is already used ============================================================

        let newName = await collegeModel.findOne({ name })
        if (newName) return res.status(400).send({ status: false, message: "Oppss..!! name is already used" });

// =================================== college created ========================================================================
        let saveData = await collegeModel.create(requestBody);
        return res.status(201).send({ status: true, data: saveData })


    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, meessage: err.meessage })
    }
}

module.exports.createCollege = createCollege 