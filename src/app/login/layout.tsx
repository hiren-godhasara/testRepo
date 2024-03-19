const information = require('../../data/details.json')
export const metadata = {
    title: information?.login?.title,
    description: information?.login?.description,
    keywords: information?.login?.keywords
};

export default function LoginLayout({
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
