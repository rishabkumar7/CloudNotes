# AWS Certfied Developer Associate 
## IAM: Identity and Access Management

When accessing AWS, the root account should **never** be used. Users must be created with the proper permissions. IAM is central to AWS.
- Users: A physical person
- Groups: Functions (admin, devops) Teams (engineering, design) which contain a group of users
- Roles: Internal usage within AWS resources
- Policies (JSON documents): Defines what each of the above can and cannot do. **Note**: IAM has predefined managed policies.


#### For big enterprises:
- IAM Federation: Integrate their own repository of users with IAM using SAML standard

### Policies
IAM policies define permissions for an action regardless of the method that you use to perform the operation.

#### Policy types
- Identity-based policies
  - Attach managed and inline policies to IAM identities (users, groups to which users belong, or roles). Identity-based policies grant permissions to an identity.

- Resource-based policies
  - Attach inline policies to resources. The most common examples of resource-based policies are Amazon S3 bucket policies and IAM role trust policies. Resource-based policies grant permissions to a principal entity that is specified in the policy. Principals can be in the same account as the resource or in other accounts.

- Permissions boundaries
  - Use a managed policy as the permissions boundary for an IAM entity (user or role). That policy defines the maximum permissions that the identity-based policies can grant to an entity, but does not grant permissions. Permissions boundaries do not define the maximum permissions that a resource-based policy can grant to an entity.

- Organizations SCPs
  - Use an AWS Organizations service control policy (SCP) to define the maximum permissions for account members of an organization or organizational unit (OU). SCPs limit permissions that identity-based policies or resource-based policies grant to entities (users or roles) within the account, but do not grant permissions.

- Access control lists (ACLs)
  - Use ACLs to control which principals in other accounts can access the resource to which the ACL is attached. ACLs are similar to resource-based policies, although they are the only policy type that does not use the JSON policy document structure. ACLs are cross-account permissions policies that grant permissions to the specified principal entity. ACLs cannot grant permissions to entities within the same account.

- Session policies
  - Pass advanced session policies when you use the AWS CLI or AWS API to assume a role or a federated user. Session policies limit the permissions that the role or user's identity-based policies grant to the session. Session policies limit permissions for a created session, but do not grant permissions. For more information, see Session Policies.

#### AWS Policy Simulator
- When creating new custom policies you can test it here:
  - https://policysim.aws.amazon.com/home/index.jsp
  - This policy tool can you save you time in case your custom policy statement's permission is denied
- Alternatively, you can use the CLI:
    - Some AWS CLI commands (not all) contain `--dry-run` option to simulate API calls. This can be used to test permissions.
    - If the command is successful, you'll get the message: `Request would have succeeded, but DryRun flag is set`
    - Otherwise, you'll be getting the message: `An error occurred (UnauthorizedOperation) when calling the {policy_name} operation`
  
#### Best practices:
- One IAM User per person **ONLY**
- One IAM Role per Application
- IAM credentials should **NEVER** be shared
- Never write IAM credentials in your code. **EVER**
- Never use the ROOT account except for initial setup
- It's best to give users the minimal amount of permissions to perform their job

------------------------------------------

# EC2: Virtual Machines

