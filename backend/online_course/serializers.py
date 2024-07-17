from rest_framework import serializers
from .models import Course, UserProfile, Section, Order
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class CheckoutCourseSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('user', 'course', 'price', 'transaction_id', 'status')



class OrderHistorySerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name')

    class Meta:
        model = Order
        fields = ('order_num', 'purchase_date', 'user', 'course_name', 'price', 'status')



class UserProfileSerializer(serializers.ModelSerializer):
    firstname = serializers.CharField(source='user.first_name', required=True)
    lastname = serializers.CharField(source='user.last_name', required=True)
    username = serializers.CharField(source='user.username', required=True)
    email = serializers.CharField(source='user.email', read_only=True )

    class Meta:
        model = UserProfile
        fields = ('firstname', 'lastname', 'username', 'email', 'phone', 'dob', 'registered_date', 'health_disclaimer', 'course_enrolled', 'no_of_certificate', 'goals_achived', 'bio')

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('user')
        profile = instance.user
        instance.phone = validated_data.get('phone', instance.phone)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.save()
        
        profile.first_name = profile_data.get('first_name', profile.first_name)
        profile.last_name = profile_data.get('last_name', profile.last_name)
        profile.save()
        return instance
        #return super().update(instance, validated_data) 

    # def create(self, ):
    #     aaa = validated_data['firstname']
    #     # order = Order.objects.create(
    #     #     user=validated_data['user'],
    #     #     course=validated_data['course'],
    #     #     price=validated_data['price'],
    #     #     transaction_id=validated_data['transaction_id'],
    #     #     status=validated_data['status']
    #     # )
    #     return validated_data








    # def create(self, validated_data):
    #     order = Order.objects.create(
    #         user=validated_data['user'],
    #         course=validated_data['course'],
    #         price=validated_data['price'],
    #         transaction_id=validated_data['transaction_id'],
    #         status=validated_data['status']
    #     )
    #     return validated_data


class UserRegistrationView(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )
        userprofile = UserProfile.objects.create(user=user)

        
        user.set_password(validated_data['password'])
        user.save()
        userprofile.save()

        return user


class CourseSerializer(serializers.ModelSerializer):

    class Meta:
        model=Course
        fields="__all__"


class SectionSerializer(serializers.ModelSerializer):

    class Meta:
        model=Section
        fields="__all__"
