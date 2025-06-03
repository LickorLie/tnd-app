import { GameTheme, GameLevel, Question } from '../types';
import { supabase } from '../utils/supabase'

type QuestionType = 'truth' | 'dare';

type Questions = {
  [K in GameTheme]: {
    [L in GameLevel]: {
      [T in QuestionType]: Question[];
    };
  };
};

let finalQuestions: Questions = {
  friends: {
    Mild: {
      truth: [],
      dare: []
    },
    Hot: {
      truth: [],  
      dare: []
    },
    Spicy: {
      truth: [],
      dare: []
    }
  },
  lovers: {
    Mild: {
      truth: [],
      dare: []
    },
    Hot: {
      truth: [],
      dare: []
    },
    Spicy: {
      truth: [],
      dare: []
    }
  },
  "🍍": {
    Mild: {
      truth: [],
      dare: []
    },
    Hot: {
      truth: [],
      dare: []
    },
    Spicy: {
      truth: [],
      dare: []
    }
  }
};

          
await supabase.from('questions').select().then((response) => {
  console.log("Response from Supabase:", response.data);
  let data = response.data;
  let questions = {
    friends: {
      Mild: {
        truth: [],
        dare: []
      },
      Hot: {
        truth: [],
        dare: []
      },
      Spicy: {
        truth: [],
        dare: []
      }
    },
    lovers: {
      Mild: {
        truth: [],
        dare: []
      },
      Hot: {
        truth: [],
        dare: []
      },
      Spicy: {
        truth: [],
        dare: []
      }
    },
    "🍍": {
      Mild: {
        truth: [],
        dare: []
      },
      Hot: {
        truth: [],
        dare: []
      },
      Spicy: {
        truth: [],
        dare: []
      }
    }
  };
  // Map the data to the questions object
  data.forEach((item) => {
    const theme = item.theme as GameTheme;
    const level = item.level as GameLevel;
    const type = item.type as QuestionType;
    const question: Question = {
      text: item.question,
      requiresPartner: item.requiresPartner,
      type:item.requiresPartner==true? 'partner' : 'solo',

    };
    
    questions[theme][level][type].push(question);
  });
  console.log("Mapped questions:", questions);
  finalQuestions=questions;
}

)

export const questions: Questions = finalQuestions;

// Fetch questions from Supabase
// const fetchQuestions = async () => {
//   const { data, error } = await supabase
//     .from('questions')
//     .select('*');

//   if (error) {
//     console.error("Error fetching questions:", error);
//     return [];
//   }

//   return data;
// }
// // Fetch questions and log them
// fetchQuestions().then((questions) => {
//   console.log("Fetched questions:", questions);
// }).catch((error) => {
//   console.error("Error:", error);
// });


