import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, X, Plus, Search, Globe, Tags, CheckCircle, XCircle } from "lucide-react";
import { fetchProductsWithKeywords, generateWithKeywords } from "@/apiHelpers";

const normalizeDomain = (input: string) => {
  let domain = input.trim().toLowerCase();
  domain = domain.replace(/^https?:\/\//i, "");
  domain = domain.replace(/^www\./i, "");
  domain = domain.replace(/\/+$/, "");
  return `https://${domain}/`;
};

export default function InputPage() {
  const [brand, setBrand] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dnsStatus, setDnsStatus] = useState<"valid" | "invalid" | "checking" | null>(null);
  const [isNewAnalysis, setIsNewAnalysis] = useState(false);
  const [productId, setProductId] = useState<string | null>(null);
  const [isWebsiteDisabled, setIsWebsiteDisabled] = useState(false);

  const { user, applicationId } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user) navigate("/login");

    const state = location.state as any;
    if (state?.prefillWebsite) {
      setBrand(state.prefillWebsite);
      checkDNS(state.prefillWebsite);
    }
    if (state?.isNewAnalysis) setIsNewAnalysis(true);
    if (state?.productId) setProductId(state.productId);
    if (state?.disableWebsiteEdit) setIsWebsiteDisabled(true);
  }, [user, navigate, location.state]);

  const checkDNS = async (url: string) => {
    if (!url.trim()) { setDnsStatus(null); return; }
    setDnsStatus("checking");
    setTimeout(() => {
      try {
        const normalized = normalizeDomain(url);
        const domainOnly = normalized.replace(/^https:\/\//, "").replace(/\/$/, "");
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        setDnsStatus(domainRegex.test(domainOnly) ? "valid" : "invalid");
      } catch { setDnsStatus("invalid"); }
    }, 500);
  };

  const handleWebsiteChange = (value: string) => { setBrand(value); checkDNS(value); };

  const addKeyword = () => {
    const trimmed = currentKeyword.trim();
    if (trimmed && keywords.length < 3 && !keywords.includes(trimmed)) {
      setKeywords([...keywords, trimmed]);
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index: number) => setKeywords(keywords.filter((_, i) => i !== index));

  const handleKeyPress = (e: React.KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); addKeyword(); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brand.trim() || dnsStatus !== "valid" || keywords.length === 0 || !applicationId) {
      toast({ title: "Validation Error", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const trimmedBrand = brand.trim();

    try {
      if (isNewAnalysis && productId) {
        await generateWithKeywords(productId, keywords);
        localStorage.setItem("keywords", JSON.stringify(keywords.map(k => ({ keyword: k }))));
      } else {
        const payload = { name: trimmedBrand, description: trimmedBrand, website: normalizeDomain(trimmedBrand), business_domain: trimmedBrand, application_id: applicationId, search_keywords: keywords };
        const data = await fetchProductsWithKeywords(payload);
        if (data?.product?.id) localStorage.setItem("product_id", data.product.id);
      }

      toast({ title: "Analysis in Progress", description: "Your analysis has begun.", duration: 10000 });
      setTimeout(() => { navigate("/results", { state: { website: trimmedBrand, keywords, productId } }); setIsLoading(false); }, 3000);
    } catch { toast({ title: "Error", description: "Failed to start analysis.", variant: "destructive" }); setIsLoading(false); }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        <main className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-600">Check your AI search visibility</h1>
              <p className="text-xl text-gray-600">Enter your website URL and up to 3 keywords.</p>
            </div>
            <Card className="text-left bg-white border shadow-lg">
              <CardHeader><CardTitle className="text-gray-900 text-center">Website Visibility Analysis</CardTitle><CardDescription className="text-center">Get insights into how AI assistants present your website</CardDescription></CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input id="website" placeholder="e.g., example.com" value={brand} onChange={(e) => handleWebsiteChange(e.target.value)} className="pl-11 pr-11 bg-white" disabled={isWebsiteDisabled} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {dnsStatus === "checking" && <Loader2 className="w-4 h-4 animate-spin" />}
                        {dnsStatus === "valid" && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {dnsStatus === "invalid" && <XCircle className="w-4 h-4 text-red-500" />}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="keywords">Keywords (up to 3)</Label>
                    <div className="flex gap-2">
                      <Tags className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input placeholder="Press Enter to add" value={currentKeyword} onChange={(e) => setCurrentKeyword(e.target.value)} onKeyPress={handleKeyPress} disabled={keywords.length >= 3} className="bg-white" />
                      <Button type="button" variant="outline" size="icon" onClick={addKeyword} disabled={!currentKeyword.trim() || keywords.length >= 3}><Plus className="h-4 w-4" /></Button>
                    </div>
                    {keywords.length > 0 && <div className="flex flex-wrap gap-2 mt-2">{keywords.map((keyword, index) => (<Badge key={index} variant="secondary" className="pl-3 pr-1 py-1">{keyword}<Button type="button" variant="ghost" size="icon" className="h-4 w-4 ml-2" onClick={() => removeKeyword(index)}><X className="h-3 w-3" /></Button></Badge>))}</div>}
                    <p className="text-sm text-gray-500">{keywords.length} of 3 keywords added</p>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading || !brand.trim() || keywords.length === 0 || dnsStatus !== "valid"} size="lg">
                    {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Analyzing...</> : <><Search className="mr-2 h-4 w-4" />Run visibility check</>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </Layout>
  );
}
