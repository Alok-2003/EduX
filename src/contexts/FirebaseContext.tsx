import React, { createContext, useContext } from 'react';
import { db } from '../lib/firebase'; // Ensure this is the correct path to your firebase config
import { doc, setDoc } from 'firebase/firestore';

interface FirebaseContextType {
  saveTestData: (data: TestData) => Promise<void>;
  saveCProfileData: (data: any, userId: string) => Promise<void>;
}

interface TestData {
  name: string;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export const FirebaseProvider = ({ children }: { children: React.ReactNode }) => {

  // Function to save test data
  const saveTestData = async (data: TestData) => {
    try {
      const docRef = doc(db, 'TestCollection', data.name);
      await setDoc(docRef, data);
      console.log('Test data saved successfully');
    } catch (error) {
      console.error('Error saving data to Firestore:', error);
    }
  };

  // Function to save user profile data
  const saveCProfileData = async (data: any, userId: string) => {
    try {
      const userRef = doc(db, 'User', userId); // Document reference
      await setDoc(userRef, data); // Save profile data
      console.log('Profile data saved successfully');
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  // Provide both functions to the context
  return (
    <FirebaseContext.Provider value={{ saveTestData, saveCProfileData }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
