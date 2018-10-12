import datetime as dt
import numpy as np
import pandas as pd
import test

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.pool import SingletonThreadPool

from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    Response,
    redirect)

from flask_sqlalchemy import SQLAlchemy


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///kickstarter.sqlite",
                poolclass=SingletonThreadPool, connect_args={"check_same_thread":False})

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
Projects = Base.classes.projects

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/mach_learn")
def machine():
    return render_template("mach_learn.html")

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

@app.route("/about-us")
def about():
    return render_template("about-us.html")

@app.route("/api/compute", methods = ['POST'])
def compute():
    # Get form data
    # Pass form data into machine learning algorithm
    # Format result
    # Return result
    goal = float(request.form['fGoal'])
    backers = float(request.form['fBacker'])
    main = request.form['fCategory']
    sub = request.form[f"fSub_{main}"]

    sub_list = ['3D Printing', 'Academic', 'Accessories', 'Action', 'Animals', 'Animation', 'Anthologies', 'Apparel', 'Apps', 'Architecture', 'Art', 'Art Books', 'Audio', 'Bacon', 'Blues', 'Calendars', 'Camera Equipment', 'Candles', 'Ceramics', "Children's Books", 'Childrenswear', 'Chiptune', 'Civic Design', 'Classical Music', 'Comedy', 'Comic Books', 'Comics', 'Community Gardens', 'Conceptual Art', 'Cookbooks', 'Country & Folk', 'Couture', 'Crafts', 'Crochet', 'DIY', 'DIY Electronics', 'Dance', 'Design', 'Digital Art', 'Documentary', 'Drama', 'Drinks', 'Electronic Music', 'Embroidery', 'Events', 'Experimental', 'Fabrication Tools', 'Faith', 'Family', 'Fantasy', "Farmer's Markets", 'Farms', 'Fashion', 'Festivals', 'Fiction', 'Film & Video', 'Fine Art', 'Flight', 'Food', 'Food Trucks', 'Footwear', 'Gadgets', 'Games', 'Gaming Hardware', 'Glass', 'Graphic Design', 'Graphic Novels', 'Hardware', 'Hip-Hop', 'Horror', 'Illustration', 'Immersive', 'Indie Rock', 'Installations', 'Interactive Design', 'Jazz', 'Jewelry', 'Journalism', 'Kids', 'Knitting', 'Latin', 'Letterpress', 'Literary Journals', 'Literary Spaces', 'Live Games', 'Makerspaces', 'Metal', 'Mixed Media', 'Mobile Games', 'Movie Theaters', 'Music', 'Music Videos', 'Musical', 'Narrative Film', 'Nature', 'Nonfiction', 'Painting', 'People', 'Performance Art', 'Performances', 'Periodicals', 'Pet Fashion', 'Photo', 'Photobooks', 'Photography', 'Places', 'Playing Cards', 'Plays', 'Poetry', 'Pop', 'Pottery', 'Print', 'Printing', 'Product Design', 'Public Art', 'Publishing', 'Punk', 'Puzzles', 'Quilts', 'R&B', 'Radio & Podcasts', 'Ready-to-wear', 'Residencies', 'Restaurants', 'Robots', 'Rock', 'Romance', 'Science Fiction', 'Sculpture', 'Shorts', 'Small Batch', 'Software', 'Sound', 'Space Exploration', 'Spaces', 'Stationery', 'Tabletop Games', 'Taxidermy', 'Technology', 'Television', 'Textiles', 'Theater', 'Thrillers', 'Translations', 'Typography', 'Vegan', 'Video', 'Video Art', 'Video Games', 'Wearables', 'Weaving', 'Web', 'Webcomics', 'Webseries', 'Woodworking', 'Workshops', 'World Music', 'Young Adult', 'Zines']

    cat_index = sub_list.index(sub)

    one_hot = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

    one_hot[cat_index] = 1

    data = [[goal]] + [[backers]] + [one_hot]
    flat_list = [item for sublist in data for item in sublist]


    print(goal)
    print(backers)
    print(main)
    print(sub)

    ml_result = test.machine_learning(np.reshape(flat_list, (1,-1)))

    if ml_result == 1:
        result = "Your project will likely get funded!"
    else:
        result = "Your project might not get funded."
    
    return Response(result, status = 200, mimetype = "text/plain")


@app.route("/api/data")
def data():
    
    all_data = []

    results = session.query(Projects).all()
    
    for project in results:
        
        project_dict = {}
        # project_dict["name"] = project.name
        project_dict["main_category"] = project.main_category
        project_dict["category"] = project.category
        # project_dict["country"] = project.country
        # project_dict["launched"] = project.launched
        # project_dict["deadline"] = project.deadline
        # project_dict["days_elapsed"] = project.days_elapsed
        project_dict["state"] = project.state
        # project_dict["usd_pledged_real"] = project.usd_pledged_real
        # project_dict["usd_goal_real"] = project.usd_goal_real
        # project_dict["fund_percentage"] = project.fund_percentage

        all_data.append(project_dict)

    success = {}

    def getSuccess(sub):
        funded = 0
        total = 0

        for proj in all_data:
            if proj["category"] == sub:
                total += 1
                if proj["state"] == "successful":
                    funded += 1
        
        return (np.round(funded/total*100,2))


    for proj in all_data:

        main = proj["main_category"]
        sub = proj["category"]

        if main not in success:
            success[main] = {sub: getSuccess(sub)}
        if sub not in success[main]:
            success[main][sub] = getSuccess(sub)

    return jsonify(success)




if __name__ == '__main__':
    app.run(debug=True)
