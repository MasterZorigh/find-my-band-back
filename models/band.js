// (Étape 1) Import du DRM mongoose et luxon
var mongoose = require("mongoose");
const { DateTime } = require("luxon");

// (Étape 2) Définition du schéma band
// https://mongoosejs.com/docs/guide.html
// https://mongoosejs.com/docs/schematypes.html#schematype-options
const bandSchema = new mongoose.Schema({
  _id: { type: Number, required: true },
  bandName: { type: String, required: true },
  bandCountry: { type: String, required: true },
  bandGenre: {
    type: String,
    required: true,
    enum: ["Rock", "Pop", "Jazz", "Metal", "Musique Populaire", "Autre"],
  },
  bandMembers: { type: Number, required: true },
  dateOfBirth: {
    type: Date,
    required: true,
    transform: (x) => DateTime.fromJSDate(x).toISODate(),
  },
  bandTopSong: { type: String, required: true },
});

// (Étape 3) Création d'une nouvelle propriété virtuelle "id" qui aura la valeur de la propriété "_id"
bandSchema.virtual("id").get(function () {
  return this._id;
});

// (Étape 3) Définition de l'object qui sera retourné lorsque la méthode toJSON est appelée
bandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

// (Étape 4) Export du modèle student
// Les modèles sont responsables de la création et de la lecture des documents à partir de la base de données MongoDB.
module.exports = mongoose.model("band", bandSchema);
