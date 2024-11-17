from rest_framework.pagination import PageNumberPagination

class CustomTaskPagination(PageNumberPagination):
    page_size_query_param = 'page_size'  # This allows clients to specify page size via a query parameter
    max_page_size = 20  # Limit the number of items per page for performance reasons
