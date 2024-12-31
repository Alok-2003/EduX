import React from 'react';
import { AlertTriangle, Shield, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Vulnerability {
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: 'High' | 'Medium' | 'Critical';
  link: string;
}

const vulnerabilities: Vulnerability[] = [
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

function VulnerabilityCard({ title, description, icon, severity, link }: Vulnerability) {
  const severityColors = {
    High: 'bg-primary-light/20 text-primary-light',
    Medium: 'bg-accent/20 text-accent',
    Critical: 'bg-red-500/20 text-red-500'
  };

  return (
    <div className="bg-dark/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-light/20 p-8 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="text-primary-light">{icon}</div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${severityColors[severity]}`}>
          {severity}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-primary-light hover:text-primary transition-colors duration-200 font-semibold"
      >
        Learn more <span className="ml-2">→</span>
      </a>
    </div>
  );
}

export default function Learn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-accent/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Learn Smart Contract{' '}
              <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark text-transparent bg-clip-text">
                Security
              </span>
            </h1>
            <p className="text-xl text-gray-400">
              Master the art of secure smart contract development
            </p>
          </div>
          <Link
            to="/quest"
            className="bg-gradient-to-r from-primary-light to-primary hover:opacity-90 text-dark font-semibold px-8 py-3 rounded-lg transition-all duration-200"
          >
            Start Quest
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {vulnerabilities.map((item, index) => (
            <VulnerabilityCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
