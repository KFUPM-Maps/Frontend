import { useEffect, useState } from "react";
import Topthree from "./Topthree";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = [
      { name: "Yousef", score: 150 },
      { name: "Khalid", score: 120 },
      { name: "Mohamed", score: 100 },
      { name: "Ahmed", score: 95 },
      { name: "Ali", score: 90 },
      { name: "Osama", score: 85 },
      { name: "Hassan", score: 80 },
      { name: "Abdelrahman ", score: 75 },
      { name: "Mona", score: 70 },
      { name: "Nour", score: 65 },
    ];

    setUsers(userList);
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const topThree = sortedUsers.slice(0, 3);

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
            <Topthree users={topThree} />

            {/* Creative list instead of Excel-style table */}
            <div className="mt-6 max-h-64 overflow-y-auto pr-1 space-y-3">
              {sortedUsers.map((user, index) => (
                <div
                  key={user.name}
                  className="flex items-center justify-between rounded-xl border border-border/60 bg-bg/70 px-4 py-3 md:px-5 md:py-4 shadow-sm hover:shadow-lg hover:border-primary/70 transition-all"
                >
                  {/* Left: rank + name */}
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold
                        ${
                          index === 0
                            ? "bg-gradient-to-br from-amber-400 to-amber-600 text-bg-dark"
                            : index === 1
                            ? "bg-gradient-to-br from-slate-300 to-slate-500 text-bg-dark"
                            : "bg-gradient-to-br from-amber-200 to-amber-400 text-bg-dark"
                        }
                      `}
                    >
                      #{index + 1}
                    </div>

                    <div>
                      <p className="text-sm md:text-base font-semibold">
                        {user.name}
                      </p>
                      <p className="text-[11px] md:text-xs text-text-muted">
                        Top route contributor
                      </p>
                    </div>
                  </div>

                  {/* Right: points badge */}
                  <div className="flex items-center gap-2">
                    <span className="hidden text-xs text-text-muted md:inline">
                      Points
                    </span>
                    <span className="rounded-full bg-bg-light/70 px-3 py-1 text-xs md:text-sm font-semibold text-amber-400 border border-border/60">
                      {user.score} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
