import { useEffect, useState } from "react";
import Topthree from "./Topthree";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = [
      { name: "Alice", score: 150 },
      { name: "Bob", score: 120 },
      { name: "Charlie", score: 100 },
    ];

    setUsers(userList);
  }, []);

  return (
    <div className="h-full p-6 md:p-8 bg-bg-dark text-text">
      <div className="max-w-5xl mx-auto">

        {/* Page Title */}
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Leaderboard</h1>

        {/* Outer orange background */}
        <div className="relative rounded-3xl border border-border bg-gradient-to-r from-amber-300/70 via-amber-100/40 to-bg overflow-hidden p-4 md:p-6">

          {/* Inner card */}
          <div className="mx-auto max-w-3xl bg-bg-light/90 border border-border rounded-2xl p-6 md:p-8 shadow-lg">

            {/* Card Title */}
            <h2 className="text-xl md:text-2xl font-semibold text-center mb-6">
              Leader Board
            </h2>

            {/* Top 3 component */}
            <Topthree users={users} />

            {/* Table */}
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-sm md:text-base border-collapse">
                <thead>
                  <tr className="bg-bg border-b border-border">
                    <th className="px-3 py-2 text-left border border-border">Place</th>
                    <th className="px-3 py-2 text-left border border-border">Name</th>
                    <th className="px-3 py-2 text-left border border-border">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-bg/60">
                      <td className="px-3 py-2 border border-border">{index + 1}</td>
                      <td className="px-3 py-2 border border-border">{user.name}</td>
                      <td className="px-3 py-2 border border-border">{user.score}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
