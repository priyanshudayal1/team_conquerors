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
    dob = models.CharField(max_length=10, null = True)
    transaction_id = models.CharField(max_length=50, null = True, blank = True)
    address = models.TextField(null=True)
    feedback = models.TextField(null=True, blank=True)
    feedback_given = models.BooleanField(default=False)
    documents = models.JSONField(null=True, blank=True)
    def __str__(self):
        return self.name  
    
class SAGBureau(models.Model):
    email = models.EmailField()
    name=models.CharField(max_length=255,null=True,blank=True)
    password = models.CharField(max_length=255)
    list_of_students = models.JSONField(null=True, blank=True)
    def __str__(self):
        return self.email
    def save(self, *args, **kwargs):
        self.name=self.email
        super(SAGBureau, self).save(*args, **kwargs)
    
class FinancialBureau(models.Model):
    name=models.CharField(max_length=255,null=True,blank=True)
    email = models.EmailField()
    password = models.CharField(max_length=255)
    list_of_students = models.JSONField(null=True, blank=True)
    def __str__(self):
        return self.email
    def save(self, *args, **kwargs):
        self.name=self.email
        super(FinancialBureau, self).save(*args, **kwargs)