"""
Ten plik ma za zadanie przygotować funkcjonalność umożliwiającą po liczenie 
należności dla poszczególnych osób w obrębie danej wycieczki

Nie jest od przeznaczony do wykorzystania w innych przypadkach

Możliwe do użycia funkcje, ich parametry oraz wyniki
get_transactions_list   |   id transakcji   |   
"""

import sqlite3 as sq3
from decimal import Decimal
import pathlib

dtbpath = str(pathlib.Path(__file__).parent.parent.resolve()) + "/db.sqlite3"
DEBUG = True

# PRIVATE

def _get_transactions_for_trip(trip_id : int):
    """
    Ta funkcja odpowiada za wyciągnięcie podsumowania transakcji
    struktura to: kiedy, co, za ile, kto płacił, dla kogo

    return -> keys, transactions
    """
    try:
        data = sq3.connect(dtbpath)
    except FileExistsError as e:
        print("Nastąpił problem z odczytem bazy danych")
        return
    


    command = f'''SELECT app_expense.id, app_expense.amount, app_expense.date, app_expense.payer_id, app_expense.name, app_expenseuser.user_id
FROM app_expense
LEFT JOIN app_expenseuser ON app_expenseuser.expense_id = app_expense.id
WHERE app_expense.trip_id = {trip_id}
ORDER BY app_expense.payer_id;
'''
    rows = data.execute(command)

    transactions = dict()
    keys = []

    for r in rows:
        id, amount, date, payer, name, buyer = r
        if id not in keys:
            keys.append(id)
            transactions[id] = {"date": date, "name": name, "amount":amount, "payer":payer, "buyers" : []}
        transactions[id]["buyers"].append(buyer)

    data.close()

    return keys,transactions

def _get_trip_participants(trip_id : int):
    """
    Ta funkcja ma za zadanie zwrócić informację nt. tego kto brał udział w wycieczce,
    (jako listę id), a także szczegóły tych osób w formacie dla człowieka (imię, email)

    return -> participants
    """
    try:
        data = sq3.connect(dtbpath)
    except FileExistsError as e:
        print("Nastąpił problem z odczytem bazy danych")
        return
    
    command = f'''SELECT id,name,email FROM app_user WHERE id IN (SELECT user_id FROM app_tripuser WHERE trip_id = {trip_id})'''
    rows = data.execute(command)

    participants_data = {}

    for r in rows:
        id, name, email = r
        participants_data[id] = {'name':name, 'email':email}

    data.close()

    return list(participants_data.keys()), participants_data

def _get_data_from_db_for_trip(trip_id : int) -> dict | None:
    """

    """

    ans = _get_transactions_for_trip(trip_id)
    if type(ans) == None: return
    else: keys, transactions = ans

    ans = _get_trip_participants(trip_id)
    if type(ans) == None: return
    else: participants, participants_data = ans

    if DEBUG:
        print("\nTransakcje")
        for t in transactions: print(transactions[t])

        print("\nUczestnicy")
        for p in participants: print(p)

        print("\nDane uczestników")
        for d in participants_data: print(participants_data[d])

    transaction_matrix = [[Decimal(0) for _ in range(len(participants))] for _ in range(len(participants))]

    for t in transactions:
        trans = transactions[t]
        payer = int(trans['payer'])
        rem_pper = Decimal(trans['amount']/len(trans['buyers'])) # remaining amount per person
        if payer in trans['buyers']:
            idx = trans['buyers'].index(payer)
            debtors = trans['buyers'][:idx] + trans['buyers'][idx+1:]
        else:
            debtors = trans['buyers']
        payer -= 1 # correction key to list index
        for d in debtors:
            d = int(d) - 1 # correction key to list index
            transaction_matrix[payer][d] -= rem_pper
            transaction_matrix[d][payer] += rem_pper
    
    if DEBUG:
        print("\nMacierz zależności")
        for r in transaction_matrix:
            for p in r:
                print(p, end=' ')
            print()

    finall_response = []

    print("\nPodsumowanie tekstowe macierzy")
    for i in range(len(transaction_matrix)):
        have_debtors = bool(any(transaction_matrix[i]))
        payer_name, payer_email = participants_data[i+1].values()
        if not have_debtors:
            ans = f"{payer_name} ({payer_email}) nie ma dłużników)"
            finall_response.append(ans)
            if DEBUG: print(ans)
            continue
        for j in range(i,len(transaction_matrix)):
            if transaction_matrix[i][j]:
                debtor_name, debtor_email = participants_data[j+1].values()
                ans = f"{debtor_name} ({debtor_email}) jest winny {payer_name} ({payer_email}) : {-transaction_matrix[i][j]} zł"
                finall_response.append(ans)
                if DEBUG: print(ans)

# PUBLIC / API

def get_transactions_list(trip_id : int) -> list:
    return _get_transactions_for_trip(trip_id)[1]

if __name__ == "__main__":
    
    if DEBUG:
        _get_data_from_db_for_trip(1)
    else:
        print(__doc__)
    ...