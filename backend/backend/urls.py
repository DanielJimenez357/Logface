"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
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
from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter
from usuarios import views as vistas_usuario
from departamentos import views as views_department
from incidencias import views as views_incidencias
from entrada import views as views_entrada
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.views.static import serve
from django.conf import settings
from django.conf.urls.static import static


router = DefaultRouter()

router.register(r"employee", vistas_usuario.UsuarioViewSet)
router.register(r"task", views_department.TaskViewSet)
router.register(r"department", views_department.DepartmentViewSet)
router.register(r"ticket", views_incidencias.IncidenciaViewSet, basename="ticket")
router.register(r"respuesta", views_incidencias.RepsuestaViewSet, basename="respuesta")
router.register(
    r"asistencia", views_entrada.RegistroAsistenciaViewSet, basename="asistencia"
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/", include(router.urls), name="home"),
    path("api/register/", vistas_usuario.LDAPRegister.as_view(), name="ldap_register"),
    path("api/profile/", vistas_usuario.Profile.as_view(), name="profile"),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
    path(
        "api/profile/changepassword",
        vistas_usuario.ChangePassword.as_view(),
        name="change_password",
    ),
    path(
        "api/exportemployee/",
        vistas_usuario.ExportEmployee.as_view(),
        name="exportar_empleados",
    ),
    path(
        "api/exportpdf/",
        views_incidencias.TicketsExportPDF.as_view(),
        name="export_pdf",
    ),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
else:
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    ]
