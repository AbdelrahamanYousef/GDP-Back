const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    description: {
      type: String,
      maxlength: 1000,
      trim: true,
    },

    fundType: {
      type: String,
      enum: ["ZAKAT", "SADAQAH", "GENERAL"],
      required: true,
    },

    targetAmount: {
      type: Number,
      required: true,
      min: [1, "Target must be greater than 0"],
    },

    collectedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "PAUSED", "CLOSED"],
      default: "ACTIVE",
    },

    period: {
      startDate: Date,
      endDate: {
        type: Date,
        validate: {
          validator: function (v) {
            return !this.period.startDate || v >= this.period.startDate;
          },
          message: "End date must be after start date",
        },
      },
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

module.exports = mongoose.model("Campaign", campaignSchema);
