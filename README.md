# 🚀 2024-4e-hurt-hauerteUnifiedPortal

Integration between Microsoft's SIEM - **Azure Sentinel** and **IRIS** - Open-Source Collaborative Incident Response Platform. This integration is designed to be fully functional and maintained to align with the latest version of IRIS.

✅ **Cloud-native:** Seamlessly deploy the integration without modifying the original codebase.  
✅ **Backward Compatibility:** As long as the IRIS project remains backward compatible, this integration will function without manual maintenance.  
✅ **Customizable:** Azure Logic Apps enable third-party modifications without deep knowledge of the underlying infrastructure.  

> 🛠️ *`hauerteUnifiedPortal` is a fork of the [IRIS](https://github.com/dfir-iris/iris-web) project.*

### 📁 Branch Structure

- **Main Branch:** Contains Azure Logic Apps definitions in `.json` format.  
- **Master/Develop Branches:** Hold the IRIS code.

---

## 🧑‍💻 Setting Up for Local Development

### 1️⃣ Clone the Repository

1. Open **PyCharm** → **New Project** → **From VCS**  
2. Clone the repository:

    ```sh
    git clone https://github.com/gyarab/2024-4e-hurt-hauerteUnifiedPortal.git
    cd 2024-4e-hurt-hauerteUnifiedPortal
    git switch develop
    ```

### 2️⃣ Configure Environment Variables

1. Copy the example environment file:

    ```sh
    cp .env.model .env
    ```

2. Edit the `.env` file:

    ```sh
    nano .env
    ```

3. **Set Admin Password:**

   - Uncomment `IRIS_ADM_PASSWORD` and define your password.
   - Alternatively, retrieve a randomly generated password by running:

    ```sh
    docker compose logs app | grep "WARNING :: post_init :: create_safe_admin"
    ```

### 3️⃣ Configure Docker

1. Open `docker-compose.dev.yml` and add this line under the `app` container:

    ```yaml
    ports:
      - "8000:8000"
    ```

2. Build the Docker containers:

    ```sh
    docker compose -f docker-compose.dev.yml build
    ```

### 4️⃣ Set Up the Frontend

1. Navigate to the UI directory:

    ```sh
    cd ui
    ```

2. Install dependencies and build the UI:

    ```sh
    npm install
    npm run build
    ```

### 5️⃣ Run the Application

Start the application with:

```sh
docker compose -f docker-compose.dev.yml up
```

IRIS should now be available at: [https://127.0.0.1/](https://127.0.0.1/) (SSL certificate not provided).

---

## 🔗 Testing IRIS

### 1️⃣ Obtain API Token

1. Sign in to the **admin account** on your local IRIS instance.
2. Navigate to **My Settings** and copy the API token.

### 2️⃣ Check API Connectivity

Verify the API connection with a `ping` request:

```sh
curl -H "Authorization: Bearer <API-token>" http://127.0.0.1:8000/api/ping
```

### 3️⃣ Send a Test Alert

You can send a sample alert using the following command:

```sh
curl -X POST http://127.0.0.1:8000/alerts/add \
-H "Authorization: Bearer <API-token>" \
-H "Content-Type: application/json" \
-d '{
   "alert_title":"Low-reputation arbitrary code executed by signed executable",
   "alert_description":"This is a test alert, courtesy of Olie",
   "alert_source":"Test Source",
   "alert_source_ref":"Test-123",
   "alert_source_link":"https://source_link.com",
   "alert_source_content":{
      "_id":"",
      "contextId":"",
      "description":"",
      "entities":[],
      "title":"",
      "URL":""
   },
   "alert_severity_id":4,
   "alert_status_id":3,
   "alert_context":{
      "context_key":"context_value"
   },
   "alert_source_event_time":"2024-12-28T03:00:30",
   "alert_note":"",
   "alert_tags":"",
   "alert_iocs":[],
   "alert_assets":[],
   "alert_customer_id":1,
   "alert_classification_id":1
}'
```

🎉 **You're all set!** This verifies that the IRIS is functioning correctly.

You can now develop iris locally. When you edit front-end don't forget to rebuild the ui (```sh npm run build```). After developing the back-end container rebuild is needed.

---

## 📌 Contribution

Feel free to submit issues or pull requests. Your contributions help improve this integration and keep it up-to-date!

👤 **Maintainer:** [Oliver H](https://github.com/gyarab)

---

## 📜 License

This project is licensed under the [GPLv3 License](LICENSE).

