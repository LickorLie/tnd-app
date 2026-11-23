-- 10 vragen van de week, elke donderdag 18:00 (Amsterdam) vanaf 26 nov 2026.
-- De app toont alleen polls waarvan starts_at al bereikt is (nieuwste eerst).
-- Uitvoeren in Supabase > SQL Editor, NA het mergen van de PR.
insert into public.polls (question, options, starts_at, active) values
('Which is hotter: being kissed on the neck or the inner thigh?', '["Neck 💋", "Inner thigh 🥵", "Both, please 😈"]', '2026-11-26 17:00:00+00', true),
('Lights on or lights off?', '["On 💡", "Off 🌙", "Candles only 🕯️"]', '2026-12-03 17:00:00+00', true),
('Morning sex or late-night sex?', '["Morning ☀️", "Late night 🌙", "Whenever, wherever 😈"]', '2026-12-10 17:00:00+00', true),
('What turns you on most?', '["A voice 🎙️", "A look 👀", "A touch 🤲", "A smell 🌹"]', '2026-12-17 17:00:00+00', true),
('Would you ever play Lick or Lie with your ex in the room?', '["Never 🙅", "Only on Sweet 🍒", "Bring it on 😈"]', '2026-12-24 17:00:00+00', true),
('Dirty talk: yes or no?', '["Yes, the dirtier the better 🔥", "A little whisper 🤫", "Not my thing 🙈"]', '2026-12-31 17:00:00+00', true),
('Best place for a first kiss?', '["On the dance floor 💃", "In the rain 🌧️", "In the back of a taxi 🚕", "At home on the couch 🛋️"]', '2027-01-07 17:00:00+00', true),
('Which dare would you skip first?', '["Lap dance 💃", "Body shot 🥃", "Strip a piece 👙", "None, I''m fearless 😈"]', '2027-01-14 17:00:00+00', true),
('Toys in the bedroom?', '["Already a collection 🎁", "Curious 🤭", "No thanks 🙅"]', '2027-01-21 17:00:00+00', true),
('What''s sexier: confidence or mystery?', '["Confidence 😎", "Mystery 🖤", "A bit of both 😏"]', '2027-01-28 17:00:00+00', true);
