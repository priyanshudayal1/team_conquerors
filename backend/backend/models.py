from django.db import models

# Create your models here.

class Students(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    college = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    account_number = models.CharField(max_length=255)
    ifsc = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255)
    income = models.IntegerField()
    class10_percent= models.FloatField()
    class12_percent= models.FloatField()
    status=models.IntegerField(default=0)
    phone = models.CharField(max_length=10)
    documents = models.JSONField()
    def __str__(self):
        return self.name  
    
class SAGBureau(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=255)
    list_of_students = models.JSONField()
    def __str__(self):
        return self.name
    
class FinancialBureau(models.Model):
    email = models.EmailField()
    password = models.CharField(max_length=255)
    list_of_students = models.JSONField()
    def __str__(self):
        return self.name