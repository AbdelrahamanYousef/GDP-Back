const mongoose = require("mongoose");

const disbursementRequestSchema = new mongoose.Schema(
  {
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },

    requestedAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    approvedAmount: {
      type: Number,
      min: 0,
      validate: {
        validator: function (v) {
          if (v == null) return true; // allow null/undefined until approved
          return v <= this.requestedAmount;
        },
        message: "Approved amount cannot exceed requested amount",
      },
    },

    purpose: {
      type: String,
      required: true,
      maxlength: 255,
      trim: true,
    },

    eligibilityNotes: { type: String, trim: true },

    status: {
      type: String,
      enum: ["SUBMITTED", "APPROVED", "REJECTED", "DISBURSED"],
      default: "SUBMITTED",
    },

    metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.__v;
        return ret;
      },
    },
  },
);

module.exports = mongoose.model(
  "DisbursementRequest",
  disbursementRequestSchema,
);
