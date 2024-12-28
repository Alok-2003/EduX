import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Code, Users } from 'lucide-react';

function BackgroundPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_#77E4C8_0%,_transparent_25%)] opacity-20 animate-pulse" />
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="opacity-20">
          <pattern id="dotPattern" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="1.22676" cy="1.22676" r="1.22676" fill="rgba(119, 228, 200, 0.07)" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#dotPattern)" />
        </svg>
      </div>
    </div>
  );
}

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark text-transparent bg-clip-text">
      {children}
    </span>
  );
}

function Stats() {
  const stats = [
    { icon: <Shield className="w-12 h-12" />, value: '500+', label: 'Contracts Audited' },
    { icon: <Code className="w-12 h-12" />, value: '$1.5B+', label: 'Vulnerabilities Found' },
    { icon: <Users className="w-12 h-12" />, value: '300+', label: 'Auditors Competing' },
  ];

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      {stats.map((stat, index) => (
        <div key={index} className="flex items-center justify-center space-x-4 p-6 bg-dark/50 backdrop-blur-sm border border-primary-light/20 rounded-xl">
          <div className="text-primary-light">{stat.icon}</div>
          <div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-gray-400">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-dark via-dark to-accent/20">
      <BackgroundPattern />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-6">
              <Shield className="w-6 h-6 text-primary-light" />
              <span className="text-primary-light font-semibold">AI-Driven • Competitive • Secure</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Compete to <GradientText>Audit and Secure</GradientText> Smart Contracts
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              EduX creates a competitive environment where developers race to uncover vulnerabilities, powered by AI tools to enhance the audit process.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/enterprise" className="w-full sm:w-auto bg-gradient-to-r from-primary-light to-primary hover:opacity-90 text-dark font-semibold px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200">
                <span>List Your Contract</span>
                <Zap className="w-5 h-5" />
              </Link>
              <Link to="/learn" className="w-full sm:w-auto border-2 border-primary-light text-primary-light hover:bg-primary-light hover:text-dark px-8 py-3 rounded-lg font-semibold transition-all duration-200">
                Learn About Auditing
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 to-accent/20 rounded-3xl filter blur-3xl"></div>
            <div className="relative bg-dark/80 backdrop-blur-sm border border-primary-light/20 rounded-3xl p-8">
              <pre className="text-primary-light/90 text-sm overflow-x-auto">
                <code>{`// Vulnerable Smart Contract Example
contract Token {
    mapping(address => uint) balances;

    function transfer(address to, uint amount) {
        // Detected vulnerability:
        // Insufficient balance check
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}`}</code>
              </pre>
              <div className="mt-4 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <h3 className="text-primary-light font-semibold mb-2">AI-Powered Vulnerability Report:</h3>
                <p className="text-gray-300">Detected: Missing balance validation, vulnerable to reentrancy attack.</p>
              </div>
            </div>
          </div>
        </div>

        <Stats />
      </div>
    </div>
  );
}
