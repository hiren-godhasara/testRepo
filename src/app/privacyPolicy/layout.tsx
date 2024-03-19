const information = require('../../data/details.json')

export const metadata = {
    title: information?.privacyPolicy?.title,
    description: information?.privacyPolicy?.description,
};

export default function PrivacyPolicyLayout({
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
