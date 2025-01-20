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
]
