-- Vragencheck 3 thema's (23 nov 2026). Akkoord eigenaar. Draaien in Supabase SQL editor.
begin;
create table if not exists public.questions_backup_20261123 as select * from public.questions;

-- 1. Zwakke, dubbele en Nederlandse kaarten in Friends/Lovers weg (vervangen hieronder)
delete from public.questions where id in ('97558e29-1069-48cd-97bc-82fb2fa6b1f7','1b222a56-8c55-4364-9ee3-8e31e81dbe51','55e50c95-53e3-41ac-88f7-d14fbf4342a9','12c0b948-3f63-476c-8671-55c021eba2fc','c0955acb-a2d7-4d55-9a62-996b2b70edce','683b04a8-a8f0-4fc1-bb7d-a3b007dc4e09','1e3a210e-1860-4889-9be0-1c617a0c387e','be81f22f-161a-4998-a15d-f1f237ce4bfa','5cf139c2-0d91-42d8-9146-f87fafade403','c659a7f8-9aad-4fdc-9a28-0fd004a557bc','c0140072-dd7c-44fe-95c4-b7d869f0ecc4','6fa7a925-7cfe-4f7e-b382-0e35e219f997','297cc75f-b375-44ef-878f-3c57becbd5a7','ad1e6462-7f1c-4b1f-90d1-66a1e92c2a5a','4d47c4e3-e355-4917-b10b-e7ceb5c07c85','04e76285-79ce-4880-8b5c-9907a93d9471','3af5dad3-0ca6-41a5-bef2-998be9f6e62f','092a626f-6517-463b-ba47-f84c8b162446','43bdce5d-4af8-4a96-a702-aae0ec27a925','e859caf2-d89f-4f6b-9fa3-c7a6510776a9','ac5d2093-d6a6-4abe-b867-b98a0ba2175d','3f93b2cf-79ee-4119-a407-61ced957aa38','72abc40c-256c-41c2-a74a-cc8ca0a104f4','8a89a2fa-e545-4a7e-9718-892ad0ca3214','7cf320a2-3172-4c73-b929-d3cebcddfa0c');

-- 2. Typfouten en verkeerd type in 🍍
update public.questions set question = replace(question, '[partner[', '[partner]') where theme = '🍍' and question like '%[partner[%';
update public.questions set question = replace(question, 'vingers', 'fingers') where theme = '🍍' and question like '%vingers%';
update public.questions set question = replace(question, 'take of your', 'take off your') where theme = '🍍' and question like '%take of your%';
update public.questions set question = replace(question, 'Turn of the light', 'Turn off the light') where theme = '🍍' and question like '%Turn of the light%';
update public.questions set question = replace(question, 'guess your lucky', 'guess you''re lucky') where theme = '🍍' and question like '%guess your lucky%';
update public.questions set question = replace(question, 'erezones', 'erogenous zones') where theme = '🍍' and question like '%erezones%';
update public.questions set question = replace(question, 'area’s', 'areas') where theme = '🍍' and question like '%area’s%';
update public.questions set question = replace(question, 'Put a ice cube', 'Put an ice cube') where theme = '🍍' and question like '%Put a ice cube%';
update public.questions set question = replace(question, 'taken part of', 'taken part in') where theme = '🍍' and question like '%taken part of%';
update public.questions set type = 'truth' where theme = '🍍' and type = 'dare' and (question like 'Oral: hands-free%' or question like 'Which part of your body would you most like to be kissed%');
update public.questions set type = 'dare' where theme = '🍍' and type = 'truth' and (question like 'If you have a piercing/tattoo%' or question like 'What can the players do to really arouse you%');

