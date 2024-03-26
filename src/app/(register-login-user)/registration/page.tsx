import RegisterForm from "@/component/registrationUser/Register";
const information = require('../../../data/details.json')


export const metadata = {
    title: information?.registration?.title,
    description: information?.registration?.description,
    openGraph: {
        title: information?.registration?.ogTitle,
        description: information?.registration?.ogDescription,
        images: {
            url: information?.registration?.ogImage,
            height: 200,
            width: 200,
        },
    },
};
const reg = () => {
    return (
        <>
            <div>
                <RegisterForm />
            </div>
        </>
    )
}

export default reg;