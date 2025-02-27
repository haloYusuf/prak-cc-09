import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddNote = ({ show, onAdd, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content) {
      onAdd(title, content);
      setTitle("");
      setContent("");
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Buat Catatan Baru</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan Judul"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Masukkan Isi Catatan"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="me-2">
            Tambah
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Batal
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddNote;
