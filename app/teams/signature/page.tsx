import { createClient } from "@/lib/supabase/server";


import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams",
};

export default async function Premier() {
    const supabase = await createClient();


    const { data: players, error } = await supabase
    .from('test')
    .select('name,role')

    console.log("players data:", players);
    

  if (error) {
    console.error("Error fetching teams:", error);
    return <div>Error loading teams</div>;
  }

   // ✅ Handle empty state
  if (!players || players.length === 0) {
    return <p>No players found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Players</h1>
      <ul className="space-y-2">
        {players?.map((player) => (
          <li key={player.name}>
            <span className="font-medium">{player.name}</span> — {player.role}
          </li>
        ))}
      </ul>
    </div>
  );

}
