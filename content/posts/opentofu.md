---
title: OpenTofu
date: "2024-06-07T10:30:00+00:00"
lang: en
tags:
  - CI/CD
  - OpenSource
---

In this article I will go through OpenTofu

## Intro ##

OpenTofu is a Terraform fork, created as an initiative of Gruntwork, Spacelift, Harness, Env0, Scalr, and others, in response to HashiCorp’s switch from an open-source license to the BUSL.

## Manifesto ##

> Terraform was open-sourced in 2014 under the Mozilla Public License (v2.0) (the “MPL”). Over the next ~9 years, it built up a community that included thousands of users, contributors, customers, certified practitioners, vendors, and an ecosystem of open-source modules, plugins, libraries, and extensions.
> Then, on August 10th, 2023, with little or no advance notice or chance for much, if not all, of the community to have any input, HashiCorp switched the license for Terraform from the MPL to the Business Source License (v1.1) (the “BUSL”), a non-open source license. In our opinion, this change threatens the entire community and ecosystem that's built up around Terraform over the last 9 years.

Full Manifesto [here](https://opentofu.org/manifesto/)

## What are the differences between OpenTofu and Terraform ##

On the technical level, OpenTofu 1.6.x is very similar feature-wise to Terraform 1.6.x. In the future, the projects feature sets will diverge.

The other main difference is that OpenTofu is open-source, and it's goal is to be driven in a collaborative way with no single company being able to dictate the roadmap.

## How does OpenTofu work? ##

OpenTofu creates and manages resources on cloud platforms and other services through their application programming interfaces (APIs). Providers enable OpenTofu to work with virtually any platform or service with an accessible API.

## Why OpenToFu ##

### Track your infrastructure ###

​
OpenTofu generates a plan and prompts you for your approval before modifying your infrastructure. It also keeps track of your real infrastructure in a state file, which acts as a source of truth for your environment. OpenTofu uses the state file to determine the changes to make to your infrastructure so that it will match your configuration.

### Automate changes​ ###

OpenTofu configuration files are declarative, meaning that they describe the end state of your infrastructure. You do not need to write step-by-step instructions to create resources because OpenTofu handles the underlying logic. OpenTofu builds a resource graph to determine resource dependencies and creates or modifies non-dependent resources in parallel. This allows OpenTofu to provision resources efficiently.

### Standardize configurations ###

​
OpenTofu supports reusable configuration components called modules that define configurable collections of infrastructure, saving time and encouraging best practices. You can use publicly available modules from the OpenTofu Registry, or write your own.

### Collaborate ###

​
Since your configuration is written in a file, you can commit it to a Version Control System (VCS) and use a cloud backend to efficiently manage OpenTofu workflows across teams. A cloud backend runs OpenTofu in a consistent, reliable environment and provides secure access to shared state and secret data, role-based access controls, a private registry for sharing both modules and providers, and more.

## Getting Started ##

### Install ###

Depending on your system there are several [options available](https://opentofu.org/docs/intro/install/). I'm following the official documentation for Ubuntu.

Install required software

```sh
sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
```

Install required repository keys

```sh
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://get.opentofu.org/opentofu.gpg | sudo tee /etc/apt/keyrings/opentofu.gpg >/dev/null
curl -fsSL https://packages.opentofu.org/opentofu/tofu/gpgkey | sudo gpg --no-tty --batch --dearmor -o /etc/apt/keyrings/opentofu-repo.gpg >/dev/null
sudo chmod a+r /etc/apt/keyrings/opentofu.gpg /etc/apt/keyrings/opentofu-repo.gpg
```

Create the source repositories list to install

```sh
echo   "deb [signed-by=/etc/apt/keyrings/opentofu.gpg,/etc/apt/keyrings/opentofu-repo.gpg] https://packages.opentofu.org/opentofu/tofu/any/ any main
deb-src [signed-by=/etc/apt/keyrings/opentofu.gpg,/etc/apt/keyrings/opentofu-repo.gpg] https://packages.opentofu.org/opentofu/tofu/any/ any main" |   sudo tee /etc/apt/sources.list.d/opentofu.list > /dev/null
sudo chmod a+r /etc/apt/sources.list.d/opentofu.list
```

Install tofu

```sh
sudo apt-get update
sudo apt-get install -y tofu
```

## Working with OpenTofu ##

The core OpenTofu workflow has three steps:

1. **Write** - Author infrastructure as code.
1. **Plan** - Preview changes before applying.
1. **Apply** - Provision reproducible infrastructure.

### Write ###

You write OpenTofu configuration just like you write code:

```text
# Create repository
$ git init my-infra && cd my-infra

Initialized empty Git repository in /.../my-infra/.git/

# Write initial config
$ vim main.tf

# Initialize OpenTofu
$ tofu init

Initializing provider plugins...
# ...
OpenTofu has been successfully initialized!
```

### Plan​ ###

When the feedback loop of the Write step has yielded a change that looks good, it's time to commit your work and review the final plan

```text
git add main.tf
git commit -m 'Managing infrastructure as code!'

[main (root-commit) f735520] Managing infrastructure as code!
 1 file changed, 1 insertion(+)

tofu apply

An execution plan has been generated and is shown below.
# ...
```

### Apply ###

​
After one last check, you are ready to tell OpenTofu to provision real infrastructure.

```text
Do you want to perform these actions?

  OpenTofu will perform the actions described above.
  Only 'yes' will be accepted to approve.
  Enter a value: yes

# ...

Apply complete! Resources: 1 added, 0 changed, 0 destroyed.
```

At this point, it's common to push your version control repository to a remote location for safekeeping.

```sh
git remote add origin https://github.com/*user*/*repo*.git
git push origin main
```

## OpenTofu Language ##

The main OpenTofu Language includes the language syntax, the top-level structures such as `resource`, `module`, and `provider` blocks, the "meta-arguments" in those blocks, and the documented semantics and behaviors for the operators and built-in functions available for use in expressions.

* Reference: <https://opentofu.org/docs/language>

## Ansible vs OpenTofu ##

Let’s distinguish Ansible and Terraform/OpenTofu.

Ansible, known for its agentless architecture and simplicity, focuses on configuration management and application deployment. It excels at:

* Automating repetitive tasks
* Orchestrating complex workflows
* Ensuring consistency across multiple servers

Terraform/OpenToFu, on the other hand, specializes in infrastructure provisioning. It enables you to define and manage your infrastructure as code, abstracting away the complexities of interacting with and provisioning resources like servers and storage on various cloud providers.

It excels at:

* Effectively managing states
* Deploying on multiple environments
* Supporting different platforms

## Docker Example ##

Lets start by testing locally. In this example we will use tofu to manage the installation of docker images locally. The following [repo](https://github.com/rramos/docker-tofu) provides a docker image and the tofu script.

```sh
git clone git@github.com:rramos/docker-tofu.git
```

The main.tf include the provider `kreuzwerker/docker` which allow us to manage docker images. We then define a data source with the name of the docker image in the example repo and a resource which holds the docker configuration. The final step is to wait 10s to wait for the docker to be ready.

```tf
# Specifying Docker provider

terraform {
  required_providers {

    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

# Define the Docker container data source
data "docker_image" "local_image" {
  name = "pure_image"
}

# Define the Docker container resource
resource "docker_container" "pure_app" {
  name  = "pure_app"
  image = data.docker_image.local_image.name

  # Expose port 5000 for Flask app
  ports {
    internal = 5000
    external = 5000
  }
}

# Terraform provisioner to wait for container to be ready
resource "null_resource" "wait_for_container" {

  depends_on = [docker_container.pure_app]
  # Local-exec provisioner to wait for container to be ready

  provisioner "local-exec" {
    command = "sleep 10"
  }
}
```

This block tells Terraform to use the docker provider from the source “kreuzwerker/docker” with version 3.0.2. This provider allows Terraform to interact with Docker to manage container deployments.

Now let's initialize tofu on the `tofu` directory:

```sh
tofu init
```

Now, let's plan with `tofu plan`

You should get something similar

```text
data.docker_image.local_image: Reading...
data.docker_image.local_image: Read complete after 0s [id=sha256:757a1f63e31b42fa0b1773630194013b0bcad26e9ea8b63d89557228488cd175]

OpenTofu used the selected providers to generate the following execution plan. Resource actions are indicated with the following symbols:
  + create

OpenTofu will perform the following actions:

  # docker_container.pure_app will be created
  + resource "docker_container" "pure_app" {
      + attach                                      = false
      + bridge                                      = (known after apply)
      + command                                     = (known after apply)
      + container_logs                              = (known after apply)
      + container_read_refresh_timeout_milliseconds = 15000
      + entrypoint                                  = (known after apply)
      + env                                         = (known after apply)
      + exit_code                                   = (known after apply)
      + hostname                                    = (known after apply)
      + id                                          = (known after apply)
      + image                                       = "pure_image"
      + init                                        = (known after apply)
      + ipc_mode                                    = (known after apply)
      + log_driver                                  = (known after apply)
      + logs                                        = false
      + must_run                                    = true
      + name                                        = "pure_app"
      + network_data                                = (known after apply)
      + read_only                                   = false
      + remove_volumes                              = true
      + restart                                     = "no"
      + rm                                          = false
      + runtime                                     = (known after apply)
      + security_opts                               = (known after apply)
      + shm_size                                    = (known after apply)
      + start                                       = true
      + stdin_open                                  = false
      + stop_signal                                 = (known after apply)
      + stop_timeout                                = (known after apply)
      + tty                                         = false
      + wait                                        = false
      + wait_timeout                                = 60

      + ports {
          + external = 5000
          + internal = 5000
          + ip       = "0.0.0.0"
          + protocol = "tcp"
        }
    }

  # null_resource.wait_for_container will be created
  + resource "null_resource" "wait_for_container" {
      + id = (known after apply)
    }

Plan: 2 to add, 0 to change, 0 to destroy.
```

You can now execute `tofu apply` and confirm.

You should have access to <http://localhost:5000> and your pure_app running

```sh
docker ps
```

```text
CONTAINER ID   IMAGE        COMMAND           CREATED          STATUS          PORTS                    NAMES
241d930e1b0a   pure_image   "python app.py"   44 seconds ago   Up 43 seconds   0.0.0.0:5000->5000/tcp   pure_app
```

This is a simple example just to validate the previous terraform syntax with opentofu but you can extend this functionality to manage your infrastrcture as code.

My recommendation is to start **day1** with this approach as it is more difficult to adapt later.

## References ##

* <https://opentofu.org/manifesto/>
* <https://opentofu.org/blog/the-opentofu-fork-is-now-available/>
* <https://opentofu.org/docs/intro/migration/>
* <https://opentofu.org/docs/intro/>
* <https://blog.purestorage.com/purely-educational/how-to-deploy-a-docker-image-with-terraform/>
