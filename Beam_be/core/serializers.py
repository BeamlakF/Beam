from rest_framework import serializers
from .models import Articles, ContactMessage



class ArticlesSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True)  

    class Meta:
        model = Articles
        fields = ['id', 'title', 'content', 'image']
        

class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = '__all__'

        
