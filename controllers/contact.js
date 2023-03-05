import mongoose from "mongoose";
import usersYellowClass from "../models/auth.js";

export const addContact = async (req, res) => {
  const { id: _id } = req.params;

  const { name, contact } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(200).send("User unavalible");
  }

  try {
    const updatedUser = await usersYellowClass.findByIdAndUpdate(
      _id,
      {
        $addToSet: { contacts: [{ name, contact }] },
      },
      { new: true }
    );

    const newUserDetail = [];
    newUserDetail.push({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contacts: updatedUser.contacts,
    });
    res.status(200).json({ newUserDetail });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const deleteContact = async (req, res) => {
  const { id: _id } = req.params;

  const { contactId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(200).send("User unavalible");
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(200).send("Contact unavalible");
  }

  try {
    const updatedUser = await usersYellowClass.findByIdAndUpdate(
      _id,
      {
        $pull: { contacts: { _id: contactId } },
      },
      { new: true }
    );

    const newUserDetail = [];
    newUserDetail.push({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contacts: updatedUser.contacts,
    });
    res.status(200).json({ newUserDetail });
  } catch (error) {
    res.status(405).json(error);
  }
};

export const editContact = async (req, res) => {
  const { id: _id } = req.params;

  const { name, contact, contactId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(200).send("User unavalible");
  }

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(200).send("Contact unavalible");
  }

  try {
    const user = await usersYellowClass.findById(_id);
    await user.contacts.map((Contact) => {
        if (Contact._id.toString() === contactId) {
            user.contacts[user.contacts.indexOf(Contact)].name = name;
            user.contacts[user.contacts.indexOf(Contact)].contact = contact;
        }
    })
    const updatedUser = await usersYellowClass.findByIdAndUpdate(
        _id,user,
      { new: true }
    );

    const newUserDetail = [];
    newUserDetail.push({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      contacts: updatedUser.contacts,
    });
    res.status(200).json({ newUserDetail });
  } catch (error) {
    res.status(405).json(error);
  }
};
