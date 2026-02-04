const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [1, "Donation must be greater than 0"],
    },

    donor: {
      name: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid donor email"],
        trim: true,
      },
      type: {
        type: String,
        enum: ["INDIVIDUAL", "ORGANIZATION"],
        default: "INDIVIDUAL",
      },
    },

    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED"],
      default: "PENDING",
    },

    trackingCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },

    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
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

module.exports = mongoose.model("Donation", donationSchema);
