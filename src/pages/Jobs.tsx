import { MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

interface Audit {
  id: string;
  contractName: string;
  description: string;
  timeline: number; // assuming timeline is a number representing days
  budget: number;
  status: string;
  chainType: string;
}

interface Enterprise {
  id: string;
  companyName: string;
  role: string;
  auditList: Audit[];
}

export default function Jobs() {
  const [userdata, setUserdata] = useState<any[]>([]); // Assuming the data is an array
  const { fetchAllUsers } = useFirebase();

  // Fetching the user data asynchronously
  useEffect(() => {
    const getUserData = async () => {
      const users = await fetchAllUsers();
      console.log(users)
      setUserdata(users);
    };

    getUserData();
  }, [fetchAllUsers]);

  // Filter the enterprises from the user data
  const enterprises = userdata.filter(user => user.role === 'enterprise') as Enterprise[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-accent/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Blockchain Security{' '}
            <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark text-transparent bg-clip-text">
              Jobs
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Find your next role in smart contract security and auditing
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {enterprises.map((enterprise) =>
            enterprise.auditList?.map((audit) => (
              <div
                key={audit.id || audit.contractName} // Use a unique key for each audit
                className="bg-dark/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-light/20 p-8 hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-2">{audit.contractName}</h2>
                    <div className="text-lg font-semibold text-primary-light mb-4">
                      {enterprise.companyName}
                    </div>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-primary-light/20 text-primary-light text-sm font-semibold">
                    {audit.status}
                  </span>
                </div>

                <p className="text-gray-400 mb-6">{audit.description}</p>

                <div className="flex items-center space-x-6 text-gray-400 mb-6">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary-light" />
                    {audit.chainType}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary-light" />
                    {audit.timeline} weeks
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold text-white mb-2">Budget:</h3>
                  <p className="text-primary-light">${audit.budget} USD</p>
                </div>

                <button
                  onClick={() => handleApply(audit, enterprise)} // Pass audit and enterprise to handleApply
                  className="w-full bg-gradient-to-r from-primary-light to-primary hover:opacity-90 text-dark font-semibold px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
                >
                  Apply Now
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  function handleApply(audit: Audit, enterprise: Enterprise) {
    // Handle the application logic for developers applying to audits
    alert(`Developer applied to ${audit.contractName} by ${enterprise.companyName}`);
  }
}
