from flask import Flask, request, Response
import requests

app = Flask(__name__)

# The address of the original Node.js app
ORIGINAL_URL = 'http://172.27.21.59:4000'

# The address where you want to forward the requests
FORWARD_URL = 'http://192.168.40.14:8000'

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def proxy(path):
    # Forward the request to the original URL
    response = requests.get(f'{ORIGINAL_URL}/{path}', params=request.args)
    # Return the response from the original URL
    return Response(response.content, content_type=response.headers['Content-Type'])

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
