import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
            <div className="max-w-md">
                <ShieldAlert className="mx-auto h-16 w-16 text-destructive mb-4" />
                <h1 className="text-2xl font-semibold text-foreground mb-2">Yetkisiz Erişim</h1>
                <p className="text-muted-foreground mb-6">
                    Bu sayfaya erişim yetkiniz yok. Lütfen doğru hesapla giriş yaptığınızdan emin olun veya yöneticinizle iletişime geçin.
                </p>
                <Button variant="default" onClick={() => navigate("/")}>
                    Anasayfaya Dön
                </Button>
            </div>
        </div>
    );
}
