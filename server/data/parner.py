import pandas as pd
from . import conn


partner_data = {}


def make_partner(_part):
    from ..schema.parner import Partner
    part_ = Partner(
        partner_id=_part['Partner_Id'],
        partner_code=_part['Partner_Code'],
        partner_name=_part['Partner_Name']
    )
    return part_


def get_partner(partner_id, partner_code, partner_name):
    global partner_data

    sql = "SELECT Partner_Id, Partner_Code, Partner_Name FROM Partner "

    if partner_id is not None:
        sql = sql + " WHERE Partner_ID={}".format(partner_id)
    if partner_code is not None:
        if 'WHERE' in sql:
            sql = sql + " and Partner_Code='{}'".format(partner_code)
        else:
            sql = sql + " WHERE Partner_Code='{}'".format(partner_code)
    if partner_name is not None:
        if 'WHERE' in sql:
            sql = sql + " and Partner_Name='{}'".format(partner_name)
        else:
            sql = sql + " WHERE Partner_Name='{}'".format(partner_name)
    results = pd.read_sql(sql, conn)
    partner_ = [make_partner(part) for index, part in results.iterrows()]

    return partner_


def setup_partner_of(partner_id, partner_code, partner_name):
    global partner_data
    partner_ = get_partner(partner_id, partner_code, partner_name)
    partner_data = {partner_id: partner_}


def get_partner_of(partner_id, partner_code, partner_name):
    setup_partner_of(partner_id, partner_code, partner_name)
    return partner_data.get(partner_id)