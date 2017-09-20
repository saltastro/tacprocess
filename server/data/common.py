import pandas as pd
from data import conn
import datetime
import warnings
from dateutil.relativedelta import relativedelta

semester_data = {}


# def make_semester(data):
#     # Todo This method is called only by get semester it is suppose to be a private method for semester
#     """
#      make a data received a
#     :param data:
#     :return:
#     """
#
#     from schema.common import Semester
#     return Semester(
#             semester_id=data['Semester_Id'],
#             semester=data['SemesterCode'],
#             start_semester=data['StartSemester'],
#             end_semester=data['EndSemester']
#         )
#
#
# def get_semester(id_only=False, active=False, semester_id=None, semester_code=None, all_data=False):
#     """
#     :return:
#     """
#     sql = 'SELECT  Semester_Id, CONCAT(Year,"_", Semester) as SemesterCode, StartSemester, EndSemester FROM  Semester '
#
#     if all_data:
#         data = pd.read_sql(sql, conn)
#         return [make_semester(d) for i, d in data.iterrows()]
#
#     date = datetime.datetime.now().date()
#     date_3 = date + relativedelta(months=3)
#
#     if active:
#         if semester_id is not None or semester_code is not None:
#             warnings.warn("Semester id or Semester code is provided and active=True, active semester is returned. "
#                           "Set active=False if you need none active semester if you query for none active semester."
#                           "Returned is active Semester")
#
#         sql = sql + ' where StartSemester <= "{date_}" and "{date_}" < EndSemester;'.format(date_=date_3)
#     else:
#         if semester_id is not None:
#             sql = sql + ' where Semester_Id = {semester_id};'.format(semester_id=semester_id)
#         elif semester_code is not None:
#
#             if "-" in semester_code:
#                 sql = sql + ' where CONCAT(Year, "-", Semester) = "{semester_code}";'\
#                       .format(semester_code=semester_code)
#             else:
#                 sql = sql + ' where CONCAT(Year, "_", Semester) = "{semester_code}";' \
#                     .format(semester_code=semester_code)
#         else:
#             raise ValueError("Set active=True for active semester, or provide semester_id or semester like '2017_1'  "
#                              "or '2017-1'")
#
#     data = pd.read_sql(sql, conn)
#     try:
#         semester = [make_semester(s) for i, s in data.iterrows()][0]
#     except IndexError:
#         semester = None
#
#     if id_only:
#         return semester.semester_id
#     return semester


def setup_semester(semester_code):
    global semester_data
    from schema.common import Semester
    semester_ = Semester()
    sem = semester_.get_semester(semester_code=semester_code, all_data=True)
    semester_data = {"semester": sem}


def get_semester_of(semester_code):
    setup_semester(semester_code=semester_code)
    return semester_data.get("semester")


def make_user(_user):
    from schema.common import Person

    user_ = Person(
        user_id=_user['Investigator_Id'],
        last_name=_user['Surname'],
        first_name=_user['FirstName'],
        email=_user['Email'],
        # roles=_user[''][0],
        phone=_user['Phone'],
        pipt_user_id=_user['PiptUser_Id'],
        institute_id=_user['Institute_Id']
    )
    return user_


def get_user(user_id):
    """

    :param user_id:
    :return:
    """
    if str(user_id) == 'nan':
        results = [0, 0]
    else:

        sql = "SELECT Investigator_Id, Institute_Id, FirstName, Surname, Email, Phone, PiptUser_Id " \
              " FROM Investigator WHERE Investigator_Id = {id}".format(id=int(user_id))

        results = pd.read_sql(sql, conn)

    if len(results) == 1:
        investigator = [make_user(u) for i, u in results.iterrows()][0]
    else:
        warnings.warn('User {} not found'.format(user_id))
        em = {
            'Investigator_Id': [0],
            'Institute_Id': [0],
            'FirstName': ["Not Assigned"],
            'Surname': ["Not Assigned"],
            'Email': ["Not Assigned"],
            'Phone': ["Not Assigned"],
            'PiptUser_Id': [0]
        }
        empty_user_df = pd.DataFrame(em)
        investigator = [make_user(u) for i, u in empty_user_df.iterrows()][0]

    return investigator


def get_p1_thesis(proposal_code):
    from schema.common import P1Thesis
    sql = 'SELECT * FROM P1Thesis join ThesisType using(ThesisType_Id) '\
          ' join Investigator on (Student_Id=Investigator_Id) '\
          ' join Proposal using(Proposal_id) '\
          ' join ProposalCode using (ProposalCode_Id)' \
          ' where proposal_Code="{}";'\
        .format(proposal_code)

    results = pd.read_sql(sql, conn)
    if len(results) > 0:
        return [P1Thesis(
            thesis_type=thes['ThesisType'],
            thesis_description=thes['ThesisDescr'],
            student=make_user(thes)
        ) for i, thes in results.iterrows()]
    return []


def get_observing_conditions(proposal_code):
    from schema.common import ObservingConditions
    sql = 'SELECT MaxSeeing, ObservingConditionsDescription, Transparency ' \
          ' FROM P1ObservingConditions ' \
          '         JOIN Transparency using (Transparency_Id) ' \
          '         JOIN Proposal using(Proposal_Id) ' \
          '         JOIN ProposalCode using(ProposalCode_Id) ' \
          ' WHERE Proposal_Code="{}" '.format(proposal_code)
    results = pd.read_sql(sql, conn)
    return [ObservingConditions(
        max_seeing=r['MaxSeeing'],
        transparency=r['Transparency'],
        description=r['ObservingConditionsDescription']
    )for i, r in results.iterrows()][0]


class Semester:
    id = None
    semester = None
    start_semester = None
    end_semester = None

    @staticmethod
    def get_semester(active=False, semester_code=None, all_data=False):
        """
        :return:
        """
        sql = 'SELECT  Semester_Id, CONCAT(Year,"_", Semester) as SemesterCode, StartSemester, EndSemester ' \
              ' FROM  Semester '

        if all_data:
            data = pd.read_sql(sql, conn)

            li = [Semester().__make_semester(d) for i, d in data.iterrows()]
            return li

        date = datetime.datetime.now().date()
        date_3 = date + relativedelta(months=3)

        if active:
            if not pd.isnull(semester_code):
                warnings.warn("Semester id or Semester code is provided and active=True, active semester is returned. "
                              "Set active=False if you need none active semester if you query for none active semester."
                              "Returned is active Semester")

            sql = sql + ' where StartSemester <= "{date_}" and "{date_}" < EndSemester;'.format(date_=date_3)
        else:
            if not pd.isnull(semester_code):

                sql = sql + ' WHERE (CONCAT(Year, "-", Semester) = "{semester_code}" ' \
                            '   OR CONCAT(Year, "_", Semester) = "{semester_code}") '\
                    .format(semester_code=semester_code)
            else:
                raise ValueError(
                    "Set active=True for active semester, or provide semester_id or semester like '2017_1'  "
                    "or '2017-1'")

        data = pd.read_sql(sql, conn)
        try:
            semester = [Semester().__make_semester(data=s) for i, s in data.iterrows()][0]
        except IndexError:
            semester = None
        return semester

    def __make_semester(self, data):
        # Todo This method is called only by get semester it is suppose to be a private method for semester
        """
         make a data received a
        :param data:
        :return:
        """
        self.id = data['Semester_Id']
        self.semester = data['SemesterCode']
        self.start_semester = data['StartSemester']
        self.end_semester = data['EndSemester']
        return self
