from rest_framework.response import Response
from rest_framework.views import APIView
from todo.models import Task
from todo.api.serializers import TaskSerializer
from rest_framework.status import HTTP_400_BAD_REQUEST, HTTP_204_NO_CONTENT

class TaskList(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

class TaskDetail(APIView):
    def get(self, _, pk):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)

        serializer = TaskSerializer(task)
        return Response(serializer.data)

    def put(self, request, pk):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)

        serializer = TaskSerializer(task, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

    def delete(self, _, pk):
        try:
            task = Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            return Response(status=HTTP_400_BAD_REQUEST)

        task.delete()
        return Response(status=HTTP_204_NO_CONTENT)

# @api_view(['GET', 'POST'])
# def index(request):
#     if request.method == 'POST':
#         serializer = TaskSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

#     tasks = Task.objects.all()
#     serializer = TaskSerializer(tasks, many=True)

#     return Response(serializer.data)

# @api_view(['GET', 'PUT', 'DELETE'])
# def task_detail(request, pk):
#     try:
#         task = Task.objects.get(pk=pk)
#     except Task.DoesNotExist:
#         return Response(status=HTTP_400_BAD_REQUEST)

#     if request.method == 'GET':
#         serializer = TaskSerializer(task)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = TaskSerializer(task, data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)

#         return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         task.delete()
#         return Response(status=HTTP_204_NO_CONTENT)