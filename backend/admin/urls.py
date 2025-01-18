from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.job_list, name="job-list"),
    path("jobs/<str:pk>/", views.job_detail, name="job-detail"),
    path("jobs-overview/", views.job_overview, name="job-overview"),
    path(
        "jobs-overview/<str:pk>/", views.job_overview_detail, name="job-overview-detail"
    ),
]
