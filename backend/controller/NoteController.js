import Note from "../model/NoteModel.js";

//Function ngambil semua data dari db
export const getNotes = async (req, res) => {
  try {
    const uId = req.user.id; // Mengambil uId dari cookie

    if (!uId) {
      return res.status(400).json({
        message: "uId tidak ditemukan dalam cookie",
      });
    }
    const response = await Note.findAll({
      where: { uId }, // Filter berdasarkan uId
    });
    if (response.length === 0) {
      return res.status(404).json({
        message: "Tidak ada catatan ditemukan untuk uId ini",
      });
    }

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: "Terjadi kesalahan saat mengambil catatan",
      error: error.message,
    });
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

export const updateNote = async (req, res) => {
  try {
    const inputData = req.body;
    const id = req.params.id;

    await Note.update(inputData, {
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Berhasil Update Data",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;

    await Note.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "Berhasil Delete Data",
    });
  } catch (error) {
    console.log(error.message);
  }
};
