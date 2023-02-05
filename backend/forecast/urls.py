from django.urls import path

from . import views

urlpatterns = [
    path('', views.fourteen_days, name='index'),
    path('procurement', views.fourteen_days, name='procurement'),
    path('director', views.some_view, name='director'),
]
