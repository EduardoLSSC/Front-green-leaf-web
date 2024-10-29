import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import LoginForm from "@/components/personal/loginform";

export default function Login() {
    return (
        <main>
            <div className="h-screen flex justify-center items-center bg-white px-5">
                <LoginForm />
            </div>
        </main>
    );
}
