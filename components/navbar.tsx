import Link from "next/link";
import Container from "./ui/container";
import MainNav from "@/components/main-nav";
import getCategories from "../actions/get-categories";
import NavbarActions from "./navbar-actions";

const Navbar = async () => {
  const categories = await getCategories();
  return (
    <div className="border-b">
      <Container>
        <div className="mr-10 ml-12 relative px-4 sm:px-6 lg:px-8 flex items-center h-16">
          <Link href="/" className="ml-2 flex lg:ml-0 gap-x-2">
            <p>MU MarketPlace</p>
          </Link>
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
