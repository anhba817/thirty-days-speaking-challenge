/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Shared legal copy for the IELTS 30-Day Challenge web app.
// Keep this in sync with mobile/src/legal/legalContent.ts.
//
export const PROVIDER_NAME = 'IELTS 30-Day Challenge';
export const SUPPORT_EMAIL = 'dong.ng.tan@gmail.com';
export const LEGAL_EFFECTIVE_DATE = 'June 7, 2026';

export interface LegalSection {
  heading: string;
  /** Each entry is a paragraph. Strings starting with "- " render as bullets. */
  body: string[];
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    heading: '1. Who we are',
    body: [
      `${PROVIDER_NAME} ("we", "us", or "our") provides a guided 30-day IELTS speaking practice experience across our web and mobile apps (the "Service"). This Privacy Policy explains what we collect, why, and the choices you have.`,
    ],
  },
  {
    heading: '2. Information we collect',
    body: [
      'We collect the following so the Service can work and improve:',
      '- Account information: when you sign in with Google, we receive your name, email address, and profile picture from Google.',
      '- Voice recordings: when you practise speaking, we capture audio from your microphone so it can be transcribed and scored.',
      '- Practice content: transcripts of your responses, the questions attempted, your scores, and which days you have completed.',
      '- Technical data: basic device and connection information needed to deliver and secure the Service.',
    ],
  },
  {
    heading: '3. How we use your information',
    body: [
      '- To authenticate you and sync your progress across devices.',
      '- To transcribe your speech, generate AI feedback, and track your improvement over time.',
      '- To operate, maintain, secure, and improve the Service.',
      '- To respond to your support requests.',
      'We do not sell your personal information, and we do not use your recordings or transcripts for advertising.',
    ],
  },
  {
    heading: '4. AI processing and third-party services',
    body: [
      'To deliver core features we share the minimum necessary data with trusted providers:',
      '- Google Sign-In handles authentication.',
      '- Google Gemini AI processes your audio, transcripts, and answers to generate speaking feedback and scores.',
      'These providers process data on our behalf under their own terms and security commitments. We do not control, and are not responsible for, the privacy practices of third parties beyond our integration with them.',
    ],
  },
  {
    heading: '5. Microphone access',
    body: [
      'The Service requests microphone access only to record your speaking practice when you choose to record. Audio is not captured in the background or outside of an active practice session.',
    ],
  },
  {
    heading: '6. Data storage and retention',
    body: [
      'Your account data, transcripts, scores, and audio recordings are stored on our servers for as long as your account is active so you can review your progress. You may request deletion of your account and associated data at any time (see "Your rights"). We retain data only as long as needed for the purposes described here or as required by law.',
    ],
  },
  {
    heading: '7. Your rights and choices',
    body: [
      '- Access or correct your information.',
      '- Delete your account and associated practice data.',
      '- Revoke microphone permission at any time in your device or browser settings (some features will stop working).',
      `To exercise any of these rights, contact us at ${SUPPORT_EMAIL}.`,
    ],
  },
  {
    heading: '8. Children’s privacy',
    body: [
      'The Service is not directed to children under 13 (or the minimum age required in your country), and we do not knowingly collect their personal information. If you believe a child has provided us data, contact us and we will delete it.',
    ],
  },
  {
    heading: '9. Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. Material changes will be reflected by updating the effective date above, and where appropriate we will provide additional notice within the Service.',
    ],
  },
  {
    heading: '10. Contact us',
    body: [
      `If you have questions about this Privacy Policy or your data, contact us at ${SUPPORT_EMAIL}.`,
    ],
  },
];

export const TERMS_SECTIONS: LegalSection[] = [
  {
    heading: '1. Acceptance of these terms',
    body: [
      `By accessing or using ${PROVIDER_NAME} (the "Service"), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the Service.`,
    ],
  },
  {
    heading: '2. The Service',
    body: [
      'The Service provides a structured 30-day IELTS speaking practice program, including practice questions, vocabulary, reference answers, and AI-generated feedback on your spoken and written responses. The Service is provided for educational and self-study purposes.',
    ],
  },
  {
    heading: '3. Eligibility and accounts',
    body: [
      'You must be at least 13 years old (or the minimum age in your country) to use the Service. You are responsible for activity that occurs under your account and for keeping your sign-in credentials secure. You may use Google Sign-In to create and access your account.',
    ],
  },
  {
    heading: '4. AI-generated feedback disclaimer',
    body: [
      'Feedback, scores, and band estimates are generated by automated AI systems and are provided for practice and guidance only. They are not official IELTS results, are not affiliated with or endorsed by the IELTS organisations (the British Council, IDP: IELTS Australia, or Cambridge University Press & Assessment), and do not guarantee any particular outcome on an official exam.',
    ],
  },
  {
    heading: '5. Acceptable use',
    body: [
      'You agree not to:',
      '- Use the Service for any unlawful purpose or in violation of these terms.',
      '- Upload content that is illegal, infringing, or that you do not have the right to submit.',
      '- Attempt to disrupt, reverse engineer, or gain unauthorised access to the Service or its systems.',
      '- Misuse, overload, or interfere with other users’ use of the Service.',
    ],
  },
  {
    heading: '6. Your content',
    body: [
      'You retain ownership of the recordings and responses you submit ("Your Content"). You grant us a limited licence to store and process Your Content solely to operate the Service and provide feedback to you, as described in our Privacy Policy.',
    ],
  },
  {
    heading: '7. Intellectual property',
    body: [
      'The Service, including its curriculum, text, design, and software, is owned by us or our licensors and is protected by applicable laws. You may not copy, distribute, or create derivative works from the Service without our permission, except as allowed by law.',
    ],
  },
  {
    heading: '8. Disclaimers',
    body: [
      'The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that feedback will be accurate or complete.',
    ],
  },
  {
    heading: '9. Limitation of liability',
    body: [
      'To the maximum extent permitted by law, we will not be liable for any indirect, incidental, special, or consequential damages, or for any loss of data, arising out of or relating to your use of the Service.',
    ],
  },
  {
    heading: '10. Termination',
    body: [
      'You may stop using the Service at any time. We may suspend or terminate access if you violate these terms or if necessary to protect the Service or its users.',
    ],
  },
  {
    heading: '11. Changes to these terms',
    body: [
      'We may update these Terms & Conditions from time to time. Continued use of the Service after changes take effect constitutes acceptance of the updated terms.',
    ],
  },
  {
    heading: '12. Contact us',
    body: [
      `Questions about these terms can be sent to ${SUPPORT_EMAIL}.`,
    ],
  },
];
