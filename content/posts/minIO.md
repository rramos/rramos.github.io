---
title: minIO
date: "2024-06-10T02:00:00+00:00"
lang: en
tags:
  - PaaS
  - Infrastructure
  - Utils
---

This article I will go over MinIO a object storage solution

## Intro ##

MinIO is an object storage solution that provides an Amazon Web Services S3-compatible API and supports all core S3 features. MinIO is built to deploy anywhere - public or private cloud, baremetal infrastructure, orchestrated environments, and edge infrastructure.

## Features ##

## Install ##

Installed the Arch package with pacman but check the [documentation](https://min.io/docs/minio/linux/index.html) for other methods based on your system.

```sh
sudo pacman -S minio
```

## Launch the MinIO Server ##

Run the following command from the system terminal or shell to start a local MinIO instance using the `./data` folder to store the data.

```sh
mkdir data
minio server ./data
```

You should be granted with information on the endpoints for the API, WebUI and CLI.

## Testing locally ##

### Tofu ###

The following repo provides one example where you can setup as code the required containers using the minio terraform provider.

Clone the following repo which will create a sample bucket and a dummy text_file

```sh
git clone git@github.com:rramos/tofu-minio.git
cd tofu-minio
tofu init
tofu plan
tofu apply
```

After applying that plan you will have a bucket called `state-terraform-s3` with a object `text.txt`.

Let's use other options now.

## Console ##

The MinIO Console is a rich graphical user interface that provides similar functionality to the `mc` or `mcli` command line tool.
You can access it view browser

* <http://127.0.0.1:43675/login>

**NOTE:** The port used by MinIO depends on the configuration specified when you started the service. To determine the port, check the output of the server startup command

## CLI ##

The MinIO Client `mc` or `mcli` command line tool provides a modern alternative to UNIX commands like ls, cat, cp, mirror, and diff with support for both filesystems and Amazon S3-compatible cloud storage services.

You should setup alias for your services (Obtain the service key and secret from the console)

```sh
mcli alias set myio http://192.168.1.178:9000 ACCESS_KEY SECRET_KEY
```

After that we can check if our service is operational with 

```sh
mcli admin info myio
```

You should have a similar output

```text
$ mcli admin info myio
●  192.168.1.178:9000
   Uptime: 10 minutes 
   Version: 2024-06-06T09:36:42Z
   Network: 1/1 OK 
   Drives: 1/1 OK 
   Pool: 1

┌──────┬────────────────────────┬─────────────────────┬──────────────┐
│ Pool │ Drives Usage           │ Erasure stripe size │ Erasure sets │
│ 1st  │ 85.9% (total: 953 GiB) │ 1                   │ 1            │
└──────┴────────────────────────┴─────────────────────┴──────────────┘

27 B Used, 1 Bucket, 1 Object, 1 Version
1 drive online, 0 drives offline, EC:0
```

We can now use the cli to execute tradicional operations

```sh
mcli cp file.txt myio/state-terraform-s3/file.txt
```

The full list of commands is available on the following URL

* <https://min.io/docs/minio/linux/reference/minio-mc.html>

## API ##

In this example we will be copying data though the API using the minio module, let's start by installing the required pip package.

```sh
pip install minio
```

Next generate a key/secret in the console and update the following python code `minio_cp.py`

```python
from minio import Minio
from minio.error import S3Error

# MinIO server credentials
MINIO_URL = "127.0.0.1:9000"  # or your MinIO server URL
ACCESS_KEY = "ACCESS_KEY"
SECRET_KEY = "SECRET_KEY"

# Initialize the MinIO client
minio_client = Minio(
    MINIO_URL,
    access_key=ACCESS_KEY,
    secret_key=SECRET_KEY,
    secure=False  # Set to False if you are not using HTTPS
)

# File to upload
file_path = "./file2.txt"
bucket_name = "state-terraform-s3"
object_name = "file2.txt"

# Ensure the bucket exists
found = minio_client.bucket_exists(bucket_name)
if not found:
    minio_client.make_bucket(bucket_name)
else:
    print(f"Bucket '{bucket_name}' already exists")

# Upload the file
try:
    minio_client.fput_object(
        bucket_name, object_name, file_path
    )
    print(f"'{file_path}' is successfully uploaded as '{object_name}' to bucket '{bucket_name}'.")
except S3Error as err:
    print(f"Error occurred: {err}")
```

You can test by generating a new `file2.txt` and executing the code.

```sh
echo "This is file2.txt > file2.txt"
python minio_cp.py
```

**TODO**: This example is merely explanatory and doesn't use secure connection. It is not advisable to run it in production.

## Example ##

one example with DuckDB creating a table pointing for that storage where `sample_data.csv` file exists

```sql
CREATE SECRET secret1 (
    TYPE S3,
    KEY_ID 'ACCESS_KEY',
    SECRET 'SECRET_KEY',
    REGION 'us-east-1',
    ENDPOINT 'localhost:9000',
    URL_STYLE 'path', 
    USE_SSL false
);

SELECT * FROM 's3://state-terraform-s3/sample_data.csv';
```

**NOTE:** Replace the ACCESS_KEY and SECRET from the ones provided in the console.

## Replication ##

MinIO supports server-side and client-side replication of objects between source and destination buckets.

### Server-Side Bucket Replication ###

Configure per-bucket rules for automatically synchronizing objects between MinIO deployments. The deployment where you configure the bucket replication rule acts as the “source” while the configured remote deployment acts as the “target”

### Client-side Bucket Replication ###

Use the command process to synchronize objects between buckets within the same S3-compatible cluster or between two independent S3-compatible clusters

### Replication of Delete Operations ###

MinIO supports replicating delete operations, where MinIO synchronizes deleting specific object versions and new delete markers. Delete operation replication uses the same replication process as all other replication operations.

### Synchronous vs Asynchronous Replication ###

MinIO supports specifying either asynchronous (default) or synchronous replication for a given remote target.

## Replication Process ##

MinIO uses a replication queuing system with multiple concurrent replication workers operating on that queue. MinIO continuously works to replicate and remove objects from the queue while scanning for new unreplicated objects to add to the queue.

## Conclusion ##

MinIO grew to become the most broadly deployed object store on the planet by focusing on what mattered the most to developers, architects and applications. The service can be configured in several ways depending on the scalability, replication and level of service that you want for your solution design. Also brings the advantage of developers being able to deploy it locally and later extend for a more robust solution or even pay for that service if you don't want to deal with this type of operation.

The integration with several solutions and support for several APIs show strong potential for being a Big Player on the Lakehouse Architecture. Recommend the reading of the article [DuckDB and MinIO for a Modern Data Stack](https://blog.min.io/duckdb-and-minio-for-a-modern-data-stack/) if you like to know more.

MinIO offers a variety of replication options, making it an excellent choice for multi-cloud solutions. These replication capabilities ensure high availability, data durability, and efficient disaster recovery across different cloud environments.

## References ##

* <https://min.io/>
* <https://min.io/docs/minio/container/index.html>
* <https://github.com/minio/minio>
* <https://blog.min.io/duckdb-and-minio-for-a-modern-data-stack/>
* <https://registry.terraform.io/providers/aminueza/minio/latest/docs>
