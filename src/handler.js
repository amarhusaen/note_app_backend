const { nanoid } = require("nanoid");
const notes = require("./notes");

// Tambah Note
const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan",
  });
  response.code(500);
  return response;
};

// Tampilkan note
const getAllNotes = () => ({
  status: "success",
  data: {
    notes,
  },
});

// Tampilkan detail note
const getNoteById = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((note) => note.id === id)[0];

  if (note !== undefined) {
    return {
      status: "succees",
      data: {
        note,
      },
    };
  }
  const response = h.response({
    status: "fail",
    message: "Data tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Edit note
const editNoteById = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Data berhasil diupdate",
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Data gagal diupdate, data tidak ditemukan",
  });
  response.code(404);
  return response;
};

// Delete note
const deleteNoteById = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Data berhasil dihapus",
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Data gagal dihapus, data tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addNoteHandler,
  getAllNotes,
  getNoteById,
  editNoteById,
  deleteNoteById,
};
