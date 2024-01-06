from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *

# Create your views here.


class UserView(APIView):
    serializer_class = UserSerializer

    def get(self, request):
        output = [
            {"name": output.name, "email": output.email}
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

