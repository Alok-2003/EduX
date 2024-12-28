import React, { useState } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

const Test = () => {
  const { saveTestData } = useFirebase();
  const [name, setName] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (name.trim()) {
      const data = { name };
      await saveTestData(data); // Save to Firestore
      setName(''); // Clear input field after submission
    } else {
      alert('Please enter a name');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Test Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          style={{ padding: '8px', margin: '10px' }}
        />
        <button type="submit" style={{ padding: '8px' }}>Submit</button>
      </form>
    </div>
  );
};

export default Test;
