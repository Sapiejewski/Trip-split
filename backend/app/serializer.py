from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["name", "email"]


class TripSerializer(serializers.ModelSerializer):
    people_details = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ["name", "date_start", "date_end", "people_details"]

    def get_people_details(self, obj):
        # Serializing the User objects related to this Trip instance
        people = obj.people.all()
        return UserSerializer(people, many=True).data


class TripUserSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = TripUser
        fields = ["user", "trip"]
        
class ExpenseSerializer(serializers.ModelSerializer):
    payer_details = serializers.SerializerMethodField()
    participants_details = serializers.SerializerMethodField()

    class Meta:
        model = Expense
        fields = ["trip", "name", "amount", "payer", "payer_details", "participants_details", "date"]

    def get_payer_details(self, obj):
        return UserSerializer(obj.payer).data

    def get_participants_details(self, obj):
        participants = obj.participants.all()
        return UserSerializer(participants, many=True).data


class ExpenseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseUser
        fields = ["user", "expense"]
