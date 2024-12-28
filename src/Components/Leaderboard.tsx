export default function Leaderboard() {
    const leaderboardData = [
      { name: "Alice", score: 1250, avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Bob", score: 1100, avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Charlie", score: 950, avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David", score: 800, avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Eve", score: 750, avatar: "/placeholder.svg?height=32&width=32" }
    ];
  
    return (
      <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">Leaderboard</h2>
          <p className="text-gray-600">Top performers in smart contract security</p>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {leaderboardData.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 font-medium">{index + 1}</span>
                  {/* <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  </div> */}
                  <span className="font-semibold text-gray-800">{user.name}</span>
                </div>
                <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">
                  {user.score} XP
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  