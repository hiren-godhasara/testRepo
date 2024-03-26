import GoogleLogin from "@/component/googleLogin/GoogleLogin";
import LoginForm from "@/component/registrationUser/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";
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
                <GoogleOAuthProvider clientId="1027485564712-nm6m9eifqopa3eqq2pnmj83vljb0e74c.apps.googleusercontent.com">
                    <LoginForm />
                    <GoogleLogin />
                </GoogleOAuthProvider>
            </div>
        </>
    )
}
export default log;
