"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client"; // Use client version

type Player = { name: string; role: string };

export default function Premier() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("test").select("name, role");
      if (error) setError(error);
      setPlayers(data || []);
      console.log("players data:", data);
    };
    fetchPlayers();
  }, []); 

  if (error) {
    return <div>Error loading teams</div>;
  }

  if (!players || players.length === 0) {
    return <p>No players found.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Players</h1>
      <ul className="space-y-2">
        {players.map((player) => (
          <li key={player.name}>
            <span className="font-medium">{player.name}</span> — {player.role}
          </li>
        ))}
      </ul>
    </div>
  );
}