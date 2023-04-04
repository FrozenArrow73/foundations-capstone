# Planet - Vacation Planner
Planet vacation planner is a web based app to help keep track of vacation plans in one location.

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
Due to the site using a communal database the ideal way to use the Planet is to run it locally.
1. Clone the github repo.
2. Run 'npm install' to download all the dependencies of the app.
3. Create a .env file in the root of the project.
4. In the .env file add SERVER_PORT.
5. In the .env file add a CONNECTION_STRING for your personal database.
6. Copy the code from the seed file and run it in your database.
7. Run the server by typing the code 'node server/server.js' in the root of the project
8. Open a browser and visit http://localhostSERVER_PORT wher SERVER_PORT is the number you created for the .env file

## <a name="use"></a>How to use Planet - Vacation Planner
The first step to use planet - Vacation Planner is to add a budget. Enter a value in the Set Butget input and click submit.

You should now add your plans. In the add plan section fill out all inputs. Name and details can take any characters. Cost can take only a number. then click submit

The plan will now appear in the list of plans.  Feel free to add as many plans as needed. You can delete them by clicking on Delete

You can also click Edit. This will open a popup modal. With the information of the plan already filled out. You can then make any needed changes and click Submit. To close the modal without submiting you can hit ESC on your keyboard or you can click close.