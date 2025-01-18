from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from bson import ObjectId
from datetime import datetime
from users.mongodb import db  # Import db from users.mongodb instead

# Get the jobs collection from the existing db connection
jobs_collection = db["jobs"]


@csrf_exempt
@api_view(["GET", "POST"])
def job_list(request):
    if request.method == "GET":
        try:
            jobs = list(jobs_collection.find())
            # Convert ObjectId to string for JSON serialization
            for job in jobs:
                job["_id"] = str(job["_id"])
            return Response(jobs)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    elif request.method == "POST":
        try:
            job_data = request.data
            job_data["created_at"] = datetime.now()
            job_data["updated_at"] = datetime.now()

            # Handle file upload
            if "notification_pdf" in request.FILES:
                # You'll need to implement file handling logic here
                # For now, we'll just store the filename
                job_data["notification_pdf"] = request.FILES["notification_pdf"].name

            result = jobs_collection.insert_one(job_data)
            job_data["_id"] = str(result.inserted_id)

            return Response(job_data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["GET", "PUT", "DELETE"])
def job_detail(request, pk):
    try:
        job = jobs_collection.find_one({"_id": ObjectId(pk)})
        if not job:
            return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        job["_id"] = str(job["_id"])
        return Response(job)

    elif request.method == "PUT":
        try:
            job_data = request.data
            job_data["updated_at"] = datetime.now()

            # Handle file upload
            if "notification_pdf" in request.FILES:
                job_data["notification_pdf"] = request.FILES["notification_pdf"].name

            jobs_collection.update_one({"_id": ObjectId(pk)}, {"$set": job_data})

            updated_job = jobs_collection.find_one({"_id": ObjectId(pk)})
            updated_job["_id"] = str(updated_job["_id"])
            return Response(updated_job)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == "DELETE":
        try:
            jobs_collection.delete_one({"_id": ObjectId(pk)})
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["GET"])
def job_overview(request):
    try:
        # Fetch only specific fields using MongoDB projection
        jobs = list(
            jobs_collection.find(
                {},
                {
                    "title": 1,
                    "department": 1,
                    "location": 1,
                    "description": 1,
                    "application_link": 1,
                    "_id": 1,
                },
            )
        )

        # Convert ObjectId to string for JSON serialization
        for job in jobs:
            job["_id"] = str(job["_id"])

        return Response(jobs)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(["GET"])
def job_overview_detail(request, pk):
    try:
        # Fetch specific fields for a single job using MongoDB projection
        job = jobs_collection.find_one(
            {"_id": ObjectId(pk)},
            {
                "title": 1,
                "department": 1,
                "location": 1,
                "description": 1,
                "application_link": 1,
                "_id": 1,
            },
        )

        if not job:
            return Response(status=status.HTTP_404_NOT_FOUND)

        # Convert ObjectId to string for JSON serialization
        job["_id"] = str(job["_id"])

        return Response(job)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
