import http.server
import socketserver
import os

FILE_PATH = r'C:\Users\User\Desktop\3DSkai-OpenSCAD\public\start.html'

DIRECTORY = os.path.dirname(FILE_PATH)

os.chdir(DIRECTORY)

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/':
            self.path = '/start.html'
        return super().do_GET()

# Define the IP address and port
IP = '192.168.40.14'
PORT = 8000

with socketserver.TCPServer((IP, PORT), CustomHandler) as httpd:
    print(f"Serving start.html at http://{IP}:{PORT}")
    httpd.serve_forever()
