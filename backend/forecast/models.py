from django.db import models

# Create your models here.

class Forecast(models.Model):
    date = models.DateTimeField()
    location = models.CharField(max_length=120)
    forecasted_sales_quantity = models.FloatField()
