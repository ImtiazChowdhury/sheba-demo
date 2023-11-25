# Edtech System Demo

This is a demo application for ed-tech as per requirements. I have taken some liberty to design the API as I saw fit and used a custom modular code architecture using `express`. I have also used some of my own modules to make the development easier like `@imtiazchowdhury/mongopool` and `mongodb-paginate`.

## Installation

* **clone the project from github**

```sh
git clone https://github.com/ImtiazChowdhury/sheba-demo
```

* **Install dependencies**

```sh
npm install
```

* **Add environment variables**
Copy the `.env.example` file contents and create a file named `.env` and set the appropriate environment variables. Example:

```properties
PORT=5000
MONGO_URL='mongodb://127.0.0.1:27017'
DB_NAME='sheba_edtech_demo_imtiaz'
```
  
* **start the server**

```sh
npm start
```

* **start server in development mode (with nodemon auto restart)**

```sh
npm run dev
```

## Test

```sh
npm run test
```

> **Note:** tests will run on a temporary database which will be auto deleted when test are completed.

## API Doc

The application currently has the following API endpoints:  

### Create Course

**Endpoint**: `/course`
**Method**: `POST`
**Content-Type**: `application/json` | `multipart/form-data` | `application/x-www-form-urlencoded`
**Request Body**:

```ts
{
    "title": string,
    "description": string,
    "instructor": string,
    "duration": number,
    "price": number 
}
```

**Response Body**:

status 201:

```ts
{
    "title": string,
    "description": string,
    "instructor": string,
    "duration": number,
    "price": number,
    "_id": string //mongodb object id
}

```

status 400:

```ts
{
    [index:string]: string, //erroneous property name with error message
}
```

### List Course

**Endpoint**: `/course`
**Method**: `GET`
**Request Parameters**:

|Parameter  |Value                                          |
|-----------|-----------------------------------------------|
|`id`        | course id; multiple; separated by comma       |
|`instructor`| instructor name; multiple; separated by comma |
|`duration`  | course duration                               |
|`price`     | course price                                  |
|`page`      | page number                                   |
|`limit`     | number of items per page                      |
|`sort`      | key to sort by; id\| instructor\|duration\|price  |
|`sortOrder` | 1 for ascending \| -1 for descending          |

**Response Body**:

status 200:

```ts
{
    "page": {
        "totalIndex": Number,
        "totalPage": Number,
        "currentPage": Number,
        "nextPage": Number | null,
        "previousPage": Number | null,
        "startingIndex": Number,
        "endingIndex": Number,
        "itemsOnCurrentPage": Number,
        "limit": Number,
        "sort": string,
        "sortOrder": 1 | -1
    },
    "data": Course[]
}
```

### Course Detail

**Endpoint**: `/course/:id`
**Method**: `GET`  
**URL Parameters**:

|Parameter  |Value                                          |
|-----------|-----------------------------------------------|
|`id`        | course id; single                            |

**Response Body**:

status 200:

```ts
{
    "title": string,
    "description": string,
    "instructor": string,
    "duration": number,
    "price": number,
    "_id": string
}
```

### Create Enrollment

**Endpoint**: `/enrollment`
**Method**: `POST`
**Content-Type**: `application/json` | `multipart/form-data` | `application/x-www-form-urlencoded`
**Request Body**:

```ts
{
    "student": string,
    "course": string //course id; mongodb object id 
}
```

**Response Body**:

status 201:

```ts
{
    "student": string,
    "course": string,
    "enrollmentDate": Date,
    "_id": string
}

```

status 400:

```ts
{
    [index:string]: string, //erroneous property name with error message
}
```
