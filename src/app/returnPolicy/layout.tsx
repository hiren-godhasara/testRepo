const information = require('../../data/details.json')

export const metadata = {
    title: information?.returnPolicy?.title,
    description: information?.returnPolicy?.description,
};

export default function returnPolicyLayout({
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
