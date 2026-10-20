import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/legal-page'
import { site } from '@/lib/site'

export const Route = createFileRoute('/privacy')({
  head: () => ({ meta: [{ title: `Privacy Policy | ${site.name}` }] }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      updated="1 January 2025"
      sections={[
        { h: 'Who we are', p: [`${site.name} is the data controller for personal data collected through this website. Contact: ${site.email}, ${site.address}.`] },
        { h: 'What we collect', p: ['Information you give us through the contact form (name, email, phone, message), messages sent to our AI assistant, articles and comments you publish (including the name you provide), and standard technical data such as IP address and browser type.'] },
        { h: 'How we use it', p: ['To respond to enquiries and provide our services, to operate the community news section, to improve the website, and to meet legal and regulatory obligations. Our lawful bases are consent, contract, legitimate interests and legal obligation under UK GDPR.'] },
        { h: 'AI assistant', p: ['Messages typed into the chatbot are processed by a third-party AI provider to generate a reply. Please do not share passwords, private keys or highly sensitive information in the chat.'] },
        { h: 'Public content', p: ['Articles and comments you publish, and the name you publish them under, are visible to everyone. Contact us if you would like your content removed.'] },
        { h: 'Sharing', p: ['We do not sell personal data. We may share it with trusted service providers (such as hosting), with legal partners when you instruct us, or with law enforcement where required by law or with your consent.'] },
        { h: 'Retention & security', p: ['We keep data only as long as necessary for the purposes above and apply appropriate technical and organisational measures to protect it.'] },
        { h: 'Your rights', p: ['You have the right to access, correct, delete or restrict the use of your data, to object to processing and to data portability. You may also complain to the Information Commissioner’s Office (ico.org.uk).'] },
        { h: 'Contact', p: [`To exercise your rights, email ${site.email} or call ${site.phone}.`] },
      ]}
    />
  ),
})
