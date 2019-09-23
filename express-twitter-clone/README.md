# Express Twitter Clone

An express application for a twitter clone.

This project was part of a one week course from Rocketseat.

## Running the application

This project was built using **NodeJs 10.15.0** and **MongoDB**.

- Clone the repository:

```bash
git clone https://github.com/paulosandinof/express-twitter-clone.git
```

- A directory with the name **express-twitter-clone** will be created, access it:

```bash
cd express-twitter-clone
```

- Inside this folder, install the project dependencies:

```bash
yarn install
```

- Copy the **.env.example**:

```bash
cp .env.example .env
```

- Open the **.env** file and put your MongoDB connection URI:

```javascript
DB_CONNECTION_URI = "mongodb://[user]:[password]@[host]:[port]/[database]";
```

- Start the application:

```bash
yarn start
```

## Endpoints

- Get all tweets: `GET /tweets`

- Create a tweet: `POST /tweets`

  ```javascript
  Body example
  {
    "author": "Tweet Author",
    "content" "Tweet content"
  }
  ```

- Like a tweet: `POST /likes/:tweetId`

## TODO

- Use Swagger for documentation
