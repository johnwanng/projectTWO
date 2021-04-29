
update worldcupcountry_lat_long 
set long = -102.5528
where country = 'Mexico';

select * from worldcupcountry_lat_long where country = 'Mexico';

select distinct host from worldcup_top_four_winners where 
host not in (select country from worldcupcountry_lat_long);

select * from worldcup_countries_lat_long where year = 1974;

select * from worldcup_host_winners;

select * from worldcup_winners_and_ranks;

select * from worldcup_top_four_winners;

--select * from worldcup_country_goals_scored_and_conceded;

select * from worldcup_best_performers;

select * from worldcups;

update worldcups
set winner = 'Germany'
where year = 1974;

select * from worldcup_best_perfomers_goals_scored_and_conceded;

select * from worldcup_all_countries_goals_scored_and_conceded; 

create or replace view worldcup_countries_lat_long as
 (select a.*,b.lat cup_country_lat,b.long cup_country_long,c.lat host_country_lat,c.long host_country_long
	from worldcup_top_four_winners a, worldcupcountry_lat_long b, worldcupcountry_lat_long c
	where a.country = b.country and a.host = c.country);

create view worldcup_host_winners as
 (select 
	(select count(0) from worldcups where country = winner) host_is_winner,
	(select count(0) from worldcups where country = runners_up) host_is_second,
	(select count(0) from worldcups where country = third) host_is_third,
	(select count(0) from worldcups where country = fourth) host_is_fourth,
	(select count(0) from worldcups where (country != winner) and (country != runners_up) 
	 and (country != third) and (country != fourth))  not_first_second_third_fourth);

create view worldcup_top_four_winners as	
	(select year,country host,winner country,1 cup_position from worldcups
	 union
	 select year,country,runners_up,2 from worldcups
	 union
	 select year,country, third,3 from worldcups
	 union
	 select year,country, fourth,4 from worldcups)


create view worldcup_winners_and_ranks as
with min_match_dates as (
select to_date(min_match_date,'DD Mon YYYY') min_match_date, year from (
	select min(datetime) min_match_date,year from worldcupmatches a
	where year >= 1994
	group by year) a),
max_rank_date as (
	select max(wcr.rank_date) max_rank_date, mmd.year,mmd.min_match_date  from worldcupranking wcr, min_match_dates mmd
	where extract(year from wcr.rank_date) >= 1994 and wcr.rank_date <= mmd.min_match_date
	group by mmd.min_match_date,mmd.year),
rank_countries as (
	select r.rank world_ranking, r.country_full,r.country_abrv, r.confederation, r.rank_date, mr.year, mr.min_match_date 
	from worldcupranking r, max_rank_date mr where r.rank_date = mr.max_rank_date)
select cw.*,rc.world_ranking,rc.confederation,rc.rank_date,rc.min_match_date from worldcup_top_four_winners cw, rank_countries rc where cw.year = rc.year
and cw.country = rc.country_full;


create view worldcup_country_goals_scored_and_conceded as
select country,  total_goal_scored/world_cup_appearances avg_goals_per_world_cup,total_goals_conceded/world_cup_appearances avg_conceded_goals_per_world_cup,total_goal_scored,total_goals_conceded,world_cup_appearances
from 
	(select country, sum(goals_scored) total_goal_scored,sum(goals_conceded) total_goals_conceded, count(distinct year) world_cup_appearances, count(distinct matchid) match_appearances
	 from (
		select home_team_name country,home_team_goals goals_scored,away_team_goals goals_conceded,year
		from worldcupmatches a
		union
		select away_team_name country,away_team_goals goals_scored,home_team_goals goals_conceded,year
		from worldcupmatches a 
	 )  a
	 group by country) a;

create view worldcup_best_perfomers_goals_scored_and_conceded as
select distinct a.*,b.num_of_world_cup_winners,b.num_of_world_cup_runners_up,b.num_of_world_cup_third,b.num_of_world_cup_fourth
from worldcup_country_goals_scored_and_conceded a,worldcup_best_performers b
where a.country = b.country;


select * from worldcup_best_performers;

create view worldcup_all_countries_goals_scored_and_conceded as
select distinct a.*,b.num_of_world_cup_winners,b.num_of_world_cup_runners_up,b.num_of_world_cup_third,b.num_of_world_cup_fourth
from worldcup_country_goals_scored_and_conceded a
LEFT JOIN worldcup_best_performers b
on a.country = b.country;


select * from worldcup_best_performers;


create view worldcup_best_performers as
	select w.country,min(w.cup_position) best_worlk_cup_position,
	(select count(0) from worldcup_top_four_winners ww where ww.country = w.country and ww.cup_position = 1) num_of_world_cup_winners,
	(select count(0) from worldcup_top_four_winners ww where ww.country = w.country and ww.cup_position = 2) num_of_world_cup_runners_up,
	(select count(0) from worldcup_top_four_winners ww where ww.country = w.country and ww.cup_position = 3) num_of_world_cup_third,
	(select count(0) from worldcup_top_four_winners ww where ww.country = w.country and ww.cup_position = 4) num_of_world_cup_fourth
	from worldcup_top_four_winners w group by w.country;


