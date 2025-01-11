import React, { useEffect, useState } from 'react';
import { AlertTriangle, Shield, Lock, BookOpen, Code, Terminal, ChevronDown, ChevronRight } from 'lucide-react';

// Types remain the same
interface SubSection {
  id: string;
  title: string;
  content: string;
  isHtml: boolean;
  code?: string;

}

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  severity: 'High' | 'Medium' | 'Critical';
  subSections: SubSection[];
  code?: string;
}

// Sections data remains the same
const sections: Section[] = [
  {
    "id": "introduction",
    "title": "Introduction to Smart Contract Security",
    "icon": <Shield className='w-5 h-5' />,
    "severity": "Medium",
    "subSections": [
      {
        "id": "overview",
        "title": "Overview of Security",
        "content": "Smart contract security is a crucial aspect of blockchain development, as vulnerabilities can lead to severe consequences. A smart contract is an immutable and self-executing program deployed on the blockchain, where even a single error in the code can result in catastrophic outcomes, such as loss of funds, denial of service, or exploitation by malicious actors.\n\nUnderstanding common vulnerabilities, such as reentrancy attacks, integer overflows, and improper access control, allows developers to build more secure applications. Additionally, the public and transparent nature of blockchain makes it imperative to ensure that contracts are free from flaws, as once deployed, they cannot be easily modified or updated.\n\nSecurity is not just a developer's concern but also directly impacts users, stakeholders, and the ecosystem's overall trust. A thorough understanding of security principles enables developers to adopt proactive measures like using established design patterns, performing rigorous testing, and conducting regular audits.",
        isHtml: false,
      },
      {
        "id": "importance",
        "title": "Importance of Security",
        "content": "Understanding the importance of securing smart contracts helps developers create robust and reliable decentralized applications. Without proper security measures, even minor vulnerabilities can lead to significant financial and reputational damage. Examples like the DAO hack and the Poly Network breach highlight the devastating consequences of insecure smart contracts, where millions of dollars were lost or locked irreversibly.\n\nSecurity is a foundational pillar of decentralized systems because users place trust in code rather than intermediaries. Ensuring the integrity and reliability of that code is paramount for the growth of the blockchain ecosystem. By prioritizing security, developers can:\n<ol><li><strong>1.Protect User Funds:</strong> Prevent loss or theft of assets held in the contract.</li><li><strong>2.Maintain Trust:</strong> Build confidence among users and investors, encouraging adoption.</li><li><strong>3.Enable Scalability:</strong> Secure systems are easier to scale as they minimize risks associated with growth.</li><li><strong>4.Preserve Decentralization:</strong> Avoid reliance on centralized recovery mechanisms caused by vulnerabilities.</li></ol>\n\nDevelopers must adopt a mindset of continuous vigilance, leveraging best practices, automated tools, and audits to ensure that smart contracts remain secure against evolving threats. Security is not a one-time effort but a continuous process that evolves alongside the blockchain landscape.",
        isHtml: true,

      }
    ]
  },
  {
    "id": "reentrancy",
    "title": "Reentrancy Vulnerability",
    "icon": <Shield className='w-5 h-5' />,
    "severity": "Critical",
    "subSections": [
      {
        "id": "overview",
        "title": "Overview of Reentrancy",
        "content": "Reentrancy is a critical vulnerability in smart contracts that occurs when a contract calls an external contract, allowing the external contract to re-enter and execute functions in the calling contract before the first execution is complete. This creates a 'race to empty' scenario where an attacker can withdraw more funds than they are entitled to. The FundTransfer contract in the example below is vulnerable to a reentrancy attack, allowing attackers to repeatedly withdraw funds.",
        "isHtml": false
      },
      {
        "id": "why-vulnerable",
        "title": "Why It's Vulnerable?",
        "content": "This contract allows users to transfer funds to each other and withdraw their funds. However, the `withdraw()` function is vulnerable to a reentrancy attack. The attack happens because the function updates the balance of the sender after transferring funds, meaning the contract could be re-entered before the balance is updated. An attacker could repeatedly call `withdraw()` and drain funds from the contract.",
        "isHtml": false
      },
      {
        "id": "impact",
        "title": "Impact of the Vulnerability",
        "content": "An attacker could exploit this vulnerability by creating a malicious contract that calls the `transfer()` function to transfer funds, and then repeatedly calls `withdraw()`. This would allow the attacker to withdraw more funds than they deposited, potentially draining the entire contract balance. This type of attack is commonly known as a 'reentrancy attack' or 'race to empty'.",
        "isHtml": false
      },
      {
        "id": "how-to-fix",
        "title": "How to Fix the Vulnerability",
        "content": "To prevent a reentrancy attack, the `withdraw()` function should be updated to ensure the contract’s state is updated before calling any external function. This can be achieved by ensuring that any state-changing operations occur before interacting with external addresses or contracts. The following fix ensures the state is updated before transferring funds:\n\n```solidity\nfunction withdraw() public {\n  require(!msg.sender.isContract());\n  uint amount = balances[msg.sender];\n  balances[msg.sender] = 0;\n  msg.sender.transfer(amount);\n}\n```\n\nThis fix prevents malicious contracts from exploiting the vulnerability by checking if the caller is a contract, ensuring that only external users can withdraw funds.",
        "isHtml": true
      }
    ]
  },
  {
    "id": "brokenAccessControl",
    "title": "Broken Access Control",
    "icon": <Shield className='w-5 h-5' />,
    "severity": "High",
    "subSections": [
      {
        "id": "overview",
        "title": "Overview of Vulnerability",
        "content": "The smart contract is vulnerable to Broken Access Control due to improper permission checks in the `initWallet()` function. The contract allows any user to create new Wallet contracts by calling `initWallet()`, without checking if the caller is the intended contract owner. This can lead to attackers creating Wallet contracts that they control, posing a security risk.",
        "isHtml": false
      },
      {
        "id": "whyItsVulnerable",
        "title": "Why It's Vulnerable?",
        "content": "In this contract, the `initWallet()` function does not properly restrict access to only the owner. This function is intended to be called only by the contract's owner to create new Wallet contracts. However, an attacker can call this function and create a Wallet that they control, bypassing the intended access restrictions.",
        "isHtml": false
      },
      {
        "id": "impact",
        "title": "Impact of the Vulnerability",
        "content": "An attacker can exploit this vulnerability to create Wallet contracts under their control, potentially leading to loss of funds or unauthorized manipulation of the contract. The attacker could access and transfer funds from wallets they create, thus undermining the integrity of the smart contract system.",
        "isHtml": false
      },
      {
        "id": "fix",
        "title": "How to Fix?",
        "content": "To prevent this vulnerability, the `initWallet()` function should be updated to include a proper permission check to ensure that only the contract's owner can call it. The fixed version of the contract would look as follows: \nThis ensures that only the owner can create new Wallet contracts, thus eliminating the access control issue.",
        "isHtml": false,
        "code": "solidity\nfunction initWallet(address _owner) public {\n  require(msg.sender == owner);\n  Wallet wallet = new Wallet(_owner);\n}\n",
      }
    ]
  },

];


