import { MapPin, Clock } from 'lucide-react';
import type { Job } from '../types/index';
export default function Jobs() {
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Senior Smart Contract Auditor',
      company: 'BlockSafe Solutions',
      description: 'Looking for experienced auditors to join our team in reviewing and securing blockchain applications.',
      requirements: ['5+ years in blockchain security', 'Solidity expertise', 'Security certification'],
      experience: '5+ years',
      location: 'Remote',
      type: 'full-time'
    },
    {
      id: '2',
      title: 'Blockchain Security Engineer',
      company: 'CryptoGuard',
      description: 'Join our team to help secure the future of decentralized finance through thorough smart contract audits.',
      requirements: ['3+ years in smart contract development', 'Strong cryptography background'],
      experience: '3+ years',
      location: 'Remote',
      type: 'full-time'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blockchain Security Jobs
          </h1>
          <p className="text-xl text-gray-600">
            Find your next role in smart contract security and auditing
          </p>
        </div>

        <div className="space-y-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h2>
                    <div className="text-lg font-semibold text-blue-600 mb-4">{job.company}</div>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                    {job.type}
                  </span>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="flex items-center space-x-6 text-gray-500 mb-4">
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-2" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    {job.experience}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Requirements:</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold">
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}