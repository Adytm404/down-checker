from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import requests
import re
import socket
import time
import platform

app = Flask(__name__)
CORS(app)  # ⬅️ Ini mengaktifkan CORS untuk semua route

def sanitize_domain(domain):
    domain = re.sub(r'^https?://', '', domain.strip())
    domain = domain.rstrip('/')
    return domain

def is_ip_address(value):
    try:
        socket.inet_pton(socket.AF_INET, value)
        return 'ipv4'
    except OSError:
        pass
    try:
        socket.inet_pton(socket.AF_INET6, value)
        return 'ipv6'
    except OSError:
        pass
    return None

def resolve_ip(domain):
    try:
        return socket.gethostbyname(domain)
    except:
        return None

def ping_address(address, ip_version='ipv4'):
    system_os = platform.system().lower()
    if system_os == 'windows':
        cmd = ['ping', '-n', '1', address]
    else:
        cmd = ['ping6' if ip_version == 'ipv6' else 'ping', '-c', '1', address]
    try:
        ping_response = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, timeout=5)
        return ping_response.returncode == 0
    except:
        return False

def measure_response_time(url):
    try:
        start = time.time()
        response = requests.get(url, timeout=5)
        elapsed = round((time.time() - start) * 1000, 2)  # ms
        return elapsed, response.status_code
    except:
        return None, None

@app.route('/check', methods=['GET'])
def check():
    raw_input = request.args.get('domain')
    if not raw_input:
        return jsonify({'error': 'Parameter "domain" wajib diisi'}), 400

    domain = sanitize_domain(raw_input)
    ip_type = is_ip_address(domain)
    ip_address = domain if ip_type else resolve_ip(domain)

    ping_ok = ping_address(ip_address, ip_type or 'ipv4') if ip_address else False
    response_time, http_code = (None, None)

    if not ip_type:
        response_time, http_code = measure_response_time(f"http://{domain}")

    status = 'up' if ping_ok or http_code else 'down'
    message = f"{domain} is reachable." if status == 'up' else f"{domain} is unreachable."

    return jsonify({
        "status": status,
        "message": message,
        "domain": domain,
        "ip_address": ip_address,
        "response_time_ms": response_time,
        "location": "Unknown"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
