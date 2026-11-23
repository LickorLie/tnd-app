# Genereert supabase/2026-11-23_agenda_bronnen.sql
P=[ # name, city, country, region, category, url, lat, lng, desc
("Club Le Baron","Heerewaarden","NL","Gelderland","Club","https://www.clublebaron.nl/agenda/",51.82,5.39,"Couples club open every day, themed days and evenings."),
("Ultimate Dream","Beek en Donk","NL","Noord-Brabant","Club","https://www.ultimate-dream.nl/agenda-ud/",51.53,5.63,"Swingers and BDSM club between Eindhoven and Helmond, with restaurant and whirlpools."),
("Fata Morgana","Muiden","NL","Noord-Holland","Club","https://www.fata-morgana.nl/",52.33,5.07,"Converted farmhouse on three floors with restaurant, sauna and whirlpool. No single men."),
("Fun4Two","Moordrecht","NL","Zuid-Holland","Club","https://www.fun4two.nl/programma/index.html",51.99,4.67,"All-inclusive luxury club with restaurant, wellness and themed nights."),
("Club Organza","Breukelen","NL","Utrecht","Club","https://www.cluborganza.nl/",52.17,5.00,"Dance-oriented club with a party atmosphere."),
("Club Showboat","Zaandijk","NL","Noord-Holland","Club","https://www.showboat.eu/events",52.47,4.81,"Swingers club on a boat, all-in food and drinks, themed evenings."),
("Sauna Javali","Heerhugowaard","NL","Noord-Holland","Sauna","https://www.saunajavali.nl/events/categorie/aankomende/",52.67,4.83,"Wellness with saunas, hammam, lounges, bar and garden."),
("Club Paradise","Amsterdam","NL","Noord-Holland","Club","https://club-paradise.nl/events/",52.39,4.89,"Amsterdam club with sauna, steam bath, dance floor and play areas."),
("Sameplace","Amsterdam","NL","Noord-Holland","Bar","https://sameplace.nl/agenda/",52.37,4.87,"Erotic café since 1997 with bar, dance floor and basement play rooms."),
("Eroroma","Zwinderen","NL","Drenthe","Club","https://eroroma.nl/pages/nl/de-parenclub.php",52.70,6.68,"Couples club with Roman bath theme and jacuzzis."),
("Pleasure2gether","Sittard","NL","Limburg","Club","https://www.pleasure2gether.nl/kalender.php",51.01,5.86,"Couples and singles club with bar, relax rooms and weekend buffet."),
("Stiletto-Club","Tilburg","NL","Noord-Brabant","Party","https://www.stiletto-club.nl/",51.56,5.09,"Themed party nights at DHG Tilburg."),
("Kinky On The Beach","Culemborg","NL","Gelderland","Party","https://www.kinkyonthebeach.eu/site/",51.95,5.23,"Kinky parties with strict leather, latex and rubber dress code."),
("Crazyland","Zaandam","NL","Noord-Holland","Party","https://crazyland.org/agenda/",52.44,4.83,"Sexy parties and the Crazy Wonderland festival."),
("Wasteland","Amsterdam","NL","Noord-Holland","Party","https://www.wasteland.nl/",52.39,4.85,"International fetish and fantasy party with art, fashion and music."),
("Madame Homard","Secret locations","NL",None,"Party","https://madamehomard.nl/evenementen/",None,None,"Sensual dance parties at secret locations across Europe."),
("Be Privileged","Secret location","NL","Noord-Holland","Party","https://www.beprivileged.nl/events/",None,None,"Members community with themed events at secret locations."),
("Big Little Secrets","Amsterdam","NL","Noord-Holland","Party","https://biglittle-secrets.nl/events/",52.37,4.90,"Intimate adults-only get-togethers at special locations."),
("Caviar de la Nuit","Secret locations","BE",None,"Party","https://www.caviardelanuit.com/events",None,None,"Application-only community for couples, events at historic venues."),
("Club Luxoria","Wagenborgen","NL","Groningen","Club",None,53.25,6.94,"Welcoming club, used to German-speaking guests."),
("Club Monique","Wieringerwerf","NL","Noord-Holland","Club",None,52.85,5.03,"Locally oriented social club."),
("Club Mystique","Rucphen","NL","Noord-Brabant","Club",None,51.53,4.56,"Social club with a regional focus."),
("Club Eroxx","Balen","BE","Antwerpen","Club","https://eroxx.be/pages/events",51.17,5.17,"Club for couples and adults with themed parties."),
("Club Amai","Meer","BE","Antwerpen","Club","https://www.clubamai.be/agenda",51.45,4.74,"Club for couples and single women meeting single men."),
("Bornedries","Sint-Truiden","BE","Limburg (BE)","Club","https://www.bornedries.be/upcoming-events/",50.82,5.19,"Large couples club with 22 themed rooms, wellness and disco."),
("Euphoria","Dendermonde","BE","Oost-Vlaanderen","Sauna","https://www.erosauna-euphoria.be/",51.03,4.10,"Private wellness on the Schelde with sauna, hammam, pool and jacuzzi. 21+."),
("Acanthus","Harelbeke (Hulste)","BE","West-Vlaanderen","Club","https://www.acanthus.be/",50.89,3.29,"Private erotic club with dance evenings for singles and couples."),
("Fetish Club 78","Belgium","BE",None,"Club","https://fetishclub78.be/calendar/",None,None,"Volunteer-run BDSM association with play evenings."),
]
V={p[0]:p for p in P}
E_=[ # venue, title, start local
("Club Le Baron","Date4Fun","2026-11-24 11:00","https://www.clublebaron.nl/agenda/"),
("Pleasure2gether","Massage evening","2026-11-25 19:00","https://www.pleasure2gether.nl/kalender.php"),
("Pleasure2gether","Sinterklaas party","2026-11-27 20:00","https://www.pleasure2gether.nl/kalender.php"),
("Pleasure2gether","Sinterklaas party","2026-11-28 20:00","https://www.pleasure2gether.nl/kalender.php"),
("Be Privileged","Unbound","2026-12-12 21:00","https://www.beprivileged.nl/events/unbound/"),
("Kinky On The Beach","Pakjesavond","2026-12-05 20:00","https://www.kinkyonthebeach.eu/site/events/kinky-on-the-beach-pakjesavond-2026/"),
("Kinky On The Beach","To the Maxxx","2027-03-13 20:00","https://www.kinkyonthebeach.eu/site/events/13032027-tothemaxx/"),
("Madame Homard","Eyes Wide Shut · Royal Edition","2026-11-28 21:00","https://madamehomard.nl/event/ews_royal/"),
("Madame Homard","Eyes Wide Shut · Guilty Pleasures","2027-03-20 21:00","https://madamehomard.nl/event/eyes-wide-shut-guilty-pleasures/"),
("Wasteland","Wasteland Amsterdam","2026-11-28 22:00","https://www.wasteland.nl/wasteland-amsterdam/"),
("Wasteland","Summerfest","2027-07-03 14:00","https://www.wasteland.nl/wasteland-summerfest/"),
("Fata Morgana","Friday Pleasure Night","2026-11-27 21:00","https://www.fata-morgana.nl/"),
("Fata Morgana","Hot Erotic Mega Party","2026-11-28 21:00","https://www.fata-morgana.nl/"),
("Fun4Two","S(E)xpert Night","2026-11-27 21:00","https://www.fun4two.nl/programma/index.html"),
("Fun4Two","Weekend night","2026-11-28 21:00","https://www.fun4two.nl/programma/index.html"),
("Fun4Two","Dragtastic Night","2026-11-29 16:00","https://www.fun4two.nl/fun4two-dragtasticnight_26.html"),
("Fun4Two","Ladies Night Closing","2026-12-03 20:00","https://www.fun4two.nl/programma/index.html#ladies"),
("Fun4Two","Hardcore Night","2026-12-04 21:00","https://www.fun4two.nl/fun4two-hardcore-night-26/fun4two-hardcore-night-index.html"),
("Fun4Two","31st Anniversary · One Night Only","2026-12-12 21:00","https://www.fun4two.nl/fun4two-31-anniversary_26.html"),
("Fun4Two","Christmas Party","2026-12-26 18:00","https://www.fun4two.nl/fun4two-christmas-party_26.html"),
("Fun4Two","NYE Glitter Ball","2026-12-31 21:00","https://www.fun4two.nl/fun4two-glitterball_26.html"),
("Sauna Javali","Mixed evening","2026-11-27 17:00","https://www.saunajavali.nl/event/vrijdag-27-november-2026-gemengde-avond/"),
("Sauna Javali","Mixed day","2026-11-28 12:00","https://www.saunajavali.nl/event/zaterdag-28-november-2026-gemengde-dag/"),
("Sauna Javali","The Lingerie Unwrap Party","2026-12-04 17:00","https://www.saunajavali.nl/event/vrijdag-4-december-2026-the-lingerie-unwrap-party-sauna-javali/"),
("Sauna Javali","Saturday","2026-12-05 12:00","https://www.saunajavali.nl/event/zaterdag-05-december-2026/"),
("Club Paradise","After Three","2026-11-27 21:00","https://club-paradise.nl/events/after-three-12/"),
("Club Paradise","Neon Legends","2026-11-28 21:00","https://club-paradise.nl/events/neon-legends/"),
("Club Paradise","Ibiza Feel the Vibe","2026-11-29 15:00","https://club-paradise.nl/events/ibiza-feel-the-vibe/"),
("Club Paradise","After Three","2026-12-04 21:00","https://club-paradise.nl/events/after-three-13/"),
("Club Paradise","Couples Paradise · Stoute Klaas","2026-12-05 21:00","https://club-paradise.nl/events/couples-paradise-stoute-klaas-2/"),
("Club Paradise","Afterglow in Paradise","2026-12-06 15:00","https://club-paradise.nl/events/afterglow-in-paradise-9/"),
("Club Paradise","After Three · Christmas Vibes","2026-12-11 21:00","https://club-paradise.nl/events/after-three-christmas-vibes/"),
("Club Paradise","Couples Paradise · Celebrations","2026-12-12 21:00","https://club-paradise.nl/events/couples-paradise-celebrations/"),
("Club Paradise","Afterglow · Christmas Glow","2026-12-13 15:00","https://club-paradise.nl/events/afterglow-christmas-glow/"),
("Club Paradise","After Three · Gold Edition","2026-12-18 21:00","https://club-paradise.nl/events/after-three-gold-edition/"),
("Club Paradise","Couples Paradise · Gold Edition","2026-12-19 21:00","https://club-paradise.nl/events/couples-paradise-gold-edition/"),
("Club Paradise","Afterglow · Christmas Glow","2026-12-20 15:00","https://club-paradise.nl/events/afterglow-christmas-glow-2/"),
("Stiletto-Club","The Fetish Edition","2026-12-31 21:00","https://www.stiletto-club.nl/fetish-party/"),
("Crazyland","Booming Sexy New Year","2027-01-09 21:00","https://crazyland.org/events/booming-sexy-new-year-09-01-2027/"),
("Crazyland","B.I.T.C.H. 25 Year Anniversary","2027-01-16 21:00","https://crazyland.org/events/b-i-t-c-h-16-01-2027/"),
("Club Eroxx","Nina & Friends","2026-11-26 11:30","https://eroxx.be/pages/events/1737"),
("Club Eroxx","Sexy Burlesque Party","2026-11-27 20:00","https://eroxx.be/pages/events/1736"),
("Club Eroxx","Soirée Deluxe","2026-11-28 19:00","https://eroxx.be/pages/events/1738"),
("Club Eroxx","Topless Sunday","2026-11-29 14:00","https://eroxx.be/pages/events/1719"),
("Club Eroxx","Masquerade Extreme Edition","2026-12-03 11:30","https://eroxx.be/pages/events/1747"),
("Bornedries","Hoerenfuif","2026-11-27 19:00","https://www.bornedries.be/event/hoerenfuif-november/"),
("Bornedries","Newbie Night","2026-11-28 19:00","https://www.bornedries.be/event/newbie-night-november/"),
("Bornedries","Rewind","2026-11-29 15:00","https://www.bornedries.be/event/rewind-november-29/"),
("Club Amai","Kinky Bi & Travestie","2026-11-25 20:00","https://www.clubamai.be/evenement/bi-en-travestie"),
("Club Amai","Doendersdag","2026-11-26 20:00","https://www.clubamai.be/evenement/doendersdag"),
("Club Amai","Slutty Friday","2026-11-27 21:00","https://www.clubamai.be/evenement/sluttyfriday5"),
("Caviar de la Nuit","Soirée d'Or · The X-mas Edition","2026-12-19 20:00","https://www.caviardelanuit.com/events/soireedor191226"),
("Caviar de la Nuit","Fascination","2027-01-23 20:00","https://www.caviardelanuit.com/events/fascination"),
("Caviar de la Nuit","Save the Date","2027-04-17 20:00","https://www.caviardelanuit.com/events/save-the-date-2"),
]
eu=[("2026-11-26","NaughtyThursday","19:00","naughtythursday-2026-11-26-19-00"),("2026-11-27","FlirtyFriday","19:00","flirtyfriday-2026-11-27-19-00"),("2026-11-28","SexySaturdayEvening","19:00","sexysaturdayevening-2026-11-28-19-00"),("2026-11-29","Hot Afternoon Chillax","14:00","hot-afternoon-chillax-2026-11-29-14-00"),("2026-12-03","NaughtyThursday","19:00","naughtythursday-2026-12-03-19-00"),("2026-12-04","FlirtyFriday","19:00","flirtyfriday-2026-12-04-19-00"),("2026-12-05","SexySaturdayEvening","19:00","sexysaturdayevening-2026-12-05-19-00"),("2026-12-06","Hot Afternoon Chillax","14:00","hot-afternoon-chillax-2026-12-06-14-00"),("2026-12-10","NaughtyThursday","19:00","naughtythursday-2026-12-10-19-00"),("2026-12-11","FlirtyFriday","19:00","flirtyfriday-2026-12-11-19-00"),("2026-12-12","SexySaturdayEvening","19:00","sexysaturdayevening-2026-12-12-19-00"),("2026-12-13","Hot Afternoon Chillax","14:00","hot-afternoon-chillax-2026-12-13-14-00"),("2026-12-17","NaughtyThursday","19:00","naughtythursday-2026-12-17-19-00"),("2026-12-18","Dark & Naked by Candlelight","19:00","dark-naked-by-candlelight-13"),("2026-12-19","SexySaturdayEvening","19:00","sexysaturdayevening-2026-12-19-19-00"),("2026-12-20","Hot Afternoon Chillax","14:00","hot-afternoon-chillax-2026-12-20-14-00"),("2026-12-25","Christmas Party","19:00","christmasparty")]
for d,t,h,s in eu: E_.append(("Euphoria",t,f"{d} {h}","https://www.erosauna-euphoria.be/details-en-registratie/"+s))

