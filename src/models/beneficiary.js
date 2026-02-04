const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema(
  {
    nationalId: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{14}$/, "Invalid Egyptian National ID"],
    },

    personalInfo: {
      fullName: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: String,
        match: [/^01[0-2,5]{1}[0-9]{8}$/, "Invalid phone number"],
      },
      address: { type: String, trim: true },
    },

    socialInfo: {
      familySize: {
        type: Number,
        min: 1,
      },
      monthlyIncome: {
        type: Number,
        min: 0,
      },
    },

    eligibilityStatus: {
      type: String,
      enum: ["ELIGIBLE", "NOT_ELIGIBLE", "REVIEW_REQUIRED"],
      default: "REVIEW_REQUIRED",
    },

    documents: [
      {
        type: {
          type: String,
          required: true,
          trim: true,
        },
        url: {
          type: String,
          required: true,
          trim: true,
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

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

module.exports = mongoose.model("Beneficiary", beneficiarySchema);
