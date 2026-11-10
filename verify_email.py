"""
Email Disposable & Domain Verification Script (Python)
Checks against local 30k blocklist and falls back to DNS lookup.
"""

import sys
import re
import socket

BLOCKLIST_FILE = "disposable_email_blocklist.conf"

def load_blocklist(filepath):
    domains = set()
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip().lower()
                if line and not line.startswith("#"):
                    domains.add(line)
    except FileNotFoundError:
        print(f"[Warning] Blocklist file '{filepath}' not found.")
    return domains

def extract_domain(email):
    email = email.strip().lower()
    pattern = r"^[^@\s]+@([^@\s]+\.[^@\s]+)$"
    match = re.match(pattern, email)
    return match.group(1) if match else None

def check_domain_exists(domain):
    try:
        socket.gethostbyname(domain)
        return True
    except socket.gaierror:
        return False

def verify_email(email, blocklist):
    domain = extract_domain(email)
    if not domain:
        return {"email": email, "is_valid_format": False, "is_disposable": False, "domain_active": False}

    is_disposable = domain in blocklist
    has_active_dns = check_domain_exists(domain) if not is_disposable else False

    return {
        "email": email,
        "domain": domain,
        "is_valid_format": True,
        "is_disposable": is_disposable,
        "domain_active": has_active_dns,
        "is_safe": not is_disposable and has_active_dns
    }

if __name__ == "__main__":
    test_email = sys.argv[1] if len(sys.argv) > 1 else "test@mailinator.com"
    domains = load_blocklist(BLOCKLIST_FILE)
    result = verify_email(test_email, domains)

    print(f"\n--- Checking: {test_email} ---")
    print(f"Format Valid: {result['is_valid_format']}")
    print(f"Disposable:   {result['is_disposable']}")
    print(f"Domain Active:{result['domain_active']}")
    print(f"Safe to User: {result['is_safe']}\n")
