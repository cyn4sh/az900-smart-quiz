import type { Question } from "../types";

export const questions: Question[] = [
  {
    id: 1,
    topic: "cloud-concepts",
    prompt:
      "Which cloud computing model gives you the highest level of control over the operating system, letting you manage virtual machines and virtual networks directly?",
    options: [
      {
        key: "a",
        text: "Software as a Service (SaaS)",
        whyNot:
          "With SaaS the provider runs everything and you simply use the finished application.",
      },
      {
        key: "b",
        text: "Platform as a Service (PaaS)",
        whyNot:
          "With PaaS the provider manages the operating system and runtime, so you only control your app and data.",
      },
      { key: "c", text: "Infrastructure as a Service (IaaS)" },
      {
        key: "d",
        text: "Serverless / Function as a Service (FaaS)",
        whyNot:
          "With serverless you only deploy code. The provider manages everything underneath it.",
      },
    ],
    correctKey: "c",
    explanation:
      "With IaaS the provider runs the physical hardware and you manage everything from the operating system up: VMs, network setup, middleware, and apps. That gives the most control, and also the most work.",
  },
  {
    id: 2,
    topic: "azure-architecture",
    prompt:
      "Which Azure feature lets you logically group related resources, such as storage accounts, virtual networks, and virtual machines, so you can manage and deploy them together?",
    options: [
      {
        key: "a",
        text: "Management Groups",
        whyNot:
          "Management Groups sit above subscriptions and organize multiple subscriptions, not individual resources.",
      },
      { key: "b", text: "Resource Groups" },
      {
        key: "c",
        text: "Subscriptions",
        whyNot:
          "A subscription is a billing and access boundary that contains resource groups. It is not the grouping of related resources.",
      },
      {
        key: "d",
        text: "Availability Sets",
        whyNot:
          "Availability Sets spread VMs across fault and update domains for resilience. They do not organize resources.",
      },
    ],
    correctKey: "b",
    explanation:
      "A resource group is a logical container for related resources, so you can deploy, manage, and delete them as one unit.",
  },
  {
    id: 3,
    topic: "azure-architecture",
    prompt:
      "Azure Availability Zones are physically separate datacenters inside one region, connected by a low-latency network. What is their primary benefit?",
    options: [
      {
        key: "a",
        text: "Lower compute prices than a single datacenter",
        whyNot:
          "Zones are built for resilience, not for cutting prices.",
      },
      {
        key: "b",
        text: "Data is automatically stored in every Azure region worldwide",
        whyNot:
          "Zones protect within one region. Copying data to other regions is a separate geo-replication choice.",
      },
      {
        key: "c",
        text: "Removes the need to back up your data",
        whyNot:
          "Redundancy is not a backup. Deleted or corrupted data can be copied across zones too.",
      },
      {
        key: "d",
        text: "Higher availability and fault tolerance if one datacenter fails",
      },
    ],
    correctKey: "d",
    explanation:
      "Each zone has its own power, cooling, and networking. If one datacenter fails, the others keep your app running, which gives higher availability and fault tolerance.",
  },
  {
    id: 4,
    topic: "azure-architecture",
    prompt:
      "Which Azure Blob Storage access tier has the lowest storage cost for data that is rarely accessed and kept for at least 180 days, but has higher retrieval costs and latency?",
    options: [
      {
        key: "a",
        text: "Hot tier",
        whyNot:
          "Hot is for frequently accessed data. It has the highest storage cost and the lowest access cost.",
      },
      {
        key: "b",
        text: "Cool tier",
        whyNot:
          "Cool is for infrequently accessed data, but it only needs a 30-day minimum and costs more to store than Archive.",
      },
      { key: "c", text: "Archive tier" },
      {
        key: "d",
        text: "Premium tier",
        whyNot:
          "Premium is for low-latency, high-performance workloads, so it is the opposite of cheap storage for rare access.",
      },
    ],
    correctKey: "c",
    explanation:
      "Archive keeps data offline at the lowest storage price. You must keep data in it for at least 180 days, and reading it means rehydrating it first, which costs more and takes time.",
  },
  {
    id: 5,
    topic: "security-and-governance",
    prompt:
      "Which security approach uses multiple layers of protection, so that if one layer is breached, another is already in place to stop unauthorized access?",
    options: [
      { key: "a", text: "Defense-in-depth" },
      {
        key: "b",
        text: "Zero Trust",
        whyNot:
          "Zero Trust is the principle of never trusting a request by default and always verifying it. It is about verification, not stacking layers.",
      },
      {
        key: "c",
        text: "Single Sign-On (SSO)",
        whyNot:
          "SSO lets you sign in once to reach many apps. It is a convenience feature, not a layered defense.",
      },
      {
        key: "d",
        text: "Least privilege access",
        whyNot:
          "Least privilege means granting only the minimum permissions needed. It is one layer, not the layered strategy.",
      },
    ],
    correctKey: "a",
    explanation:
      "Defense-in-depth stacks several layers (physical, identity, perimeter, network, compute, application, data), so an attacker who gets through one layer still faces the next.",
  },
  {
    id: 6,
    topic: "security-and-governance",
    prompt:
      "Which Azure service provides cloud-based identity and access management, including single sign-on (SSO) and multi-factor authentication (MFA)?",
    options: [
      {
        key: "a",
        text: "Azure Key Vault",
        whyNot:
          "Key Vault stores secrets, keys, and certificates. It does not manage user sign-ins.",
      },
      {
        key: "b",
        text: "Azure Firewall",
        whyNot:
          "Azure Firewall filters network traffic. It does not handle user identities.",
      },
      {
        key: "c",
        text: "Microsoft Defender for Cloud",
        whyNot:
          "Defender for Cloud assesses your security posture and detects threats. It is not an identity provider.",
      },
      { key: "d", text: "Microsoft Entra ID" },
    ],
    correctKey: "d",
    explanation:
      "Microsoft Entra ID (formerly Azure Active Directory) is Azure's cloud identity and access service. It handles sign-ins, single sign-on, and multi-factor authentication.",
  },
  {
    id: 7,
    topic: "security-and-governance",
    prompt:
      "Which Azure service lets you define rules to enforce organizational standards and assess compliance across your resources at scale?",
    options: [
      { key: "a", text: "Azure Policy" },
      {
        key: "b",
        text: "Azure Cost Management",
        whyNot:
          "Cost Management tracks and controls spending. It does not evaluate resources against rules.",
      },
      {
        key: "c",
        text: "Azure Advisor",
        whyNot:
          "Advisor gives recommendations, but it does not enforce rules or block deployments.",
      },
      {
        key: "d",
        text: "Resource locks",
        whyNot:
          "Locks stop a specific resource from being deleted or changed. They do not check compliance with rules.",
      },
    ],
    correctKey: "a",
    explanation:
      "Azure Policy lets you define rules (for example, allowed regions or required tags) and evaluates your resources against them. It can flag or block non-compliant deployments.",
  },
  {
    id: 8,
    topic: "cloud-concepts",
    prompt:
      "Which cloud deployment model uses resources owned and operated by a third-party cloud provider and shared with other organizations?",
    options: [
      {
        key: "a",
        text: "Private cloud",
        whyNot:
          "A private cloud is dedicated to a single organization, not shared.",
      },
      { key: "b", text: "Public cloud" },
      {
        key: "c",
        text: "Hybrid cloud",
        whyNot:
          "Hybrid combines a private or on-premises environment with a public cloud.",
      },
      {
        key: "d",
        text: "Multi-cloud",
        whyNot:
          "Multi-cloud means using services from more than one cloud provider.",
      },
    ],
    correctKey: "b",
    explanation:
      "In a public cloud, a provider such as Microsoft Azure owns and runs the hardware, and many organizations share that infrastructure.",
  },
  {
    id: 9,
    topic: "security-and-governance",
    prompt:
      "Which Azure service is a personalized recommendation engine that helps you optimize your deployments for high availability, security, performance, and cost?",
    options: [
      {
        key: "a",
        text: "Azure Monitor",
        whyNot:
          "Monitor collects and analyzes metrics and logs. It shows what is happening rather than recommending improvements.",
      },
      {
        key: "b",
        text: "Azure Service Health",
        whyNot:
          "Service Health tells you about Azure outages and planned maintenance that affect you.",
      },
      { key: "c", text: "Azure Advisor" },
      {
        key: "d",
        text: "Azure Cost Management + Billing",
        whyNot:
          "It focuses on tracking spend and budgets, not on recommendations across availability, security, and performance.",
      },
    ],
    correctKey: "c",
    explanation:
      "Azure Advisor analyzes your resource configuration and usage, then gives personalized recommendations for reliability (high availability), security, performance, cost, and operational excellence.",
  },
  {
    id: 10,
    topic: "cloud-concepts",
    prompt:
      "In the shared responsibility model, which responsibility does the customer always keep, whether they use IaaS, PaaS, or SaaS?",
    options: [
      {
        key: "a",
        text: "Physical security of datacenters",
        whyNot:
          "The cloud provider always handles physical security.",
      },
      {
        key: "b",
        text: "Operating system patches and updates",
        whyNot:
          "You patch the OS in IaaS only. In PaaS and SaaS the provider does it.",
      },
      {
        key: "c",
        text: "Network infrastructure configuration",
        whyNot:
          "The provider runs the physical network. You only configure parts of the virtual network, mainly in IaaS.",
      },
      { key: "d", text: "Data classification and user access control" },
    ],
    correctKey: "d",
    explanation:
      "Responsibility for the OS and network shifts to the provider as you move from IaaS to PaaS to SaaS, but your data, and who can access it, always stays with you.",
  },
];