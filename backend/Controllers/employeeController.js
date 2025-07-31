const employee = require('../models/employeeModel');

const create = async (req, res) => {
    try {
        const emp = new employee({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            degination: req.body.designation,
        });
        const empolyee = await emp.save();
        res.status(200).send({message: "Employee created successfully", result: empolyee,});
    } catch (e) {
        res.status(500).send({message: e.message,});
    }   
};
const fetch_all = async (req, res) => {
    try{
        const employees = await employee.find();
        res.status(200).send({message: "All Employees fetched successfully", result: employees,});
    } catch (e) {
        res.status(500).send({message: e.message,});
    }
};
const fetch_one = async (req, res) => {
    try{
        const id = req.params.id;
        const emp = await employee.findById(id);
        res.status(200).send({message: "One Employee fetched successfully", result: emp,});
    } catch (e) {
        res.status(500).send({message: e.message,});
    }   
};
const destroy = async (req, res) => {
    try {
        const id = req.params.id;
        const emp = await employee.findByIdAndDelete(id);
        res.status(200).send({message: "Employee deleted successfully", result: emp,});
    } catch (e) {
        res.status(500).send({message: e.message,});
    }
};
const update = async (req, res) => {
    try {
        const id = req.params.id;

        const data = {
             firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            contact: req.body.contact,
            degination: req.body.designation,
        };
        const emp = await employee.findByIdAndUpdate(id,data, { new: true });
        res.status(200).send({message: "Employee updated successfully", result: emp,});
    } catch (e) {
        res.status(500).send({message: e.message,});
    }
}

module.exports = {
    create,
    fetch_all,
    fetch_one,
    destroy,
    update
};