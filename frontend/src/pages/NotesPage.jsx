// NotesPage.jsx
import React, { useState, useEffect } from "react";
import NotesTable from "../components/NotesTable";
import AddNote from "../components/AddNote";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchNotes,
  addNote,
  updateStatusNote,
  deleteNote,
} from "../services/note-api";
import useAuth from "../auth/useAuth";

const NotesPage = () => {
  const { logout } = useAuth();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // Hook untuk navigasi programatik

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const data = await fetchNotes();
    setNotes(data);
  };

  const handleAddNote = async (title, content) => {
    const newNote = await addNote(title, content);
    console.log(newNote);
    await loadNotes();
    setShowModal(false);
  };

  const handleUpdateStatus = async (id, isFinish) => {
    const updatedNote = await updateStatusNote(id, isFinish);
    if (updatedNote) {
      await loadNotes(); // Refresh notes setelah status diperbarui
    }
  };

  const handleDeleteNote = async (id) => {
    const deletedNote = await deleteNote(id);
    if (deletedNote) {
      // setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      await loadNotes();
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // Tunggu sampai proses logout selesai
      navigate("/login"); // Redirect setelah logout selesai
    } catch (error) {
      console.error("Gagal logout:", error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Container className="flex-grow-1 d-flex flex-column justify-content-start align-items-center text-center">
        <h1 className="text-primary fw-bold mb-4">
          <span className="fs-1">Note Pengingat Tugas</span>
        </h1>
        {/* Tombol Logout */}
        <Button
          variant="danger"
          className="mb-3"
          onClick={handleLogout} // Fungsi logout
        >
          Logout
        </Button>
        <Button
          variant="success"
          className="mb-3"
          onClick={() => setShowModal(true)}
        >
          Buat Data Baru
        </Button>
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
