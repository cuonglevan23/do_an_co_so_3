import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema(
    {
        name: {
         type: String,
         require: [true, "Please provide a valid username"],
         minlength: 3,
        },
        email: {
         type: String,
         require: [true, "Please provide a valid email"],
         unique: true,
         validator: {
            validator: validator.isEmail,
            messages: "Please provide a valid email!"
         },
        },
        password: {
            type: String,
            require: [true, "Please provider password!"],
            minlength: 6,
            select: true,

        },
        secret: {
        type: String,
        require: [true, "Please provider secret!"],
        },
        username: {
        type: String,
        unique: true,
        require: [true, "please provide a username!"]
        },
        about: {
        type: String,
        },
        image: {
           url: {
            type: String,
           },
           public_ID : {
           type: String,
           },
        },
        following: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            }
        ],
        followers: [
            {
                type: mongoose.Types.ObjectId,
                ref: 'User',
            }
        ],
        role: {
            type: String,
            default: 'Subcriber',
        }   
    },
    {
     timestamps : true,
    }
);

userSchema.pre("save", async function (){
  if (!this.isModified("password")) return
  const salt = await bcrypt.getSalt(10);
  this.password = await brcypt.hash(this.password,salt);
});

userSchema.method.comparePassword =  async function (candidatePassword){
 const isMatch = await brcypt.compare(candidatePassword, this.password);
 return isMatch;
}

export default mongoose.model("User",userSchema);




