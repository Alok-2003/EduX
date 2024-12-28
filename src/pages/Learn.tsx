import { AlertTriangle, Shield, Lock } from 'lucide-react';
import Leaderboard from '../Components/Leaderboard';
import { Link } from 'react-router-dom';

export default function Learn() {

  const vulnerabilities = [
    {
      title: 'Access Control',
      description: 'Explore proper implementation of access controls and permission systems.',
      icon: <Lock className="w-8 h-8 text-blue-500" />,
      severity: 'Critical',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Access_Control.md"
    },
    {
      title: 'Reentrancy',
      description: 'An attacker can exploit a contract by re-entering the contract during execution.',
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      severity: 'High',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Reentrancy.md"
    },
    {
      title: 'Arithmetic Issues',
      description: 'Errors in arithmetic calculations can lead to unexpected behavior.',
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      severity: 'Medium',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Arithmetic.md"
    },
    {
      title: 'Broken Access Control',
      description: 'Learn how attackers can bypass restrictions and gain unauthorized access to contract functions.',
      icon: <Lock className="w-8 h-8 text-red-500" />,
      severity: 'High',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Broken_Access_Control.md"
    },
    {
      title: 'Silent Failing Sends',
      description: 'Explore how failing sends can go unnoticed and cause potential vulnerabilities.',
      icon: <AlertTriangle className="w-8 h-8 text-orange-500" />,
      severity: 'Medium',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Silent_Failing_Sends.md"
    },
    {
      title: 'Denial of Service',
      description: 'Learn about attacks that aim to make a contract or service unavailable.',
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      severity: 'Critical',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Denial_of_Service.md"
    },
    {
      title: 'Bad Randomness',
      description: 'Understand the impact of insecure randomness in smart contracts.',
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      severity: 'High',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Bad_Randomness.md"
    },
    {
      title: 'Front-Running',
      description: 'Learn how attackers can manipulate transactions for their own benefit.',
      icon: <Shield className="w-8 h-8 text-yellow-500" />,
      severity: 'Medium',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Front-Running.md"
    },
    {
      title: 'Time Manipulation',
      description: 'Understand the risks of relying on block timestamps for critical logic.',
      icon: <Lock className="w-8 h-8 text-blue-500" />,
      severity: 'Critical',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Time_Manipulation.md"
    },
    {
      title: 'Short Address Attack',
      description: 'Explore how attackers can exploit short input addresses to manipulate smart contract logic.',
      icon: <AlertTriangle className="w-8 h-8 text-red-500" />,
      severity: 'High',
      link: "https://github.com/yevh/VulnPlanet/blob/main/web3/Short_Address_Attack.md"
    }
  ];


  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Learn Smart Contract Security
            </h1>
            <Link
              to={'/quest'}
              className="px-4 py-2 bg-blue-700 text-white font-medium rounded-md hover:bg-blue-800 transition duration-200"
            >
              Quest
            </Link>
          </div>
          <p className="text-xl text-left text-gray-600">
            Comprehensive guides on common vulnerabilities and best practices
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {vulnerabilities.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {item.icon}
                      <span
                        className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${item.severity === 'High'
                            ? 'bg-red-100 text-red-800'
                            : item.severity === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                      >
                        {item.severity}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-blue-600 hover:text-blue-800 font-semibold"
                    >
                      Learn more →
                    </a>
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
