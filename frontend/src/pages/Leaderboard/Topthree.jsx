const topThree = [
    { place: 2, name: "Flan Alflany", points: 1500, medal: "🥈" },
    { place: 1, name: "Flan Alflany", points: 2000, medal: "🥇" },
    { place: 3, name: "Flan Alflany", points: 1200, medal: "🥉" },
  ];
  
  export default function Topthree() {
    return (
      <div className="mb-6 flex items-end justify-center gap-6 text-center">
        {topThree.map((user, index) => (
          <div key={user.place} className="flex flex-col items-center text-sm">
            {/* دائرة الأفاتار */}
            <div
              className={`flex items-center justify-center rounded-full bg-bg
              ${
                user.place === 1
                  ? "w-14 h-14 border-2 border-amber-500"
                  : "w-12 h-12 border border-border"
              } mb-1`}
            >
              <span className="text-lg">{user.medal}</span>
            </div>
  
            {/* الاسم */}
            <span className="font-medium">{user.name.split(" ")[0]}</span>
  
            {/* النقاط */}
            <span className="mt-1 font-semibold text-amber-500">
              {user.points}
            </span>
  
            {/* خط بسيط تحت  */}
            <div
              className={`mt-2 h-1 rounded-full ${
                index === 0
                  ? "w-8 bg-amber-400"
                  : index === 1
                  ? "w-10 bg-amber-500"
                  : "w-7 bg-amber-300"
              }`}
            />
          </div>
        ))}
      </div>
    );
  }