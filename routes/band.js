// (Étape 1) Import de express
var express = require("express");

// (Étape 1) Définition du router
var router = express.Router();

// Import du Contrôleur Band
var band_controller = require("../controllers/bandController");

// (Étape 2) Ajout de la route qui permet d'ajouter un groupe
router.post("/", band_controller.create);

// (Étape 2) Ajout de la route qui permet d'afficher tous les groupes
router.get("/", band_controller.getAll);

// (Étape 2) Ajout de la route qui permet d'afficher un seul groupe grâce à son identifant
router.get("/:id", band_controller.getById);

// (Étape 2) Ajout de la route qui permet de modifier un seul groupe grâce à son identifant
router.put("/:id", band_controller.update);

// (Étape 2) Ajout de la route qui permet de supprimer un seul groupe grâce à son identifant
router.delete("/:id", band_controller.delete);

// (Étape 1) Export du router
module.exports = router;
