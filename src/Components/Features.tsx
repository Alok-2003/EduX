import { Shield, Code, Building2, Brain } from 'lucide-react';
export default function Features() {
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-primary-light" />,
      title: "Advanced Security",
      description: "State-of-the-art AI-powered vulnerability detection"
    },
    {
      icon: <Code className="w-12 h-12 text-primary-light" />,
      title: "Expert Auditors",
      description: "Skilled professionals reviewing your smart contracts"
    },
    {
      icon: <Building2 className="w-12 h-12 text-primary-light" />,
      title: "Enterprise Ready",
      description: "Tailored solutions for businesses of all sizes"
    },
    {
      icon: <Brain className="w-12 h-12 text-primary-light" />,
      title: "AI Integration",
      description: "Cutting-edge AI technology for thorough analysis"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-dark/50 backdrop-blur-sm border border-primary-light/20 p-6 rounded-xl">
            {feature.icon}
            <h3 className="text-xl font-semibold text-white mt-4 mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}