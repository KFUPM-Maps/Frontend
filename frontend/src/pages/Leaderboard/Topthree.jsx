export default function Topthree({topThree}) {
  const medals = ["🥇", "🥈", "🥉"];
  topThree = topThree.map((user, index) => ({
    ...user,
    medal: medals[index],
  }));

  return (
    <div className="mb-6 flex items-end justify-center gap-6 text-center">
      {topThree.map((user, index) => (
        <div key={user.firstName + user.lastName} className="flex flex-col items-center text-sm">
          <div
            className={`flex items-center justify-center rounded-full bg-bg
            ${
              index === 0
                ? "w-14 h-14 border-2 border-amber-300"
                : "w-12 h-12 border border-border"
            } mb-1`}
          >
            <span className="text-lg">{user.medal}</span>
          </div>

          <span className="font-medium">{user.firstName.split(" ")[0]}</span>


          <span className="mt-1 font-semibold text-amber-500">
            {user.score}
          </span>

          <div
            className={`mt-2 h-1 rounded-full ${
              index === 0
                ? "w-8 bg-amber-300"
                : index === 1
                ? "w-10 bg-slate-300"
                : "w-7 bg-amber-500"
            }`}
          />
        </div>
      ))}
    </div>
  );
}