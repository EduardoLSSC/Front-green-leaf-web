"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button"; // Import any UI button component if necessary

export default function LogoutButton() {
    return (
        <Button 
            className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-300"
            onClick={() => signOut({ callbackUrl: '/' })}
        >
            Sair
        </Button>
    );
}
