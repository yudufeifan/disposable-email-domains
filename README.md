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

## 💻 Quick Integration (API Example)

### cURL
```bash
curl --request GET \
  --url '[https://disposable-fake-email-detector.p.rapidapi.com/?email=test%40mailinator.com](https://disposable-fake-email-detector.p.rapidapi.com/?email=test%40mailinator.com)' \
  --header 'x-rapidapi-host: disposable-fake-email-detector.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_RAPIDAPI_KEY'
