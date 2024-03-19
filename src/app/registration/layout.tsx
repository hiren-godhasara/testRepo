const information = require('../../data/details.json')
export const metadata = {
    title: information?.registration?.title,
    description: information?.registration?.description,
    keywords: information?.registration?.keywords
};

export default function RegisterLayout({
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
