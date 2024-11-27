from rest_framework.permissions import BasePermission


class HasPrivilegePermission(BasePermission):
    """
    Custom permission to allow access only to users with specific privileges.
    """

    def has_permission(self, request, view):
        # Define required privileges based on the view
        required_privileges = getattr(view, 'required_privileges', [])

        # Check if the user has the required privileges
        privilege = request.user.privilege.value

        return privilege in required_privileges
