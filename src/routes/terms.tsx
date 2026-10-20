import { createFileRoute } from '@tanstack/react-router'
import { LegalPage } from '@/components/legal-page'
import { site } from '@/lib/site'

export const Route = createFileRoute('/terms')({
  head: () => ({ meta: [{ title: `Terms & Conditions | ${site.name}` }] }),
  component: () => (
    <LegalPage
      eyebrow="Legal"
      title="Term's & condition"
      updated="1 January 2025"
      sections={[
        { h: '1. About us', p: [`These terms govern your use of this website and the services provided by ${site.name} (“Zenith”, “we”, “us”), whose office is at ${site.address}.`] },
        { h: '2. Lawful services only', p: ['We provide investigative, intelligence and authorised security testing services. All work is carried out in accordance with applicable law. We will not accept instructions to access any account, device or system without the owner’s authorisation, to intercept communications unlawfully, or to obtain information by deception.', 'Penetration testing and other ethical hacking engagements require a signed scope and written authorisation from the owner of the systems being tested.'] },
        { h: '3. No guarantee of outcome', p: ['Investigations depend on available evidence and the cooperation of third parties. We do not guarantee the recovery of funds or any particular result. Proposals set out the scope, deliverables and fees agreed for each engagement.'] },
        { h: '4. Not legal advice', p: ['Information on this website and from our AI assistant is general guidance only and is not legal or financial advice. Where legal action is required, we introduce clients to qualified solicitors and counsel.'] },
        { h: '5. Community content', p: ['Visitors may publish articles and comments. You are responsible for what you post and confirm that it is lawful, accurate to the best of your knowledge, and does not infringe anyone’s rights or disclose personal data about others. We may edit or remove content at our discretion, including content that is defamatory, abusive, promotional or spam.'] },
        { h: '6. AI assistant', p: ['Our website chatbot is powered by artificial intelligence. Its responses may occasionally be inaccurate and should be confirmed with a member of our team before you rely on them.'] },
        { h: '7. Liability', p: ['To the extent permitted by law, we are not liable for any indirect or consequential loss arising from use of this website. Nothing in these terms limits liability that cannot be limited under English law.'] },
        { h: '8. Governing law', p: ['These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction.'] },
        { h: '9. Contact', p: [`Questions about these terms can be sent to ${site.email} or by phone on ${site.phone}.`] },
      ]}
    />
  ),
})
