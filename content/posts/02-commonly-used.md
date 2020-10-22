---
title: "Commonly Used Commands"
description: "Quick reference for useful commands"
date: 2019-11-28
---

### scp

```bash
scp -i path_to_secret.pem local_file.txt remote_username@10.10.0.2:/remote/directory
scp -i path_to_secret.pem remote_username@10.10.0.2:/remote/file.txt /local/directory
scp user1@host_1.com:/files/file.txt user2@host_2.com:/files
```

### ssh

```bash
ssh-keygen -t rsa -b 4096 -C "foo@bar.com"
```

```bash
# ~/.ssh/config (macOS)

Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa
```

```bash
ssh-add -K ~/.ssh/id_rsa
```

```bash
# ~/.ssh/config (bg SSH session with port forwarding
# e.g. running remote jupyter notebooks)

Host foo
  Hostname [public ipv4]
  User [user]
  IdentityFile [path_to_secret.pem]

$ ssh -NfL 9999:localhost:8888 foo
```

### psql

```bash
 \l         # list databases
 \c orders  # switch to database 'orders'
 \dt        # list tables
 \conninfo  # echo connection info
 \des       # list foreign servers
 \dew       # list foreign data wrappers
 \?         # get meta-command help'
```

```bash
psql -h [host] -p [port] -d [db] -U [user]
```
