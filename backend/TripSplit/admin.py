from django.contrib import admin
from .models import Trip
from .models import User
from .models import Expense
from .models import TripUser
from .models import ExpenseUser

admin.site.register([Trip, User, Expense, TripUser, ExpenseUser])
