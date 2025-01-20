from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.job_list, name="job-list"),
    path("jobs/<str:pk>/", views.job_detail, name="job-detail"),
    path("jobs-overview/", views.job_overview, name="job-overview"),
    path(
        "jobs-overview/<str:pk>/", views.job_overview_detail, name="job-overview-detail"
    ),
    path("jobs/<str:pk>/save/", views.save_job, name="save-job"),
    path("jobs/<str:pk>/unsave/", views.unsave_job, name="unsave-job"),
    path("saved-jobs/<str:user_id>/", views.get_saved_jobs, name="get-saved-jobs"),
]
