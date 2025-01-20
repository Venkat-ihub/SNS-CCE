from django.urls import path
from . import views

urlpatterns = [
    path("jobs-overview/", views.job_overview, name="jobs-overview"),
    path("jobs/", views.create_job, name="create-job"),
    path("jobs/<str:pk>/", views.job_detail_admin, name="job-detail-admin"),
    path(
        "jobs-overview/<str:pk>/", views.job_overview_detail, name="job-overview-detail"
    ),
    path("jobs/<str:pk>/save/", views.save_job, name="save-job"),
    path("jobs/<str:pk>/unsave/", views.unsave_job, name="unsave-job"),
    path("saved-jobs/<str:user_id>/", views.get_saved_jobs, name="get-saved-jobs"),
]
