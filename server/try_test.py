import app
import unittest
import json

class AppTestCase(unittest.TestCase):
    def setUp(self):

        print("==> Setting up a test env ==>")
        app.app.config['TESTING'] = True
        self.app = app.app.test_client()

    def tearDown(self):
        print("<== Tearing down the test <==")

    def test_token(self):
        resp = self.app.get("/token")
        assert '405 METHOD NOT ALLOWED' == resp.status

        resp = self.app.put("/token")
        assert '405 METHOD NOT ALLOWED' == resp.status

        resp = self.app.delete("/token")
        assert '405 METHOD NOT ALLOWED' == resp.status

        resp = self.app.post("/token",
                             data=json.dumps({'username': '', 'password': ''}),
                             content_type='application/json')
        self.assertEquals("401 UNAUTHORIZED", resp.status)
        resp = self.app.post("/token",
                             data=json.dumps({'username': 'testUser', 'password': 'test123'}),
                             content_type='application/json')
        self.assertEquals("200 OK", resp.status)