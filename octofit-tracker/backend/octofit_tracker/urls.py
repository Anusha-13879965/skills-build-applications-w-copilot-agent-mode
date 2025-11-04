"""octofit_tracker URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.http import JsonResponse
import os


def _base_url_from_env_or_request(request):
    """Return a base URL using the CODESPACE_NAME env var when available,
    otherwise derive it from the incoming request."""
    codespace = os.environ.get('CODESPACE_NAME')
    if codespace:
        # Codespaces expose apps at https://{CODESPACE_NAME}-8000.app.github.dev
        return f"https://{codespace}-8000.app.github.dev"
    # fallback to request's scheme and host
    scheme = request.scheme
    host = request.get_host()
    return f"{scheme}://{host}"


def api_root(request):
    """Simple API root that returns links to app endpoints based on the
    Codespace host (or the current request).
    This avoids hardcoding any CODESPACE_NAME value while producing the
    expected URL format: https://$CODESPACE_NAME-8000.app.github.dev/api/[component]/
    """
    base = _base_url_from_env_or_request(request)
    data = {
        'activities': f"{base}/api/activities/",
        'workouts': f"{base}/api/workouts/",
        'teams': f"{base}/api/teams/",
        'leaderboard': f"{base}/api/leaderboard/",
    }
    return JsonResponse(data)


def api_activities(request):
    """Placeholder activities endpoint.
    If the project later registers real DRF viewsets or view functions at
    these paths, those will take precedence when urls.py is changed accordingly.
    For now return an empty list to allow quick smoke tests.
    """
    return JsonResponse({'activities': []})


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_root),
    path('api/activities/', api_activities),
]
