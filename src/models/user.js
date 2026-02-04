import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false
    },

    role: {
      name: {
        type: String,
        required: true,
        enum: ["ADMIN", "FINANCE", "EMPLOYEE", "VOLUNTEER"]
      },
      description: String
    },

    isActive: {
      type: Boolean,
      default: true
    },

    profile: {
      fullName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
      },
      phone: {
        type: String,
        match: [/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number"]
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
