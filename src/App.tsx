import React, { useState, useEffect } from 'react';
import { Share2, ArrowLeft, XCircle } from 'lucide-react';
import GameCard from './components/GameCard';
import Button from './components/Button';
import PlayerList from './components/PlayerList';
import MenuBar from './components/MenuBar';
import Ads from './components/Ads';
import Contact from './components/Contact';
import Modal from './components/Modal';
import ShareMenu from './components/ShareMenu';
import GameRules from './components/GameRules';
import ThemeSelector from './components/ThemeSelector';
import PlayerActions from './components/PlayerActions';
import FullscreenAd from './components/FullscreenAd';
import { GameLevel, GameTheme, Player, Question } from './types';
import { getValidInteractionPartners } from './utils/interactionRules';
import { selectQuestion } from './utils/questionSelector';
import { questions } from './data/questions';

const App: React.FC = () => {
  const [showInitialAd, setShowInitialAd] = useState(true);
  const [gameType, setGameType] = useState<'truth' | 'dare' | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'home' | 'ads' | 'contact'>('home');
  const [gameLevel, setGameLevel] = useState<GameLevel>('Mild');
  const [gameTheme, setGameTheme] = useState<GameTheme>('friends');
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [showStopGameModal, setShowStopGameModal] = useState<boolean>(false);
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [hasUnlockedRewards, setHasUnlockedRewards] = useState<boolean>(false);
  const [showThemeSelection, setShowThemeSelection] = useState<boolean>(true);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  const [selectedPartner, setSelectedPartner] = useState<Player | null>(null);

  useEffect(() => {
    if (isGameActive && gameStartTime) {
      const checkGameLevel = () => {
        const timeElapsed = Date.now() - gameStartTime;
        const allPlayersAnsweredTwice = players.every(p => p.questionsAnswered >= 2);
        
        if ((timeElapsed >= 20 * 60 * 1000 || allPlayersAnsweredTwice) && gameLevel === 'Mild') {
          setGameLevel('Hot');
          setHasUnlockedRewards(true);
        } else if ((timeElapsed >= 40 * 60 * 1000 || allPlayersAnsweredTwice) && gameLevel === 'Hot') {
          setGameLevel('Spicy');
          setHasUnlockedRewards(true);
        }
      };

      const interval = setInterval(checkGameLevel, 1000);
      return () => clearInterval(interval);
    }
  }, [isGameActive, gameStartTime, players, gameLevel,players.length]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isGameActive && currentQuestion && timerStarted && gameType === 'dare') {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            moveToNextPlayer();
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, currentQuestion, timerStarted, gameType,players]);

  const generateQuestion = () => {
    const currentPlayer = players[currentPlayerIndex];
    const random = Math.random();
    const type = random < 0.35 ? 'truth' : 'dare';
    
    const newQuestion = selectQuestion(
      currentPlayer,
      players,
      gameTheme,
      gameLevel,
      type
    );

    if (newQuestion) {
      setGameType(type);
      setCurrentQuestion(newQuestion);
      setSelectedPartner(null);
      setTimerStarted(false);
    } else {
      // If no valid question is found, try again with a solo question
      const soloQuestions = questions[gameTheme][gameLevel][type].filter(q => !q.requiresPartner);
      const randomIndex = Math.floor(Math.random() * soloQuestions.length);
      setGameType(type);
      setCurrentQuestion(soloQuestions[randomIndex]);
      setSelectedPartner(null);
      setTimerStarted(false);
    }
  };

  const addPlayer = (player: Omit<Player, 'questionsAnswered' | 'jokersLeft' | 'passesLeft'>) => {
    if (player.name && !players.some(p => p.name === player.name)) {
      setPlayers([...players, { 
        ...player, 
        questionsAnswered: 0,
        jokersLeft: 1,
        passesLeft: 2
      }]);
    }
  };

  const updatePlayer = (index: number, updatedPlayer: Omit<Player, 'questionsAnswered' | 'jokersLeft' | 'passesLeft'>) => {
    const newPlayers = [...players];
    newPlayers[index] = { 
      ...updatedPlayer, 
      questionsAnswered: players[index].questionsAnswered,
      jokersLeft: players[index].jokersLeft,
      passesLeft: players[index].passesLeft
    };
    setPlayers(newPlayers);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const startGame = () => {
    if (players.length >= 2) {
      setShowRules(true);
    } else {
      alert('Please add at least 2 players to start the game!');
    }
  };

  const handleStartGameAfterRules = () => {

    setShowRules(false);
    setIsGameActive(true);
    setGameStartTime(Date.now());
    generateQuestion();
  };

  const stopGame = () => {
    setGameType(null);
    setCurrentQuestion(null);
    setIsGameActive(false);
    setGameStartTime(null);
    setGameLevel('Mild');
    setCurrentPlayerIndex(0);
    setTimerStarted(false);
    setPlayers(prevPlayers => 
      prevPlayers.map(player => ({ 
        ...player, 
        questionsAnswered: 0,
        jokersLeft: 1,
        passesLeft: 2
      }))
    );
    setShowStopGameModal(false);
  };

  const moveToNextPlayer = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayerIndex].questionsAnswered++;
      return newPlayers;
    });
    
    setCurrentPlayerIndex(prev => (prev + 1) % players.length);
    generateQuestion();

    setCountdown(30);
    setTimerStarted(false);
  };

  const handleUseJoker = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayerIndex].jokersLeft--;
      return newPlayers;
    });
    moveToNextPlayer();
  };

  const handleUsePass = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayerIndex].passesLeft--;
      return newPlayers;
    });
    moveToNextPlayer();
  };

  if (showInitialAd) {
    return <FullscreenAd onComplete={() => setShowInitialAd(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            {showThemeSelection ? (
              <ThemeSelector
                currentTheme={gameTheme}
                onThemeChange={(theme) => {
                  setGameTheme(theme);
                  setShowThemeSelection(false);
                }}
                disabled={isGameActive}
              />
            ) : (
              <>
                <div className="flex justify-between items-center mb-8">
                  {isGameActive ? (
                    <Button
                      onClick={() => setShowStopGameModal(true)}
                      color="red"
                      className="!p-3 !px-3"
                    >
                      <XCircle size={24} />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setShowThemeSelection(true)}
                      color="red"
                      className="!p-3 !px-3"
                    >
                      <ArrowLeft size={24} />
                    </Button>
                  )}
                  <Button 
                    onClick={() => setShowShareMenu(true)} 
                    color="orange"
                    className="!p-3 !px-3"
                  >
                    <Share2 size={24} />
                  </Button>
                </div>

                {players.length > 0 ? (
                  <>
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold" 
                        style={{
                          backgroundColor: gameLevel === 'Mild' ? '#E5E7EB' : 
                                         gameLevel === 'Hot' ? '#FECACA' : 
                                         '#FCA5A5',
                          color: gameLevel === 'Mild' ? '#374151' : '#991B1B'
                        }}>
                        Level: {gameLevel}
                      </span>
                    </div>
{!isGameActive && players.length > 1 ? (
                      <div className="text-center">
                        <p className="text-gray-600 mb-6 mt-6">
                          Click Start to begin the game!
                        </p>
                        </div>
    ): null}
                  </>
                ) : (
                  <p className="text-center text-gray-600 mb-6">Add players to start the game!</p>
                )}
                
                <div className="mt-8">
                  
                  <PlayerList 
                    players={players} 
                    addPlayer={addPlayer}
                    updatePlayer={updatePlayer}
                    removePlayer={removePlayer}
                    isGameActive={isGameActive}
                    currentPlayerIndex={currentPlayerIndex}
                  />
                </div>
                                    
                    {!isGameActive && players.length > 1  ? (
                      <div className="text-center mb-4">
                        {/* <p className="text-gray-600 mb-6 mt-6">
                          Click Start to begin the game!
                        </p> */}
                        <Button onClick={startGame} color="green" className='mt-5'>
                          Start Game
                        </Button>
                      </div>
                    ) : gameType && currentQuestion ? (
                      <>
                        <GameCard 
                          type={gameType}
                          question={currentQuestion}
                          currentPlayer={players[currentPlayerIndex]}
                          allPlayers={players}
                          countdown={gameType === 'dare' ? countdown : undefined}
                          timerStarted={timerStarted}
                          onStartTimer={gameType === 'dare' ? () => setTimerStarted(true) : undefined}
                          onSelectPartner={setSelectedPartner}
                        />
                        <PlayerActions
                          onUseJoker={handleUseJoker}
                          onUsePass={handleUsePass}
                          jokersLeft={players[currentPlayerIndex].jokersLeft}
                          passesLeft={players[currentPlayerIndex].passesLeft}
                        />
                        <div className="mt-4 text-center">
                          <Button onClick={moveToNextPlayer} color="green" 
                                                      disabled={gameType === 'dare' && timerStarted ? true:false}
>
                            Next Player
                          </Button>
                        </div>
                      </>
                    ) : null}
              </>
            )}

            {showRules && (
              <GameRules onClose={handleStartGameAfterRules} />
            )}

            <Modal
              isOpen={showStopGameModal}
              onClose={() => setShowStopGameModal(false)}
              title="Stop Game"
            >
              <div className="p-4">
                <p className="mb-4">Are you sure you want to stop the game? All progress will be lost.</p>
                <div className="flex justify-end gap-2">
                  <Button onClick={() => setShowStopGameModal(false)} color="gray">
                    Cancel
                  </Button>
                  <Button onClick={()=>{stopGame();players.forEach(()=>players.pop());localStorage.setItem('players', JSON.stringify([]));removePlayer(0);}} color="red">
                    Stop Game
                  </Button>
                </div>
              </div>
            </Modal>

            <ShareMenu
              isOpen={showShareMenu}
              onClose={() => setShowShareMenu(false)}
              onShare={(platform) => {
                const shareText = "Join me for an exciting game of Truth or Dare! 🎲";
                const shareUrl = "https://lickorlie.com"//window.location.href;
                
                const shareLinks = {
                  whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
                  instagram: `https://www.instagram.com/share?url=${encodeURIComponent(shareUrl)}`,
                  snapchat: `https://www.snapchat.com/share?url=${encodeURIComponent(shareUrl)}`,
                  tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`,
                  sms: `sms:?body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
                };

                window.open(shareLinks[platform as keyof typeof shareLinks], '_blank');
                setShowShareMenu(false);
              }}
            />
          </>
        );
      case 'ads':
        return <Ads />;
      case 'contact':
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-500 flex flex-col">
      <MenuBar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        hasUnlockedRewards={hasUnlockedRewards} 
      />
      <div className="flex-grow flex items-center justify-center p-4 pb-20">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-md w-full border border-white/20">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-violet-600 to-orange-500 text-transparent bg-clip-text">
            Truth or Dare
          </h1>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default App;