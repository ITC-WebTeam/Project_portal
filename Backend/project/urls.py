from django.urls import path,include
from . import views 

urlpatterns = [
    path('userdata',views.posts)
]