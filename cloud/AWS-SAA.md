# AWS Solutions Architect Associate

Regions / Availability Zones (AZs)
==================================

-   Regions : AWS Geographical regions like US East, US West, EU Central etc

-   Availability Zones : Distinct data centres that host the physical compute and other resources for AWS (AWS ensures a minimum of 2 AZs per region). They are often separated with each other but a geographical calamity could still impact/disrupt services on both

-   Edge Locations : Each Region further consists of many edge locations which basically serve cached data for frequent access from nearby users. Edge location can also be used to write data (For eg. in S3 Transfer Acceleration)

-   As of today there are approximately 15 regions, 45 AZs and ~100+ Edge locations fronted by Cloudfront. Sometimes edge locations could also be operated/managed by AWS partner network

* * * * *

Route53
=======

Fun fact : In Route53, 'Route' comes from Route 66 --- Oldest inter state highway in the United States, and port 53 used by DNS in Computer Networking

It is used for resolving DNS names to IP addresses, Registering Domain Names

There are different types of records used in DNS system:

-   SOA records

-   A records

-   CNAME records

-   MX records

-   PTR records

-   Alias records

-   NS records

A request from browser first goes to Top level domain (.com, .au, .gov etc), from there request is forwarded to Name Servers (NS), which fetch the details of A records and answer the request with respective IP address which can then be used by the browser to initiate a TCP connection.

-   When given a choice between Alias record and a CNAME record, Alias record usually offers more benefits.

-   When one domain like [m.acm.org](http://m.acm.org/) has to be routed to [mobile.acm.org](http://mobile.acm.org/), always use a CNAME record to delegate resolution to another domain

Different types of resolution policies supported by Route53 are:

-   Simple Routing Policy : In this you can also provide multiple IP addresses but cannot associate health check of all IP addresses

-   Weighted Routing Policy : Using this policy one can route traffic based on weight assigned to different IP addresses (For eg. 70% traffic to IP X, and other 30% to IP Y), which is then proportionally routed/distributed. (Sounds similar to Canary Deployments ?)

-   Latency Based Routing Policy: This is based on response latency from the location of user. Using this information, request can be routed to different servers.

-   Failover Based Routing Policy : One active, One passive --- If Active health check starts failing, traffic routes to Passive Setup

-   Geographical Routing Policy : In this we can define that user in Europe should be routed to Europe server only (This is different from Latency based routing policy and is more hard-coded per se)

-   Geographical Proximity Routing Policy : In this policy, we also have to use Route53 Traffic Flow rules to define a complex routing policy and also use bias to override the decisions taken by Route53. Using this policy one can utilise multiple configurations and control the domain resolution to IPs at a very granular level. Practically this is very less used

-   Multivalue Answer Routing Policy: Same as Simple routing policy with multiple IP addresses, but only difference is that health checks can be associated

* * * * *

IAM (Identity and Access management)
====================================

-   Users

-   Groups

-   Roles (Who you are ?)

-   Policies (What you can do?)

By default, new users have:

-   only access_key_id and secret_access_key, but no console access

-   no permissions, until they are made member of a group or assigned some roles/policies

IAM, like other AWS services is eventually consistent as this data is replicated across multiple servers. IAM is a global service (Not scoped per region). Mainly two services can allow access without authentication / authorization in AWS --- STS and S3

Following terms are used in context of IAM:

-   User : can be an IAM user or an applications accessing the AWS resources

-   Group :Group of users who can be collectively permitted some actions

-   Role : This is something which can be assumed by an entity like User or Group (This is similar to Authentication)

-   Policy : This defines the permissions you have on the resources that you want to access (This is similar to Authorization)

Request Context : This is the request object which AWS receives when somebody tries to access something or take an action on some AWS resource. This object includes source IP, resources that you are trying to access, what actions are you taking on those resources, what time of day this request originated etc.

Policies can be managed in two ways:

-   Managed policies : AWS Managed & Customer Managed

-   Inline Policies

Policies can further be of two types:

i) Identity based policies : These are attached directly to Identities like User/Groups etc. They can be managed or inline policies.

