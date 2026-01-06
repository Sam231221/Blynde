# Blynde Server Setup Guide

This guide will help you set up the Blynde Django server locally using Poetry.

## Prerequisites

- Python 3.13 (as specified in `.python-version`)
- Poetry installed on your system
- PostgreSQL database

---

## Installation by Platform

Choose your operating system below for platform-specific installation instructions.

### 🍎 macOS Installation

#### 1. Install Python 3.13

**Using Homebrew (Recommended):**

```bash
brew install python@3.13
```

**Or using pyenv:**

```bash
# Install pyenv if not already installed
brew install pyenv

# Install Python 3.13.7
pyenv install 3.13.7
pyenv local 3.13.7
```

#### 2. Install Poetry

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

Add Poetry to your PATH by adding this to `~/.zshrc` or `~/.bash_profile`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then reload your shell:

```bash
source ~/.zshrc  # or source ~/.bash_profile
```

**Or install using Homebrew:**

```bash
brew install poetry
```

#### 3. Install PostgreSQL

```bash
brew install postgresql@15
brew services start postgresql@15
```

#### 4. Navigate to server directory

```bash
cd server
```

#### 5. Configure Poetry

```bash
poetry config virtualenvs.in-project true
```

#### 6. Install dependencies

```bash
poetry install
```

#### 7. Activate virtual environment

```bash
poetry shell
# or manually:
source .venv/bin/activate
```

#### 8. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values (see [Environment Variables](#environment-variables) section below).

#### 9. Set up database

```bash
# Create database
createdb blynde_db

# Or using psql
psql postgres
CREATE DATABASE blynde_db;
\q
```

#### 10. Run migrations

```bash
poetry run python manage.py migrate
```

#### 11. Create superuser (optional)

```bash
poetry run python manage.py createsuperuser
```

#### 12. Run development server

```bash
poetry run python manage.py runserver
```

---

### 🐧 Linux Installation

#### 1. Install Python 3.13

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa
sudo apt update
sudo apt install python3.13 python3.13-venv python3.13-dev
```

**Fedora/RHEL:**

```bash
sudo dnf install python3.13 python3.13-devel
```

**Or using pyenv:**

```bash
# Install pyenv dependencies
sudo apt install -y make build-essential libssl-dev zlib1g-dev \
  libbz2-dev libreadline-dev libsqlite3-dev wget curl llvm \
  libncurses5-dev libncursesw5-dev xz-utils tk-dev libffi-dev \
  liblzma-dev python3-openssl git

# Install pyenv
curl https://pyenv.run | bash

# Add to ~/.bashrc or ~/.zshrc
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo 'command -v pyenv >/dev/null || export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc

source ~/.bashrc

# Install Python 3.13.7
pyenv install 3.13.7
pyenv local 3.13.7
```

#### 2. Install Poetry

```bash
curl -sSL https://install.python-poetry.org | python3 -
```

Add Poetry to your PATH by adding this to `~/.bashrc` or `~/.zshrc`:

```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then reload your shell:

```bash
source ~/.bashrc  # or source ~/.zshrc
```

#### 3. Install PostgreSQL

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Fedora/RHEL:**