select * from worldcup_top_four_winners;

select * from worldcups where runners_up = 'Argentina';

select * from worldcups;

select *
--distinct roundid,matchid,year,home_team_name,home_team_goals,away_team_name,away_team_goals
from worldcupmatches a where year = 1930 and (home_team_name = 'Uruguay' or away_team_name = 'Uruguay');

select home_team_name country,sum(home_team_goals) total_score_goals,sum(away_team_goals) total_conceded_goals,
	count(distinct year) world_cup_appearances
from worldcupmatches a where year = 1930 and home_team_name = 'Yugoslavia'
group by home_team_name;



worldcupmatches

6 + 1,
6 + 1

select home_team_name country,sum(home_team_goals) total_home_goals,sum(away_team_goals) total_away_goals,
	count(distinct year) world_cup_appearances
from worldcupmatches a where year = 1930 and home_team_name = 'Uruguay'
group by home_team_name;


with all_matches as (
select distinct roundid,matchid,year,home_team_name,home_team_goals,away_team_name,away_team_goals
from worldcupmatches)
select country,world_cup_appearances,total_home_goals + total_away_goals total_world_cup_goals from (
	select home_team_name country,sum(home_team_goals) total_home_goals,sum(away_team_goals) total_away_goals,
	count(distinct year) world_cup_appearances
	from all_matches group by home_team_name) a;

;


group by roundid,matchid having count(0) > 1;
--roundid
--matchid
--year
--home_team_name
--away_team_name
--home_team_goals
--away_team_goals
1930
1934
1938
1950
1954
1958
1962
1966
1970
1974
1978
1982
1986
1990
1994
1998
2002
2006
2010
2014
select * from worldcupmatches where stage = 'Final' order by 1;

select year,home_team_name,sum(home_team) from worldcupmatches;

select 
Year,
  Datetime,
  Stage,
  Stadium,
  City,
  Home_Team_Name,
  Home_Team_Goals,
  Away_Team_Goals,
  Away_Team_Name,
  Win_conditions,
  Attendance,
  Half_time_Home_Goals,
  Half_time_Away_Goals,
  Referee,
  Assistant_1,
  Assistant_2,
  RoundID,
  MatchID,
  Home_Team_Initials,
  Away_Team_Initials from worldcupmatches
  group by Year,
  Datetime,
  Stage,
  Stadium,
  City,
  Home_Team_Name,
  Home_Team_Goals,
  Away_Team_Goals,
  Away_Team_Name,
  Win_conditions,
  Attendance,
  Half_time_Home_Goals,
  Half_time_Away_Goals,
  Referee,
  Assistant_1,
  Assistant_2,
  RoundID,
  MatchID,
  Home_Team_Initials,
  Away_Team_Initials having count(0) > 1;


select * from worldcups;

select * from worldcupmatches where datetime = '07 July 1974 - 16:00 '; 

update worldcupmatches 
set datetime = '07 Jul 1974 - 16:00 '
where datetime = '07 July 1974 - 16:00 '; 

update worldcupmatches
set datetime = replace(datetime,'June','Jun')
where datetime like '%June%';

"ly 197";


SELECT TO_DATE('2017 Feb 20','YYYY Mon DD');

select distinct substr(a.part_date,6,8) pp from (
	select substr(datetime,1,11) part_date,a.* from  worldcupmatches a) a;
where substr(a.part_date,6,8) = 'e 19'; 
"e 19" 

select replace(a.datetime,'June','Jun') diff, a.* from worldcupmatches a where datetime like '%June%';

select TO_DATE(substr('13 Jul 1930 - 15:00 ',1,11),'DD Mon YYYY');

select TO_DATE(part_date,'DD Mon YYYY') part_data_is_date,a.* from  
  (select substr(datetime,1,11) part_date,a.* from  worldcupmatches a) a;



where
to_date(datetime,'dd mon yyyy') = '1930-097-13';

CAST(datetime AS DATE) = '1930-07-13' ;


select * from worldcups;
select * from worldcupranking;

select TO_DATE(part_date,'DD Mon YYYY') part_data_is_date,a.* from  
  (select substr(datetime,1,11) part_date,a.* from  worldcupmatches a) a;

where year >= 1994



group by year),

select * from min_match_dates;


select max(rank_date) rank_date, years from 
  (select rank_date, extract(year from rank_date) years from worldcupranking 
	where extract(year from rank_date) >= 1994) a
group by years order by 1;

select max(rank_date) from worldcupranking where rank_date <= '1994-07-02' and 
extract(year from rank_date) = 1994;

group by extract(year from rank_date);
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
('Cote díIvoire',7.54,-5.5471),
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
   
   
   