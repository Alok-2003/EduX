import { AlertTriangle, Shield, Lock } from 'lucide-react';
import Quest from '../Components/Quest';
import Leaderboard from '../Components/Leaderboard';
import { Link } from 'react-router-dom';

export default function Learn() {
  const vulnerabilities = [
    {
      title: 'Reentrancy Attacks',
      description: 'Learn how attackers can recursively call back into a contract before the first execution is finished.',
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      severity: 'High'
    },
    {
      title: 'Integer Overflow',
      description: 'Understand how arithmetic operations can wrap around when exceeding the maximum value.',
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      severity: 'Medium'
    },
    {
      title: 'Access Control',
      description: 'Explore proper implementation of access controls and permission systems.',
      icon: <Lock className="w-8 h-8 text-blue-500" />,
      severity: 'Critical'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-bold text-gray-900 ">
              Learn Smart Contract Security
            </h1>
            <Link to={'/quest'}
              className="px-4 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition duration-200"
            >Quest </Link>
          </div>
          <p className="text-xl text-left text-gray-600">
            Comprehensive guides on common vulnerabilities and best practices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vulnerabilities.map((item, index) => (
                <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {item.icon}
                      <span className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold
                        ${item.severity === 'High' ? 'bg-red-100 text-red-800' :
                          item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'}`}>
                        {item.severity}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <button className="mt-4 text-blue-600 hover:text-blue-800 font-semibold">
                      Learn more →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-8">
            <Leaderboard />
          </div>
        </div>
      </div>
    </div>
  );
}

