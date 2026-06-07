from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class TfgAPITests(APITestCase):

    def setUp(self):

        self.user = User.objects.create_user(
            username='testuser', 
            password='testpassword123',
            email='test@tfg.com'
        )   

        self.tareas_url = '/api/task/' 
        self.perfil_url = '/api/profile/' 

    def test_no_auth_task(self): 
        response = self.client.get(self.tareas_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_auth_profile(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(self.perfil_url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(response.data['username'], 'testuser')

    def test_create_department(self):
        self.client.force_authenticate(user=self.user)
        
        data = {
            "nombre": "Departamento de Pruebas"
        }
        
        response = self.client.post('/api/department/', data)
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
