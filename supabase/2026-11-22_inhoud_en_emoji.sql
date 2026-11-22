-- LickOrLie startinhoud + emoji (optie A). Back-up: questions_backup_20261122
begin;
-- Startinhoud: 4 blogartikelen (als CONCEPT, eerst nalezen in de admin) en de eerste vraag van de week
insert into public.posts (title, excerpt, body, status) values
('Your first swingers party: 7 things to know',
 'Nervous about your first open-minded party? Here is what nobody tells you.',
 'Your first party feels like a big step. It does not have to be.

1. You are not obliged to do anything. Many couples spend their first night just talking, dancing and watching. That is completely normal.

2. Agree on your rules before you leave home. What is a yes, what is a maybe, what is a no? Decide together, not in the heat of the moment.

3. Pick a safeword or signal. A simple word or a squeeze of the hand that means: we stop, no discussion.

4. Ask, always. A smile is not a yes. A good party is full of people who ask first and respect a no.

5. Bring what you need: condoms, lube, something nice to wear, and a little cash for the bar.

6. Check in with each other during the night. A quick "still good?" goes a long way.

7. Talk about it afterwards. What did you love? What would you do differently? The best nights start with the conversation the day after.

Have fun, stay curious, and take it at your own pace. 😏',
 'draft'),
('Consent and safewords for game night',
 'The best games feel exciting because everyone feels safe.',
 'Truth or dare gets more fun as it gets bolder. That only works when everyone trusts each other.

Before you start, agree on three things:

A safeword. Choose a word everyone will remember, like "pineapple". When someone says it, the round stops. No questions, no jokes.

The limits. Each player names one thing that is off-limits tonight. You do not have to explain why.

Pass and joker are not failures. In Lick or Lie, every player has two passes and one joker. Use them whenever you want. No is a full answer.

During the game, keep an eye on each other. A pause, a look, a hesitation: check in. Afterwards, ask how everyone felt. The players who feel safe are the ones who come back for another round. 🫣',
 'draft'),
('How to talk about boundaries as a couple',
 'Opening up starts with an honest conversation at the kitchen table.',
 'Before you invite anyone else into your bedroom, invite each other into an honest conversation.

Start with why. What draws you both to this? Curiosity, excitement, a fantasy you share? Make sure you want it for yourselves, not to please the other.

Make three lists together: yes, maybe and no. Kissing, touching, watching, more. Be specific. A "maybe" is allowed and can change over time.

Talk about feelings, not only rules. Jealousy is normal. Agree on what you will do when it shows up: a signal, a break, a hug.

Start small. A flirty game with friends, a party where you only watch. Build trust step by step.

Review after every experience. What worked? What needs to change? The rules are yours, and you can always rewrite them together. 💕',
 'draft'),
('Truth or dare etiquette for open-minded groups',
 'Six simple rules that make every game night better.',
 'Playing with a group of open-minded adults? These unwritten rules keep the night fun for everyone.

1. Everyone is 18 or older and everyone wants to be there.

2. What happens in the game stays in the game. No photos, no stories with names.

3. Respect the couple rules. If a couple says a dare is not for them, that is the end of it.

4. Start sweet. The game gets bolder level by level, from Sweet to Wet and Wild. Do not skip ahead.

5. Keep drinks under control. Tipsy is fun; drunk is not consent.

6. Laugh a lot. The best truth or dare nights are as funny as they are hot.

Ready to play? Grab your phone, add your players and let the cards decide. 😈',
 'draft');

insert into public.polls (question, options, active) values
('Which is hotter: watching or being watched?', '["Watching 👀", "Being watched 🫣", "Both, obviously 😈"]', true);

