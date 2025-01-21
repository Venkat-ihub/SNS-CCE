from rest_framework import permissions

class IsMongoDBAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user 
            and isinstance(request.user, dict)
            and request.user.get('user_type') == 'admin'
        ) 