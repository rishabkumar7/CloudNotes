Regions / Availability Zones (AZs)
Regions : AWS Geographical regions like US East, US West, EU Central etc
Availability Zones : Distinct data centres that host the physical compute and other resources for AWS (AWS ensures a minimum of 2 AZs per region). They are often separated with each other but a geographical calamity could still impact/disrupt services on both
Edge Locations : Each Region further consists of many edge locations which basically serve cached data for frequent access from nearby users. Edge location can also be used to write data (For eg. in S3 Transfer Acceleration)
As of today there are approximately 15 regions, 45 AZs and ~100+ Edge locations fronted by Cloudfront. Sometimes edge locations could also be operated/managed by AWS partner network
Route53
Fun fact : In Route53, ‘Route’ comes from Route 66 — Oldest inter state highway in the United States, and port 53 used by DNS in Computer Networking
It is used for resolving DNS names to IP addresses, Registering Domain Names
There are different types of records used in DNS system:
SOA records
A records
CNAME records
MX records
PTR records
Alias records
NS records
A request from browser first goes to Top level domain (.com, .au, .gov etc), from there request is forwarded to Name Servers (NS), which fetch the details of A records and answer the request with respective IP address which can then be used by the browser to initiate a TCP connection.
When given a choice between Alias record and a CNAME record, Alias record usually offers more benefits.
When one domain like m.acm.org has to be routed to mobile.acm.org, always use a CNAME record to delegate resolution to another domain
Different types of resolution policies supported by Route53 are:
Simple Routing Policy : In this you can also provide multiple IP addresses but cannot associate health check of all IP addresses
Weighted Routing Policy : Using this policy one can route traffic based on weight assigned to different IP addresses (For eg. 70% traffic to IP X, and other 30% to IP Y), which is then proportionally routed/distributed. (Sounds similar to Canary Deployments ?)
Latency Based Routing Policy: This is based on response latency from the location of user. Using this information, request can be routed to different servers.
Failover Based Routing Policy : One active, One passive — If Active health check starts failing, traffic routes to Passive Setup
Geographical Routing Policy : In this we can define that user in Europe should be routed to Europe server only (This is different from Latency based routing policy and is more hard-coded per se)
Geographical Proximity Routing Policy : In this policy, we also have to use Route53 Traffic Flow rules to define a complex routing policy and also use bias to override the decisions taken by Route53. Using this policy one can utilise multiple configurations and control the domain resolution to IPs at a very granular level. Practically this is very less used
Multivalue Answer Routing Policy: Same as Simple routing policy with multiple IP addresses, but only difference is that health checks can be associated
IAM (Identity and Access management)
Users
Groups
Roles (Who you are ?)
Policies (What you can do?)
By default, new users have:
only access_key_id and secret_access_key, but no console access
no permissions, until they are made member of a group or assigned some roles/policies
IAM, like other AWS services is eventually consistent as this data is replicated across multiple servers. IAM is a global service (Not scoped per region). Mainly two services can allow access without authentication / authorization in AWS — STS and S3
Following terms are used in context of IAM:
User : can be an IAM user or an applications accessing the AWS resources
Group :Group of users who can be collectively permitted some actions
Role : This is something which can be assumed by an entity like User or Group (This is similar to Authentication)
Policy : This defines the permissions you have on the resources that you want to access (This is similar to Authorization)
Request Context : This is the request object which AWS receives when somebody tries to access something or take an action on some AWS resource. This object includes source IP, resources that you are trying to access, what actions are you taking on those resources, what time of day this request originated etc.
Policies can be managed in two ways:
Managed policies : AWS Managed & Customer Managed
Inline Policies
Policies can further be of two types:
i) Identity based policies : These are attached directly to Identities like User/Groups etc. They can be managed or inline policies.
ii) Resource based policies : These are inline policies directly applied on the resource that has to be accessed from same/other accounts. This is mainly used for cross-account resource access
Policy versioning: Customer managed policies can normally have only 5 versions being managed at a single point of time. This is useful when you make a change to a policy and it breaks something, you can quickly set the default setting to a previously used policy
IAM Roles are more preferred instead of resource based policies which are not extendable to other entities
Databases
Databases are mainly of two types:
Relational — Conventional relational databases to store data — RDS
Non-relational (DynamoDB — Like MongoDB) — Collections contain tables which are basically JSON objects
Relational Database Engines supported by AWS are: (POMMMA)
PostgreSQL
Oracle
MariaDB
MySQL
MS SQL
Aurora
Processing types supported by RDS:
OLTP (Online Transaction Processing)
OLAP (Online Analytic Processing) — This works on large amount of data and derives analytics out of it — Redshift is the Amazon offering for OLAP requirements
RDS can support multi-az setup and read replicas
Multi-AZ setup is for disaster recovery and Read replicas are for performance — redirecting read only queries to read replicas instead of Database masters
Read Replicas
Each read replica has its own DNS end point
Read replicas can be promoted to be their own databases — this breaks the replication though
You can have a read replica in another region
Read replicas ONLY work if backups are turned ON
Two types of backups are possible:
Automated backups — done during planned maintenance windows
Snapshots — Done manually to save state of RDS
DynamoDB
NoSQL solution from Amazon
Cluster is spread across 3 different segregated data centres / AZs
Eventual read consistency with maximum delay of 1s
Incoming data transfer IS NOT charged if in a single region. If you cross regions, you will be charged at both ends of the transfer
DynamoDB supports concepts of streams where any modification to existing record in the table is written out on a data stream which can be processed by compute capabilities like AWS Lambda. Lambda can then take decisions based on that event stream or send a SNS notification instead
DynamoDB streams can also be configured to send out two copies of state (previous / current) with the primary key attribute to reflect on the actual change that has happened on the table data
DynamoDB supports DAX, to cache responses and improve time from milliseconds to microseconds
Redshift
1/10th of the cost of other data warehousing solutions
Helps with OLAP requirement — to derive analytics out of data
Automated backups are by default done every day
Maximum retention period like RDS is 35 days
Leader node hours are not charged, only compute node hours are charged
Redhisft can currently run only in OneAZ -> For same reason, Redshift offers asynchronous backup replication in S3 to another region for Disaster Recovery (DR)
It is used for business intelligence use-cases
Cross region replication can be set up
Redshift additionally supports VPC Routing feature, where all COPY and UNLOAD requests between your cluster and data repositories are routed through VPC, thus gathering benefits of Security Groups, NACL, VPC Endpoints etc.
If enhanced VPC routing is not enabled, REDSHIFT cluster routes all traffic through internet
Redshift Spectrum allows to execute queries on files which are directly stored on S3
AWS Aurora
Compatible version of MySQL/PostgreSQL that AWS built from scratch
By default stores 2 copies of data in each Availability Zone, with a minimum of 3 availability zones (6 copies of data are hence stored at the minimum)
Compute resources can scale upto 32 vCPU cores and 244GB of RAM
Starts with 10GB of storage but scales up to 64TB automatically based on requirement, while other databases can grow max till 16TB
Aurora can automatically handle loss of 2 copies of data without affecting write capability and 3 copies of data without affecting read availability
Storage for Aurora is self healing -> Data blocks are continuously checked for errors and fixed
Aurora automated backups or snapshots does not affect performance of running clusters
Aurora Snapshots can be shared with other AWS accounts
Aurora read replicas can be of two types:- MySQL Read Replicas (Maximum 5) and Aurora Read Replicas (maximum 15)
Automated failover is supported for Aurora read replicas but not for MySQL read replicas
When you create an Aurora Read Replica from a MySQL RDS instance, AWS basically creates a new Aurora DB Cluster(with read/write capability) which is asynchronously synced with the main DB instance.
Two types of endpoints are supported:
i) Reader Endpoint : Load balances traffic across all read replicas
ii) Cluster Endpoint : Routes write queries to active master
ElastiCache
In memory cache store for speeding up an application so that data fetch queries can be reduced
For REDIS AUT, user needs to enable in-transit encryption
Two types of engines are available:
i) Memcached
Multithreaded, NOT multi-az and useful for simple cache offloading
ii) Redis
Single threaded, MultiAZ, backups are possible, business use-cases available like MIN, MAX, AVG etc.
