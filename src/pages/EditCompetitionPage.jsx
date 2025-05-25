// src/pages/EditCompetitionPage.js (atau path yang sesuai)

import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Upload } from "lucide-react"; // Pastikan ikon ini memang digunakan atau sesuaikan impor
import { getCompeById, updateCompe } from "../services/compe-api";

const EditCompetitionPage = () => {
  const { compeId } = useParams(); // Mengambil compeId dari URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventDate: "",
    maxParticipants: "",
  });
  const [currentCompeImgUrl, setCurrentCompeImgUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addCacheBuster = (url) => {
    if (!url) return "";
    return `${url}?t=${new Date().getTime()}`;
  };

  useEffect(() => {
    loadCompe();
  }, [compeId, navigate]);

  const loadCompe = async () => {
    setIsLoadingData(true);
    setFormError("");

    try {
      const response = await getCompeById(compeId);
      if (response) {
        setFormData({
          name: response.compeName || "",
          description: response.compeDesc || "",
          eventDate: response.compeDate
            ? new Date(response.compeDate).toISOString().split("T")[0]
            : "",
          maxParticipants: response.maxParticipant?.toString() || "",
          compeStatus: response.compeStatus?.toString() || "0",
        });
        addCacheBuster(response.compeImg || "");
        setCurrentCompeImgUrl(response.compeImg || "");
      } else {
        throw new Error(
          "Data kompetisi tidak ditemukan atau format respons tidak sesuai."
        );
      }
    } catch (e) {
      console.error("Gagal mengambil detail kompetisi:", e);
      setFormError(
        e.message || "Gagal mengambil detail kompetisi. Pastikan ID valid."
      );
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formError && name) setFormError("");
    if (successMessage) setSuccessMessage("");
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setCurrentCompeImgUrl(URL.createObjectURL(file));
      if (formError) setFormError("");
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setFormError("");
    setSuccessMessage("");

    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await updateCompe(
        compeId,
        formData.name,
        formData.description,
        formData.eventDate,
        formData.maxParticipants,
        selectedFile
      );
      if (response) {
        setCurrentCompeImgUrl(addCacheBuster(response.data.compeImg));
        navigate("/competitions", { replace: true });
      } else {
        setFormError("Gagal membuat kompetisi. Respons tidak valid.");
      }
    } catch (e) {
      setFormError(
        e.response?.data?.message ||
          e.message ||
          "Gagal memperbarui kompetisi. Silakan coba lagi."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Nama kompetisi wajib diisi.";
    if (!formData.description.trim()) return "Deskripsi wajib diisi.";
    if (!formData.eventDate) return "Tanggal acara wajib diisi.";
    if (
      !formData.maxParticipants.trim() ||
      isNaN(formData.maxParticipants) ||
      Number(formData.maxParticipants) <= 0
    ) {
      return "Jumlah maksimal partisipan wajib diisi dengan angka yang valid dan lebih besar dari 0.";
    }
    return "";
  };

  const handleCancel = () => {
    navigate("/competitions", { replace: true });
  };

  if (isLoadingData) {
    return (
      <div className="p-6 text-center text-gray-700">
        Memuat data kompetisi...
      </div>
    );
  }

  if (formError && !formData.name && !isLoadingData) {
    return (
      <div className="p-6 text-center text-red-600">
        Error: {formError}{" "}
        <button onClick={() => navigate(-1)} className="ml-2 text-blue-500">
          Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">
                Edit Competition: {formData.name || compeId}
              </h1>
              <p className="text-sm text-gray-500">
                Update the details of the competition event
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-6">
              {formError && !successMessage && (
                <div
                  className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
                  role="alert"
                >
                  <span className="font-medium">Error!</span> {formError}
                </div>
              )}
              {successMessage && (
                <div
                  className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                  role="alert"
                >
                  <span className="font-medium">Sukses!</span> {successMessage}
                </div>
              )}

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Competition Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Summer Code Challenge"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the competition details, rules, and objectives..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Competition Image
                </label>
                {(currentCompeImgUrl || selectedFile) && (
                  <div className="mb-2">
                    <img
                      src={
                        selectedFile
                          ? URL.createObjectURL(selectedFile)
                          : currentCompeImgUrl
                      }
                      alt="Competition"
                      className="max-h-48 w-auto rounded-md border object-contain"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedFile
                        ? `Preview file baru: ${selectedFile.name}`
                        : "Gambar saat ini."}{" "}
                      Klik area di bawah untuk mengganti.
                    </p>
                  </div>
                )}
                <div
                  onClick={handleFileClick}
                  className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                  <Upload size={40} className="text-gray-400 mb-2" />
                  {selectedFile ? (
                    <div className="text-center">
                      <p className="text-sm text-green-600 font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        File baru dipilih - Klik untuk mengganti
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-sm text-blue-500">
                        Ganti gambar (opsional) atau drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="compeImgInput"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Event Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
                <div>
                  <label
                    htmlFor="maxParticipants"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Max Participants <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isLoadingData}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? "Updating..." : "Update Competition"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompetitionPage;
