import GoogleLogin from "@/component/googleLogin/GoogleLogin";
import RegisterForm from "@/component/registrationUser/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
                <GoogleOAuthProvider clientId="1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com">
                    <GoogleLogin />
                    <RegisterForm />
                </GoogleOAuthProvider>
            </div>
        </>
    )
}

export default reg;