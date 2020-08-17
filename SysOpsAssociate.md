# AWS SysOps Associate

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