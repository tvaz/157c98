from django.db import models
# from django.db.models import Q

from . import utils
from .user import User


class Conversation(utils.CustomModel):
    users = models.ManyToManyField(User, related_name='users')

    createdAt = models.DateTimeField(auto_now_add=True, db_index=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def find_conversation(users):
        # return conversation for this list of users,
        # or None if it doesn't exist
        try:
            return Conversation.objects.filter(users__in=users)
        except Conversation.DoesNotExist:
            return None
