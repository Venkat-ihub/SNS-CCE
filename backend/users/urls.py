from django.urls import path
from . import views

urlpatterns = [
    # Authentication URLs
    path("register/", views.register_user, name="register"),
    path("login/", views.login_user, name="login"),
    path("verify-otp/", views.verify_otp, name="verify-otp"),
    path("resend-otp/", views.send_reset_otp, name="resend-otp"),
    path("update-profile/", views.update_profile, name="update-profile"),
    path("forgot-password/", views.forgot_password, name="forgot-password"),
    path("reset-password/", views.reset_password, name="reset-password"),
    # Job-related URLs
    path("jobs-overview/", views.job_overview, name="jobs-overview"),
    path("jobs/<str:pk>/", views.job_detail, name="job-detail"),
    path("saved-jobs/<str:user_id>/", views.get_saved_jobs, name="get-saved-jobs"),
    path("save-job/<str:pk>/", views.save_job, name="save-job"),
    path("unsave-job/<str:pk>/", views.unsave_job, name="unsave-job"),
    path("verify-token/", views.verify_token, name="verify-token"),
    path("study-materials/", views.get_study_materials, name="get-study-materials"),
    path("study-materials/add/", views.add_study_material, name="add-study-material"),
    path(
        "study-materials/<str:pk>/",
        views.get_study_material_detail,
        name="get-study-material-detail",
    ),
    path(
        "admin/study-materials/",
        views.admin_get_study_materials,
        name="admin-study-materials",
    ),
    path(
        "study-materials/<str:pk>/update/",
        views.update_study_material,
        name="update-study-material",
    ),
    path(
        "study-materials/<str:pk>/delete/",
        views.delete_study_material,
        name="delete-study-material",
    ),
]
