from django.contrib import admin
from .models import Students, SAGBureau, FinancialBureau
# Register your models here
admin.site.register(Students)
admin.site.register(SAGBureau)
admin.site.register(FinancialBureau)
