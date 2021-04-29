import numpy as np
import random, json
from flask import Flask, jsonify, url_for
from flask import render_template # to render the html form

#################################################
# Database Setup
#################################################
#from sqlalchemy import create_engine
import psycopg2 as pg
import pandas.io.sql as psql
import matplotlib.pyplot as plt
import matplotlib.pyplot as plt2
import numpy as np
from sqlalchemy import create_engine, func, extract
from sqlalchemy.orm import Session

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################
@app.route('/', methods=['GET','POST'])       


#  <script type="text/javascript" src="{{url_for('static', filename='config.js')}}"></script>
#  <script type="text/javascript" src="{{url_for('static', filename='logic.js')}}"></script>
#  <link rel="stylesheet" type="text/css" href="{{url_for('static', filename='style.css')}}">


# ps -fA | grep python
# kill -9 <pid>

def MainCode():
  connection = create_engine('postgresql://test:test@localhost/FIFA_projectTWO')
  session = Session(connection)

  # Prepare all the required csv files
  country_lat_long = psql.read_sql('SELECT * FROM worldcup_countries_lat_long order by year desc, cup_position', connection)
  country_lat_long.to_csv('static/country_lat_long.csv')

  worldcup_winners_and_ranks = psql.read_sql('SELECT * FROM worldcup_winners_and_ranks order by year', connection)
  worldcup_winners_and_ranks.to_csv('static/worldcup_winners_and_ranks.csv')

  worldcup_all_countries_goals_scored_and_conceded = psql.read_sql('SELECT * FROM worldcup_all_countries_goals_scored_and_conceded', connection)
  worldcup_all_countries_goals_scored_and_conceded.to_csv('static/worldcup_all_countries_goals_scored_and_conceded.csv')

  worldcup_best_perfomers_goals_scored_and_conceded = psql.read_sql('SELECT * FROM worldcup_best_perfomers_goals_scored_and_conceded', connection)
  worldcup_best_perfomers_goals_scored_and_conceded.to_csv('static/worldcup_best_perfomers_goals_scored_and_conceded.csv')

  worldcup_host_winners = psql.read_sql('select * from worldcup_host_winners', connection)
  worldcup_host_winners.to_csv('static/worldcup_host_winners.csv')

  worldcup_winning_coaches = psql.read_sql('select * from worldcup_winning_coaches', connection)
  worldcup_winning_coaches.to_csv('static/worldcup_winning_coaches.csv')

  session.close()
  return render_template("worldcup.html")


if __name__ == "__main__":
    app.run(debug=True)