# Connecting to the database

## Connect to Bastion

`ssh -i ~/clients/ovaisoozeer/dev-bastion-rsa.pem ec2-user@ec2-18-130-122-102.eu-west-2.compute.amazonaws.com`

## Connect to DB from Bastion

### One-time setup

`sudo dnf update -y`
`sudo dnf install mariadb105`

### Connect using MariaDB mySql client

`mysql -h thingamajig-customeraccou-customeraccounts3cf680c2-pew1kjj89caw.c3wmeaw427mk.eu-west-2.rds.amazonaws.com -P 3306 -u thingamajigAdmin -p`
