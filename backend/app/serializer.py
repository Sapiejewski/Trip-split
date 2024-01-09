from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "name", "email"]

class TripSerializer(serializers.ModelSerializer):
    people_details = serializers.SerializerMethodField()
    total_expenses = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ["id", "name", "date_start", "date_end", "people_details", "total_expenses" ,"background"]

    def get_people_details(self, obj):
        # Serializing the User objects related to this Trip instance
        people = obj.people.all()
        return UserSerializer(people, many=True).data
    
    def get_total_expenses(self, obj):
        return obj.total_expenses()



class TripUserSerializer(serializers.ModelSerializer):
    trip_name = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = TripUser
        fields = ["user", "user_name", "trip", "trip_name"]

    def get_trip_name(self, obj):
        return obj.trip.name

    def get_user_name(self, obj):
        return obj.user.name


class ExpenseSerializer(serializers.ModelSerializer):
    trip_name = serializers.SerializerMethodField()
    payer_details = serializers.SerializerMethodField()
    participants_details = serializers.SerializerMethodField()
    participant_ids = serializers.ListField(write_only=True, child=serializers.IntegerField())
    class Meta:
        model = Expense
        fields = [
            "trip",
            "trip_name",
            "id",
            "name",
            "amount",
            "payer",
            "payer_details",
             "participant_ids",
            "participants_details",
            "date",
        ]

    def get_payer_details(self, obj):
        return UserSerializer(obj.payer).data

    def get_participants_details(self, obj):
        participants = obj.participants.all()
        return UserSerializer(participants, many=True).data

    def get_trip_name(self, obj):
        return obj.trip.name
    
    def create(self, validated_data):
        participant_ids = validated_data.pop('participant_ids', [])
        expense = Expense.objects.create(**validated_data)

        # Add participants to the expense
        for participant_id in participant_ids:
            participant = User.objects.get(id=participant_id)
            expense.participants.add(participant)

        return expense


class ExpenseUserSerializer(serializers.ModelSerializer):
    expense_name = serializers.SerializerMethodField()
    user_name = serializers.SerializerMethodField()

    class Meta:
        model = ExpenseUser
        fields = ["user", "user_name", "expense", "expense_name"]

    def get_expense_name(self, obj):
        return obj.expense.name

    def get_user_name(self, obj):
        return obj.user.name

