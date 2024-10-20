from rest_framework.response import Response
from rest_framework.decorators import api_view
from todo.models import Task
from todo.api.serializers import TaskSerializer

@api_view(['GET'])
def index(request):
    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)