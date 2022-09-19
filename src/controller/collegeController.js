const collegeModel = require("../model/collegeModel");


const isValidUrl = urlString=> {
    var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}

// ====================================== APIs/ college ==============================================================

const isvalidResquest = (requestBody) => {
    return Object.keys(requestBody).length > 0
}

//============================================validations======================================================================

const validName = (val) => {
    if (typeof val === "undefined" || typeof val === null) 
        return false;
    if (typeof val === 'string' && val.trim().length == 0) return false
    return true;

}

// ================================ valid details to fetch the data ===================================================================================

const createCollege = async (req, res) => {
    try {
        let requestBody = req.body
        if (!isvalidResquest(requestBody)) return res.status(400).send({ satus: false, message: "Oppss..!! please provide valid details in body section" })

        let { name, fullName, logoLink } = requestBody

        //============================ name required ===============================================================

        if (!name) return res.status(400).send({ status: false, message: "Oppss..!! name is Required" });

        if (!validName(name))
        return res.status(400).send({ status: false, message: "Oh noo..!! Blank Spaces are not Allowed in name" })
        
        // ==================================== fullname required =========================================================

        if (!fullName) return res.status(400).send({ status: false, message: "Oppss..!! fullName is required" });

        if (!validName(fullName))
        return res.status(400).send({ status: false, message: "Oh noo..!! Blank Spaces are not Allowed in fullName" })
        
        // ================================ logoLink mandatory =============================================================
         
        if (!logoLink) return res.status(400).send({ status: false, message: "Oppss..!! logo link is required" });

        if (!validName(logoLink))
        return res.status(400).send({ status: false, message: "Oh noo..!! Blank Spaces are not Allowed in name" })

        if (!isValidUrl(logoLink))
        return res.status(400).send({ status: false, message: "Oh noo..!! Invalid Url  !!!" })

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

module.exports = { createCollege } 