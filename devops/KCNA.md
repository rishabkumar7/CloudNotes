# Kubernetes and Cloud Native Associate (KCNA) Study Notes

## Overview

The Kubernetes and Cloud Native Associate (KCNA) certification is designed for beginners to demonstrate their knowledge of Kubernetes and the cloud native ecosystem. The exam tests basic concepts, principles, and terminology rather than hands-on implementation skills.

-   [KCNA Official Page](https://training.linuxfoundation.org/certification/kubernetes-cloud-native-associate/)

## Domain 1: Kubernetes Fundamentals (46%)

### 1.1 Kubernetes Resources

-   **Pods**:
    -   Smallest deployable units in Kubernetes
    -   Can contain one or more containers
    -   Share network namespace and storage
    -   Ephemeral by nature (not persistent)
-   **Deployments**:
    -   Manage ReplicaSets
    -   Provide declarative updates for Pods
    -   Support rolling updates and rollbacks
    -   Define desired state for application deployments
-   **Services**:
    -   Abstract way to expose applications running on Pods
    -   Types: ClusterIP, NodePort, LoadBalancer, ExternalName
    -   Provide stable network endpoint for Pods
-   **ConfigMaps and Secrets**:
    -   ConfigMaps: Store non-confidential configuration data
    -   Secrets: Store sensitive information (passwords, tokens, keys)
    -   Both can be used as environment variables or volume mounts
-   **Namespaces**:
    -   Virtual clusters within a Kubernetes cluster
    -   Provide scope for resource names
    -   Allow resource isolation and quota management
-   **Other Resources**:
    -   StatefulSets: For stateful applications
    -   DaemonSets: Run a Pod on all (or some) nodes
    -   Jobs and CronJobs: For batch and scheduled tasks
    -   Ingress: Manage external access to services
    -   PersistentVolumes and PersistentVolumeClaims: For storage

**Helpful links:**

-   [Kubernetes Concepts](https://kubernetes.io/docs/concepts/)
-   [Pod Overview](https://kubernetes.io/docs/concepts/workloads/pods/)
-   [Deployments](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
-   [Services](https://kubernetes.io/docs/concepts/services-networking/service/)
-   [ConfigMaps](https://kubernetes.io/docs/concepts/configuration/configmap/)
-   [Secrets](https://kubernetes.io/docs/concepts/configuration/secret/)
-   [Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/)

### 1.2 Kubernetes Architecture

-   **Control Plane Components**:
    -   kube-apiserver: REST API front-end for Kubernetes control plane
    -   etcd: Consistent and highly-available key-value store for cluster data
    -   kube-scheduler: Assigns Pods to Nodes
    -   kube-controller-manager: Runs controller processes
    -   cloud-controller-manager: Interfaces with cloud providers
-   **Node Components**:
    -   kubelet: Agent that ensures containers are running in a Pod
    -   kube-proxy: Maintains network rules on nodes
    -   Container runtime: Software responsible for running containers (Docker, containerd, CRI-O)
-   **Kubernetes API**:
    -   Core of Kubernetes control plane
    -   RESTful interface for cluster state
    -   Enables declarative configuration
    -   Uses JSON and YAML

![Kubernetes Components](https://kubernetes.io/images/docs/components-of-kubernetes.svg)

**Helpful links:**

-   [Kubernetes Components](https://kubernetes.io/docs/concepts/overview/components/)
-   [Kubernetes API](https://kubernetes.io/docs/concepts/overview/kubernetes-api/)
-   [Nodes](https://kubernetes.io/docs/concepts/architecture/nodes/)

### 1.3 Kubernetes Configuration and Deployment

-   **kubectl CLI**:
    -   Primary command-line tool for interacting with Kubernetes clusters
    -   Configure, create, manage, inspect resources
    -   Key commands: apply, get, describe, delete, logs, exec
-   **YAML Manifests**:
    -   Declarative approach to define Kubernetes resources
    -   Structure: apiVersion, kind, metadata, spec
    -   Can be applied, updated, and versioned
-   **Basic Deployment Strategies**:
    -   Rolling updates: Gradual replacement of instances
    -   Blue/Green: Maintain two production environments
    -   Canary: Release to a small subset of users
-   **Helm**:
    -   Package manager for Kubernetes
    -   Helm charts: Package format (templates + values)
    -   Simplifies deployment and management of applications

**Helpful links:**

-   [kubectl Overview](https://kubernetes.io/docs/reference/kubectl/)
-   [kubectl Cheat Sheet](https://kubernetes.io/docs/reference/kubectl/cheatsheet/)
-   [Declarative Management](https://kubernetes.io/docs/tasks/manage-kubernetes-objects/declarative-config/)
-   [Helm Documentation](https://helm.sh/docs/)

## Domain 2: Container Orchestration (22%)

### 2.1 Container Basics

-   **Container Concepts**:
    -   Lightweight, standalone, executable software packages
    -   Include everything needed to run: code, runtime, libraries, settings
    -   Share the host OS kernel but are isolated
-   **Container Images**:
    -   Templates used to create containers
    -   Layered file system (each instruction creates a layer)
    -   Stored in registries (Docker Hub, GCR, ECR, ACR)
-   **Container Runtime Interface (CRI)**:
    -   API between kubelet and container runtime
    -   Allows for different container runtimes: Docker, containerd, CRI-O
-   **OCI (Open Container Initiative)**:
    -   Standards for container formats and runtimes
    -   Runtime Specification and Image Specification

**Helpful links:**

-   [What are Containers?](https://kubernetes.io/docs/concepts/containers/)
-   [Container Runtime Interface (CRI)](https://kubernetes.io/docs/concepts/architecture/cri/)
-   [Open Container Initiative](https://opencontainers.org/)
-   [Docker Overview](https://docs.docker.com/get-started/overview/)

### 2.2 Orchestration Concepts

-   **Scheduling**:
    -   Process of assigning Pods to Nodes
    -   Based on resource requirements, constraints, taints/tolerations
    -   Handled by kube-scheduler
-   **Scaling**:
    -   Manual scaling: Change replicas in Deployment/StatefulSet
    -   Horizontal Pod Autoscaler (HPA): Automatically scale based on metrics
    -   Vertical Pod Autoscaler (VPA): Adjust CPU/memory requests and limits
    -   Cluster Autoscaler: Add/remove nodes based on resource requirements
-   **Self-healing**:
    -   Automatic replacement of failed containers
    -   Rescheduling evicted Pods
    -   Health checks: liveness, readiness, and startup probes
-   **Load Balancing**:
    -   Distributes traffic across Pods
    -   Implemented through Services
    -   External load balancing via LoadBalancer type or Ingress

**Helpful links:**

-   [Scheduling](https://kubernetes.io/docs/concepts/scheduling-eviction/)
-   [Horizontal Pod Autoscaling](https://kubernetes.io/docs/tasks/run-application/horizontal-pod-autoscale/)
-   [Configure Liveness, Readiness and Startup Probes](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/)
-   [Service Load Balancing](https://kubernetes.io/docs/concepts/services-networking/service/#loadbalancer)

## Domain 3: Cloud Native Architecture (16%)

### 3.1 Cloud Native Concepts

-   **Microservices**:
    -   Breaking applications into smaller, independent services
    -   Each service focuses on specific business function
    -   Independently deployable and scalable
    -   Loosely coupled with other services
-   **Twelve-Factor App Methodology**:
    -   Set of best practices for building cloud-native applications
    -   Key principles: codebase, dependencies, config, backing services, build-release-run, processes, port binding, concurrency, disposability, dev/prod parity, logs, admin processes
-   **Serverless**:
    -   Run code without managing infrastructure
    -   Event-driven execution model
    -   Pay-for-use pricing
    -   Examples: AWS Lambda, Google Cloud Functions, Azure Functions, Knative
-   **Service Mesh**:
    -   Infrastructure layer for service-to-service communication
    -   Features: traffic management, security, observability
    -   Examples: Istio, Linkerd, Consul

**Helpful links:**

-   [CNCF Cloud Native Definition](https://github.com/cncf/toc/blob/main/DEFINITION.md)
-   [Twelve-Factor App](https://12factor.net/)
-   [Microservices Architecture](https://microservices.io/)
-   [Knative](https://knative.dev/docs/)
-   [Service Mesh Interface](https://smi-spec.io/)

### 3.2 Cloud Native Patterns

-   **DevOps Principles**:
    -   Collaboration between development and operations
    -   Automation of processes
    -   Continuous integration/continuous delivery (CI/CD)
    -   Feedback loops and continuous improvement
-   **GitOps**:
    -   Git as single source of truth for declarative infrastructure
    -   Pull-based deployment model
    -   Infrastructure as Code (IaC)
    -   Examples: Flux, ArgoCD
-   **Stateless and Stateful Applications**:
    -   Stateless: No client session data stored
    -   Stateful: Maintains state/session information
    -   Different deployment approaches in Kubernetes
-   **Resiliency Patterns**:
    -   Circuit breaker: Prevent cascading failures
    -   Retry: Automatically retry failed operations
    -   Timeout: Abandon operations that take too long
    -   Bulkhead: Isolate components to contain failures

**Helpful links:**

-   [Cloud Native Patterns](https://www.manning.com/books/cloud-native-patterns)
-   [GitOps](https://www.gitops.tech/)
-   [Flux Documentation](https://fluxcd.io/docs/)
-   [Argo CD](https://argo-cd.readthedocs.io/en/stable/)
-   [Kubernetes StatefulSets](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
-   [Resilience Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/category/resiliency)

## Domain 4: Cloud Native Observability (8%)

### 4.1 Telemetry and Observability

-   **Monitoring vs. Observability**:
    -   Monitoring: Tracking predefined metrics and alerts
    -   Observability: Ability to understand system state from external outputs
    -   Three pillars: metrics, logs, traces
-   **Metrics**:
    -   Numerical data about system performance
    -   Time-series data
    -   Examples: CPU usage, memory usage, request count, error rate
    -   Tools: Prometheus, Grafana
-   **Logging**:
    -   Recording events with contextual information
    -   Centralized log collection and analysis
    -   Tools: Elasticsearch, Fluentd, Loki
-   **Tracing**:
    -   Tracking request flow through distributed systems
    -   Identify performance bottlenecks
    -   Tools: Jaeger, Zipkin, OpenTelemetry

**Helpful links:**

-   [CNCF Observability White Paper](https://github.com/cncf/tag-observability/blob/main/whitepaper.md)
-   [Prometheus](https://prometheus.io/docs/introduction/overview/)
-   [Grafana](https://grafana.com/docs/)
-   [Fluentd](https://www.fluentd.org/guides)
-   [OpenTelemetry](https://opentelemetry.io/docs/)

### 4.2 Prometheus and OpenMetrics

-   **Prometheus Architecture**:
    -   Pull-based monitoring system
    -   Time-series database
    -   Powerful query language (PromQL)
    -   Alert manager for notifications
-   **Instrumentation and Exporters**:
    -   Application instrumentation using client libraries
    -   Exporters for third-party systems
    -   Service discovery for dynamic environments

**Helpful links:**

-   [Prometheus Getting Started](https://prometheus.io/docs/prometheus/latest/getting_started/)
-   [PromQL](https://prometheus.io/docs/prometheus/latest/querying/basics/)
-   [Prometheus Exporters](https://prometheus.io/docs/instrumenting/exporters/)

## Domain 5: Cloud Native Security (8%)

### 5.1 Cloud Native Security Concepts

-   **Defense in Depth**:
    -   Multiple layers of security controls
    -   Includes: cloud infrastructure, cluster, container, code
    -   Principle of least privilege
-   **Kubernetes Security**:
    -   API authorization (RBAC)
    -   Authentication methods
    -   Pod security policies/standards
    -   Network policies
    -   Secrets management
-   **Supply Chain Security**:
    -   Image scanning for vulnerabilities
    -   Signed images and verification
    -   Software Bill of Materials (SBOM)
    -   Secure build processes
-   **Runtime Security**:
    -   Container sandboxing
    -   Intrusion detection/prevention
    -   Audit logging
    -   Tools: Falco, Sysdig, Open Policy Agent (OPA)

**Helpful links:**

-   [Kubernetes Security](https://kubernetes.io/docs/concepts/security/)
-   [RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/)
-   [Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/)
-   [Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/)
-   [Open Policy Agent](https://www.openpolicyagent.org/docs/latest/)
-   [Falco](https://falco.org/docs/)

### 5.2 Authentication, Authorization, and Admission Control

-   **Authentication**:
    -   Verifying identity in Kubernetes
    -   Methods: client certificates, bearer tokens, OpenID Connect, service accounts
-   **Authorization (RBAC)**:
    -   Role-Based Access Control
    -   Roles and ClusterRoles (permissions)
    -   RoleBindings and ClusterRoleBindings (assignments)
    -   Namespace scoped vs. cluster-wide
-   **Admission Control**:
    -   Intercepts requests to Kubernetes API server
    -   Validation and Mutation webhooks
    -   Built-in controllers (e.g., ResourceQuota, LimitRanger)
    -   Tools: Gatekeeper, Kyverno

**Helpful links:**

-   [Authenticating in Kubernetes](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
-   [RBAC Examples](https://kubernetes.io/docs/reference/access-authn-authz/rbac/#role-examples)
-   [Admission Controllers](https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/)
-   [Gatekeeper](https://open-policy-agent.github.io/gatekeeper/website/docs/)

## KCNA Preparation Tips

-   Understand Kubernetes core concepts and terminology
-   Familiarize yourself with the Cloud Native ecosystem and CNCF projects
-   Focus on high-level concepts rather than detailed implementation
-   Use free online resources, including Kubernetes documentation and CNCF resources
-   Try hands-on practice with minikube or kind for local Kubernetes clusters
-   Take advantage of free courses like Introduction to Kubernetes on edX

**Additional Helpful Resources:**

- [CNCF Landscape](https://landscape.cncf.io/) - Overview of cloud native technologies
- [Kubernetes Learning Path](https://kubernetes.io/docs/tutorials/kubernetes-basics/) - Official beginner tutorials
- [Kubernetes the Hard Way](https://github.com/kelseyhightower/kubernetes-the-hard-way) - Advanced understanding of components
- [CNCF YouTube Channel](https://www.youtube.com/c/cloudnativefdn) - Webinars and conference presentations
- [KubeAcademy](https://kube.academy/) - Free Kubernetes courses from VMware
- [DevOps Capstone Project Playlist](https://www.youtube.com/playlist?list=PLK_LRl1CH4L-kIl0-5FK6KszocD_1__YZ)
