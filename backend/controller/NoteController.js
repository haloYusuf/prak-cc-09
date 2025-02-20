import Note from "../model/NoteModel.js";

//Function ngambil semua data dari db
export const getNotes = async (req, res) => {
  try {
    const response = await User.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createNote = async (req, res) => {
  try {
    const response = await Note.create(req.body);
    res.status(201).json({
      msg: "Note Berhasil Ditambah",
    });
  } catch (error) {
    console.log(error.message);
  }
};