-- Emoji op kaarten
update questions set question = 'Give [partner] a 30-second shoulder massage 🥵' where question = 'Give [partner] a 30-second shoulder massage';
update questions set question = 'Slow dance with [partner] for one minute 💃' where question = 'Slow dance with [partner] for one minute';
update questions set question = 'Do your most seductive dance move 💃' where question = 'Do your most seductive dance move';
update questions set question = 'What''s your biggest romantic fantasy? 😈' where question = 'What''s your biggest romantic fantasy?';
update questions set question = 'What''s your most embarrassing date story? 🤭' where question = 'What''s your most embarrassing date story?';
update questions set question = 'Give [partner] a sensual massage 🥵' where question = 'Give [partner] a sensual massage';
update questions set question = 'Give [partner] a passionate kiss... 💋' where question = 'Give [partner] a passionate kiss...';
update questions set question = 'Do a strip tease (keep it classy!) 🔥' where question = 'Do a strip tease (keep it classy!)';
update questions set question = 'Perform a seductive dance for [partner] 💃' where question = 'Perform a seductive dance for [partner]';
update questions set question = 'What''s your most daring fantasy? 😈' where question = 'What''s your most daring fantasy?';
update questions set question = 'Play rock-paper-scissors with [partner], loser takes a shot 🥃' where question = 'Play rock-paper-scissors with [partner], loser takes a shot';
update questions set question = 'What''s your most embarrassing childhood memory? 🤭' where question = 'What''s your most embarrassing childhood memory?';
update questions set question = 'What''s the most embarrassing thing you''ve done in public? 🤭' where question = 'What''s the most embarrassing thing you''ve done in public?';
update questions set question = 'Do a seductive dance 💃' where question = 'Do a seductive dance';
update questions set question = 'Whisper something seductive to partner 🤫' where question = 'Whisper something seductive to partner';
update questions set question = 'Give [partner] a sensual back massage 🥵' where question = 'Give [partner] a sensual back massage';
update questions set question = 'Blindfold [partner] and feed them something 🫣' where question = 'Blindfold [partner] and feed them something';
update questions set question = 'What''s your most memorable kiss? 💋' where question = 'What''s your most memorable kiss?';
update questions set question = 'What''s your biggest romantic fantasy? 😈' where question = 'What''s your biggest romantic fantasy?';
update questions set question = 'Do a lap dance for [partner] 💃' where question = 'Do a lap dance for [partner]';
update questions set question = 'Wat is de spannendste fantasie die je ooit in vervulling hebt laten gaan? 😈' where question = 'Wat is de spannendste fantasie die je ooit in vervulling hebt laten gaan?';
update questions set question = 'Give [partner] a sensual massage 🥵' where question = 'Give [partner] a sensual massage';
update questions set question = 'Give [partner] a passionate kiss 💋' where question = 'Give [partner] a passionate kiss';
update questions set question = 'What''s your ultimate fantasy? 😈' where question = 'What''s your ultimate fantasy?';
update questions set question = 'Slow dance with [partner] 💃' where question = 'Slow dance with [partner]';
update questions set question = 'Luck is on your side, choose a player and decide where they have to kiss you 💋' where question = 'Luck is on your side, choose a player and decide where they have to kiss you';
update questions set question = 'Get blindfolded and guess the players by feeling on their booty, guess who is who! 🍑' where question = 'Get blindfolded and guess the players by feeling on their booty, guess who is who!';
update questions set question = 'Have a threesome kiss with [partner] and select one more… If only two players, then you know what to do 🦄' where question = 'Have a threesome kiss with [partner] and select one more… If only two players, then you know what to do';
update questions set question = 'Select two players to make out with each other, the players decide how they do it 💋' where question = 'Select two players to make out with each other, the players decide how they do it';
update questions set question = 'Hum a song. Whoever guesses it correctly gets to decide who removes one piece of clothing. 🔥' where question = 'Hum a song. Whoever guesses it correctly gets to decide who removes one piece of clothing.';
update questions set question = 'Choose who are going to make out, blindfold them both, and watch, 30 seconds 🫣' where question = 'Choose who are going to make out, blindfold them both, and watch, 30 seconds';
update questions set question = 'Grab the hand of [partner] and lick between/on the finger(s), as if your life depends on it. You might give a little eye contact 👅' where question = 'Grab the hand of [partner] and lick between/on the finger(s), as if your life depends on it. You might give a little eye contact';
update questions set question = 'Touch each others tongues with lips touching each other, do this with [partner] 👅' where question = 'Touch each others tongues with lips touching each other, do this with [partner]';
update questions set question = 'Get blindfolded… Players can kiss you in your neck and you have to guess who is who! 🫣' where question = 'Get blindfolded… Players can kiss you in your neck and you have to guess who is who!';
update questions set question = 'Your lucky! All players need to make you feel comfortable, you decide who kisses you, who massages you, who watches etc. 💋' where question = 'Your lucky! All players need to make you feel comfortable, you decide who kisses you, who massages you, who watches etc.';
update questions set question = 'Let [partner] lay down on their stomach and give several soft but sensual kisses on [partner]’s lower back 🍑' where question = 'Let [partner] lay down on their stomach and give several soft but sensual kisses on [partner]’s lower back';
update questions set question = 'Gently kiss and tease [partner]’s earlobe 💋' where question = 'Gently kiss and tease [partner]’s earlobe';
update questions set question = 'Lie down on your stomach and let [partner] give you several soft but sensual kisses on your lower back all the way to your neck 🍑' where question = 'Lie down on your stomach and let [partner] give you several soft but sensual kisses on your lower back all the way to your neck';
update questions set question = 'Get blindfolded, the players decide who is going to make out with you 🫣' where question = 'Get blindfolded, the players decide who is going to make out with you';
update questions set question = 'Remove a piece clothing 🔥' where question = 'Remove a piece clothing';
update questions set question = 'If there are 3 or more players: While your sitting, let one player sit behind you and hold you from the back, and let [partner] kiss you in the neck 💋' where question = 'If there are 3 or more players: While your sitting, let one player sit behind you and hold you from the back, and let [partner] kiss you in the neck';
update questions set question = 'Give a erotic massage to [partner] 🥵' where question = 'Give a erotic massage to [partner] ';
update questions set question = 'While wearing a blindfold let [partner] remove a clothing piece in a sensual and teasing manner. 🫣' where question = 'While wearing a blindfold let [partner] remove a clothing piece in a sensual and teasing manner.';
update questions set question = 'Select a player and be dominant tell them what to do, give them 3 sensual tasks to complete 😈' where question = 'Select a player and be dominant tell them what to do, give them 3 sensual tasks to complete';
update questions set question = 'Select a player who you would like to give a spanking. Ask them how they want it. 🍑' where question = 'Select a player who you would like to give a spanking. Ask them how they want it.';
update questions set question = 'Put [partner] over your lap and give them a spanking. Ask them how they want it. 🍑' where question = 'Put [partner] over your lap and give them a spanking. Ask them how they want it.';
update questions set question = 'Re-enact as if your giving oral to [partner], make sure there lying/sitting comfortable 🍆' where question = 'Re-enact as if your giving oral to [partner], make sure there lying/sitting comfortable';
update questions set question = 'Do the cowgirl on [partner] 🍑' where question = 'Do the cowgirl on [partner]';
update questions set question = 'Sit on [partner]’s lap and move your hips as if your having sex 💃' where question = 'Sit on [partner]’s lap and move your hips as if your having sex';
update questions set question = 'Use a personal toy on yourself, you can keep your clothes on, do it in a teasing way. No toys? Use your hands 🎁' where question = 'Use a personal toy on yourself, you can keep your clothes on, do it in a teasing way. No toys? Use your hands';
update questions set question = 'Choose a player, then play Rock, Paper, Scissors with them. The winner decides which item of clothing the loser has to remove. 🔥' where question = 'Choose a player, then play Rock, Paper, Scissors with them. The winner decides which item of clothing the loser has to remove.';
update questions set question = 'Slowly remove one piece of upper clothing and reveal a little. 🔥' where question = 'Slowly remove one piece of upper clothing and reveal a little.';
update questions set question = 'Simulate an orgasm while holding [partner]’s hand. 💦' where question = 'Simulate an orgasm while holding [partner]’s hand.';
update questions set question = 'Pretend to give oral pleasure to the player with the most votes. 🍆' where question = 'Pretend to give oral pleasure to the player with the most votes.';
update questions set question = 'Let [partner] sit somewhere comfy, get down on your knees, and act out as if you’re giving [partner] a oral, while looking them in the eyes 🍆' where question = 'Let [partner] sit somewhere comfy, get down on your knees, and act out as if you’re giving [partner] a oral, while looking them in the eyes';
update questions set question = 'Put your arms around [partner] from behind at the hips and whisper your favorite kink/fantasy into their ear. (If someone gets a boner, the person has to take a shot.) 🍆' where question = 'Put your arms around [partner] from behind at the hips and whisper your favorite kink/fantasy into their ear. (If someone gets a boner, the person has to take a shot.)';
update questions set question = 'Let [partner] gently caress your upper thigh for 30 seconds 🥵' where question = 'Let [partner] gently caress your upper thigh for 30 seconds';
update questions set question = 'Tease in a playful, sensual way by slowly sliding your pants down just a little—never fully removing them—just enough to build tension 🔥' where question = 'Tease in a playful, sensual way by slowly sliding your pants down just a little—never fully removing them—just enough to build tension';
update questions set question = 'Let [partner] give you a sensual kiss on your neck, keeping your eyes closed 💋' where question = 'Let [partner] give you a sensual kiss on your neck, keeping your eyes closed';
update questions set question = 'Which part of your body would you most like to be kissed, and why? (Bonus: if you want, choose a player to do it for you) 💋' where question = 'Which part of your body would you most like to be kissed, and why? (Bonus: if you want, choose a player to do it for you)';
update questions set question = 'Randomly choose a song and move your hips to the rhythm of the music against [partner] for 30 seconds. 💃' where question = 'Randomly choose a song and move your hips to the rhythm of the music against [partner] for 30 seconds.';
update questions set question = 'Give [partner] the best sensual massage… you decide how to do it, and take your time teasing every touch. 🥵' where question = 'Give [partner] the best sensual massage… you decide how to do it, and take your time teasing every touch.';
update questions set question = 'Give a soft kiss on [partner]’s inner thigh over clothing for 30 seconds, while looking into their eyes. 🔥' where question = 'Give a soft kiss on [partner]’s inner thigh over clothing for 30 seconds, while looking into their eyes.';
update questions set question = 'Perform a sensual dance against the wall for 30 seconds, like a professional stage performer. Think Magic Mike or Moulin Rouge 💃' where question = 'Perform a sensual dance against the wall for 30 seconds, like a professional stage performer. Think Magic Mike or Moulin Rouge';
update questions set question = 'Let [partner] gently stroke your inner thigh for 20 seconds 🥵' where question = 'Let [partner] gently stroke your inner thigh for 20 seconds';
update questions set question = 'Whisper a fantasy into [partner]’s ear for 20 seconds. 🤫' where question = 'Whisper a fantasy into [partner]’s ear for 20 seconds.';
update questions set question = 'Slowly remove a piece of clothing in front of the audience 🔥' where question = 'Slowly remove a piece of clothing in front of the audience';
update questions set question = 'Gently place your lips on [partner]’s neck in a sensual manner for 15 seconds 💋' where question = 'Gently place your lips on [partner]’s neck in a sensual manner for 15 seconds';
update questions set question = 'Let [partner] give you soft kisses on your stomach for 30 seconds. 💋' where question = 'Let [partner] give you soft kisses on your stomach for 30 seconds.';
update questions set question = 'Give [partner] a playful, teasing lap dance for 60 seconds 💃' where question = 'Give [partner] a playful, teasing lap dance for 60 seconds';
update questions set question = 'Give [partner] a small light hicky, you get to decide where, if they reject they have to take of a clothing piece. No *** 🔥' where question = 'Give [partner] a small light hicky, you get to decide where, if they reject they have to take of a clothing piece. No ***';
update questions set question = 'Everybody has to swap a clothing piece, your just lucky that you can decide who swaps with whom 🔥' where question = 'Everybody has to swap a clothing piece, your just lucky that you can decide who swaps with whom';
update questions set question = 'You get to choose who going to rub their chest over your back, choose a player, turn of the lights and enjoy 🍒' where question = 'You get to choose who going to rub their chest over your back, choose a player, turn of the lights and enjoy';
update questions set question = 'Free the ***! take of your underwear/lingerie, hopefully you still have your pants on? 🔥' where question = 'Free the ***! take of your underwear/lingerie, hopefully you still have your pants on?';
update questions set question = 'Joker: select who has to take of a clothing piece, keep it as a trophy 🔥' where question = 'Joker: select who has to take of a clothing piece, keep it as a trophy';
update questions set question = 'If you have a piece of candy, put it in your mouth and kiss [partner] until the candy ends up in their mouth. If not, share a sweet kiss. 💋' where question = 'If you have a piece of candy, put it in your mouth and kiss [partner] until the candy ends up in their mouth. If not, share a sweet kiss.';
update questions set question = 'Take off a clothing piece 🔥' where question = 'Take off a clothing piece';
update questions set question = 'Kiss from the neck all the way down to the *** until [partner] stops you 💋' where question = 'Kiss from the neck all the way down to the *** until [partner] stops you';
update questions set question = 'Stroke around the *** of [partner] without touching the ***, seduce them, make them go crazy 🥵' where question = 'Stroke around the *** of [partner] without touching the ***, seduce them, make them go crazy';
update questions set question = 'Unlock one bra, with one hand within 15 seconds, if you can’t you have to remove one clothing piece 🍒' where question = 'Unlock one bra, with one hand within 15 seconds, if you can’t you have to remove one clothing piece';
update questions set question = 'We all have freaky photos, show a freaky photo, if you can’t (for whatever reason), remove a clothing piece 🔥' where question = 'We all have freaky photos, show a freaky photo, if you can’t (for whatever reason), remove a clothing piece';
update questions set question = 'What’s the most sensual way you can put on a condom, turn up the crowd with your skills. If you don’t have one, act like there’s one. 🍆' where question = 'What’s the most sensual way you can put on a condom, turn up the crowd with your skills. If you don’t have one, act like there’s one.';
update questions set question = 'Show how you give sloppy 3000 or explain how you want it to be done. You can ask help of [partner] 🍆' where question = 'Show how you give sloppy 3000 or explain how you want it to be done. You can ask help of [partner]';
update questions set question = 'Show how you eat the kitty or want it to be eaten, use the vingers of [partner] or explain how you want it to be done 🐱' where question = 'Show how you eat the kitty or want it to be eaten, use the vingers of [partner] or explain how you want it to be done';
update questions set question = 'Massage [partner]’s neck and shoulders in the most sensual way… 🥵' where question = 'Massage [partner]’s neck and shoulders in the most sensual way…';
update questions set question = 'Gently run your fingers over [partner]’s chest down to their stomach, slowly… 🍒' where question = 'Gently run your fingers over [partner]’s chest down to their stomach, slowly…';
update questions set question = 'Everybody gets blindfolded and touch each other, give a little smooch (kiss) 🫣' where question = 'Everybody gets blindfolded and touch each other, give a little smooch (kiss)';
update questions set question = 'Jealousy? Rub over the *** of [partner] and maintain eye contact with your partner 🥵' where question = 'Jealousy? Rub over the *** of [partner] and maintain eye contact with your partner';
update questions set question = 'Put a ice cube in your mouth and go from the neck to their knees with the ice cube, do this to [partner]. No ice cube? Then just kisses 💋' where question = 'Put a ice cube in your mouth and go from the neck to their knees with the ice cube, do this to [partner]. No ice cube? Then just kisses';
update questions set question = 'Give a soft, gentle hicky on the pubic bone of [partner] 💋' where question = 'Give a soft, gentle hicky on the pubic bone of [partner]';
update questions set question = 'What’s your collection of sex toys? Do you have pictures? Ask other players as well 🎁' where question = 'What’s your collection of sex toys? Do you have pictures? Ask other players as well';
update questions set question = 'Have you ever made use of a glory hole, what happend? 😈' where question = 'Have you ever made use of a glory hole, what happend?';
update questions set question = 'Have you ever been to a darkroom? What happend? 😈' where question = 'Have you ever been to a darkroom? What happend?';
update questions set question = 'Do you like to be slapped during sex? 😈' where question = 'Do you like to be slapped during sex?';
update questions set question = 'Have you ever squirted or made someone squirt? How did it happen and was it good? 💦' where question = 'Have you ever squirted or made someone squirt? How did it happen and was it good?';
update questions set question = 'Have you ever made someone orgasm only using your hands and your mouth? Show it 💦' where question = 'Have you ever made someone orgasm only using your hands and your mouth? Show it';
update questions set question = 'Which type of touch helps you to orgasm? And ask the other players the same question… 💦' where question = 'Which type of touch helps you to orgasm? And ask the other players the same question…';
update questions set question = 'What’s a secret fantasy you’ve always been curious about but haven’t tried yet? 😈' where question = 'What’s a secret fantasy you’ve always been curious about but haven’t tried yet?';
update questions set question = 'Have you ever shared a sex toy with someone else? Explain 🎁' where question = 'Have you ever shared a sex toy with someone else? Explain';
update questions set question = 'What do you find most taboo, but still secretly intrigues you? 😈' where question = 'What do you find most taboo, but still secretly intrigues you?';
update questions set question = 'What’s the wildest threesome or groupsome you’ve taken part of 🦄' where question = 'What’s the wildest threesome or groupsome you’ve taken part of';
update questions set question = 'Have you ever fantasized about anyone of these players? Tell the story about each and one of them… 😈' where question = 'Have you ever fantasized about anyone of these players? Tell the story about each and one of them…';
update questions set question = 'Have you ever tried to have partners on both ends? If not, would you? What would make you consider it? 🦄' where question = 'Have you ever tried to have partners on both ends? If not, would you? What would make you consider it?';
update questions set question = 'Have you ever tried double penetration? If not, what would make you consider it? 🦄' where question = 'Have you ever tried double penetration? If not, what would make you consider it?';
update questions set question = 'What can the players do to really arouse you, right now. If you want, you can choose a player to do that to you. If player rejects, player has to remove a piece of clothing. 🔥' where question = 'What can the players do to really arouse you, right now. If you want, you can choose a player to do that to you. If player rejects, player has to remove a piece of clothing.';
update questions set question = 'What’s your favorite way to give or receive oral attention in a sensual way? 🍆' where question = 'What’s your favorite way to give or receive oral attention in a sensual way?';
update questions set question = 'What’s your most memorable threesome experience? 🦄' where question = 'What’s your most memorable threesome experience?';
update questions set question = 'What’s the most exciting fantasy you’ve ever actually tried? 😈' where question = 'What’s the most exciting fantasy you’ve ever actually tried?';
update questions set question = 'What’s your favorite place to be touched, while having foreplay… 🥵' where question = 'What’s your favorite place to be touched, while having foreplay…';
update questions set question = 'Hot sesh… during the sex session, spitting allowed or not, explain. Ask fellow players as well 💦' where question = 'Hot sesh… during the sex session, spitting allowed or not, explain. Ask fellow players as well';
update questions set question = 'Have you ever given someone oral pleasure in an unusual place? When and what happend? 🍆' where question = 'Have you ever given someone oral pleasure in an unusual place? When and what happend?';
update questions set question = 'Where on your body do you most like to be touched in a way that feels almost “magical”? 🥵' where question = 'Where on your body do you most like to be touched in a way that feels almost “magical”?';
update questions set question = 'Do you have a praise kink? If so, what type of compliments or praise turns you on most? Ask [partner] to do it to you 😈' where question = 'Do you have a praise kink? If so, what type of compliments or praise turns you on most? Ask [partner] to do it to you';
update questions set question = 'If your partner would surprise you with roleplay, what role should your partner play? 😈' where question = 'If your partner would surprise you with roleplay, what role should your partner play?';
update questions set question = 'How is your leather fetish? What WOULD turn you on? 😈' where question = 'How is your leather fetish? What WOULD turn you on?';
update questions set question = 'Which body liquid do you find the most arousing? 💦' where question = 'Which body liquid do you find the most arousing?';
update questions set question = 'Till what level do you like to be degraded or humiliated? Give examples 😈' where question = 'Till what level do you like to be degraded or humiliated? Give examples';
update questions set question = 'What do you think about cumplay? And Bukkake? 💦' where question = 'What do you think about cumplay? And Bukkake?';
update questions set question = 'How often do you find yourself thinking about sexual fantasies during a typical week? 😈' where question = 'How often do you find yourself thinking about sexual fantasies during a typical week?';
update questions set question = 'Which ex would you love to have one more exciting encounter with? If there isn’t one, remove one item of clothing. 🔥' where question = 'Which ex would you love to have one more exciting encounter with? If there isn’t one, remove one item of clothing.';
update questions set question = 'If you had to choose: would you rather your partner experience an orgasm with someone else, or would you experience a orgasm with someone else? Ask other players to 💦' where question = 'If you had to choose: would you rather your partner experience an orgasm with someone else, or would you experience a orgasm with someone else? Ask other players to';
update questions set question = 'Time for flashing: flash your chest towards the group. If you don’t want to you can try rock-paper-scissor with a player, winner has to flash. 🍒' where question = 'Time for flashing: flash your chest towards the group. If you don’t want to you can try rock-paper-scissor with a player, winner has to flash.';
update questions set question = 'Play rock-paper-scissors with [partner], loser has to remove a piece of clothing, [partner] decides which piece of clothing 🔥' where question = 'Play rock-paper-scissors with [partner], loser has to remove a piece of clothing, [partner] decides which piece of clothing';
update questions set question = 'Gently glide your hands over [partner]’s chest in a sensual way… let [partner] choose whether it’s over clothing, lingerie, or bare skin. 🍒' where question = 'Gently glide your hands over [partner]’s chest in a sensual way… let [partner] choose whether it’s over clothing, lingerie, or bare skin.';
update questions set question = 'Give someone of your choice a soft but seductive kiss. 💋' where question = 'Give someone of your choice a soft but seductive kiss.';
update questions set question = 'The player with the most votes may place their hands on or under your shirt or lingerie. 🔥' where question = 'The player with the most votes may place their hands on or under your shirt or lingerie.';
update questions set question = 'Give soft kisses to the inside of [partner]’s thigh, close to their ***. ([Partner] without pants.) 🔥' where question = 'Give soft kisses to the inside of [partner]’s thigh, close to their ***. ([Partner] without pants.)';
update questions set question = 'Give soft kisses to the inside of [partner]’s thigh, close to their ***. ([Partner] without pants.) or the other way around, you choose… 🔥' where question = 'Give soft kisses to the inside of [partner]’s thigh, close to their ***. ([Partner] without pants.) or the other way around, you choose…';
update questions set question = 'Slowly remove one piece of upper clothing and reveal a little. You may not put that item of clothing back on. 🔥' where question = 'Slowly remove one piece of upper clothing and reveal a little. You may not put that item of clothing back on.';
update questions set question = 'Choose a player, then play tic-tac-toe (boter, kaas en eieren) with them. The winner decides which item of clothing the other person has to remove. 🔥' where question = 'Choose a player, then play tic-tac-toe (boter, kaas en eieren) with them. The winner decides which item of clothing the other person has to remove.';
update questions set question = 'Play a game of Rock, Paper, Scissors with [partner]. The winner gets to choose and remove one piece of clothing from the loser (Perhaps remove a piece with only your mouth?) 🔥' where question = 'Play a game of Rock, Paper, Scissors with [partner]. The winner gets to choose and remove one piece of clothing from the loser (Perhaps remove a piece with only your mouth?)';
update questions set question = 'Play Rock, Paper, Scissors with [partner] first. The winner has to give the loser 20 second kiss in the neck. Turn off the lights, both remove top clothing and press your body against each other. 🔥' where question = 'Play Rock, Paper, Scissors with [partner] first. The winner has to give the loser 20 second kiss in the neck. Turn off the lights, both remove top clothing and press your body against each other.';
update questions set question = 'Give [partner] a lap dance, while only wearing your underwear/lingerie 🔥' where question = 'Give [partner] a lap dance, while only wearing your underwear/lingerie';
update questions set question = 'Slide your hand in the pants of [partner] and feel it’s getting warm (boner? Wet? 🍆' where question = 'Slide your hand in the pants of [partner] and feel it’s getting warm (boner? Wet?';
update questions set question = 'Do a striptease on [partner]. After you’re finished you can put 2 clothing pieces back on. 💦' where question = 'Do a striptease on [partner]. After you’re finished you can put 2 clothing pieces back on.';
update questions set question = 'Do motorboat on [partner]. 30 seconds 🍒' where question = 'Do motorboat on [partner]. 30 seconds';
update questions set question = 'Time for voting. The player with most votes gets to caress with hands over *** of the player 🥵' where question = 'Time for voting. The player with most votes gets to caress with hands over *** of the player';
update questions set question = 'Re-enact the position of doggystyle while only having underwear/lingerie on. Do this with [partner], you decide who has which role 🔥' where question = 'Re-enact the position of doggystyle while only having underwear/lingerie on. Do this with [partner], you decide who has which role';
update questions set question = 'If there are 3 or more players let one player hold you from the back, while your sitting and let [partner] kiss you on our inner thighs, no pants… 🔥' where question = 'If there are 3 or more players let one player hold you from the back, while your sitting and let [partner] kiss you on our inner thighs, no pants…';
update questions set question = 'Let [partner] take of their pants and slowly kiss your way from their ankles to your inner thighs 🔥' where question = 'Let [partner] take of their pants and slowly kiss your way from their ankles to your inner thighs';
update questions set question = 'Get blindfolder and touch *** of the players and guess who is who… 🫣' where question = 'Get blindfolder and touch *** of the players and guess who is who…';
update questions set question = 'Uno reverse!! Everybody kiss someone who is not your partner, unless the sexual preference does allow it 💋' where question = 'Uno reverse!! Everybody kiss someone who is not your partner, unless the sexual preference does allow it';
update questions set question = 'Make out with [partner] and let them return the favor to a player of choice 💋' where question = 'Make out with [partner] and let them return the favor to a player of choice';
update questions set question = 'Blindfold and guess who is who, players must be in underwear/lingerie 🫣' where question = 'Blindfold and guess who is who, players must be in underwear/lingerie';
update questions set question = 'Choose another player with [partner], that will kiss you from the ankles all the way to your neck, you better be only wearing underwear/lingerie… 🔥' where question = 'Choose another player with [partner], that will kiss you from the ankles all the way to your neck, you better be only wearing underwear/lingerie…';
update questions set question = 'Choose a player, who your going to kiss the inner thighs of [partner]… 💋' where question = 'Choose a player, who your going to kiss the inner thighs of [partner]…';
update questions set question = 'Each players gets to feel your chest, but they have to be blindfolded 🍒' where question = 'Each players gets to feel your chest, but they have to be blindfolded';
update questions set question = 'Turn of the light, and [partner] can slide their hands in your pants feel all over your ***. If you still have your underwear/lingerie on, guess your lucky? 🔥' where question = 'Turn of the light, and [partner] can slide their hands in your pants feel all over your ***. If you still have your underwear/lingerie on, guess your lucky?';
update questions set question = 'Get blindfolded and turn of the lights, let all players lick/nibble on your nipple and goes who is who 🍒' where question = 'Get blindfolded and turn of the lights, let all players lick/nibble on your nipple and goes who is who';
update questions set question = 'Select two players, let them sit next to each other and rub over their ***. They have to be in underwear of lingerie. Make eye-contact while doing 🔥' where question = 'Select two players, let them sit next to each other and rub over their ***. They have to be in underwear of lingerie. Make eye-contact while doing';
update questions set question = 'How do you like to use your tongue to tease and seduce someone? 👅' where question = 'How do you like to use your tongue to tease and seduce someone?';
update questions set question = 'Which player here would you choose to undress you, and how slowly? 🔥' where question = 'Which player here would you choose to undress you, and how slowly?';
update questions set question = 'Which player''s kiss tonight surprised you the most, and why? 💋' where question = 'Which player''s kiss tonight surprised you the most, and why?';
update questions set question = 'Who here do you think is the best kisser so far? Let the others guess first. 💋' where question = 'Who here do you think is the best kisser so far? Let the others guess first.';
update questions set question = 'Which player would you like to be blindfolded with, and what should happen next? 🫣' where question = 'Which player would you like to be blindfolded with, and what should happen next?';
update questions set question = 'Which piece of clothing of another player would you like to remove yourself? 🔥' where question = 'Which piece of clothing of another player would you like to remove yourself?';
update questions set question = 'Tell us one fantasy involving more than two people you''d like to try. 🦄' where question = 'Tell us one fantasy involving more than two people you''d like to try.';
update questions set question = 'Gently place a soft but sensual kiss on [partner]’s neck. 💋' where question = 'Gently place a soft but sensual kiss on [partner]’s neck.';
update questions set question = 'Showcase how your partner sounds when they’re having an orgasm, including sound 💦' where question = 'Showcase how your partner sounds when they’re having an orgasm, including sound';
update questions set question = 'Imagine being a create actor, now do a great move kiss with [partner] 💋' where question = 'Imagine being a create actor, now do a great move kiss with [partner]';
update questions set question = 'If there’s alcohol… do rock-paper-scissor with [partner], loser out of 3 games has to take a shot 🥃' where question = 'If there’s alcohol… do rock-paper-scissor with [partner], loser out of 3 games has to take a shot';
update questions set question = 'Give a soft, sweet kiss on [partner]’s neck. 💋' where question = 'Give a soft, sweet kiss on [partner]’s neck.';
update questions set question = 'Take off a clothing piece, unless you can beat a player with rock-paper-scissor then loser has to 🔥' where question = 'Take off a clothing piece, unless you can beat a player with rock-paper-scissor then loser has to';
update questions set question = 'Take a shot 🥃' where question = 'Take a shot';
update questions set question = 'Try to make [partner] blush… do anything except touching. 🤭' where question = 'Try to make [partner] blush… do anything except touching.';
update questions set question = 'Take a sip water and show how far your *** can shoot 💦' where question = 'Take a sip water and show how far your *** can shoot';
update questions set question = 'Give a lower back massage to [partner], just a short, nice, sensual massage 🍑' where question = 'Give a lower back massage to [partner], just a short, nice, sensual massage';
update questions set question = 'Place a soft kiss on [partner]’s hand… slow, playful, and just a little too lingering. 💋' where question = 'Place a soft kiss on [partner]’s hand… slow, playful, and just a little too lingering.';
update questions set question = 'Lick the cheek of [partner] 👅' where question = 'Lick the cheek of [partner]';
update questions set question = 'Stroke the earlobe of [partner[ with your tongue, sensual as possible 👅' where question = 'Stroke the earlobe of [partner[ with your tongue, sensual as possible';
update questions set question = 'Give a flirty, teasing pole dance to an imaginary pole and own the room for a moment. 💃' where question = 'Give a flirty, teasing pole dance to an imaginary pole and own the room for a moment.';
update questions set question = 'Let [partner] guess what color your underwear or lingerie is today… 🔥' where question = 'Let [partner] guess what color your underwear or lingerie is today…';
update questions set question = 'Get close to [partner] and whisper ‘come here’ like you’ve got a little secret worth sharing. 🤫' where question = 'Get close to [partner] and whisper ‘come here’ like you’ve got a little secret worth sharing.';
update questions set question = 'Draw or describe your perfect kitty 🐱' where question = 'Draw or describe your perfect kitty';
update questions set question = 'Let [partner] whisper a fantasy in your ear, which you have to re-enact to [partner] 🤫' where question = 'Let [partner] whisper a fantasy in your ear, which you have to re-enact to [partner]';
update questions set question = 'Whisper something naughty in [partner] ear… 🤫' where question = 'Whisper something naughty in [partner] ear…';
update questions set question = 'Give someone a cheek kiss that feels more flirty than innocent. 💋' where question = 'Give someone a cheek kiss that feels more flirty than innocent.';
update questions set question = 'Blowjob with 1 or 2 hands? If 1 one where does the other hand go… 🍆' where question = 'Blowjob with 1 or 2 hands? If 1 one where does the other hand go…';
update questions set question = 'Blow the most sensual and flirty kiss you can toward [partner]. 💋' where question = 'Blow the most sensual and flirty kiss you can toward [partner].';
update questions set question = 'Draw or describe your perfect eggplant 🍆' where question = 'Draw or describe your perfect eggplant';
update questions set question = 'Act how [partner] has een orgasm, if you don’t know, just improvise 💦' where question = 'Act how [partner] has een orgasm, if you don’t know, just improvise';
update questions set question = 'Fake your orgasm in the ear of [partner], but make it believable 💦' where question = 'Fake your orgasm in the ear of [partner], but make it believable';
update questions set question = 'Step behind and against [partner], hold there hips and dance together like there’s music playing only for you two. 💃' where question = 'Step behind and against [partner], hold there hips and dance together like there’s music playing only for you two.';
update questions set question = 'What kind of pubic hair, should your partner have? Landing strip? Jackson 5? Bald? Short? 🤭' where question = 'What kind of pubic hair, should your partner have? Landing strip? Jackson 5? Bald? Short?';
update questions set question = 'What do you prefer more MFM or FFM? Or Both? 🦄' where question = 'What do you prefer more MFM or FFM? Or Both?';
update questions set question = 'What’s your favorite way to give and receive oral? 🍆' where question = 'What’s your favorite way to give and receive oral?';
update questions set question = 'Have you ever dreamed about a wild, uninhibited night with multiple people? 🦄' where question = 'Have you ever dreamed about a wild, uninhibited night with multiple people?';
update questions set question = 'What’s your favorite erotic roleplay scenario? ((e.g. doctor, nurse, police, teacher, trainer)? 😈' where question = 'What’s your favorite erotic roleplay scenario? ((e.g. doctor, nurse, police, teacher, trainer)?';
update questions set question = 'Have you ever swapped partners, what did you like the most about it? 🦄' where question = 'Have you ever swapped partners, what did you like the most about it?';
update questions set question = 'What’s your favorite place to kiss someone… when the moment gets a little more intimate? 💋' where question = 'What’s your favorite place to kiss someone… when the moment gets a little more intimate?';
update questions set question = 'What’s the naughtiest thing you’ve ever whispered in someone’s ear? And if nothing comes to mind, make something up. 🤫' where question = 'What’s the naughtiest thing you’ve ever whispered in someone’s ear? And if nothing comes to mind, make something up.';
update questions set question = 'Do you prefer to be Submissive or Dominant? Or are you a Switch? 😈' where question = 'Do you prefer to be Submissive or Dominant? Or are you a Switch?';
update questions set question = 'Have you ever played strip poker or any other flirty games? 🔥' where question = 'Have you ever played strip poker or any other flirty games?';
update questions set question = 'Have you ever been caught watching porn or mastrubating? 🤭' where question = 'Have you ever been caught watching porn or mastrubating?';
update questions set question = 'Have you ever done something exciting in a place where you could have been caught? 🤭' where question = 'Have you ever done something exciting in a place where you could have been caught?';
update questions set question = 'Have you ever had a fantasy about someone taboo, like a teacher or someone off-limits? 😈' where question = 'Have you ever had a fantasy about someone taboo, like a teacher or someone off-limits?';
update questions set question = 'What’s the naughtiest thing you’ve ever done in public? 🤭' where question = 'What’s the naughtiest thing you’ve ever done in public?';
update questions set question = 'What’s the hottest on-screen kiss you’ve seen in a movie or series? 💋' where question = 'What’s the hottest on-screen kiss you’ve seen in a movie or series?';
update questions set question = 'What’s your favorite piece of clothing when you want to feel sexy? 🔥' where question = 'What’s your favorite piece of clothing when you want to feel sexy?';
update questions set question = 'How was your first kiss experience? 💋' where question = 'How was your first kiss experience?';
update questions set question = 'What’s the weirdest place you had sex? 🤭' where question = 'What’s the weirdest place you had sex?';
update questions set question = 'Do you have a favorite toy or object you enjoy using, that you couldn’t want to be without? 🎁' where question = 'Do you have a favorite toy or object you enjoy using, that you couldn’t want to be without?';
update questions set question = 'Where do you love being kissed the most? 💋' where question = 'Where do you love being kissed the most?';
update questions set question = 'What’s the weirdest place you have masturbated? Ask other players as well 🥵' where question = 'What’s the weirdest place you have masturbated? Ask other players as well';
update questions set question = 'Have you ever used home attributes as sex toys? (Electric toothbrush, banana, spoon, cucumber, deodorant) 🎁' where question = 'Have you ever used home attributes as sex toys? (Electric toothbrush, banana, spoon, cucumber, deodorant)';
update questions set question = 'What kind of sex would you choose: Vanilla, Roleplay, BDSM, Porn, or different or combinations? 😈' where question = 'What kind of sex would you choose: Vanilla, Roleplay, BDSM, Porn, or different or combinations?';
update questions set question = 'Have you ever had sex in a cinema? 🤭' where question = 'Have you ever had sex in a cinema?';
update questions set question = 'Rate analsex, between 1-10. What makes you want it and when? Ask players also for their opnion 🍑' where question = 'Rate analsex, between 1-10. What makes you want it and when? Ask players also for their opnion';
update questions set question = 'Do you like bootyplay? Why, how and when? 🍑' where question = 'Do you like bootyplay? Why, how and when?';
update questions set question = 'What makes a good pussy eating session, what really satisfies you a 100%? Ask the rest of the players as well 🐱' where question = 'What makes a good pussy eating session, what really satisfies you a 100%? Ask the rest of the players as well';
update questions set question = 'What’s the best blowjob you have received or have given, explain why. Ask the rest for their stories as well 🍆' where question = 'What’s the best blowjob you have received or have given, explain why. Ask the rest for their stories as well';
update questions set question = 'Oral job… with a lot of saliva or keeping it clean? 🍆' where question = 'Oral job… with a lot of saliva or keeping it clean?';
update questions set question = 'Have you ever played strippoker? What was the score and how did it end? 🔥' where question = 'Have you ever played strippoker? What was the score and how did it end? ';
update questions set question = 'What are your favorite anal toys to use, explain how… Also ask players their ideas 🍑' where question = 'What are your favorite anal toys to use, explain how… Also ask players their ideas';
update questions set question = 'Which of your sexual fantasies haven’t been realized yet? Ask other players as well 😈' where question = 'Which of your sexual fantasies haven’t been realized yet? Ask other players as well';
update questions set question = 'Which place is your ultimate fantasy to have sex at? 😈' where question = 'Which place is your ultimate fantasy to have sex at?';
update questions set question = 'Have you ever done role-play? 😈' where question = 'Have you ever done role-play?';
update questions set question = 'When was the last time you skinny-dipped? 🤭' where question = 'When was the last time you skinny-dipped?';
update questions set question = 'Have you ever been to a stripclub? Did you have a lapdance and/or spend money there? 🔥' where question = 'Have you ever been to a stripclub? Did you have a lapdance and/or spend money there?';
update questions set question = 'Have you ever: had sex in public? How, what and where? 🤭' where question = 'Have you ever: had sex in public? How, what and where?';
update questions set question = 'What’s your opinion on bondage or blindfolds? 🫣' where question = 'What’s your opinion on bondage or blindfolds?';
update questions set question = 'What is your most embarrassing sex story ever? 🤭' where question = 'What is your most embarrassing sex story ever?';
update questions set question = 'What’s the worst song that has come on while having a sex session? 🤭' where question = 'What’s the worst song that has come on while having a sex session?';
update questions set question = 'Where’s your favorite spot for a secret smooch (kiss)? 💋' where question = 'Where’s your favorite spot for a secret smooch (kiss)?';
update questions set question = 'Describe your perfect smooch (kiss) 💋' where question = 'Describe your perfect smooch (kiss)';
update questions set question = 'Dance close to [partner] for 20 seconds, no hands allowed. 💃' where question = 'Dance close to [partner] for 20 seconds, no hands allowed.';
update questions set question = 'Let the group choose a song, you pick who you slow dance with for one minute. 💃' where question = 'Let the group choose a song, you pick who you slow dance with for one minute.';
update questions set question = 'Tell [partner] which part of them you would kiss first, but don''t do it… yet. 💋' where question = 'Tell [partner] which part of them you would kiss first, but don''t do it… yet.';
update questions set question = 'Sit on [partner]''s lap for 30 seconds and whisper them a compliment. 🤫' where question = 'Sit on [partner]''s lap for 30 seconds and whisper them a compliment.';
update questions set question = 'If there are more than 3 players, choose at least two players and give them a handjob at the same time… good luck! If only one player, you know what to do… 🍆' where question = 'If there are more than 3 players, choose at least two players and give them a handjob at the same time… good luck! If only one player, you know what to do…';
update questions set question = 'Gently explore [partner]’s *** in a teasing way for 30 seconds. 🥵' where question = 'Gently explore [partner]’s *** in a teasing way for 30 seconds.';
update questions set question = 'Give a handjob to a player of your choice 🍆' where question = 'Give a handjob to a player of your choice';
update questions set question = 'Time for bump and grind… take of your pants and faceride [partner]. If you want to be cheeky slide your undies to the side, do you 🍑' where question = 'Time for bump and grind… take of your pants and faceride [partner]. If you want to be cheeky slide your undies to the side, do you';
update questions set question = 'Let [partner] caress your nipples in a teasing way, for 30 seconds 🍒' where question = 'Let [partner] caress your nipples in a teasing way, for 30 seconds';
update questions set question = 'Let [partner] kiss in your neck, while you’re playing with yourself. If you’re lucky player wants to help you with the handjob? 🍆' where question = 'Let [partner] kiss in your neck, while you’re playing with yourself. If you’re lucky player wants to help you with the handjob?';
update questions set question = 'Play with your ***, while [partner] is kissing in your neck 💋' where question = 'Play with your ***, while [partner] is kissing in your neck';
update questions set question = 'Cover [partner]’s mouth while you’re caressing there *** 🥵' where question = 'Cover [partner]’s mouth while you’re caressing there ***';
update questions set question = 'Give a body to body massage to [partner], no clothes allowed 🔥' where question = 'Give a body to body massage to [partner], no clothes allowed';
update questions set question = 'Lick, suck and play with the nipples of [partner] 🍒' where question = 'Lick, suck and play with the nipples of [partner]';
update questions set question = 'Self masturbate with a toy against your ***, (or use a player’s hand if no toy is available), done? Then pick two other players who must also complete the same challenge. 60 seconds max. 🥵' where question = 'Self masturbate with a toy against your ***, (or use a player’s hand if no toy is available), done? Then pick two other players who must also complete the same challenge. 60 seconds max.';
update questions set question = 'Put on a blindfold and rub/play with yourself. The players need to keep an eye on the timer, 60 seconds. 🫣' where question = 'Put on a blindfold and rub/play with yourself. The players need to keep an eye on the timer, 60 seconds.';
update questions set question = 'Give a sensual handjob and let other player(s) watch the timer. 180 seconds. 🍆' where question = 'Give a sensual handjob and let other player(s) watch the timer. 180 seconds.';
update questions set question = 'Select a player that has to give you a handjob for 180 seconds. 🍆' where question = 'Select a player that has to give you a handjob for 180 seconds.';
update questions set question = 'Edge [partner] by playing with your hands on their *** 💦' where question = 'Edge [partner] by playing with your hands on their ***';
update questions set question = 'Describe exactly how you would like to be touched right now. A player of your choice may follow your instructions. 🥵' where question = 'Describe exactly how you would like to be touched right now. A player of your choice may follow your instructions.';
update questions set question = 'Whisper your biggest wish for tonight to the player of your choice, they decide if it happens. 🤫' where question = 'Whisper your biggest wish for tonight to the player of your choice, they decide if it happens.';
update questions set question = 'Get undressed together with [partner], one piece at a time, slowly. 🔥' where question = 'Get undressed together with [partner], one piece at a time, slowly.';
update questions set question = 'Pick two players. They get to undress you completely, at their own pace. 🔥' where question = 'Pick two players. They get to undress you completely, at their own pace.';
update questions set question = 'Lie down and let [partner] explore your body with their mouth, you set the limits. 🥵' where question = 'Lie down and let [partner] explore your body with their mouth, you set the limits.';
update questions set question = 'Get blindfolded. The players take turns spoiling you for two minutes, guess who is who. 🫣' where question = 'Get blindfolded. The players take turns spoiling you for two minutes, guess who is who.';
update questions set question = 'Let [partner] use a toy on you for 60 seconds, no toy? Hands only. 🎁' where question = 'Let [partner] use a toy on you for 60 seconds, no toy? Hands only.';
update questions set question = 'Pick a couple and swap: you take one partner, they take yours, until the timer of the next turn. 🦄' where question = 'Pick a couple and swap: you take one partner, they take yours, until the timer of the next turn.';
update questions set question = 'Edge [partner] for three minutes, they may not finish until the timer runs out. 💦' where question = 'Edge [partner] for three minutes, they may not finish until the timer runs out.';
update questions set question = 'Everyone undresses down to nothing, you decide the order. 🔥' where question = 'Everyone undresses down to nothing, you decide the order.';
update questions set question = 'Let [partner] style your hair however they want 😈' where question = 'Let [partner] style your hair however they want';
update questions set question = 'Do a trust fall with [partner] 😈' where question = 'Do a trust fall with [partner]';
update questions set question = 'What''s your biggest turn-off? 😏' where question = 'What''s your biggest turn-off?';
update questions set question = 'What''s your ideal type in a partner? 😏' where question = 'What''s your ideal type in a partner?';
update questions set question = 'What''s the most adventurous thing you''ve done? 😏' where question = 'What''s the most adventurous thing you''ve done?';
update questions set question = 'Heb je ooit iemand oraal bevredigd op een ongewone plek? 😈' where question = 'Heb je ooit iemand oraal bevredigd op een ongewone plek?';
update questions set question = 'Create a romantic moment with [partner] 😈' where question = 'Create a romantic moment with [partner]';
update questions set question = 'What''s your biggest turn-on? 😏' where question = 'What''s your biggest turn-on?';
update questions set question = 'What''s your secret desire? 🤫' where question = 'What''s your secret desire?';
update questions set question = 'What''s your most adventurous experience? 😏' where question = 'What''s your most adventurous experience?';
update questions set question = 'What''s the most intimate moment you''ve experienced? 😏' where question = 'What''s the most intimate moment you''ve experienced?';
update questions set question = 'Play rock-paper-scissors with [partner] 😈' where question = 'Play rock-paper-scissors with [partner]';
update questions set question = 'Do your best impression of [partner] 😈' where question = 'Do your best impression of [partner]';
update questions set question = 'Give [partner] a compliment while maintaining eye contact 😏' where question = 'Give [partner] a compliment while maintaining eye contact';
update questions set question = 'Do 10 jumping jacks 😈' where question = 'Do 10 jumping jacks';
update questions set question = 'Create a secret handshake with [partner] 😈' where question = 'Create a secret handshake with [partner]';
update questions set question = 'Wat is je favoriete manier om iemand op te winden? 😈' where question = 'Wat is je favoriete manier om iemand op te winden?';
update questions set question = 'What''s your guilty pleasure? 🤫' where question = 'What''s your guilty pleasure?';
update questions set question = 'What''s the silliest thing you''re afraid of? 😏' where question = 'What''s the silliest thing you''re afraid of?';
update questions set question = 'What''s your biggest pet peeve? 😏' where question = 'What''s your biggest pet peeve?';
update questions set question = 'Give [partner] a passionate embrace 😈' where question = 'Give [partner] a passionate embrace';
update questions set question = 'Create a romantic scene with [partner] 😈' where question = 'Create a romantic scene with [partner]';
update questions set question = 'What''s the most romantic place you''ve been to? 💕' where question = 'What''s the most romantic place you''ve been to?';
update questions set question = 'What''s your perfect romantic evening? 💕' where question = 'What''s your perfect romantic evening?';
update questions set question = 'What''s your most memorable romantic moment? 💕' where question = 'What''s your most memorable romantic moment?';
update questions set question = 'Heb je ooit erotische foto’s van jezelf laten maken? 😏' where question = 'Heb je ooit erotische foto’s van jezelf laten maken?';
update questions set question = 'Wat vind jij: liever lang voorspel of meteen actie? 😏' where question = 'Wat vind jij: liever lang voorspel of meteen actie?';
update questions set question = 'Wat is de sensueelste ervaring die je ooit hebt gehad zonder seks? 😏' where question = 'Wat is de sensueelste ervaring die je ooit hebt gehad zonder seks?';
update questions set question = 'Wat is jouw dirty talk-stijl: fluisterend of direct? 😏' where question = 'Wat is jouw dirty talk-stijl: fluisterend of direct?';
update questions set question = 'Create an intimate moment with [partner] 😈' where question = 'Create an intimate moment with [partner]';
update questions set question = 'Show your best seductive move 😏' where question = 'Show your best seductive move';
update questions set question = 'What''s your most intense romantic experience? 💕' where question = 'What''s your most intense romantic experience?';
update questions set question = 'What''s your biggest turn-on? 😏' where question = 'What''s your biggest turn-on?';
update questions set question = 'What''s your most passionate moment? 😏' where question = 'What''s your most passionate moment?';
update questions set question = 'What''s your secret desire? 🤫' where question = 'What''s your secret desire?';
update questions set question = 'Write a short love poem 😈' where question = 'Write a short love poem';
update questions set question = 'Feed [partner] something sweet 😈' where question = 'Feed [partner] something sweet';
update questions set question = 'Go to any news site and read the first article as sensual as possible 😈' where question = 'Go to any news site and read the first article as sensual as possible';
update questions set question = 'Give [partner] a gentle massage 😈' where question = 'Give [partner] a gentle massage';
update questions set question = 'Heb je ooit erotische foto’s van jezelf gemaakt? 😏' where question = 'Heb je ooit erotische foto’s van jezelf gemaakt?';
update questions set question = 'Give [partner] a romantic nickname 😈' where question = 'Give [partner] a romantic nickname';
update questions set question = 'What''s your favorite romantic memory? 💕' where question = 'What''s your favorite romantic memory?';
update questions set question = 'Wat is je favoriete voorspelmoment? 😏' where question = 'Wat is je favoriete voorspelmoment?';
update questions set question = 'What’s the most sensual experience you’ve ever had without having sex? 😏' where question = 'What’s the most sensual experience you’ve ever had without having sex?';
update questions set question = 'What''s your definition of true love? 💕' where question = 'What''s your definition of true love?';
update questions set question = 'What''s your ideal date night? 💕' where question = 'What''s your ideal date night?';
update questions set question = 'What''s your favorite way to show affection? 💕' where question = 'What''s your favorite way to show affection?';
update questions set question = 'What''s the most romantic thing someone''s done for you? 💕' where question = 'What''s the most romantic thing someone''s done for you?';
update questions set question = 'Hou je van overgave of van controle? 😏' where question = 'Hou je van overgave of van controle?';
update questions set question = 'What turns you on? Let [partner] do this to you for 40 seconds. How do you feel? 😈' where question = 'What turns you on? Let [partner] do this to you for 40 seconds. How do you feel?';
update questions set question = 'You are an elite security agent. Search all players to ensure nobody is carrying weapons. Be very thorough and maintain eye contact. 😏' where question = 'You are an elite security agent. Search all players to ensure nobody is carrying weapons. Be very thorough and maintain eye contact.';
update questions set question = 'Act out a sex-position with [partner], in a playful and sensual way. 😈' where question = 'Act out a sex-position with [partner], in a playful and sensual way.';
update questions set question = 'Simulate a sensual breath in [partner]’s ear for 15 seconds. 😈' where question = 'Simulate a sensual breath in [partner]’s ear for 15 seconds.';
update questions set question = 'Take a sip of a drink and give it to [partner] 😈' where question = 'Take a sip of a drink and give it to [partner]';
update questions set question = 'What is your favorite sex-position, let the players guess first before you answer. 😏' where question = 'What is your favorite sex-position, let the players guess first before you answer.';
update questions set question = 'How freaky are you under the sheets, explain 😏' where question = 'How freaky are you under the sheets, explain';
update questions set question = 'Who would you promote to fuck buddy, you can’t choose your partner, explain why 😏' where question = 'Who would you promote to fuck buddy, you can’t choose your partner, explain why';
update questions set question = 'Which words or phrases instantly put you in a state of ultimate horniness? 😏' where question = 'Which words or phrases instantly put you in a state of ultimate horniness?';
update questions set question = 'Have you ever had sex while other people while others watched? 🤭' where question = 'Have you ever had sex while other people while others watched?';
update questions set question = 'Do you prefer vanilla or rough? 😏' where question = 'Do you prefer vanilla or rough?';
update questions set question = 'What''s your deepest secret desire? 🤫' where question = 'What''s your deepest secret desire?';
update questions set question = 'Have you ever felt attracted to someone while you were with your partner? Be honest we all have eyes… 🤭' where question = 'Have you ever felt attracted to someone while you were with your partner? Be honest we all have eyes…';
update questions set question = 'What’s your favorite foreplay moment? 😏' where question = 'What’s your favorite foreplay moment?';
update questions set question = 'What’s the most naughtiest and freakiest thing you’ve ever experienced? 😏' where question = 'What’s the most naughtiest and freakiest thing you’ve ever experienced?';
update questions set question = 'What makes your sexual memories so intense and unforgettable? 😏' where question = 'What makes your sexual memories so intense and unforgettable?';
update questions set question = 'Have you ever felt attracted to someone while you were with someone else? 🤭' where question = 'Have you ever felt attracted to someone while you were with someone else?';
update questions set question = 'What’s the deepest secret about your sex life that you’re willing to share? 🤫' where question = 'What’s the deepest secret about your sex life that you’re willing to share?';
update questions set question = 'What''s the freakiest thing you have ever done at a party? 😏' where question = 'What''s the freakiest thing you have ever done at a party?';
update questions set question = 'If your partner gave you permission to do absolutely anything, what would you do? 😏' where question = 'If your partner gave you permission to do absolutely anything, what would you do?';
update questions set question = 'Describe the most seductive build-up or romantic tension you’ve ever experienced. 💕' where question = 'Describe the most seductive build-up or romantic tension you’ve ever experienced.';
update questions set question = 'Prefer to watch your partner or your partner watch you? Ask everyone’s opinion 😏' where question = 'Prefer to watch your partner or your partner watch you? Ask everyone’s opinion';
update questions set question = 'What’s the most intense and exciting experience you’ve ever shared with more than one person—if you don’t have one, feel free to imagine one? 😏' where question = 'What’s the most intense and exciting experience you’ve ever shared with more than one person—if you don’t have one, feel free to imagine one?';
update questions set question = 'If you have a piercing/tattoo which isn’t visible, show the players. If you don’t have any show the most sensitive spot on your body 😏' where question = 'If you have a piercing/tattoo which isn’t visible, show the players. If you don’t have any show the most sensitive spot on your body';
update questions set question = 'What is something you want to happen tonight, but haven''t dared to say out loud yet? 😏' where question = 'What is something you want to happen tonight, but haven''t dared to say out loud yet?';
update questions set question = 'Describe in three words how you feel right now. 😏' where question = 'Describe in three words how you feel right now.';
update questions set question = 'What is your boundary tonight, and what is the one thing that''s just barely allowed? 😏' where question = 'What is your boundary tonight, and what is the one thing that''s just barely allowed?';
update questions set question = 'If you could watch two players here together, who would you pick? 😏' where question = 'If you could watch two players here together, who would you pick?';
update questions set question = 'What would you like your partner to see you do with someone else tonight? 😏' where question = 'What would you like your partner to see you do with someone else tonight?';
update questions set question = 'What is the sexiest thing someone has done to you tonight? 😏' where question = 'What is the sexiest thing someone has done to you tonight?';
update questions set question = 'Where on your body would you like a player''s hands right now? Point it out. 😏' where question = 'Where on your body would you like a player''s hands right now? Point it out.';
update questions set question = 'Do you like it when your partner gets a little jealous? Ask your partner the same. 😏' where question = 'Do you like it when your partner gets a little jealous? Ask your partner the same.';
update questions set question = 'What would make you go from watching to joining in? 😏' where question = 'What would make you go from watching to joining in?';
update questions set question = 'Which player gives you the most confident energy tonight, and what would you let them do? 😏' where question = 'Which player gives you the most confident energy tonight, and what would you let them do?';
update questions set question = 'What sound do you make when something feels really good? Let the group hear a sample. 😏' where question = 'What sound do you make when something feels really good? Let the group hear a sample.';
update questions set question = 'What is the most daring thing you''ve done at an openminded party? 😏' where question = 'What is the most daring thing you''ve done at an openminded party?';
update questions set question = 'Rate tonight''s tension so far, 1-10. What would make it a 10? 😏' where question = 'Rate tonight''s tension so far, 1-10. What would make it a 10?';
update questions set question = 'Who here would you trust to take the lead with you? 😏' where question = 'Who here would you trust to take the lead with you?';
update questions set question = 'Open your shirt slightly or lift it up in a teasing manner 😈' where question = 'Open your shirt slightly or lift it up in a teasing manner';
update questions set question = 'You''re a 0900 hotline and [partner] is calling you, now entertain them (phone sex-sesh) 😈' where question = 'You''re a 0900 hotline and [partner] is calling you, now entertain them (phone sex-sesh)';
update questions set question = 'Say something to [partner] like you’re really attracted to them. 😈' where question = 'Say something to [partner] like you’re really attracted to them.';
update questions set question = 'Try to seduce [partner] with just eye contact and see how long you can hold it. 😏' where question = 'Try to seduce [partner] with just eye contact and see how long you can hold it.';
update questions set question = 'If you have candy or something similar, hide it and let [partner] search for it, 30 seconds. If not found player gets a spaning 😈' where question = 'If you have candy or something similar, hide it and let [partner] search for it, 30 seconds. If not found player gets a spaning';
update questions set question = 'Sit next to [partner], act like your in a car and start rubbing the inner thigh. You have 45 seconds to arouse them 😈' where question = 'Sit next to [partner], act like your in a car and start rubbing the inner thigh. You have 45 seconds to arouse them';
update questions set question = 'Give all possible words you know for vagina 😈' where question = 'Give all possible words you know for vagina';
update questions set question = 'Have phone-sex with [partner] 😈' where question = 'Have phone-sex with [partner]';
update questions set question = 'Give [partner] a compliment about their appearance… something a little flirty that makes them smile differently. 😏' where question = 'Give [partner] a compliment about their appearance… something a little flirty that makes them smile differently.';
update questions set question = 'Give [partner] a seductive wink and make them believe it 😏' where question = 'Give [partner] a seductive wink and make them believe it';
update questions set question = 'What is your favorite position? Re-enact this with [partner] 😈' where question = 'What is your favorite position? Re-enact this with [partner]';
update questions set question = 'Re-enact scissoring with [partner] for at least 20 seconds 😈' where question = 'Re-enact scissoring with [partner] for at least 20 seconds';
update questions set question = 'Ask [partner] to give you a nickname based on what you remind them of. 😈' where question = 'Ask [partner] to give you a nickname based on what you remind them of.';
update questions set question = 'Re-enact missionary with [partner] for at least 20 seconds 😈' where question = 'Re-enact missionary with [partner] for at least 20 seconds';
update questions set question = 'Do 2 sexy poses, players get to rate them 1 - 10 😈' where question = 'Do 2 sexy poses, players get to rate them 1 - 10';
update questions set question = 'Slowly run one finger along [partner]’s arm and see what it does to them. 😈' where question = 'Slowly run one finger along [partner]’s arm and see what it does to them.';
update questions set question = 'Let [partner] slowly touch your neck for 30 seconds. 😈' where question = 'Let [partner] slowly touch your neck for 30 seconds.';
update questions set question = 'You''re the FBI agent now. Give [partner] a slow, imaginary body scan with your eyes—from head to toe—to make sure they''re not hiding any weapons. 😈' where question = 'You''re the FBI agent now. Give [partner] a slow, imaginary body scan with your eyes—from head to toe—to make sure they''re not hiding any weapons.';
update questions set question = 'Say to [partner], "If I had you all to myself, and I had full permission, I''d..." then complete the sentence with something playful. 😈' where question = 'Say to [partner], "If I had you all to myself, and I had full permission, I''d..." then complete the sentence with something playful.';
update questions set question = 'What''s your perfect intimate evening? 😏' where question = 'What''s your perfect intimate evening?';
update questions set question = 'Have you ever experimented with the same sex? If yes, tell the story, if no, what would make you consider to do it? 🤭' where question = 'Have you ever experimented with the same sex? If yes, tell the story, if no, what would make you consider to do it?';
update questions set question = 'What’s the most adventurous thing you’ve ever done sexually? 😏' where question = 'What’s the most adventurous thing you’ve ever done sexually?';
update questions set question = 'Tell us about a moment when you completely gave in to lust and passion. 😏' where question = 'Tell us about a moment when you completely gave in to lust and passion.';
update questions set question = 'What''s your perfect romantic evening? 💕' where question = 'What''s your perfect romantic evening?';
update questions set question = 'Which animal suits your sexual energy? 😏' where question = 'Which animal suits your sexual energy?';
update questions set question = 'What combination of intimate acts brings you the ultimate pleasure? Tell us the story. Ask all players the same question 😏' where question = 'What combination of intimate acts brings you the ultimate pleasure? Tell us the story. Ask all players the same question';
update questions set question = 'What have you tried that scared you at first, but you ended up enjoying anyway? 😏' where question = 'What have you tried that scared you at first, but you ended up enjoying anyway?';
update questions set question = 'What words or sounds make you completely lose control? 😏' where question = 'What words or sounds make you completely lose control?';
update questions set question = 'Which part of your partner’s body do you find most attractive or captivating? 😏' where question = 'Which part of your partner’s body do you find most attractive or captivating?';
update questions set question = 'What is your most random sex story? 😏' where question = 'What is your most random sex story?';
update questions set question = 'Tell about a time you made someone laugh during an intimate or romantic moment. 💕' where question = 'Tell about a time you made someone laugh during an intimate or romantic moment.';
update questions set question = 'What is your secret weapon to make your partner come or ultimate horney? 🤫' where question = 'What is your secret weapon to make your partner come or ultimate horney?';
update questions set question = 'How often would you ideally want intimacy or closeness in a week? 😏' where question = 'How often would you ideally want intimacy or closeness in a week?';
update questions set question = 'What’s the most erotic gift you’ve ever received? 😏' where question = 'What’s the most erotic gift you’ve ever received?';
update questions set question = 'Which scent or taste do you associate with intimacy? 😏' where question = 'Which scent or taste do you associate with intimacy?';
update questions set question = 'Have you ever had a secret crush on a friend? 🤭' where question = 'Have you ever had a secret crush on a friend?';
update questions set question = 'What’s your favorite way to tease someone and to arouse them 😏' where question = 'What’s your favorite way to tease someone and to arouse them';
update questions set question = 'What does someone do that instantly turns you on? 😏' where question = 'What does someone do that instantly turns you on?';
update questions set question = 'What’s the most erotic moment you’ve ever experienced? 😏' where question = 'What’s the most erotic moment you’ve ever experienced?';
update questions set question = 'What’s the most sensual experience you’ve ever had? 😏' where question = 'What’s the most sensual experience you’ve ever had?';
update questions set question = 'How many virginities have you taken? 😏' where question = 'How many virginities have you taken?';
update questions set question = 'Have you ever pretended to be innocent while secretly thinking something freaky and naughty? If not make something up. 🤭' where question = 'Have you ever pretended to be innocent while secretly thinking something freaky and naughty? If not make something up.';
update questions set question = 'What do you find more attractive: someone’s eyes or their voice… Explain why 😏' where question = 'What do you find more attractive: someone’s eyes or their voice… Explain why';
update questions set question = 'What would you wear right now for a sexy date? 💕' where question = 'What would you wear right now for a sexy date?';
update questions set question = 'How could someone seduce you without touching you? 😏' where question = 'How could someone seduce you without touching you?';
update questions set question = 'What unexpected touch instantly turns you on? 😏' where question = 'What unexpected touch instantly turns you on?';
update questions set question = 'What kind of “normal” touch secretly turns you on? 🤫' where question = 'What kind of “normal” touch secretly turns you on?';
update questions set question = 'What was the most intense moment you’ve ever shared with someone? 😏' where question = 'What was the most intense moment you’ve ever shared with someone?';
update questions set question = 'Do you prefer building things up slowly or diving straight in? 😏' where question = 'Do you prefer building things up slowly or diving straight in?';
update questions set question = 'What’s the most arousing sensual experience you’ve had without it involving sex? 😏' where question = 'What’s the most arousing sensual experience you’ve had without it involving sex?';
update questions set question = 'Do you prefer taking control, or being guided instead? Or different? 😏' where question = 'Do you prefer taking control, or being guided instead? Or different?';
update questions set question = 'Have you ever secretly taken or had intimate photos taken? 🤭' where question = 'Have you ever secretly taken or had intimate photos taken?';
update questions set question = 'What does your perfect dirty talk sound like—soft and subtle, indirect, direct, rough, or more blunt? 😏' where question = 'What does your perfect dirty talk sound like—soft and subtle, indirect, direct, rough, or more blunt?';
update questions set question = 'What’s your favorite position and why does it turn you on the most? 😏' where question = 'What’s your favorite position and why does it turn you on the most?';
update questions set question = 'Where are your boundaries when it comes to new experiences, and what would it take for you to say yes to a challenge? (Bonus: ask all players the same question) 😏' where question = 'Where are your boundaries when it comes to new experiences, and what would it take for you to say yes to a challenge? (Bonus: ask all players the same question)';
update questions set question = 'Have you ever accidentally turned someone on? 🤭' where question = 'Have you ever accidentally turned someone on?';
update questions set question = 'Have you ever had sex with someone you didn’t knew their name? 🤭' where question = 'Have you ever had sex with someone you didn’t knew their name?';
update questions set question = 'What’s the most intense and unforgettable night you’ve ever had? 😏' where question = 'What’s the most intense and unforgettable night you’ve ever had?';
update questions set question = 'What would you do if you were invisible at a openminded (swingers) party? 😏' where question = 'What would you do if you were invisible at a openminded (swingers) party?';
update questions set question = 'Do you prefer being watched, or watching others? 😏' where question = 'Do you prefer being watched, or watching others?';
update questions set question = 'What’s your favorite move to seduce someone? 😏' where question = 'What’s your favorite move to seduce someone?';
update questions set question = 'Have you ever gotten a little carried away and had sex in a public place? 🤭' where question = 'Have you ever gotten a little carried away and had sex in a public place?';
update questions set question = 'What scent instantly turns you on? 😏' where question = 'What scent instantly turns you on?';
update questions set question = 'What’s the most exciting flirting experience you’ve ever had? 😏' where question = 'What’s the most exciting flirting experience you’ve ever had?';
update questions set question = 'Who here would you secretly love to have a crush on? Choose two players 🤫' where question = 'Who here would you secretly love to have a crush on? Choose two players';
update questions set question = 'What would make you consider to make a sextape? 😏' where question = 'What would make you consider to make a sextape?';
update questions set question = 'Do you have a list of bedpartners, do you still know all of them? 😏' where question = 'Do you have a list of bedpartners, do you still know all of them?';
update questions set question = 'Who is a future MILF or DILF? 😏' where question = 'Who is a future MILF or DILF?';
update questions set question = 'Let players guess how many intimate partners you’ve had, you don’t have to answer 😏' where question = 'Let players guess how many intimate partners you’ve had, you don’t have to answer';
update questions set question = 'Having sex on period, yes or no? 😏' where question = 'Having sex on period, yes or no?';
update questions set question = 'For which celebrity would you give your partner a “free pass”? 😏' where question = 'For which celebrity would you give your partner a “free pass”?';
update questions set question = 'For who would you give your partner a “free pass”? 😏' where question = 'For who would you give your partner a “free pass”?';
update questions set question = 'Choice is up to you swingersclub or nudist camping? 😏' where question = 'Choice is up to you swingersclub or nudist camping?';
update questions set question = 'Have you ever done phonesex but with camera on? 🤭' where question = 'Have you ever done phonesex but with camera on? ';
update questions set question = 'Have you ever been to swingersclub or a openminded party? If no what would make you consider, if yes, tell the story 🤭' where question = 'Have you ever been to swingersclub or a openminded party? If no what would make you consider, if yes, tell the story';
update questions set question = 'Have you ever had sex, that others weren’t aware? Tell the story 🤭' where question = 'Have you ever had sex, that others weren’t aware? Tell the story';
update questions set question = 'Your favorite +18 website is open on your laptop, what kind of video (searches) do we see? 😏' where question = 'Your favorite +18 website is open on your laptop, what kind of video (searches) do we see?';
update questions set question = 'How would you describe your flirting style? 😏' where question = 'How would you describe your flirting style?';
update questions set question = 'Your completely alone, the kingdom to yourself, your feeling it, what are you going to do to get it al ready to play with yourself? 😏' where question = 'Your completely alone, the kingdom to yourself, your feeling it, what are you going to do to get it al ready to play with yourself?';
update questions set question = 'Swallow or spit? Ask everybody’s opinion 😏' where question = 'Swallow or spit? Ask everybody’s opinion';
update questions set question = 'Have you ever had sex, with 2 or more of the same sex, at the same time? The rest of the players, ask them as well 🤭' where question = 'Have you ever had sex, with 2 or more of the same sex, at the same time? The rest of the players, ask them as well';
update questions set question = 'Fingering, this with 1, 2, 3 or more fingers? Explain and also ask the group 😏' where question = 'Fingering, this with 1, 2, 3 or more fingers? Explain and also ask the group';
update questions set question = 'You being drunk, does the sex get better or worse? 😏' where question = 'You being drunk, does the sex get better or worse?';
update questions set question = 'Have you have considered only fans? If so, why? And how would you realize it, what content would you make? 😏' where question = 'Have you have considered only fans? If so, why? And how would you realize it, what content would you make?';
update questions set question = 'Sex in a car, have you done it? Would you? 😏' where question = 'Sex in a car, have you done it? Would you?';
update questions set question = 'What is your most exciting one night stand? If you don’t have one, create one 😏' where question = 'What is your most exciting one night stand? If you don’t have one, create one';
update questions set question = 'The first encounter, how did envisioned the *** and was it smaller, bigger or as expected? 😏' where question = 'The first encounter, how did envisioned the *** and was it smaller, bigger or as expected?';
update questions set question = 'Which body part do you find most attractive about each player? 😏' where question = 'Which body part do you find most attractive about each player?';
update questions set question = 'What do you find the most important before having intimacy with someone, name your top 3 😏' where question = 'What do you find the most important before having intimacy with someone, name your top 3';
update questions set question = 'Have you ever faked a period to not have sex or do you think it ever has happend to you? 🤭' where question = 'Have you ever faked a period to not have sex or do you think it ever has happend to you?';
update questions set question = 'What is the best compliment you’ve received (from a sex session) 😏' where question = 'What is the best compliment you’ve received (from a sex session)';
update questions set question = 'For what amount of money would you be willing to pose for the Playboy? 😏' where question = 'For what amount of money would you be willing to pose for the Playboy?';
update questions set question = 'Have you ever taken or had intimate photos of yourself made? Tell the story 🤭' where question = 'Have you ever taken or had intimate photos of yourself made? Tell the story';
update questions set question = 'What makes sex truly memorable for you? 😏' where question = 'What makes sex truly memorable for you?';
update questions set question = 'What’s one experience you’d love to relive exactly the same way again? 💕' where question = 'What’s one experience you’d love to relive exactly the same way again?';
update questions set question = 'What’s the most arousing word someone has ever said to you? 😏' where question = 'What’s the most arousing word someone has ever said to you?';
update questions set question = 'What’s your top 3 erotic area’s that arouse you 100% 😏' where question = 'What’s your top 3 erotic area’s that arouse you 100%';
update questions set question = 'What’s your best pickup line? 😏' where question = 'What’s your best pickup line?';
update questions set question = 'What’s your top 3 favorite sex-positions and why? 😏' where question = 'What’s your top 3 favorite sex-positions and why?';
update questions set question = 'What was your last sexting conversation? 😏' where question = 'What was your last sexting conversation? ';
update questions set question = 'Guess the color pubic hair of all players 😏' where question = 'Guess the color pubic hair of all players';
update questions set question = 'You have 20 seconds to come up with as many different alternative words for the word Penis 😏' where question = 'You have 20 seconds to come up with as many different alternative words for the word Penis';
update questions set question = 'If you would be a prostitué, prove your the star of the street. How would you seduce people? 😏' where question = 'If you would be a prostitué, prove your the star of the street. How would you seduce people?';
update questions set question = 'What are your favorite erezones, name three 😏' where question = 'What are your favorite erezones, name three';
update questions set question = 'Tell two horny stories, one should be real and one should be fake, let the players guess 😏' where question = 'Tell two horny stories, one should be real and one should be fake, let the players guess';
update questions set question = 'Do you usually sleep dressed, or do you prefer feeling a little more… free? 😏' where question = 'Do you usually sleep dressed, or do you prefer feeling a little more… free?';
update questions set question = 'What’s the first thing that catches your eye about someone… and what makes it a little irresistible? 😏' where question = 'What’s the first thing that catches your eye about someone… and what makes it a little irresistible?';
update questions set question = 'Have you ever had an erotic dream about a celebrity? 🤭' where question = 'Have you ever had an erotic dream about a celebrity?';
update questions set question = 'What’s your favorite moment that started playful… but turned undeniably sensual? 😏' where question = 'What’s your favorite moment that started playful… but turned undeniably sensual?';
update questions set question = 'Give every player a one-word compliment about their outfit tonight, make it flirty. 😏' where question = 'Give every player a one-word compliment about their outfit tonight, make it flirty.';
update questions set question = 'Hold [partner]''s hand and describe what you noticed first about them when they walked in. 😈' where question = 'Hold [partner]''s hand and describe what you noticed first about them when they walked in.';
update questions set question = 'Swap seats so that you sit next to the player you know the least. 😈' where question = 'Swap seats so that you sit next to the player you know the least.';
update questions set question = 'Give [partner] a slow, gentle hand massage while keeping eye contact. 😏' where question = 'Give [partner] a slow, gentle hand massage while keeping eye contact.';
update questions set question = 'Feed [partner] something from the table in the most seductive way possible. 😏' where question = 'Feed [partner] something from the table in the most seductive way possible.';
update questions set question = 'Show your sexiest walk across the room, the players rate you 1-10. 😈' where question = 'Show your sexiest walk across the room, the players rate you 1-10.';
update questions set question = 'Let the voting begin. The player with the most votes gets to slide their vingers over your ***. 60 seconds 😈' where question = 'Let the voting begin. The player with the most votes gets to slide their vingers over your ***. 60 seconds';
update questions set question = 'Play with yourself and let them watch, dim the lights, make it mysterious, just a little bit light. 😈' where question = 'Play with yourself and let them watch, dim the lights, make it mysterious, just a little bit light.';
update questions set question = 'Who in this room do you want to spend the next ten minutes with? Say it out loud. 😏' where question = 'Who in this room do you want to spend the next ten minutes with? Say it out loud.';
update questions set question = 'What do you want right now, honestly, and from whom? 😏' where question = 'What do you want right now, honestly, and from whom?';
update questions set question = 'Ask your partner: what are you allowed to do tonight that you didn''t dare to ask before? 😏' where question = 'Ask your partner: what are you allowed to do tonight that you didn''t dare to ask before?';
update questions set question = 'Which player has turned you on the most tonight, and with what? 😏' where question = 'Which player has turned you on the most tonight, and with what?';
update questions set question = 'Do you want to keep playing, or move on to the real action? Ask everyone, majority decides. 😏' where question = 'Do you want to keep playing, or move on to the real action? Ask everyone, majority decides.';
update questions set question = 'What is your safeword tonight? Everyone shares theirs. 😏' where question = 'What is your safeword tonight? Everyone shares theirs.';
update questions set question = 'Who would you choose to watch you, and who to join you? 😏' where question = 'Who would you choose to watch you, and who to join you?';
update questions set question = 'What is one thing that''s off-limits tonight, so everyone knows? 😏' where question = 'What is one thing that''s off-limits tonight, so everyone knows?';
update questions set question = 'Pick the couple or player you''d like to retreat with, and tell them why. 😏' where question = 'Pick the couple or player you''d like to retreat with, and tell them why.';
update questions set question = 'What turns you on more right now: being in control or being taken over? 😏' where question = 'What turns you on more right now: being in control or being taken over?';
update questions set question = 'Which combination of players here would be your perfect scene? 😏' where question = 'Which combination of players here would be your perfect scene?';
update questions set question = 'What would you like the group to do to you for the next round? 😏' where question = 'What would you like the group to do to you for the next round?';
update questions set question = 'Ask every player: yes, maybe or no to going further tonight? Respect every answer. 😏' where question = 'Ask every player: yes, maybe or no to going further tonight? Respect every answer.';
update questions set question = 'Choose a player or couple and take the lead, ask first, then do what you both want. 😈' where question = 'Choose a player or couple and take the lead, ask first, then do what you both want.';
update questions set question = 'Let [partner] decide what you do to them for the next two minutes. 😈' where question = 'Let [partner] decide what you do to them for the next two minutes.';
update questions set question = 'The group votes for two players who end the game together while everyone watches. 😈' where question = 'The group votes for two players who end the game together while everyone watches.';
update questions set question = 'Choose another player together with [partner] and spoil them, they say what they like. 😈' where question = 'Choose another player together with [partner] and spoil them, they say what they like.';
update questions set question = 'Retreat with [partner] to another room. Come back when you''re ready, the game waits. 😈' where question = 'Retreat with [partner] to another room. Come back when you''re ready, the game waits.';
commit;
