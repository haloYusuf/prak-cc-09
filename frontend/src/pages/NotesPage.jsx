import React, { useState, useEffect } from "react";
import NotesTable from "../components/NotesTable";
import AddNote from "../components/AddNote";
import {
  getNotes,
  addNote,
  updateNoteStatus,
  deleteNote,
} from "../services/note-api";
import { Container, Button } from "react-bootstrap";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await getNotes();
    setNotes(data);
  };

  const handleAddNote = async (title, content) => {
    await addNote(title, content);
    loadNotes();
    setShowModal(false);
  };

  const handleUpdateStatus = async (id, isFinish) => {
    await updateNoteStatus(id, isFinish);
    loadNotes();
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    loadNotes();
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1 d-flex flex-column justify-content-start align-items-center text-center">
        <h1 className="text-primary fw-bold mb-4">
          <span className="fs-1">Note Pengingat Tugas</span>
        </h1>
        <Button
          variant="success"
          className="mb-3"
          onClick={() => setShowModal(true)}
        >
          Buat Data Baru
        </Button>

        {}
        <div className="d-flex justify-content-center w-100">
          <NotesTable
            notes={notes}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteNote}
          />
        </div>
      </Container>

      {showModal && (
        <AddNote
          show={showModal}
          onAdd={handleAddNote}
          onClose={() => setShowModal(false)}
        />
      )}

      {/* Footer Stretch */}
      <footer className="bg-dark text-white text-center py-3 mt-auto w-100">
        &copy; 2024 <span className="fw-bold">Diandra Yusuf Arrafi</span> -
        Dibantu AI buat Frontendnya
      </footer>
    </div>
  );
};

export default NotesPage;
