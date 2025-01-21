from rest_framework import authentication
from rest_framework import exceptions
from django.conf import settings
import jwt
from bson.objectid import ObjectId
from .mongodb import users_collection, admins_collection


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get("Authorization")
        if not auth_header:
            return None

        try:
            # Get the token
            token = auth_header.split(" ")[1]

            # Decode token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

            # Get user from MongoDB
            user_id = payload["user_id"]

            # Try users collection first
            user = users_collection.find_one({"_id": ObjectId(user_id)})
            if user:
                user["user_type"] = "user"
            else:
                # Try admins collection
                user = admins_collection.find_one({"_id": ObjectId(user_id)})
                if user:
                    user["user_type"] = "admin"

            if not user:
                raise exceptions.AuthenticationFailed("User not found")

            # Convert ObjectId to string
            user["_id"] = str(user["_id"])

            return (user, token)

        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed("Token has expired")
        except (jwt.DecodeError, jwt.InvalidTokenError):
            raise exceptions.AuthenticationFailed("Invalid token")
        except Exception as e:
            raise exceptions.AuthenticationFailed(str(e))
