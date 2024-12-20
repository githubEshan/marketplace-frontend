import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import Button from "@/components/ui/button";
import Container from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

export const revalidate = 0;

const HomePage = async () => {
  const billboard = await getBillboard("68ae94a6-8993-4b22-a0b8-b669b6933691");

  return (
    <Container>
      <div className="space-y-10 pb-10 boreder-b">
        <Billboard data={billboard} />
      </div>
      <Separator />

      <div className="flex items-center justify-center">
        <Button
          className="items-stretch flex bg-blue-950 px-4 py-2 text-white rounded-sm mt-5 text-2xl font-bold "
          onClick={() => {}}
        >
          Start Browsing
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;
