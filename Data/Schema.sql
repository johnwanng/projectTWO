create view worldcup_host_winners as
 (select 
	(select count(0) from worldcups where country = winner) host_is_winner,
	(select count(0) from worldcups where country = runners_up) host_is_second,
	(select count(0) from worldcups where country = third) host_is_third,
	(select count(0) from worldcups where country = fourth) host_is_fourth,
	(select count(0) from worldcups where (country != winner) and (country != runners_up) 
	 and (country != third) and (country != fourth))  not_first_second_third_fourth);
	 
select * from worldcups;

with min_match_dates as (
select min(datetime) min_match_date,year from worldcupmatches 
where year >= 1994
group by year
order by year)

select * from min_match_dates;


select max(rank_date) from worldcupranking where rank_date <= '1994-07-02';
order by rank_date;	

SELECT *
FROM table
WHERE dt::date = '2011-01-01' 

--"02 Jul 1994 - 12:00 "	1994
--"03 Jul 1998 - 16:30 "	1998
--"01 Jun 2002 - 15:30 "	2002
--"01 Jul 2006 - 17:00 "	2006
--"02 Jul 2010 - 16:00 "	2010
--"01 Jul 2014 - 13:00 "	2014

select min(datetime),year from worldcupmatches 
where year >= 1994
group by year
order by year;	

1994
1998
2002
2006
2010
2014




select * from worldcupranking;

create table worldcupranking
(id	integer,
 rank integer,
 country_full varchar(100),
 country_abrv varchar(100),
 total_points integer,
 previous_points integer,
 rank_change integer,
 confederation varchar(100),
 rank_date date);


select distinct country_name from (
	select home_team_name country_name from worldcupmatches
	union
	select away_team_name country_name from worldcupmatches) a;

select * from worldcupcountry_lat_long;

insert into worldcupcountry_lat_long(country, lat, long)
values
('Cameroon',7.3697	,12.34547),
('Czech Republic',49.8175,15.473),
('Sweden',60.1282,18.6435),
('Zaire',-4.0383,21.7587),
('Korea DPR',35.9078,127.7669),
('Portugal',39.3999,-7.2245),
('Colombia',39.2037,-76.861),
('Wales',52.1307,-3.7837),
('Ukraine',48.3794,31.1656),
('Saudi Arabia',23.8859,45.0792),
('Cuba',21.5218,-77.7812),
('Northern Ireland',54.7877,-6.4923),
('Algeria',28.0339,1.6596),
('France',46.2276,2.2137),
('Slovakia',48.669,19.699),
('Israel',31.0461,34.8516),
('Ghana',7.9465,-1.0232),
('Senegal',14.4974,14.4524),
('Kuwait',29.3117,47.4818),
('Turkey',38.9637,35.2433),
('Korea Republic',35.9078,127.7669),
('Nigeria',9.082,8.6753),
('Republic of Ireland',53.4129,-8.2439),
('Scotland',56.4907,-4.2026),
('Netherlands',52.1326,5.2913),
('Paraguay',-23.4425,-58.4438),
('Australia',-25.2744,133.7751),
('Serbia',44.0165,21.0059),
('Angola',-11.2027,17.8739),
('IR Iran',32.4279,53.688),
('Spain',40.4637,-3.7492),
('Belgium',50.5039,4.4699),
('United Arab Emirates',23.4241,53.8478),
('Togo',8.6195,0.8248),
('Soviet Union',61.524,105.3188),
('Trinidad and Tobago',10.6918,-61.2225),
('El Salvador',13.7942,-88.8965),
('Italy',41.8719,12.5674),
('Uruguay',-32.5228,-55.7658),
('Czechoslovakia',49.8175,15.473),
('USA',37.0902,-95.7129),
('Bosnia and Herzegovina',43.9159,17.6791),
('Germany',51.1657,10.4515),
('Canada',56.1304,-106.3468),
('Cote d??Ivoire',7.54,-5.5471),
('Argentina',-38.4161,-63.6167),
('England',52.3555,-1.1743),
('Slovenia',46.1512,14.9955),
('Greece',39.0742,21.8243),
('Egypt',26.8206,30.8025),
('Iran',32.4279,53.688),
('Chile',-35.6751,-71.543),
('South Africa',-30.5595,22.9375),
('Peru',-9.19,-75.0152),
('German DR',48.7775,11.4311),
('Yugoslavia',44.819,20.4573),
('Japan',36.2048,138.2529),
('Denmark',56.2639,9.5018),
('Jamaica',18.1096,-77.2975),
('Iraq',33.2232,43.6793),
('China PR',36.8617,104.1954),
('Switzerland',46.8182,8.2275),
('Ecuador',-1.8312,-78.1834),
('New Zealand',-40.9006,174.886),
('Hungary',47.1625,19.5033),
('Serbia and Montenegro',44.0165,21.0059),
('Russia',61.524,105.3188),
('Germany FR',51.1657,10.4515),
('Honduras',15.2,-86.2419),
('Norway',60.472,8.4689),
('Romania',45.9432,24.9668),
('Brazil',-14.235,-51.9253),
('Austria',47.5162,14.5501),
('Bolivia',-16.2902,-63.5887),
('Bulgaria',42.7339,25.4858),
('Croatia',45.1,15.2),
('Tunisia',33.8869,9.5375),
('Morocco',31.7917,-7.0926),
('Mexico',23.6345,-102.5528),
('Poland',51.9194,19.1451),
('Costa Rica',9.7489,-83.734),
('Haiti',18.9712,-72.2852),
('Dutch East Indies',-2,118);


select distinct * from worldcupmatches where year = 2014 and stage = 'Final';

select * from worldcupplayers where matchid = 300186501 and line_up = 'S' and team_initials = 'ARG';


select * from worldcupplayers;


select * from worldcupmatches where year is null;

delete from worldcupmatches where year is null;

select * from worldcups;


create table worldcupcountry_lat_long
(Country varchar(100),
 Lat decimal,
 Long decimal);

create table worldcups 
(Year integer primary key,
 Country varchar(100),
 Winner	varchar(100),
 Runners_Up	varchar(100),
 Third	varchar(100),
 Fourth	varchar(100),
 GoalsScored integer,
 QualifiedTeams	integer,
 MatchesPlayed integer,
 Attendance integer);
 
 create table worldcupmatches
 (Year	integer,
  Datetime varchar(100),
  Stage	varchar(100),
  Stadium varchar(100),
  City varchar(100),
  Home_Team_Name varchar(100),
  Home_Team_Goals integer,
  Away_Team_Goals integer,
  Away_Team_Name varchar(100),
  Win_conditions varchar(100),
  Attendance integer,
  Half_time_Home_Goals integer,
  Half_time_Away_Goals integer,
  Referee varchar(100),
  Assistant_1 varchar(100),
  Assistant_2 varchar(100),
  RoundID integer,
  MatchID integer,
  Home_Team_Initials varchar(100),
  Away_Team_Initials varchar(100));
  
create table worldcupplayers  
  (RoundID integer,
   MatchID integer,
   Team_Initials varchar(100),
   Coach_Name varchar(100),
   Line_up  varchar(100),
   Shirt_Number varchar(100),
   Player_Name varchar(100),
   Position varchar(100),
   Event varchar(100));
   
   
   