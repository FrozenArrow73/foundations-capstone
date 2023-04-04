# Planet - Vacation Planner
planet vacation planner is a web based app to help keep track of vacation plans in one location.

## Table of Contents
* [Technologies Used](#technologiesused)
* [How to locally run Planet - Vacation Planner](#run)
* [How to use Planet - Vacation Planer](#use)

## <a name="technologiesused"></a>Technologies and Languages Used
* JavaScript
* HTML5
* CSS
* SQL
* Axios
* Express
* PostGreSQL
* Sequalize

## <a name="run"></a>How to locally run Planet Vacation Planner
Planet - Vacation Planner is currently hosted at [Planet - Vacation Planner](http://13.56.237.250/)
Due to the site using a joint database the ideal way to use the Planet is to run it locally.
1. clone the github repo
2. run 'npm install' to download all the dependencies of the app
3. create a .env file in the root of the project
4. in the .env file add SERVER_PORT
5. in the .env file add a CONNECTION_STRING for your personal database
6. copy the code from the seed file and run it in your database
7. runserver by typing code 'node server/server.js' in the root of the project
8. Open a browser and visit http://localhostSERVER_PORT wher SERVER_PORT is the number you created for the .env file

## <a name="use"></a>How to use Planet - Vacation Planner
the first step to use planet vacation planner is to add a budget. enter a value in the Set Butget input and click submit.

You should now add plans. In the add plan section fill out all inputs. Name and details can take any characters. Cost can take only a number. then click submit

The plan will now appear in the list of plans.  Feel free to add as many plans as needed. you can delete them by clicking on Delete

You can also click Edit. this will open a popup modal. With the information of the plan already filled out. You can then make any needed changes and click Submit. to close the modal without submiting you can hit ESC on your keyboard or you can click close.