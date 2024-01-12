from collections import defaultdict
from django.http import JsonResponse
from .models import *
import json

def calculate_debts(trip_id):
    # Get all the expenses of the trip
    expenses = Expense.objects.filter(trip=trip_id)
    users = TripUser.objects.filter(trip=trip_id)
    debtArray = defaultdict(dict)
    
    if len(expenses) == 0 or len(users) == 0:
        return []
    
    for expense in expenses:
        if len(expense.participants.all()) == 0:
            continue
        
        amount_per_user = expense.amount / (len(expense.participants.all()) + 1)
        payer_id = expense.payer.id
        participants_ids = [participant.id for participant in expense.participants.all()]

        for user_id in participants_ids:
            if user_id != payer_id:
                newAmount = amount_per_user
                
                if user_id not in debtArray:
                    debtArray[user_id] = defaultdict(dict)
                    
                if user_id in debtArray[payer_id]:
                    if debtArray[payer_id][user_id] > amount_per_user:
                        debtArray[payer_id][user_id] -= amount_per_user
                        newAmount = 0
                    else:
                        newAmount = amount_per_user - debtArray[payer_id][user_id]
                        del debtArray[payer_id][user_id]
                debtArray[user_id][payer_id] = newAmount
    
    # delete empty dicts
    debtArray = {k: v for k, v in debtArray.items() if v}

    transformed_data = [
        {"userId": user_id, "debts": [{"debtorId": debtor_id, "amount": amount} for debtor_id, amount in debt.items()]}
        for user_id, debt in debtArray.items()
    ]

    return JsonResponse(transformed_data, safe=False)