ii) Resource based policies : These are inline policies directly applied on the resource that has to be accessed from same/other accounts. This is mainly used for cross-account resource access

Policy versioning: Customer managed policies can normally have only 5 versions being managed at a single point of time. This is useful when you make a change to a policy and it breaks something, you can quickly set the default setting to a previously used policy

IAM Roles are more preferred instead of resource based policies which are not extendable to other entities

* * * * *
> **EC2:**

-   When EC2 was first launched all AMI's were backed by Instance store or Ephemeral storage
-   Ephemeral storage is non-persist or temporary storage
-   When an instance is shut down, even if turned back up, the the contents of the instance store, or ephemeral storage will be gone, and unaccessible
-   Stopping and restarting an instance moves the instance to another host, hence the lost data
-   EC2 eventually got the ability to attach EBS or Elastic Block Storage which allows for data persistence
-   There is NO way to flag data preservation on ephemeral storage, if the instance restarts, or the host experiences issues, you can incur data loss
-   2 types of Volumes
-   Root Volume:
    -   This is where your operating system is installed
    -   Can either be EBS or Ephemeral
    -   Max size is 10GB
    -   EBS root device volume can be up to 1 or 2TB depending on OS
    -   Delete on Terminate is the default value
-   Additional Volumes:
    -   This can be your D:, E:, F: / dev/sdb, /dev/sdc, /dev/sdd etc..
    -   Delete on Terminate is NOT the default value, additional volumes WILL persist after the instance is terminated and must be manually deleted
 - Termination:
    - We have an instance where shutdown behavior = terminate and enable, terminate protection is ticked
    - We shutdown the instance from the OS, what will happen ?
    - The instance will still be terminated!   

> **EBS:**

-   Allows users to have data persistence
-   EBS volumes can be detached from an instance and attached to other instances without data loss
-   EBS volumes can only be attached to a single instance at a time
-   EBS root volumes are terminated/deleted by default when the EC2 instance is terminated
-   Termination/Deletion default behavior can be stopped by un-selecting the "Delete on Termination" option when creating the instance or by setting the deleteontermination flag to false using the command line at boot time
-   Non root EBS volumes attached to the instance are preserved if you delete the instance
-   Boot time is quicker using EBS, typically less than 1 minute, where Instance store volumes are generally less than 5 minutes
-   Must manually delete additional EBS volumes when an instance is terminated. Failure to do so will hold a storage charge for unattached non deleted volumes

> **Placement Groups**

- Sometimes you want control over the EC2 Instance placement strategy
- That strategy can be defined using placement groups
- When you create a placement group, you specify one of the following
strategies for the group:
    - Cluster---clusters instances into a low-latency group in a single Availability Zone
    - Spread---spreads instances across underlying hardware (max 7 instances per
    group per AZ) -- critical applications
    - Partition---spreads instances across many different partitions (which rely on
    different sets of racks) within an AZ. Scales to 100s of EC2 instances per group
    (Hadoop, Cassandra, Kafka)

> **EC2 Instance Launch Types**
- On Demand Instances: short workload, predictable pricing
- Reserved: (MINIMUM 1 year)
    - Reserved Instances: long workloads
    - Convertible Reserved Instances: long workloads with flexible instances
    - Scheduled Reserved Instances: example -- every Thursday between 3 and 6 pm
- Spot Instances: short workloads, for cheap, can lose instances (less reliable)
- Dedicated Instances: no other customers will share your hardware
- Dedicated Hosts: book an entire physical server, control instance placement
* * * * *

Databases
=========

Databases are mainly of two types:

-   Relational --- Conventional relational databases to store data --- RDS

-   Non-relational (DynamoDB --- Like MongoDB) --- Collections contain tables which are basically JSON objects

Relational Database Engines supported by AWS are: (POMMMA)

-   PostgreSQL

