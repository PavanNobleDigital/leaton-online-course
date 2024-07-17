from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

SKILL_LEVEL = (
    ('easy','Easy'),
    ('medium', 'Medium'),
    ('hard','Hard'),
)

ORDER_STATUS = (
    ('pending','Pending'),
    ('enrolled','Enrolled'),
    ('completed', 'Completed'),
)

LESSION_TYPE = (
    ('video','Video'),
    ('image','Image'),
    ('pdf','PDF'),
)


class Trainer(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    phone = models.CharField(max_length=200, blank=True)
    email = models.EmailField(max_length=70,blank=True,unique=True)

    def __str__(self):
        return self.name

# Extending User Model Using a One-To-One Link
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    phone = models.CharField(max_length=200, blank=True)
    dob = models.DateField(
        help_text = "User's birthdate", null=True, blank=True
                           )
    gender = models.CharField(
        max_length=6,
        choices=[('MALE', 'MALE'), ('FEMALE', 'FEMALE')], blank=True
    )
    registered_date = models.DateTimeField(default=timezone.now)
    health_disclaimer = models.BooleanField(default=False)
    course_enrolled = models.IntegerField(default=0)
    no_of_certificate = models.IntegerField(default=0)
    goals_achived = models.IntegerField(default=0)
    avatar = models.ImageField(blank=True, upload_to='user_avatar')
    bio = models.TextField(blank=True)

    def __str__(self):
        return self.user.username
    





class Course(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    content_structure = models.CharField(max_length=200, blank=True)
    trainer= models.ForeignKey(Trainer, on_delete=models.DO_NOTHING)
    price = models.CharField(max_length=200)
    skill_level = models.CharField(max_length=6, choices=SKILL_LEVEL, default='easy')
    enrollment = models.IntegerField()
    preview_video = models.URLField(blank=True)
    # preview_image = models.URLField(max_length = 200)
    pub_date = models.DateTimeField("date published")

    def __str__(self):
        return self.name


class Section(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name
    

class Chapter(models.Model):
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Lesson(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    section = models.ForeignKey(Section, on_delete=models.CASCADE)
    chapter = models.ForeignKey(Chapter, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    type = models.CharField(max_length=6, choices=LESSION_TYPE, default='easy')
    instruction = models.TextField(blank=True)
    video_url = models.URLField(blank=True)
    image = models.URLField(blank=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    order_num = models.CharField(max_length=70, default='test_order')
    purchase_date = models.DateTimeField(default=timezone.now)
    user = models.OneToOneField(User, on_delete=models.SET_NULL, null=True)
    course = models.OneToOneField(Course, on_delete=models.SET_NULL, null=True)
    price = models.CharField(max_length=70)
    transaction_id = models.CharField(max_length=200)
    status = models.CharField(max_length=20, choices=ORDER_STATUS, default='pending')

    def __str__(self):
        return self.user.first_name + ' - '+ self.order_num




# class Course(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)
#     choice_text = models.CharField(max_length=200)
#     votes = models.IntegerField(default=0)