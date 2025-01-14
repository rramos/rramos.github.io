---
title: Sendmail Relay Configuration
date: "2024-02-18T12:00:00+00:00"
lang: en
tags:
  - WebHosting
  - Mail
---

In this article we will go through the configuration process for Sendmail in order to relay to Mailjet.

## Intro ##

In this article I will go through the process of setting up Sendmail to relay email to MailJet service.

There are several options to setup relaying on your web hosting service, and also several providers that you can consider.

Incorporating the SMTP relay service with Mailjet allows to take advantage of other services provided such and Campaign management.

## Requirements ##

* For this setup you will need to have access to your server and permissions to install software.
* Create one account on MailJet service
* Have permissions to change your domain DNS records

## MailJet ##

For this setup we are considering MailJet service but you can use a different one.
Depending on the tier level, you will have different limitations.

The Free tier allows:

* 200 emails per day
* 1500 contacts
* 6000 emails p/month

It is a good point to start and later increase if it makes sense.

### DNS ###

SPF & DKIM are authentication systems that tell Internet Service Providers (ISPs), like Gmail and Yahoo, that incoming mail has been sent from an authorized system, and that it is not spam or email spoofing. To set Mailjet as an authorized sender and improve your deliverability, you need to modify your DNS records to include DKIM signature and SPF.

This [document](https://documentation.mailjet.com/hc/en-us/articles/360042412734-Authenticating-Domains-with-SPF-DKIM) provides more detailed information

But basically you will need to include 2 TXT records

* **type**: TXT , **host**: @ , **value**: "v=spf1 include:spf.mailjet.com ~all"

If you run a DNS query on your domain for TXT you need to see that info

```bash
dig -t TXT yourdomain.com
```

You also need to include the DKIM record follow the instructions provided

* <https://app.mailjet.com/account/sender?type=auth>

There is one option to validate if the configuration is working properly

### Add Domains ###

You will also need to configure the allowed domains that will be allowed and validate senders.

In the following URL you can make those:

* <https://app.mailjet.com/account/sender?type=domain>

### API Keys ###

The last step would be to create an API key for your service.

Go to following URL and create a new key, note it down as it will be required later.

* <https://app.mailjet.com/account/apikeys>

Ok, now let's configure our MTA

## Configure Sendmail ##

For this setup you will need access to your hosting service and capable of installing software.

The following instructions are for a Ubuntu base distribution.

### Install packages ###

```bash
sudo apt-get install sendmail
```

## Configuration ##

In this setup we will configure to relay via SMTP all email using auth provided by the service

Start by editing the following file `/etc/mail/sendmail.mc` and add the following content at the end

```mc
dnl # Default Mailer setup
MAILER_DEFINITIONS
define(`SMART_HOST', `in-v3.mailjet.com')dnl
define(`RELAY_MAILER_ARGS', `TCP $h 587')dnl
define(`ESMTP_MAILER_ARGS', `TCP $h 587')dnl
define(`confAUTH_OPTIONS', `A p')dnl
TRUST_AUTH_MECH(`EXTERNAL DIGEST-MD5 CRAM-MD5 LOGIN PLAIN')dnl
define(`confAUTH_MECHANISMS', `EXTERNAL GSSAPI DIGEST-MD5 CRAM-MD5 LOGIN PLAIN')dnl
FEATURE(`authinfo',`hash -o /etc/mail/authinfo/smtp-auth.db')dnl
MAILER(`local')dnl
MAILER(`smtp')dnl
```

We need to setup authentication, remember the previous API key that you created you will need to include the information associaded to API_KEY and API_SECRET on the following file `/etc/mail/authinfo/smtp-auth`

```bash
AuthInfo: "U:root" "I:API_KEY" "P:API_SECRET"
```

```sh
sudo mkdir /etc/mail/authinfo
sudo nano /etc/mail/authinfo/smtp-auth
```

Example:

```bash
AuthInfo: "U:root" "I:1233450786523741256e" "P:ety555qtfgdghsd88wrfer"
```

After this you need to run the following command to update the service configuration
files

```bash
make -C /etc/mail
```

And restart sendmail service

```bash
systemctl restart sendmail
```

## Test ##

In order to test you can execute the following command

```bash
echo "Test Email" | mail -s "Subject Here" recipient@example.com 
```

You can now check in MailJet [Stats](https://app.mailjet.com/stats) session if your mail pass there.

## Troubleshooting ##

You can check with the `mailq` command to understand if there is mail being block and the logs in `/var/log/mail.log` to understand if there is some issue.

## Conclusion ##

In this article we went though the configuration of Sendmail service to relay emails through the Mailjet service. It covers the necessary configurations in both DNS and the Mailjet service to ensure seamless email delivery from your web hosting server.

## References ##

* <https://en.wikipedia.org/wiki/Sendmail>
* <https://www.mailjet.com>
* <https://dev.mailjet.com/smtp-relay/overview/>
* <https://gist.github.com/josectheone/a86b58eb71f25dcfe4b54ae590994cc7>
