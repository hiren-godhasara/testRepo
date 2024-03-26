import LoginForm from "@/component/registrationUser/Login";
const information = require('../../../data/details.json')


export const metadata = {
    title: information?.login?.title,
    description: information?.login?.description,
    openGraph: {
        title: information?.login?.ogTitle,
        description: information?.login?.ogDescription,
        images: {
            url: information?.login?.ogImage,
            height: 200,
            width: 200,
        },
    },
};
const log = () => {
    return (
        <>
            <div>
                <LoginForm />
            </div>
        </>
    )
}
export default log;