-   Oracle

-   MariaDB

-   MySQL

-   MS SQL

-   Aurora

Processing types supported by RDS:

-   OLTP (Online Transaction Processing)

-   OLAP (Online Analytic Processing) --- This works on large amount of data and derives analytics out of it --- Redshift is the Amazon offering for OLAP requirements

RDS can support multi-az setup and read replicas

-   Multi-AZ setup is for disaster recovery and Read replicas are for performance --- redirecting read only queries to read replicas instead of Database masters

Read Replicas
-------------

-   Each read replica has its own DNS end point

-   Read replicas can be promoted to be their own databases --- this breaks the replication though

-   You can have a read replica in another region

-   Read replicas ONLY work if backups are turned ON

Two types of backups are possible:

-   Automated backups --- done during planned maintenance windows

-   Snapshots --- Done manually to save state of RDS

DynamoDB
--------

-   NoSQL solution from Amazon

-   Cluster is spread across 3 different segregated data centres / AZs

-   Eventual read consistency with maximum delay of 1s

-   Incoming data transfer IS NOT charged if in a single region. If you cross regions, you will be charged at both ends of the transfer

-   DynamoDB supports concepts of streams where any modification to existing record in the table is written out on a data stream which can be processed by compute capabilities like AWS Lambda. Lambda can then take decisions based on that event stream or send a SNS notification instead

-   DynamoDB streams can also be configured to send out two copies of state (previous / current) with the primary key attribute to reflect on the actual change that has happened on the table data

-   DynamoDB supports DAX, to cache responses and improve time from milliseconds to microseconds

Redshift
--------

-   1/10th of the cost of other data warehousing solutions

-   Helps with OLAP requirement --- to derive analytics out of data

-   Automated backups are by default done every day

-   Maximum retention period like RDS is 35 days

-   Leader node hours are not charged, only compute node hours are charged

-   Redhisft can currently run only in OneAZ -> For same reason, Redshift offers asynchronous backup replication in S3 to another region for Disaster Recovery (DR)

-   It is used for business intelligence use-cases

-   Cross region replication can be set up

-   Redshift additionally supports VPC Routing feature, where all COPY and UNLOAD requests between your cluster and data repositories are routed through VPC, thus gathering benefits of Security Groups, NACL, VPC Endpoints etc.

-   If enhanced VPC routing is not enabled, REDSHIFT cluster routes all traffic through internet

-   Redshift Spectrum allows to execute queries on files which are directly stored on S3

AWS Aurora
----------

-   Compatible version of MySQL/PostgreSQL that AWS built from scratch

-   By default stores 2 copies of data in each Availability Zone, with a minimum of 3 availability zones (6 copies of data are hence stored at the minimum)

-   Compute resources can scale upto 32 vCPU cores and 244GB of RAM

-   Starts with 10GB of storage but scales up to 64TB automatically based on requirement, while other databases can grow max till 16TB

-   Aurora can automatically handle loss of 2 copies of data without affecting write capability and 3 copies of data without affecting read availability

-   Storage for Aurora is self healing -> Data blocks are continuously checked for errors and fixed

-   Aurora automated backups or snapshots does not affect performance of running clusters

-   Aurora Snapshots can be shared with other AWS accounts

-   Aurora read replicas can be of two types:- MySQL Read Replicas (Maximum 5) and Aurora Read Replicas (maximum 15)

-   Automated failover is supported for Aurora read replicas but not for MySQL read replicas

-   When you create an Aurora Read Replica from a MySQL RDS instance, AWS basically creates a new Aurora DB Cluster(with read/write capability) which is asynchronously synced with the main DB instance.

-   Two types of endpoints are supported:

i) Reader Endpoint : Load balances traffic across all read replicas

ii) Cluster Endpoint : Routes write queries to active master

ElastiCache
-----------

-   In memory cache store for speeding up an application so that data fetch queries can be reduced

-   For REDIS AUT, user needs to enable in-transit encryption

