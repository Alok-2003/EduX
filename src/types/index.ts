export interface SmartContract {
    id: string;
    name: string;
    company: string;
    description: string;
    chainType: string;
    codeUrl: string;
    status: 'open' | 'in-progress' | 'completed';
    reward: string;
  }
  
  export interface Job {
    id: string;
    title: string;
    company: string;
    description: string;
    requirements: string[];
    experience: string;
    location: string;
    type: 'full-time' | 'contract';
  }
  
  export interface CompanyRequest {
    id: string;
    contractName: string;
    chainType: string;
    budget: string;
    timeline: string;
    description: string;
    contractCode: string;
    status: 'pending' | 'approved' | 'rejected';
  }