q=lambda v:"null" if v is None else ("'"+str(v).replace("'","''")+"'")
out=["""-- Partyagenda + clubs, verzameld bij de bron (sites van clubs/organisatoren), 23 nov 2026.
-- Alleen feiten (naam, datum, plaats) in eigen woorden + link naar de organisator.
-- Coördinaten = centrum van de plaats (afgerond), voor 'afstand vanaf jou'.
-- Veilig opnieuw uit te voeren: vervangt eerder geïmporteerde rijen (source = 'bron').
begin;
alter table public.events add column if not exists lat double precision;
alter table public.events add column if not exists lng double precision;
alter table public.events add column if not exists source text;
alter table public.places add column if not exists lat double precision;
alter table public.places add column if not exists lng double precision;
alter table public.places add column if not exists source text;

delete from public.events where source = 'bron';
delete from public.places where source = 'bron';
"""]
out.append("insert into public.places (name, city, country, region, category, url, description, lat, lng, source) values")
out.append(",\n".join(f"({q(n)}, {q(c)}, {q(co)}, {q(r)}, {q(cat)}, {q(u)}, {q(d)}, {q(la)}, {q(ln)}, 'bron')" for n,c,co,r,cat,u,la,ln,d in P)+";\n")
out.append("insert into public.events (title, starts_at, venue, city, country, region, category, url, lat, lng, source) values")
rows=[]
for v,t,s,u in sorted(E_,key=lambda x:x[2]):
    n,c,co,r,cat,_,la,ln,_ = V[v]
    rows.append(f"({q(t)}, '{s}:00+01', {q(n)}, {q(c)}, {q(co)}, {q(r)}, {q(cat)}, {q(u)}, {q(la)}, {q(ln)}, 'bron')")
out.append(",\n".join(rows)+";\n\ncommit;\n")
open('supabase/2026-11-23_agenda_bronnen.sql','w').write("\n".join(out))
print(len(P),"places",len(E_),"events")
