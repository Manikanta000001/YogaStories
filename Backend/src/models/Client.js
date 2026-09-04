const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
},

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    whatsappOptIn: {
      type: Boolean,
      default: true,
    },

    emailOptIn: {
      type: Boolean,
      default: true,
    },

    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Client", clientSchema);