function TableOfContents({ sections, activeSection }: { sections: Section[]; activeSection: string }) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>(
    () =>
      sections.reduce((acc, section) => {
        acc[section.id] = true;
        return acc;
      }, {} as { [key: string]: boolean })
  );

  const toggleSection = (id: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="w-[18rem] flex-shrink-0">
      <div className="sticky top-4 p-4">
        <div className="flex items-center gap-2 ml-4 mb-2">
          <BookOpen className="w-7 h-7 text-primary-light" />
          <h2 className="text-2xl font-semibold text-white">Contents</h2>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => {
            const isOpen = openSections[section.id];
            const isActive = activeSection === section.id;
            return (
              <div key={section.id}>
                <div
                  className={`flex items-center justify-between px-4 py-2 ${isActive ? 'bg-primary-light/20 text-white' : 'text-gray-400'}
    hover:text-white transition-colors cursor-pointer`}
                  onClick={() => toggleSection(section.id)}
                >
                  <span className="truncate w-[12rem]">{section.title}</span>
                  {isOpen ? (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>

                {isOpen && (
                  <div className="ml-4 space-y-1">
                    {section.subSections.map((subSection) => (
                      <a
                        key={subSection.id}
                        href={`#${section.id}-${subSection.id}`}
                        className={`block px-4 py-1 text-sm ${activeSection === `${section.id}-${subSection.id}`
                          ? 'text-white'
                          : 'text-gray-400'
                          } hover:text-white transition-colors`}
                      >
                        {subSection.title}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

function ContentSection({ section }: { section: Section }) {
  return (
    <div id={section.id} className="scroll-mt-8 space-y-8 mb-16">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        {/* Title with Icon */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary-light/10 text-primary-light">
            {section.icon}
          </div>
          <h2 className="text-2xl font-bold text-white">{section.title}</h2>
        </div>

        {/* Severity Tag */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${section.severity === 'Critical'
            ? 'bg-red-500/20 text-red-500'
            : section.severity === 'High'
              ? 'bg-primary-light/20 text-primary-light'
              : 'bg-accent/20 text-accent'
            }`}
        >
          {section.severity}
        </span>
      </div>

      {/* Optional Code Block */}

      {/* SubSections */}
      {section.subSections.map((subSection) => (
        <div
          key={subSection.id}
          id={`${section.id}-${subSection.id}`}
          className="scroll-mt-8 space-y-4"
        >
          {/* SubSection Title */}
          <h3 className="text-xl font-semibold text-white">
            {subSection.title}
          </h3>

          {/* SubSection Content */}
          <div className="prose prose-invert max-w-none text-gray-300">
            {/* Render as HTML if subSection.content is HTML */}
            {subSection.isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: subSection.content }} />
            ) : (
              <div className="whitespace-pre-line">{subSection.content}</div>
            )}
          </div>
          {subSection.code && (
            <div className="relative mt-4">
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary-light" />
                <span className="text-sm text-primary-light">Solidity</span>
              </div>
              <pre className="bg-dark/50 border border-primary-light/20 rounded-lg p-4 overflow-x-auto">
                <code className="text-sm text-gray-300">{subSection.code}</code>
              </pre>
            </div>
          )}

        </div>
      ))}
    </div>
  );
}


export default function Learn() {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const sectionElements = document.querySelectorAll('[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.6 }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h- bg-gradient-to-br from-dark via-dark to-accent/20">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Smart Contract{' '}
            <span className="bg-gradient-to-r from-primary-light via-primary to-primary-dark text-transparent bg-clip-text">
              Security
            </span>
          </h1>
          <p className="text-xl text-gray-400">
            Master the fundamentals of secure smart contract development
          </p>
        </div>

        <div className="bg-dark/80 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-light/20">
          <div className="flex">
            <TableOfContents sections={sections} activeSection={activeSection} />
            <div className="flex-1  p-8 border-l border-primary-light/20">
              {sections.map((section) => (
                <ContentSection key={section.id} section={section} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
