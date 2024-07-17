from django.contrib import admin
from .models import Course, Section, Chapter, Lesson, UserProfile, Trainer, Order
# from .models import UserProfile


class CourseModelAdmin(admin.ModelAdmin):
    list_display=('name', 'trainer', 'price', 'enrollment')
    search_fields=('name', 'trainer')
    list_per_page = 5


class SectionModelAdmin(admin.ModelAdmin):
    list_display=('name', 'course')
    search_fields=('name', 'course__name')
    list_per_page = 5


admin.site.register(Course, CourseModelAdmin)
admin.site.register(Section, SectionModelAdmin)
admin.site.register(Chapter)
admin.site.register(Lesson)
admin.site.register(UserProfile)
admin.site.register(Trainer)
admin.site.register(Order)
# admin.site.register(UserProfile)

