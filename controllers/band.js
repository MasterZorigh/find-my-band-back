// Import du modèle student
var Band = require("../models/band");

// Import de express-validator
const { param, body, validationResult } = require("express-validator");

// Déterminer les règles de validation de la requête
const bandValidationRules = () => {
  return [
    body("bandName")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Band name must be specified.")
      .isAlphanumeric()
      .withMessage("Band name has non-alphanumeric characters."),

    body("bandCountry")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Band Country must be specified.")
      .isAlphanumeric()
      .withMessage("Band Country has non-alphanumeric characters."),

    body("bandGenre")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Genre must be specified."),

    body("bandMembers")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Band members must be specified.")
      .isNumeric()
      .withMessage("Band members must be a number."),

    body("dateOfBirth", "Invalid date of birth")
      .optional({ checkFalsy: true })
      .isISO8601()
      .toDate(),

    body("bandTopSong")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Band top song must be specified.")
      .isAlphanumeric()
      .withMessage("Band top song has non-alphanumeric characters."),
  ];
};

const paramIdValidationRule = () => {
  return [
    param("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Id must be specified.")
      .isNumeric()
      .withMessage("Id must be a number."),
  ];
};

const bodyIdValidationRule = () => {
  return [
    body("id")
      .trim()
      .isLength({ min: 1 })
      .escape()
      .withMessage("Id must be specified.")
      .isNumeric()
      .withMessage("Id must be a number."),
  ];
};

// Méthode de vérification de la conformité de la requête
const checkValidity = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(400).json({
    errors: extractedErrors,
  });
};

// Create
exports.create = [
  bodyIdValidationRule(),
  studentValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de band à ajouter
    var band = new Band({
      _id: req.body.id,
      bandName: req.body.bandName,
      bandCountry: req.body.bandCountry,
      bandGenre: req.body.bandGenre,
      bandMembers: req.body.bandMembers,
      dateOfBirth: req.body.dateOfBirth,
      bandTopSong: req.body.bandTopSong,
    });

    // Ajout de band dans la bdd
    band.save(function (err) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(201).json("New band created successfully !");
    });
  },
];

// Read
exports.getAll = (req, res, next) => {
  Band.find(function (err, result) {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(200).json(result);
  });
};

exports.getById = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Band.findById(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(result);
    });
  },
];

// Update
exports.update = [
  paramIdValidationRule(),
  bandValidationRules(),
  checkValidity,
  (req, res, next) => {
    // Création de la nouvelle instance de band à modifier
    var band = new Band({
      _id: req.params.id,
      bandName: req.body.bandName,
      bandCountry: req.body.bandCountry,
      bandGenre: req.body.bandGenre,
      bandMembers: req.body.bandMembers,
      dateOfBirth: req.body.dateOfBirth,
      bandTopSong: req.body.bandTopSong,
    });

    Band.findByIdAndUpdate(req.params.id, band, function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Band with id " + req.params.id + " is not found !");
      }
      return res.status(201).json("Band updated successfully !");
    });
  },
];

// Delete
exports.delete = [
  paramIdValidationRule(),
  checkValidity,
  (req, res, next) => {
    Band.findByIdAndRemove(req.params.id).exec(function (err, result) {
      if (err) {
        return res.status(500).json(err);
      }
      if (!result) {
        res
          .status(404)
          .json("Band with id " + req.params.id + " is not found !");
      }
      return res.status(200).json("Band deleted successfully !");
    });
  },
];
