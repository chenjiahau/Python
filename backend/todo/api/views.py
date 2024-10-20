from rest_framework.response import Response
from rest_framework.decorators import api_view
from todo.models import Task
from todo.api.serializers import TaskSerializer

@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'POST':
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)

    tasks = Task.objects.all()
    serializer = TaskSerializer(tasks, many=True)

    return Response(serializer.data)