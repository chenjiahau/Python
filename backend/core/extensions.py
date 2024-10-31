from drf_spectacular.extensions import OpenApiAuthenticationExtension
from core.authentication import CustomTokenAuthentication

class CustomTokenScheme(OpenApiAuthenticationExtension):
    target_class = 'core.authentication.CustomTokenAuthentication'  # full import path to your class
    name = 'Bearer'  # This name will show up in the Swagger UI

    def get_security_definition(self, auto_schema):
        return {
            'type': 'http',
            'scheme': 'bearer',
            'bearerFormat': 'JWT',  # optional, can be customized
        }