-   Two types of engines are available:

i) Memcached

Multithreaded, NOT multi-az and useful for simple cache offloading

ii) Redis

Single threaded, MultiAZ, backups are possible, business use-cases available like MIN, MAX, AVG etc.

Cloudfront
==========

-   Cloudfront is a service that is used to store cached content at edge locations so that global users get it from their nearest location
-   Cloudfront can monitor a S3 bucket, EBS load balancer, EC2 machine etc. and then it can just get new data and store it locally so that users can then download it directly from the Cloudfront distribution URL
-   We can also invalidate cached objects in Cloudfront, but these invalidations are normally charged by AWS
-   Objects are stored/cached by the edge locations until the TTL expires; after which a new version is then fetched again from the central server
-   Edge locations can also be used to write data and not just READ data. Write scenario is used mostly in case of S3 Transfer acceleration where an user writes data to a local edge location and then AWS takes care of actually transferring the data to real S3 bucket
-   Origins are the source from which cloudfront gets the data (S3, ELB, EC2 instance etc.)

* * * * *

Elastic Load Balancers
======================

ELBs by default come up in background in all AZs and they also dynamically scale up and down based on the traffic

Full DNS lookup will often tell us about all the ELBs that are currently used by AWS to handle incoming requests

Load balancers are basically of three types:

Application Load balancers
--------------------------

Can route traffic based on layer 7 interaction. Basically work on HTTP/HTTPS layer and can be used for intelligent routing based on application needs (headers, query parameters, source IP etc.)

Network Load Balancers
----------------------

Are used for scenarios where pretty heavy workload (millions of requests) have to be routed/managed

Classic Load Balancers
----------------------

They are deprecated now but were used for basic HTTP/TCP routing

-   AWS never gives us IP addresses of Load Balancer resources, instead we only get a DNS routable name and the IP address can always change. However, for network load balancer we can attach elastic IP addresses to them and the NLB will be available over those addresses.
-   Application load balancers route traffic to a target group instead of routing them to an instance
-   Sticky Sessions have to be disabled, if all requests are going to only few/one instances. They are only useful if the instances store some information locally which is relevant for subsequent requests
-   Cross zone load balancing allows load balancer to route requests evenly to instances in multiple availability zones
-   Path patterns can be used to redirect traffic to different EC2 instances based on a specific URL Path pattern which exists
-   Single Application Load Balancer can be loaded with certificates from different domains. Multiple certificates can be uploaded to ACM (Amazon Certificate Manager) and then clients (reaching out to ALB) can use something like SNI (Server Name Indication) to specify which host to reach

Launch configurations and ASGs
------------------------------

If ASG is terminated, all instances associated as part of it will also be terminated

Launch Configurations are more about the configurations of the individual EC2 machines i.e. instance types, security group configurations, root volume configurations, tags etc. whereas Autoscaling Groups use LCs (Launch configurations) to spin up new instances and work on scaling up/down EC2 instances based on pre-defined policies

Egress Only Internet Gateways
-----------------------------

Egress only gateways allow IPv6 based internet traffic to access the internet and at the same time denying access from internet to the instances within the VPC

* * * * *

Amazon FSx
==========

Amazon FSx is a file system offering from AWS. It is offered in two variants:

-   FSx for Windows
-   FSx for Lustre (High performance compute)

FSx is basically a high performance file system that can be used for compute intensive workloads offering high data throughput. Users can additionally configure the throughput irrespective of the data storage size of the file system (unlike EFS)

FSx is frequently used as file storage for Windows systems as it offers SMB protocol support. Additionally, it also offers integrations with other storage services like S3, where data can be temporarily copied from S3 to AWS FSx for high throughput needs from a filesystem perspective; and later the result can be copied back to S3 after the computations are completed.

Payment model is pay-as-you-go

* * * * *

AWS WAF (Web App Firewall)
==========================

AWS WAF is a managed service designed to protect public facing web applications from unintended/unsafe traffic

