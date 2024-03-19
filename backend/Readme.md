

# Music Details Django Project

This Django project manages music details using a RESTful API.

## Project Overview

The project includes Django models to store details of various music tracks. It provides API endpoints for retrieving, creating, updating, and exporting music details.

## Installation

### Prerequisites

- Python 3.x
- pip (Python package manager)

### Setting Up a Python Virtual Environment

It's recommended to use a Python virtual environment to isolate project dependencies. Follow these steps to create a virtual environment:

#### Windows

1. Open Command Prompt or PowerShell.
2. Navigate to your project directory.
3. Run the following command to create a virtual environment named `venv`:

    ```shell
    python -m venv venv
    ```

4. Activate the virtual environment:

    ```shell
    .\venv\Scripts\activate
    ```

#### macOS

1. Open Terminal.
2. Navigate to your project directory.
3. Run the following command to create a virtual environment named `venv`:

    ```shell
    python3 -m venv venv
    ```

4. Activate the virtual environment:

    ```shell
    source venv/bin/activate
    ```

### Installing Dependencies

Once the virtual environment is activated, install project dependencies using pip:

```shell
pip install -r requirements.txt
```

## Usage

### Running the Django Development Server

1. Make sure your virtual environment is activated.
2. Navigate to your project directory in the terminal.
3. Install all the requeiments from this command 
    pip install -r requriments.txt
4. Run the following command to start the Django development server:

    ```shell
    python manage.py runserver
    ```

5. Access the API endpoints in your web browser or using tools like Postman.

### Accessing API Endpoints

- **Music Details API**: `http://localhost:8000/music/`
- **Song Details API**: `http://localhost:8000/song/`
- **Export Songs API**: `http://localhost:8000/export/`

6.I have also attatched postman collection 
## License

This project is licensed under the [MIT License](LICENSE).
```

Make sure to replace placeholders like `LICENSE` with the actual license file if applicable. This README provides basic instructions for setting up the project and running it.