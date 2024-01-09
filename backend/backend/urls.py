"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from app.views import *

urlpatterns = [
    #general views 
    path('admin/', admin.site.urls),
    path('user/', UserView.as_view()),
    path('trip/', TripView.as_view()),
    path('trip_user/', TripUserView.as_view()),
    path('expense/', ExpenseView.as_view()),
    path('expense_user/', ExpenseUserView.as_view()),
    
    #details
    path('user/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),
    path('trip/<int:trip_id>/', TripDetailView.as_view(), name='trip-detail'),
    path('trip/<int:trip_id>/expenses/', TripExpensesView.as_view(), name='trip-expenses'),
    path('expense/<int:expense_id>/', ExpenseDetailView.as_view(), name='expense-detail'),
    # path('expense/<int:trip_id>/',ExpenseSummaryView.as_view(), name='trip-expense-summary'),
    
    #deletes
    path('user/<int:user_id>/remove_user/', DeleteUserView.as_view(), name='remove-user'),
    path('trip/<int:trip_id>/remove_trip/', DeleteTripView.as_view(), name='remove-trip'),
    path('expense/<int:expense_id>/remove_expense/', DeleteExpenseView.as_view(), name='remove-expense'),
    
    path('trip/<int:trip_id>/remove_user/<int:user_id>/', DeleteUserFromTripView.as_view(), name='remove-user-from-trip'),
    path('expense/<int:expense_id>/remove_user/<int:user_id>/', DeleteUserFromExpenseView.as_view(), name='remove-user-from-expense'),
    
    


    
    
]
