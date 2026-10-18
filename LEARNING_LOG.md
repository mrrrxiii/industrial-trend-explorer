day 1:

 basic htlm and react code, and react project built by vite

 runs on vite server, borwser run react and render the page

verified the html css can change, how button click work, react how to change the content, and build with npm comment: npm --prefix frontend run build

day 2:
learning basic typescript and react code.
export import 
how define type and function
create dropdown list
Sensor describes a sensor object at TypeScript build time, while Props describes the inputs passed to SensorDetails; and you verified that both sensor options appeared and npm --prefix frontend run build passed

day 3;
I learn react states and derived data
demoData.ts through app to chart and summary
verify the chart and summary data when selecting sensor

day 4:
learned creating docker compose file and configure postgresql
desgin controller and service and repo to implement get method
verified seed file , get api, 404 behavior and unit test
data is fetch from postgresql to sensorrepository then service then controller then response

day 5.3:
requireSuccessfulJson checks HTTP success and parses the response; runtime guards such as isTrendResponse then check the JSON’s shape and field types
path from vite is localhost:5173/api/*** and proxy foward to localhost:8080
verified the api works from onsole result 2 sensors, 48 readings, 2 anomalies plus the successful build

day 5.4
how effect take controll when dropdown list is selected which trigger the api proxy - java/db - and after reponse to vite, validate the reponse and set trend and states. based on the states value, render the chart

day 5.5
stale response can misleading the data showing and cleanup/AbortController stop old request when send the new request to ensure always show latest result on latest selection.
after quickly swithc, chart and summary always match the dropdown selctions

Day 6.1–6.3:
java get the facts and prompt is based on the java class summary with instructions specified. use a mock as configurated  and verified the response in test also with unknow sensor

day 6.4:
optional Java-side Gemini provider uses GOOGLE_API_KEY and GEMINI_MODEL; mock remains default; the POST returned MOCK; live Gemini is NOT VERIFIED because have no key yet; and production needs usage/cost limits.

Day 6.5
the click-only POST, visible mock label, clearing on sensor change, plain-text rendering for untrusted model output, and live Gemini not verified.
