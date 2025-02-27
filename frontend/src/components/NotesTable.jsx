import React from "react";
import { Table, Button, Form } from "react-bootstrap";

const NotesTable = ({ notes, onUpdateStatus, onDelete }) => {
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Apakah Anda yakin ingin menghapus catatan ini?"
    );
    if (confirmDelete) {
      onDelete(id);
    }
  };

  return (
    <div className="table-responsive mt-4">
      <Table striped bordered hover className="shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {notes.map((note) => (
            <tr key={note.id} className="text-center">
              <td>{note.title}</td>
              <td>{note.content}</td>
              <td>{note.is_finish ? "Selesai" : "Belum Selesai"}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={note.is_finish}
                  onChange={() => onUpdateStatus(note.id, !note.is_finish)}
                />
              </td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(note.id)}
                >
                  Hapus
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NotesTable;
