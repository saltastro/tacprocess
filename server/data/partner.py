import pandas as pd
from . import conn


partner_data = {}


def make_partner(_part):
    from schema.partner import Partner
    part_ = Partner(
        partner_code=_part['Partner_Code'],
        partner_name=_part['Partner_Name']
    )
    return part_


def get_partner(**args):
    global partner_data

    sql = "SELECT Partner_Id, Partner_Code, Partner_Name FROM Partner "

    if 'partner_code' in args:
        sql = sql + " WHERE Partner_Code={} ".format(args['partner_code'])

    results = pd.read_sql(sql, conn)
    partner_ = [make_partner(part) for index, part in results.iterrows()]

    return partner_


def setup_partner_of(**args):
    global partner_data
    partner_ = get_partner(**args)
    partner_data =  partner_


def get_partner_of(**args):
    setup_partner_of(**args)
    return partner_data