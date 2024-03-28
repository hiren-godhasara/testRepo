const information = require('../../data/details.json')


export const metadata = {
    title: information?.termsOfUse?.title,
    description: information?.termsOfUse?.description,
    keywords: information?.termsOfUse?.keywords,
    openGraph: {
        title: information?.termsOfUse?.ogTitle,
        description: information?.termsOfUse?.ogDescription,
        images: {
            url: information?.termsOfUse?.ogImage,
            height: 340,
            width: 640,
        },
    },
};

export default function TermsOfUsesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
