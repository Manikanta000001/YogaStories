const express = require("express");

const {
    getAdminClients,
    updateClientStatus
} = require("../controllers/clientController");

const router = express.Router();

// GET /api/clients/admin
router.get("/admin", getAdminClients);
router.patch("/:id", updateClientStatus);

module.exports = router;