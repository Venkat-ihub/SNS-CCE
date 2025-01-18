from django.urls import path
from . import views

urlpatterns = [
    path("jobs/", views.job_list, name="job-list"),
    path("jobs/<str:pk>/", views.job_detail, name="job-detail"),
]
