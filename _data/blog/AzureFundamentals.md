---
template: BlogPost
path: /azure-fundamentals
title: 'Azure Fundamentals'
date: 2020-05-09T12:12:25.364Z
thumbnail: 'https://rishabincloud.s3.amazonaws.com/CloudNotes/AzureFundamentals.png'
tags: 'Azure'
metaDescription: Azure Fundamentals AZ-900
---


## Cloud Concept

This part contains general knowledge about cloud computing e.g. what are the benefits of cloud, the differences types of cloud service offering, and the differences in cloud deployment models.

### Technological benefits of cloud:

-   High Availability --- The major cloud providers (Azure, AWS, GCP) have multiple data centers spread around throughout the world. Data and code stored in the cloud are copied to more than one data center. If anything happens to one data center, the data can be recovered from another data center.
-   Fault Tolerance --- In case there is any fault in the application or infrastructure, the service can continue to work by moving the work to other healthy servers.
-   Disaster Discover --- The data in the cloud can also get copied to other regions e.g. copy data from West US to East US. If there is natural disaster happened in West US and every data center goes down, the data center in East US will still have the copy of data.
-   Scalability --- The application running in the cloud can expand its size when there are more users in the system.
-   Elasticity --- The application running in the cloud can shrink its size when there are fewer users in the system. The users can also set automatic shutdown during the non-business hours to save money.

### Business benefits of cloud:

-   Agility --- Cloud allows the business to deliver IT system to customers faster. The machines in the cloud are ready for cloud users to spin up when they need and shut down when they are not required.
-   Economies of scale --- Cloud is a shared pool of machines and services. As the number of customer grows, the cloud providers can lower the cost or increase quality of the services.
-   Capital Expenditure (CapEx) vs Operational Expenditure (OpEx) --- Building a data center requires large capital investment for hardware as well as the facility. A data center will also require ongoing electricity and staffs cost for operation. By using cloud, the capital expenditure for building a data center is not required.
-   Consumption-based model (pay-as-you-go) --- The cloud users only pay for what they need, by the duration they need.

### Types of cloud service offering:

-   IaaS (Infrastructure as a Service) --- In this offering, the cloud providers offer barebone hardware in managed data center such as virtual machine or file storage. The cloud providers will take care of the physical infrastructure e.g. data center security or hardware repair, while the cloud users need to take care of server maintenance. For example, Azure VM allows the users to spin up new virtual machines in any size.
-   PaaS (Platform as a Service) --- The cloud providers will take care of the servers. The cloud users only need to bring in application code or data. For example, Azure SQL Database is fully managed service by Azure that the users do not need to / cannot access anything beyond their data.
-   SaaS (Software as a Service) --- The cloud providers will take care of both servers and code. The cloud users only need to configure the software to suit their needs. For example, Office 365 allows the users to use Microsoft Office software suite.

### Differences in cloud deployment model:

-   Public Cloud --- When the companies decided to use all their servers from the cloud providers' data center.
-   Private Cloud --- When the companies decided to use all their servers on their own data center to replicate the cloud services e.g. offering self-service components.
-   Hybrid Cloud --- When the companies decided to use some of the servers in their own data center, and some of the servers in public cloud.

## Core Azure Services

This part contains the introduction to different services offering in Azure for each service category:

-   Compute --- Azure Virtual Machine, Container, Kubernetes Service
-   Network --- Azure Virtual Network, Load Balancer, VPN Gateway, Application Gateway and Content Delivery Network
-   Internet of Things (IoT) --- Azure IoT Hub, IoT Central
-   Big Data & Analytics --- Azure HDInsight, Data Lake Analytics, Databricks
-   Artificial Intelligence --- Azure ML, ML Studio
-   Serverless Computing --- Azure Function, Logic Apps
-   Storage --- Azure Blob Storage, Disk Storage, File Storage, Data Lake Storage
-   Database --- Azure SQL DB, SQL DW, CosmosDB
-   Management tools --- Azure CLI, Powershell, Portal, Advisor
-   Azure Marketplace --- Azure service for deploying ready to use services by Azure or the 3rd party. Such as a package to install and setup R Studio

## Security, Privacy, Compliance, and Trust in Azure

This part contains the security Azure provided for their services as well as Azure's commitment in privacy and regulatory compliance.

Azure services for security in different areas:

-   Network Security --- Azure Firewall, DDoS Protection, and Network Security Group
-   Authentication and Authorisation --- Azure Activity Directory (AD)
-   Application Security --- Azure Key Vault, Information Protection, Advanced Threat Protection
-   Resource Governance --- Azure Policies & Initiatives, Role-Based Access Control (RBAC), Locks, Management Groups, Advisor
-   Monitoring & Reporting --- Azure Monitor, Service Health
-   Privacy & Regulatory Compliance --- Azure Government (for US governments), Germany (for EU's GDPR regulation), Trust Center

## Azure Pricing and Support

This part contains the information about different types of Azure subscription, cost factors of Azure services, tools for cost calculation, and the support plans in Azure.

### Azure subscription types:

-   Free --- New users will receive $200 credits to spend on any Azure products in the first 30 days. We will also receive free access to popular Azure products for the first 12 months, and the free access to free products forever. This type of subscript require credit card details, but nothing will be charged until we decide to upgrade to pay-as-you-go subscription.
-   Pay-as-you-go (PAYG) --- Charge monthly for the services used in the last billing period. This type is used by individuals and businesses.
-   Enterprise Agreement --- Enterprises can make an agreement with Azure which would allow discounted price for software license and Azure services.
-   Student --- Students will receive $100 credit to spend in the first 12 months. No credit card required for this subscription type, but the student email verification is required.

### Cost Factors of Azure services:

-   Resource Types --- Different Azure products will have different pricing e.g. Azure VM cost will be based on the virtual machine size, operating system, usage hours, and storage size. The users can turn off virtual machine temporarily to save usage hours cost, but the storage cost will always incur.
-   Subscription Types --- Most users will pay the standard price, while the enterprise customers may have discounted or stable cost.
-   Locations --- For some resource types, the cost will vary based on the server locations. For example, Azure VM in Japan data center might cost more than in US data center.
-   Inbound and Outbound traffic --- Movement of data between different data center (availability zones) or regions might incur cost.

### Tools for cost calculation for Azure

-   [TCO Calculator](https://azure.microsoft.com/en-us/pricing/tco/calculator/) --- The service to compare the cloud cost with the Total Cost of Ownership e.g. how much you need to spend if you are to build the same infrastructure in your own data center.
-   [Pricing Calculator](https://azure.microsoft.com/en-us/pricing/calculator/) --- The website where the potential customers can plan their cost before moving to Azure cloud
-   Azure Cost Management --- Azure free service which shows how much have we spent in this billing period, and also provide the best practices to optimise the cost
-   Azure Advisor --- Azure free service which provides the recommendations in high availability, security, performance, and cost based on Azure products we are using

### Service Level Agreement (SLA)

-   SLA is the minimum time that Azure commit the service will be available to use. If the service is offline for longer time than SLA, Azure will provide credits for the customers.
-   Azure offers 99.9% SLA on most Azure products
-   There are some cases that the SLA can be increased. For example, Azure guarantees 99.99% SLA for the virtual machines that have more than one instance across more than one region.

### Public Preview vs Private Preview features

-   Most new features in Azure will be launched as private preview for limited users, then public preview for all the users
-   After the feature has been thoroughly tested, it will be out of preview and become generally availability feature (GA).
-   Azure provides [Preview Portal](https://preview.portal.azure.com/) for the users to test out new features for Azure portal. For other features that are not related to the portal, the users can access them from standard Azure portal.
