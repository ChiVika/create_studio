from django.contrib import admin

# Register your models here.
from .models import *


admin.site.register(Subsidiary)
admin.site.register(Сategories)
admin.site.register(Teachers)
admin.site.register(MasterClass)
admin.site.register(Tariffs)
admin.site.register(Records)



