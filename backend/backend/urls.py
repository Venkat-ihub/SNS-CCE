"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from users import views as user_views

urlpatterns = [
    path("admin/", admin.site.urls),
    # User routes
    path("api/register/", user_views.register_user, name="register"),
    path("api/login/", user_views.login_user, name="login"),
    path("api/forgot-password/", user_views.forgot_password, name="forgot-password"),
    path("api/verify-otp/", user_views.verify_otp, name="verify-otp"),
    path("api/test-db/", user_views.test_db, name="test-db"),
    path("api/send-signup-otp/", user_views.send_signup_otp, name="send-signup-otp"),
    path(
        "api/verify-signup-otp/", user_views.verify_signup_otp, name="verify-signup-otp"
    ),
    path("api/send-reset-otp/", user_views.send_reset_otp, name="send-reset-otp"),
    path("api/verify-reset-otp/", user_views.verify_reset_otp, name="verify-reset-otp"),
    path("api/reset-password/", user_views.reset_password, name="reset-password"),
    path("api/send-mobile-otp/", user_views.send_mobile_otp, name="send-mobile-otp"),
    path(
        "api/verify-mobile-otp/", user_views.verify_mobile_otp, name="verify-mobile-otp"
    ),
    path("api/test-email/", user_views.test_email, name="test-email"),
    path("api/update-profile/", user_views.update_profile, name="update-profile"),
    # Admin routes
    path(
        "api/admin/", include("admin.urls")
    ),  # This will include all admin-related routes
]
