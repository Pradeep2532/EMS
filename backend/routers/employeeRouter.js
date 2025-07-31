const employeController = require('../Controllers/employeeController');
const express = require('express'); 
const router = express.Router();

router.post("/create", employeController.create);
router.get("/all", employeController.fetch_all);
router.get("/one/:id", employeController.fetch_one);
router.delete("/delete/:id", employeController.destroy);
router.put("/update/:id", employeController.update);

module.exports = router;