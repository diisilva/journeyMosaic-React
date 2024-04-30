# journeyMosaic

journeyMosaic is a software application designed to assist users in planning trips. It is entirely user-driven, allowing users to input their travel data and activities. The software serves as an organizer and reminder for the user's planned activities.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have a Windows, Linux, or Mac machine with admin access and internet connectivity.
* You have installed the latest version of [Docker Desktop](https://www.docker.com/products/docker-desktop) for your operating system.

## Installation

To install journeyMosaic, follow these steps:

1. Clone the project repository to your local machine:

    ```bash
    git clone https://github.com/diisilva/journeyMosaic-React
    ```

2. Navigate to the project directory:

    ```bash
    cd journeyMosaic-React
    ```

3. Use Docker Compose to build and run the containers:

    ```bash
    docker-compose -f docker-compose.yml up --build -d
    ```

    This command will start all the services defined in your `docker-compose.yml` file in detached mode.

## Usage

Once the application is running, you can access the journeyMosaic software in your web browser:

* **Frontend:** Open your browser and go to `http://localhost:3000` to access the frontend interface.
* **Backend API:** The API server can be accessed via `http://localhost:4000`. The API endpoints include `/register` for user registration and `/login` for user authentication.

## Contributing to journeyMosaic

To contribute to journeyMosaic, follow these steps:

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <project_name>/<location>`
5. Create the pull request.

Alternatively, see the GitHub documentation on [creating a pull request](https://help.github.com/articles/creating-a-pull-request/).

## Contributors

Thanks to the following people who have contributed to this project:

* [@diisilva](https://github.com/diisilva) (project creator)

## Contact

If you want to contact me you can reach me at <Team@Emails>.

## License

This project uses the following license: [MIT](<link_to_license>).
