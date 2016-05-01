import BaseHTTPServer

HOSTNAME = "127.0.0.1"
PORT = 3000

ARRAY = []  # Our array that will live in RAM until the server restarts

class HttpHandler(BaseHTTPServer.BaseHTTPRequestHandler):
  def do_GET(self):

    ARRAY.append("")  # appending a new entry in to our array
    array_size = len(ARRAY)  # counting how many items do we have in the array

    self.send_response(200)
    self.send_header('Content-type', 'text/plain')
    self.end_headers()
    return self.wfile.write(str(array_size))  # displaying the size of our array

server = BaseHTTPServer.HTTPServer((HOSTNAME, PORT), HttpHandler)
print('Server running at http://{hostname}:{port}/'.format(
  hostname=HOSTNAME, port=PORT))
server.serve_forever()
