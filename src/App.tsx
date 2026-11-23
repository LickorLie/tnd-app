import React, { useState, useEffect } from 'react';
import FullscreenAd from './components/FullscreenAd';
import ShareMenu from './components/ShareMenu';
import AgeGate from './components/AgeGate';
import TabBar, { Tab } from './components/TabBar';
import { Btn, Sheet, LEVEL_EMOJI } from './components/ui';
import { EditionPicker, PlayerSetup } from './screens/PlayScreens';
import GameScreen from './screens/GameScreen';
import Social from './screens/Social';
import Deals from './screens/Deals';
import More from './screens/More';
import { GameLevel, GameTheme, Player, Question } from './types';
import { selectQuestion, resetSeenQuestions, getSeenQuestions, setSeenQuestions } from './utils/questionSelector';
import { loadGame, saveGame, clearGame } from './utils/gameSession';
import CookieBanner from './components/CookieBanner';

const restored = loadGame();
if (restored) setSeenQuestions(restored.seen);
import { usePlace } from './utils/geo';
import { track } from './utils/analytics';
const App: React.FC = () => {
  const [ageConfirmed, setAgeConfirmed] = useState<boolean>(() => {
    try { return localStorage.getItem('age_confirmed') === '1'; } catch { return false; }
  });
  const [showInitialAd, setShowInitialAd] = useState(!restored);
  const [gameType, setGameType] = useState<'truth' | 'dare' | null>(restored?.gameType ?? null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(restored?.currentQuestion ?? null);
  const [players, setPlayers] = useState<Player[]>(() => {
    if (restored) return restored.players;
    try {
      const saved = JSON.parse(localStorage.getItem('players') || '[]');
      return Array.isArray(saved) ? saved.map((p: Player) => ({ ...p, questionsAnswered: 0, jokersLeft: 1, passesLeft: 2 })) : [];
    } catch { return []; }
  });
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState<number>(restored?.currentPlayerIndex ?? 0);
  const [activeTab, setActiveTab] = useState<Tab>('play');
  const [place, setPlace] = usePlace();
  const [levelToast, setLevelToast] = useState<GameLevel | null>(null);
  const [showHeadsUp, setShowHeadsUp] = useState<boolean>(() => { try { return localStorage.getItem('headsup_seen') !== '1'; } catch { return true; } });
  const [gameLevel, setGameLevel] = useState<GameLevel>(restored?.gameLevel ?? 'Sweet');
  const [gameTheme, setGameTheme] = useState<GameTheme>(restored?.gameTheme ?? 'friends');
  const [gameStartTime, setGameStartTime] = useState<number | null>(restored?.gameStartTime ?? null);
  const [isGameActive, setIsGameActive] = useState<boolean>(restored?.isGameActive ?? false);
  const [countdown, setCountdown] = useState<number>(30);
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const [showRules, setShowRules] = useState<boolean>(false);
  const [showThemeSelection, setShowThemeSelection] = useState<boolean>(restored?.showThemeSelection ?? true);

  // Lopend spel bewaren tegen per ongeluk verversen (zie utils/gameSession.ts)
  useEffect(() => {
    if (!isGameActive) return;
    saveGame({ players, currentPlayerIndex, gameLevel, gameTheme, gameStartTime, isGameActive, gameType, currentQuestion, showThemeSelection, seen: getSeenQuestions() });
  }, [players, currentPlayerIndex, gameLevel, gameTheme, gameStartTime, isGameActive, gameType, currentQuestion, showThemeSelection]);
  const [timerStarted, setTimerStarted] = useState<boolean>(false);
  useEffect(() => {
    if (isGameActive && gameStartTime) {
      const checkGameLevel = () => {
        const timeElapsed = Date.now() - gameStartTime;
        // console.log("Time Elapsed:",timeElapsed)
        const allPlayersAnsweredTwice = players.every(p => p.questionsAnswered >= 2);
        const allPlayersAnsweredThrice = players.every(p => p.questionsAnswered >= 5);
        const allPlayersAnsweredFour = players.every(p => p.questionsAnswered >= 8);
        if ((timeElapsed >= 20 * 60 * 1000 || allPlayersAnsweredTwice) && gameLevel === 'Sweet') {
          setGameLevel('Sexy');
          setLevelToast('Sexy');
          
          track('level_up', { level: 'Sexy', theme: gameTheme });
        } else if ((timeElapsed >= 40 * 60 * 1000 || allPlayersAnsweredThrice) && gameLevel === 'Sexy') {
          setGameLevel('Spicy');
          setLevelToast('Spicy');
          
          track('level_up', { level: 'Spicy', theme: gameTheme });
        } else if ((timeElapsed >= 60 * 60 * 1000 || allPlayersAnsweredFour) && gameLevel === 'Spicy') {
          setGameLevel('Wet & Wild');
          setLevelToast('Wet & Wild');
          
          track('level_up', { level: 'Wet & Wild', theme: gameTheme });
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
            return currentQuestion.timer || 30; // Reset to default timer or 60 seconds
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isGameActive, currentQuestion, timerStarted, gameType,players]);

  // Spelers onthouden op dit apparaat (alleen naam, geslacht, geaardheid)
  useEffect(() => {
    try { localStorage.setItem('players', JSON.stringify(players.map(({ name, gender, orientation }) => ({ name, gender, orientation })))); } catch { /* ignore */ }
  }, [players]);

  useEffect(() => {
    if (!levelToast) return;
    const t = setTimeout(() => setLevelToast(null), 2500);
    return () => clearTimeout(t);
  }, [levelToast]);

  // playerIndex meegeven: na setCurrentPlayerIndex is de state nog niet bijgewerkt,
  // waardoor de kaart anders voor de VORIGE speler werd gekozen.
  const generateQuestion = (playerIndex: number = currentPlayerIndex) => {
    const currentPlayer = players[playerIndex];
    const random = Math.random();
    let type: 'truth' | 'dare' = random < 0.35 ? 'truth' : 'dare';

    let newQuestion = selectQuestion(
      currentPlayer,
      players,
      gameTheme,
      gameLevel,
      type
    );

    if (!newQuestion) {
      // No question of this type available: try the other type
      type = type === 'truth' ? 'dare' : 'truth';
      newQuestion = selectQuestion(currentPlayer, players, gameTheme, gameLevel, type);
    }

    if (!newQuestion) {
      console.error('No questions available (yet) for', gameTheme, gameLevel);
      return;
    }

    setGameType(type);
    setCurrentQuestion(newQuestion);
    setCountdown(newQuestion.timer || 30); // Use question's timer or default to 30 seconds
    setTimerStarted(false);
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
    }
  };

  const handleStartGameAfterRules = () => {

    setShowRules(false);
    setIsGameActive(true);
    setGameStartTime(Date.now());
    track('game_start', { theme: gameTheme, players: players.length });
    generateQuestion();
  };

  const stopGame = () => {
    resetSeenQuestions();
    clearGame();
    if (gameStartTime) {
      track('game_end', {
        theme: gameTheme,
        level: gameLevel,
        players: players.length,
        minutes: Math.round((Date.now() - gameStartTime) / 60000),
        cards: players.reduce((n, p) => n + p.questionsAnswered, 0),
      });
    }
    setGameType(null);
    setCurrentQuestion(null);
    setIsGameActive(false);
    setGameStartTime(null);
    setGameLevel('Sweet');
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
  };

  const moveToNextPlayer = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayerIndex].questionsAnswered++;
      return newPlayers;
    });
    
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
    generateQuestion(nextIndex);

    setTimerStarted(false);
  };

  const handleUseJoker = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayerIndex].jokersLeft--;
      track('joker_used', { level: gameLevel });
      return newPlayers;
    });
    moveToNextPlayer();
  };

  const handleUsePass = () => {
    setPlayers(prevPlayers => {
      const newPlayers = [...prevPlayers];
      newPlayers[currentPlayerIndex].passesLeft--;
      track('pass_used', { level: gameLevel });
      return newPlayers;
    });
    moveToNextPlayer();
  };

  if (!ageConfirmed) {
    return (
      <AgeGate
        onConfirm={() => {
          try { localStorage.setItem('age_confirmed', '1'); } catch { /* ignore */ }
          track('age_confirmed');
          setAgeConfirmed(true);
        }}
        onDecline={() => {
          track('age_declined');
          window.location.href = 'https://www.google.com';
        }}
      />
    );
  }

  if (showInitialAd) {
    return <FullscreenAd onComplete={() => setShowInitialAd(false)} />;
  }

  const inGame = isGameActive && !!gameType && !!currentQuestion;

  const share = async () => {
    const shareData = { title: 'Lick or Lie', text: 'Truth or dare, for grown-ups 😈', url: 'https://lickorlie.com' };
    try {
      if (navigator.share) { await navigator.share(shareData); track('share', { platform: 'native' }); }
      else setShowShareMenu(true);
    } catch { /* geannuleerd */ }
  };

  const renderPlay = () => {
    if (inGame && currentQuestion && gameType) {
      return (
        <GameScreen
          type={gameType}
          question={currentQuestion}
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          level={gameLevel}
          countdown={countdown}
          timerStarted={timerStarted}
          onStartTimer={() => setTimerStarted(true)}
          onNext={moveToNextPlayer}
          onJoker={handleUseJoker}
          onPass={handleUsePass}
          onStop={stopGame}
        />
      );
    }
    if (showThemeSelection) {
      return (
        <EditionPicker
          onShare={share}
          onPick={(theme: GameTheme) => {
            setGameTheme(theme);
            track('theme_selected', { theme });
            setShowThemeSelection(false);
          }}
        />
      );
    }
    return (
      <PlayerSetup
        players={players}
        onAdd={addPlayer}
        onUpdate={updatePlayer}
        onRemove={removePlayer}
        onRemoveAll={() => setPlayers([])}
        onBack={() => setShowThemeSelection(true)}
        onStart={startGame}
      />
    );
  };

  return (
    <div className="h-screen-safe flex flex-col bg-cream text-ink overflow-hidden">
      <main className="flex-1 min-h-0">
        {activeTab === 'play' && renderPlay()}
        {activeTab === 'social' && <Social place={place} onPlace={setPlace} />}
        {activeTab === 'deals' && <Deals place={place} onPlace={setPlace} />}
        {activeTab === 'more' && <More />}
      </main>

      <CookieBanner />

      {/* Menubalk: overal, behalve tijdens een lopend spel */}
      {!(activeTab === 'play' && inGame) && <TabBar active={activeTab} onChange={t => { setActiveTab(t); track('tab_open', { tab: t }); }} />}

      {/* Spelregels vlak voor de start */}
      <Sheet open={showRules} onClose={() => setShowRules(false)} title="Before you start 😈">
        <ul className="space-y-2.5 text-[15px] mb-5">
          <li><b>Truth 🤭</b> <span className="text-muted">Answer honestly.</span></li>
          <li><b>Dare 😈</b> <span className="text-muted">Go all in, or use a pass or joker.</span></li>
          <li><b>2 passes, 1 joker</b> <span className="text-muted">per player. No is a full answer.</span></li>
          <li><b>Levels</b> <span className="text-muted">Sweet 🍒 → Sexy 🍑 → Spicy 🥵 → Wet &amp; Wild 💦</span></li>
          <li><b>Consent</b> <span className="text-muted">Agree on a safeword. Anyone can stop at any time.</span></li>
        </ul>
        <Btn variant="primary" full onClick={handleStartGameAfterRules}>Let's play</Btn>
      </Sheet>

      {/* Eenmalige uitleg over geslacht/geaardheid */}
      <Sheet open={showHeadsUp && activeTab === 'play' && !showThemeSelection && !inGame} onClose={() => { setShowHeadsUp(false); try { localStorage.setItem('headsup_seen', '1'); } catch { /* ignore */ } }} title="Quick heads-up 🫣">
        <p className="text-muted mb-4">To match dares correctly, the game uses man or woman, and straight or bi. Full inclusivity isn't possible yet, but we're working on it.</p>
        <Btn full onClick={() => { setShowHeadsUp(false); try { localStorage.setItem('headsup_seen', '1'); } catch { /* ignore */ } }}>Got it</Btn>
      </Sheet>

      {/* Level up-melding */}
      {levelToast && (
        <div className="fixed top-4 inset-x-0 z-50 flex justify-center pointer-events-none">
          <div className="bg-ink text-cream rounded-full px-4 py-2 text-sm font-semibold shadow-card">Level up: {levelToast} {LEVEL_EMOJI[levelToast]}</div>
        </div>
      )}

      <ShareMenu
        isOpen={showShareMenu}
        onClose={() => setShowShareMenu(false)}
        onShare={async (platform) => {
          const shareText = 'Truth or dare, for grown-ups 😈';
          const shareUrl = 'https://lickorlie.com';
          track('share', { platform });
          if (platform === 'whatsapp') window.open(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
          else if (platform === 'sms') window.open(`sms:?body=${encodeURIComponent(`${shareText} ${shareUrl}`)}`, '_blank');
          else { try { await navigator.share({ title: 'Lick or Lie', text: shareText, url: shareUrl }); } catch { /* ignore */ } }
          setShowShareMenu(false);
        }}
      />
    </div>
  );
};

export default App;
