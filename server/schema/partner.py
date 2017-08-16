import graphene
from graphene import relay as r, resolve_only_args

from .common import Semester
import pandas as pd
from data import conn


class PriorityTimes(graphene.ObjectType):
    p0_and_p1 = graphene.Float()
    p2 = graphene.Float()
    p3 = graphene.Float()


class TimeAllocatedToPartner(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    semester = graphene.String()
    science_time = graphene.Field(PriorityTimes)
    allocation_time = graphene.Field(PriorityTimes)


class Partner(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    partner_code = graphene.String()
    partner_name = graphene.String()
    partner_distributed_times = graphene.Field(graphene.List(TimeAllocatedToPartner), semester=graphene.String())

    def __init__(self, partner_id, partner_code, partner_name):
        super().__init__(partner_code=partner_code, partner_name=partner_name)

        self.partner_id = partner_id

    @resolve_only_args
    def resolve_partner_distributed_times(self, semester=None):
        return self.__get_distributed_times(semester=semester)

    @staticmethod
    def __make_distributions(dist):
        """
        is a private method that is only called by get_distributed_times()
        <NB> this methods must not be called anywhere or be called by any method <NB>
        makes a distributed time for a partner
        :param dist: row of distributed times
        :return: TimeAllocatedToPartner graphene Object type
        """
        science_time = PriorityTimes(
            p0_and_p1=dist['Alloc0and1'],
            p2=dist['Alloc2'],
            p3=dist['Alloc3']
        )
        allocation_time = PriorityTimes(
            p0_and_p1=dist['Alloc0and1'],
            p2=dist['Alloc2'],
            p3=3 * dist['Alloc2']
        )

        dist_ = TimeAllocatedToPartner(
            semester=dist['SemesterCode'],
            science_time=science_time,
            allocation_time=allocation_time
        )
        return dist_

    def __get_distributed_times(self, semester):
        """
        
        :param semester: semester in question if any
        :return:  a list of TimeAllocatedToPartner  
        """

        dist_semester = None
        if not pd.isnull(semester):
            dist_semester = Semester.get_semester(semester_code=semester)

        sql = "SELECT Alloc0and1, Alloc2, Alloc3, CONCAT(Year, '-', Semester) as SemesterCode " \
              "         FROM PeriodTimeDist " \
              "              JOIN Semester using (Semester_Id) " \
              " WHERE Partner_Id={partner_id} " \
            .format(partner_id=self.partner_id)

        if semester is not None:
            sql = sql + " AND Semester_Id={}".format(dist_semester.semester_id)

        dist = pd.read_sql(sql, conn)

        if len(dist) > 0:
            dists = [self.__make_distributions(d) for i, d in dist.iterrows()]
        else:
            if semester is None:
                dist_semester = Semester.get_semester(active=True)
            em = {
                'SemesterCode': [dist_semester.semester],
                'Alloc0and1': [0],
                'Alloc2': [0],
                'Alloc3': [0],
            }
            empty_alloc = pd.DataFrame(em)
            dists = [Partner.__make_distributions(e) for i, e in empty_alloc.iterrows()]
        return dists

    @staticmethod
    def get_partner(**args):
        sql = "SELECT Partner_Id, Partner_Code, Partner_Name FROM Partner "

        if 'partner_code' in args:
            sql = sql + " WHERE Partner_Code='{}' ".format(args['partner_code'])
        results = pd.read_sql(sql, conn)

        return [Partner.__make_partner(part) for index, part in results.iterrows()]

    @staticmethod
    def __make_partner(_part):
        return Partner(
            partner_id=_part['Partner_Id'],
            partner_code=_part['Partner_Code'],
            partner_name=_part['Partner_Name'])
