import pymysql
import pandas as pd
import warnings
import datetime
import os
from dateutil.relativedelta import relativedelta

sql_config = {
    'user': os.environ["SANDBOX_USER"],
    'host': os.environ["SANDBOX_HOST"],
    'passwd': os.getenv("SANDBOX_PASSWORD"),
    'db': os.getenv("SANDBOX_DATABASE"),
    'charset': 'utf8'
}
conn = pymysql.connect(**sql_config)