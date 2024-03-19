const information = require('../../data/details.json')

export const metadata = {
    title: information?.termsOfUse?.title,
    description: information?.termsOfUse?.description,
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
