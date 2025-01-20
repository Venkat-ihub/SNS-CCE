from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from bson import ObjectId
from datetime import datetime
from users.mongodb import (
    db,
    users_collection,
)  # Add job_views_collection

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
def job_detail_admin(request, pk):
    try:
        job = jobs_collection.find_one({"_id": ObjectId(pk)})
        if not job:
            return Response(status=status.HTTP_404_NOT_FOUND)

        if request.method == "GET":
            job["_id"] = str(job["_id"])
            return Response(job)

        elif request.method == "PUT":
            update_data = request.data
            # Remove _id if present in update data
            if "_id" in update_data:
                del update_data["_id"]

            # Update the job
            jobs_collection.update_one({"_id": ObjectId(pk)}, {"$set": update_data})

            # Fetch and return updated job
            updated_job = jobs_collection.find_one({"_id": ObjectId(pk)})
            updated_job["_id"] = str(updated_job["_id"])
            return Response(updated_job)

        elif request.method == "DELETE":
            jobs_collection.delete_one({"_id": ObjectId(pk)})
            return Response(status=status.HTTP_204_NO_CONTENT)

    except Exception as e:
        print(f"Error in job_detail_admin: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(["POST"])
def create_job(request):
    try:
        job_data = request.data
        # Add created_at and updated_at fields
        job_data["created_at"] = datetime.now()
        job_data["updated_at"] = datetime.now()
        job_data["views"] = 0
        job_data["status"] = "live"

        # Insert the job
        result = jobs_collection.insert_one(job_data)

        # Fetch and return the created job
        created_job = jobs_collection.find_one({"_id": result.inserted_id})
        created_job["_id"] = str(created_job["_id"])
        return Response(created_job, status=status.HTTP_201_CREATED)
    except Exception as e:
        print(f"Error creating job: {str(e)}")
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@api_view(["GET"])
def job_overview(request):
    try:
        current_date = datetime.now()
        print("Current date:", current_date)

        # Debug print to see what's happening
        print(
            "Fetching jobs with status filter:",
            request.query_params.get("status", "live"),
        )

        # Build query based on status
        query = {}
        status_filter = request.query_params.get("status", "live")

        if status_filter != "all":
            if status_filter == "live":
                query["$or"] = [
                    {"end_date": {"$exists": False}},
                    {"end_date": {"$gt": current_date.strftime("%Y-%m-%d")}},
                    {"status": "live"},
                ]
            elif status_filter == "expired":
                query["$or"] = [
                    {"end_date": {"$lt": current_date.strftime("%Y-%m-%d")}},
                    {"status": "expired"},
                ]

        print("MongoDB query:", query)

        # Fetch all jobs
        jobs = list(jobs_collection.find(query))

        # Process jobs
        for job in jobs:
            job["_id"] = str(job["_id"])
            if "views" not in job:
                job["views"] = 0
            if "status" not in job:
                job["status"] = (
                    "live"
                    if not job.get("end_date")
                    or datetime.strptime(job["end_date"], "%Y-%m-%d") >= current_date
                    else "expired"
                )
            if "department" not in job and "category" in job:
                job["department"] = job["category"]

        return Response(jobs)
    except Exception as e:
        print(f"Error in job_overview: {str(e)}")
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
                "views": 1,
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


@csrf_exempt
@api_view(["POST"])
def save_job(request, pk):
    try:
        user_id = request.data.get("user_id")
        if not user_id:
            return Response(
                {"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Add job_id to user's saved_jobs array if not already present
        users_collection.update_one(
            {"_id": ObjectId(user_id)},
            {"$addToSet": {"saved_jobs": pk}},  # Using addToSet to avoid duplicates
        )

        return Response({"message": "Job saved successfully"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["POST"])
def unsave_job(request, pk):
    try:
        user_id = request.data.get("user_id")
        if not user_id:
            return Response(
                {"error": "User ID is required"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Remove job_id from user's saved_jobs array
        users_collection.update_one(
            {"_id": ObjectId(user_id)}, {"$pull": {"saved_jobs": pk}}
        )

        return Response({"message": "Job removed from saved"})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(["GET"])
def get_saved_jobs(request, user_id):
    try:
        # Get user's saved job IDs
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if not user:
            return Response(
                {"error": "User not found"}, status=status.HTTP_404_NOT_FOUND
            )

        saved_jobs = user.get("saved_jobs", [])

        # Fetch job details for saved jobs
        jobs = []
        for job_id in saved_jobs:
            job = jobs_collection.find_one(
                {"_id": ObjectId(job_id)},
                {
                    "title": 1,
                    "department": 1,
                    "location": 1,
                    "description": 1,
                    "application_link": 1,
                    "views": 1,
                    "_id": 1,
                },
            )
            if job:
                job["_id"] = str(job["_id"])
                jobs.append(job)

        return Response(jobs)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
