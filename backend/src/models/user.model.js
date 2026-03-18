const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "username already taken"],
        required: [true, "username is required"],
    },
    email: {
        type: String,
        unique: [true, "account already exist with this email address"],
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    }
},{timestamps: true});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;