```bash
sudo dnf install postgresql postgresql-server
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### 4. Navigate to server directory

```bash
cd server
```

#### 5. Configure Poetry

```bash
poetry config virtualenvs.in-project true
```

#### 6. Install dependencies

```bash
poetry install
```

#### 7. Activate virtual environment

```bash
poetry shell
# or manually:
source .venv/bin/activate
```

#### 8. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` with your actual values (see [Environment Variables](#environment-variables) section below).

#### 9. Set up database

```bash
# Switch to postgres user and create database
sudo -u postgres psql
CREATE DATABASE blynde_db;
CREATE USER your_username WITH PASSWORD 'your_password';
ALTER ROLE your_username SET client_encoding TO 'utf8';
ALTER ROLE your_username SET default_transaction_isolation TO 'read committed';
ALTER ROLE your_username SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE blynde_db TO your_username;
\q
```

#### 10. Run migrations

```bash
poetry run python manage.py migrate
```

#### 11. Create superuser (optional)

```bash
poetry run python manage.py createsuperuser
```

#### 12. Run development server

```bash
poetry run python manage.py runserver
```

---

### 🪟 Windows Installation

#### 1. Install Python 3.13

**Using Python Installer:**

1. Download Python 3.13 from [python.org](https://www.python.org/downloads/)
2. Run the installer
3. **Important:** Check "Add Python to PATH" during installation
4. Verify installation:

```powershell
python --version
```

**Or using pyenv-win:**

```powershell
# Install pyenv-win
git clone https://github.com/pyenv-win/pyenv-win.git $HOME\.pyenv

# Add to PATH (PowerShell)
[System.Environment]::SetEnvironmentVariable('PYENV',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
[System.Environment]::SetEnvironmentVariable('PYENV_ROOT',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")
[System.Environment]::SetEnvironmentVariable('PYENV_HOME',$env:USERPROFILE + "\.pyenv\pyenv-win\","User")

# Install Python 3.13.7
pyenv install 3.13.7
pyenv local 3.13.7
```

#### 2. Install Poetry

**Using PowerShell:**

```powershell
(Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | python -
```

**Or using pip:**

```powershell
pip install poetry
```

Add Poetry to PATH (if not automatically added):

1. Open System Properties → Environment Variables
2. Add `%APPDATA%\Python\Scripts` to User PATH
3. Restart your terminal

#### 3. Install PostgreSQL

1. Download PostgreSQL from [postgresql.org](https://www.postgresql.org/download/windows/)
2. Run the installer
3. Remember the password you set for the `postgres` user
4. PostgreSQL service should start automatically

#### 4. Navigate to server directory

```powershell
cd server
```

#### 5. Configure Poetry

```powershell
poetry config virtualenvs.in-project true
```

#### 6. Install dependencies

```powershell
poetry install
```

#### 7. Activate virtual environment

```powershell
poetry shell
# or manually:
.venv\Scripts\activate
```

#### 8. Set up environment variables

```powershell
# PowerShell
Copy-Item .env.example .env

# Or Command Prompt
copy .env.example .env
```

Edit `.env` with your actual values (see [Environment Variables](#environment-variables) section below).

#### 9. Set up database

**Using pgAdmin (GUI):**

1. Open pgAdmin
2. Connect to PostgreSQL server
3. Right-click "Databases" → Create → Database
4. Name it `blynde_db`

**Or using psql (Command Line):**

```powershell
# Open psql (may need full path)
psql -U postgres

# In psql prompt:
CREATE DATABASE blynde_db;
\q
```

#### 10. Run migrations

```powershell
poetry run python manage.py migrate
```

#### 11. Create superuser (optional)

```powershell
poetry run python manage.py createsuperuser
```

#### 12. Run development server

```powershell
poetry run python manage.py runserver
```

---

## Environment Variables

After copying `.env.example` to `.env`, configure the following required variables:

- **`SECRET_KEY`** - Django secret key
  - Generate with: `poetry run python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`
- **`DJANGO_BASE_URL`** - Backend URL (e.g., `http://127.0.0.1:8000`)
- **`FRONTEND_BASE_URL`** - Frontend URL (e.g., `http://localhost:5173`)
- **Database Configuration:**
  - Either use individual settings: `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_HOST`, `DATABASE_PORT`
  - Or use `DATABASE_URL` (takes precedence if set): `postgresql://user:password@localhost:5432/blynde_db`
- **`IMAGEKIT_PRIVATE_KEY`**, **`IMAGEKIT_PUBLIC_KEY`**, **`IMAGEKIT_URL_ENDPOINT`** - For image storage
- **`EMAIL_HOST_USER`**, **`EMAIL_HOST_PASSWORD`** - For email functionality
- **`GOOGLE_RECAPTCHA_SECRET_KEY`** - For reCAPTCHA validation

See `.env.example` for all available configuration options.

## Common Poetry Commands

- `poetry install` - Install all dependencies
- `poetry add <package>` - Add a new dependency
- `poetry add --group dev <package>` - Add a development dependency
- `poetry remove <package>` - Remove a dependency
- `poetry update` - Update dependencies to latest compatible versions
- `poetry update <package>` - Update a specific package
- `poetry show` - List all installed packages
- `poetry shell` - Activate the virtual environment
- `poetry run <command>` - Run a command in the virtual environment
- `poetry lock` - Update the lock file without installing

## Troubleshooting

### Poetry not found

**macOS/Linux:**

- Make sure Poetry is in your PATH
- Add to `~/.zshrc` or `~/.bashrc`: `export PATH="$HOME/.local/bin:$PATH"`
- Restart your terminal or run: `source ~/.zshrc` (or `source ~/.bashrc`)

**Windows:**

- Check if Poetry is in PATH: `echo $env:Path` (PowerShell)
- Add Poetry to PATH manually via System Properties → Environment Variables
- Add: `%APPDATA%\Python\Scripts` to User PATH
- Restart your terminal

### Python version mismatch

Ensure you have Python 3.13 installed:

```bash
# macOS/Linux
python3 --version
# or
python --version

# Windows
python --version
```

**If using pyenv:**

```bash
# macOS/Linux
pyenv local 3.13.7
pyenv versions

# Windows (pyenv-win)
pyenv local 3.13.7
pyenv versions
```

**If Python 3.13 is not found:**

- **macOS:** `brew install python@3.13` or use pyenv
- **Linux:** Follow platform-specific Python 3.13 installation steps above
- **Windows:** Download from [python.org](https://www.python.org/downloads/) and ensure "Add to PATH" is checked

### Virtual environment issues

**All platforms:**

```bash
poetry env remove python
poetry install
```

**Windows-specific:**

- If activation fails, try: `.venv\Scripts\Activate.ps1`
- If PowerShell execution policy blocks scripts: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`

### Dependency conflicts

If you encounter dependency conflicts:

```bash
poetry lock --no-update
poetry install
```

### PostgreSQL connection issues

**macOS:**

- Ensure PostgreSQL is running: `brew services list`
- Start if needed: `brew services start postgresql@15`

**Linux:**

- Check service status: `sudo systemctl status postgresql`
- Start if needed: `sudo systemctl start postgresql`

**Windows:**

- Check services: Open Services (services.msc) and verify PostgreSQL service is running
- Or use: `pg_ctl status -D "C:\Program Files\PostgreSQL\15\data"`

### Permission errors (Linux/macOS)

If you get permission errors with PostgreSQL:

```bash
# Linux - ensure user has access
sudo -u postgres createuser -s your_username

# macOS - may need to create user
createuser -s your_username
```

## Project Structure

- `Blynde/` - Main Django project configuration
- `Mbase/` - Main application code
- `manage.py` - Django management script
- `pyproject.toml` - Poetry configuration and dependencies
- `poetry.lock` - Locked dependency versions
- `requirements.txt` - Alternative dependency list (for pip users)

## Additional Notes

- The project uses Django 5.1.5
- Local settings are configured in `Blynde/settings/local.py`
- The default settings module is set to `Blynde.settings.local`
- CORS is configured to allow requests from `localhost:3000` and `localhost:5173`
