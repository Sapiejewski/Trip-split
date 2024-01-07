from collections import defaultdict
from decimal import Decimal

from django.shortcuts import get_object_or_404, render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import *
from .serializer import *

# Create your views here.


class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        output = [
            {"id": output.id, "name": output.name, "email": output.email}
            for output in User.objects.all()
        ]
        return Response(output)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class TripView(APIView):
    serializer_class = TripSerializer

    def get(self, request):
        trips = Trip.objects.all()
        serializer = TripSerializer(trips, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TripSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class TripUserView(APIView):
    serializer_class = TripUserSerializer

    def get(self, request):
        trip_users = TripUser.objects.all()
        # Serialize the data
        serializer = TripUserSerializer(trip_users, many=True)
        # Return serialized data
        return Response(serializer.data)

    def post(self, request):
        serializer = TripUserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ExpenseView(APIView):
    serializer_class = ExpenseSerializer

    def get(self, request):
        expenses = Expense.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


class ExpenseUserView(APIView):
    serializer_class = ExpenseUserSerializer

    def get(self, request):
        expense_users = ExpenseUser.objects.all()
        serializer = ExpenseUserSerializer(expense_users, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExpenseUserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


##### DELETES
class DeleteUserFromTripView(APIView):
    def delete(self, request, trip_id, user_id):
        try:
            trip_user = TripUser.objects.get(trip_id=trip_id, user_id=user_id)
            # Serialize the data before deletion
            trip_user_data = TripUserSerializer(trip_user)
            # Perform deletion
            trip_user.delete()
            # Return the serialized data of the deleted object
            return Response(trip_user_data, status=status.HTTP_200_OK)
        except TripUser.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, trip_id, user_id):
        deleted_users = TripUser.objects.get(trip_id=trip_id, user_id=user_id)
        serializer = TripUserSerializer(deleted_users)
        return Response(serializer.data)


class DeleteUserView(APIView):
    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            # Serialize the data before deletion
            user_data = UserSerializer(user).data
            # Perform deletion
            user.delete()
            # Return the serialized data of the deleted object
            return Response(user_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, user_id):
        deleted_users = User.objects.get(id=user_id)
        serializer = UserSerializer(deleted_users)
        return Response(serializer.data)


class DeleteUserFromExpenseView(APIView):
    def delete(self, request, expense_id, user_id):
        try:
            expense_user = ExpenseUser.objects.get(
                expense_id=expense_id, user_id=user_id
            )
            # Serialize the data before deletion
            expense_user_data = ExpenseUserSerializer(expense_user).data
            # Perform deletion
            expense_user.delete()
            # Return the serialized data of the deleted object
            return Response(expense_user_data, status=status.HTTP_200_OK)
        except ExpenseUser.DoesNotExist:
            return Response(
                {"error": "ExpenseUser not found"}, status=status.HTTP_404_NOT_FOUND
            )

    def get(self, request, expense_id, user_id):
        try:
            deleted_users = ExpenseUser.objects.get(
                expense_id=expense_id, user_id=user_id
            )
            serializer = ExpenseUserSerializer(deleted_users)
            return Response(serializer.data)
        except ExpenseUser.DoesNotExist:
            return Response(
                {"error": "ExpenseUser not found"}, status=status.HTTP_404_NOT_FOUND
            )


class DeleteTripView(APIView):
    def delete(self, request, trip_id):
        try:
            trip = Trip.objects.get(id=trip_id)
            # Serialize the data before deletion
            trip_data = TripSerializer(trip).data
            # Perform deletion
            trip.delete()
            # Return the serialized data of the deleted object
            return Response(trip_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, trip_id):
        deleted_trip = Trip.objects.get(id=trip_id)
        serializer = TripSerializer(deleted_trip)
        return Response(serializer.data)


class DeleteExpenseView(APIView):
    def delete(self, request, expense_id):
        try:
            expense = Expense.objects.get(id=expense_id)
            # Serialize the data before deletion
            expense_data = ExpenseSerializer(expense).data
            # Perform deletion
            expense.delete()
            # Return the serialized data of the deleted object
            return Response(expense_data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "Not found"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, expense_id):
        expense_trip = Expense.objects.get(id=expense_id)
        serializer = ExpenseSerializer(expense_trip)
        return Response(serializer.data)


class UserDetailView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class TripDetailView(APIView):
    def get(self, request, trip_id):
        trip = get_object_or_404(Trip, id=trip_id)
        serializer = TripSerializer(trip)
        return Response(serializer.data)


class ExpenseDetailView(APIView):
    def get(self, request, expense_id):
        expense = get_object_or_404(Expense, id=expense_id)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)
