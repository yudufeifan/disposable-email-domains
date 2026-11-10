# 🛡️ Disposable Email Domains & Detection API

A curated, up-to-date collection of **30,000+ disposable, temporary, and burner email domains** to protect your web apps from fake signups, fraudulent trials, and spam bots.

---

### 🚀 Need Real-Time Detection with Zero Maintenance?

Maintaining a 30k+ domain list, handling regular expression overhead, and managing false positives can slow down your signup flow.

Use our **high-speed Cloudflare Worker API** on RapidAPI:

* ⚡ **Sub-100ms Global Latency**: Hosted on edge infrastructure.
* 🔍 **Real-time DNS MX Lookup**: Verifies inbound mail routing even for brand-new domains.
* 📊 **Smart Deliverability Score**: Returns clear flags (`is_disposable`, `has_mx_records`, `is_safe_to_deliver`).
* 🎁 **Free Tier Available**: 100 free requests per day.

👉 **[Subscribe & Get API Key on RapidAPI](https://rapidapi.com/yudufeifan/api/disposable-fake-email-detector/pricing)**  
👉 **[Live Interactive Demo](https://mailguard-app.yudufeifan.workers.dev)**

---

## 📦 What's Included

* `disposable_email_blocklist.conf`: Plain text list containing 30,000+ verified burner and throwaway email domains.
* Supports blocking standard disposable providers (e.g., Mailinator, TempMail, GuerrillaMail, 10MinuteMail).

---

## 🛠️ Offline Local Check Scripts

Run instant checks locally without hitting any network limits:

### Python
```bash
python verify_email.py user@example.com
```

### Node.js
```bash
node verify_email.js user@example.com
```

---

## 💻 Quick Integration (API Example)

### cURL
```bash
curl --request GET \
  --url 'https://disposable-fake-email-detector.p.rapidapi.com/?email=test%40mailinator.com' \
  --header 'x-rapidapi-host: disposable-fake-email-detector.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY'
```

### Python
```python
import requests

url = "https://disposable-fake-email-detector.p.rapidapi.com/"
querystring = {"email": "test@mailinator.com"}

headers = {
    "x-rapidapi-key": "YOUR_RAPIDAPI_KEY",
    "x-rapidapi-host": "disposable-fake-email-detector.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)
print(response.json())
```

### Response Example
```json
{
  "email": "test@mailinator.com",
  "domain": "mailinator.com",
  "is_valid_format": true,
  "is_disposable": true,
  "has_mx_records": true,
  "is_safe_to_deliver": false,
  "checked_at": "2026-11-08T11:31:23.095Z"
}
```

---

## 🤝 Contributing

Found a disposable domain that isn't on the list? Pull requests and issues are welcome!

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
