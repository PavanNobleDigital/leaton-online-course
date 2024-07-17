from django.shortcuts import render, redirect
from django.http import Http404
from django.http import HttpResponse
from django.views import generic
from rest_framework import generics, response, status
from django.utils import timezone
from .models import Course, Chapter, Lesson, UserProfile, Section, Trainer, Order
from django.contrib.auth.models import User
from .forms import NewUserForm, UserProfileForm
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from django.core import serializers
from django.http import JsonResponse
from .serializers import CourseSerializer, SectionSerializer, UserRegistrationView, CheckoutCourseSerializer, OrderHistorySerializer, UserProfileSerializer
from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated



##################################################
##################################################
###                                            ###
###   User Registration API                    ### 
###                                            ###
##################################################
##################################################  



class UserRegistration(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationView



##################################################
##################################################
###                                            ###
###   User Login API                           ### 
###                                            ###
##################################################
##################################################  



class UserLoginView(APIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            profileObj = UserProfile.objects.get(user=user)
            return Response({
                'token': token.key, 'user': {
                    'full_name': user.get_full_name(), 'name': user.username,
                    'disclaimer': profileObj.health_disclaimer}
            })
        else:
            return Response({'error': 'Invalid credentials'}, status=401)
        


##################################################
##################################################
###                                            ###
###   User Logout API                          ### 
###                                            ###
##################################################
##################################################  



class UserLogout(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, format=None):
        # simply delete the token to force a login
        request.user.auth_token.delete()
        return Response({"Loggedout": True}, status=status.HTTP_200_OK)
    


##################################################
##################################################
###                                            ###
###   Health Disclaimer API                    ### 
###                                            ###
##################################################
##################################################  

class UserHealthDisclaimer(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        profileObj = UserProfile.objects.get(user=request.user)
        content = 'LLorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lacinia augue tellus, ut rutrum eros luctus nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus nisi arcu, tincidunt vel commodo non, accumsan nec ligula. Vestibulum a lobortis ante, vitae lobortis massa. Vestibulum sit amet nulla eget dolor rhoncus ultrices quis id dolor. Nulla ornare lacinia urna vitae consequat. Morbi ac semper augue. Pellentesque enim sapien, semper nec condimentum fermentum, maximus nec erat. Nam porttitor vel nisi vitae convallis.'
        return Response({"Content": content, "health_disclaimer_accepted": profileObj.health_disclaimer, 'User': "This user has already accepted the Disclaimer"})
    
    def post(self, request):
        profileObj = UserProfile.objects.get(user=request.user)
        if profileObj.health_disclaimer:
            return Response({
                'response': 'You are already aceepted the disclaimer',
                'user': {
                    'full_name': request.user.get_full_name(), 'name': request.user.username,
                    'disclaimer': profileObj.health_disclaimer
                },
                'success': False})
        else:
            profileObj.health_disclaimer = True
            profileObj.save()
            return Response({
                'response': 'Thanks for accepting the disclaimer', 'success': False,
                'user': {
                    'full_name': request.user.get_full_name(), 'name': request.user.username,
                    'disclaimer': profileObj.health_disclaimer
                }
            })
        
        





##################################################
##################################################
###                                            ###
###   Footer Content API                       ### 
###                                            ###
##################################################
##################################################  
    
class FooterContentAPI(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        true = True
        false = False
        footer_content = {
                "footer_content": [
                  {
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vitae nisi scelerisque, placerat diam quis, viverra augue. Fusce ac massa in dui gravida posuere. Maecenas semper.",
                    "descriptionTwo": "Morbi quis arcu vel ipsum blandit molestie. Praesent condimentum est mauris, in efficitur orci vehicula quis.",
                    "phone": "+64 22 166 8145",
                    "mail": "robin@leaton.com-",
                    "address": "Auckland, New Zealand",
                    "usefulLinks": [
                      {
                        "text": "FAQ",
                        "link": "/faqs"
                      },
                      {
                        "text": "Privacy Policy",
                        "link": "#"
                      },
                      {
                        "text": "Our Misson",
                        "link": "/our-mission"
                      },
                      {
                        "text": "Contact Us",
                        "link": "/contact-us"
                      }
                    ],
                    "ourCompany": [
                      {
                        "text": "Contact Us",
                        "link": "/contact-us"
                      },
                      {
                        "text": "About Robin",
                        "link": "/trainer/1"
                      }
                    ],
                    "socialLink": [
                      {
                        "icon": "feather-facebook",
                        "link": "#"
                      },
                      {
                        "icon": "feather-twitter",
                        "link": "#"
                      },
                      {
                        "icon": "feather-instagram",
                        "link": "#"
                      },
                      {
                        "icon": "feather-linkedin",
                        "link": "#"
                      }
                    ]
                  }
                ]
              }
  
        return Response(footer_content)
    



##################################################
##################################################
###                                            ###
###   COURSES LIST  API                        ### 
###                                            ###
##################################################
##################################################
    
    
def courselist(request):
    true = True
    false = False
    course_list = {
    "courseDetails": [
      {
        "id": 1,
        "user_enrolled": false,
        "courseTitle": "Leaton Back Revive Program - Django 1",
        "category": "Fitness",
        "courseType": "featured",
        "desc": "This is the description for this particular Couser. You can read more about this course if you are curious",
        "lesson": 12,
        "review": 15,
        "price": 70,
        "offPrice": 20,
        "student": 50,
        "discount": 40,
        "sellsType": "Bestseller",
        "star": "4.8",
        "ratingNumber": "215,475",
        "studentNumber": "616,029",
        "cateSmallImg": "/images/category/web-design.png",
        "cateBigImg": "/images/category/image/web-design.jpg",
        "userImg": "/images/client/avatar-02.png",
        "courseImg": "/images/course/course-01.jpg",
        "courseListImg": "/images/course/course-list-01.jpg",
        "awardImg": "/images/icons/card-icon-1.png",
        "days": "3",
        "isActiveCate": true,
        "userName": "Robin Leaton",
        "userCategory": "Fitness",
        "cateDesc": "Fitness",
        "date": "12/2024",
        "language": "English",
        "courseAward": "Certified Course",
        "courseFor": ["Fitness", "Development"]
      },
      {
        "id": 2,
        "user_enrolled": false,
        "courseTitle": "Leaton Back Revive Program - 2",
        "category": "Fitness",
        "courseType": "featured",
        "desc": "This is the description for this particular Couser. You can read more about this course if you are curious",
        "lesson": 12,
        "review": 15,
        "price": 70,
        "offPrice": 20,
        "student": 50,
        "discount": 40,
        "sellsType": "Bestseller",
        "star": "4.8",
        "ratingNumber": "215,475",
        "studentNumber": "616,029",
        "cateSmallImg": "/images/category/web-design.png",
        "cateBigImg": "/images/category/image/web-design.jpg",
        "userImg": "/images/client/avatar-02.png",
        "courseImg": "/images/course/course-01.jpg",
        "courseListImg": "/images/course/course-list-01.jpg",
        "awardImg": "/images/icons/card-icon-1.png",
        "days": "3",
        "isActiveCate": true,
        "userName": "Robin Leaton",
        "userCategory": "Fitness",
        "cateDesc": "Fitness",
        "date": "12/2024",
        "language": "English",
        "courseAward": "Certified Course",
        "courseFor": ["Fitness", "Development"]
      }
    ]
  }
  
    return JsonResponse(course_list)


class CourseListAPI(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        true = True
        false = False
        course_list = {
            "courseDetails": [
              {
                  "id": 1,
                  "user_enrolled": false,
                  "courseTitle": "Leaton Back Revive Program - API 1",
                  "category": "Fitness",
                  "courseType": "featured",
                  "desc": "This is the description for this particular Couser. You can read more about this course if you are curious",
                  "lesson": 12,
                  "review": 15,
                  "price": 70,
                  "offPrice": 20,
                  "student": 50,
                  "discount": 40,
                  "sellsType": "Bestseller",
                  "star": "4.8",
                  "ratingNumber": "215,475",
                  "studentNumber": "616,029",
                  "cateSmallImg": "/images/category/web-design.png",
                  "cateBigImg": "/images/category/image/web-design.jpg",
                  "userImg": "/images/client/avatar-02.png",
                  "courseImg": "/images/course/course-01.jpg",
                  "courseListImg": "/images/course/course-list-01.jpg",
                  "awardImg": "/images/icons/card-icon-1.png",
                  "days": "3",
                  "isActiveCate": true,
                  "userName": "Robin Leaton",
                  "userCategory": "Fitness",
                  "cateDesc": "Fitness",
                  "date": "12/2024",
                  "language": "English",
                  "courseAward": "Certified Course",
                  "courseFor": ["Fitness", "Development"]
              },{
                  "id": 2,
                  "user_enrolled": false,
                  "courseTitle": "Leaton Upper Body Program - API 2",
                  "category": "Fitness",
                  "courseType": "featured",
                  "desc": "This is the description for this particular Couser. You can read more about this course if you are curious",
                  "lesson": 12,
                  "review": 15,
                  "price": 70,
                  "offPrice": 20,
                  "student": 50,
                  "discount": 40,
                  "sellsType": "Bestseller",
                  "star": "4.8",
                  "ratingNumber": "215,475",
                  "studentNumber": "616,029",
                  "cateSmallImg": "/images/category/web-design.png",
                  "cateBigImg": "/images/category/image/web-design.jpg",
                  "userImg": "/images/client/avatar-02.png",
                  "courseImg": "/images/course/course-01.jpg",
                  "courseListImg": "/images/course/course-list-01.jpg",
                  "awardImg": "/images/icons/card-icon-1.png",
                  "days": "3",
                  "isActiveCate": true,
                  "userName": "Robin Leaton",
                  "userCategory": "Fitness",
                  "cateDesc": "Fitness",
                  "date": "12/2024",
                  "language": "English",
                  "courseAward": "Certified Course",
                  "courseFor": ["Fitness", "Development"]
              }
            ]
        }
        return Response(course_list)
    


##################################################
##################################################
###                                            ###
###   COURSES Details API                      ### 
###                                            ###
##################################################
##################################################
    

    
def coursedetails(request, courseId=1):
    cid = courseId
    true = True
    false = False
    course_details = {
  "courseDetails": [
    {
      "id": 1,
      "enrolled": true,
      "courseTitle": "Leaton Back Revive Program - Django",
      "category": "Fitness",
      "courseType": "featured",
      "desc": "This is the description for this particular Couser. You can read more about this course if you are curious",
      "lesson": 12,
      "review": 15,
      "price": 70,
      "offPrice": 20,
      "student": 50,
      "discount": 40,
      "sellsType": "Bestseller",
      "star": "4.8",
      "ratingNumber": "215,475",
      "studentNumber": "616,029",
      "cateSmallImg": "/images/category/web-design.png",
      "cateBigImg": "/images/category/image/web-design.jpg",
      "userImg": "/images/client/avatar-02.png",
      "courseImg": "/images/course/course-01.jpg",
      "courseListImg": "/images/course/course-list-01.jpg",
      "awardImg": "/images/icons/card-icon-1.png",
      "days": "3",
      "isActiveCate": true,
      "userName": "Robin Leaton",
      "userCategory": "Fitness",
      "cateDesc": "Web App Application",
      "date": "12/2024",
      "language": "English",
      "courseAward": "Certified Course",
      "courseFor": ["Fitness", "Development"],
      "courseOverview": [
        {
          "title": "What you'll learn",
          "desc": "Are you new to PHP or need a refresher? Then this course will help you get all the fundamentals of Procedural PHP, Object Oriented PHP, MYSQLi and ending the course by building a CMS system similar to WordPress, Joomla or Drupal. Knowing PHP has allowed me to make enough money to stay home and make courses like this one for students all over the world.",
          "descTwo": "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, aliquam voluptas laudantium incidunt architecto nam excepturi provident rem laborum repellendus placeat neque aut doloremque ut ullam, veritatis nesciunt iusto officia alias, non est vitae. Eius repudiandae optio quam alias aperiam nemo nam tempora, dignissimos dicta excepturi ea quo ipsum omnis maiores perferendis commodi voluptatum facere vel vero. Praesentium quisquam iure veritatis, perferendis adipisci sequi blanditiis quidem porro eligendi fugiat facilis inventore amet delectus expedita deserunt ut molestiae modi laudantium, quia tenetur animi natus ea. Molestiae molestias ducimus pariatur et consectetur. Error vero, eum soluta delectus necessitatibus eligendi numquam hic at?",
          "overviewList": [
            {
              "listItem": "Become an advanced, confident, and modern JavaScript developer from scratch."
            },
            {
              "listItem": "Have an intermediate skill level of Python programming."
            },
            {
              "listItem": "Have a portfolio of various data analysis projects."
            },
            {
              "listItem": "Use the numpy library to create and manipulate arrays."
            },
            {
              "listItem": "Use the Jupyter Notebook Environment. JavaScript developer from scratch."
            },
            {
              "listItem": "Use the pandas module with Python to create and structure data."
            },
            {
              "listItem": "Have a portfolio of various data analysis projects."
            },
            {
              "listItem": "Create data visualizations using matplotlib and the seaborn."
            }
          ]
        }
      ],
      "courseContent": [
        {
          "title": "Course Content",
          "contentList": [
            {
              "title": "Week 1",
              "time": "1hr 30min",
              "collapsed": true,
              "isShow": true,
              "expand": true,
              "chapterItem": [
                {
                "name": "Test",
                "lessonItem": [
                  {
                    "text": "Biering-Sorenson",
                    "time": "30min",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  },
                  {
                    "text": "Prone hold",
                    "time": "0.5min",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  },
                  {
                    "text": "Sit uphold",
                    "time": "",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  },
                  {
                    "text": "Modified Thomas test",
                    "time": "",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  }
                ]
                },
                {
                  "name": "Mobility",
                  "lessonItem": [
                    {
                      "text": "A1. Cobra press ups",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "B1. Supine scorpions",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "C1. Supine nerve flossing",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    }
                  ]
                },
                {
                  "name": "Excercise Day 1",
                  "lessonItem": [
                    {
                      "text": "Banded clams",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Reverse back hyperextensions on bosu ball",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Bosu ball sit-ups",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Side holds",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": false
                    }
                  ]
                },
                {
                  "name": "Excercise Day 2",
                  "lessonItem": [
                    {
                      "text": "Prone DB hip external rotations",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Low cable lateral flexion",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Dead bugs with SB",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Banded stick DL",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": false
                    }
                  ]
                },
                {
                  "name": "Post training",
                  "lessonItem": [
                    {
                      "text": "Massage ball glute rolling",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Lumbar spine foam rolling",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Supine lying over half foam roller",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    }
                  ]
                },
                {
                  "name": "Stretches",
                  "lessonItem": [
                    {
                      "text": "Supine lying hamstring",
                      "time": "",
                      "status": true,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Couch stretch",
                      "time": "",
                      "status": true,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Supine lying hamstrings with a band",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    }
                  ]
                }
              ]
            },
            {
              "title": "Week 2",
              "time": "1hr 30min",
              "collapsed": true,
              "isShow": true,
              "expand": true,
              "chapterItem": [
                {
                "name": "Test",
                "lessonItem": [
                  {
                    "text": "Biering-Sorenson",
                    "time": "30min",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  },
                  {
                    "text": "Prone hold",
                    "time": "0.5min",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  },
                  {
                    "text": "Sit uphold",
                    "time": "",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  },
                  {
                    "text": "Modified Thomas test",
                    "time": "",
                    "status": false,
                    "completed": false,
                    "instucton": "Instruction",
                    "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                    "playIcon": true
                  }
                ]
                },
                {
                  "name": "Mobility",
                  "lessonItem": [
                    {
                      "text": "A1. Cobra press ups",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "B1. Supine scorpions",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "C1. Supine nerve flossing",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    }
                  ]
                },
                {
                  "name": "Excercise Day 1",
                  "lessonItem": [
                    {
                      "text": "Banded clams",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Reverse back hyperextensions on bosu ball",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Bosu ball sit-ups",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Side holds",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": false
                    }
                  ]
                },
                {
                  "name": "Excercise Day 2",
                  "lessonItem": [
                    {
                      "text": "Prone DB hip external rotations",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Low cable lateral flexion",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Dead bugs with SB",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Banded stick DL",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": false
                    }
                  ]
                },
                {
                  "name": "Post training",
                  "lessonItem": [
                    {
                      "text": "Massage ball glute rolling",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Lumbar spine foam rolling",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Supine lying over half foam roller",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    }
                  ]
                },
                {
                  "name": "Stretches",
                  "lessonItem": [
                    {
                      "text": "Supine lying hamstring",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Couch stretch",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    },
                    {
                      "text": "Supine lying hamstrings with a band",
                      "time": "",
                      "status": false,
                      "completed": false,
                      "instucton": "Instruction",
                      "url": "https://www.youtube.com/embed/tdjSeAPR2Rw?si=2RbRJriC6nzG7ckK",
                      "playIcon": true
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      "courseRequirement": [
        {
          "title": "Requirements",
          "detailsList": [
            {
              "listItem": "Become an advanced, confident, and modern JavaScript developer from scratch."
            },
            {
              "listItem": "Have an intermediate skill level of Python programming."
            },
            {
              "listItem": "Have a portfolio of various data analysis projects."
            },
            {
              "listItem": "Use the numpy library to create and manipulate arrays."
            }
          ]
        },
        {
          "title": "Description",
          "detailsList": [
            {
              "listItem": "Use the Jupyter Notebook Environment. JavaScript developer from scratch."
            },
            {
              "listItem": "Use the pandas module with Python to create and structure data."
            },
            {
              "listItem": "Have a portfolio of various data analysis projects."
            },
            {
              "listItem": "Create data visualizations using matplotlib and the seaborn."
            }
          ]
        }
      ],
      "courseInstructor": [
        {
          "title": "Instructor",
          "body": [
            {
              "id": 1,
              "img": "/images/client/avatar-02.png",
              "awardImg": "/images/icons/card-icon-1.png",
              "sellsType": "Bestseller",
              "contact": "+64 22 166 8145",
              "mail": "robin@gmail.com",
              "name": "Robin Leaton",
              "type": "Fitness",
              "ratingNumber": "215,475",
              "studentNumber": "616,029",
              "review": "15",
              "star": "4.8",
              "course": "15",
              "desc": "This is the description for Robin. You can add more content here to be updated.",
              "social": [
                {
                  "link": "https://www.facebook.com",
                  "icon": "facebook"
                },
                {
                  "link": "https://www.twitter.com",
                  "icon": "twitter"
                },
                {
                  "link": "https://www.instagram.com",
                  "icon": "instagram"
                },
                {
                  "link": "https://www.linkdin.com",
                  "icon": "linkedin"
                }
              ]
            }
          ]
        }
      ],
      "featuredReview": [
        {
          "title": "Featured review",
          "body": [
            {
              "userImg": "/images/testimonial/testimonial-3.jpg",
              "userName": "Farjana Bawnia",
              "desc": "At 29 years old, my favorite compliment is being told that I look like my mom. Seeing myself in her image, like this daughter up top."
            },
            {
              "userImg": "/images/testimonial/testimonial-4.jpg",
              "userName": "Razwan Islam",
              "desc": "At 25 years old, my favorite compliment is being told that I look like my mom. Seeing myself in her image, like this daughter up top."
            },
            {
              "userImg": "/images/testimonial/testimonial-1.jpg",
              "userName": "Babor Azom",
              "desc": "My favorite compliment is being told that I look like my mom. Seeing myself in her image, like this daughter up top."
            },
            {
              "userImg": "/images/testimonial/testimonial-6.jpg",
              "userName": "Mohammad Ali",
              "desc": "My favorite compliment is being told that I look like my mom. Seeing myself in her image, like this daughter up top."
            },
            {
              "userImg": "/images/testimonial/testimonial-2.jpg",
              "userName": "Sakib Al Hasan",
              "desc": "At 28 years old, my favorite compliment is being told that I look like my mom. Seeing myself in her image, like this daughter up top."
            }
          ]
        }
      ],
      "relatedCourse": [
        {
          "userName": "Claudia Pruitt",
          "userCategory": "Designing",
          "body": [
            {
              "id": 1,
              "title": "React Front To Back",
              "author": "Claudia Pruitt",
              "post": "Designing",
              "link": "/course-details",
              "img": "/images/course/course-online-01.jpg",
              "avatar": "/images/client/avatar-02.png",
              "desc": "It is a long established fact that a reader will be distracted.",
              "button": false,
              "rating": 15,
              "discount": 40,
              "lesson": 12,
              "student": 50,
              "price": 60,
              "offPrice": 20
            },
            {
              "id": 1,
              "title": "PHP Beginner Advanced",
              "author": "Claudia Pruitt",
              "post": "Designing",
              "link": "/course-details",
              "img": "/images/course/course-online-02.jpg",
              "avatar": "/images/client/avatar-02.png",
              "desc": "It is a long established fact that a reader will be distracted.",
              "button": true,
              "rating": 15,
              "discount": 0,
              "lesson": 12,
              "student": 50,
              "price": 60,
              "offPrice": 20
            }
          ]
        }
      ],
      "roadmap": [
        {
          "text": "Start Date",
          "desc": "5 Hrs 20 Min"
        },
        {
          "text": "Enrolled",
          "desc": "100"
        },
        {
          "text": "Lectures",
          "desc": "50"
        },
        {
          "text": "Skill Level",
          "desc": "Basic"
        },
        {
          "text": "Language",
          "desc": "English"
        },
        {
          "text": "Quizzes",
          "desc": "10"
        },
        {
          "text": "Certificate",
          "desc": "Yes"
        },
        {
          "text": "Pass Percentage",
          "desc": "95"
        }
      ],
      "similarCourse": [
        {
          "id": 1,
          "title": "React Front To Back",
          "author": "Angela",
          "post": "Development",
          "link": "/course-details",
          "linkTwo": "/profile",
          "img": "/images/course/course-online-01.jpg",
          "avatar": "/images/client/avatar-02.png",
          "desc": "It is a long established fact that a reader will be distracted.",
          "button": false,
          "rating": 15,
          "discount": 40,
          "lesson": 12,
          "student": 50,
          "price": 60,
          "offPrice": 20
        },
        {
          "id": 2,
          "title": "PHP Beginner Advanced",
          "author": "Claudia Pruitt",
          "post": "Development",
          "link": "/course-details",
          "linkTwo": "/profile",
          "img": "/images/course/course-online-02.jpg",
          "avatar": "/images/client/avatar-04.png",
          "desc": "It is a long established fact that a reader will be distracted.",
          "button": true,
          "rating": 15,
          "discount": 0,
          "lesson": 12,
          "student": 50,
          "price": 60,
          "offPrice": 20
        },
        {
          "id": 3,
          "title": "Angular Zero to Mastery",
          "author": "Slaughter",
          "post": "Languages",
          "link": "/course-details",
          "linkTwo": "/profile",
          "img": "/images/course/course-online-03.jpg",
          "avatar": "/images/client/avatar-03.png",
          "desc": "Angular Js long fact that a reader will be distracted by the readable.",
          "button": false,
          "rating": 5,
          "discount": 10,
          "lesson": 8,
          "student": 30,
          "price": 80,
          "offPrice": 100
        }
      ],
      "subCategories": [
        {
          "cate": "Healthcare"
        },
        {
          "cate": "Beauty & fashion"
        },
        {
          "cate": "Education & Travel"
        },
        {
          "cate": "Kitchen"
        },
        {
          "cate": "Medicle & entertain"
        },
        {
          "cate": "Medicle & Science"
        },
        {
          "cate": "Tour & Travel"
        }
      ]
    }
  ]
}
  
    return JsonResponse(course_details)



##################################################
##################################################
###                                            ###
###   Add Section to course  API               ### 
###                                            ###
##################################################
##################################################   
         
class SectionToCourseAPIView(generics.CreateAPIView):
    serializer_class = SectionSerializer

    def get_queryset(self):
        return Section.objects.all()



def testapi(request):
    return JsonResponse({'foo': 'Details'})







##################################################
##################################################
###                                            ###
###   Get User Details API                     ### 
###                                            ###
##################################################
##################################################  

class UserDetails(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        profileObj = UserProfile.objects.get(user=request.user)
        email = request.user.email
        dob = profileObj.dob
        phone = profileObj.phone
        goals_achived = profileObj.goals_achived
        registered_date = profileObj.registered_date
        bio = profileObj.bio
        course_enrolled = profileObj.course_enrolled
        # registered_date = profileObj.registered_date
        user_details = {
            "userDetails": [
            {
                "userid": 1,
                "firstname": "Pavan",
                "lastname": "Shashidharann",
                "email": email,
                "dob": dob,
                "phone": phone,
                "registered_date": registered_date,
                "DOB": "29-08-2024",
                "bio": bio,
                "no_of_certificate": 0,
                "no_of_course_enrolled": course_enrolled,
                "completed_course": 0,
                "course_enrolled":[
                    {
                        "order_date": '29-08-2024',
                        "course_name": 'Leaton Back Course',
                        "status": "pending"
                    },
                    {
                        "order_date": '04-12-2020',
                        "course_name": 'Leaton Leg Course',
                        "status": "completed"
                    }
                ],
                "goals_achived": goals_achived,
                "goals_pending": [
                    {
                        "task_name": 'Do Benchpress - 30sets - Goal 1'
                    },
                    {
                        "task_name": 'Do Benchpress - 30sets - Goal 2'
                    }
                ],
                "order_history": [
                    {
                        "order_date": '29-08-2024',
                        "course_name": 'Leaton Back Course',
                        "invoice": "/link/invoice.pdf"
                    },
                    {
                        "order_date": '04-12-2020',
                        "course_name": 'Leaton Leg Course',
                        "invoice": "/link/invoice.pdf"
                    }
                ]
            }
            ]
        }
        return Response(user_details)
    


##################################################
##################################################
###                                            ###
###   Get Trainer Details API                  ### 
###                                            ###
##################################################
##################################################  

class TrainerDetails(APIView):
    permission_classes = (AllowAny,)

    def get(self, request, trainerId):
        trainer = Trainer.objects.get(id=trainerId)
        name = trainer.name
        email = trainer.email
        phone = trainer.phone
        bio = trainer.description
        trainer_details = {
                  "title": "Trainer",
                  "body": [
                      {
                        "id": 1,
                        "img": "/images/client/avatar-02.png",
                        "awardImg": "/images/icons/card-icon-1.png",
                        "sellsType": "Bestseller",
                        "contact": "+1-202-555-0174",
                        "mail": email,
                        "name": name,
                        "phone": phone,
                        "type": "Fitness",
                        "ratingNumber": "215,475",
                        "studentNumber": "616,029",
                        "review": "15",
                        "star": "4.8",
                        "course": "15",
                        "desc": "Description about Robin goes here.",
                        "social": [
                          {
                            "link": "#",
                            "icon": "facebook"
                          },
                          {
                            "link": "#",
                            "icon": "twitter"
                          },
                          {
                            "link": "#",
                            "icon": "instagram"
                          },
                          {
                            "link": "#",
                            "icon": "linkedin"
                          }
                      ]
                      }
                  ],
                  "relatedCourse": [
                      {
                          "Name": 'Another Robin Course'
                      }
                  ]
                }
        return Response(trainer_details)
    


##################################################
##################################################
###                                            ###
###   Get FAQ Details API                      ### 
###                                            ###
##################################################
##################################################  

class FaqList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        true = True
        false = False
        faq_list =  {
                      "faqContent": [
                          {
                            "tag": "faq",
                            "title": "Have a Question with ",
                            "subTitle": " Leaton University?",
                            "strong": "Its an fitness platform",
                            "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
                            "imgOne": "/images/about/about-01.jpg",
                            "imgTwo": "/images/about/about-10.jpg",
                            "faqBody": [
                              {
                                "collapse": "collapseOne2",
                                "heading": "headingOne2",
                                "expanded": true,
                                "collapsed": true,
                                "show": true,
                                "accordionTitle": "Question no 1 goes in here?",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula ut diam quis tempus. Cras vulputate odio vel auctor fermentum. Etiam dignissim elementum est, eu convallis justo venenatis eget. Etiam posuere blandit tellus a aliquam. Phasellus ultricies aliquam tellus. Nullam diam diam, ullamcorper et velit id, finibus ultricies leo. Suspendisse faucibus massa at odio suscipit volutpat. Suspendisse potenti."
                              },
                              {
                                "collapse": "collapseTwo2",
                                "heading": "headingTwo2",
                                "expanded": false,
                                "collapsed": false,
                                "show": false,
                                "accordionTitle": "Question no 2 goes in here?",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula ut diam quis tempus. Cras vulputate odio vel auctor fermentum. Etiam dignissim elementum est, eu convallis justo venenatis eget. Etiam posuere blandit tellus a aliquam. Phasellus ultricies aliquam tellus. Nullam diam diam, ullamcorper et velit id, finibus ultricies leo. Suspendisse faucibus massa at odio suscipit volutpat. Suspendisse potenti."
                              },
                              {
                                "collapse": "collapseThree2",
                                "heading": "headingThree2",
                                "expanded": false,
                                "collapsed": false,
                                "show": false,
                                "accordionTitle": "Question no 3 goes in here?",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula ut diam quis tempus. Cras vulputate odio vel auctor fermentum. Etiam dignissim elementum est, eu convallis justo venenatis eget. Etiam posuere blandit tellus a aliquam. Phasellus ultricies aliquam tellus. Nullam diam diam, ullamcorper et velit id, finibus ultricies leo. Suspendisse faucibus massa at odio suscipit volutpat. Suspendisse potenti."
                              }
                            ],
                            "faqBody2": [
                              {
                                "collapse": "collapseOne4",
                                "heading": "headingOne4",
                                "expanded": true,
                                "collapsed": true,
                                "show": true,
                                "accordionTitle": "Question no 1 goes in here?",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula ut diam quis tempus. Cras vulputate odio vel auctor fermentum. Etiam dignissim elementum est, eu convallis justo venenatis eget. Etiam posuere blandit tellus a aliquam. Phasellus ultricies aliquam tellus. Nullam diam diam, ullamcorper et velit id, finibus ultricies leo. Suspendisse faucibus massa at odio suscipit volutpat. Suspendisse potenti."
                              },
                              {
                                "collapse": "collapseTwo4",
                                "heading": "headingTwo4",
                                "expanded": false,
                                "collapsed": false,
                                "show": false,
                                "accordionTitle": "Question no 2 goes in here?",
                                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula ut diam quis tempus. Cras vulputate odio vel auctor fermentum. Etiam dignissim elementum est, eu convallis justo venenatis eget. Etiam posuere blandit tellus a aliquam. Phasellus ultricies aliquam tellus. Nullam diam diam, ullamcorper et velit id, finibus ultricies leo. Suspendisse faucibus massa at odio suscipit volutpat. Suspendisse potenti."
                              }
                            ]
                          }
                        ]

                      }
        return Response(faq_list)


##################################################
##################################################
###                                            ###
###   Contact Details API                      ### 
###                                            ###
##################################################
##################################################  

class ContactDetailsList(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        true = True
        false = False
        contact_details = {
                  "contactDetails": [
                    {
                      "title": "Contact Phone Number",
                      "numOne": "+444 555 666 777",
                      "numTwo": "+222 222 222 333",
                      "icon": "feather-headphones",
                      "address": ""
                    },
                    {
                      "title": "Our Email Address",
                      "mailOne": "admin@gmail.com",
                      "mailTwo": "example@gmail.com",
                      "icon": "feather-mail",
                      "numOne": "",
                      "address": "",
                      "numTwo": ""
                    },
                    {
                      "title": "Our Location",
                      "address": "5678 Bangla Main Road, cities 580 GBnagla, example 54786",
                      "icon": "feather-map-pin",
                      "numOne": "",
                      "numTwo": ""
                    }
                  ]
                }

        return Response(contact_details)



##################################################
##################################################
###                                            ###
###   Checkout API                             ### 
###                                            ###
##################################################
##################################################  


class CheckoutCourse(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        user = User.objects.get(id=request.data['user'])
        course = Course.objects.get(id=request.data['course'])
        order_post = Order(user=user, course=course)
        orderserialiser = CheckoutCourseSerializer(order_post, data=request.data)
        data={}
        if orderserialiser.is_valid():
            orderserialiser.save()
            data["success"] = True
            data["mesage"] = "Order Created"
            data["order_information"] = orderserialiser.data
            return Response(data=data)
        else:
            data["success"] = False
            data["mesage"] = "Order not Created"
            data["error_information"] = orderserialiser.errors               
            return Response(data=data)






##################################################
##################################################
###                                            ###
###   Main Menu API                            ### 
###                                            ###
##################################################
##################################################  

class PrimaryMenuContentAPI(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        true = True
        false = False
        primary_menu = {
            "menuData": [
              {
                "menuTitle": "Home",
                "menuType": "home"
              },
              {
                "menuTitle": "about",
                "menuType": "default-dropdown",
                "hasMegamenu": false,
                "hasMenuChild": true,
                "hasPositionStatic": false,
                "hasDropdown": true,
                "menuItems": [
                  {
                    "title": "Our Mission",
                    "hasSubmenu": false,
                    "link":"/our-mission"
                  },
                  {
                    "title": "About Trainer",
                    "hasSubmenu": false,
                    "link":"/trainer/1"
                  }
                ]
              },
              {
                "menuTitle": "Our Course",
                "menuType": "our-course"
              },
              {
                "menuTitle": "FAQ",
                "menuType": "faqs"
              },
              {
                "menuTitle": "Contact",
                "menuType": "contact-us"
              }
            ]
          }
        return Response(primary_menu)







##################################################
##################################################
###                                            ###
###   User Enrolled/Created Course API         ### 
###                                            ###
##################################################
##################################################  

class UserEnrolledCourse(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        false = False
        true = True
        profileObj = UserProfile.objects.get(user=request.user)
        course_enrolled = profileObj.course_enrolled
        # registered_date = profileObj.registered_date
        enrolled_course = {
                    "enrolledCourses": [
                      {
                        "id": 1,
                        "title": "Leaton Upper Back Course - Django enrolled",
                        "shortDescription": "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
                        "sellerType": "Bestseller",
                        "rating": {
                          "average": 4.8,
                          "total": 215475
                        },
                        "students": 616029,
                        "authorId": 1,
                        "courseCategory": "Development",
                        "lastUpdated": "Aug 27 2022",
                        "courseLanguage": "English",
                        "certification": false,
                        "coursePrice": 84.99,
                        "offerPrice": 60,
                        "courseDuration": "5 Hrs 20 Min",
                        "enrolledStudent": "100",
                        "lectures": "50",
                        "progressValue": 40,
                        "skillLevel": "Basic",
                        "passPercentage": 95,
                        "courseThumbnail": "/images/course/course-01.jpg",
                        "courseOverview": {
                          "whatYouLearn": "<p>\n                Are you new to PHP or need a refresher? Then this course will help you get\n                all the fundamentals of Procedural PHP, Object Oriented PHP, MYSQLi and\n                ending the course by building a CMS system similar to WordPress, Joomla or\n                Drupal. Knowing PHP has allowed me to make enough money to stay home and\n                make courses like this one for students all over the world. \n            </p>\n            <div className=\"row g-5 mb--30\">\n                <div className=\"col-lg-6\">\n                    <ul className=\"rbt-list-style-1\">\n                        <li><i className=\"feather-check\"></i>Become an advanced, confident, and\n                            modern\n                            JavaScript developer from scratch.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Have an intermediate skill level of\n                            Python\n                            programming.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Have a portfolio of various data\n                            analysis\n                            projects.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Use the numpy library to create and\n                            manipulate\n                            arrays.\n                        </li>\n                    </ul>\n                </div>\n                <div className=\"col-lg-6\">\n                    <ul className=\"rbt-list-style-1\">\n                        <li><i className=\"feather-check\"></i>Use the Jupyter Notebook\n                            Environment.\n                            JavaScript developer from scratch.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Use the pandas module with Python\n                            to create and\n                            structure data.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Have a portfolio of various data\n                            analysis\n                            projects.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Create data visualizations using\n                            matplotlib and\n                            the seaborn.\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <p>\n                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, aliquam\n                voluptas laudantium incidunt architecto nam excepturi provident rem laborum\n                repellendus placeat neque aut doloremque ut ullam, veritatis nesciunt iusto\n                officia alias, non est vitae. Eius repudiandae optio quam alias aperiam nemo\n                nam tempora, dignissimos dicta excepturi ea quo ipsum omnis maiores\n                perferendis commodi voluptatum facere vel vero. Praesentium quisquam iure\n                veritatis, perferendis adipisci sequi blanditiis quidem porro eligendi\n                fugiat facilis inventore amet delectus expedita deserunt ut molestiae modi\n                laudantium, quia tenetur animi natus ea. Molestiae molestias ducimus\n                pariatur et consectetur. Error vero, eum soluta delectus necessitatibus\n                eligendi numquam hic at?\n            </p>"
                        },
                        "instructorId": 1,
                        "reviews": {
                          "oneStar": 1,
                          "twoStar": 1,
                          "threeStar": 6,
                          "fourStar": 29,
                          "fiveStar": 63
                        },
                        "featuredReviews": [1, 2, 3, 4, 5],
                        "instructorTopCourses": [2, 3],
                        "relatedCourses": [4, 5, 6]
                      }
                    ],
                    "userDetails": {
                          "firstname": request.user.first_name,
                          "lastname": request.user.last_name,
                          "no_of_course_enrolled": 0,
                          "no_of_certificate": 0
                    },
                    "completedCourses": [
                      {
                        "id": 1,
                        "title": "Leaton Upper Back Course - Django - completed",
                        "shortDescription": "Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!",
                        "sellerType": "Bestseller",
                        "rating": {
                          "average": 4.8,
                          "total": 215475
                        },
                        "students": 616029,
                        "authorId": 1,
                        "courseCategory": "Development",
                        "lastUpdated": "Aug 27 2022",
                        "courseLanguage": "English",
                        "certification": false,
                        "coursePrice": 84.99,
                        "offerPrice": 60,
                        "courseDuration": "5 Hrs 20 Min",
                        "enrolledStudent": "100",
                        "lectures": "50",
                        "progressValue": 40,
                        "skillLevel": "Basic",
                        "passPercentage": 95,
                        "courseThumbnail": "/images/course/course-01.jpg",
                        "courseOverview": {
                          "whatYouLearn": "<p>\n                Are you new to PHP or need a refresher? Then this course will help you get\n                all the fundamentals of Procedural PHP, Object Oriented PHP, MYSQLi and\n                ending the course by building a CMS system similar to WordPress, Joomla or\n                Drupal. Knowing PHP has allowed me to make enough money to stay home and\n                make courses like this one for students all over the world. \n            </p>\n            <div className=\"row g-5 mb--30\">\n                <div className=\"col-lg-6\">\n                    <ul className=\"rbt-list-style-1\">\n                        <li><i className=\"feather-check\"></i>Become an advanced, confident, and\n                            modern\n                            JavaScript developer from scratch.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Have an intermediate skill level of\n                            Python\n                            programming.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Have a portfolio of various data\n                            analysis\n                            projects.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Use the numpy library to create and\n                            manipulate\n                            arrays.\n                        </li>\n                    </ul>\n                </div>\n                <div className=\"col-lg-6\">\n                    <ul className=\"rbt-list-style-1\">\n                        <li><i className=\"feather-check\"></i>Use the Jupyter Notebook\n                            Environment.\n                            JavaScript developer from scratch.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Use the pandas module with Python\n                            to create and\n                            structure data.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Have a portfolio of various data\n                            analysis\n                            projects.\n                        </li>\n                        <li><i className=\"feather-check\"></i>Create data visualizations using\n                            matplotlib and\n                            the seaborn.\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <p>\n                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis, aliquam\n                voluptas laudantium incidunt architecto nam excepturi provident rem laborum\n                repellendus placeat neque aut doloremque ut ullam, veritatis nesciunt iusto\n                officia alias, non est vitae. Eius repudiandae optio quam alias aperiam nemo\n                nam tempora, dignissimos dicta excepturi ea quo ipsum omnis maiores\n                perferendis commodi voluptatum facere vel vero. Praesentium quisquam iure\n                veritatis, perferendis adipisci sequi blanditiis quidem porro eligendi\n                fugiat facilis inventore amet delectus expedita deserunt ut molestiae modi\n                laudantium, quia tenetur animi natus ea. Molestiae molestias ducimus\n                pariatur et consectetur. Error vero, eum soluta delectus necessitatibus\n                eligendi numquam hic at?\n            </p>"
                        },
                        "instructorId": 1,
                        "reviews": {
                          "oneStar": 1,
                          "twoStar": 1,
                          "threeStar": 6,
                          "fourStar": 29,
                          "fiveStar": 63
                        },
                        "featuredReviews": [1, 2, 3, 4, 5],
                        "instructorTopCourses": [2, 3],
                        "relatedCourses": [4, 5, 6]
                      }
                    ]
                  }
        return Response(enrolled_course)
    


##################################################
##################################################
###                                            ###
###   User Order History API                   ### 
###                                            ###
##################################################
##################################################  

class UserOrderHistory(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        userProfile = UserProfile.objects.get(user=request.user)
        orderHistory = Order.objects.filter(user=request.user)
        orderHistorySerialiser = OrderHistorySerializer(orderHistory, many=True)
        userDetailsSerialiser = UserProfileSerializer(userProfile)
        data={}
        if orderHistorySerialiser.data:
            # orderserialiser.save()
            data["success"] = True
            data["userDetails"] = userDetailsSerialiser.data
            data["order_details"] = orderHistorySerialiser.data
            return Response(data=data)
        else:
            data["success"] = False
            data["userDetails"] = userDetailsSerialiser.data
            data["mesage"] = "Could not find any order history"
            data["error_information"] = 'Order history does not exists'              
            return Response(data=data)
        


##################################################
##################################################
###                                            ###
###   User Profile Settings AP                 ### 
###                                            ###
##################################################
##################################################  

class UserProfileSetting(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        userProfile = UserProfile.objects.get(user=request.user)
        userDetailsSerialiser = UserProfileSerializer(userProfile)
        data={}
        if userDetailsSerialiser.data:
            data["userDetails"] = userDetailsSerialiser.data
            return Response(data=data)
        
    def post(self, request):
        userProfile = UserProfile.objects.get(user=request.user)
        userDetailsUpdateSerialiser = UserProfileSerializer(userProfile, data=request.data)
        data={}
        if userDetailsUpdateSerialiser.is_valid():
            userDetailsUpdateSerialiser.save()
            data["success"] = True
            data["mesage"] = "User updated"
            data["user_information"] = userDetailsUpdateSerialiser.data
            return Response(data=data)
        else:
            data["success"] = False
            data["mesage"] = "User not Created"
            data["error_information"] = userDetailsUpdateSerialiser.errors               
            return Response(data=data)
        


##################################################
##################################################
###                                            ###
###   User Password Resset API                 ### 
###                                            ###
##################################################
##################################################  

class UserPasswordSet(APIView):
    permission_classes = (IsAuthenticated,)
        
    def post(self, request):
        username = request.data['username']
        currentpassword = request.data['currentpassword']
        newpassword = request.data['newpassword']
        userPasswordCheck = authenticate(username=username, password=currentpassword)
        data={}
        if userPasswordCheck:
            userPasswordCheck.set_password(newpassword)
            userPasswordCheck.save()
            data["success"] = True
            data["mesage"] = "Password Reset Successful"
            return Response(data=data)
        else:
            data["success"] = False
            data["mesage"] = "Password Reset Error"
            return Response(data=data)


        # userProfile = UserProfile.objects.get(user=request.user)
        # userDetailsUpdateSerialiser = UserProfileSerializer(userProfile, data=request.data)
        # data={}
        # if userDetailsUpdateSerialiser.is_valid():
        #     userDetailsUpdateSerialiser.save()
        #     data["success"] = True
        #     data["mesage"] = "User updated"
        #     data["user_information"] = userDetailsUpdateSerialiser.data
        #     return Response(data=data)
        # else:
        #     data["success"] = False
        #     data["mesage"] = "User not Created"
        #     data["error_information"] = userDetailsUpdateSerialiser.errors               
        #     return Response(data=data)
        
    # def post(self, request):
    #     user = authenticate(username=request.data['username'], password=request.data['password'])
    #     if user:
    #         token, created = Token.objects.get_or_create(user=user)
    #         profileObj = UserProfile.objects.get(user=user)
    #         return Response({
    #             'token': token.key, 'user': {
    #                 'full_name': user.get_full_name(), 'name': user.username,
    #                 'disclaimer': profileObj.health_disclaimer}
    #         })
    #     else:
    #         return Response({'error': 'Invalid credentials'}, status=401)