WAF provides readymade integrations with:

-   Cloudfront
-   Application Load Balancer
-   API Gateway

With these integrations, whenever any of these services receive a request; they forward it to WAF for validation. If WAF allows, only then these requests are further routed by CF, ALB or API GW to the back-end machine which needs to process the request

WAF offers many managed rules (based on industry best practices like OWASP top 10 vulnerabilities, SQL injection etc.)

As a customer, we can define our custom conditions or use these managed rules to provide security for our application

Custom rules for throttling (IP '123.x.x.x' can only trigger 4000 requests per second etc.) can also be defined at WAF layer and then custom error messages/pages could also be configured in services like Cloudfront which could then be returned to the end-user. All this happens without affecting the real back-end systems.

S3
==

-   S3 Standard : Availability --- 4 9s (99.99%), Durability --- 11 9s (99.999999999 %)
-   Global namespace (Bucket names should be unique)
-   Minimum size of objects is 0 bytes, maximum is 5TB
-   Files can be uploaded in buckets which are nothing but folders hostingd the files
-   On successful upload, S3 returns a HTTP 200 status code
-   By default all buckets are private

S3 Consistency Model
--------------------

Read after write consistency for new PUT objects (Newly uploaded objects are guaranteed to be read immediately without any stale state or problems)

Eventual consistency for overwrite PUTs and DELETEs (Modifications / deletions will eventually reflect latest state --- there could be a delay of some seconds)

S3 Object Properties
--------------------

-   *Key* : Name of the object
-   *Value* : Sequence of bytes/contents of the object
-   *Versioning* : Version of the object
-   *Metadata* : Objects can further have metadata (data about data) to classify the contents

S3 Storage Tiers
----------------

S3 offers various storage tiers that help control cost, availability and durability of the data

-   S3 Standard : This is the most costly alternative with 99.99% availability (probability that the object will be available when needed) and 99.999999999% durability (probability that data will not be lost)
-   S3 IA (Infrequently accessed) : This still replicates data to different zones in a region but less costlier than standard. Retrieval fees are charged
-   S3 IA --- 1 Zone : Multiple zones replication is not done and costs even lesser than S3 IA
-   S3 Intelligent Tiering : Storage tiering is managed by AWS instead which uses Machine learning to decide on which tier to use for the bucket based on historical patterns of usage
-   S3 Glacier : Used when cost has to be less but time of retrieval can be configurable ranging from minutes to hours
-   S3 Glacier deep archive : This is cheapest option where retrieval time of more than 12 hours is acceptable. This is used for data which might be rarely needed and time of retrieval being around ~12 hours is still acceptable

S3 Security Policies
--------------------

-   Access to S3 object/bucket can be controlled with ACL control lists or Bucket Policies
-   Bucket policies work at bucket level BUT Access Control Lists can go all the way down to individual objects
-   Access logging can be configured for S3 buckets which logs all access requests for S3, made by different users
-   Encryption in transit is achieved by HTTPS (SSL / TLS)

Encryption at rest is achieved in two ways

Service Side encryption (Can be further managed by AWS in three ways)

*i) Keys managed by S3 service for encryption (**SSE-S3**)*

*ii) Keys provisioned by user in KMS (**SSE-KMS**)*

*iii) User/Customer provided encryption keys can also be used (**SSE-C**)*

Client Side encryption --- Client himself manages the encryption/decryption and uploads the encrypted data only

S3 Versioning
-------------

-   S3 versioning can be used to maintain multiple copies of objects
-   Once enabled, it cannot be disabled on the same bucket

S3 Transfer Acceleration
------------------------

This is used to speed up large data uploads to S3. With this, user can upload the data to nearest edge location and S3 will then ensure that the data is replicated to the actual bucket for final storage. For Edge Location -> S3, AWS will then use the backbone network which is quite fast than the usual internet speed

S3 Lifecycle Rules
------------------

