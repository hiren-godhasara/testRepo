const information = require('../../data/details.json')
export const metadata = {
    title: information?.contactUs?.title,
    description: information?.contactUs?.description,
};

export default function contactUsLayout({
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
