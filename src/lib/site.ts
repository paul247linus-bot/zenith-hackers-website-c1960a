import { Binary, Bitcoin, Landmark, Radar, type LucideIcon } from 'lucide-react'

export const site = {
  name: 'Zenith Hackers Intelligence',
  shortName: 'Zenith',
  tagline: 'Private Investigations & Ethical Hacking Services',
  description:
    'Zenith Hackers Intelligence is a London private investigations and ethical hacking firm specialising in cyber intelligence, crypto investigations, asset tracing and offshore legal support.',
  phone: '+44(755)248-6027',
  phoneHref: 'tel:+447552486027',
  whatsapp: 'https://wa.me/447552486027',
  email: 'zenithintel@consultant.com',
  address: "100 Preston's Rd, London E14 9RL, UK",
  mapUrl: 'https://maps.google.com/?q=100+Prestons+Rd,+London+E14+9RL',
  copyright: '©Copyright 2025 - Zenith Hackers Intelligence | All Rights Reserved',
}

/** Netlify Image CDN URL for a file in public/img. */
export function img(file: string, width: number) {
  return `/.netlify/images?url=/img/${file}&w=${width}&fm=webp&q=75`
}

export interface Service {
  slug: string
  name: string
  icon: LucideIcon
  image: string
  summary: string
  intro: string
  capabilities: { title: string; text: string }[]
  process: string[]
}

export const services: Service[] = [
  {
    slug: 'cyber-intelligence',
    name: 'Cyber Intelligence',
    icon: Radar,
    image: 'cyber.png',
    summary:
      'Authorised penetration testing, threat intelligence and digital forensics that expose risk before adversaries do.',
    intro:
      'Our ethical hackers and intelligence analysts work under signed engagement scopes to test, monitor and investigate. Whether you are responding to a breach, vetting a counterparty or hardening your infrastructure, we turn scattered digital signals into evidence you can act on.',
    capabilities: [
      { title: 'Ethical penetration testing', text: 'Scoped, authorised testing of web apps, networks, cloud and staff phishing resilience — with a clear remediation report.' },
      { title: 'Open-source intelligence (OSINT)', text: 'Lawful profiling of people, companies and online identities for due diligence, litigation and threat assessment.' },
      { title: 'Digital forensics & incident response', text: 'Evidence-grade acquisition and analysis of devices and logs, with chain-of-custody documentation for court.' },
      { title: 'Dark web monitoring', text: 'Continuous monitoring for leaked credentials, data and brand impersonation, with rapid takedown support.' },
    ],
    process: ['Confidential consultation & scoping', 'Signed authorisation and rules of engagement', 'Testing, collection and analysis', 'Findings report and remediation briefing'],
  },
  {
    slug: 'crypto-investigations',
    name: 'Crypto Investigations',
    icon: Bitcoin,
    image: 'crypto.png',
    summary:
      'Blockchain tracing that follows stolen or misappropriated digital assets across wallets, mixers, bridges and exchanges.',
    intro:
      'Crypto fraud moves fast, but the blockchain never forgets. Our investigators map transaction flows, attribute wallets to services and exchanges, and package findings so law enforcement, exchanges and your legal team can act — including freezing requests where funds reach regulated platforms.',
    capabilities: [
      { title: 'Blockchain transaction tracing', text: 'Multi-chain analysis across Bitcoin, Ethereum, Tron, BSC and more, including cross-chain bridges.' },
      { title: 'Scam & fraud investigation', text: 'Investment, romance and “pig-butchering” scam investigations with victim-ready evidence packs.' },
      { title: 'Exchange liaison', text: 'Structured reports that support freeze and disclosure requests to cooperating exchanges.' },
      { title: 'Expert witness reports', text: 'Clear, court-ready reports explaining complex flows to judges, regulators and juries.' },
    ],
    process: ['Collect wallet addresses & transaction IDs', 'Trace and cluster funds on-chain', 'Identify off-ramps and responsible platforms', 'Deliver evidence pack and next-step strategy'],
  },
  {
    slug: 'asset-tracing',
    name: 'Asset Tracing',
    icon: Binary,
    image: 'asset.png',
    summary:
      'Locate hidden wealth, property and corporate interests worldwide to support litigation, divorce and judgment enforcement.',
    intro:
      'When assets have been concealed behind nominees, shell companies or foreign jurisdictions, our analysts follow the money. We combine corporate registries, property records, litigation databases and human intelligence to build an accurate picture of what a subject owns — and where.',
    capabilities: [
      { title: 'Global asset searches', text: 'Property, vehicles, vessels, aircraft, company holdings and bank-linked indicators across 100+ jurisdictions.' },
      { title: 'Corporate structure mapping', text: 'Unravel layered ownership and identify ultimate beneficial owners behind offshore vehicles.' },
      { title: 'Judgment enforcement support', text: 'Intelligence to target enforcement, freezing injunctions and disclosure applications.' },
      { title: 'Matrimonial investigations', text: 'Discreet support for family lawyers where non-disclosure of assets is suspected.' },
    ],
    process: ['Define subject and objectives', 'Registry, records and intelligence research', 'Asset map and confidence grading', 'Briefing with your legal team'],
  },
  {
    slug: 'offshore-legal-experts',
    name: 'Offshore Legal Experts',
    icon: Landmark,
    image: 'legal.png',
    summary:
      'A vetted network of solicitors and counsel in offshore centres to turn investigative findings into legal remedies.',
    intro:
      'Intelligence is only valuable if it can be enforced. We coordinate with qualified lawyers in the BVI, Cayman Islands, Jersey, Guernsey, Cyprus, the UAE and beyond, ensuring evidence is gathered lawfully and handed over in a form that supports urgent court action.',
    capabilities: [
      { title: 'Cross-border coordination', text: 'One point of contact managing investigators and local counsel across multiple jurisdictions.' },
      { title: 'Injunction support', text: 'Evidence preparation for worldwide freezing orders, Norwich Pharmacal and Bankers Trust applications.' },
      { title: 'Regulatory referrals', text: 'Guidance on reporting to regulators, Action Fraud, and overseas law enforcement.' },
      { title: 'Litigation intelligence', text: 'Ongoing intelligence support throughout proceedings and enforcement.' },
    ],
    process: ['Case assessment with our legal liaison', 'Introduction to vetted local counsel', 'Evidence handover and strategy', 'Joint support through to resolution'],
  },
]
