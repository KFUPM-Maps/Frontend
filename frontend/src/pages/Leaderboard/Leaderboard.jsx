import { useEffect, useState } from "react";
import Topthree from "./Topthree";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const userList = [
      { firstName: "Yousef", lastName: "Alhajri", score: 150 },
      { firstName: "Khalid", lastName: "Alotaibi", score: 120 },
      { firstName: "Mohamed", lastName: "Hassan", score: 100 },
      { firstName: "Ahmed", lastName: "Yahya", score: 95 },
      { firstName: "Ali", lastName: "Saleh", score: 90 },
      { firstName: "Osama", lastName: "BinZaid", score: 85 },
      { firstName: "Hassan", lastName: "Almalki", score: 80 },
      { firstName: "Abdelrahman ", lastName: "Khaled", score: 75 },
      { firstName: "Mona", lastName: "Saeed", score: 70 },
      { firstName: "Nour", lastName: "Ibrahim", score: 65 },
    ];

    setUsers(userList);
  }, []);

  const sortedUsers = [...users].sort((a, b) => b.score - a.score);
  const topThree = sortedUsers.slice(0, 3);

  return (
    <div className="h-full w-full flex justify-center items-center text-text">
      <div className="w-10/12 border flex flex-col items-center bg-linear-to-t from-bg to-bg-light border-border rounded-2xl p-6 md:p-8 shadow-lg">

        <h2 className="text-3xl md:text-2xl font-semibold text-center mb-6">
          Leaderboard
        </h2>

        <Topthree topThree={topThree} />

        {/* Creative list instead of Excel-style table */}
        <div className="mt-6 max-h-64 w-3/4 md:1/2 overflow-y-auto pr-1 space-y-3">
          {sortedUsers.map((user, index) => (
            <div
              key={user.name}
              className="flex items-center justify-between rounded-xl border border-border-muted bg-bg-light px-4 py-3 md:px-5 md:py-4 shadow-sm hover:shadow-lg hover:border-border transition-all"
            >
              {/* Left: rank + name */}
              <div className="flex items-center gap-3 md:gap-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold
                    ${
                      index === 0
                        ? "bg-gradient-to-br from-amber-200 to-amber-400 text-bg-dark"
                        : index === 1
                        ? "bg-gradient-to-br from-slate-300 to-slate-500 text-bg-dark"
                        : "bg-gradient-to-br from-amber-400 to-amber-600 text-bg-dark"
                    }
                  `}
                >
                  #{index + 1}
                </div>

                <div>
                  <p className="text-sm md:text-base font-semibold">
                    {user.firstName + " " + user.lastName}
                  </p>
                </div>
              </div>

              {/* Right: points badge */}
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-bg-light/70 px-3 py-1 text-xs md:text-sm font-semibold text-amber-400 border border-border/60">
                  {user.score}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
