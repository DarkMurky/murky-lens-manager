# Lens View
A modern Web UI to manage your applications.


## Run Locally

Follow backend setup:
https://github.com/DarkMurky/murky-lens-server
<br/>
<br/>
Clone the project

```bash
git clone https://github.com/DarkMurky/murky-lens-manager.git
```

Go to the project directory

```bash
cd  murky-lens-manager
```

Create .env file
```bash
NEXT_PUBLIC_DB_HOST=<http://lens-server:3001>
NODE_ENV=production
```

Compose using docker:

```bash
docker-compose up -d
```



## Usage

```
Open: 127.0.0.1:3000
```

## Kubernetes

Kubernetes infrastructure for project

[infrastructure](https://github.com/DarkMurky/murky-view-infrasturcture)