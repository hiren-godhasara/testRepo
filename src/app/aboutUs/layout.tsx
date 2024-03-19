const information = require('../../data/details.json')
export const metadata = {
    title: information?.aboutUs?.title,
    description: information?.aboutUs?.description,
};

export default function AboutUsLayout({
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
