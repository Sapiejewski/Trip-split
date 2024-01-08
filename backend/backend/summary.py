"""
Ten plik ma za zadanie przygotować funkcjonalność umożliwiającą po liczenie 
należności dla poszczególnych osób w obrębie danej wycieczki

Nie jest od przeznaczony do wykorzystania w innych przypadkach
"""

import sqlite3 as sq3
from decimal import Decimal

def _get_data_from_db_for_trip(trip_id : int) -> dict | None:
    """

    """
    try:
        data = sq3.connect("/Users/piotrbauer/Documents/SGGW/Semestr_5/Architektura_oprogramowania/Trip-split/backend/db.sqlite3")
    except FileExistsError as e:
        print("Nastąpił problem z odczytem bazy danych")
        return
    


    command = f'''SELECT app_expense.id, app_expense.amount, app_expense.payer_id, app_expenseuser.user_id
FROM app_expense
LEFT JOIN app_expenseuser ON app_expenseuser.expense_id = app_expense.id
WHERE app_expense.trip_id = {trip_id}
ORDER BY app_expense.payer_id;
'''
    rows = data.execute(command)

    transactions = dict()
    keys = []

    for r in rows:
        id, amount, payer, buyer = r
        if id not in keys:
            keys.append(id)
            transactions[id] = {"amount":amount, "payer":payer, "buyers" : []}
        transactions[id]["buyers"].append(buyer)

    print("\nTransakcje")
    for t in transactions:
        print(transactions[t])

    command = f'''SELECT user_id FROM app_tripuser WHERE trip_id = {trip_id}'''
    rows = data.execute(command)

    participants = []
    for p in rows: participants.append(p[0])

    print("\nUczestnicy")
    for p in participants:
        print(p)

    command = f'''SELECT id,name,email FROM app_user WHERE id IN (SELECT user_id FROM app_tripuser WHERE trip_id = {trip_id})'''
    rows = data.execute(command)

    participatns_data = {}

    for r in rows:
        id, name, email = r
        participatns_data[id] = {'name':name, 'email':email}
    
    print("\nDane uczestników")
    for d in participatns_data:
        print(participatns_data[d])

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
    
    print("\nMacierz zależności")
    for r in transaction_matrix:
        for p in r:
            print(p, end=' ')
        print()

    print("\nPodsumowanie tekstowe macierzy")
    for i in range(len(transaction_matrix)):
        have_debtors = bool(any(transaction_matrix[i]))
        payer_name, payer_email = participatns_data[i+1].values()
        if not have_debtors:
            print(f"{payer_name} ({payer_email}) nie ma dłużników)")
            continue
        for j in range(i,len(transaction_matrix)):
            if transaction_matrix[i][j]:
                debtor_name, debtor_email = participatns_data[j+1].values()
                print(f"{debtor_name} ({debtor_email}) jest winny {payer_name} ({payer_email}) : {-transaction_matrix[i][j]} zł")
    data.close()

# odebranie zlecenia

# policzenie kosztorysu

# generowanie pliku

if __name__ == "__main__":
    _get_data_from_db_for_trip(1)
    ...