-   LRs can be used to automatically expire objects based on prefix/tag filters (For eg. All objects having tags "*abc"* should expire after 30 days)
-   Objects can automatically transition across different storage tiers' based on lifecycle rules. For eg. after 30 days migrate objects to IA-1Zone and after 60 days move it to Glacier and finally expire them after 120 days

S3 Cross Region Replication
---------------------------

-   This is used when you want to replicate the contents of a bucket automatically to another bucket (The destination bucket could also enforce different storage tiers on the objects)
-   Versioning has to be mandatorily enabled on both source and destination buckets
-   Delete markers OR object deletions are not replicated on the destination bucket. This is done intentionally by Amazon to inadvertently replicating deletion of objects

Other S3 Related Services Offered by AWS
----------------------------------------

-   S3 Athena --- S3 Select based query analysis on S3 objects without transferring the data first to a data lake
-   S3 Object Lock
-   S3 Inventory --- Reporting for auditing purposes of all S3 objects. Reports can be stored in json, yaml or parquet format
-   S3 Batch Operations : Run lambda function or other operations on millions of objects in one go

* * * * *

Storage Gateway
===============

Virtual / Physical appliance that sits in your data centre and replicates data to S3

*File Gateway* : Plain files, replicated to S3

*Volume Gateway* : There are two types of Volume Gateways

-   Stored Volumes : Entire data is on-site but backed up on S3 asynchronously
-   Cached Volumes : Entire data is on S3, but cached data (frequently accessed) is on-site

*Gateway Virtual Tape library*

* * * * *

SQS (Simple Queue Service)
==========================

-   Messages retained for a period of 14 days
-   Messages can arrive out of order however highly unlikely
-   Long polling can be used to avoid cost of frequent polling. Long polling only returns when a message is available and you avoid polling empty queue time and again
-   Visibility of the message can be altered while it is being processed upto a maximum of 12 hours. During this time, a message if processed completely by a worker, can be removed from the queue

SQS Queue Types
---------------

*Standard SQS Queue : *This is the standard processing model for SQS service

*FIFO SQS Queue : *In this messages are delivered only once and also arrive in order. Maximum throughput of 300 transactions is supported

* * * * *

SWF (Simple Workflow Service)
=============================

This makes more sense when a manual intervention or task oriented workflow is needed in contrast to a message oriented workflow with SQS

-   In contrast SQS is more of a message oriented workflow
-   In SWF, maximum retention period is for 1 year where the messages can be stored
-   This workflow guarantees that a task is processed only once

It works with the following components

i) *Workflow Starters* : Something like web application which triggers a workflow

ii) *Deciders* : Which decide that a particular workflow task has to be executed

iii) *Activity Executors* : They execute the real business logic defined in the workflow

* * * * *

SNS (Simple Notification Service)
=================================

-   This is push based service in contrast to SQS which is pull based
-   One can manage various different topics of notification and different subscribers who can then register with the topic with different subscriptions (SMS, Email, HTTPS etc.)
-   In order to ensure that updates are not lost, SNS messages are replicated across all AZs
-   It is immediate notification service with no delays

* * * * *

Elastic Transcoder
==================

-   Media transcoding service used to convert media files across different formats and resolutions
-   Supports various templates with best practices for converting media for iphones, android devices, browsers etc.
-   High resolution transcoding service is pay as you go model --- cost depends on resolution and time taken to convert

* * * * *

API Gateway
===========

API Gateway is an entry-point for various types of resources acting as a front door entry mechanism with support for:

-   HTTPS/TLS
-   Invocation for resources like EC2, Lambda etc.
-   Caching response at it's own layer, thereby reducing requests to things like Lambda on every API invocation

API Gateway uses the following things to realise an API that can be exposed to the end-user

-   A container which defines the API to be exposed
-   Request types that are supported for the API container (GET, POST, OPTIONS etc.)
-   URL Paths that have to be supported as part of the API (/main, /help, /register etc.)
-   Destinations like Lambda, EC2 instances etc. which receive the request
-   CORS (Cross origin resource sharing is needed to be enabled if requests can originate from various different sources) --- FYI, CORS is always enforced by the client (like browsers)

