# 2024-4e-hurt-hauerteUnifiedPortal

Integration between Microsoft's SIEM - Azure Senitenel and IRIS  - Open-Source Collaborative Incident Response Platform. Itegration should be fully functional and maintained to the latest version of IRIS. Itegration works in the cloud eviroment which enables anyone to seamlessly delploy this integration without the need to make any changes to the original codebase. As long as backwards compatability in the original IRIS project is ensured this integration will remain functional even without a maintainer. Deployment using Logic Apps also further enables third parties to make easy modifications without neccessearly understading the underlaying infrastracture. hauerteUnifiedPortal is a fork of IRIS. 

Main branch contains Azure Logic Apps definitions in .json format **while IRIS code is on master and develop branch.** 



## setting up for local dev ##

Pycharm > new project > from VCS > clone https://github.com/gyarab/2024-4e-hurt-hauerteUnifiedPortal.git

open terminal 

git switch develop

Copy the environment file 
cp .env.model .env

nano .env

to set the admin password go to .env file and uncomment IRIS_ADM_PASSWORD variable
 or after running dfir-iris FOR THE FIRST TIME run
docker compose logs app | grep "WARNING :: post_init :: create_safe_admin"
 to get randomly generated password.

 nano docker-compose.dev.yml

add line in the app container - ports: "8000:8000"

docker compose -f docker-compose.dev.yml build

cd ui

npm install

npm run build

docker compose -f docker-compose.dev.yml up

iris should be avalible on https://127.0.0.1/ (without valid certificate tho)

try out the connection
API can be obtained when iris is running in My Settings after you sign in to the admin acccount.
curl -H "Autorization: bearer: <API-token>" http://127.0.0.1:8000/api/ping

send an testing alert
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
   "alert_iocs":[
   ],
   "alert_assets":[ 
   ],
   "alert_customer_id":1,
   "alert_classification_id":1
}'


