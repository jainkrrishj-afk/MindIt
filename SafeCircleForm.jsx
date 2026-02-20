import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SafeCircleForm() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({
    name: '',
    phone: '',
    relationship: ''
  });

  const relationships = ['Parent', 'Sibling', 'Friend', 'Partner', 'Mentor', 'Other'];

  const handleAddContact = (e) => {
    e.preventDefault();
    if (contacts.length >= 3) return;
    
    setContacts([...contacts, { ...currentContact, id: Date.now() }]);
    setCurrentContact({ name: '', phone: '', relationship: '' });
  };

  const removeContact = (id) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleSave = () => {
    // Logic to save to backend or local storage
    localStorage.setItem('safeCircle', JSON.stringify(contacts));
    alert('Safe Circle saved successfully!');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">My Safe Circle</h2>
        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          {contacts.length}/3 Added
        </span>
      </div>

      {/* Contact List */}
      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {contacts.map((contact) => (
            <motion.div
              key={contact.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100"
            >
              <div>
                <p className="font-semibold text-gray-800">{contact.name}</p>
                <p className="text-xs text-gray-500">{contact.relationship} • {contact.phone}</p>
              </div>
              <button
                onClick={() => removeContact(contact.id)}
                className="text-red-400 hover:text-red-600 p-1"
                aria-label="Remove contact"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {contacts.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-2">No contacts added yet.</p>
        )}
      </div>

      {/* Add Contact Form */}
      {contacts.length < 3 ? (
        <form onSubmit={handleAddContact} className="space-y-4 border-t border-gray-100 pt-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              required
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
              value={currentContact.name}
              onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
              placeholder="Trusted contact's name"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                required
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm"
                value={currentContact.phone}
                onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
                placeholder="123-456-7890"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Relationship</label>
              <select
                required
                className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none text-sm bg-white"
                value={currentContact.relationship}
                onChange={(e) => setCurrentContact({ ...currentContact, relationship: e.target.value })}
              >
                <option value="">Select...</option>
                {relationships.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-50 text-blue-600 font-medium rounded-lg hover:bg-blue-100 transition-colors text-sm"
          >
            + Add Contact
          </button>
        </form>
      ) : (
        <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm text-center border border-green-100">
          Maximum contacts reached.
        </div>
      )}

      {/* Save Button */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button
          onClick={handleSave}
          disabled={contacts.length === 0}
          className={`w-full py-3 rounded-xl font-semibold shadow-sm transition-all ${
            contacts.length > 0 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md hover:opacity-90' 
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          Save Safe Circle
        </button>
      </div>
    </div>
  );
}