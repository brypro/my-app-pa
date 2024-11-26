import { LoginScreenComponent } from "@/components/login-screen";
import pb from "@/lib/pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (pb.authStore.isValid) {
      router.push("/dashboard");
    }
  }, []);

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <LoginScreenComponent />
    </div>
  );
}
