import { Company } from "../models/company.model.js";

export const registerCompany = async (req, resp) => {
    try {
        const { companyName } = req.body;
        // console.log(companyName);

        if (!companyName) {
            return resp.status(400).json({
                message: "Company name is required.",
                success: false,
            });
        }

        let company = await Company.findOne({ name: companyName });
        if (company) {
            return resp.status(400).json({
                message: "You can't register the same company.",
                success: false,
            });
        }

        company = await Company.create({
            name: companyName,
            userId: req.id, // Ensure req.id is set in your middleware
        });

        return resp.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error);

    }
};

export const getCompany = async (req, resp) => {
    try {
        const userId = req.id;// logged in user id
        const companies = await Company.find({ userId: userId });
        if (!companies) {
            return resp.status(404).json({
                messsage: "companies not found",
                success: false
            });

        }
        return resp.status(200).json({
            companies,
            success: true
        })

    } catch (error) {
        console.log(error);

    }
}
export const getCompanyById = async (req, resp) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return resp.status(404).json({
                messsage: "company not found.",
                success: false
            });
        }
        return resp.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);

    }
}

export const updateCompany = async (req, resp) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        // idhar cloudnary aayega

        const updateData = { name, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return resp.status(404).json({
                messsage: "company not found.",
                success: false
            });
        }
        return resp.status(200).json({
            messsage: "company information updated..",
            success: true
        });
    } catch (error) {
        console.log(error);

    }
}