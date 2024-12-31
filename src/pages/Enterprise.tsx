import React from 'react';
import { Shield, Clock, Users, LucideIcon } from 'lucide-react';
import type { CompanyRequest } from '../types';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useFirebase } from '../contexts/FirebaseContext';

// Constants
const features = [
  {
    icon: Shield,
    title: "Comprehensive Security Audit",
    description: "Our team of experts performs thorough code reviews and vulnerability assessments using state-of-the-art AI technology."
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Get your results quickly with our efficient audit process, without compromising on quality and thoroughness."
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Work with experienced blockchain security professionals who have audited over $2B worth of smart contracts."
  }
];

const inputStyles = "w-full px-4 py-2 bg-dark/50 border border-primary-light/20 rounded-lg focus:ring-2 focus:ring-primary-light/50 text-white placeholder-gray-500";

// Feature Card Component
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="group hover:scale-105 transition-transform duration-300 bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-primary-light/10">
      <div className="flex items-start space-x-4">
        <Icon className="w-10 h-10 text-primary-light flex-shrink-0" />
        <div>
          <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-primary-light transition-colors">{title}</h3>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}

// Form Field Component
interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">{label}</label>
      {children}
    </div>
  );
}

// Audit Form Component
function AuditForm() {
  const [formData, setFormData] = React.useState<CompanyRequest>({
    id: '',
    contractName: '',
    chainType: '',
    budget: '',
    timeline: '',
    description: '',
    contractCode: '',
    status: 'pending'
  });
  const { ethAddress } = useGlobalContext();
  const { saveEnterpriseData } = useFirebase();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethAddress) {
      console.error("ethAddress is not available.");
      return;
    }
    saveEnterpriseData(formData, ethAddress)
      .then(() => console.log("Data saved successfully"))
      .catch((error) => console.error("Error saving data:", error));
  };
  return (
    <div className="bg-dark/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-light/20 p-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Request an Audit</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <FormField label="Smart Contract Name">
          <input
            type="text"
            className={inputStyles}
            value={formData.contractName}
            onChange={(e) => setFormData({ ...formData, contractName: e.target.value })}
            required
          />
        </FormField>

        <FormField label="Smart Contract Code">
          <textarea
            className={`${inputStyles} font-mono text-sm`}
            rows={8}
            placeholder="Paste your smart contract code here..."
            value={formData.contractCode}
            onChange={(e) => setFormData({ ...formData, contractCode: e.target.value })}
            required
          />
        </FormField>

        <FormField label="Blockchain Type">
          <select
            className={inputStyles}
            value={formData.chainType}
            onChange={(e) => setFormData({ ...formData, chainType: e.target.value })}
            required
          >
            <option value="">Select chain</option>
            <option value="ethereum">Ethereum</option>
            <option value="binance">Binance Smart Chain</option>
            <option value="polygon">Polygon</option>
            <option value="solana">Solana</option>
          </select>
        </FormField>

        <FormField label="Budget Range">
          <input
            type="text"
            className={inputStyles}
            placeholder="e.g., $5,000 - $10,000"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
            required
          />
        </FormField>

        <FormField label="Project Timeline">
          <input
            type="text"
            className={inputStyles}
            placeholder="e.g., 2-4 weeks"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
            required
          />
        </FormField>

        <FormField label="Project Description">
          <textarea
            className={`${inputStyles} resize-none`}
            rows={4}
            placeholder="Describe your project and security requirements..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </FormField>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-primary-light to-primary hover:opacity-90 text-dark font-semibold px-8 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all duration-200"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

// Main Enterprise Component
export default function Enterprise() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark via-dark to-accent/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Enterprise Smart Contract{' '}
            <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark text-transparent bg-clip-text">
              Auditing
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Secure your blockchain applications with our comprehensive auditing service
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
          <AuditForm />
        </div>
      </div>
    </div>
  );
}