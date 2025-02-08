import getBillboard from "@/actions/get-billboard";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("7fedbaa4-00b1-46de-94f0-cbac2b4d8dee");

  return (
    <Container>
      <div className="mr-4 ml-4 space-y-8 pb-10 boreder-b">
        <Billboard data={billboard} />
      </div>
      <Separator />

      <div className="flex items-center justify-center">Start Browsing</div>
    </Container>
  );
};

export default HomePage;
