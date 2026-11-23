-- Caviar de la Nuit: 3 feesten (kasteel bij Hasselt, Hasselt, kapel bij Antwerpen).
insert into public.events (title, starts_at, venue, city, country, region, category, url, lat, lng, source)
select * from (values
('Soirée d''Or · The X-mas Edition', '2026-12-19 20:00:00+01'::timestamptz, 'Caviar de la Nuit', 'Near Hasselt (castle)', 'BE', 'Limburg (BE)', 'Party', 'https://www.caviardelanuit.com/events/soireedor191226', 50.93::float8, 5.34::float8, 'bron'),
('Fascination', '2027-01-23 20:00:00+01', 'Caviar de la Nuit', 'Hasselt', 'BE', 'Limburg (BE)', 'Party', 'https://www.caviardelanuit.com/events/fascination', 50.93, 5.34, 'bron'),
('Save the Date', '2027-04-17 20:00:00+02', 'Caviar de la Nuit', 'Near Antwerp (chapel)', 'BE', 'Antwerpen', 'Party', 'https://www.caviardelanuit.com/events/save-the-date-2', 51.22, 4.40, 'bron')
) v(title, starts_at, venue, city, country, region, category, url, lat, lng, source)
where not exists (select 1 from public.events e where e.url = v.url);
select count(*) from public.events where source='bron';
