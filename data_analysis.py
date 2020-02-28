import pymongo
import os
import csv


def pull_mongo_data(filename):
    """
    pull data from mongoDB
    :param filename:
    :return:
    """
    db_name = os.getenv("MONGO_DB")
    db_pass = os.getenv("MONGO_PASS")

    client = pymongo.MongoClient("mongodb+srv://" + db_name + ":" + db_pass +
                                 "@mongosandbox-qzmsu.mongodb.net/test?retryWrites=true&w=majority")
    db = client.projectfour
    collection = db.datavisthree
    documents = collection.find()
    analysis_data = list()
    analysis_data.append(["id", "chartType", "realPercentage", "guessedPercentage"])
    for document in documents:
        for trial in document['trials']:
            row = list()
            row.append(str(document['_id']))
            row.append(trial['chart']['charttype'])
            row.append(trial['realpercentage'])
            row.append(trial['guessedpercentage'])
            analysis_data.append(row)
    write_list_csv("data", filename, analysis_data)


def write_list_csv(output_folder, filename, rows):
    """
    convert a 2D list into a csv
    :param output_folder: folder to write rows into
    :param filename: name of file
    :param rows: data to be written
    """
    output_path = "./" + output_folder + "/"
    filename = output_path + filename
    if not os.path.exists(output_path):
        os.makedirs(output_path)
    with open(filename, 'w', newline='', encoding='utf-8') as out:
        csv_cout = csv.writer(out)
        for row in rows:
            csv_cout.writerow(row)


def load_csv(filename):
    """
    given a filename return csv as list of rows
    :param filename: filepath
    :return: list[list]
    """
    loaded_csv = list()
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=',')
        for row in reader:
            loaded_csv.append(row)
    return loaded_csv


def calculate_error(row):
    """
    given a row of the csv calculate the error between the
    :param row: row of responses.csv [id, chartType, realPercentage, guessedPercentage]
    :return: {float} error for a given trial. Ex: 0.03
    """
    pass


def error_for_bar(chart_type, trials):
    """
    calculate the average error for a figure type
    :param chart_type: type of figure. Ex: 'bar'
    :param trials: list of trials
    :return: average error value for figure
    """
    pass


# IN THE PROJECT DESCRIPTION IT MENTIONED THIS WAS EASY IN R.
# Doesnt need to be in Python
def bootstrapped(chart_type, trials):
    """
    calculate the bootstrapped confidence intervals of a figure type
    :param chart_type: type of figure. Ex: 'bar'
    :param trials: list of trials
    :return: bootstrapped confidence interval as list. Ex: [mean, upper_bound, lower_bound]
    """


def bootstrap_graph(bootstrap_intervals):
    """
    create graph given bootstrapped confidence interval
    :param bootstrap_intervals: dict of bootstrap intervals.
    Ex: {'bar': [mean, upper_bound, lower_bound], 'pie': [0.80, 0.84, 0.72] ...}
    """


# updates responses.csv file with newest data form mongoDB
pull_mongo_data("responses.csv")
