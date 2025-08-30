from rest_framework import serializers
from .models import Articles, Subscriber, ContactMessage

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = '__all__'

class ArticlesSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  # <-- ensure use_url=True

    class Meta:
        model = Articles
        fields = ['id', 'title', 'content', 'image']
        

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

        
