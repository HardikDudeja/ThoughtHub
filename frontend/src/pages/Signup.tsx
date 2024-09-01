import { Link } from "react-router-dom"

function Signup() {
    return (
        <div className="p-16 text-center">
            <h1>Create your account</h1>
            <p>
                Or {}
                <Link className="hover:underline" to="/signin">sign in to your existing account</Link>
            </p>
        </div>
    )
}

export default Signup