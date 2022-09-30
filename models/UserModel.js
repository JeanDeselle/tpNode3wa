import { Schema, model } from 'mongoose';

const userShema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});
const userModel = model('user', userShema);

export const getUserByFilter = async (filter) => {
	return await userModel.find(filter);
};

export const getAllUsers = async () => {
	return await userModel.find({});
};

export const getUsersCount = async () => {
	return await userModel.countDocuments();
};

export const getUserById = async (id) => {
	return await userModel.findById(id);
};

export const getUserByName = async (fname, lname) => {
	return await userModel.findOne({ firstName: fname, lastname: lname });
};

export const addUser = async(objUser) => {
    const add = new userModel(objUser);
    await add.save();
}
