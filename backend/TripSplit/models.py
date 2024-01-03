from django.db import models


class User(models.Model):
    name = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=254, null=True, blank=True)
    
    def __str__(self):
        if self.email is None:
            return self.name
        else: 
            return f"{self.name} ({self.email})"

class Trip(models.Model):
    name = models.CharField(max_length=50)
    date_start = models.DateField()
    date_end = models.DateField()
    image = models.ImageField(upload_to='trip_images/', null=True, blank=True)
    people = models.ManyToManyField(User, through='TripUser')

    def __str__(self):
        return self.name
    
    def total_expenses(self):
        return sum(expense.amount for expense in self.expense_set.all())

class TripUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.name} - {self.trip.name}"

class Expense(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payer = models.ForeignKey(User, on_delete=models.CASCADE, related_name='expenses_paid')
    participants = models.ManyToManyField(User, through='ExpenseUser', related_name='expenses_participated')
    date = models.DateTimeField()

    def __str__(self):
        return f"{self.name} - ({self.amount} PLN)"
    
class ExpenseUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.ForeignKey(Expense, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.name} - {self.expense.name}"