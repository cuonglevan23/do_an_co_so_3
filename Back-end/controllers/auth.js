import User from '.././models/user';
import validator from 'validator';
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import randomCatAvatar from "../middleware/randomCatAvatar.js";
const newFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

const register = async (req, res) => {
  const { name, email, password, rePassword, scret } = req.body;

  if (!name || !email || !password || !rePassword || !scret) {
    return res.status(400).json({ msg: "Please provider all values!" });
  }
  if (name.length < 3 || name.length > 20) {
    return res.status(400).json({ msg: "Name must be longer 3 characters and shorter 20 characters", });
  };

  if (newFormat.test(name)) {
    return res.status(400).json({ msg: "Name cannot have special characters!" });
  }
  if (password !== rePassword) {
    return res.status(400).json({ msg: "Password are not the same!" });
  };
  if (password.length < 6) {
    return res.status(400).json({ msg: "Password must be longer than 6 characters!" });
  };
  const isEmail = validator.isEmail(email);
  if (!isEmail) {
    return res.status(400).json({ msg: "Email is taken!" });
  };
  const exist = await User.findOne({ email });
  if (exist) {
    return res.status(400).json({ msg: "Email is taken!" });
  };
  const image = {
    url: randomCatAvatar(),
    public_id: nanoid(),
  };

  const user = await User.create({
    name,
    email,
    password,
    secret,
    username: nanoid(),
    image,
  });

  return res.status(200).json({
    msg: "Register success. Let's login",
  });

}
const login = async (req, res) => {
  try {
    const { email, password, rememberPassword } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provider all values!" });

    };
    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be longer than 6 character!" });
    };
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return res.status(400).json({ msg: "Please provide a valid email!" });
    };
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email or password is not defined!" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ msg: "Email or password is not defined!" });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: rememberPassword ? "365d" : process.env.JWT_LIFETIME,
    });
    user.password = undefined;
    user.secret = undefined;
    return res.status(200).json({ token, user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "LOGIN ERROR. Try again!" });
  }
}

const currentUser = async (req, res) => {
  try {
    const user = await User.findOne(req.user.userId);
    return res.status(200).json({ user, ok: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Error. Try again!" });
  }
}

const updateUser = async (req, res) => {
  try {
    const { name, userName, about, image, pasword, rePassword, currentUser, } = req.body;
    const userID = req.user.userId;
    let data = { name, username };
    if (!name) {
      return res.status(400).json({ msg: "Please provider name!" });

    };
    if (newFormat.test(name)) {
      return res.status(400).json({ msg: "Name cannot have special characters" });
    };
    if (!username) {
      return res.status(400).json({ msg: "Please provider username!" });
    };
    if (about) {
      data.about = about;
    }
    if (image) {
      data.image = image;
    }
    if (currentPassword) {
      if (password !== rePassword) {
        return res.status(400).json({ msg: "New password are not the same!" });
      }

      if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be longer than 6 character!" });
      }
      const user = await User.findById(userId);
      if (!user) {
        return res, status(400).json({ msg: "No user found!" });
      }
      const isMatch = await user.comparePassword(currentPassword);
      if (isMatch) {
        return res.status(400).json({ msg: "Current password is wrong! Try again! " });
      };
    };
    user.password = undefined;
    user.secret = undefined;
    const token = jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: process.env.JWT_LIFETIME || "1d",
    });
    return res.status(200).json({ msg: "Update user success.", user, token });


  } catch (error) {
    if (error.code == 11000) {
      return res.status(400).json({ msg: "Duplicate username!" });
    }
    console.log(error);
    return res.status(400).json({ msg: "UPDATE ERROR. Try again!" });
  }
}

const ForgotPassword = async (req, res) => {
  try {
    const { email, newPassword, rePassword, secret } = req.body;
    if (!email || !newPassword || !rePassword || !secret) {
      return res.status(400).json({ msg: " Please provider all values!" })
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ msg: "Password must be longer than 6  character!" });
    }
    if (newPassword.length !== rePassword) {
      return res.status(400).json({ msg: "Passwords are not the same!" });
    }
    const isEmail = validator.isEmail(email);
    if (isEmail) {
      return res.status(400).json({ msg: "Please provide a valid email!" });
    }
    const user = await User.findOne({ email, secret });
    if (!user) {
      return res.status(400).json({ msg: "Email and secret is not defined!" });

    }
    user.password = newPassword;
    user.save();
    return res.status(200).json({ msg: "ok" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "Something went wrong. Try again!" });
  }
}

export {
  register,
  login,
  updateUser,
  currentUser,
  ForgotPassword,
  addFollower,
  userFollower,
  findPeople,
  userFollowing,
  removeFollower,
  userUnFollower,
  searchUser,
  getInformationUser,
  allUsers,
  deleteUserWithAdmin,
  listUserFollower,
};