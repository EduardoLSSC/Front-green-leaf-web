"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Image from "next/image";
import logo from "@/assets/images/logoBg.png";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";

export default function TrailCard() {

    const handleRedirect = () => {
        console.log("veio aq")
        redirect("/profile");
      };
      
    return (

        <main>
            <Card className="w-full max-h-[150px] rounded-2xl bg-[#FAFAF5]" onClick={handleRedirect}>
                <div className="flex flex-row md:flex-row">
                    <div className="w-40 h-[150px] relative overflow-hidden rounded-l-2xl">
                        <Image 
                            src={logo} 
                            layout="fill"
                            alt="Foto da trilha" 
                            objectFit="cover"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <CardHeader>
                            <CardTitle className="flex flex-row justify-between">
                                <h1>Long Life Trail</h1>
                                <h1>Media</h1>
                            </CardTitle>
                            <CardDescription className="text-[#426B1F]"><strong>6 Km</strong></CardDescription>
                        </CardHeader>
                        <CardContent className="w-[40%]">
                            <div className="border rounded-xl bg-white flex justify-center">
                                <p>Ricardo Akl</p>
                            </div>
                            <p>4.3</p>
                        </CardContent>
                        <CardFooter>
                            
                        </CardFooter>
                    </div>
                </div>
            </Card>
        </main>
    );
}
