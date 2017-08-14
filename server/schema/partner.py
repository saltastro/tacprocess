import graphene
from graphene import relay as r, resolve_only_args

from .common import PriorityTimes, TimeDistributions, Semester
import pandas as pd
from data import conn


class Partner(graphene.ObjectType):
    class Meta:
        interfaces = (r.Node,)

    # partner_id = graphene.ID()
    partner_code = graphene.String()
    partner_name = graphene.String()
    distributed_times = graphene.Field(graphene.List(TimeDistributions), semester_id=graphene.Int(), semester_code=graphene.String())

    @resolve_only_args
    def resolve_distributed_times(self, semester_id=None, semester_code=None):
        return self.get_distributed_times(partner_id=self.partner_id, semester_id=semester_id,
                                          semester_code=semester_code)

    def _make_distributions(self, dist):
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

        dist_ = TimeDistributions(
            semester=dist['SemesterCode'],
            science_time=science_time,
            allocation_time=allocation_time
        )
        return dist_

    def get_distributed_times(self, partner_id, semester_id, semester_code):

        semester = None
        if semester_id is not None:
            semester = Semester().get_semester(semester_id=semester_id)
        elif semester_code is not None:
            semester = Semester().get_semester(semester_code=semester_code)

        sql = "SELECT *, CONCAT(Year, '-', Semester) as SemesterCode " \
              "         FROM PeriodTimeDist join Semester using (Semester_Id) " \
              " WHERE Partner_Id={partner_id} " \
            .format(partner_id=partner_id)

        if semester is not None:
            sql = sql + " AND Semester_Id={}".format(semester.semester_id)

        dist = pd.read_sql(sql, conn)

        if len(dist) > 0:
            dists = [self._make_distributions(d) for i, d in dist.iterrows()]
        else:
            if semester is None:
                semester = Semester().get_semester(active=True)
            em = {
                'SemesterCode': [semester.semester],
                'Alloc0and1': [0],
                'Alloc2': [0],
                'Alloc3': [0],
            }
            empty_alloc = pd.DataFrame(em)
            dists = [self._make_distributions(e) for i, e in empty_alloc.iterrows()]
        return dists
