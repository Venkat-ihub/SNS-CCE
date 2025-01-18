from admin.views import app as admin_app

# Register the admin blueprint
app.register_blueprint(admin_app, url_prefix="/admin")
