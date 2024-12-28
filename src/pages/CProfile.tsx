import React, { useState } from 'react';
import { Building2, UserCircle } from 'lucide-react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useOCAuth } from '@opencampus/ocid-connect-js';


const RoleSelector = ({ onSelect }: { onSelect: (role: 'developer' | 'enterprise') => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <button
      onClick={() => onSelect('developer')}
      className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
    >
      <UserCircle className="h-16 w-16 text-indigo-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Developer</h3>
      <p className="text-gray-600 text-center">Join audit teams and review smart contracts</p>
    </button>

    <button
      onClick={() => onSelect('enterprise')}
      className="flex flex-col items-center p-6 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
    >
      <Building2 className="h-16 w-16 text-indigo-600 mb-4" />
      <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
      <p className="text-gray-600 text-center">Submit smart contracts for security audits</p>
    </button>
  </div>
);

const DeveloperForm = ({
    saveProfile,
    role,
  }: {
    saveProfile: (data: any) => void;
    role: 'developer' | 'enterprise';
  }) => {
    const [fullName, setFullName] = useState('');
    const [experience, setExperience] = useState('');
    const [skills, setSkills] = useState('');
    const [github, setGithub] = useState('');
    const [telegram, setTelegram] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      saveProfile({ fullName, experience, skills, github, telegram, role });
    };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Experience (Years)</label>
        <input
          type="number"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
        <input
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="e.g., Solidity, Web3.js"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
        <input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="https://github.com/username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Telegram Username</label>
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="@username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700"
      >
        Complete Profile
      </button>
    </form>
  );
};

const EnterpriseForm = ({
    saveProfile,
    role,
  }: {
    saveProfile: (data: any) => void;
    role: 'developer' | 'enterprise';
  }) => {
    const [companyName, setCompanyName] = useState('');
    const [website, setWebsite] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [telegram, setTelegram] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      saveProfile({ companyName, website, contactEmail, telegram, description, role });
    };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
        <input
          type="email"
          value={contactEmail}
          onChange={(e) => setContactEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Telegram Username</label>
        <input
          type="text"
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          placeholder="@username"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
        <textarea
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700"
      >
        Complete Profile
      </button>
    </form>
  );
};

const CProfile = () => {
  const [selectedRole, setSelectedRole] = useState<'developer' | 'enterprise' | null>(null);
  const { saveCProfileData } = useFirebase();
  const { ethAddress } = useOCAuth();

  const saveProfile = (data: any) => {
    const userId = ethAddress; // Use a unique user ID or obtain from session
    saveCProfileData(data, userId); // Save the profile data to Firestore
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Profile</h1>
          {!selectedRole ? (
            <RoleSelector onSelect={setSelectedRole} />
          ) : selectedRole === 'developer' ? (
            <DeveloperForm saveProfile={saveProfile} role="developer" />
          ) : (
            <EnterpriseForm saveProfile={saveProfile} role="enterprise" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CProfile;
