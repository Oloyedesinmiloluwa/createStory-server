# CreateStories

An API for creating user stories where admin can accept or reject stories.

## Setup

- make a copy of `.env.example` and rename to `.env`, make sure to define your environment variables there
- run `npm install`
- run `npm run setup` this is command helps you to run migration files and seed the database with the system admin.
- run `npm run start:dev` to start the server or run `npm run build` then `npm start`

## Authentication

JSON web token is used for authentication, token generated during login is expected to be passed to the `Authorization` header or to this custom header `x-access-token`;

## Technologies

- Nodejs(ES6)
- Express
- Mysql
- Sequelize (ORM)
- Babel

## Endpoints

- [POST] User Login `/login`
- [POST] User Signup `/signup`
- [POST] Admin Login `/admin-login`. To login as admin, you must provide the email and password of the Admin seeded into the database.
- [GET] Get Stories `/getStories`. This is a protected route, authentication token must be provided
- [POST] Create Stories `/createStories`. This is a protected route.
- [PUT] Create Stories `/stories/:storyId/approve`. This is a protected route, admin only.
- [PUT] Create Stories `/stories/:storyId/reject`. This is a protected route, admin only.

Note: The Admin is automatically assigned newly created stories whose status is set to `null` (that is pending). The status then changes after the Admin acts on it.

### Creating a Story

Request Sample payload:

	{
		summary: 'New story for the gods',
		description: 'Our latest story for the gods',
		type: 'development',
		complexity: 'mid',
		estimatedHrs: 1,
		cost: 100,
	}

Response:

	{
		id: 1,
		summary: "New story for the gods",
		description: "Our latest story for the gods",
		cost: 100,
		estimatedHrs: 1,
		type: "development",
		complexity: "mid",
		userId: 17,
		status: null,
		dateRejected: null,
		dateAccepted: null,
		updatedAt: "2020-03-09T14:32:43.319Z",
		createdAt: "2020-03-09T14:32:43.319Z"
	}

## Test

- Mocha is the testing framework and the chai libray is used
- run `npm test`

## Default Client

Please find the React-based web Client here:
https://github.com/Oloyedesinmiloluwa/createStory
