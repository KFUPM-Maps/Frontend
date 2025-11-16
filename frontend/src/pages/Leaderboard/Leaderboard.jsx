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
    <>
      <h1>Leaderboard</h1>
      <Topthree users={users} />
    </>
  );
}
