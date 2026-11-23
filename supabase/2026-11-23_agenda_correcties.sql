-- Correcties eigenaar 23 nov: Pleasure2gether in Sittard, Acanthus in Harelbeke (Hulste), Kasteel Waterloo gesloten (op inactief).
begin;
update public.places set city='Sittard', lat=51.01, lng=5.86 where source='bron' and name='Pleasure2gether';
update public.events set city='Sittard', lat=51.01, lng=5.86 where source='bron' and venue='Pleasure2gether';
update public.places set city='Harelbeke (Hulste)', region='West-Vlaanderen', lat=50.89, lng=3.29 where source='bron' and name='Acanthus';
update public.places set active=false where source='bron' and name='Kasteel Waterloo';
commit;
select name, city, region, lat, lng, active from public.places where name in ('Pleasure2gether','Acanthus','Kasteel Waterloo');
