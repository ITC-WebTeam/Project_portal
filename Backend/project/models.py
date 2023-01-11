from django.db import models

class UserDetails(models.Model):
    roll_number = models.CharField(max_length = 255)
    name = models.CharField(max_length = 500, blank = True, null = True)
    topskills = models.CharField(max_length = 2000, blank = True, null = True)
    skills = models.CharField(max_length = 2000, blank = True, null = True)
    resume = models.FileField(blank = True, null = True)
    def __str__(self):
        return f"{self.roll_number}"
