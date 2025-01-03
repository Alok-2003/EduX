import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { MapPin, Clock, X, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';

interface Audit {
  id: string;
  contractName: string;
  description: string;
  timeline: number; // assuming timeline is a number representing days
  budget: number;
  status: string;
  contractCode: string;
  chainType: string;
}

interface Enterprise {
  id: string;
  EthAdd: string;
  website: string;
  contactEmail: string;
  companyName: string;
  telegram: string;
  auditList: Audit[];
  role: string;
  description: string;
}

// Job Card Component
function JobCard({ audit, enterprise, onViewDetails }: {
  audit: Audit;
  enterprise: Enterprise;
  onViewDetails: () => void;
}) {
  return (
    <div className="bg-dark/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-light/20 p-8 hover:scale-[1.02] transition-transform duration-300">
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
          {audit.timeline} days
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-white mb-2">Budget:</h3>
        <p className="text-primary-light">${audit.budget} USD</p>
      </div>

      <button
        onClick={onViewDetails}
        className="w-full bg-gradient-to-r from-primary-light to-primary hover:opacity-90 text-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200"
      >
        View Details & Apply
      </button>
    </div>
  );
}

// Details Dialog Component
function JobDetailsDialog({
  isOpen,
  closeModal,
  audit,
  enterprise
}: {
  isOpen: boolean;
  closeModal: () => void;
  audit: Audit;
  enterprise: Enterprise;
}) {
  return (
    <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-dark/95 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-light/20 p-8">
          <div className="flex justify-between items-start mb-6">
            <DialogTitle className="text-2xl font-bold text-white">
              {audit.contractName}
            </DialogTitle>
            <button onClick={closeModal} className="text-gray-400 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-primary-light mb-2">Company Details</h3>
              <div className="space-y-2 text-gray-300">
                <p className='flex justify-between items-center' >{enterprise.companyName}
                  <a
                    href={enterprise.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary-light hover:text-primary"
                  >
                    Website <ExternalLink className="w-4 h-4" />
                  </a>
                </p>
                <p className='flex justify-between items-center' >Telegram: {enterprise.telegram}
                  <p>Contact: {enterprise.contactEmail}</p>
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-primary-light mb-2">Project Details</h3>
              <div className="space-y-4 text-gray-300">
                <p>{audit.description}</p>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-primary-light" />
                    {audit.chainType}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-primary-light" />
                    {audit.timeline} days
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2">Budget:</h4>
                  <p className="text-primary-light font-semibold">${audit.budget} USD</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Applied to ${audit.contractName} by ${enterprise.companyName}`);
                closeModal();
              }}
              className="w-full bg-gradient-to-r from-primary-light to-primary hover:opacity-90 text-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200"
            >
              Apply for this Position
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default function Jobs() {
  const [userdata, setUserdata] = useState<any[]>([]); // Assuming the data is an array
  const { fetchAllUsers } = useFirebase();

  const [selectedJob, setSelectedJob] = useState<{ audit: Audit; enterprise: Enterprise } | null>(null);

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
          {enterprises.map((enterprise) => (
            enterprise.auditList?.map((audit) => (
              <JobCard
                key={`${enterprise.id}-${audit.id || audit.contractName}`}
                audit={audit}
                enterprise={enterprise}
                onViewDetails={() => setSelectedJob({ audit, enterprise })}
              />
            ))
          ))}
        </div>

        {selectedJob && (
          <JobDetailsDialog
            isOpen={!!selectedJob}
            closeModal={() => setSelectedJob(null)}
            audit={selectedJob.audit}
            enterprise={selectedJob.enterprise}
          />
        )}
      </div>
    </div>
  );


}
