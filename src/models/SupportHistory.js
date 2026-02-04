const mongoose = require("mongoose");

const supportHistorySchema = new mongoose.Schema(
  {
    beneficiary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Beneficiary",
      required: true,
      index: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },

    disbursementRequest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DisbursementRequest",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 1,
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

module.exports = mongoose.model("SupportHistory", supportHistorySchema);
