import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Prestigia Agency - Agence Digital Marketing à Paris | SEO, Branding & Web",
  description:
    "Prestigia Agency : Agence de marketing digital spécialisée en SEO, branding, développement web et stratégie digitale. Transformez votre présence online avec nos experts.",
  keywords: [
    "agence marketing digital",
    "SEO Paris",
    "branding",
    "développement web",
    "marketing stratégique",
    "design digital",
  ],
  generator: "v0.app",
  metadataBase: new URL("https://prestigia-agency.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://prestigia-agency.com",
    title: "Prestigia Agency - Excellence Digitale",
    description:
      "Transformez votre présence digitale avec notre agence de marketing digital spécialisée en SEO, branding et développement web.",
    siteName: "Prestigia Agency",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prestigia Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestigia Agency - Excellence Digitale",
    description: "Transformez votre présence digitale avec notre agence de marketing digital",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  alternates: {
    canonical: "https://prestigia-agency.com",
    languages: {
      fr: "https://prestigia-agency.com/fr",
      en: "https://prestigia-agency.com/en",
    },
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Prestigia Agency",
              description: "Agence de marketing digital spécialisée en SEO, branding et développement web",
              url: "https://prestigia-agency.com",
              telephone: "+33XXXXXXXXX",
              email: "contact@prestigia-agency.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "À remplir",
                addressLocality: "Paris",
                postalCode: "75000",
                addressCountry: "FR",
              },
              image: "/og-image.png",
              sameAs: [
                "https://www.facebook.com/prestigia",
                "https://www.instagram.com/prestigia",
                "https://www.linkedin.com/company/prestigia",
              ],
              areaServed: ["FR", "BE", "CH", "CA"],
              serviceType: ["SEO", "Web Development", "Branding", "Digital Marketing"],
            }),
          }}
        />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </body>
    </html>
  )
}