-- 3. Nieuwe kaarten (101)
insert into public.questions (theme, level, type, question, requirespartner, voor_speler, voor_partner) values
('friends', 'Sweet', 'truth', 'Who in this room would you most likely date if you were single? 😏', false, 'any', 'any'),
('friends', 'Sweet', 'truth', 'What''s the cheekiest text you''ve ever sent? 📱', false, 'any', 'any'),
('friends', 'Sweet', 'truth', 'Have you ever had a crush on a friend''s partner? 🤫', false, 'any', 'any'),
('friends', 'Sweet', 'truth', 'What''s the weirdest place you''ve ever kissed someone? 💋', false, 'any', 'any'),
('friends', 'Sweet', 'truth', 'Which player here has the best smile? Be honest 😏', false, 'any', 'any'),
('friends', 'Sweet', 'truth', 'What''s your favorite way to tease someone and turn them on? 😈', false, 'any', 'any'),
('friends', 'Sweet', 'dare', 'Let the group read your last 3 search results out loud 🫣', false, 'any', 'any'),
('friends', 'Sweet', 'dare', 'Send a 😏 to the 5th person in your chats, no explanation 📱', false, 'any', 'any'),
('friends', 'Sweet', 'dare', 'Sit on [partner]''s lap until your next turn 😈', true, 'any', 'any'),
('friends', 'Sweet', 'dare', 'Let [partner] draw a tiny heart anywhere on your body with a pen 🖊️', true, 'any', 'any'),
('friends', 'Sweet', 'dare', 'Use your best pick-up line on [partner] 😏', true, 'any', 'any'),
('friends', 'Sweet', 'dare', 'Point at the player you''d most likely kiss tonight. They decide: cheek or lips 💋', false, 'any', 'any'),
('friends', 'Sexy', 'truth', 'Who here would you trust to give you a massage? Why them? 🥵', false, 'any', 'any'),
('friends', 'Sexy', 'truth', 'What''s the best kiss you''ve ever had, and who was it with? 💋', false, 'any', 'any'),
('friends', 'Sexy', 'truth', 'Have you ever hooked up with someone you just met that night? 😈', false, 'any', 'any'),
('friends', 'Sexy', 'truth', 'What''s the most daring outfit you''ve ever worn on a night out? 🔥', false, 'any', 'any'),
('friends', 'Sexy', 'truth', 'Which player do you think is the best kisser? 💋', false, 'any', 'any'),
('friends', 'Sexy', 'dare', 'Kiss [partner] on the neck, as slowly as possible 💋', true, 'any', 'any'),
('friends', 'Sexy', 'dare', 'Take a body shot from [partner]''s neck or wrist 🥃', true, 'any', 'any'),
('friends', 'Sexy', 'dare', 'Swap one piece of clothing with [partner] for the rest of the round 👕', true, 'any', 'any'),
('friends', 'Sexy', 'dare', 'Let the group pick one piece of clothing for you to take off 🔥', false, 'any', 'any'),
('friends', 'Sexy', 'dare', 'Whisper something flirty in [partner]''s ear; they decide if it gets said out loud 🤫', true, 'any', 'any'),
('friends', 'Sexy', 'dare', 'Give any player a dare. If they refuse, they take off a piece of clothing 😏', false, 'any', 'any'),
('friends', 'Spicy', 'truth', 'Have you ever had a sexy dream about someone in this room? 😈', false, 'any', 'any'),
('friends', 'Spicy', 'truth', 'What''s the most public place you''ve ever hooked up? 🫣', false, 'any', 'any'),
('friends', 'Spicy', 'truth', 'Rate your own skills in bed from 1 to 10. The group may disagree 😏', false, 'any', 'any'),
('friends', 'Spicy', 'truth', 'What''s something in bed you''ve always wanted to try but never dared to ask? 🤫', false, 'any', 'any'),
('friends', 'Spicy', 'truth', 'Have you ever gone down on someone in an unusual place? Where? 😈', false, 'any', 'any'),
('friends', 'Spicy', 'dare', 'Kiss [partner] for 5 seconds… lips or neck, they choose 💋', true, 'any', 'any'),
('friends', 'Spicy', 'dare', 'Give [partner] a 30-second lap dance in your underwear 💃', true, 'any', 'any'),
('friends', 'Spicy', 'dare', 'Take off two pieces of clothing, or show the group your last flirty text 🔥', false, 'any', 'any'),
('friends', 'Spicy', 'dare', 'Let [partner] remove one piece of your clothing with their teeth 😈', true, 'any', 'any'),
('friends', 'Spicy', 'dare', 'Let [partner] touch you anywhere over your clothes for 20 seconds 🥵', true, 'any', 'any'),
('friends', 'Spicy', 'dare', 'Pick two players who must kiss for 10 seconds. Neck or lips, the group decides 💋', false, 'any', 'any'),
('friends', 'WetnWild', 'truth', 'Who in this room would you hook up with tonight if there were no consequences? 😈', false, 'any', 'any'),
('friends', 'WetnWild', 'truth', 'What''s the kinkiest thing you''ve ever done? 🔥', false, 'any', 'any'),
('friends', 'WetnWild', 'truth', 'Describe your last time in bed in three words 😏', false, 'any', 'any'),
('friends', 'WetnWild', 'truth', 'Have you ever had a threesome, or would you? 🦄', false, 'any', 'any'),
('friends', 'WetnWild', 'truth', 'What''s your favorite position, and why? 😈', false, 'any', 'any'),
('friends', 'WetnWild', 'truth', 'Point at the player you''d most like to see naked, and tell them why 😏', false, 'any', 'any'),
('friends', 'WetnWild', 'dare', 'Make out with [partner] for 20 seconds, hands allowed over clothes 💋', true, 'any', 'any'),
('friends', 'WetnWild', 'dare', 'Play the rest of this round in your underwear 🔥', false, 'any', 'any'),
('friends', 'WetnWild', 'dare', 'Let [partner] kiss you anywhere they like, except your lips 😈', true, 'any', 'any'),
('friends', 'WetnWild', 'dare', 'Lie down while [partner] takes a body shot off your belly 🥃', true, 'any', 'any'),
('friends', 'WetnWild', 'dare', 'Pick two players who have to kiss for 5 seconds while the group counts down 💋', false, 'any', 'any'),
('friends', 'WetnWild', 'dare', 'You''re the boss: give two players a dare they must do to each other 👑', false, 'any', 'any'),
('lovers', 'Sweet', 'truth', 'What was the first thing you noticed about your partner? 💕', false, 'any', 'any'),
('lovers', 'Sweet', 'truth', 'When did you first know you were into your partner? 💕', false, 'any', 'any'),
('lovers', 'Sweet', 'truth', 'Which outfit of your partner drives you crazy? 😏', false, 'any', 'any'),
('lovers', 'Sweet', 'truth', 'What''s the sexiest little thing your partner does without realizing it? 😏', false, 'any', 'any'),
('lovers', 'Sweet', 'truth', 'Where do you secretly love being kissed by your partner? 💋', false, 'any', 'any'),
('lovers', 'Sweet', 'dare', 'Kiss [partner] somewhere you''ve never kissed them before 💋', true, 'any', 'any'),
('lovers', 'Sweet', 'dare', 'Tell [partner] three things you love about their body, with eye contact 😏', true, 'any', 'any'),
('lovers', 'Sweet', 'dare', 'Slow dance with [partner] and whisper what you want later tonight 💃', true, 'any', 'any'),
('lovers', 'Sweet', 'dare', 'Feed [partner] something sweet, without using your hands 🍓', true, 'any', 'any'),
('lovers', 'Sweet', 'dare', 'Kiss [partner]''s neck for 10 seconds 💋', true, 'any', 'any'),
('lovers', 'Sexy', 'truth', 'What''s the hottest night you two have ever had together? 🔥', false, 'any', 'any'),
('lovers', 'Sexy', 'truth', 'Which fantasy have you never dared to tell your partner? 🤫', false, 'any', 'any'),
('lovers', 'Sexy', 'truth', 'What does your partner do in bed that makes you lose it? 🥵', false, 'any', 'any'),
('lovers', 'Sexy', 'truth', 'Long foreplay or straight to the action, and why? 😏', false, 'any', 'any'),
('lovers', 'Sexy', 'truth', 'Have you ever had erotic photos taken of yourself? Would you, for your partner? 📸', false, 'any', 'any'),
('lovers', 'Sexy', 'truth', 'What''s the riskiest place you''d want to have sex together? 😈', false, 'any', 'any'),
('lovers', 'Sexy', 'dare', 'Whisper something seductive to [partner] 🤫', true, 'any', 'any'),
('lovers', 'Sexy', 'dare', 'Slowly take off one piece of [partner]''s clothing 🔥', true, 'any', 'any'),
('lovers', 'Sexy', 'dare', 'Blindfold [partner] and kiss three spots; they guess where you''ll go next 🫣', true, 'any', 'any'),
('lovers', 'Sexy', 'dare', 'Give [partner] a sensual back massage, top off 🥵', true, 'any', 'any'),
('lovers', 'Sexy', 'dare', 'Sit on [partner]''s lap and kiss them for 30 seconds, no hands 💋', true, 'any', 'any'),
('lovers', 'Spicy', 'truth', 'What''s your dirty-talk style: whispering or direct? Give an example 😏', false, 'any', 'any'),
('lovers', 'Spicy', 'truth', 'What''s the most sensual moment you''ve had without sex? 😏', false, 'any', 'any'),
('lovers', 'Spicy', 'truth', 'Which fantasy have you made come true, and which one is next? 😈', false, 'any', 'any'),
('lovers', 'Spicy', 'truth', 'What''s one thing you want your partner to do more often in bed? 🥵', false, 'any', 'any'),
('lovers', 'Spicy', 'truth', 'What''s your favorite thing to do to your partner, and why? 😈', false, 'any', 'any'),
('lovers', 'Spicy', 'dare', 'Kiss [partner] from their neck down to their belly button 💋', true, 'any', 'any'),
('lovers', 'Spicy', 'dare', 'Undress [partner] down to their underwear, using only your mouth 😈', true, 'any', 'any'),
('lovers', 'Spicy', 'dare', 'Let [partner] tie your hands for the next 2 rounds 🎀', true, 'any', 'any'),
('lovers', 'Spicy', 'dare', 'Use an ice cube on [partner]''s body for 30 seconds, you choose where 🧊', true, 'any', 'any'),
('lovers', 'WetnWild', 'truth', 'Surrender or control: what do you prefer with your partner? Explain 😏', false, 'any', 'any'),
('lovers', 'WetnWild', 'truth', 'Describe in detail how you want to be touched tonight 🥵', false, 'any', 'any'),
('lovers', 'WetnWild', 'truth', 'Which position do you want to try with your partner that you haven''t yet? 😈', false, 'any', 'any'),
('lovers', 'WetnWild', 'truth', 'What''s the dirtiest thing you''ve ever thought about your partner in public? 🫣', false, 'any', 'any'),
('lovers', 'WetnWild', 'truth', 'Toys: yes, no, or which one is next on your wishlist? 🎁', false, 'any', 'any'),
('lovers', 'WetnWild', 'dare', 'Strip completely for [partner]; they pick the music 🔥', true, 'any', 'any'),
('lovers', 'WetnWild', 'dare', 'Play with yourself for 30 seconds while [partner] watches, no touching allowed 🥵', true, 'any', 'any'),
('lovers', 'WetnWild', 'dare', 'Pleasure [partner] with your hands for 60 seconds (handjob/fingers) 💦', true, 'any', 'any'),
('lovers', 'WetnWild', 'dare', 'Let [partner] use a toy on you for 60 seconds. No toy? Hands only 🎁', true, 'any', 'any'),
('lovers', 'WetnWild', 'dare', 'Go down on [partner] for 30 seconds… then they decide what happens next 😈', true, 'any', 'any'),
('🍍', 'Sweet', 'truth', 'Ask any player one question. They answer honestly or take a shot 🤫', false, 'any', 'any'),
('🍍', 'Sweet', 'dare', 'Point at the player you think is the best kisser. They prove it on someone of their choice 💋', false, 'any', 'any'),
('🍍', 'Sweet', 'dare', 'Give any player a dare. If they refuse, you both take a shot 🥃', false, 'any', 'any'),
('🍍', 'Sweet', 'dare', 'Choose two players who must swap one piece of clothing 👕', false, 'any', 'any'),
('🍍', 'Sexy', 'dare', 'Choose a player and tell them exactly where to kiss you. 10 seconds 💋', false, 'any', 'any'),
('🍍', 'Sexy', 'dare', 'Point at two players: one gives the other a 30-second lap dance. You pick who 💃', false, 'any', 'any'),
('🍍', 'Sexy', 'dare', 'Pick a player who must remove a piece of clothing from someone else, with their teeth 😈', false, 'any', 'any'),
('🍍', 'Sexy', 'dare', 'Make up a dare for the player on your left. Too shy? They pick one for you instead 😏', false, 'any', 'any'),
('🍍', 'Spicy', 'dare', 'You''re the boss for one round: give every player a dare. Refuse? Take off a piece of clothing 👑', false, 'any', 'any'),
('🍍', 'Spicy', 'dare', 'Point at the couple or two players you''d like to see make out for 20 seconds 🔥', false, 'any', 'any'),
('🍍', 'Spicy', 'dare', 'Choose a player to blindfold you; they pick who gets to touch you for 30 seconds 🫣', false, 'any', 'any'),
('🍍', 'WetnWild', 'truth', 'Point at the player you''d most like to watch in action tonight, and tell them why 😏', false, 'any', 'any'),
('🍍', 'WetnWild', 'dare', 'Choose two players and tell them what to do to each other for 60 seconds 😈', false, 'any', 'any'),
('🍍', 'WetnWild', 'dare', 'Point at a player: they decide what you do to them for 60 seconds 💦', false, 'any', 'any'),
('🍍', 'WetnWild', 'dare', 'Pick a player who goes topless and a second player who gets to kiss their chest 🍒', false, 'any', 'any');

commit;
