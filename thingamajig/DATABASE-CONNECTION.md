# Connecting to the database

## Connect to Bastion

`ssh -i ~/clients/ovaisoozeer/dev-bastion-rsa.pem ec2-user@ec2-3-10-190-252.eu-west-2.compute.amazonaws.com`

- NB: machine name/IP will change upon bastion reboot

## Connect to DB from Bastion

### One-time setup

`sudo dnf update -y`
`sudo dnf install mariadb105`

### Connect using MariaDB mySql client

`mysql -h thingamajig-customer-accounts.c3wmeaw427mk.eu-west-2.rds.amazonaws.com -P 3306 -u ovaisoozeer thingamajig_customer_accounts -p`
