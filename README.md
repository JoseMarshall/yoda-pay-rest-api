# Yoda-Pay REST API

REST API for Yoda Pay, a product from a fintech.

<details><summary>:page_with_curl: Overview</summary>

In this first version, it provides endpoints to:
* Create account: `POST /api/accounts`
* Update account: `PATCH /api/accounts?id=ID`
* Disable account: `PATCH /api/accounts/disable?id=ID`
* Enable account: `PATCH /api/accounts/enable?id=ID`
* List accounts: `GET /api/accounts?page=PAGE_NUMBER`
* API Docs: `GET /api-docs`

This first version of the product doesn't care about authentication and security.
> For the PATCH methods, we choose to use the `id` as query instead of param, to give the option to search by `cpf` also passing the query ?cpf=CPF, so user can choose query by `id` either `cpf`. Check the API Docs for more details
</details>

<details><summary> :fire: Techs/Libs/Frameworks</summary>

- [`Typescript`](https://www.typescriptlang.org/)
- [`ExpressJS`](https://expressjs.com/)
- [`Joi`](https://joi.dev/api/?v=17.4.2)
- [`Mongoose`](https://mongoosejs.com/) 
- [`Swagger`](https://swagger.io/)
- [`ESLint`](https://eslint.org/)
- [`Prettier`](https://prettier.io/)
- [`Jest`](https://jestjs.io/)
- [`Supertest`](https://www.npmjs.com/package/supertest)
- [`Docker`](https://www.docker.com/)
- [`Husky`](https://typicode.github.io/husky/#/)
</details>

## :gem: Installation

We recommend using the [Node.js](https://nodejs.org/) LTS version, and the `npm` (all instructions are given based on npm).
#### 1- After you clone this repo :octocat: to your desktop, go to its root directory and run npm install to install its dependencies:

```bash
npm install
```
![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)
## :computer: Usage
#### 2- Create a .env.development file with the following keys:
```bash
MONGO_URL='the mongo uri to perform the conection' #required example: mongodb://127.0.0.1:27017/yoda-pay-db
PORT=4000 #optional The port number the server will be listening on if no-specified the default value is 4000
```
#### 3- Run the dev script:

```bash
npm run dev
```
If everything is configured as expected, you will have the project running:
```bash
> ts-node-dev --respawn --transpile-only src/main/server.ts

[INFO] 19:09:42 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.4.4)
[2021-11-22T18:09:55.620Z] INFO (Yoda-Pay/5812 on localhost): Server running at localhost:4000

```

>You can find in the root folder a file named `postman.json` containing a collection with a few requests which you can use to test the endpoints using [Postman](https://www.postman.com/downloads/). To know more about it, visit the following link [Import data files](https://learning.postman.com/docs/running-collections/working-with-data-files/).

#### 4- Open the API Docs to learn more about the available endpoints, how to use them, and all of its allowed parameters. Go to the API docs through your browser, hit the endpoint `'/api-docs'` for example `http://localhost:4000/api-docs`
![Gif](https://res.cloudinary.com/olyn/image/upload/v1637603895/GitHub%20Images/SwaggerYodaPay_vw4iyl.gif)

![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :bar_chart: Tests
To execute the tests, run the following command:
```bash
npm run test
```
You should have a similar output:
![Gif](https://res.cloudinary.com/olyn/image/upload/v1637602721/GitHub%20Images/RunTestsTodaPay_nytdxj.gif)

![-----------------------------------------------------](https://res.cloudinary.com/olyn/image/upload/v1637594127/GitHub%20Images/rainbow_xj5iyq.png)

## :whale2: Running in Docker

You can run the application on Docker, using the docker-compose commands to do so:
```bash
docker-compose build --no-cache
docker-compose up
```

By default, it listens to **port 4000**, but you can change it in `docker-compose.yml` file, as follows:
![Gif](https://res.cloudinary.com/olyn/image/upload/v1637601797/GitHub%20Images/ChangeDockerPort_kky8qk.gif)
