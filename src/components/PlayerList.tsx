import React, { useState } from 'react';
import { UserPlus, Info } from 'lucide-react';
import Button from './Button';
import PlayerListModal from './PlayerListModal';
import { useEffect } from 'react';

interface Player {
  name: string;
  gender: 'male' | 'female';
  orientation: 'straight' | 'bisexual';
  questionsAnswered: number;
  jokersLeft: number;
  passesLeft: number;
}

interface PlayerListProps {
  players: Player[];
  addPlayer: (player: Omit<Player, 'questionsAnswered' | 'jokersLeft' | 'passesLeft'>) => void;
  updatePlayer: (index: number, player: Omit<Player, 'questionsAnswered' | 'jokersLeft' | 'passesLeft'>) => void;
  removePlayer: (index: number) => void;
  isGameActive: boolean;
  currentPlayerIndex: number;
}



const PlayerList: React.FC<PlayerListProps> = ({ 
  players, 
  addPlayer, 
  updatePlayer, 
  removePlayer,
  isGameActive,
  currentPlayerIndex
}) => {
  const [newPlayer, setNewPlayer] = useState<Omit<Player, 'questionsAnswered' | 'jokersLeft' | 'passesLeft'>>({ 
    name: '', 
    gender: 'male', 
    orientation: 'straight' 
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Omit<Player, 'questionsAnswered' | 'jokersLeft' | 'passesLeft'> | null>(null);
  const [showPlayerModal, setShowPlayerModal] = useState(false);

  const handleAddPlayer = () => {
    if (newPlayer.name.trim()) {
      addPlayer(newPlayer);
      setNewPlayer({ name: '', gender: 'male', orientation: 'straight' });
    }
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditingPlayer({
      name: players[index].name,
      gender: players[index].gender,
      orientation: players[index].orientation
    });
  };

  const saveEditing = (index: number) => {
    if (editingPlayer) {
      updatePlayer(index, editingPlayer);
      setEditingIndex(null);
      setEditingPlayer(null);
    }
  };
  useEffect(() => {
          const storedPlayers = localStorage.getItem('players');

    
    if(players.length === 0 && storedPlayers && localStorage.getItem('firstLoad') !== 'true') {
        if(!localStorage.getItem('firstLoad')) {
      // If players array is empty and there are stored players, load them  
        const parsedPlayers: Player[] = JSON.parse(storedPlayers);
        players.push(...parsedPlayers);
        parsedPlayers.forEach(player => {
          addPlayer(player);
        });
        setNewPlayer({...newPlayer});
        localStorage.setItem('firstLoad', 'false');
      } else if(localStorage.getItem('firstLoad') === 'true'){
        // If players array is empty and there are stored players, load them  
                if(players.length > 1 ) {

        const parsedPlayers: Player[] = JSON.parse(storedPlayers);
        players.push(...parsedPlayers);
        parsedPlayers.forEach(player => {
          addPlayer(player);
        });
        setNewPlayer({...newPlayer});
        localStorage.setItem('firstLoad', 'false');

      } else{
        localStorage.setItem('firstLoad', 'false');
      }

      }else if (storedPlayers && localStorage.getItem('firstLoad') === 'false') {
        // If players array is empty and there are stored players, load them  
        if(players.length > 0 ) {
        const parsedPlayers: Player[] = JSON.parse(storedPlayers);
        players.push(...parsedPlayers);
        parsedPlayers.forEach(player => {
          addPlayer(player);
        });
        setNewPlayer({...newPlayer});
      } else{
        localStorage.setItem('firstLoad', 'true');
      }
      }

      
    }else if(localStorage.getItem('firstLoad') === 'true'){
        // If players array is empty and there are stored players, load them  
        const parsedPlayers: Player[] = JSON.parse(storedPlayers);
        players.push(...parsedPlayers);

        setNewPlayer({...newPlayer});
        localStorage.setItem('firstLoad', 'false');
      }else if (players.length >= 0 && localStorage.getItem('firstLoad') === 'false') {
      
  localStorage.setItem('players', JSON.stringify(players));

    } 
    
    
}, [addPlayer,removePlayer]);

  if (isGameActive) {

    return (
      <div className="mt-6 flex justify-center">
        <Button
          onClick={() => setShowPlayerModal(true)}
          color="gray"
          className="flex items-center justify-center"
        >
          <Info size={20} className="mr-2" />
          Player Info
        </Button>
        <PlayerListModal
          isOpen={showPlayerModal}
          onClose={() => setShowPlayerModal(false)}
          players={players}
          currentPlayerIndex={currentPlayerIndex}
        />
      </div>
    );
  }
  if( players.length !== 0) {
    localStorage.setItem('firstLoad','false');
  }
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-orange-500 text-transparent bg-clip-text">Players</h2>
      
      <ul className="space-y-3">
        {players.map((player, index) => (
          <li key={index} className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
            {editingIndex === index ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editingPlayer?.name}
                  onChange={(e) => setEditingPlayer({ ...editingPlayer!, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
                  placeholder="Player name"
                />
                <div className="grid grid-cols-2 gap-3">
                  <select
                    value={editingPlayer?.gender}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer!, gender: e.target.value as 'male' | 'female' })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <select
                    value={editingPlayer?.orientation}
                    onChange={(e) => setEditingPlayer({ ...editingPlayer!, orientation: e.target.value as 'straight' | 'bisexual' })}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
                  >
                    <option value="straight">Straight</option>
                    <option value="bisexual">Bisexual</option>
                  </select>
                </div>
                <Button 
                  onClick={() => saveEditing(index)} 
                  color="green"
                  className="w-full"
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-lg font-semibold text-gray-900">{player.name}</span>
                  <span className="text-sm text-gray-600">
                    {player.gender}, {player.orientation}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => startEditing(index)}
                    color="orange"
                    className="!p-2"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => removePlayer(index)}
                    color="red"
                    className="!p-2"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}
          </li>
        ))}
        {(players.length>=2)?(<li>
                  <Button 
            onClick={() => {players.forEach(()=>players.pop());localStorage.setItem('players', JSON.stringify([]));removePlayer(0);}}
            color="gray"
            className="flex items-center justify-center mt-4"
          >Remove All
          </Button>
          </li>) : null}
      </ul>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/20 space-y-3">
        <input
          type="text"
          value={newPlayer.name}
          onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          placeholder="Enter player name"
          className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
        />
        <div className="grid grid-cols-2 gap-3">
          <select
            value={newPlayer.gender}
            onChange={(e) => setNewPlayer({ ...newPlayer, gender: e.target.value as 'male' | 'female', orientation: e.target.value==='female'?'bisexual':'bisexual' })}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select
            value={newPlayer.orientation}
            onChange={(e) => setNewPlayer({ ...newPlayer, orientation: e.target.value as 'straight' | 'bisexual' })}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white/90"
          >
            <option value="straight">Straight</option>
            <option value="bisexual">Bisexual</option>
          </select>
        </div>
        <Button onClick={handleAddPlayer} color="orange" className="w-full flex items-center justify-center">
          <UserPlus size={20} className="mr-2" />
          <span>Add Player</span>
        </Button>
      </div>
    </div>
  );
};

export default PlayerList;