- [EC2 User Data](#ec2-user-data)
- [EC2 Meta Data](#ec2-meta-data)
- [EC2 Instance Launch Types](#ec2-instance-launch-types)
- [EC2 Pricing](#ec2-pricing)
- [AMIs](#AMIs)
- [EC2 Instances Overview](#ec2-instances-overview)

By default, your EC2 machine comes with:
* A private IP for the internal AWS Network
* A public IP for the WWW

When you SSH into your EC2 machine:
* We can’t use a private IP, because we are not in the same network
* We can only use the public IP

If your machine is stopped and then restarted, the public IP will change

## EC2 User Data
* It is possible to bootstrap our instances using an EC2 User data script
* Bootstrapping means launching commands when a machine starts
* That script is only run once at the instance first start
* Purpose: Ec2 data is used to automated boot tasks such as:
    * Installing updates
    * Installing software
    * Downloading common files from the internet
* The EC2 User Data Script runs with the root user
  
## EC2 Meta Data
* Information about your EC2 instance
* It allows EC2 isntances to "learn" about themselves without having to use an IAM role for that purpose
* Powerful but one of the least known features to developers
* You can retrieve IAM roles from the metadata but **not** IAM policies
* URL: 169.254.169.254/latest/meta-data

## EC2 Instance Launch Types 
- **On Demand Instances**: short workload, predictable pricing
- **Reserved Instances**: long workloads (>= 1 year)
- **Convertible Reserved Instances**: long workloads with flexible instances
- **Scheduled Reserved Instances**: launch within time window you reserve
- **Spot Instances**: short workloads, for cheap, can lose instances
- **Dedicated Instances**: no other customers will share your hardware
- **Dedicated Hosts**: book an entire physical server, control instance placement

#### On Demand Instance:
* Pay for what you use
* Has the highest cost but no upfront payment
* No long term commitment
* Recommended for short-term and un-interrupted workloads, where you can’t predict how the application will behave
#### Reserved Instances
* Up to 75% compared to On-demand
* Pay upfront for what you use with long term commitment
* Reservation period can be 1 or 3 years
* Reserve a specific instance type
* Recommended for steady state usage applications (think database)
#### Convertible Reserved Instances
* Can change the EC2 instance type
* Up to 54% discount
#### Scheduled Reserved Instances
* Launch within time window you reserve
* When you require a fraction of a day / week / month
#### Spot Instances
* Can get a discount of up to 90% compared to On-demand
* You bid a price and get the instance as long as its under the price
* Price varies based on offer and demand
* Spot instances are reclaimed within a 2 minute notification warning when the spot price goes above your bid
* Used for batch jobs, Big Data analysis, or workloads that are resilient to failures
* Not great for critical jobs or databases
#### Dedicated Instances
* Instances running on hardware that’s dedicated to you
* May share hardware with other instances in same account
* No control over instance placement (can move hardware after stop / start)
#### Dedicated Hosts
* Physical dedicated Ec2 server for your use
* Full control of Ec2 Instance placement
* Visibility into the underlying sockets / physical cores of the hardware
* Allocated for your account for a 3 year period reservation
* More expensive
* Useful for software that have a complicated licensing model (Bring your own License)
* Or for a companies that have strong regulatory or compliance needs

#### Which host is right for me?
- On demand: coming and staying in resort whenever we like, we pay the full price 
- Reserved: like planning ahead and if we plan to stay for a long time, we may get a good discount. 
- Spot instances: the hotel allows people to bid for the empty rooms and the highest bidder keeps the rooms.You can get kicked out at any time 
- Dedicated Hosts: We book an entire building of the resort

## EC2 Pricing
- EC2 instances prices (per hour) varies based on these parameters:
  - Region you’re in
  - Instance Type you’re using
  - On-Demand vs Spot vs Reserved vs Dedicated Host
  - Linux vs Windows vs Private OS (RHEL, SLES, Windows SQL)
  - You are billed by the second, with a minimum of 60 seconds. 
  - You also pay for other factors such as storage, data transfer, fixed IP public addresses, load balancing
  - You do not pay for the instance if the instance is stopped 

- Example
  - t2.small in US-EAST-1 (VIRGINIA), cost $0.023 per Hour 
  - If used for:
    - 6 seconds, it costs $0.023/60 = $0.000383 (minimum of 60 seconds)
    - 60 seconds, it costs $0.023/60 = $0.000383 (minimum of 60 seconds)
    - 30 minutes, it costs $0.023/2 = $0.0115
    - 1 month, it costs $0.023 * 24 * 30 = $16.56 (assuming a month is 30 days)
    - X seconds (X > 60), it costs $0.023 * X / 3600 
  - The best way to know the pricing is to consult the pricing page: https://aws.amazon.com/ec2/pricing/on-demand/

## AMIs
### What's AMI?
- As we saw, AWS comes with base images such as:
  - Ubuntu
  - Fedora
  - RedHat
  - Windows
  - Etc...
- These images can be customized at runtime using EC2 User data
- But what if we could create our own image, ready to go?
- That’s an AMI – an image to use to create our instances
- AMIs can be built for Linux or Windows machines 

### Why you use a custom AMI?
- Using a custom built AMI can provide the following advantages:
  - Pre-installed packages needed
  - Faster boot time (no need for long ec2 user data at boot time
  - Machine comes configured with monitoring / enterprise software
  - Security concerns – control over the machines in the network
  - Control of maintenance and updates of AMIs over time
  - Active Directory Integration out of the box
  - Installing your app ahead of time (for faster deploys when auto-scaling)
  - Using someone else’s AMI that is optimized for running an app, DB, etc...
- **AMI are built for a specific AWS region (!)**

## EC2 Instances Overview
- Instances have 5 distinct characteristics advertised on the website:
  - The RAM(type,amount,generation)
  - The CPU(type,make,frequency,generation,numberofcores)
  - The I/O (disk performance, EBS optimisations)
  - The Network (network bandwidth, network latency
  - The Graphical Processing Unit (GPU) 
- It may be daunting to choose the right instance type (there are over 50 of them) - https://aws.amazon.com/ec2/instance-types/ 
- https://ec2instances.info/ can help with summarizing the types of instances 
- R/C/P/G/H/X/I/F/Z/CR are specialised in RAM, CPU, I/O, Network, GPU 
- M instance types are balanced 
- T2/T3 instance types are “burstable”
Burstable Instances (T2)
- AWS has the concept of burstable instances (T2 machines) 
- Burst means that overall, the instance has OK CPU performance. 
- When the machine needs to process something unexpected (a spike in load for example), it can burst, and CPU can be VERY good. 
- If the machine bursts, it utilizes “burst credits” 
- If all the credits are gone, the CPU becomes BAD 
- If the machine stops bursting, credits are accumulated over time
- Burstable instances can be amazing to handle unexpected traffic and getting the insurance that it will be handled correctly 
- If your instance consistently runs low on credit, you need to move to a different kind of non-burstable instance (all the ones described before). 

### T2 Unlimited 
- Nov 2017: It is possible to have an “unlimited burst credit balance
- You pay extra money if you go over your credit balance, but you don’t lose in performance
- Overall, it is a new offering, so be careful, costs could go high if you’re not monitoring the health of your instances 

------------------------------------------

# Security Groups

#### The fundamental of network security in AWS

* Can be attached to multiple instances
* Locked down to a region / VPC combination
* Does live “outside” the EC2 - if traffic is blocked, the EC2 instance won’t see it
* It’s good to maintain one separate security group for SSH access
* If your application is not accessible (time out), then it’s usually a security group issue
* If your application gives a “connection refused” error, then it’s an application error or its not launched
* All inbound traffic is blocked by default
* All outbound traffic authorized by default

#### Security groups act as a firewall on EC2 Instances
They regulate:
* Access to ports
* Authorized IP ranges - IPv4 and IPv6
* Control of inbound network
* Control of outbound network

------------------------------------------

# ELB: Elastic Load Balancers

Load balancers are servers that forward internet traffic to multiple servers (EC2 Instances) downstream

#### Why use a load balancer?
* Spread load across multiple downstream instances
* Expose a single point of access (DNS) to your application
* Seamlessly handle failures of downstream instances
* Do regular health checks to your instances
* Provide SSL termination (HTTPS) for your websites
* Enforce stickiness with cookies
* High availability across zones
* Separate public traffic from private traffic

#### AN ELB (EC2 Load Balancer) is a managed load balancer
* AWS guarantees that it will be working
* AWS takes care of upgrades, maintenance, high availability
* AWS provides only a few configuration knobs

It costs less to setup your own load balancer but it will be a lot more effort on your end. It is integrated with many AWS offerings / services

#### Types of load balancers on AWS
* Classic Load Balancer (v1 - older generation - 2009)
* Application Load Balancer (v2 - new generation - 2016)
* Network Load Balancer (v2 - new generation - 2017)
* You can setup internal or external ELBs

#### Health Checks
* Health checks are crucial for load balancers
* They enable the load balancer to know if instances it forwards traffic to are available to reply to requests
* The health check is done on a port and a route (/health is common)
* If the response is not 200 (OK), then the instance is unhealthy

#### Application Load Balancer (v2)
* Application load balancers (Layer 7) allow to do:
  * Load balancing to multiple HTTP applications across machines (target groups)
  * Load balancing to multiple applications on the same machine (ex: containers)
  * Load balancing based on route in URL
  * Load balancing based on hostname in URL 
* Basically, they’re awesome for micro services & container-based application (example: Docker & Amazon ECS) 
* Has a port mapping feature to redirect to a dynamic port 
* In comparison, we would need to create one Classic Load Balancer per application before.That was very expensive and inefficient!
* Good to Know
    * Stickiness can be enabled at the target group level
        * Same request goes to the same instance
        * Stickiness is directly generated by the ALB (NOT the application)
    * ALB supports HTTP/HTTPS & Web sockets protocols
    * The application servers don’t see the IP of the client directly
        * The true IP of the client is inserted in the header X-Forwarded-For
        * We can also get Port (X-Forwarded-Port) and protocol (X-Forwarded-Proto)
#### Network Load Balancer (v2)
* Layer 4 allow you to do:
    * Forward TCP traffic to your instances
    * Handle millions of requests per second
    * Support for static IP or elastic IP
    * Less latency ~100ms (vs 400 ms for ALB)
* Network Load Balancers are mostly used for extreme performance and should not be the default load balancer you choose
* Overall, the creation process is the same as the Application Load Balancer

#### Load Balancers Good to Know
* Any Load Balancer (CLB, ALB, NLB) has a static host name. They do not resolve and use underlying IP
* LBs can scale but not instantaneously - contact AWS for a “warm up”
* NLB directly see the client IP
* 4xx errors are client induced errors
* 5xx errors are application induced errors
    * Load balancer Errors 503 means at capacity or no registered target
* If the LB can’t connect to your application, check your security

------------------------------------------

# ASG: Auto Scaling Group

In real-life, the load on your websites and applications can change. You can create and get rid of servers very quickly

The goal of an Auto Scaling Group (ASG) is to:
* Scale out (add EC2 Instances) to match an increased load
* Scale in (remove EC2 Instances) to match a decreased load
* Ensure we have a minimum and a maximum number of machines running
* Automatically register new instances to a load balancer

#### ASGs have the following attributes
* A launch configuration
    * AMI + Instance Type
    * EC2 User Data
    * EBS Volumes
    * Security Groups
    * SSH Key Pair
* Min Size / Max Size / Initial Capacity
* Network + Subnets Information
* Load Balancer Information
* Scaling Policies

#### Auto Scaling Alarms
* It is possible to scale an ASG based on CloudWatch alarms
* An alarm monitors a metric (such as Average CPU)
* Metrics are computed for the overall ASG instances
* Based on the alarm:
    * We can create a scale-out policies (increase the number of instances)
    * We can create a scale-in policies (decrease the number of instances)

#### New Auto Scaling Rules
* It is now possible to define “better” auto scaling rules that are directly managed by EC2
    * Target Average CPU Usage
    * Number of requests on the ELB per instance
    * Average Network In
    * Average Network Out
* These rules are easier to set up and can make more sense

#### Auto Scaling Custom Metric
* We can auto scale based on a custom metric (ex: number of connected users)
* 1. Send custom metrics from an application on EC2 to CloudWatch (PutMetric API)
* 2. Create a CloudWatch alarm to react to low / high values
* 3. Use the CloudWatch Alarm as the scaling policy for ASG

#### ASG Summary
* Scaling policies can be on CPU, Network… and can even be on custom metrics or based on a schedule (if you know your visitors patterns)
* ASGs use Launch configurations and you update an ASG by providing a new launch configuration
* IAM roles attached to an ASG will get assigned to EC2 instances
* ASG are free. You pay for the underlying resources being launched
* Having instances under an ASG means that if they get terminated for whatever reason, the ASG will restart them. Extra safety
* ASG can terminate instances marked as unhealthy by an LB (and hence replace them)

------------------------------------------

# EBS Volume

* An EC2 machine loses its root volume (main drive) when it is manually terminated.
* Unexpected terminations might happen from time to time (AWS would email you)
* Sometimes, you need a way to store your instance data somewhere
* An EBS (Elastic Block Store) Volume is a network drive you can attach to your instances while they run
* It allows your instances to persist data

#### EBS Volume
* It’s a network drive (Not a physical drive)
    * It uses the network to communicate the instance, which means there might be a bit of latency
    * It can be detached from an EC2 instance and attached to another one quickly
* It’s locked to an Availability Zone (AZ)
    * An EBS Volume in us-east-1a cannot be attached to us-east-1b
    * To move a volume across, you first need to snapshot it
* Have a provisioned capacity (size in GBs and IOPs)
    * You get billed for all the provisioned capacity
    * You can increase the capacity of the drive over time

#### EBS Volume Types
- EBS Volumes come in 4 types 
- GP2 (SSD): General purpose SSD volume that balances price and performance for a wide variety of workloads 
- IO1 (SSD): Highest-performance SSD volume for mission-critical low-latency or high- throughput workloads 
- ST1 (HDD): Low cost HDD volume designed for frequently accessed, throughput- intensive workloads 
- SC1 (HDD): Lowest cost HDD volume designed for less frequently accessed workloads 
- EBS Volumes are characterized in Size | Throughput | IOPS
- When in doubt always consult the AWS documentation

#### EBS Volume Resizing
* Feb 2017: You can resize your EBS Volumes
* After resizing an EBS volume, you need to repartition your drive

EBS Snapshots
* EBS Volumes can be backed up using “snapshots”
* Snapshots only take the actual space of the blocks on the volume
* If you snapshot a 100GB drive that only has 5 gb of data, then your EBS snapshot will only be 5 gb
* Snapshots are used for:
    * Backups: ensuring you can save your data in case of catastrophe
    * Volume migration
        * Resizing a volume down
        * Changing the volume type
        * Encrypt a volume

#### EBS Encryption
* When you create an encrypted EBS volume, you get the following:
    * Data at rest is encrypted inside the volume
    * All the data in flight moving between the instance and the volume is encrypted
    * All snapshots are encrypted
    * All volumes created from the snapshots are encrypted
* Encryption and decryption are handled transparently (you have nothing to do)
* Encryption has a minimal impact on latency
* EBS Encryption leverages keys from KMS (AES-256)
* Copying an unencrypted snapshot allows encryption

#### EBS vs. Instance Store
* Some instance do not come with Root EBS volumes
* Instead, they come with “instance Store”
* Instance store is physically attached to the machine
* Pros:
    * Better I/O performance
* Cons:
    * On termination, the instance store is lost
    * You can’t resize the instance store
    * Backups must be operated by the user
* Overall, EBS-backed instances should fit most applications workloads


#### EBS Summary
* EBS can be attached to only one instance at a time
* EBS are locked at the AZ level
* Migrating an EBS volume across AZ means first backing it up (snapshot), then recreating it in the other AZ
* EBS backups use IO and you shouldn’t run them while your application is handling a lot of traffic
* Root EBS Volumes of instances get terminated by default if the EC2 instance gets terminated. (You can disable that)
* In some cases, it's better to externalize your RDS database so that it won't get deleted when you delete your elastic beanstalk enviornment
* Elastic Beanstalk relies on CloudFormation

------------------------------------------

# Route 53

Route 53 is a managed DNS (Domain Name System)

DNS is a collection of rules and records which helps clients understand how to reach a server through URLs.

In AWS, the most common records are (will be on exam):
* A: URL to IPv4
* AAAA: URL to IPv6
* CNAME: URL to URL
* ALIAS: URL to AWS resource

Route 53 can use:
* Public domain names you own
* Private domain names that can be resolved by your instances in your VPCs

Route53 has advanced features such as:
* Load balancing (through DNS - also called client load balancing)
* Health checks (although limited…)
* Routing policy: simple, failover, geolocation, geoproximity, latency, weighted

Prefer Alias over CNAME for AWS resources (for performance reasons)

------------------------------------------

# RDS: Relational Database Service

A managed DB service for DB use SQL a query

It allows you to create databases in the cloud that are
* Postgres
* Oracle
* MySQL
* MariaDB
* Microsoft SQL Server
* Aurora (AWS proprietary database)

Advantages of RDS over deploying a database in EC2
* Managed service
* OS patching level
* Continuous backups and restore to specific timestamps (Point in Time Restore)
* Monitoring dashboards
* Read replicas for improved read performance
* Multi AZ setup for DR (Disaster Recovery)
* Maintenance windows for upgrades
* Scaling capability (vertical and horizontal)
* But you can’t SSH into your instances (amazon manages them for you)

RDS Read replicas for read scalability
* Up to 5 read replicas
* Within AZ, Cross AZ or Cross region
* Replication is Async, so reads are eventually consistent
* Replicas can be promoted to their own DB
* Applications must update the connection string to leverage read replicas

RDS Multi AZ (Disaster Recovery)
* SYNC replication
* One DNS name - automatic app failover to standby
* Increase availability
* Failover in case of loss of AZ, loss of network, instance or storage failure
* No manual intervention in apps
* Not used for scaling (only disaster recovery)

RDS Backups
* Backups are automatically enabled in RDS
* Automated backups:
    * Daily full snapshot of the database
    * Capture transaction logs in real time
    * Ability to restore to any point in time
    * 7 days retention (can be increased to 35 days)
* DB Snapshots:
    * Manually triggered by the user
    * Retention of backup for as long as you want

RDS Encryption
* Encryption at rest capability with AWS KMS - AES-256 encryption
* SSL certificates to encrypt data to RDS in flight
* To enforce SSL:
    * PostgreSQL: rds.force_ssl=1 in the AWS RDS Console (parameter groups)
* TO connect using SSL:
    * Provide the SSL Trust certificate (can be downloaded from AWS)
    * Provide SSL options when connection to the database

RDS Security
* RDS databases are usually deployed within a private subnet, not in a public one
* RDS Security works by leveraging security groups (the same concept as for EC2 instances) - it controls who can communicate with RDS
* IAM policies help control who can manage RDS
* Traditional username and password can be used to login to the database
* IAM users can now be used too (for MySQL / Aurora - New)

RDS vs. Aurora
* Aurora is a proprietary technology from AWS (not open sourced)
* Postgres and MySQL are both supported as Aurora DB (that means you r drivers will work as if Aurora was a Postgres or MySQL database)
* Aurora is “AWS cloud optimized” and claims 5x performance improvements over MySQL on RDS, over 3x the performance of Postgres on RDS
* Aurora storage automatically grows in increments of 10GB, up to 64 TB
* Aurora can have 15 replicas while MySQL has 5, and the replication process is faster (sub 10 ms replica lag)
* Failover in Aurora is instantaneous. It’s HA native.
* Aurora costs more than RDS (20% more) - but is more efficient

------------------------------------------

# ElastiCache

Overview:
The same way RDS is to get managed Relational Databases, ElastiCache is to get managed Redis or Memcached. Caches are in-memory databases with really high performance, low latency. They help reduce loads off of databases for read intensive workloads. They help make your application stateless. 
* Write scaling using shading. 
* Read scaling using Read Replicas
* Multi AZ with Failover Capability
* AWS takes care of OS maintenance / patching, optimizations, setup, configuration, monitoring, failure recovery and backups

#### Solution Architecture - DB Cache
* Applications queries ElastiCache, if not available, get from RDS and store in ElastiCache
* Helps relieve load in RDS
* Cache must have an invalidation strategy to make sure only the most current data is used in there
User Session Store
* User logs into any of the applications
* The application writes the session data into ElastiCache
* The user hits another instance of our application
* The instance retrieves the data and the user is already logged in

#### Redis Overview
* Redis is an in-memory key-value store
* Super low latency (sub ms)
* Cache survive reboots by default (it’s called persistence)
* Great to host
    * User sessions
    * Leaderboards (for gaming)
    * Distributed states
    * Relieve pressure on databases (such as RDS)
    * Pub / Sub capability for messaging 
* Multi AZ with Automatic failover for Disaster Recovery if you don’t want to lose your cache data
* Support for Read Replicas

#### Memcached Overview
* Memcached is an in-memory object store
* Cache doesn’t survive reboots
* Use cases:
* Quick retrieval of objects from memory
* Cache often accessed objects
* Overall, Redis has largely grown in popularity and has better feature sets than memcached
* Most likely, you’d probably only want to use Redis for caching needs

------------------------------------------

# VPC: Virtual Private Cloud

Within a region, you’re able to create VPCs. Each VPC contain subnets (networks). Each subnet must be mapped to an AZ. It’s common to have a public ip and private ip subnet. It’s common to have many subnets per AZ.

#### Public Subnets usually contain:
* Load Balancers
* Static Websites
* Files
* Public Authentication Layers

Private Subnets usually contain:
* Web application servers
* Databases

Public and Private subnets can communicate if they’re in the same VPC

#### AWS VPC Summary
* VPC & Regions aren’t much asked at the developer associate exam
* All new accounts come with a default VPC
* It’s possible to use a VPN to connect to a VPC
* VPC flow logs allow you to monitor the traffic within, in and out of your VPC (useful for security, performance, audit)
* VPC are per Account per Region
* Subnets are per VPC per AZ
* Some AWS resources can be deployed in VPC while others can’t
* You can peer VPC (within or across accounts) to make it look like they’re part of the same network

------------------------------------------

# S3 Buckets

* Amazon S3 allows people to store objects (files) fun “buckets” (directories)
* Buckets must have a globally unique name
    * Naming convention:
        * No uppercase
        * No underscore
        * 3-63 characters long
        * Not an IP
        * Must start with lowercase letter or number
* Objects
    * Objects (files) have a Key. The key is the FULL path:
        * <my_bucket>/my_file.txt
        * <my_bucket>/my_folder/another_folder/my_file.txt
    * There’s no concept of “directories” within buckets (although the UI will trick you to think otherwise)
    * Just keys with very long names that contain slashes (“/“)
    * Object Values are the content of the body:
        * Max Size is 5TB
        * If uploading more than 5GB, must use “multi-part upload”
    * Metadata (list of text key / value pairs - system or user metadata)
    * Tags (Unicode key / value pair - up to 10) - useful for security / lifecycle
    * Version ID (if versioning
    * 

#### AWS S3 - Versioning
* It is enabled at the bucket level
* Same key overwrite will increment the “version”: 1, 2, 3
* It is best practice to version your buckets
    * Protect against unintended deletes (ability to restore a version)
    * Easy roll back to previous versions
* Any file that is not version prior to enabling versioning will have the version “null”

#### S3 Encryption for Objects
* There are 4 methods of encrypt objects in S3
    * SSE-S3: encrypts S3 objects
        * Encryption using keys handled & managed by AWS S3
        * Object is encrypted server side
        * AES-256 encryption type
        * Must set header: “x-amz-server-side-encryption”:”AES256”
    * SSE-KMS: encryption using keys handled & managed by KMS
        * KMS Advantages: user control + audit trail
        * Object is encrypted server side
        * Maintain control of the rotation policy for the encryption keys
        * Must set header: “x-amz-server-side-encryption”:”aws:kms”
    * SSE-C: server-side encryption using data keys fully managed by the customer outside of AWS
        * Amazon S3 does not store the encryption key you provide
        * HTTPS must be used
        * Encryption key must provided in HTTP headers, for every HTTP request made
    * Client Side Encryption
        * Client library such as the amazon S3 Encryption Client
        * Clients must encrypt data themselves before sending to S3
        * Clients must decrypt data themselves when retrieving from S3
        * Customer fully manages the keys and encryption cycle

#### Encryption in transit (SSL)
* AWS S3 exposes:
    * HTTP endpoint: non encrypted
    * HTTPS endpoint: encryption in flight
* You’re free to use the endpoint your ant, but HTTPS is recommended
* HTTPS is mandatory for SSE-C
* Encryption in flight is also called SSL / TLS

#### S3 Security
* User based
    * IAM policies - which API calls should be allowed for a specific user from IAM console
* Resource based
    * Bucket policies - bucket wide rules from the S3 console - allows cross account
    * Object Access Control List (ACL) - finer grain
    * Bucket Access Control List (ACL) - less common
* Networking
    * Support VPC endpoints (for instances in VPC without www internet)
* Logging and Audit:
    * S3 access logs can be stored in other S3 buckets
    * API calls can be logged in AWS CloudTrail
* User Security:
* MFA (multi factor authentication) can be required in versioned buckets to delete objects
* Signed URLs: URLS that are valid only for a limited time (ex: premium video services for logged in users)

#### S3 Bucket Policies
* JSON based policies
    * Resources: buckets and objects
    * Actions: Set of API to Allow or Deny
    * Effect: Allow / Deny
    * Principal: The account or user to apply the policy to
* Use S3 bucket for policy to:
    * Grant public access to the bucket
    * Force objects to be encrypted at upload
    * Grant access to another account (Cross Account)

#### S3 Websites
* S3 can host static website sand have them accessible on the world wide web
* The website URL will be:
    * <bucket-name>.s3-website.<AWS-region>.amzonaws.com
    * OR
    * <bucket-name>.s3-website.<AWS-region>.amazonaws.com
* If you get a 403 (forbidden) error, make sure the bucket policy allows public reads!
* 

#### S3 Cors
* If you request data from another S3 bucket, you need to enable CORS
* Cross Origin Resource Sharing allows you to limit the number of websites that can request your files in S3 (and limit your costs)
* This is a popular exam question

#### AWS S3 - Consistency Model
* Read after write consistency for PUTS of new objects
    * As soon as an object is written, we can retrieve it ex: (PUT 200 -> GET 200)
    * This is true, except if we did a GET before to see if the object existed ex: (GET 404 -> PUT 200 -> GET 404) - eventually consistent
* Eventual Consistency for DELETES and PUTS of existing objects
    * If we read an object after updating, we might get the older version ex: (PUT 200 -> PUT 200 -> GET 200 (might be older version))
    * If we delete an object, we might still be able to retrieve it for a short time ex: (DELETE 200 -> GET 200)

#### AWS S3 - Other
* S3 can send notifications on changes to
    * AWS SQS: queue service
    * AWS SNS: notification service
    * AWS Lambda: serverless service
* S3 has a cross region replication feature (managed)

#### AWS S3 Performance
* Faster upload of large objects (>5GB), use multipart upload
    * Parallelizes PUTs for greater throughput
    * Maximize your network bandwidth
    * Decrease time to retry in case a part fails
* Use CloudFront to ache S3 objects around the world (improves reads)
* S3 Transfer Acceleration (uses edge locations) - just need to change the endpoint you write to, not the code
* If using SSE-KMS encryption, you may be limited to your AWS limits for KMS usage (~100s - 1000s downloads / uploads per second)

------------------------------------------

# CLI: Command Line Interface

Add user credentials locally using this command:
- $ `aws configure`

If you are using multiple AWS accounts, you can add custom profiles with seperate credentials using this command:
- $ `aws configure --profile {my-other-aws-account}`
- if you you'd like to execute commands on a specific profile:
  - example: `aws s3 ls --profile {my-other-aws-account}`
- if you don't specify the aws profile, the commands will be executed to your **default** profile

#### AWS CLI on EC2
* IAM roles can be attached to EC2 instances
* IAM roles can come with a policy authorizing exactly what the EC2 instance should be able to do. This is the best practice.
* EC2 Instances can then use these profiles automatically without any additional configurations

#### CLI STS Decode Errors
- When you run API calls and they fail, you can get a long, encoded error message code 
- This error can be decoded using STS 
- run the command: `aws sts decode-authorization-message --encoded-message {encoded_message_code}`
- your IAM user must have the correct permissions to use this command by adding the `STS` service to your policy

------------------------------------------

# SDK: Software Development Kit

If you want to perform actions on AWS directly from your application's code without using a CLI, you can use an SDK

Official SDKs:
- Java
- .NET
- Node.js
- PHP
- Python
- Ruby
- C++

#### SDK Takeaways
- AWS SDK are required when coding against AWS Services such as DynamoDB
- Fact: AWS CLI uses the Python SDK (boto3)
- The exam expects you to know when you should use an SDK
- If you don’t specify or configure a default region, then us-east-1 will be chosen by default

#### SDK Credentials Security

- It’s recommend to use the default credential provider chain
- The default credential provider chain works seamlessly with:
  - AWS credentials at ~/.aws/credentials (only on our computers or on premise)
  - Instance Profile Credentials using IAM Roles (for EC2 machines, etc...)
- Environment variables (AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY)
- Overall, NEVER EVER STORE AWS CREDENTIALS IN YOUR CODE.
- Use IAM Roles if working from within AWS Services to inherit credentials

#### Exponential Backoff

- Any API that fails because of too many calls needs to be retried with Exponential Backoff
- These apply to rate limited API
- Retry mechanism is included in SDK API calls

------------------------------------------

# Elastic Beanstalk

#### *Elastic Beanstalk* is a developer centric view of deploying application on AWS.
- A managed service
  - Instance configuration
  - OS is handled by Beanstalk
  - Deployment strategy is configurableut performed by Beanstalk
  - Application code configurable
- It will leverage all the AWS components that we have gone over thus far:
  - EC2
  - ASG
  - ELB
  - RDS
  - Etc..
- Elastic Beanstalk is free but you pay for the underlying instances
- Three architecture models:
  - Single instance deployment: good for developers
  - LB + ASG: great for production or staging web applications
  - ASG only: great for non-web apps in production
- Elastic Beanstalk has three components:
  - Application
  - Application Version (Each deployment gets assigned a version)
  - Environment name (dev, staging, prod): free naming
- You deploy application versions to environments and can promote application versions to the next environment
- Rollback feature to previous application versions
- Full control over the lifecycle of environments
- Support for many platforms:
  - Go
  - Java
  - Python
  - Node.js
  - Ruby
  - Single Container Docker
  - Multi Container Docker
  - Preconfigure Docker
  - Write your own custom platforms (If the any of the above is not supported)
  
  ------------------------------------------
  
  # CICD: Continuous Integration and Deployment

- Why use CICD?
    - Ideally, you'd want to set up a CICD to help you automate multiple steps to automate builds, push code to a repository and then deploy to your updated code to AWS.
    - This is a faster, efficient way that also helps minimize potential mistakes as opposed to running multiple manual steps
    - Automate deployement to different stages (dev, staging, and production)
    - May add manual approvals when needed
- To be a proper AWS developer, you'd need to learn CICD

- CICD Services in AWS
    - AWS CodeCommit: storing our code (similar to Github)
    - AWS CodePipeline: automatig our pipeline from code to ElasticBeanstalk
    - AWS CodeBuild: To build and test code
    - AWS CodeDeploy: deploying code to EC2 fleets (not Beanstalk)

- Continuous Integration
    - Developers push code to a repository (Github, Bitbucket, CodeCommit, etc)
    - A testing or build server checks the code as soon as it's pushed to the repository (CodeBuild, Jenkins CI, etc)
    - The developer gets feedback about the tests and checks that have passed or failed
    - Benefits of CI:
        - Find bugs and fix it early on
        - Deliver fast as soon as the code is tested
        - Deploy frequently
        - Unblocked developers are happy

- Continuous Delivery
    - Ensure that the software can be released reliably whenever needed
    - Ensures deployment happen often and quick
    - Ability to shift away from "one release every 3 months" to "5 releases a day"
    - Automated deployments

Orchestration == CICD

  ------------------------------------------

# CloudFormation

- Currently, we have been doing a lot of manual work
- All this manual work will be very tough to reproduce:
    - In another region
    - In another AWS account
    - Within the same region if everything was deleted
- Wouldn’t it be great, if all our infrastructure was... code?
- That code would be deployed and create / update / delete our
infrastructure

#### What is CloudFormation?
- CloudFormation is a declarative way of outlining your AWS Infrastructure, for any resources (most of them are supported).
- For example, within a CloudFormation template, you want to:
    - I want a security group
    - I want two EC2 machines using this security group
    - I want two Elastic IPs for these EC2 machines
    - I want an S3 bucket
    - I want a load balancer (ELB) in front of these machines
    - Then CloudFormation creates those for you, in the right order, with the exact configuration that you specify

**Note**: This is an introduction to CloudFormation
- It can take over 3 hours to properly learn and master CloudFormation
- This section is meant so you get a good idea of how it works
- We’ll be slightly less hands-on than in other sections
- We’ll learn everything we need to answer questions for the exam
- The exam does not require you to actually write CloudFormation
- The exam expects you to understand how to read CloudFormation

#### Benefits of CloudFormation
- Infrastructure as code
    - No resources are manually created, which is excellent for control
    - The code can be version controlled for example using git
    - Changes to the infrastructure are reviewed through code
- Cost
    - Each resources within the stack is stagged with an identifier so you can easily see how much a stack costs you
    - You can estimate the costs of your resources using the CloudFormation template
    - Savings strategy: In Dev, you could automation deletion of templates at 5 PM and recreated at 8 AM, safely
- Productivity
    - Ability to destroy and re-create an infrastructure on the cloud on the fly
    - Automated generation of Diagram for your templates!
    - Declarative programming (no need to figure out ordering and orchestration)
- Separation of concern: create many stacks for many apps, and many layers. Ex:
    - PC stacks
    - Network stacks
    - App stacks
- Don’t re-invent the wheel
    - Leverage existing templates on the web!
    - Leverage the documentation

#### How CloudFormation works
- Templates have to be uploaded in S3 and then referenced in CloudFormation
- To update a template, we can’t edit previous ones. We have to re- upload a new version of the template to AWS
- Stacks are identified by a name
- Deleting a stack deletes every single artifact that was created by
CloudFormation.

#### Deploying CloudFormation templates
- Manual way:
    - Editing templates in the CloudFormation Designer
    - Using the console to input parameters, etc
- Automated way:
    - Editing templates in a YAML file
    - Using the AWS CLI (Command Line Interface) to deploy the templates
    - Recommended way when you fully want to automate your flow

#### CloudFormation Building Blocks
- Templates components (one course section for each):
    1. Resources: your AWS resources declared in the template (MANDATORY)
    2. Parameters: the dynamic inputs for your template
    3. Mappings: the static variables for your template
    4. Outputs: References to what has been created
    5. Conditionals: List of conditions to perform resource creation
    6. Metadata
- Templates helpers:
    1. References
    2. Functions
 
 #### CloudFormation Resources
 - Resources are the core of your CloudFormation template (MANDATORY)
- They represent the different AWS Components that will be created and configured
- Resources are declared and can reference each other
- AWS figures out creation, updates and deletes of resources for us
- There are over 224 types of resources (!)
- Resource types identifiers are of the form:
    - `AWS::aws-product-name::data-type-name`
- Resource documentation:
    - I can’t teach you all of the 224 resources, but I can teach you how to learn how to use them.
    - All the resources can be found here: http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html
    - Example here (for an EC2 instance): http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html
##### Analysis of CloudFormation Templates
- Going back to the example of the introductory section, let’s learn why it was written this way.
- Relevant documentation can be found here:
    - http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-instance.html
    - http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html
    - http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-eip.html
    
##### FAQ for resources
- Can I create a dynamic amount of resources?
    - No, you can’t. Everything in the CloudFormation template has to be declared.You can’t perform code generation there
- Is every AWS Service supported?
    - Almost. Only a select few niches are not there yet
    - You can work around that using AWS Lambda Custom Resources

#### CloudFormation Parameters
- Parameters are a way to provide inputs to your AWS CloudFormation template
- They’re important to know about if:
    - You want to reuse your templates across the company
    - Some inputs can not be determined ahead of time
- Parameters are extremely powerful, controlled, and can prevent errors from happening in your templates thanks to types.
- AWS offers us pseudo parameters in any CloudFormation template.
- These can be used at any time and are enabled by default

##### How to reference a parameter
- The `Fn::Ref` function can be leveraged to reference parameters
- Parameters can be used anywhere in a template.
- The shorthand for this in YAML is !Ref
- The function can also reference other elements within the template

#### CloudFormation Mappings
- Mappings are fixed variables within your CloudFormation Template.
- They’re very handy to differentiate between different environments (dev vs prod), regions (AWS regions), AMI types, etc
- All the values are hardcoded within the template
- We use `Fn::FindInMap` to return a named value from a specific key

#### When would you use Mapping vs. Parameters?
- Mappings are great when you know in advance all the values that can be taken and that they can be deduced from variables such as
    - Region
    - Availability Zone
    - AWS Account
    - Environment (dev vs prod)
    - Etc...
- They allow safer control over the template.
- Use parameters when the values are really user specific

#### CF Outputs
- The Outputs section declares optional outputs values that we can import into other stacks (if you export them first)!
- You can also view the outputs in the AWS Console or in using the AWS CLI
- They’re very useful for example if you define a network CloudFormation, and output the variables such as VPC ID and your Subnet IDs
- It’s the best way to perform some collaboration cross stack, as you let expert handle their own part of the stack
- You can’t delete a CloudFormation Stack if its outputs are being referenced by another CloudFormation stack

##### Outputs examples
- Creating a SSH Security Group as part of one template
- Create an output that references that security group

##### Cross Stack Reference
- We then create a second template that leverages that security group
    - Use the `Fn::ImportValue function`
- You can’t delete the underlying stack until all the references are deleted too.

#### CloudFormation Conditions
- Conditions are used to control the creation of resources or outputs based on a condition.
- Conditions can be whatever you want them to be, but common ones are:
    - Environment (dev / test / prod)
    - AWS Region
    - Any parameter value
- Each condition can reference another condition, parameter value or mapping

##### Defining Conditions
- The logical ID is for you to choose. It’s how you name condition
- The intrinsic function (logical) can be any of the following:
    - `Fn::And`
    `Fn::Equals`
    - `Fn::If`
    - `Fn::Not`
    - `Fn::Or`
- Conditions can be applied to resources / outputs / etc

#### CloudFormation Intrinsic Functions
- Refs
    - The `Fn::Ref` function can be leveraged to reference
        - Parameters => returns the value of the parameter
        - Resources => returns the physical ID of the underlying resource (ex: EC2 ID)
    - The shorthand for this in YAML is `!Ref`
- `Fn::GetAtt`
    - Attributes are attached to any resources you create
    - To know the attributes of your resources, the best place to look at is the documentation.
    - For example: the AZ of an EC2 machine
- `Fn::FindInMap`
    - We use `Fn::FindInMap `to return a named value from a specific key
    - `!FindInMap [ MapName, TopLevelKey, SecondLevelKey ]`
- `Fn::ImportValue`
    - Import values that are exported in other templates
        - Use the `Fn::ImportValue` function
- `Fn::Join`
    - Join values with a delimiter
- `Fn::Sub`
    - `Fn::Sub`, or `!Sub` as a shorthand, is used to substitute variables from a text. It’s a very handy function that will allow you to fully customize your templates.
    - For example, you can combine `Fn::Sub` with References or AWS Pseudo variables
    - String must contain ${VariableName} and will substitute them
- Condition Functions (`Fn::If`, `Fn::Not`, `Fn::Equals`, etc...)
    - The logical ID is for you to choose. It’s how you name condition
    - The intrinsic function (logical) can be any of the following:
        - `Fn::And`
        - `Fn::Equals`
        - `Fn::If`
        - `Fn::Not`
        - `Fn::Or`

#### CloudFormation Rollbacks
- Stack Creation Fails
    - Default: everything rolls back (gets deleted).We can look at the log
    - Option to disable rollback and troubleshoot what happened
- Stack Update Fails:
    - The stack automatically rolls back to the previous known working state
    - Ability to see in the log what happened and error messages

--------------------------------------

# CloudWatch

CloudWatch is used for monitoring.

### Why is monitoring important?
- To deploy applications
    - Safely
    - Automatically
    - Using Infrastructure as Code
    - Leveraging AWS components
- Because applications are deployed, and users don’t care what services we've used
- Users only care that the application is working!
    - Application latency: will it increase over time?
    - Application outages: customer experience should not be degraded
    - Users contacting the IT department or complaining is not a good outcome
    - Troubleshooting and remediation
- Internal monitoring:
    - Can we prevent issues before they happen?
    - Performance and Cost
    - Trends (scaling patterns)
    - Learning and Improvement

### Monitoring in AWS
- AWS CloudWatch:
    - Metrics: Collect and track key metrics
    - Logs: Collect, monitor, analyze and store log files
    - Events: Send notifications when certain events happen in your AWS • Alarms: React in real-time to metrics / events
- AWS X-Ray:
    - Troubleshooting application performance and errors
    - Distributed tracing of microservices
- AWS CloudTrail:
    - Internal monitoring of API calls being made
    - Audit changes to AWS Resources by your users

### CloudWatch Metrics
- CloudWatch provides metrics for every services in AWS
- **Metric** is a variable to monitor (CPUUtilization, NetworkIn...)
- Metrics belong to **namespaces**
- **Dimension** is an attribute of a metric (instance id, environment, etc...).
- Up to 10 dimensions per metric
- Metrics have **timestamps**
- Can create CloudWatch dashboards of metrics

### CloudWatch EC2 Detailed monitoring
- EC2 instance metrics have metrics “every 5 minutes”
- With detailed monitoring (for a cost), you get data “every 1 minute”
- Use detailed monitoring if you want to more prompt scale your ASG!
- The AWS Free Tier allows us to have 10 detailed monitoring metrics
- **Note:** EC2 Memory usage is by default not pushed (must be pushed
from inside the instance as a custom metric)

### AWS CloudWatch Custom Metrics
- Possibility to define and send your own custom metrics to CloudWatch
- Ability to use dimensions (attributes) to segment metrics
    - Instance.id
    - Environment.name
- Metric resolution:
    - Standard: 1 minute
    - High Resolution: up to 1 second (StorageResolution API parameter - Higher cost)
- Use API call **PutMetricData**
- Use exponential back off in case of throttle errors

### Alarms are used to trigger notifications for any metric
- Alarms can go to Auto Scaling, EC2 Actions, SNS notifications
- Various options (sampling, %, max, min, etc...)
- Alarm States:
    - OK
    - INSUFFICIENT_DATA
    - ALARM
- Period:
    - Length of time in seconds to evaluate the metric
    - High resolution custom metrics: can only choose 10 sec or 30 sec

### AWS CloudWatch Logs
- Applications can send logs to CloudWatch using the SDK
- CloudWatch can collect log from:
    - Elastic Beanstalk: collection of logs from application
    - ECS: collection from containers
    - AWS Lambda: collection from function logs
    - VPC Flow Logs:VPC specific logs
    - API Gateway
    - CloudTrail based on filter
    - CloudWatch log agents: for example on EC2 machines
    - Route53: Log DNS queries
- CloudWatch Logs can go to:
    - Batch exporter to S3 for archival
    - Stream to ElasticSearch cluster for further analytics
- CloudWatch Logs can use filter expressions
- Logs storage architecture:
    - Log groups: arbitrary name, usually representing an application. Log expiration policy should be defineda at this level.
    - Log stream: instances within application / log files / containers
- Can define log expiration policies (never expire, 30 days, etc..)
- Using the AWS CLI we can tail CloudWatch logs
- To send logs to CloudWatch, make sure IAM permissions are correct!
- Security: encryption of logs using KMS at the Group Level

### AWS CloudWatch Events
- Schedule: Cron jobs
- Event Pattern: Event rules to react to a service doing something
    - Ex: CodePipeline state changes
- Triggers to Lambda functions, SQS/SNS/Kinesis Messages
- CloudWatch Event creates a small JSON document to give information
about the change

---------------------------------------

# DynamoDB (No-SQL):

-   Non Relational DB (No-SQL), comprised of collections (tables), of documents (rows), with each document consisting of key/value pairs (fields)
-   Document oriented DB
-   Offers push button scaling, meaning that you can scale your db on the fly without any downtime
-   RDS is not so easy, you usually have to use a bigger instance size or add read replicas
-   Stored on SSD Storage
-   Spread across 3 geographically distinct data centers
-   Eventual Consistent Reads (Default)
    -   Consistency across all copies of data is usually reached within 1 second
    -   Repeating a read after a short time should return updated data
    -   Best Read Performance
-   Strongly Consistent Reads
    -   Returns a result that reflects all writes that received a successful response prior to the read
-   Structure:
    -   Tables
    -   Items (Think rows in a traditional table)
    -   Attributes (Think columns of data in a table)
-   Provisioned throughput capacity
-   Write throughput 0.0065 per hour for every 10 units
-   Read throughput 0.0065 per hour for every 50 units
-   First 25 GB of storage is free
-   Storage costs of 25 cents per additional GB per Month
-   Can be expensive for writes, but really really cheap for reads
-   The combined key/value size must not exceed 400 KB for any given document

**Developer Associate Specific Topics**

-   Supports attribute nesting up to 35 levels
-   Conditional writes are idempotent, you can send the same conditional write request multiple times, but it will have no further effect on the item after the first time Dynamo performs the update
-   Supports atomic counters, using the UpdateItem operation to increment or decrement the value of an existing attribute without interfering with other write requests
-   Atomic counter updates are not idempotent, the counter will increment each time you call UpdateItem
-   If you can have a small margin of error in your data, then use atomic counters
-   If your application needs to read multiple items, you can use the BatchGetItem API endpoint; A single request can retrieve up to 1MB of data with as many as 100 items
-   A single BatchGetItem request can retrieve items from multiple tables
-   All write requests are applied in the order in which they are received
-   Pricing (calculate the amount of writes and reads per second):
    -   Divide total number of writes per day / 25 (hours) / 60 (minutes) / 60 (seconds) = No. writes per second
    -   A write or read capacity unit can handle 1 write/read per second
    -   Individual items or the entire table can be exported to CSV
    -   Example:
        -   Using 28 GB of storage
        -   1,000,000 writes per day = 1,000,000/24 = 41,666.67
        -   41,666.67 / 60 (minutes) = 694.44
        -   694.44 / 60 (seconds) = 11.574 writes per second
        -   This example would require 12 write capacity units (single capacity unit is 1 write per second)
        -   Charge for write is $0.0065 per 10 units
        -   $0.0065 / 10 = $0.00065 per unit
        -   $0.00065 * 12 (required write units) = $0.0078
        -   $0.0078 * 24 (hours per day) = $0.1872 per day for writes
        -   Charge for read is $0.0065 per 50 units
        -   $0.0065 / 50 = $0.00013 per unit
        -   $0.00013 * 12 (required read units) = $0.00156
        -   $0.00156 * 24 (hours per day) = $0.03744 per day for reads
        -   Using 28 GB storage with first 25 GB free = 3 GB storage required
        -   3 GB * $0.25 per GB (after initial 25) = $0.75
-   Indexes:
    -   Primary Key types:
        -   Single attribute (unique ID):
            -   Partition Key (Hash Key composed of one attribute)
            -   Partition Key's value is used as input to an internal hash function which output determines the partition (physical location in which the data is stored)
            -   No 2 items in a table can have the same partition key value
        -   Composite (unique ID and date range):
            -   Partition Key & Sort Key (Hash and Range) composed of two attributes
            -   Partition Key's value is used as input to an internal hash function which output determines the partition (physical location in which the data is stored)
            -   2 Items can have the same partition key, but they MUST have a different sort key
            -   All Items with the same partition key are stored together, in sorted order by the sort key value
    -   Local Secondary Index (LSI):
        -   Has the SAME partition key, but different sort key
        -   Can ONLY be created when creating a table
        -   Can not be removed or modified after creation
        -   Can have up to 5 LSI's per table
    -   Global Secondary Index (GSI):
        -   Has DIFFERENT partition key and different sort key
        -   Can be created at table creation or added LATER
        -   Can have up to 5 GSI's per table
-   Streams:
    -   Used to capture any kind of modification of the DynamoDB tables
    -   If new item is added to the table, the stream captures an image of the entire item, including all of its attributes
    -   If an item is updated, the stream captures the before and after image of any attributes that were modified in the item
    -   If an item is deleted from the table, the stream captures an image of the entire item before it was deleted
    -   Streams are stored for 24 hours and then is lost
    -   Streams can trigger functions with Lambda that will perform actions based on the instantiation of a stream event
-   Query's:
    -   Operation that finds items in a table using only the primary key attribute value
    -   Must provide a partition attribute name and distinct value to search for
    -   Optionally can provide a sort key attribute name and value and use comparison operator to refine the search results
    -   By default a query returns all of the data attributes for items with the specified primary key(s)
    -   The ProjectionExpression parameter can be used to only return some of the attributes from a query as opposed to the default all
    -   Results are always sorted by the sort key
    -   If the data type of the sort key is a number, the results are returned in numeric order
    -   If the data type of the sort key is a string, the results are returned in order of ASCII character code values
    -   Sort order is ascending, the ScanIndexForward parameter can be set to false to sort in descending order
    -   By default queries are eventually consistent but can be changed to strongly consistent
    -   More efficient then a scan operation
    -   For quicker response times, design your tables in a way that can use the query, GET, or BatchGetItem API
-   Scans:
    -   Examines every item in the table
    -   By default, a scan returns all of the data attributes for every item
    -   Can use the ProjectionExpression parameter so that the scan only returns some of the attributes, instead of all
    -   Always scans the entire table, then filters out values to provide the desired result (added step of removing data from initial dataset)
    -   Should be avoided on a large table with a filter that removes many results
    -   As table grows, the scan operation slows
    -   Examines every item for the requested values, and can use up provisioned throughput for a large table in a single operation
-   Provisioned Throughput
    -   400 HTTP status code - ProvisionedThroughputExceededException error will indicate that you exceeded your max allowed provisioned throughput for a table or for one or more GSI's
    -   Unit of read provisioned throughput:
        -   All reads are rounded up to increments of 4 KB
        -   Eventual consistent reads (default) consist of 2 reads per second
        -   Strongly consistent reads consist of 1 read per second
        -   Take the (size of the read rounded to the nearest 4 KB chunk / 4 KB) * No. of items = read throughput
        -   Divide by 2 if eventually consistent
        -   Example:
            -   Application requires to read 10 items of 1 KB per second using eventual consistency, whats the read throughput
            -   Calculate the number of read units per item needed
            -   1 KB rounded to the nearest 4 KB increment = 4 (KB) or a single chunk
            -   4 KB / 4 KB = 1 read unit per item
            -   1 x 10 read items = 10
            -   Using eventual consistency is 10 /2 = 5
            -   5 units of read throughput
        -   Example 2:
            -   Application requires to read 10 items of 6 KB per second using eventual consistency, whats the read throughput
            -   Calculate the number of read units per item needed
            -   6 KB rounded to the nearest 4 KB increment = 8 (KB) or 2 chunks of 4 KB
            -   8 KB / 4 KB = 2 read unit per item
            -   2 x 10 read items = 20
            -   Using eventual consistency is 20 /2 = 10
            -   10 units of read throughput
    -   Unit of write provisioned throughput:
        -   All writes are 1 KB
        -   All writes consist of 1 write per second
        -   Example:
            -   Application requires to write 5 items with each being 10KB in size per second
            -   Each write unit consists of 1 KB of data, need to write 5 items per second with each item using 10 KB of data
            -   5 items * 10 KB = 50 write units
            -   Write throughput is 50 units
        -   Example 2:
            -   Application requires to write 12 items with each being 100KB in size per second
            -   Each write unit consists of 1 KB of data, need to write 12 items per second with each item using 100 KB of data
            -   12 items * 100 KB = 1200 write units
            -   Write throughput is 1200 units
-   Web Identity Providers:
    -   Authenticate users using Web Identity Providers such as Facebook, Google, Amazon or any other ID Connect-compatible identity provider
    -   Accomplished using AssumeRoleWithWebIdentity API
    -   Need to create a role first
    -   Process:
        -   User authentication request sent and received with the identity provider such as Facebook, Google, etc..
        -   Web Identity token returned from provider
        -   Token, App ID of provider, and ARN of IAM Role sent to AssumeRoleWithIdentity API endpoint
        -   AWS issues temporary security credentials back to the user allowing the user to access resources (1 hour default)
        -   Temporary security credentials response consist of 4 things:
            -   AccessKeyID, SecretAccessKey, SessionToken
            -   Expiration (time limit, 1 hour by default)
            -   AssumeRoleID
            -   SubjectFromWebIdentityToken
            
----------------------------------------------

# AWS Lambda
## AWS Lambda language support 
- Node.js (JavaScript) 
- Python 
- Java (Java 8 compatible) 
- C# (.NET Core) 
- Golang 
- C# / Powershell 
- Ruby 
- Custom Runtime API (community supported, example Rust)

## AWS Lambda Pricing: example 
- You can find overall pricing information here: https://aws.amazon.com/lambda/pricing/ 
- Pay per calls : 
    - First 1,000,000 requests are free 
    - $0.20 per 1 million requests thereafter ($0.0000002 per request) 
- Pay per duration: (in increment of 100ms) 
    - 400,000 GB-seconds of compute time per month if FREE 
    - == 400,000 seconds if function is 1GB RAM 
    - == 3,200,000 seconds if function is 128 MB RAM 
    - After that $1.00 for 600,000 GB-seconds

## Lambda – Synchronous Invocations
- Synchronous: CLI, SDK, API Gateway, Application Load Balancer
- Results is returned right away
- Error handling must happen client side (retries, exponential backoff, etc…)

## Lambda - Synchronous Invocations - Services
- User Invoked:
    - Elastic Load Balancing (Application Load Balancer)
    - Amazon API Gateway
    - Amazon CloudFront (Lambda@Edge)
    - Amazon S3 Batch
- Service Invoked:
    - Amazon Cognito
    - AWS Step Functions
- Other Services:
    - Amazon Lex
    - Amazon Alexa
    - Amazon Kinesis Data Firehose

## Lambda – Asynchronous Invocations
- S3, SNS, CloudWatch Events…
- The events are placed in an Event Queue
- Lambda attempts to retry on errors
    - 3 tries total
    - 1 minute wait after 1st , then 2 minutes wait
- Make sure the processing is idempotent (in case of retries)
- If the function is retried, you will see duplicate logs entries in CloudWatch Logs
- Can define a DLQ (dead-letter queue) – SNS
or SQS – for failed processing (need correct IAM permissions)
- Asynchronous invocations allow you to speed
up the processing if you don’t need to wait for
the result (ex: you need 1000 files processed)

## Lambda - Asynchronous Invocations - Services
- Amazon Simple Storage Service (S3)
- Amazon Simple Notification Service (SNS)
- Amazon CloudWatch Events / EventBridge
- AWS CodeCommit (CodeCommit Trigger: new branch, new tag, new push)
- AWS CodePipeline (invoke a Lambda function during the pipeline, Lambda must callback)
----- other -----
- Amazon CloudWatch Logs (log processing)
- Amazon Simple Email Service
- AWS CloudFormation
- AWS Config
- AWS IoT
- AWS IoT Events

## Lambda@Edge
- You have deployed a CDN using CloudFront
- What if you wanted to run a global AWS Lambda alongside?
- Or how to implement request filtering before reaching your application?
- For this, you can use Lambda@Edge:
deploy Lambda functions alongside your CloudFront CDN
    - Build more responsive applications
    - You don’t manage servers, Lambda is deployed globally
    - Customize the CDN content
    - Pay only for what you use

## Lambda Execution Role (IAM Role)
- Grants the Lambda function permissions to AWS services / resources
- Sample managed policies for Lambda:
    - AWSLambdaBasicExecutionRole – Upload logs to CloudWatch.
    - AWSLambdaKinesisExecutionRole – Read from Kinesis
    - AWSLambdaDynamoDBExecutionRole – Read from DynamoDB Streams
    - AWSLambdaSQSQueueExecutionRole – Read from SQS
    - AWSLambdaVPCAccessExecutionRole – Deploy Lambda function in VPC
    - AWSXRayDaemonWriteAccess – Upload trace data to X-Ray.
- When you use an event source mapping to invoke your function, Lambda uses the execution role to read event data.
- Best practice: create one Lambda Execution Role per function

## Lambda Resource Based Policies
- Use resource-based policies to give other accounts and AWS services permission to use your Lambda resources
- Similar to S3 bucket policies for S3 bucket
- An IAM principal can access Lambda:
- if the IAM policy attached to the principal authorizes it (e.g. user access)
- OR if the resource-based policy authorizes (e.g. service access)
- When an AWS service like Amazon S3 calls your Lambda function, the resource-based policy gives it access.

## Lambda Environment Variables
- Environment variable = key / value pair in “String” form
- Adjust the function behavior without updating code
- The environment variables are available to your code
- Lambda Service adds its own system environment variables as well
- Helpful to store secrets (encrypted by KMS)
- Secrets can be encrypted by the Lambda service key, or your own CMK

## Lambda Functions /tmp space
- If your Lambda function needs to download a big file to work…
- If your Lambda function needs disk space to perform operations…
- You can use the /tmp directory
- Max size is 512MB
- The directory content remains when the execution context is frozen,
providing transient cache that can be used for multiple invocations
(helpful to checkpoint your work)
- For permanent persistence of object (non temporary), use S3

## Lambda Function Dependencies
- If your Lambda function depends on external libraries: for example AWS X-Ray SDK, Database Clients, etc…
- You need to install the packages alongside your code and zip it together
- For Node.js, use npm & “node_modules” directory
- For Python, use pip --target options
- For Java, include the relevant .jar files
- Upload the zip straight to Lambda if less than 50MB, else to S3 first
- Native libraries work: they need to be compiled on Amazon Linux
- AWS SDK comes by default with every Lambda function

## AWS Lambda Limits to Know - per region
- Execution:
    - Memory allocation: 128 MB – 3008 MB (64 MB increments)
    - Maximum execution time: 900 seconds (15 minutes)
    - Environment variables (4 KB)
    - Disk capacity in the “function container” (in /tmp): 512 MB
    - Concurrency executions: 1000 (can be increased)
- Deployment:
    - Lambda function deployment size (compressed .zip): 50 MB
    - Size of uncompressed deployment (code + dependencies): 250 MB
    - Can use the /tmp directory to load other files at startup
    - Size of environment variables: 4 KB

## AWS Lambda Best Practices
- Perform heavy-duty work outside of your function handler
- Connect to databases outside of your function handler
- Initialize the AWS SDK outside of your function handler
- Pull in dependencies or datasets outside of your function handler
- Use environment variables for:
- Database Connection Strings, S3 bucket, etc… don’t put these values in your code
- Passwords, sensitive values… they can be encrypted using KMS
- Minimize your deployment package size to its runtime necessities.
- Break down the function if need be
- Remember the AWS Lambda limits
- Use Layers where necessary
- Avoid using recursive code, never have a Lambda function call itself

----------------------------------------------

# API Gateway
## API Gateway -- Integrations High Level
- Lambda Function
  - Invoke Lambda function
  - Easy way to expose REST API backed by AWS Lambda
- HTTP 
  - Expose HTTP endpoints in the backend
  - Example: internal HTTP API on premise, Application Load Balancer... 
  - Why? Add rate limiting, caching, user authentications, API keys, etc... 
- AWS Service 
  - Expose any AWS API through the API Gateway? 
  - Example: start an AWS Step Function workflow, post a message to SQS 
  - Why? Add authentication, deploy publicly, rate control...
  
## API Gateway - Endpoint Types 
- Edge-Optimized (default): For global clients - Requests are routed through the CloudFront Edge locations (improves latency) - The API Gateway still lives in only one region 
- Regional: - For clients within the same region - Could manually combine with CloudFront (more control over the caching strategies and the distribution) 
- Private: - Can only be accessed from your VPC using an interface VPC endpoint (ENI) - Use a resource policy to define access

## API Gateway -- Deployment Stages 
- Making changes in the API Gateway does not mean they're effective 
- You need to make a "deployment" for them to be in effect 
- It's a common source of confusion 
- Changes are deployed to "Stages" (as many as you want) 
- Use the naming you like for stages (dev, test, prod) 
- Each stage has its own configuration parameters 
- Stages can be rolled back as a history of deployments is kept

## API Gateway -- Stage Variables 
- Stage variables are like environment variables for API Gateway 
- Use them to change often changing configuration values 
- They can be used in: 
  - Lambda function ARN 
  - HTTP Endpoint 
  - Parameter mapping templates 
- Use cases: 
  - Configure HTTP endpoints your stages talk to (dev, test, prod...) 
  - Pass configuration parameters to AWS Lambda through mapping templates 
- Stage variables are passed to the "context" object in AWS Lambda

## API Gateway - Integration Types 
- Integration Type MOCK 
  - API Gateway returns a response without sending the request to the backend 
- Integration Type HTTP / AWS (Lambda & AWS Services) 
  - you must configure both the integration request and integration response 
  - Setup data mapping using mapping templates for the request & response
- Integration Type AWS_PROXY (Lambda Proxy): 
  - incoming request from the client is the input to Lambda 
  - The function is responsible for the logic of request / response 
  - No mapping template, headers, query string parameters... are passed as arguments
- Integration Type HTTP_PROXY 
  - No mapping template 
  - The HTTP request is passed to the backend 
  - The HTTP response from the backend is forwarded by API Gateway

----------------------------------------------

# Amazon Cognito 
- We want to give our users an identity so that they can interact with our application. 
- Cognito User Pools: 
    - Sign in functionality for app users 
    - Integrate with API Gateway & Application Load Balancer 
- Cognito Identity Pools (Federated Identity): 
    - Provide AWS credentials to users so they can access AWS resources directly 
    - Integrate with Cognito User Pools as an identity provider 
- Cognito Sync: 
    - Synchronize data from device to Cognito. 
    - Is deprecated and replaced by AppSync 
- Cognito vs IAM: "hundreds of users", "mobile users", "authenticate with SAML"

## Cognito User Pools (CUP) -- User Features 
- Create a serverless database of user for your web & mobile apps 
- Simple login: Username (or email) / password combination 
- Password reset 
- Email & Phone Number Verification 
- Multi-factor authentication (MFA) 
- Federated Identities: users from Facebook, Google, SAML... 
- Feature: block users if their credentials are compromised elsewhere 
- Login sends back a JSON Web Token (JWT)

## Cognito User Pools -- Hosted Authentication UI 
- Cognito has a hosted authentication UI that you can add to your app to handle signup and sign-in workflows 
- Using the hosted UI, you have a foundation for integration with social logins, OIDC or SAML 
- Can customize with a custom logo and custom CSS

## Cognito Identity Pools (Federated Identities) 
- Get identities for "users" so they obtain temporary AWS credentials 
- Your identity pool (e.g identity source) can include: 
    - Public Providers (Login with Amazon, Facebook, Google, Apple) 
    - Users in an Amazon Cognito user pool - OpenID Connect Providers & SAML Identity Providers 
    - Developer Authenticated Identities (custom login server) 
    - Cognito Identity Pools allow for unauthenticated (guest) access 
- Users can then access AWS services directly or through API Gateway 
    - The IAM policies applied to the credentials are defined in Cognito 
    - They can be customized based on the user_id for fine grained control

## Cognito Identity Pools -- IAM Roles 
- Default IAM roles for authenticated and guest users 
- Define rules to choose the role for each user based on the user's ID 
- You can partition your users' access using policy variables 
- IAM credentials are obtained by Cognito Identity Pools through STS 
- The roles must have a "trust" policy of Cognito Identity Pools

## Cognito User Pools vs Identity Pools 
- Cognito User Pools: 
    - Database of users for your web and mobile application 
    - Allows to federate logins through Public Social, OIDC, SAML... 
    - Can customize the hosted UI for authentication (including the logo)] 
    - Has triggers with AWS Lambda during the authentication flow 
- Cognito Identity Pools: 
    - Obtain AWS credentials for your users 
    - Users can login through Public Social, OIDC, SAML & Cognito User Pools 
    - Users can be unauthenticated (guests) 
    - Users are mapped to IAM roles & policies, can leverage policy variables 
    - CUP + CIP = manage user / password + access AWS services

    ----------------------------------------------

    # ECS

## Docker
- Docker is a software development platform to deploy apps
- Apps are packaged in containers that can be run on any OS
- Apps run the same, regardless of where they’re run
- Any machine
- No compatibility issues
- Predictable behavior
- Less work
- Easier to maintain and deploy
- Works with any language, any OS, any technology

## Docker Containers Management
- To manage containers, we need a container management platform
- Three choices:
- ECS: Amazon’s own platform
- Fargate: Amazon’s own Serverless platform
- EKS: Amazon’s managed Kubernetes (open source)

## ECS Clusters 
- ECS Clusters are logical grouping of EC2 instances
- EC2 instances run the ECS agent (Docker container)
- The ECS agents registers the instance to the ECS cluster
- The EC2 instances run a special AMI, made specifically for ECS

## ECS Task Definitions 
- Tasks definitions are metadata in JSON form to tell ECS how to run a Docker Container
- It contains crucial information around: 
    - Image Name 
    - Port Binding for Container and Host 
    - Memory and CPU required 
    - Environment variables 
    - Networking information 
    - IAM Role 
    - Logging configuration (ex CloudWatch)

## ECR
- So far we’ve been using Docker images from Docker Hub (public)
- ECR is a private Docker image repository
- Access is controlled through IAM (permission errors => policy)
- AWS CLI v1 login command (may be asked at the exam)
    - $(aws ecr get-login --no-include-email --region eu-west-1)
- AWS CLI v2 login command (newer, may also be asked at the exam - pipe)
    - aws ecr get-login-password --region eu-west-1 | docker login --username AWS -- password-stdin 1234567890.dkr.ecr.eu-west-1.amazonaws.com
- Docker Push & Pull:
    - docker push 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest
    - docker pull 1234567890.dkr.ecr.eu-west-1.amazonaws.com/demo:latest

## Fargate
- When launching an ECS Cluster, we have to create our EC2 instances
- If we need to scale, we need to add EC2 instances
- So we manage infrastructure…
- With Fargate, it’s all Serverless!
- We don’t provision EC2 instances
- We just create task definitions, and AWS will run our containers for us
- To scale, just increase the task number. Simple! No more EC2 

## ECS Task Placement Process
- Task placement strategies are a best effort
- When Amazon ECS places tasks, it uses the following process to select container instances:
    1. Identify the instances that satisfy the CPU, memory, and port requirements in the task definition.
    2. Identify the instances that satisfy the task placement constraints.
    3. Identify the instances that satisfy the task placement strategies.
    4. Select the instances for task placement.

## ECS Task Placement Strategies
- **Binpack**
    - Place tasks based on the least available amount of CPU or memory
    - This minimizes the number of instances in use (cost savings)
- **Random**
    - Place the task randomly
- **Spread**
    - Place the task evenly based on the specified value
    - Example: instanceId, attribute:ecs.availability-zone

## ECS – Service Auto Scaling
- CPU and RAM is tracked in CloudWatch at the ECS service level
- Target Tracking: target a specific average CloudWatch metric
- Step Scaling: scale based on CloudWatch alarms
- Scheduled Scaling: based on predictable changes
- ECS Service Scaling (task level) ≠ EC2 Auto Scaling (instance level)
- Fargate Auto Scaling is much easier to setup (because serverless)