import numpy as np
import pandas as pd
import pickle

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.metrics import accuracy_score

def machine_learning(user_list):
    loaded_model = pickle.load(open('kickstarter_model.sav', 'rb'))
    prediction = loaded_model.predict_proba(user_list)[:,1]
    return prediction