// export const questions: Questions = {
//   friends: {
//     Mild: {
//       truth: [
//         { text: "What's the most embarrassing thing you've done in public?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest pet peeve?", requiresPartner: false, type: 'solo' },
//         { text: "What's your guilty pleasure?", requiresPartner: false, type: 'solo' },
//         { text: "What's the silliest thing you're afraid of?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most embarrassing childhood memory?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a compliment while maintaining eye contact", requiresPartner: true, type: 'partner' },
//         { text: "Do your best impression of [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Do 10 jumping jacks", requiresPartner: false, type: 'solo' },
//         { text: "Play rock-paper-scissors with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Create a secret handshake with [partner]", requiresPartner: true, type: 'partner' }
//       ]
//     },
//     Hot: {
//       truth: [
//         { text: "What's your biggest romantic fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's the most adventurous thing you've done?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most embarrassing date story?", requiresPartner: false, type: 'solo' },
//         { text: "What's your ideal type in a partner?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest turn-off?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a 30-second shoulder massage", requiresPartner: true, type: 'partner' },
//         { text: "Slow dance with [partner] for one minute", requiresPartner: true, type: 'partner' },
//         { text: "Do your most seductive dance move", requiresPartner: false, type: 'solo' },
//         { text: "Let [partner] style your hair however they want", requiresPartner: true, type: 'partner' },
//         { text: "Do a trust fall with [partner]", requiresPartner: true, type: 'partner' }
//       ]
//     },
//     Spicy: {
//       truth: [
//         { text: "What's your most daring fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's the most intimate moment you've experienced?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest turn-on?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most adventurous experience?", requiresPartner: false, type: 'solo' },
//         { text: "What's your secret desire?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a sensual massage", requiresPartner: true, type: 'partner' },
//         { text: "Perform a seductive dance for [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Do a strip tease (keep it classy!)", requiresPartner: false, type: 'solo' },
//         { text: "Create a romantic moment with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a passionate kiss", requiresPartner: true, type: 'partner' }
//       ]
//     }
//   },
//   lovers: {
//     Mild: {
//       truth: [
//         { text: "What's your favorite romantic memory?", requiresPartner: false, type: 'solo' },
//         { text: "What's your ideal date night?", requiresPartner: false, type: 'solo' },
//         { text: "What's the most romantic thing someone's done for you?", requiresPartner: false, type: 'solo' },
//         { text: "What's your definition of true love?", requiresPartner: false, type: 'solo' },
//         { text: "What's your favorite way to show affection?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Feed [partner] something sweet", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a romantic nickname", requiresPartner: true, type: 'partner' },
//         { text: "Write a short love poem", requiresPartner: false, type: 'solo' },
//         { text: "Slow dance with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a gentle massage", requiresPartner: true, type: 'partner' }
//       ]
//     },
//     Hot: {
//       truth: [
//         { text: "What's your most memorable romantic moment?", requiresPartner: false, type: 'solo' },
//         { text: "What's your perfect romantic evening?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most memorable kiss?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest romantic fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's the most romantic place you've been to?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a sensual back massage", requiresPartner: true, type: 'partner' },
//         { text: "Blindfold [partner] and feed them something", requiresPartner: true, type: 'partner' },
//         { text: "Do a seductive dance", requiresPartner: false, type: 'solo' },
//         { text: "Create a romantic scene with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a passionate embrace", requiresPartner: true, type: 'partner' }
//       ]
//     },
//     Spicy: {
//       truth: [
//         { text: "What's your ultimate fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most intense romantic experience?", requiresPartner: false, type: 'solo' },
//         { text: "What's your secret desire?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most passionate moment?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest turn-on?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a passionate kiss", requiresPartner: true, type: 'partner' },
//         { text: "Do a lap dance for [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Show your best seductive move", requiresPartner: false, type: 'solo' },
//         { text: "Create an intimate moment with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a sensual massage", requiresPartner: true, type: 'partner' }
//       ]
//     }
//   },
//   "🍍": {
//     Mild: {
//       truth: [
//         { text: "What's your wildest fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest turn-on?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most daring experience?", requiresPartner: false, type: 'solo' },
//         { text: "What's your perfect romantic evening?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most memorable intimate moment?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a flirty lap dance", requiresPartner: true, type: 'partner' },
//         { text: "Whisper something seductive to [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Show your best flirty dance move", requiresPartner: false, type: 'solo' },
//         { text: "Create a romantic moment with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a playful massage", requiresPartner: true, type: 'partner' }
//       ]
//     },
//     Hot: {
//       truth: [
//         { text: "What's your most daring experience?", requiresPartner: false, type: 'solo' },
//         { text: "What's your ultimate fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's your biggest secret desire?", requiresPartner: false, type: 'solo' },
//         { text: "What's your most intense moment?", requiresPartner: false, type: 'solo' },
//         { text: "What's your perfect intimate evening?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] a sensual massage", requiresPartner: true, type: 'partner' },
//         { text: "Do a steamy dance with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Demonstrate your best seductive move", requiresPartner: false, type: 'solo' },
//         { text: "Create an intimate moment with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Give [partner] a passionate embrace", requiresPartner: true, type: 'partner' }
//       ]
//     },
//     Spicy: {
//       truth: [
//         { text: "What's your most intense fantasy?", requiresPartner: false, type: 'solo' },
//         { text: "What's your deepest secret desire?", requiresPartner: false, type: 'solo' },
//         { text: "What's your wildest experience?", requiresPartner: false, type: 'solo' },
//         { text: "What's your perfect passionate moment?", requiresPartner: false, type: 'solo' },
//         { text: "What's your ultimate intimate fantasy?", requiresPartner: false, type: 'solo' }
//       ],
//       dare: [
//         { text: "Give [partner] an intimate massage", requiresPartner: true, type: 'partner' },
//         { text: "Create a steamy moment with [partner]", requiresPartner: true, type: 'partner' },
//         { text: "Show your most seductive dance", requiresPartner: false, type: 'solo' },
//         { text: "Give [partner] a passionate kiss", requiresPartner: true, type: 'partner' },
//         { text: "Perform a sensual dance for [partner]", requiresPartner: true, type: 'partner' }
//       ]
//     }
//   }
// };

