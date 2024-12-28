import { Target, Zap, Trophy } from 'lucide-react';

const quests = [
  {
    title: "Beginner's Journey",
    description: "Complete 5 basic security lessons",
    progress: 60,
    reward: "50 XP",
    icon: <Target className="w-6 h-6 text-blue-500" />
  },
  {
    title: "Code Reviewer",
    description: "Review 3 smart contracts for vulnerabilities",
    progress: 33,
    reward: "100 XP",
    icon: <Zap className="w-6 h-6 text-yellow-500" />
  },
  {
    title: "Security Champion",
    description: "Achieve a perfect score in the advanced security quiz",
    progress: 0,
    reward: "200 XP + Champion Badge",
    icon: <Trophy className="w-6 h-6 text-green-500" />
  }
];

export default function Quest() {
  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Quests</h2>
        <p className="text-sm text-gray-600">Complete quests to earn XP and badges</p>
      </div>
      <div className="space-y-4">
        {quests.map((quest, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-md shadow-sm">
            <div className="flex-shrink-0">{quest.icon}</div>
            <div className="flex-grow">
              <h4 className="text-sm font-semibold text-gray-700">{quest.title}</h4>
              <p className="text-xs text-gray-500">{quest.description}</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div className="text-xs font-medium text-gray-500">{`${quest.progress}% Completed`}</div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="h-2.5 bg-blue-500 rounded-full"
                    style={{ width: `${quest.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="px-3 py-1 text-xs font-semibold text-white bg-gray-500 rounded-md">{quest.reward}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
