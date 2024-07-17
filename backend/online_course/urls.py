from django.urls import path

from . import views

app_name = 'main'



urlpatterns = [
    # Add section to course
    path('section/add', views.SectionToCourseAPIView.as_view(), name='SectionToCourseAPIView'),

    # Add User authentication links
    path('testapi/', views.testapi, name='testapi'),
    path('user_login/', views.UserLoginView.as_view(), name='UserLoginView'),
    path('user_register/', views.UserRegistration.as_view(), name='UserRegistration'),
    path('user_logout/', views.UserLogout.as_view(), name='UserLogout'),
    path('user_details/', views.UserDetails.as_view(), name='UserDetails'),
    path('user_enrolled_courses/', views.UserEnrolledCourse.as_view(), name='UserEnrolledCourse'),
    path('user_order_history/', views.UserOrderHistory.as_view(), name='UserOrderHistory'),
    path('user_profile_settings/', views.UserProfileSetting.as_view(), name='UserProfileSetting'),
    path('user_password_reset/', views.UserPasswordSet.as_view(), name='UserPasswordSet'),

    # Other Pages
    path('health-disclaimer/', views.UserHealthDisclaimer.as_view(), name='UserHealthDisclaimer'),
    path('trainer/<int:trainerId>/', views.TrainerDetails.as_view(), name='TrainerDetails'),
    path('faqs/', views.FaqList.as_view(), name='FaqList'),
    

    # Course Pages
    path('courses/all/', views.CourseListAPI.as_view(), name='CourseListAPI'),
    path('courselist/', views.courselist, name='courselist'),
    path('coursedetails/<int:courseId>', views.coursedetails, name='coursedetails'),


    # Information
    path('contact_info/', views.ContactDetailsList.as_view(), name='ContactDetailsList'),
    path('footer_menu/', views.FooterContentAPI.as_view(), name='FooterContentAPI'),
    path('primary_menu/', views.PrimaryMenuContentAPI.as_view(), name='PrimaryMenuContentAPI'),

    # Cart and checkout
    path('checkout/', views.CheckoutCourse.as_view(), name='CheckoutCourse'),
]


