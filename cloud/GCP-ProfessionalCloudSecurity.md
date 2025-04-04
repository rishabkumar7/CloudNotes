# Google Professional Cloud Security Engineer Study Notes

## Overview

The Professional Cloud Security Engineer certification focuses on designing and implementing secure workloads and infrastructure on Google Cloud. The exam tests your ability to:

-   Configure secure access management
-   Establish secure network boundaries
-   Ensure proper data protection
-   Manage security operations
-   Support compliance requirements

**Helpful resources:**

-   [Exam Guide](https://cloud.google.com/certification/guides/cloud-security-engineer)
-   [Google Cloud Skills Boost](https://www.cloudskillsboost.google/paths/15)
-   [Google Cloud Documentation](https://cloud.google.com/docs)

## Section 1: Configuring Access (~25% of exam)

### 1.1 Managing Cloud Identity

-   **Google Cloud Directory Sync (GCDS)**:
    -   Synchronizes users and groups from existing LDAP/Active Directory to Google Cloud
    -   Doesn't migrate passwords; only syncs identity information
-   **Single Sign-On (SSO)**:
    -   Configure SAML 2.0 with third-party IdPs like Okta, Azure AD, etc.
    -   Allows for centralized authentication management
-   **Super Administrator Account**:
    -   Highest privilege role in Google Workspace/Cloud Identity
    -   Best practices:
        -   Have at least 2 super admin accounts (for redundancy)
        -   Use separate accounts from daily operations
        -   Enable 2-step verification
        -   Review super admin actions regularly
-   **User Lifecycle Management**:
    -   Automate using Cloud Identity API
    -   Implement automated onboarding/offboarding workflows
    -   Use Google Groups for managing role-based access
-   **Programmatic Administration**:
    -   Use Directory API, Admin SDK, Cloud Identity API
    -   Implement scripts to automate user/group management
-   **Workforce Identity Federation**:
    -   Allows 3rd party identity provider access to Google Cloud services
    -   No need to sync users to Cloud Identity
    -   Configure trust between Google Cloud and external IdP
    -   Map attributes from IdP to Google Cloud

**Helpful links:**

-   [Cloud Identity documentation](https://cloud.google.com/identity/docs/setup)
-   [Google Cloud Directory Sync](https://support.google.com/a/answer/106368)
-   [Setting up SSO](https://cloud.google.com/architecture/identity/single-sign-on)
-   [Workforce Identity Federation](https://cloud.google.com/iam/docs/workforce-identity-federation)

### 1.2 Managing Service Accounts

-   **Service Account Security Best Practices**:
    -   Treat service accounts like user accounts (or more strictly)
    -   Delete unused default service accounts
    -   Follow least privilege principle
    -   Regularly audit service account permissions
-   **Use Cases for Service Accounts**:
    -   Running applications on Compute Engine, GKE
    -   Executing administrative tasks from scripts/applications
    -   Service-to-service authentication
    -   Delegating domain-wide authority in Google Workspace
-   **Service Account Management**:
    -   Create only when necessary
    -   Disable unused accounts
    -   Use IAM roles to authorize service accounts
-   **Service Account Keys Management**:
    -   Avoid keys when possible (use other auth methods)
    -   Rotate keys regularly
    -   Store keys securely (Secret Manager)
    -   Monitor key usage
    -   Audit key creation and downloads
-   **Short-lived Credentials**:
    -   Prefer over long-lived keys
    -   Use Service Account Token Creator role
    -   Implement with signJwt or signBlob IAM methods
-   **Workload Identity Federation**:
    -   Allow applications outside Google Cloud to use IAM
    -   Configure identity pool and provider
    -   Map external identity to service account
-   **Service Account Impersonation**:
    -   Temporarily assume service account permissions
    -   Use `--impersonate-service-account` in gcloud
    -   Grant Service Account Token Creator role

**Helpful links:**

-   [Service Accounts overview](https://cloud.google.com/iam/docs/service-accounts)
-   [Service Account best practices](https://cloud.google.com/iam/docs/best-practices-for-managing-service-account-keys)
-   [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)
-   [Service Account Impersonation](https://cloud.google.com/iam/docs/impersonating-service-accounts)

### 1.3 Managing Authentication

-   **Password and Session Management**:
    -   Define password complexity requirements
    -   Set password expiration policies
    -   Configure session timeouts
    -   Implement password reset procedures
-   **SAML and OAuth**:
    -   Set up SAML for enterprise IdP integration
    -   Configure OAuth for third-party application access
    -   Understand token-based authentication flows
-   **2-Step Verification**:
    -   Enforce MFA for all users
    -   Support multiple authentication factors (phone, security key, etc.)
    -   Configure verification frequency
    -   Set up backup codes process

**Helpful links:**

-   [Managing authentication](https://cloud.google.com/docs/authentication)
-   [2-Step Verification](https://support.google.com/a/answer/175197)
-   [SAML configuration](https://cloud.google.com/identity-platform/docs/web/saml)

### 1.4 Managing Authorization Controls

-   **IAM Roles and Permissions**:
    -   Basic roles: Owner, Editor, Viewer (avoid when possible)
    -   Predefined roles: Service-specific roles with curated permissions
    -   Custom roles: Build your own permission sets
-   **Separation of Duties**:
    -   Split sensitive permissions across multiple roles
    -   Ensure no single individual can perform all critical functions
    -   Establish approval workflows for sensitive operations
-   **IAM Conditions**:
    -   Apply conditional logic to IAM policies:
        -   Time-based access
        -   Resource attribute-based
        -   Request attribute-based
-   **IAM Deny Policies**:
    -   Explicitly deny permissions
    -   Override allow policies
    -   Set at organization/folder level
-   **Resource Hierarchy**:
    -   Organization → Folders → Projects → Resources
    -   Define access at each level
    -   Apply principle of least privilege
-   **Access Context Manager**:
    -   Define access levels based on attributes (IP, device, etc.)
    -   Implement context-aware access control
    -   Use with VPC Service Controls
-   **Policy Intelligence**:
    -   Recommender for IAM
    -   IAM Policy Analyzer
    -   Policy Troubleshooter
    -   Policy Insights
-   **Group-based Permissions**:
    -   Assign roles to groups instead of individual users
    -   Manage group membership centrally
    -   Implement role-based access control
-   **Privileged Access Manager**:
    -   Just-in-time access to sensitive resources
    -   Time-bound elevation of privileges
    -   Approval workflows for privileged access

**Helpful links:**

-   [IAM overview](https://cloud.google.com/iam/docs/overview)
-   [Understanding roles](https://cloud.google.com/iam/docs/understanding-roles)
-   [Creating custom roles](https://cloud.google.com/iam/docs/creating-custom-roles)
-   [IAM conditions](https://cloud.google.com/iam/docs/conditions-overview)
-   [IAM deny policies](https://cloud.google.com/iam/docs/deny-overview)
-   [Access Context Manager](https://cloud.google.com/access-context-manager/docs)
-   [Policy Intelligence](https://cloud.google.com/policy-intelligence)

### 1.5 Defining Resource Hierarchy

-   **Managing at Scale**:
    -   Use folders to organize projects by department, environment, etc.
    -   Implement naming conventions
    -   Utilize labels for resource categorization
-   **Organization Policies**:
    -   Define constraints on resources
    -   Implement guardrails (e.g., restrict resource creation in certain regions)
    -   Pre-built or custom constraints
-   **Inheritance Model**:
    -   Policies inherit down the hierarchy
    -   Child policies can't remove parent restrictions
    -   Most restrictive policy applies

**Helpful links:**

-   [Resource hierarchy](https://cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy)
-   [Creating and managing folders](https://cloud.google.com/resource-manager/docs/creating-managing-folders)
-   [Organization policy service](https://cloud.google.com/resource-manager/docs/organization-policy/overview)
-   [Using labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels)

## Section 2: Securing Communications and Boundary Protection (~22% of exam)

### 2.1 Designing Perimeter Security

-   **Cloud NGFW (Next Generation Firewall)**:
    -   Hierarchical firewall policies
    -   Global and regional rules
    -   Service perimeters
-   **Identity-Aware Proxy (IAP)**:
    -   Context-aware access to applications
    -   Layer 7 protection for web apps and VMs
    -   Centralized authentication and authorization
-   **Load Balancers**:
    -   SSL/TLS termination
    -   Certificate management
    -   Health checks and traffic distribution
-   **Certificate Authority Service**:
    -   Deploy and manage private CAs
    -   Issue certificates for internal services
    -   Integrate with Certificate Manager
-   **Layer 7 Inspection**:
    -   Application-level filtering
    -   Content inspection
    -   Protocol validation
-   **Private vs Public IP Addressing**:
    -   Internal vs external IP allocation
    -   When to use each type
    -   Security implications
-   **Google Cloud Armor**:
    -   DDoS protection
    -   WAF capabilities
    -   Pre-configured and custom rules
    -   Edge protection
-   **Secure Web Proxy**:
    -   URL filtering
    -   TLS inspection
    -   Data loss prevention
    -   Centralized egress control
-   **Cloud DNS Security**:
    -   DNS Security Extensions (DNSSEC)
    -   Private DNS zones
    -   DNS policies and logging
-   **API Monitoring and Restriction**:
    -   Service usage monitoring
    -   API key restrictions
    -   Quota management
    -   Service control policies

**Helpful links:**

-   [Cloud NGFW documentation](https://cloud.google.com/firewall/docs/about-firewalls)
-   [Identity-Aware Proxy](https://cloud.google.com/iap/docs)
-   [Cloud Load Balancing](https://cloud.google.com/load-balancing/docs)
-   [Certificate Authority Service](https://cloud.google.com/certificate-authority-service/docs)
-   [Google Cloud Armor](https://cloud.google.com/armor/docs)
-   [Secure Web Proxy](https://cloud.google.com/secure-web-proxy/docs)
-   [Cloud DNS Security](https://cloud.google.com/dns/docs/dnssec)

### 2.2 Configuring Boundary Segmentation

-   **VPC Security Properties**:
    -   Subnet configuration
    -   Private Google Access
    -   Custom routes
    -   Flow logs
-   **VPC Peering**:
    -   Connect VPCs without exposing to internet
    -   No transitive peering
    -   Security considerations
-   **Shared VPC**:
    -   Centralized network administration
    -   Service project access controls
    -   Host project permissions
-   **Firewall Rules**:
    -   Hierarchical firewall policies
    -   Network tags
    -   Service accounts in rules
    -   Ingress/egress control
-   **N-tier Application Isolation**:
    -   Network segmentation by function
    -   Defense in depth approach
    -   Data flow controls
-   **VPC Service Controls**:
    -   Service perimeters
    -   Access levels
    -   Ingress/egress policies
    -   Mitigate data exfiltration risks

**Helpful links:**

-   [VPC documentation](https://cloud.google.com/vpc/docs)
-   [VPC Peering](https://cloud.google.com/vpc/docs/vpc-peering)
-   [Shared VPC](https://cloud.google.com/vpc/docs/shared-vpc)
-   [Firewall policies](https://cloud.google.com/vpc/docs/firewalls)
-   [VPC Service Controls](https://cloud.google.com/vpc-service-controls/docs)

### 2.3 Establishing Private Connectivity

-   **VPC Network Connectivity**:
    -   Shared VPC
    -   VPC peering
    -   Private Google Access for on-premises
-   **Private Connectivity to Data Centers**:
    -   Cloud VPN (High Availability)
        -   Site-to-site encrypted tunnels
        -   BGP for dynamic routing
    -   Cloud Interconnect
        -   Dedicated Interconnect (physical)
        -   Partner Interconnect (via provider)
        -   VLAN attachments
-   **Private Access to Google APIs**:
    -   Private Google Access
    -   Private Service Connect
    -   Restricted Google Access
-   **Cloud NAT**:
    -   Source NAT for outbound connections
    -   Configure for VMs without external IPs
    -   Regional service with redundancy

**Helpful links:**

-   [Cloud VPN documentation](https://cloud.google.com/network-connectivity/docs/vpn)
-   [Cloud Interconnect](https://cloud.google.com/network-connectivity/docs/interconnect)
-   [Private Google Access](https://cloud.google.com/vpc/docs/private-google-access)
-   [Private Service Connect](https://cloud.google.com/vpc/docs/private-service-connect)
-   [Cloud NAT](https://cloud.google.com/nat/docs)

## Section 3: Ensuring Data Protection (~23% of exam)

### 3.1 Protecting Sensitive Data

-   **Sensitive Data Protection (SDP)**:
    -   Data discovery for PII
    -   De-identification techniques:
        -   Masking
        -   Tokenization
        -   Redaction
    -   Content inspection
    -   Format-preserving encryption
-   **Data Service Access Restrictions**:
    -   BigQuery authorized views and row-level security
    -   Cloud Storage ACLs and signed URLs
    -   Cloud SQL authorized networks and IAM
-   **Secret Manager**:
    -   Centralized secret storage
    -   Version control for secrets
    -   IAM integration
    -   Automatic rotation
-   **Compute Instance Metadata**:
    -   Secure metadata server access
    -   Custom metadata protection
    -   Block project-wide SSH keys

**Helpful links:**

-   [Sensitive Data Protection](https://cloud.google.com/dlp/docs)
-   [Data Governance in BigQuery](https://cloud.google.com/bigquery/docs/data-governance)
-   [Cloud Storage security](https://cloud.google.com/storage/docs/access-control)
-   [Cloud SQL security](https://cloud.google.com/sql/docs/mysql/instance-access-control)
-   [Secret Manager](https://cloud.google.com/secret-manager/docs)
-   [Compute Engine metadata](https://cloud.google.com/compute/docs/metadata/overview)

### 3.2 Managing Encryption

-   **Encryption Types**:
    -   Google default encryption (always on)
    -   Customer-managed encryption keys (CMEK)
    -   Customer-supplied encryption keys (CSEK)
    -   External Key Manager (EKM)
-   **Key Management**:
    -   Cloud KMS for key management
    -   Hardware Security Modules (Cloud HSM)
    -   Key rotation policies
    -   Key import procedures
-   **Use Cases by Service**:
    -   Storage: CMEK, EKM
    -   Compute: Encrypted disks, confidential computing
    -   Databases: CMEK integration
-   **Cloud Storage Lifecycle**:
    -   Automatic transition between storage classes
    -   Retention policies
    -   Object versioning
    -   Lifecycle conditions
-   **Confidential Computing**:
    -   Memory encryption with AMD SEV
    -   Confidential VMs
    -   Confidential GKE Nodes
    -   Encrypted-in-use data processing

**Helpful links:**

-   [Encryption at rest in Google Cloud](https://cloud.google.com/security/encryption/default-encryption)
-   [Cloud KMS documentation](https://cloud.google.com/kms/docs)
-   [Cloud HSM](https://cloud.google.com/kms/docs/hsm)
-   [External Key Manager](https://cloud.google.com/kms/docs/ekm)
-   [Cloud Storage object lifecycle](https://cloud.google.com/storage/docs/lifecycle)
-   [Confidential Computing](https://cloud.google.com/confidential-computing)

### 3.3 Securing AI Workloads

-   **AI/ML System Protection**:
    -   Data isolation
    -   Model access controls
    -   Training/serving security boundaries
-   **Training Model Security**:
    -   IaaS-hosted (self-managed)
        -   Secure compute environments
        -   Network isolation
    -   PaaS-hosted (managed)
        -   Service-specific security controls
        -   Integration with IAM
-   **Vertex AI Security Controls**:
    -   CMEK encryption
    -   VPC-SC integration
    -   Private endpoints
    -   IAM roles for model access

**Helpful links:**

-   [AI Platform security](https://cloud.google.com/architecture/framework/perspectives/ai-ml/security)
-   [Vertex AI security controls](https://cloud.google.com/vertex-ai/docs/general/vertexai-security-controls)
-   [Securing ML workflows](https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning)

## Section 4: Managing Operations (~19% of exam)

### 4.1 Automating Security

-   **Security Scanning in CI/CD**:
    -   Container vulnerability scanning
    -   Code scanning tools
    -   Artifact scanning
    -   Automated remediation
-   **Binary Authorization**:
    -   Image signature verification
    -   Attestation authorities
    -   Policy enforcement
    -   Integration with GKE and Cloud Run
-   **Automated Image Creation**:
    -   Hardening templates
    -   Packer for VM images
    -   Container image best practices
    -   Patch management automation
-   **Policy and Drift Detection**:
    -   Cloud Security Posture Management
    -   Custom organization policies
    -   Security Health Analytics
    -   Configuration monitoring

**Helpful links:**

-   [Container security scanning](https://cloud.google.com/container-registry/docs/container-analysis)
-   [Binary Authorization](https://cloud.google.com/binary-authorization/docs)
-   [OS hardening and patching](https://cloud.google.com/compute/docs/os-patch-management)
-   [Security Command Center posture management](https://cloud.google.com/security-command-center/docs/security-posture-overview)

### 4.2 Logging, Monitoring, and Detection

-   **Network Logs**:
    -   VPC Flow Logs
    -   Cloud NGFW logs
    -   Packet Mirroring
    -   Cloud IDS
-   **Logging Strategy**:
    -   Centralized log management
    -   Log retention policies
    -   Log aggregation
    -   Cost optimization
-   **Security Incident Response**:
    -   Detection mechanisms
    -   Response playbooks
    -   Remediation procedures
    -   Post-incident analysis
-   **Secure Log Access**:
    -   IAM for logs access
    -   Separation of duties
    -   Log-based metrics
-   **External Log Export**:
    -   Log sinks to external SIEM
    -   Pub/Sub integration
    -   BigQuery analytics
    -   Cloud Storage archival
-   **Audit Logs**:
    -   Admin Activity logs (always on)
    -   Data Access logs (configurable)
    -   System Event logs
    -   Policy Denied logs
-   **Log Exports**:
    -   Project, folder, and org-level sinks
    -   Aggregated sinks
    -   Exclusion filters
    -   Real-time exports
-   **Security Command Center**:
    -   Threat detection
    -   Security posture dashboard
    -   Vulnerability management
    -   Integration with Chronicle

**Helpful links:**

-   [VPC Flow Logs](https://cloud.google.com/vpc/docs/flow-logs)
-   [Cloud Logging](https://cloud.google.com/logging/docs)
-   [Cloud Monitoring](https://cloud.google.com/monitoring/docs)
-   [Cloud Audit Logs](https://cloud.google.com/logging/docs/audit)
-   [Security Command Center](https://cloud.google.com/security-command-center/docs)
-   [Cloud IDS](https://cloud.google.com/intrusion-detection-system/docs)
-   [Packet Mirroring](https://cloud.google.com/vpc/docs/packet-mirroring)

## Section 5: Supporting Compliance Requirements (~11% of exam)

### 5.1 Regulatory and Industry Standards

-   **Technical Compliance Needs**:
    -   Compute: Isolation, hardening
    -   Data: Encryption, residency, retention
    -   Network: Segmentation, encryption
    -   Storage: Integrity, durability
-   **Shared Responsibility Model**:
    -   Google responsibilities
    -   Customer responsibilities
    -   Service model variations (IaaS, PaaS, SaaS)
-   **Compliance Controls**:
    -   Assured Workloads for regulated industries
    -   Organization policies
    -   Access Transparency
    -   Access Approval
    -   Data residency configuration
-   **Determining Scope**:
    -   Resource inclusion/exclusion
    -   Logical boundaries
    -   Risk assessment
    -   Compliance mapping
-   **Compliance Mapping**:
    -   Mapping requirements to GCP services
    -   Demonstrating control effectiveness
    -   Documentation for audits
    -   Continuous compliance monitoring

**Helpful links:**

-   [Google Cloud compliance offerings](https://cloud.google.com/security/compliance)
-   [Assured Workloads](https://cloud.google.com/assured-workloads/docs)
-   [Access Approval](https://cloud.google.com/access-approval/docs)
-   [Data residency](https://cloud.google.com/docs/geography-and-regions)
-   [Shared responsibility model](https://cloud.google.com/architecture/framework/security/shared-responsibility-shared-fate)

## Exam Preparation Tips

-   Focus on hands-on experience with key security services
-   Learn how to integrate multiple security controls
-   Understand the security implications of architectural decisions
-   Review Google Cloud Security best practices documentation
-   Practice implementing security controls across different resource types
-   Master IAM concepts and the resource hierarchy

**Additional Helpful Resources:**

-   [Quizlet Flash Cards](https://quizlet.com/ua/617085356/cloud-guru-google-cloud-professional-cloud-security-engineer-flash-cards/?i=1a6eaf&x=1jqt)
-   [Google Cloud Security Best Practices Center](https://cloud.google.com/security/best-practices)
-   [Google Cloud Architecture Framework - Security pillar](https://cloud.google.com/architecture/framework/security)
-   [Practice Exam](https://docs.google.com/forms/d/e/1FAIpQLSfSuKEE8cUQWj9sfak7QG9hpaljBC89Y22KoWMQFgoECZjzUg/viewform)
-   [Google Cloud Security Whitepapers](https://cloud.google.com/security/resources)