API Gateway supports throttling API requests on global or API level and also supports caching by defining a fixed data size for storage to be provisioned. With caching enabled you can then avoid passing on redundant calls to the backend systems

* * * * *

Kinesis (Streaming Data Ingestion)
==================================

*Streams --- Analytics --- Firehose*

-   When there is a need to consume lots of streaming data on the fly, Kinesis platform can be used

Kinesis offers three different types of services:

-   *Kinesis Streams* : They work on shards (Shards are containers which define the logical boundaries of data storage). Streams persist the data for minimum 24 hours and maximum 7 days, so that something like Lambda or EC2 can work on this data and understand it
-   *Kinesis Firehose* : This is without persistence --- As soon as data comes in, it has to be read/understood/processed by something like Lambda / EC2 and later the result can be stored in DynamoDB, RDS, S3 or Elastic Cluster etc.
-   *Kinesis Analytics* : This is used for real time analytics over the data that is pushed to the Kinesis Platform

* * * * *

AWS Cognito and Web Identity Federation
=======================================

AWS Cognito builds upon two concepts:

-   *User pools* --- They handle user registration, authentication, password reset etc.
-   *Identity Pools* --- They are more aligned with authorization as they return the AWS credentials which can be temporarily used to assume a role, using which the user can then access various AWS resources

Web Identity Federations
------------------------

When you build a mobile app for example, you cannot distribute AWS credentials along with the application code. When the application needs to access any AWS resource, it can instead generate a temporary AWS token which maps to a particular role and using that temporary token it accesses the specified resource. This avoids bundling any secure credential directly with the source code. For fetching an auth token, the app first authenticates the user against Google, Facebook, Amazon etc. or any other provider which support OIDC (Open ID Connect) connect capability.

Mobile App User -> Logs in to Amazon, Facebook, Microsoft etc. -> Authenticates -> Mobile app gets a secure token and exchanges it with AWS for a temporary access token mapped to a role

-   While Web Identity Federations don't use something like Active Directory, but instead have integrations with Amazon, Facebook, Google etc. On the flip side, when integrations with on-premise Active Directory are needed, users can instead use SAML based integration with an identity provider like OneLogin which integrates with the on-premise AD solution and generates SAML based authorization which is also understood by different solutions like AWS.
-   So, Web Identity providers are to be used when user logs in against well known services, whereas SAML based assertion is to be used, when user logs in against an IdP and the IdP further validates against AD. One benefit with IdP based SAML is that user can now access all applications using the same IdP based authentication which he had to do only once.

* * * * *

Amazon EMR (Managed Hadoop Framework)
=====================================

-   EMR helps users run Big Data workloads like Hadoop, Apache Spark etc on AWS
-   In Amazon EMR, AWS provisions EC2 instances for you to work on the data. This enables users to access the EC2 instances and gain visibility in Operating System Configuration

* * * * *

Amazon Inspector
================

It helps to monitor and investigate state of security of the systems by scanning networks or configurations

* * * * *

Cloudwatch Agent
================

Custom monitoring scripts written in Perl, Ruby etc. and are available to be installed on the EC2 instances. Same Cloudwatch agent can be used to ship logs as well as additional monitoring data like Memory Utilization etc to Cloudwatch. Metrics like MemoryUtilization, CPU Core usage, Disk space utilization, disk space utilization etc. are not available out of the box with default Cloudwatch capabilities

* * * * *

Amazon MQ
=========

It is a messaging broker with support for large number of protocols and standards, and is usually better when migrating existing messaging broker workloads to the cloud. When building new applications that depend on messaging capabilities, we can always use Amazon SQS which is highly scalable.

Amazon SQS on the other hand is similar but does not support a large number of APIs and protocols.

![](https://miro.medium.com/max/60/0*Piks8Tu6xUYpF4DU?q=20)
