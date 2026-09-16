import Header from "./header/header";
import Footer from "./footer/footer";
import Main from "./main/main";

export default function MainLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
