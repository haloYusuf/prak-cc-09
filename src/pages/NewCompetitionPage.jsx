import { useState } from 'react';
import { Calendar, X, Upload } from 'lucide-react';

const CreateCompetitionPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    eventDate: '',
    maxParticipants: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleCancel = () => {
    console.log('Form canceled');
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h1 className="text-xl font-semibold text-gray-800">Create Competition</h1>
              <p className="text-sm text-gray-500">Set up a new competition event</p>
            </div>
            
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {/* Competition Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Competition Name</label>
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
              
              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
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
              
              {/* Competition Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Competition Image</label>
                <div className="border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                  <Upload size={40} className="text-gray-400 mb-2" />
                  <p className="text-sm text-blue-500">Upload a file or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              
              {/* Event Date and Max Participants */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700 mb-1">Event Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="eventDate"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      placeholder="dd/mm/yyyy"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar size={18} className="absolute right-3 top-2.5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="maxParticipants" className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input
                    type="text"
                    id="maxParticipants"
                    name="maxParticipants"
                    value={formData.maxParticipants}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Create Competition
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCompetitionPage;
